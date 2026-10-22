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
  TranslationCache,
  TranslationEntry,
} from '../shared/types.ts';
import { SKILL_GROUPS, type SkillGroup } from '../shared/groups.ts';
import { TRANSLATION_SYSTEM, buildTranslationPrompt, parseTranslationResponse } from './translate.ts';
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
    contentHash: asString(record.contentHash),
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

const emptyTranslations = (): TranslationCache => ({ version: 1, locale: 'zh-CN', entries: {} });

const parseTranslationCache = (value: unknown): TranslationCache => {
  if (!value || typeof value !== 'object') throw new ServiceError('翻译缓存格式不正确。', 'parse', []);
  const record = value as Record<string, unknown>;
  if (record.version !== 1 || record.locale !== 'zh-CN' || !record.entries || typeof record.entries !== 'object' || Array.isArray(record.entries)) {
    throw new ServiceError('翻译缓存格式不正确。', 'parse', []);
  }
  const entries: Record<string, TranslationEntry> = {};
  for (const [id, item] of Object.entries(record.entries as Record<string, unknown>)) {
    if (!item || typeof item !== 'object') continue;
    const entry = item as Record<string, unknown>;
    if (
      typeof entry.hash !== 'string' ||
      typeof entry.nameZh !== 'string' ||
      typeof entry.descriptionZh !== 'string' ||
      typeof entry.updatedAt !== 'number'
    ) {
      continue;
    }
    entries[id] = {
      hash: entry.hash,
      nameZh: entry.nameZh.trim(),
      descriptionZh: entry.descriptionZh.trim(),
      updatedAt: entry.updatedAt,
    };
  }
  return { version: 1, locale: 'zh-CN', entries };
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
    if (error.code === 'NOT_GRANTED') return '请在扩展设置中允许“模型调用”权限，或重新安装扩展。';
    if (error.code === 'UNSUPPORTED') return '当前宿主或模型不支持翻译请求。';
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
  onClick: () => void loadAll(true),
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

const translationRow = el('div', 'sk-translation-row');
const translationSegment = el('div', 'sk-segment');
translationSegment.setAttribute('role', 'group');
translationSegment.setAttribute('aria-label', '技能说明语言');
const translateButton = el('button', 'sk-segment-button', '翻译');
translateButton.type = 'button';
translateButton.setAttribute('aria-pressed', 'false');
const originalButton = el('button', 'sk-segment-button', '原文');
originalButton.type = 'button';
originalButton.setAttribute('aria-pressed', 'true');
translationSegment.append(translateButton, originalButton);
const translationStatus = el('span', 'sk-translation-status');
translationStatus.setAttribute('aria-live', 'polite');
translationRow.append(translationSegment, translationStatus);
header.append(titleRow, summary, summarySecondary, translationRow);

const body = el('div', 'sk-body');
const noticeRoot = el('div', 'sk-notice-root');
noticeRoot.setAttribute('aria-live', 'polite');
const groupsRoot = el('div', 'sk-groups');
const groupBarRoot = el('div');
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
body.append(noticeRoot, groupsRoot, groupBarRoot, conflictRoot, search, listRoot, footer);
app.append(header, body);
root.append(app);

let data: SkillsResponse | null = null;
let translations: TranslationCache = emptyTranslations();
let displayMode: 'original' | 'translated' = 'original';
let translationPreferenceSet = false;
let translating = false;
let translationProgress = { done: 0, total: 0 };
let translationError: string | null = null;
let loading = false;
let loadError: string | null = null;
let notice: Notice | null = null;
let busy: string | null = null;
let pendingBulk: boolean | null = null;
let pendingOnlyGroup: SkillGroup | null = null;
let selectedGroup: string | null = null;
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
  if (pendingOnlyGroup) {
    const group = pendingOnlyGroup;
    const memberIds = new Set(group.skillIds);
    const others = data ? data.skills.filter((skill) => !memberIds.has(skill.id)).length : 0;
    const node = el('div', 'sk-notice', `仅启用「${group.name}」：将关闭其他 ${others} 个技能。`);
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton('确认', () => void applyOnlyGroup(), true),
      actionButton('取消', () => {
        pendingOnlyGroup = null;
        render();
      }),
    );
    node.append(actions);
    noticeRoot.append(node);
    return;
  }
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
  if (translationError) {
    const node = el('div', 'sk-notice', translationError);
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

const translationEntry = (skill: SkillView): TranslationEntry | null => {
  const entry = translations.entries[skill.id];
  return entry && entry.hash === skill.contentHash ? entry : null;
};

const translatedCount = (): number => data?.skills.filter((skill) => translationEntry(skill)).length ?? 0;

const displayName = (skill: SkillView): string => {
  if (displayMode !== 'translated') return skill.name;
  return translationEntry(skill)?.nameZh || skill.name;
};

const displayDescription = (skill: SkillView): string => {
  if (displayMode !== 'translated') return skill.description;
  const entry = translationEntry(skill);
  return entry?.descriptionZh || skill.description;
};

const renderTranslationControls = (): void => {
  translateButton.setAttribute('aria-pressed', displayMode === 'translated' ? 'true' : 'false');
  originalButton.setAttribute('aria-pressed', displayMode === 'original' ? 'true' : 'false');
  translateButton.disabled = translating;
  const total = data?.skills.length ?? 0;
  const translated = translatedCount();
  if (translating) translationStatus.textContent = `翻译 ${translationProgress.done}/${translationProgress.total}…`;
  else if (displayMode === 'translated') translationStatus.textContent = translated ? `${translated}/${total} 已翻译` : '点“翻译”生成中文';
  else translationStatus.textContent = translated ? `${translated} 个有中文` : '';
};

const groupSkillIds = (group: SkillGroup): string[] =>
  group.skillIds.filter((id) => data?.skills.some((skill) => skill.id === id));

const groupState = (group: SkillGroup): string => {
  const skills = groupSkillIds(group)
    .map((id) => data?.skills.find((skill) => skill.id === id))
    .filter((skill): skill is SkillView => Boolean(skill));
  if (skills.length === 0) return '无技能';
  if (skills.some((skill) => skill.state === 'conflict')) return '有冲突';
  const enabled = skills.filter((skill) => skill.state === 'enabled').length;
  if (enabled === skills.length) return '全开';
  if (enabled === 0) return '全关';
  return '部分';
};

const focusGroupChip = (id: string): void => {
  const target = Array.from(groupsRoot.querySelectorAll<HTMLElement>('[data-group]')).find(
    (node) => node.dataset.group === id,
  );
  target?.focus();
};

const renderGroups = (): void => {
  groupsRoot.replaceChildren();
  const total = data?.skills.length ?? 0;
  const all = el('button', 'sk-chip', `全部 ${total}`);
  all.type = 'button';
  all.dataset.group = 'all';
  all.setAttribute('aria-pressed', selectedGroup === null ? 'true' : 'false');
  all.addEventListener('click', () => {
    selectedGroup = null;
    render();
    focusGroupChip('all');
  });
  groupsRoot.append(all);
  for (const group of SKILL_GROUPS) {
    const count = groupSkillIds(group).length;
    const chip = el('button', 'sk-chip', `${group.name} ${count}`);
    chip.type = 'button';
    chip.dataset.group = group.id;
    chip.setAttribute('aria-pressed', selectedGroup === group.id ? 'true' : 'false');
    chip.addEventListener('click', () => {
      selectedGroup = group.id;
      render();
      focusGroupChip(group.id);
    });
    groupsRoot.append(chip);
  }
};

const renderGroupBar = (): void => {
  groupBarRoot.replaceChildren();
  if (!data || !selectedGroup) return;
  const current = data;
  const group = SKILL_GROUPS.find((item) => item.id === selectedGroup);
  if (!group) return;
  const available = groupSkillIds(group);
  const missing = group.skillIds.filter((id) => !available.includes(id));
  const skills = available
    .map((id) => current.skills.find((skill) => skill.id === id))
    .filter((skill): skill is SkillView => Boolean(skill));
  const conflict = skills.some((skill) => skill.state === 'conflict');
  const blocked = rootBlocked() || conflict || available.length === 0;
  const bar = el('div', 'sk-groupbar');
  const text = el('div', 'sk-groupbar-text');
  text.append(el('strong', '', group.name), el('span', 'sk-group-state', `${available.length} 个 · ${groupState(group)}`));
  if (missing.length > 0) text.append(el('p', 'sk-group-warning', `缺失：${missing.join('、')}`));
  const actions = el('div', 'sk-groupbar-actions');
  actions.append(
    actionButton('启用整组', () => void runGroup(group, true), false, blocked),
    actionButton('关闭整组', () => void runGroup(group, false), false, blocked),
  );
  const only = actionButton('仅启用本组', () => requestOnlyGroup(group), false, blocked || missing.length > 0);
  if (missing.length > 0) only.title = '分组里有缺失技能，先处理后再仅启用本组';
  actions.append(only);
  bar.append(text, actions);
  groupBarRoot.append(bar);
};

const runGroup = async (group: SkillGroup, enabled: boolean): Promise<void> => {
  if (!data || busy) return;
  const ids = groupSkillIds(group);
  if (ids.length === 0) return;
  busy = `group:${group.id}:${enabled ? 'on' : 'off'}`;
  pendingOnlyGroup = null;
  pendingBulk = null;
  notice = null;
  render();
  try {
    data = parseResponse(await request('POST', '/skills/batch', {
      enable: enabled ? ids : [],
      disable: enabled ? [] : ids,
    }));
    notice = {
      text: `已${enabled ? '启用' : '关闭'}「${group.name}」的 ${ids.length} 个技能。`,
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: `${enabled ? '已启用' : '已关闭'}「${group.name}」` }).catch(() => undefined);
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

const requestOnlyGroup = (group: SkillGroup): void => {
  if (!data || busy) return;
  const available = groupSkillIds(group);
  const missing = group.skillIds.filter((id) => !available.includes(id));
  if (available.length === 0 || missing.length > 0) return;
  pendingOnlyGroup = group;
  pendingBulk = null;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyOnlyGroup = async (): Promise<void> => {
  if (!data || busy || !pendingOnlyGroup) return;
  const group = pendingOnlyGroup;
  pendingOnlyGroup = null;
  const enable = groupSkillIds(group);
  const missing = group.skillIds.filter((id) => !enable.includes(id));
  if (enable.length === 0 || missing.length > 0) {
    notice = { text: '分组里有缺失技能，未执行。', tone: 'error' };
    render();
    return;
  }
  const memberIds = new Set(group.skillIds);
  const disable = data.skills.filter((skill) => !memberIds.has(skill.id)).map((skill) => skill.id);
  busy = `group-only:${group.id}`;
  notice = null;
  render();
  try {
    data = parseResponse(await request('POST', '/skills/batch', { enable, disable }));
    notice = {
      text: `已仅启用「${group.name}」，关闭其他 ${disable.length} 个技能。`,
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: `已仅启用「${group.name}」` }).catch(() => undefined);
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

translateButton.addEventListener('click', () => {
  translationPreferenceSet = true;
  displayMode = 'translated';
  render();
  void translateMissing();
});
originalButton.addEventListener('click', () => {
  translationPreferenceSet = true;
  displayMode = 'original';
  render();
});

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

const renderSkill = (skill: SkillView, step = 0): HTMLElement => {
  const row = el('article', 'sk-skill');
  row.dataset.state = skill.state;
  row.setAttribute('role', 'listitem');
  const main = el('div', 'sk-skill-main');
  const head = el('div', 'sk-skill-head');
  if (step > 0) {
    const marker = el('span', 'sk-step', String(step));
    marker.title = `第 ${step} 步`;
    marker.setAttribute('aria-label', `第 ${step} 步`);
    head.append(marker);
  }
  const translated = displayMode === 'translated' ? translationEntry(skill) : null;
  head.append(el('strong', 'sk-name', translated?.nameZh || skill.name), badge(stateText(skill), toneForState(skill)));
  const meta = el('div', 'sk-meta');
  if (translated) meta.append(el('span', 'sk-original-name', skill.name));
  meta.append(el('code', 'sk-id', skill.id));
  const description = el('p', 'sk-desc', translated?.descriptionZh || skill.description || '无 description，模型不会自动选用。');
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
  const group = selectedGroup ? SKILL_GROUPS.find((item) => item.id === selectedGroup) : null;
  const base = group
    ? group.skillIds
        .map((id) => data?.skills.find((skill) => skill.id === id))
        .filter((skill): skill is SkillView => Boolean(skill))
    : data.skills;
  const skills = base.filter((skill) => {
    if (!query) return true;
    const entry = translationEntry(skill);
    const haystack = [
      skill.id,
      skill.name,
      skill.description,
      entry?.nameZh ?? '',
      entry?.descriptionZh ?? '',
      ...skill.warnings,
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  });
  if (skills.length === 0) {
    const empty = el('div', 'sk-empty');
    empty.append(
      el('h2', '', data.skills.length === 0 ? '没有发现技能' : group ? '这个分组没有可用技能' : '没有匹配的技能'),
      el('p', '', data.skills.length === 0
        ? '检查 ~/.config/opencode/skills 是否存在，或重新扫描。'
        : group ? '检查分组里的技能是否被移除。' : '换一个搜索词。'),
    );
    listRoot.append(empty);
    return;
  }
  for (const skill of skills) {
    const step = group && group.skillIds.length > 1 ? group.skillIds.indexOf(skill.id) + 1 : 0;
    listRoot.append(renderSkill(skill, step));
  }
};

const render = (): void => {
  app.setAttribute('aria-busy', loading ? 'true' : 'false');
  renderSummary();
  renderTranslationControls();
  renderNotice();
  renderGroups();
  renderGroupBar();
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

const saveTranslations = async (): Promise<void> => {
  try {
    translations = parseTranslationCache(await request('POST', '/translations', translations));
    translationError = null;
  } catch (error) {
    translationError = describeError(error);
  }
};

const translateMissing = async (): Promise<void> => {
  if (!data || translating) return;
  const pending = data.skills.filter((skill) => !translationEntry(skill));
  if (pending.length === 0) {
    notice = { text: '中文说明已是最新。', tone: 'success' };
    render();
    return;
  }
  translating = true;
  translationError = null;
  translationProgress = { done: 0, total: pending.length };
  notice = null;
  render();
  let done = 0;
  let failed = 0;
  let aborted = false;
  try {
    for (let index = 0; index < pending.length; index += 4) {
      const batch = pending.slice(index, index + 4);
      let remaining = batch;
      for (let attempt = 0; attempt < 2 && remaining.length > 0; attempt += 1) {
        const generated = await host.generate({
          prompt: buildTranslationPrompt(remaining.map((skill) => ({
            id: skill.id,
            name: skill.name,
            description: skill.description,
          }))),
          system: TRANSLATION_SYSTEM,
          maxOutputTokens: 2048,
        });
        const parsed = parseTranslationResponse(generated.text);
        const accepted = new Set<string>();
        for (const item of parsed) {
          const skill = remaining.find((candidate) => candidate.id === item.id);
          if (!skill) continue;
          translations.entries[skill.id] = {
            hash: skill.contentHash,
            nameZh: item.nameZh,
            descriptionZh: item.descriptionZh,
            updatedAt: Date.now(),
          };
          accepted.add(skill.id);
        }
        remaining = remaining.filter((skill) => !accepted.has(skill.id));
      }
      failed += remaining.length;
      done += batch.length - remaining.length;
      translationProgress = { done, total: pending.length };
      await saveTranslations();
      render();
    }
  } catch (error) {
    aborted = true;
    translationError = describeError(error);
    notice = { text: translationError, tone: 'error' };
  } finally {
    translating = false;
    if (!aborted) {
      if (translationError) {
        notice = { text: `翻译完成，但缓存保存失败：${translationError}`, tone: 'warning' };
      } else if (failed > 0) {
        notice = { text: `已翻译 ${done} 个技能，${failed} 个失败；可再点“翻译”重试。`, tone: 'warning' };
      } else {
        notice = { text: `已翻译 ${done} 个技能。`, tone: 'success' };
      }
    }
    render();
  }
};

const loadAll = async (showLoading = false): Promise<void> => {
  if (loading) return;
  loading = true;
  if (showLoading) render();
  const [skillsResult, translationsResult] = await Promise.allSettled([
    request('GET', '/skills'),
    request('GET', '/translations'),
  ]);
  if (skillsResult.status === 'fulfilled') {
    try {
      data = parseResponse(skillsResult.value);
      loadError = null;
    } catch (error) {
      loadError = describeError(error);
    }
  } else {
    loadError = describeError(skillsResult.reason);
  }
  if (translationsResult.status === 'fulfilled') {
    try {
      translations = parseTranslationCache(translationsResult.value);
      translationError = null;
      if (!translationPreferenceSet && Object.keys(translations.entries).length > 0) {
        displayMode = 'translated';
      }
    } catch (error) {
      translationError = describeError(error);
    }
  } else {
    translationError = describeError(translationsResult.reason);
  }
  loading = false;
  render();
};

const toggleSkill = async (skill: SkillView, enabled: boolean): Promise<void> => {
  if (busy) return;
  busy = `toggle:${skill.id}`;
  pendingBulk = null;
  pendingOnlyGroup = null;
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
  pendingOnlyGroup = null;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyBulk = async (): Promise<void> => {
  if (pendingBulk === null || busy) return;
  const enabled = pendingBulk;
  pendingBulk = null;
  pendingOnlyGroup = null;
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
  void loadAll(true);
});

render();
