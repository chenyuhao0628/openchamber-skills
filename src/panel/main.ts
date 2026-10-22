import { connectHost, HostRequestError } from '@openchamber/sdk';
import { applyHostReady, mountButton } from '@openchamber/sdk/ui';
import type {
  ConflictKind,
  ConflictView,
  RootView,
  SkillState,
  SkillView,
  SkillsResponse,
  Summary,
} from '../shared/types.ts';
import css from './style.css';
import native from '../../ui/native.css';

const host = connectHost({ requestTimeoutMs: 30_000 });
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
const style = document.createElement('style');
style.textContent = native + css;
document.head.append(style);

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text?: string): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

type Tone = 'info' | 'success' | 'warning' | 'error';
type NoticeAction = { label: string; onClick: () => void; primary?: boolean };
type Notice = { text: string; tone: Tone; actions?: NoticeAction[] };

class ServiceError extends Error {
  readonly code: string | null;
  readonly conflicts: ConflictView[];

  constructor(message: string, code: string | null, conflicts: ConflictView[]) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.conflicts = conflicts;
  }
}

const isSkillState = (value: unknown): value is SkillState =>
  value === 'enabled' || value === 'disabled' || value === 'mixed' || value === 'conflict';
const isConflictKind = (value: unknown): value is ConflictKind =>
  value === 'both' ||
  value === 'duplicate' ||
  value === 'invalid' ||
  value === 'empty' ||
  value === 'read-error' ||
  value === 'manual' ||
  value === 'no-description';

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);
const asNullableString = (value: unknown): string | null =>
  typeof value === 'string' && value.length > 0 ? value : null;
const asBool = (value: unknown): boolean => value === true;
const asNumber = (value: unknown): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;
const stringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const parseConflict = (value: unknown): ConflictView | null => {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isConflictKind(record.kind) || typeof record.skillId !== 'string') return null;
  return {
    kind: record.kind,
    skillId: record.skillId,
    message: asString(record.message, '冲突'),
    activePath: asNullableString(record.activePath),
    disabledPath: asNullableString(record.disabledPath),
    blocking: asBool(record.blocking),
  };
};

const parseSkill = (value: unknown): SkillView | null => {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (typeof record.id !== 'string' || !record.id || !isSkillState(record.state)) return null;
  return {
    id: record.id,
    name: asString(record.name, record.id),
    description: asString(record.description),
    state: record.state,
    advertised: asBool(record.advertised),
    autoInvokeOff: asBool(record.autoInvokeOff),
    activePaths: stringArray(record.activePaths),
    disabledPaths: stringArray(record.disabledPaths),
    conflicts: Array.isArray(record.conflicts)
      ? record.conflicts.map(parseConflict).filter((item): item is ConflictView => item !== null)
      : [],
    warnings: Array.isArray(record.warnings)
      ? record.warnings.filter((item): item is string => typeof item === 'string')
      : [],
    estimatedTokens: asNumber(record.estimatedTokens),
  };
};

const parseRoot = (value: unknown): RootView => {
  if (!value || typeof value !== 'object') {
    throw new ServiceError('服务返回的技能目录信息不正确。', 'parse', []);
  }
  const record = value as Record<string, unknown>;
  return {
    path: asString(record.path),
    exists: asBool(record.exists),
    error: typeof record.error === 'string' ? record.error : null,
  };
};

const parseResponse = (value: unknown): SkillsResponse => {
  if (!value || typeof value !== 'object') throw new ServiceError('服务返回的数据格式不正确。', 'parse', []);
  const record = value as Record<string, unknown>;
  if (!Array.isArray(record.skills)) throw new ServiceError('服务返回的数据格式不正确。', 'parse', []);
  const skills = record.skills.map(parseSkill).filter((item): item is SkillView => item !== null);
  const conflicts = Array.isArray(record.conflicts)
    ? record.conflicts.map(parseConflict).filter((item): item is ConflictView => item !== null)
    : skills.flatMap((skill) => skill.conflicts);
  const blockingConflicts = conflicts.filter((conflict) => conflict.blocking).length;
  const summary: Summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === 'disabled').length,
    blockingConflicts,
    warnings: conflicts.length - blockingConflicts,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0),
  };
  return {
    skills,
    conflicts,
    summary,
    root: parseRoot(record.root),
    scannedAt: asNumber(record.scannedAt),
  };
};

const request = async (method: 'GET' | 'POST', path: string, body?: unknown): Promise<unknown> => {
  const response = await host.serviceRequest({
    method,
    path,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  let parsed: unknown;
  try {
    parsed = JSON.parse(response.body) as unknown;
  } catch {
    throw new ServiceError('服务返回了无法识别的数据，请重试。', 'parse', []);
  }
  if (response.status >= 400) {
    const record = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
    const message = typeof record.error === 'string' ? record.error : `请求失败（${response.status}）`;
    const code = typeof record.code === 'string' ? record.code : null;
    const conflicts = Array.isArray(record.conflicts)
      ? record.conflicts.map(parseConflict).filter((item): item is ConflictView => item !== null)
      : [];
    throw new ServiceError(message, code, conflicts);
  }
  return parsed;
};

const describeError = (error: unknown): string => {
  if (error instanceof HostRequestError) {
    if (error.code === 'NO_SERVICE') return '请在设置 → 扩展中允许“技能开关”运行本地服务。';
    if (error.code === 'SERVICE_FAILED') return '本地服务尚未就绪，请重新加载扩展后重试。';
    if (error.code === 'DISABLED') return '技能开关扩展已停用，请在扩展设置中启用。';
    if (error.code === 'HOST_TIMEOUT') return '本地服务响应超时，请重试。';
    return '无法连接本地服务，请检查扩展授权。';
  }
  if (error instanceof ServiceError) return error.message;
  return error instanceof Error ? error.message : '操作失败，请重试。';
};

const app = el('main', 'ext sk');
app.setAttribute('aria-label', '技能开关');
const header = el('header', 'sk-header');
const titleRow = el('div', 'sk-title-row');
const title = el('h1', 'sk-title', '技能开关');
const actionRoot = el('div', 'sk-actions');
const refresh = mountButton(actionRoot, {
  label: '重新扫描',
  variant: 'outline',
  size: 'sm',
  onClick: () => void loadSkills(true),
});
const enableAll = mountButton(actionRoot, {
  label: '全部启用',
  variant: 'outline',
  size: 'sm',
  onClick: () => requestBulk(true),
});
const disableAll = mountButton(actionRoot, {
  label: '全部关闭',
  variant: 'outline',
  size: 'sm',
  onClick: () => requestBulk(false),
});
titleRow.append(title, actionRoot);
const summary = el('p', 'sk-summary');
const summarySecondary = el('p', 'sk-summary sk-summary-secondary');
header.append(titleRow, summary, summarySecondary);

const body = el('div', 'sk-body');
const noticeRoot = el('div', 'sk-notice-root');
noticeRoot.setAttribute('aria-live', 'polite');
const conflictRoot = el('div');
const search = el('input', 'sk-search') as HTMLInputElement;
search.type = 'search';
search.placeholder = '搜索名称或 ID';
search.setAttribute('aria-label', '搜索技能');
search.addEventListener('input', () => {
  query = search.value.trim().toLowerCase();
  renderList();
});
const listRoot = el('div', 'sk-list');
listRoot.setAttribute('role', 'list');
const footer = el('footer', 'sk-footer');
footer.append(
  el('p', '', '管理 ~/.config/opencode/skills。关闭会把技能入口改名为 .disabled；OpenCode 不再加载，模型也看不到。'),
  el('p', '', '只显示这个目录里的文件技能。停用或卸载前先全部启用；技能更新后重新扫描。'),
);
body.append(noticeRoot, conflictRoot, search, listRoot, footer);
app.append(header, body);
root.append(app);

let data: SkillsResponse | null = null;
let loading = false;
let loadError: string | null = null;
let notice: Notice | null = null;
let busy: string | null = null;
let pendingBulk: boolean | null = null;
let query = '';
let initialized = false;

const rootBlocked = (): boolean => Boolean(data?.root.error);

const toneForState = (skill: SkillView): Tone => {
  if (skill.state === 'conflict') return 'error';
  if (skill.state === 'mixed') return 'warning';
  if (skill.state === 'disabled') return 'info';
  return skill.advertised ? 'success' : 'warning';
};

const stateText = (skill: SkillView): string => {
  if (skill.state === 'conflict') return '冲突';
  if (skill.state === 'mixed') return '混合';
  if (skill.state === 'disabled') return '关闭';
  return '开启';
};

const badge = (text: string, tone: Tone | 'neutral' = 'neutral'): HTMLSpanElement => {
  const node = el('span', 'sk-badge', text);
  node.dataset.tone = tone;
  return node;
};

const conflictTitle = (kind: ConflictKind): string => {
  switch (kind) {
    case 'both':
      return '入口和停用文件同时存在';
    case 'duplicate':
      return '同 ID 多个入口';
    case 'invalid':
      return 'frontmatter 无法解析';
    case 'empty':
      return '入口文件为空';
    case 'read-error':
      return '入口无法读取';
    case 'manual':
      return '仅手动调用';
    case 'no-description':
      return '没有 description';
    default:
      return '冲突';
  }
};

const pathLine = (label: string, file: string | null): HTMLElement | null => {
  if (!file) return null;
  const line = el('p', 'sk-path');
  line.append(el('span', 'sk-path-label', `${label}：`), el('code', '', file));
  return line;
};

const actionButton = (label: string, onClick: () => void, primary = false, disabled = false): HTMLButtonElement => {
  const button = el('button', primary ? 'sk-inline-button sk-inline-primary' : 'sk-inline-button', label);
  button.type = 'button';
  button.disabled = Boolean(busy) || disabled;
  button.addEventListener('click', onClick);
  return button;
};

const conflictItem = (conflict: ConflictView): HTMLElement => {
  const item = el('li', 'sk-conflict-item');
  item.dataset.tone = conflict.blocking ? 'error' : 'warning';
  const copy = el('div', 'sk-conflict-copy');
  copy.append(el('strong', '', conflictTitle(conflict.kind)), el('p', 'sk-conflict-message', conflict.message));
  if (conflict.kind === 'both') {
    copy.append(pathLine('启用入口', conflict.activePath) ?? el('span'));
    copy.append(pathLine('停用入口', conflict.disabledPath) ?? el('span'));
  } else if (conflict.activePath ?? conflict.disabledPath) {
    copy.append(pathLine('入口', conflict.activePath ?? conflict.disabledPath) ?? el('span'));
  }
  item.append(copy);

  if (conflict.kind === 'both' && conflict.activePath) {
    const actions = el('div', 'sk-conflict-actions');
    actions.append(
      actionButton('保留启用', () => void resolveConflict(conflict, 'enabled'), false, rootBlocked()),
      actionButton('保留关闭', () => void resolveConflict(conflict, 'disabled'), false, rootBlocked()),
    );
    item.append(actions);
  }
  return item;
};

const renderConflicts = (): void => {
  conflictRoot.replaceChildren();
  if (!data) return;
  const rootConflicts: ConflictView[] = data.root.error
    ? [{
        kind: 'read-error',
        skillId: '',
        message: `技能目录无法读取：${data.root.error}（${data.root.path}）`,
        activePath: null,
        disabledPath: null,
        blocking: true,
      }]
    : [];
  const all = [...rootConflicts, ...data.conflicts];
  const blocking = all.filter((conflict) => conflict.blocking);
  const warnings = all.filter((conflict) => !conflict.blocking);
  if (blocking.length === 0 && warnings.length === 0) return;

  const card = el('section', 'sk-conflicts');
  card.setAttribute('aria-label', '冲突检查');
  const head = el('div', 'sk-section-head');
  head.append(
    el('h2', 'sk-section-title', '冲突检查'),
    el('span', 'sk-section-count', `${blocking.length} 项需要处理 · ${warnings.length} 项提示`),
  );
  card.append(head);

  if (blocking.length > 0) {
    const list = el('ul', 'sk-conflict-list');
    for (const conflict of blocking) list.append(conflictItem(conflict));
    card.append(list);
  }
  if (warnings.length > 0) {
    const details = el('details', 'sk-warning-details');
    details.append(el('summary', '', `提示（${warnings.length}）`));
    const list = el('ul', 'sk-conflict-list');
    for (const conflict of warnings) list.append(conflictItem(conflict));
    details.append(list);
    card.append(details);
  }
  conflictRoot.append(card);
};

const renderNotice = (): void => {
  noticeRoot.replaceChildren();
  if (pendingBulk !== null) {
    const count = data
      ? data.skills.filter((skill) => (pendingBulk ? skill.disabledPaths.length : skill.activePaths.length) > 0).length
      : 0;
    const node = el('div', 'sk-notice', pendingBulk ? `将启用 ${count} 个技能。` : `将关闭 ${count} 个技能。`);
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(pendingBulk ? '确认启用' : '确认关闭', () => void applyBulk(), true),
      actionButton('取消', () => {
        pendingBulk = null;
        render();
      }),
    );
    node.append(actions);
    noticeRoot.append(node);
    return;
  }
  if (notice) {
    const node = el('div', 'sk-notice', notice.text);
    node.dataset.tone = notice.tone;
    node.setAttribute('role', notice.tone === 'error' ? 'alert' : 'status');
    if (notice.actions?.length) {
      const actions = el('div', 'sk-notice-actions');
      for (const action of notice.actions) actions.append(actionButton(action.label, action.onClick, action.primary));
      node.append(actions);
    }
    noticeRoot.append(node);
    return;
  }
  if (loadError) {
    const node = el('div', 'sk-notice', loadError);
    node.dataset.tone = 'error';
    node.setAttribute('role', 'alert');
    noticeRoot.append(node);
    return;
  }
  if (loading && !data) {
    const node = el('div', 'sk-notice', '正在读取技能…');
    node.dataset.tone = 'info';
    node.setAttribute('role', 'status');
    noticeRoot.append(node);
  }
};

const renderSummary = (): void => {
  if (!data) {
    summary.textContent = loading ? '正在读取技能…' : '尚未读取技能。';
    summarySecondary.textContent = '关闭入口文档后，OpenCode 不会再发现该技能。';
    return;
  }
  summary.textContent = `模型可见 ${data.summary.advertised} / 共 ${data.summary.total} 个 · 约 ${data.summary.estimatedTokens.toLocaleString('zh-CN')} tokens/步`;
  const parts = [`${data.summary.disabled} 个已关闭`];
  if (data.summary.blockingConflicts > 0) parts.push(`${data.summary.blockingConflicts} 项阻塞冲突`);
  else parts.push('无阻塞冲突');
  if (data.summary.warnings > 0) parts.push(`${data.summary.warnings} 项提示`);
  if (data.root.error) parts.push('技能目录无法读取');
  summarySecondary.textContent = `${parts.join(' · ')}。估算不含内置和项目技能。`;
};

const skillAction = (skill: SkillView): HTMLElement => {
  const holder = el('div', 'sk-skill-action');
  const note = el('span', 'sk-action-note');
  const blocked = rootBlocked();

  if (skill.state === 'conflict') {
    note.textContent = blocked ? '目录无法读取' : '先处理冲突';
    const button = el('button', 'sk-inline-button', '处理冲突');
    button.type = 'button';
    button.disabled = Boolean(busy) || blocked;
    button.addEventListener('click', () => {
      conflictRoot.scrollIntoView({ block: 'nearest' });
      conflictRoot.querySelector<HTMLButtonElement>('button')?.focus();
    });
    holder.append(note, button);
    return holder;
  }

  if (skill.state === 'mixed') {
    note.textContent = blocked ? '目录无法读取' : '部分入口关闭';
    const actions = el('div', 'sk-mini-actions');
    const on = el('button', 'sk-inline-button', '全部启用');
    on.type = 'button';
    on.disabled = Boolean(busy) || blocked;
    on.addEventListener('click', () => void toggleSkill(skill, true));
    const off = el('button', 'sk-inline-button', '全部关闭');
    off.type = 'button';
    off.disabled = Boolean(busy) || blocked;
    off.addEventListener('click', () => void toggleSkill(skill, false));
    actions.append(on, off);
    holder.append(note, actions);
    return holder;
  }

  const checked = skill.state === 'enabled';
  const control = el('button', 'sk-switch');
  control.type = 'button';
  control.setAttribute('role', 'switch');
  control.setAttribute('aria-checked', checked ? 'true' : 'false');
  control.setAttribute('aria-label', `${checked ? '关闭' : '启用'} ${skill.name}`);
  control.dataset.skillId = skill.id;
  control.disabled = Boolean(busy) || blocked;
  control.append(el('span', 'sk-thumb'));
  control.addEventListener('click', () => {
    if (control.disabled) return;
    void toggleSkill(skill, !checked);
  });

  if (checked) note.textContent = blocked ? '目录无法读取' : skill.advertised ? '模型可见' : '模型不可见';
  else note.textContent = blocked ? '目录无法读取' : '入口已关闭';
  holder.append(note, control);
  return holder;
};

const renderSkill = (skill: SkillView): HTMLElement => {
  const row = el('article', 'sk-skill');
  row.dataset.state = skill.state;
  row.setAttribute('role', 'listitem');
  const main = el('div', 'sk-skill-main');
  const head = el('div', 'sk-skill-head');
  head.append(el('strong', 'sk-name', skill.name), badge(stateText(skill), toneForState(skill)));
  const meta = el('div', 'sk-meta');
  meta.append(el('code', 'sk-id', skill.id));
  const description = el('p', 'sk-desc', skill.description || '无 description，模型不会自动选用。');
  main.append(head, meta, description);
  if (skill.warnings.length > 0) {
    const warning = el('p', 'sk-warn', skill.warnings.slice(0, 2).join(' · '));
    main.append(warning);
  }
  row.append(main, skillAction(skill));
  return row;
};

const renderList = (): void => {
  listRoot.replaceChildren();
  if (!data) return;
  const skills = data.skills.filter((skill) => {
    if (!query) return true;
    const haystack = [skill.id, skill.name, skill.description, ...skill.warnings].join(' ').toLowerCase();
    return haystack.includes(query);
  });
  if (skills.length === 0) {
    const empty = el('div', 'sk-empty');
    empty.append(
      el('h2', '', data.skills.length === 0 ? '没有发现技能' : '没有匹配的技能'),
      el('p', '', data.skills.length === 0
        ? '检查 ~/.config/opencode/skills 是否存在，或重新扫描。'
        : '换一个搜索词。'),
    );
    listRoot.append(empty);
    return;
  }
  for (const skill of skills) listRoot.append(renderSkill(skill));
};

const render = (): void => {
  app.setAttribute('aria-busy', loading ? 'true' : 'false');
  renderSummary();
  renderNotice();
  renderConflicts();
  renderList();
  refresh.update({ label: loading ? '读取中…' : '重新扫描', loading, disabled: loading || Boolean(busy) });
  const blocked = rootBlocked();
  enableAll.update({ disabled: loading || Boolean(busy) || !data || blocked });
  disableAll.update({ disabled: loading || Boolean(busy) || !data || blocked });
};

const focusSkill = (id: string): void => {
  const target = Array.from(document.querySelectorAll<HTMLElement>('[data-skill-id]')).find(
    (node) => node.dataset.skillId === id,
  );
  target?.focus();
};

const loadSkills = async (showLoading = false, silent = false): Promise<void> => {
  if (loading) return;
  loading = true;
  if (!silent) loadError = null;
  if (showLoading) render();
  try {
    data = parseResponse(await request('GET', '/skills'));
    loadError = null;
  } catch (error) {
    if (!silent) loadError = describeError(error);
  } finally {
    loading = false;
    render();
  }
};

const toggleSkill = async (skill: SkillView, enabled: boolean): Promise<void> => {
  if (busy) return;
  busy = `toggle:${skill.id}`;
  pendingBulk = null;
  notice = null;
  render();
  try {
    data = parseResponse(await request('POST', '/skills/toggle', { id: skill.id, enabled }));
    notice = {
      text: enabled ? `已启用 ${skill.name}。` : `已关闭 ${skill.name}；OpenCode 下一次扫描后不再发现它。`,
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: enabled ? `已启用 ${skill.name}` : `已关闭 ${skill.name}` }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
  focusSkill(skill.id);
};

const resolveConflict = async (conflict: ConflictView, keep: 'enabled' | 'disabled'): Promise<void> => {
  if (busy) return;
  const entryPath = conflict.activePath ?? conflict.disabledPath;
  if (!entryPath) return;
  busy = `resolve:${entryPath}`;
  notice = null;
  render();
  try {
    const raw = await request('POST', '/skills/resolve', { path: entryPath, keep });
    const backupPath = raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>).backupPath === 'string'
      ? (raw as Record<string, string>).backupPath
      : null;
    data = parseResponse(raw);
    notice = {
      text: `已保留${keep === 'enabled' ? '启用' : '关闭'}入口${backupPath ? `；旧停用文件备份为 ${backupPath}` : ''}。`,
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: '入口冲突已处理' }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
};

const requestBulk = (enabled: boolean): void => {
  if (!data || busy) return;
  pendingBulk = enabled;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyBulk = async (): Promise<void> => {
  if (pendingBulk === null || busy) return;
  const enabled = pendingBulk;
  pendingBulk = null;
  busy = 'bulk';
  notice = null;
  render();
  try {
    const raw = await request('POST', '/skills/bulk', { enabled });
    const changed = raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).changed)
      ? ((raw as Record<string, unknown>).changed as unknown[]).filter((item): item is string => typeof item === 'string')
      : [];
    data = parseResponse(raw);
    notice = {
      text: `${enabled ? '已启用' : '已关闭'} ${changed.length} 个技能。`,
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: `${enabled ? '已启用' : '已关闭'} ${changed.length} 个技能` }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
};

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  document.documentElement.lang = context.locale.startsWith('zh') ? context.locale : 'zh-CN';
  if (initialized) {
    render();
    return;
  }
  initialized = true;
  void loadSkills(true);
});

render();
