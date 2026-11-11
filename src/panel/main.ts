import { connectHost, HostRequestError } from '@openchamber/sdk';
import type { LateGenerateResult } from '@openchamber/sdk';
import {
  applyHostReady,
  mountButton,
  mountMenu,
  mountProgress,
  mountSearchField,
  mountSelect,
  mountTabs,
  type ProgressHandle,
} from '@openchamber/sdk/ui';
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
import {
  GROUP_NAME_MAX,
  mergeExampleGroups,
  moveGroupMember,
  normalizeGroupsFile,
  type SkillGroup,
} from '../shared/groups.ts';
import {
  filterAndSortSkills,
  matchesSkillQuery,
  type SkillSortMode,
  type SkillStateFilter,
} from '../shared/filter.ts';
import { TRANSLATION_SYSTEM, buildTranslationPrompt, parseTranslationResponse } from './translate.ts';
import { installScrollbarActivity } from './scrollbar.ts';
import css from './style.css';
import native from '../../ui/native.css';
import { applyDocumentLanguage, i18n, serverText } from './i18n.ts';

const { t } = i18n;
const host = connectHost({ requestTimeoutMs: 30_000 });
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
installScrollbarActivity(document);
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
type GroupDraft = { id: string | null; name: string; members: string[] };

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
    message: asString(record.message, t('冲突')),
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
    throw new ServiceError(t('服务返回的技能目录信息不正确。'), 'parse', []);
  }
  const record = value as Record<string, unknown>;
  return {
    path: asString(record.path),
    exists: asBool(record.exists),
    error: typeof record.error === 'string' ? record.error : null,
  };
};

const parseResponse = (value: unknown): SkillsResponse => {
  if (!value || typeof value !== 'object') throw new ServiceError(t('服务返回的数据格式不正确。'), 'parse', []);
  const record = value as Record<string, unknown>;
  if (!Array.isArray(record.skills)) throw new ServiceError(t('服务返回的数据格式不正确。'), 'parse', []);
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
  if (!value || typeof value !== 'object') throw new ServiceError(t('翻译缓存格式不正确。'), 'parse', []);
  const record = value as Record<string, unknown>;
  if (record.version !== 1 || record.locale !== 'zh-CN' || !record.entries || typeof record.entries !== 'object' || Array.isArray(record.entries)) {
    throw new ServiceError(t('翻译缓存格式不正确。'), 'parse', []);
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

const parseGroups = (value: unknown): SkillGroup[] => {
  try {
    return normalizeGroupsFile(value).groups;
  } catch (error) {
    throw new ServiceError(error instanceof Error ? serverText(error.message) ?? error.message : t('分组配置格式不正确。'), 'parse', []);
  }
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
    throw new ServiceError(t('服务返回了无法识别的数据，请重试。'), 'parse', []);
  }
  if (response.status >= 400) {
    const record = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
    const message = typeof record.error === 'string' ? serverText(record.error) ?? record.error : t('请求失败（{status}）', { status: response.status });
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
    if (error.code === 'NO_SERVICE') return t('请在设置 → 扩展中允许“技能开关”运行本地服务。');
    if (error.code === 'SERVICE_FAILED') return t('本地服务尚未就绪，请重新加载扩展后重试。');
    if (error.code === 'DISABLED') return t('技能开关扩展已停用，请在扩展设置中启用。');
    if (error.code === 'HOST_TIMEOUT') return t('本地服务响应超时，请重试。');
    if (error.code === 'NOT_GRANTED') return t('请在扩展设置中允许“模型调用”权限，或重新安装扩展。');
    if (error.code === 'UNSUPPORTED') return t('当前宿主或模型不支持翻译请求。');
    return t('无法连接本地服务，请检查扩展授权。');
  }
  if (error instanceof ServiceError) return serverText(error.message) ?? error.message;
  return serverText(error instanceof Error ? error.message : null) ?? t('操作失败，请重试。');
};

const describeGroupsError = (error: unknown): string =>
  error instanceof ServiceError && error.code === 'not-found'
    ? t('本地服务版本过旧，请在扩展设置中禁用再启用“技能开关”。')
    : describeError(error);

const app = el('main', 'ext ext-container sk');
app.setAttribute('aria-label', t('技能开关'));
const header = el('header', 'sk-header');
const titleRow = el('div', 'sk-title-row');
const title = el('h1', 'sk-title', t('技能开关'));
const actionRoot = el('div', 'sk-actions');
const refresh = mountButton(actionRoot, {
  label: t('重新扫描'),
  variant: 'outline',
  size: 'sm',
  onClick: () => {
    void loadAll(true);
    void reloadGroups();
  },
});
const enableAll = mountButton(actionRoot, {
  label: t('全部启用'),
  variant: 'outline',
  size: 'sm',
  onClick: () => requestBulk(true),
});
const disableAll = mountButton(actionRoot, {
  label: t('全部关闭'),
  variant: 'outline',
  size: 'sm',
  onClick: () => requestBulk(false),
});
titleRow.append(title, actionRoot);
const summary = el('p', 'sk-summary');
const summarySecondary = el('p', 'sk-summary sk-summary-secondary');

const translationRow = el('div', 'sk-translation-row');
const translationControls = el('div', 'sk-translation-controls');
const translationTabsSlot = el('div', 'sk-translation-tabs');
translationTabsSlot.setAttribute('aria-label', t('技能说明语言'));
const translateMissingSlot = el('div');
translationControls.append(translationTabsSlot, translateMissingSlot);
const translationProgressSlot = el('div', 'sk-translation-progress');
const translationStatus = el('span', 'sk-translation-status');
translationStatus.setAttribute('aria-live', 'polite');
translationRow.append(translationControls, translationProgressSlot, translationStatus);
header.append(titleRow, summary, summarySecondary, translationRow);

const body = el('div', 'sk-body');
const noticeRoot = el('div', 'sk-notice-root');
noticeRoot.setAttribute('aria-live', 'polite');
const groupsNote = el('div', 'sk-groups-note');
const groupsRow = el('div', 'sk-groups-row');
const groupsRoot = el('div', 'sk-groups');
const groupSelectRoot = el('div', 'sk-group-select');
const editGroups = el('button', 'sk-chip sk-groups-edit', t('编辑分组'));
editGroups.type = 'button';
editGroups.setAttribute('aria-pressed', 'false');
editGroups.addEventListener('click', () => {
  if (groupDraft) closeGroupEditor();
  else openGroupEditor();
});
groupsRow.append(groupsRoot, groupSelectRoot, editGroups);
const groupEditor = el('div', 'sk-group-editor-root');
const groupBarRoot = el('div');
const conflictRoot = el('div');
const toolbar = el('div', 'sk-toolbar');
const searchSlot = el('div', 'sk-search-slot');
const toolbarSelects = el('div', 'sk-toolbar-selects');
const filterSlot = el('div', 'sk-filter-slot');
const sortSlot = el('div', 'sk-sort-slot');
toolbarSelects.append(filterSlot, sortSlot);
toolbar.append(searchSlot, toolbarSelects);
const listRoot = el('div', 'sk-list');
listRoot.setAttribute('role', 'list');
const footer = el('footer', 'sk-footer');
const footerLine1 = el('p', '', t('管理 ~/.config/opencode/skills。关闭会把技能入口改名为 .disabled；OpenCode 不再加载，模型也看不到。'));
const footerLine2 = el('p', '', t('只显示这个目录里的文件技能。停用或卸载前先全部启用；技能更新后重新扫描。'));
footer.append(footerLine1, footerLine2);
body.append(noticeRoot, groupsNote, groupsRow, groupEditor, groupBarRoot, conflictRoot, toolbar, listRoot, footer);
app.append(header, body);
root.append(app);

let data: SkillsResponse | null = null;
let translations: TranslationCache = emptyTranslations();
let displayMode: 'original' | 'translated' = 'original';
let translationPreferenceSet = false;
let translating = false;
let translationProgress = { done: 0, total: 0 };
let translationProgressHandle: ProgressHandle | null = null;
let translationError: string | null = null;
let pendingLateTranslations: LateGenerateResult[] = [];
let loading = false;
let loadError: string | null = null;
let notice: Notice | null = null;
let busy: string | null = null;
let pendingBulk: boolean | null = null;
let pendingOnlyGroup: SkillGroup | null = null;
let selectedGroup: string | null = null;
let groups: SkillGroup[] = [];
let groupsError: string | null = null;
let groupsLoading = true;
let groupDraft: GroupDraft | null = null;
let groupEditorError: string | null = null;
let pendingDeleteGroup = false;
let pendingImportExamples = false;
let memberFilterQuery = '';
let queryRaw = '';
let stateFilter: SkillStateFilter = 'all';
let sortMode: SkillSortMode = 'default';
const expandedSkills = new Set<string>();
let lastBadgeCount: number | null | undefined;
let initialized = false;

const stateFilterOptions = () => [
  { id: 'all', label: t('全部状态') },
  { id: 'enabled', label: t('已启用') },
  { id: 'disabled', label: t('已关闭') },
  { id: 'attention', label: t('冲突与提示') },
];

const sortModeOptions = () => [
  { id: 'default', label: t('默认顺序') },
  { id: 'tokens', label: t('Token 降序') },
];

const translationTabs = mountTabs(translationTabsSlot, {
  items: [
    { id: 'original', label: t('原文') },
    { id: 'translated', label: t('中文译文') },
  ],
  activeId: 'original',
  trackBackground: true,
  onChange: (id) => {
    translationPreferenceSet = true;
    displayMode = id === 'translated' ? 'translated' : 'original';
    render();
    if (displayMode === 'translated') void translateMissing();
  },
});

const translateMissingBtn = mountButton(translateMissingSlot, {
  label: t('补充翻译'),
  variant: 'outline',
  size: 'sm',
  onClick: () => {
    translationPreferenceSet = true;
    displayMode = 'translated';
    render();
    void translateMissing();
  },
});

const searchField = mountSearchField(searchSlot, {
  value: '',
  placeholder: t('搜索名称、描述或 ID（按 / 聚焦）'),
  onChange: (value) => {
    queryRaw = value;
    renderList();
  },
});
const searchInputEl = (): HTMLInputElement | null => searchSlot.querySelector<HTMLInputElement>('input');
const syncSearchAria = (): void => {
  const input = searchInputEl();
  if (input) input.setAttribute('aria-label', t('搜索技能'));
};
syncSearchAria();

const stateSelect = mountSelect(filterSlot, {
  value: 'all',
  options: stateFilterOptions(),
  onChange: (id) => {
    stateFilter = id === 'enabled' || id === 'disabled' || id === 'attention' ? id : 'all';
    renderList();
  },
});
const stateSelectTrigger = filterSlot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (stateSelectTrigger) {
  stateSelectTrigger.setAttribute('aria-label', t('状态筛选'));
  stateSelectTrigger.removeAttribute('aria-labelledby');
}

const sortSelect = mountSelect(sortSlot, {
  value: 'default',
  options: sortModeOptions(),
  onChange: (id) => {
    sortMode = id === 'tokens' ? 'tokens' : 'default';
    renderList();
  },
});
const sortSelectTrigger = sortSlot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (sortSelectTrigger) {
  sortSelectTrigger.setAttribute('aria-label', t('排序方式'));
  sortSelectTrigger.removeAttribute('aria-labelledby');
}

const groupSelect = mountSelect(groupSelectRoot, {
  value: 'all',
  options: [{ id: 'all', label: t('全部') }],
  onChange: (id) => {
    selectedGroup = id === 'all' ? null : id;
    render();
  },
});
const groupSelectTrigger = groupSelectRoot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (groupSelectTrigger) {
  groupSelectTrigger.setAttribute('aria-label', t('分组筛选'));
  groupSelectTrigger.removeAttribute('aria-labelledby');
}

document.addEventListener('keydown', (event) => {
  if (event.defaultPrevented) return;
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable)
    ) {
      return;
    }
    const input = searchInputEl();
    if (input) {
      event.preventDefault();
      input.focus();
      input.select();
    }
    return;
  }
  if (event.key === 'Escape') {
    if (pendingOnlyGroup || pendingBulk !== null) {
      event.preventDefault();
      pendingOnlyGroup = null;
      pendingBulk = null;
      render();
      return;
    }
    if (groupDraft && !busy) {
      event.preventDefault();
      if (pendingDeleteGroup || pendingImportExamples) {
        pendingDeleteGroup = false;
        pendingImportExamples = false;
        render();
      } else {
        closeGroupEditor();
      }
    }
  }
});

const rootBlocked = (): boolean => Boolean(data?.root.error);

const toneForState = (skill: SkillView): Tone => {
  if (skill.state === 'conflict') return 'error';
  if (skill.state === 'mixed') return 'warning';
  if (skill.state === 'disabled') return 'info';
  return skill.advertised ? 'success' : 'warning';
};

const stateText = (skill: SkillView): string => {
  if (skill.state === 'conflict') return t('冲突');
  if (skill.state === 'mixed') return t('混合');
  if (skill.state === 'disabled') return t('关闭');
  return t('开启');
};

const badge = (text: string, tone: Tone | 'neutral' = 'neutral'): HTMLSpanElement => {
  const node = el('span', 'sk-badge', text);
  node.dataset.tone = tone;
  return node;
};

const conflictTitle = (kind: ConflictKind): string => {
  switch (kind) {
    case 'both':
      return t('入口和停用文件同时存在');
    case 'duplicate':
      return t('同 ID 多个入口');
    case 'invalid':
      return t('frontmatter 无法解析');
    case 'empty':
      return t('入口文件为空');
    case 'read-error':
      return t('入口无法读取');
    case 'manual':
      return t('仅手动调用');
    case 'no-description':
      return t('没有 description');
    default:
      return t('冲突');
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
  copy.append(el('strong', '', conflictTitle(conflict.kind)), el('p', 'sk-conflict-message', serverText(conflict.message) ?? conflict.message));
  if (conflict.kind === 'both') {
    copy.append(pathLine(t('启用入口'), conflict.activePath) ?? el('span'));
    copy.append(pathLine(t('停用入口'), conflict.disabledPath) ?? el('span'));
  } else if (conflict.activePath ?? conflict.disabledPath) {
    copy.append(pathLine(t('入口'), conflict.activePath ?? conflict.disabledPath) ?? el('span'));
  }
  item.append(copy);

  if (conflict.kind === 'both' && conflict.activePath) {
    const actions = el('div', 'sk-conflict-actions');
    actions.append(
      actionButton(t('保留启用'), () => void resolveConflict(conflict, 'enabled'), false, rootBlocked()),
      actionButton(t('保留关闭'), () => void resolveConflict(conflict, 'disabled'), false, rootBlocked()),
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
        message: t('技能目录无法读取：{error}（{path}）', { error: serverText(data.root.error) ?? data.root.error, path: data.root.path }),
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
  card.setAttribute('aria-label', t('冲突检查'));
  const head = el('div', 'sk-section-head');
  head.append(
    el('h2', 'sk-section-title', t('冲突检查')),
    el('span', 'sk-section-count', t('{blocking} 项需要处理 · {warnings} 项提示', { blocking: blocking.length, warnings: warnings.length })),
  );
  card.append(head);

  if (blocking.length > 0) {
    const list = el('ul', 'sk-conflict-list');
    for (const conflict of blocking) list.append(conflictItem(conflict));
    card.append(list);
  }
  if (warnings.length > 0) {
    const details = el('details', 'sk-warning-details');
    details.append(el('summary', '', t('提示（{count}）', { count: warnings.length })));
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
    const node = el('div', 'sk-notice', t('仅启用「{name}」：将关闭其他 {count} 个技能。', { name: group.name, count: others }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(t('确认'), () => void applyOnlyGroup(), true),
      actionButton(t('取消'), () => {
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
    const node = el('div', 'sk-notice', pendingBulk ? t('将启用 {count} 个技能。', { count }) : t('将关闭 {count} 个技能。', { count }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(pendingBulk ? t('确认启用') : t('确认关闭'), () => void applyBulk(), true),
      actionButton(t('取消'), () => {
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
    const node = el('div', 'sk-notice', t('正在读取技能…'));
    node.dataset.tone = 'info';
    node.setAttribute('role', 'status');
    noticeRoot.append(node);
  }
};

const renderSummary = (): void => {
  if (!data) {
    summary.textContent = loading ? t('正在读取技能…') : t('尚未读取技能。');
    summarySecondary.textContent = t('关闭入口文档后，OpenCode 不会再发现该技能。');
    return;
  }
  summary.textContent = t('模型可见 {advertised} / 共 {total} 个 · 约 {tokens} tokens/步', {
    advertised: data.summary.advertised,
    total: data.summary.total,
    tokens: data.summary.estimatedTokens.toLocaleString(i18n.locale),
  });
  const parts = [t('{count} 个已关闭', { count: data.summary.disabled })];
  if (data.summary.blockingConflicts > 0) parts.push(t('{count} 项阻塞冲突', { count: data.summary.blockingConflicts }));
  else parts.push(t('无阻塞冲突'));
  if (data.summary.warnings > 0) parts.push(t('{count} 项提示', { count: data.summary.warnings }));
  if (data.root.error) parts.push(t('技能目录无法读取'));
  summarySecondary.textContent = t('{parts}。估算不含内置和项目技能。', { parts: parts.join(' · ') });
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
  translationTabs.update({
    activeId: displayMode,
    items: [
      { id: 'original', label: t('原文') },
      { id: 'translated', label: t('中文译文') },
    ],
  });
  const total = data?.skills.length ?? 0;
  const translated = translatedCount();
  const untranslated = Math.max(0, total - translated);
  translateMissingSlot.hidden = untranslated === 0 || translating || !data;
  translateMissingBtn.update({
    label: translated > 0 ? t('补充翻译') : t('翻译未译项'),
    disabled: translating || Boolean(busy) || !data,
  });
  if (translating) {
    const pct = translationProgress.total > 0
      ? Math.round((translationProgress.done / translationProgress.total) * 100)
      : 0;
    if (!translationProgressHandle) {
      translationProgressHandle = mountProgress(translationProgressSlot, { value: pct, tone: 'primary' });
    } else {
      translationProgressHandle.update({ value: pct, tone: 'primary' });
    }
    translationStatus.textContent = t('翻译 {done}/{total}…', {
      done: translationProgress.done,
      total: translationProgress.total,
    });
  } else {
    if (translationProgressHandle) {
      translationProgressHandle.dispose();
      translationProgressHandle = null;
      translationProgressSlot.replaceChildren();
    }
    if (displayMode === 'translated') {
      translationStatus.textContent = translated
        ? t('{translated}/{total} 已翻译', { translated, total })
        : t('点“翻译”生成中文');
    } else {
      translationStatus.textContent = translated ? t('{count} 个有中文', { count: translated }) : '';
    }
  }
};

const groupSkillIds = (group: SkillGroup): string[] =>
  group.skillIds.filter((id) => data?.skills.some((skill) => skill.id === id));

const groupState = (group: SkillGroup): string => {
  const skills = groupSkillIds(group)
    .map((id) => data?.skills.find((skill) => skill.id === id))
    .filter((skill): skill is SkillView => Boolean(skill));
  if (skills.length === 0) return t('无技能');
  if (skills.some((skill) => skill.state === 'conflict')) return t('有冲突');
  const enabled = skills.filter((skill) => skill.state === 'enabled').length;
  if (enabled === skills.length) return t('全开');
  if (enabled === 0) return t('全关');
  return t('部分');
};

const focusGroupChip = (id: string): void => {
  const target = Array.from(groupsRoot.querySelectorAll<HTMLElement>('[data-group]')).find(
    (node) => node.dataset.group === id,
  );
  target?.focus();
};

const makeGroupId = (): string => {
  const suffix = globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);
  return `custom-${suffix}`;
};

const renderGroupsNote = (): void => {
  groupsNote.replaceChildren();
  if (groupsError) {
    const node = el('div', 'sk-notice', t('分组配置无法读取：{error}', { error: groupsError }));
    node.dataset.tone = 'error';
    node.setAttribute('role', 'alert');
    const actions = el('div', 'sk-notice-actions');
    actions.append(actionButton(t('重新读取'), () => void reloadGroups(), false, groupsLoading));
    node.append(actions);
    groupsNote.append(node);
    return;
  }
  if (groupsLoading || groups.length > 0 || !data || rootBlocked()) return;
  groupsNote.append(el('div', 'sk-notice', t('还没有分组。点「编辑分组」新建，或在编辑器里导入示例分组。')));
};

const startGroupDraft = (group: SkillGroup | null): void => {
  groupDraft = {
    id: group?.id ?? null,
    name: group?.name ?? '',
    members: group ? [...group.skillIds] : [],
  };
  memberFilterQuery = '';
  groupEditorError = null;
  pendingDeleteGroup = false;
  pendingImportExamples = false;
  render();
  const input = groupEditor.querySelector<HTMLInputElement>('.sk-group-name');
  input?.focus();
  input?.select();
};

const openGroupEditor = (): void => {
  if (groupsError || groupsLoading || !data || rootBlocked()) return;
  const group = groups.find((item) => item.id === selectedGroup) ?? groups[0] ?? null;
  startGroupDraft(group);
  groupEditor.scrollIntoView({ block: 'nearest' });
};

const closeGroupEditor = (): void => {
  if (busy) return;
  groupDraft = null;
  memberFilterQuery = '';
  groupEditorError = null;
  pendingDeleteGroup = false;
  pendingImportExamples = false;
  render();
  editGroups.focus();
};

const selectDraftGroup = (id: string): void => {
  if (id === 'new') {
    startGroupDraft(null);
    return;
  }
  const group = groups.find((item) => item.id === id);
  if (group) startGroupDraft(group);
};

const focusDraftName = (): void => {
  groupEditor.querySelector<HTMLInputElement>('.sk-group-name')?.focus();
};

const saveGroupDraft = async (): Promise<void> => {
  const draft = groupDraft;
  if (!draft || busy || groupsError) return;
  const name = draft.name.trim();
  if (!name) {
    groupEditorError = t('请输入分组名称。');
    render();
    focusDraftName();
    return;
  }
  if (name.length > GROUP_NAME_MAX) {
    groupEditorError = t('分组名称不能超过 {count} 个字符。', { count: GROUP_NAME_MAX });
    render();
    focusDraftName();
    return;
  }
  if (groups.some((group) => group.id !== draft.id && group.name.trim().toLowerCase() === name.toLowerCase())) {
    groupEditorError = t('已经有名为「{name}」的分组。', { name });
    render();
    focusDraftName();
    return;
  }
  if (draft.members.length === 0) {
    groupEditorError = t('分组至少需要一个成员。');
    render();
    return;
  }
  const id = draft.id ?? makeGroupId();
  const saved: SkillGroup = { id, name, skillIds: [...draft.members] };
  const next = draft.id
    ? groups.map((group) => (group.id === draft.id ? saved : group))
    : [...groups, saved];
  busy = 'groups';
  groupEditorError = null;
  render();
  try {
    groups = parseGroups(await request('POST', '/groups', { version: 1, groups: next }));
    groupsError = null;
    selectedGroup = id;
    pendingOnlyGroup = null;
    const stored = groups.find((group) => group.id === id) ?? null;
    groupDraft = stored ? { id: stored.id, name: stored.name, members: [...stored.skillIds] } : null;
    notice = { text: t('已保存分组「{name}」。', { name }), tone: 'success' };
    void host.toast({ kind: 'success', message: t('已保存分组「{name}」。', { name }) }).catch(() => undefined);
  } catch (error) {
    groupEditorError = describeError(error);
  } finally {
    busy = null;
    render();
  }
};

const requestDeleteGroup = (): void => {
  if (!groupDraft?.id || busy) return;
  pendingDeleteGroup = true;
  pendingImportExamples = false;
  render();
};

const confirmDeleteGroup = async (): Promise<void> => {
  if (!groupDraft?.id || busy) return;
  const removed = groupDraft.id;
  const next = groups.filter((group) => group.id !== removed);
  busy = 'groups';
  pendingDeleteGroup = false;
  groupEditorError = null;
  render();
  try {
    groups = parseGroups(await request('POST', '/groups', { version: 1, groups: next }));
    groupsError = null;
    if (pendingOnlyGroup?.id === removed) pendingOnlyGroup = null;
    if (selectedGroup === removed) selectedGroup = null;
    const target = groups.find((group) => group.id === selectedGroup) ?? groups[0] ?? null;
    selectedGroup = target?.id ?? null;
    groupDraft = target ? { id: target.id, name: target.name, members: [...target.skillIds] } : null;
    notice = { text: t('已删除分组。'), tone: 'success' };
  } catch (error) {
    groupEditorError = describeError(error);
  } finally {
    busy = null;
    render();
  }
};

const requestImportExamples = (): void => {
  if (busy || groupsLoading || groupsError) return;
  if (mergeExampleGroups(groups).added.length === 0) {
    notice = { text: t('示例分组的名称或 ID 都已存在，没有可导入的分组。'), tone: 'info' };
    render();
    return;
  }
  pendingImportExamples = true;
  pendingDeleteGroup = false;
  render();
};

const confirmImportExamples = async (): Promise<void> => {
  if (busy) return;
  const { groups: next, added } = mergeExampleGroups(groups);
  pendingImportExamples = false;
  if (added.length === 0) {
    notice = { text: t('示例分组的名称或 ID 都已存在，没有可导入的分组。'), tone: 'info' };
    render();
    return;
  }
  busy = 'groups';
  groupEditorError = null;
  render();
  try {
    groups = parseGroups(await request('POST', '/groups', { version: 1, groups: next }));
    groupsError = null;
    notice = { text: t('已导入 {count} 个示例分组。', { count: added.length }), tone: 'success' };
  } catch (error) {
    groupEditorError = describeError(error);
  } finally {
    busy = null;
    render();
  }
};

const renderGroupEditor = (): void => {
  groupEditor.replaceChildren();
  if (!groupDraft) return;
  const draft = groupDraft;
  const card = el('section', 'sk-group-editor');
  card.setAttribute('aria-label', t('编辑分组'));
  const head = el('div', 'sk-section-head');
  head.append(el('h2', 'sk-section-title', t('编辑分组')), actionButton(t('关闭'), closeGroupEditor, false, Boolean(busy)));
  card.append(head);

  const selectField = el('label', 'sk-field');
  selectField.append(el('span', 'sk-field-label', t('选择分组')));
  const select = el('select', 'sk-input');
  select.setAttribute('aria-label', t('选择分组'));
  const newOption = el('option', '', t('新建分组'));
  newOption.value = 'new';
  select.append(newOption);
  for (const group of groups) {
    const option = el('option', '', `${group.name}（${group.skillIds.length}）`);
    option.value = group.id;
    select.append(option);
  }
  select.value = draft.id ?? 'new';
  select.disabled = Boolean(busy);
  select.addEventListener('change', () => selectDraftGroup(select.value));
  selectField.append(select);

  const nameField = el('label', 'sk-field');
  nameField.append(el('span', 'sk-field-label', t('名称')));
  const nameInput = el('input', 'sk-input sk-group-name') as HTMLInputElement;
  nameInput.type = 'text';
  nameInput.value = draft.name;
  nameInput.maxLength = GROUP_NAME_MAX;
  nameInput.placeholder = t('例如：日常开发');
  nameInput.autocomplete = 'off';
  nameInput.spellcheck = false;
  nameInput.disabled = Boolean(busy);
  nameInput.addEventListener('input', () => {
    if (!groupDraft) return;
    groupDraft.name = nameInput.value;
    groupEditorError = null;
  });
  nameInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (event.isComposing || event.keyCode === 229) return;
    void saveGroupDraft();
  });
  nameField.append(nameInput);
  card.append(selectField, nameField);

  const members = el('fieldset', 'sk-members');
  const legend = el('legend', '', t('成员（{count}）', { count: draft.members.length }));
  members.append(legend);
  const tools = el('div', 'sk-members-tools');
  const memberFilter = el('input', 'sk-member-filter') as HTMLInputElement;
  memberFilter.type = 'search';
  memberFilter.value = memberFilterQuery;
  memberFilter.placeholder = t('筛选成员名称或 ID');
  memberFilter.setAttribute('aria-label', t('筛选成员名称或 ID'));
  memberFilter.disabled = Boolean(busy);
  tools.append(
    memberFilter,
    actionButton(t('全选'), () => {
      if (!groupDraft) return;
      const existing = data?.skills.map((skill) => skill.id) ?? [];
      const missing = groupDraft.members.filter((id) => !existing.includes(id));
      groupDraft.members = [...existing, ...missing];
      render();
    }, false, Boolean(busy)),
    actionButton(t('清空'), () => {
      if (!groupDraft) return;
      groupDraft.members = [];
      render();
    }, false, Boolean(busy)),
  );
  members.append(tools);
  const memberList = el('div', 'sk-member-list');
  const orderBox = el('div', 'sk-order-box');

  const syncDraftUi = (focusKey?: string): void => {
    if (!groupDraft) return;
    legend.textContent = t('成员（{count}）', { count: groupDraft.members.length });
    renderMemberChecklist();
    renderOrderBox(focusKey);
  };

  const renderMemberChecklist = (): void => {
    memberList.replaceChildren();
    if (!groupDraft) return;
    const allSkills = data?.skills ?? [];
    const visibleSkills = allSkills.filter((skill) =>
      matchesSkillQuery(skill, memberFilterQuery, translationEntry(skill)),
    );
    if (visibleSkills.length === 0) {
      memberList.append(el('p', 'sk-member-empty', t('没有匹配的成员')));
      return;
    }
    for (const skill of visibleSkills) {
      const row = el('label', 'sk-check');
      const checkbox = el('input') as HTMLInputElement;
      checkbox.type = 'checkbox';
      checkbox.checked = groupDraft.members.includes(skill.id);
      checkbox.disabled = Boolean(busy);
      checkbox.addEventListener('change', () => {
        if (!groupDraft) return;
        if (checkbox.checked) {
          if (!groupDraft.members.includes(skill.id)) groupDraft.members.push(skill.id);
        } else {
          groupDraft.members = groupDraft.members.filter((id) => id !== skill.id);
        }
        groupEditorError = null;
        legend.textContent = t('成员（{count}）', { count: groupDraft.members.length });
        renderOrderBox();
      });
      const copy = el('span', 'sk-check-copy');
      copy.append(el('span', 'sk-check-name', displayName(skill)), el('code', 'sk-check-id', skill.id));
      row.append(checkbox, copy);
      memberList.append(row);
    }
  };

  const renderOrderBox = (focusKey?: string): void => {
    orderBox.replaceChildren();
    if (!groupDraft || groupDraft.members.length === 0) return;
    orderBox.append(el('p', 'sk-order-title', t('已选步骤顺序（{count}）', { count: groupDraft.members.length })));
    const list = el('ol', 'sk-order-list');
    for (const [index, memberId] of groupDraft.members.entries()) {
      const skill = data?.skills.find((candidate) => candidate.id === memberId) ?? null;
      const memberLabel = skill ? displayName(skill) : memberId;
      const item = el('li', 'sk-order-item');
      const label = el('span', 'sk-order-label');
      label.append(
        el('span', 'sk-step', String(index + 1)),
        el('span', 'sk-order-name', memberLabel),
      );
      const controls = el('span', 'sk-order-actions');
      const up = el('button', 'sk-order-btn', '↑');
      up.type = 'button';
      up.disabled = Boolean(busy) || index === 0;
      up.dataset.orderFocus = `up:${memberId}`;
      up.title = t('上移「{name}」', { name: memberLabel });
      up.setAttribute('aria-label', t('上移「{name}」', { name: memberLabel }));
      up.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = moveGroupMember(groupDraft.members, index, -1);
        syncDraftUi(`up:${memberId}`);
      });

      const down = el('button', 'sk-order-btn', '↓');
      down.type = 'button';
      down.disabled = Boolean(busy) || index === groupDraft.members.length - 1;
      down.dataset.orderFocus = `down:${memberId}`;
      down.title = t('下移「{name}」', { name: memberLabel });
      down.setAttribute('aria-label', t('下移「{name}」', { name: memberLabel }));
      down.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = moveGroupMember(groupDraft.members, index, 1);
        syncDraftUi(`down:${memberId}`);
      });

      const remove = el('button', 'sk-order-btn', '×');
      remove.type = 'button';
      remove.disabled = Boolean(busy);
      remove.title = t('移除「{name}」', { name: memberLabel });
      remove.setAttribute('aria-label', t('移除「{name}」', { name: memberLabel }));
      remove.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = groupDraft.members.filter((id) => id !== memberId);
        syncDraftUi();
      });

      controls.append(up, down, remove);
      item.append(label, controls);
      list.append(item);
    }
    orderBox.append(list);
    if (focusKey) {
      const btn = Array.from(orderBox.querySelectorAll<HTMLButtonElement>('[data-order-focus]')).find(
        (node) => node.dataset.orderFocus === focusKey && !node.disabled,
      );
      btn?.focus();
    }
  };

  memberFilter.addEventListener('input', () => {
    memberFilterQuery = memberFilter.value;
    renderMemberChecklist();
  });

  renderMemberChecklist();
  renderOrderBox();
  members.append(memberList, orderBox);

  const existingIds = new Set(data?.skills.map((skill) => skill.id) ?? []);
  const missing = draft.members.filter((id) => !existingIds.has(id));
  if (missing.length > 0) {
    const box = el('div', 'sk-missing');
    box.append(el('span', 'sk-missing-label', t('目录中缺失：')));
    for (const id of missing) {
      const chip = el('button', 'sk-missing-chip', `${id} ×`);
      chip.type = 'button';
      chip.disabled = Boolean(busy);
      chip.title = t('从分组移除这个缺失成员');
      chip.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = groupDraft.members.filter((item) => item !== id);
        render();
      });
      box.append(chip);
    }
    members.append(box);
  }
  card.append(members);

  if (groupEditorError) {
    const error = el('p', 'sk-editor-error', groupEditorError);
    error.setAttribute('role', 'alert');
    card.append(error);
  }

  const actions = el('div', 'sk-editor-actions');
  if (draft.id) actions.append(actionButton(t('删除分组'), requestDeleteGroup, false, Boolean(busy)));
  actions.append(
    actionButton(t('导入示例分组'), requestImportExamples, false, Boolean(busy)),
    actionButton(draft.id ? t('保存更改') : t('新建分组'), () => void saveGroupDraft(), true, Boolean(busy)),
  );
  card.append(actions);

  if (pendingDeleteGroup) {
    const confirm = el('div', 'sk-editor-confirm');
    confirm.dataset.tone = 'warning';
    confirm.append(el('p', '', t('删除分组「{name}」？技能本身不会被删除。', { name: draft.name.trim() || t('未命名') })));
    const buttons = el('div', 'sk-actions');
    buttons.append(
      actionButton(t('确认删除'), () => void confirmDeleteGroup(), true, Boolean(busy)),
      actionButton(t('取消'), () => { pendingDeleteGroup = false; render(); }, false, Boolean(busy)),
    );
    confirm.append(buttons);
    card.append(confirm);
  }

  if (pendingImportExamples) {
    const importable = mergeExampleGroups(groups).added.length;
    const confirm = el('div', 'sk-editor-confirm');
    confirm.dataset.tone = 'warning';
    confirm.append(el('p', '', t('导入 {count} 个示例分组？已有同名或同 ID 的分组会跳过，当前分组不会被覆盖。', { count: importable })));
    const buttons = el('div', 'sk-actions');
    buttons.append(
      actionButton(t('确认导入'), () => void confirmImportExamples(), true, Boolean(busy)),
      actionButton(t('取消'), () => { pendingImportExamples = false; render(); }, false, Boolean(busy)),
    );
    confirm.append(buttons);
    card.append(confirm);
  }

  card.append(el('p', 'sk-editor-hint', t('分组只影响面板筛选和批量开关，不改变技能；成员顺序决定组内步骤号，保存后写入 groups.json。')));
  groupEditor.append(card);
};

const renderGroups = (): void => {
  groupsRoot.replaceChildren();
  const total = data?.skills.length ?? 0;
  const all = el('button', 'sk-chip', t('全部 {count}', { count: total }));
  all.type = 'button';
  all.dataset.group = 'all';
  all.setAttribute('aria-pressed', selectedGroup === null ? 'true' : 'false');
  all.addEventListener('click', () => {
    selectedGroup = null;
    render();
    focusGroupChip('all');
  });
  groupsRoot.append(all);
  for (const group of groups) {
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
  editGroups.textContent = groupDraft ? t('关闭编辑') : t('编辑分组');
  editGroups.setAttribute('aria-pressed', groupDraft ? 'true' : 'false');
  editGroups.disabled = groupsLoading || Boolean(groupsError) || Boolean(busy) || !data || rootBlocked();
  editGroups.title = groupsLoading
    ? t('正在读取分组…')
    : groupsError
      ? t('分组配置无法读取，修复文件后重新读取')
      : !data
        ? t('技能列表尚未读取')
        : rootBlocked()
          ? t('技能目录无法读取')
          : '';
  groupSelect.update({
    value: selectedGroup ?? 'all',
    options: [
      { id: 'all', label: t('全部 {count}', { count: total }) },
      ...groups.map((group) => ({
        id: group.id,
        label: `${group.name} ${groupSkillIds(group).length}`,
        hint: groupState(group),
      })),
    ],
  });
};

const renderGroupBar = (): void => {
  groupBarRoot.replaceChildren();
  if (!data || !selectedGroup) return;
  const current = data;
  const group = groups.find((item) => item.id === selectedGroup);
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
  text.append(el('strong', '', group.name), el('span', 'sk-group-state', t('{count} 个 · {state}', { count: available.length, state: groupState(group) })));
  if (missing.length > 0) text.append(el('p', 'sk-group-warning', t('缺失：{names}', { names: missing.join(', ') })));
  const actions = el('div', 'sk-groupbar-actions');
  actions.append(
    actionButton(t('启用整组'), () => void runGroup(group, true), false, blocked),
    actionButton(t('关闭整组'), () => void runGroup(group, false), false, blocked),
  );
  const only = actionButton(t('仅启用本组'), () => requestOnlyGroup(group), false, blocked || missing.length > 0);
  if (missing.length > 0) only.title = t('分组里有缺失技能，先处理后再仅启用本组');
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
      text: enabled ? t('已启用「{name}」的 {count} 个技能。', { name: group.name, count: ids.length }) : t('已关闭「{name}」的 {count} 个技能。', { name: group.name, count: ids.length }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: enabled ? t('已启用「{name}」', { name: group.name }) : t('已关闭「{name}」', { name: group.name }) }).catch(() => undefined);
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
    notice = { text: t('分组里有缺失技能，未执行。'), tone: 'error' };
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
      text: t('已仅启用「{name}」，关闭其他 {count} 个技能。', { name: group.name, count: disable.length }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: t('已仅启用「{name}」', { name: group.name }) }).catch(() => undefined);
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

const copyText = async (value: string, message: string): Promise<void> => {
  try {
    await host.writeClipboard(value);
    void host.toast({ kind: 'success', message }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    renderNotice();
  }
};

const appendSkillMenu = (container: HTMLElement, skill: SkillView): void => {
  const menuSlot = el('span', 'sk-menu-slot');
  const entryPath = skill.activePaths[0] ?? skill.disabledPaths[0] ?? null;
  mountMenu(menuSlot, {
    label: '⋯',
    variant: 'ghost',
    size: 'sm',
    items: [
      { id: 'copy-path', label: t('复制入口路径'), disabled: !entryPath },
      { id: 'copy-id', label: t('复制技能 ID') },
      { separator: true },
      { id: 'retranslate', label: t('单独重译此项'), disabled: translating || Boolean(busy) },
    ],
    onSelect: (id) => {
      if (id === 'copy-path' && entryPath) {
        void copyText(entryPath, t('已复制入口路径。'));
      } else if (id === 'copy-id') {
        void copyText(skill.id, t('已复制技能 ID。'));
      } else if (id === 'retranslate') {
        void translateSingle(skill);
      }
    },
  });
  const trigger = menuSlot.querySelector<HTMLButtonElement>('.oc-sdk-btn');
  if (trigger) {
    trigger.setAttribute('aria-label', `${t('更多操作')} ${skill.name}`);
    trigger.title = t('更多操作');
  }
  container.append(menuSlot);
};

const skillAction = (skill: SkillView): HTMLElement => {
  const holder = el('div', 'sk-skill-action');
  const note = el('span', 'sk-action-note');
  const top = el('div', 'sk-action-top');
  const blocked = rootBlocked();

  if (skill.state === 'conflict') {
    note.textContent = blocked ? t('目录无法读取') : t('先处理冲突');
    const button = el('button', 'sk-inline-button', t('处理冲突'));
    button.type = 'button';
    button.disabled = Boolean(busy) || blocked;
    button.addEventListener('click', () => {
      conflictRoot.scrollIntoView({ block: 'nearest' });
      conflictRoot.querySelector<HTMLButtonElement>('button')?.focus();
    });
    top.append(button);
    appendSkillMenu(top, skill);
    holder.append(note, top);
    return holder;
  }

  if (skill.state === 'mixed') {
    note.textContent = blocked ? t('目录无法读取') : t('部分入口关闭');
    const actions = el('div', 'sk-mini-actions');
    const on = el('button', 'sk-inline-button', t('全部启用'));
    on.type = 'button';
    on.disabled = Boolean(busy) || blocked;
    on.addEventListener('click', () => void toggleSkill(skill, true));
    const off = el('button', 'sk-inline-button', t('全部关闭'));
    off.type = 'button';
    off.disabled = Boolean(busy) || blocked;
    off.addEventListener('click', () => void toggleSkill(skill, false));
    actions.append(on, off);
    appendSkillMenu(actions, skill);
    holder.append(note, actions);
    return holder;
  }

  const checked = skill.state === 'enabled';
  const control = el('button', 'sk-switch');
  control.type = 'button';
  control.setAttribute('role', 'switch');
  control.setAttribute('aria-checked', checked ? 'true' : 'false');
  control.setAttribute('aria-label', `${checked ? t('关闭') : t('开启')} ${skill.name}`);
  control.dataset.skillId = skill.id;
  control.disabled = Boolean(busy) || blocked;
  control.append(el('span', 'sk-thumb'));
  control.addEventListener('click', () => {
    if (control.disabled) return;
    void toggleSkill(skill, !checked);
  });

  if (checked) note.textContent = blocked ? t('目录无法读取') : skill.advertised ? t('模型可见') : t('模型不可见');
  else note.textContent = blocked ? t('目录无法读取') : t('入口已关闭');
  top.append(control);
  appendSkillMenu(top, skill);
  holder.append(note, top);
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
    marker.title = t('第 {step} 步', { step });
    marker.setAttribute('aria-label', t('第 {step} 步', { step }));
    head.append(marker);
  }
  const translated = displayMode === 'translated' ? translationEntry(skill) : null;
  head.append(el('strong', 'sk-name', translated?.nameZh || skill.name), badge(stateText(skill), toneForState(skill)));
  const meta = el('div', 'sk-meta');
  if (translated) meta.append(el('span', 'sk-original-name', skill.name));
  meta.append(el('code', 'sk-id', skill.id));
  if (skill.estimatedTokens > 0) {
    meta.append(
      el('span', 'sk-token', t('~{tokens} tok', { tokens: skill.estimatedTokens.toLocaleString(i18n.locale) })),
    );
  }
  const rawDescription = translated?.descriptionZh || skill.description;
  const descriptionText = rawDescription || t('无 description，模型不会自动选用。');
  const description = el('p', 'sk-desc', descriptionText);
  const expanded = expandedSkills.has(skill.id);
  if (expanded) description.classList.add('is-expanded');
  main.append(head, meta, description);
  if (rawDescription.length > 88 || rawDescription.includes('\n')) {
    const toggleDesc = el('button', 'sk-desc-toggle', expanded ? t('收起说明') : t('展开说明'));
    toggleDesc.type = 'button';
    toggleDesc.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggleDesc.addEventListener('click', () => {
      const nextExpanded = !expandedSkills.has(skill.id);
      if (nextExpanded) expandedSkills.add(skill.id);
      else expandedSkills.delete(skill.id);
      description.classList.toggle('is-expanded', nextExpanded);
      toggleDesc.textContent = nextExpanded ? t('收起说明') : t('展开说明');
      toggleDesc.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false');
    });
    main.append(toggleDesc);
  }
  if (skill.warnings.length > 0) {
    const warning = el('p', 'sk-warn', skill.warnings.slice(0, 2).map((item) => serverText(item) ?? item).join(' · '));
    main.append(warning);
  }
  row.append(main, skillAction(skill));
  return row;
};

const resetFilters = (): void => {
  queryRaw = '';
  stateFilter = 'all';
  sortMode = 'default';
  searchField.update({ value: '', placeholder: t('搜索名称、描述或 ID（按 / 聚焦）') });
  syncSearchAria();
  stateSelect.update({ value: 'all', options: stateFilterOptions() });
  sortSelect.update({ value: 'default', options: sortModeOptions() });
  renderList();
};

const renderList = (): void => {
  listRoot.replaceChildren();
  if (!data) return;
  const group = selectedGroup ? groups.find((item) => item.id === selectedGroup) : null;
  const base = group
    ? group.skillIds
        .map((id) => data?.skills.find((skill) => skill.id === id))
        .filter((skill): skill is SkillView => Boolean(skill))
    : data.skills;
  const skills = filterAndSortSkills(base, {
    query: queryRaw,
    stateFilter,
    sortMode,
    getTranslation: translationEntry,
  });
  if (skills.length === 0) {
    const hasFilter = queryRaw.trim().length > 0 || stateFilter !== 'all';
    const empty = el('div', 'sk-empty');
    empty.append(
      el(
        'h2',
        '',
        data.skills.length === 0
          ? t('没有发现技能')
          : group && base.length === 0
            ? t('这个分组没有可用技能')
            : t('没有匹配的技能'),
      ),
      el(
        'p',
        '',
        data.skills.length === 0
          ? t('检查 ~/.config/opencode/skills 是否存在，或重新扫描。')
          : group && base.length === 0
            ? t('检查分组里的技能是否被移除。')
            : t('换一个搜索词或调整状态筛选条件。'),
      ),
    );
    if (data.skills.length > 0 && hasFilter) {
      const actions = el('div', 'sk-empty-actions');
      actions.append(actionButton(t('重置筛选'), resetFilters));
      empty.append(actions);
    }
    listRoot.append(empty);
    return;
  }
  for (const skill of skills) {
    const step = group && group.skillIds.length > 1 ? group.skillIds.indexOf(skill.id) + 1 : 0;
    listRoot.append(renderSkill(skill, step));
  }
};

const syncRailBadge = (): void => {
  const next = !data
    ? null
    : data.root.error
      ? 1
      : data.summary.blockingConflicts > 0
        ? data.summary.blockingConflicts
        : null;
  if (next === lastBadgeCount) return;
  lastBadgeCount = next;
  void host.setBadge(next).catch(() => undefined);
};

const render = (): void => {
  app.setAttribute('aria-busy', loading ? 'true' : 'false');
  syncRailBadge();
  renderSummary();
  renderTranslationControls();
  renderNotice();
  renderGroupsNote();
  renderGroups();
  renderGroupEditor();
  renderGroupBar();
  renderConflicts();
  renderList();
  refresh.update({ label: loading ? t('读取中…') : t('重新扫描'), loading, disabled: loading || Boolean(busy) });
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

const parseTranslationPrompt = (prompt: string): Map<string, { name: string; description: string }> => {
  const requested = new Map<string, { name: string; description: string }>();
  try {
    const items: unknown = JSON.parse(prompt);
    if (!Array.isArray(items)) return requested;
    for (const item of items) {
      if (!item || typeof item !== 'object') continue;
      const value = item as Record<string, unknown>;
      if (
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.description === 'string'
      ) {
        requested.set(value.id, { name: value.name, description: value.description });
      }
    }
  } catch {
    // A prompt we did not build; the current skill is the only fallback.
  }
  return requested;
};

const applyLateTranslation = async (late: LateGenerateResult): Promise<void> => {
  if (late.request.system !== TRANSLATION_SYSTEM) return;
  if (!late.ok) {
    if (!translating) {
      translationError = late.error;
      notice = { text: late.error, tone: 'error' };
      render();
    }
    return;
  }
  if (!data) {
    if (pendingLateTranslations.length < 8) pendingLateTranslations.push(late);
    return;
  }
  const requested = parseTranslationPrompt(late.request.prompt);
  const parsed = parseTranslationResponse(late.result.text);
  let changed = false;
  for (const item of parsed) {
    const skill = data.skills.find((candidate) => candidate.id === item.id);
    if (!skill) continue;
    const original = requested.get(skill.id);
    if (original && (original.name !== skill.name || original.description !== skill.description)) continue;
    translations.entries[skill.id] = {
      hash: skill.contentHash,
      nameZh: item.nameZh,
      descriptionZh: item.descriptionZh,
      updatedAt: Date.now(),
    };
    changed = true;
  }
  if (!changed) return;
  if (!translationPreferenceSet) {
    displayMode = 'translated';
    translationPreferenceSet = true;
  }
  await saveTranslations();
  if (!translating) {
    notice = translationError
      ? { text: t('翻译已补全，但缓存保存失败：{error}', { error: translationError }), tone: 'warning' }
      : { text: t('上次未完成的翻译已补全。'), tone: 'success' };
  }
  render();
};

const translateMissing = async (): Promise<void> => {
  if (!data || translating) return;
  const pending = data.skills.filter((skill) => !translationEntry(skill));
  if (pending.length === 0) {
    notice = { text: t('中文说明已是最新。'), tone: 'success' };
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
        notice = { text: t('翻译完成，但缓存保存失败：{error}', { error: translationError }), tone: 'warning' };
      } else if (failed > 0) {
        notice = { text: t('已翻译 {done} 个技能，{failed} 个失败；可再点“翻译”重试。', { done, failed }), tone: 'warning' };
      } else {
        notice = { text: t('已翻译 {done} 个技能。', { done }), tone: 'success' };
      }
    }
    render();
  }
};

const translateSingle = async (skill: SkillView): Promise<void> => {
  if (!data || translating || busy) return;
  translating = true;
  translationError = null;
  translationProgress = { done: 0, total: 1 };
  notice = { text: t('正在重译「{name}」…', { name: skill.name }), tone: 'info' };
  render();
  try {
    const generated = await host.generate({
      prompt: buildTranslationPrompt([{ id: skill.id, name: skill.name, description: skill.description }]),
      system: TRANSLATION_SYSTEM,
      maxOutputTokens: 1024,
    });
    const parsed = parseTranslationResponse(generated.text);
    const match = parsed.find((item) => item.id === skill.id) ?? (parsed.length === 1 ? parsed[0] : null);
    if (!match) {
      notice = { text: t('未能解析「{name}」的翻译结果，请重试。', { name: skill.name }), tone: 'warning' };
    } else {
      translations.entries[skill.id] = {
        hash: skill.contentHash,
        nameZh: match.nameZh,
        descriptionZh: match.descriptionZh,
        updatedAt: Date.now(),
      };
      displayMode = 'translated';
      translationPreferenceSet = true;
      await saveTranslations();
      if (translationError) {
        notice = { text: t('翻译完成，但缓存保存失败：{error}', { error: translationError }), tone: 'warning' };
      } else {
        const message = t('已更新「{name}」的中文译文。', { name: skill.name });
        notice = { text: message, tone: 'success' };
        void host.toast({ kind: 'success', message }).catch(() => undefined);
      }
    }
  } catch (error) {
    translationError = describeError(error);
    notice = { text: translationError, tone: 'error' };
  } finally {
    translating = false;
    translationProgress = { done: 1, total: 1 };
    render();
  }
};

const reloadGroups = async (force = false): Promise<void> => {
  if ((groupsLoading && !force) || groupDraft) return;
  groupsLoading = true;
  render();
  try {
    groups = parseGroups(await request('GET', '/groups'));
    groupsError = null;
    if (selectedGroup && !groups.some((group) => group.id === selectedGroup)) selectedGroup = null;
  } catch (error) {
    groupsError = describeGroupsError(error);
  } finally {
    groupsLoading = false;
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
  if (data && pendingLateTranslations.length > 0) {
    const pending = pendingLateTranslations;
    pendingLateTranslations = [];
    for (const late of pending) void applyLateTranslation(late);
  }
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
      text: enabled ? t('已启用 {name}。', { name: skill.name }) : t('已关闭 {name}；OpenCode 下一次扫描后不再发现它。', { name: skill.name }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: enabled ? t('已启用 {name}', { name: skill.name }) : t('已关闭 {name}', { name: skill.name }) }).catch(() => undefined);
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
      text: keep === 'enabled'
        ? t('已保留启用入口{suffix}。', { suffix: backupPath ? t('；旧停用文件备份为 {path}', { path: backupPath }) : '' })
        : t('已保留关闭入口{suffix}。', { suffix: backupPath ? t('；旧停用文件备份为 {path}', { path: backupPath }) : '' }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: t('入口冲突已处理') }).catch(() => undefined);
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
      text: enabled ? t('已启用 {count} 个技能。', { count: changed.length }) : t('已关闭 {count} 个技能。', { count: changed.length }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: enabled ? t('已启用 {count} 个技能。', { count: changed.length }) : t('已关闭 {count} 个技能。', { count: changed.length }) }).catch(() => undefined);
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

const localize = (): void => {
  app.setAttribute('aria-label', t('技能开关'));
  title.textContent = t('技能开关');
  translationTabsSlot.setAttribute('aria-label', t('技能说明语言'));
  enableAll.update({ label: t('全部启用') });
  disableAll.update({ label: t('全部关闭') });
  searchField.update({ value: queryRaw, placeholder: t('搜索名称、描述或 ID（按 / 聚焦）') });
  syncSearchAria();
  stateSelect.update({ value: stateFilter, options: stateFilterOptions() });
  stateSelectTrigger?.setAttribute('aria-label', t('状态筛选'));
  sortSelect.update({ value: sortMode, options: sortModeOptions() });
  sortSelectTrigger?.setAttribute('aria-label', t('排序方式'));
  footerLine1.textContent = t('管理 ~/.config/opencode/skills。关闭会把技能入口改名为 .disabled；OpenCode 不再加载，模型也看不到。');
  footerLine2.textContent = t('只显示这个目录里的文件技能。停用或卸载前先全部启用；技能更新后重新扫描。');
  groupSelectTrigger?.setAttribute('aria-label', t('分组筛选'));
  editGroups.textContent = groupDraft ? t('关闭编辑') : t('编辑分组');
  editGroups.setAttribute('aria-pressed', groupDraft ? 'true' : 'false');
  render();
};

host.onLateGenerateResult((late) => {
  void applyLateTranslation(late);
});

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  const changed = i18n.setLocale(context.locale);
  applyDocumentLanguage(i18n);
  document.title = t('技能开关');
  if (initialized) {
    if (!changed) { render(); return; }
    notice = null;
    groupEditorError = null;
    localize();
    void loadAll(true);
    void reloadGroups(true);
    return;
  }
  initialized = true;
  if (changed) localize();
  void loadAll(true);
  void reloadGroups(true);
});

document.title = t('技能开关');
render();
