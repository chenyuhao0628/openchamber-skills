export type SkillGroup = {
  id: string;
  name: string;
  skillIds: string[];
};

export type GroupsFile = {
  version: 1;
  groups: SkillGroup[];
};

export const GROUP_LIMIT = 50;
export const GROUP_NAME_MAX = 40;
export const GROUP_MEMBER_LIMIT = 200;
export const GROUP_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
const RESERVED_GROUP_IDS = new Set(['all', 'new']);

export class GroupFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GroupFileError';
  }
}

export const DEFAULT_SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'macos-ui',
    name: 'macOS UI',
    skillIds: [
      'appkit-interop',
      'swiftui-patterns',
      'window-management',
      'liquid-glass',
      'view-refactor',
    ],
  },
  {
    id: 'macos-build',
    name: 'macOS 构建',
    skillIds: [
      'build-run-debug',
      'test-triage',
      'swiftpm-macos',
      'signing-entitlements',
      'packaging-notarization',
      'telemetry',
    ],
  },
  {
    id: 'reverse',
    name: '逆向工程',
    skillIds: [
      'reverse-engineering-unpacking',
      'kuna-decompiler',
      'reverse-engineer-anything',
    ],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    skillIds: ['cloudflare', 'workers-best-practices', 'wrangler'],
  },
  {
    id: 'video',
    name: '视频',
    skillIds: ['yichen-jianying-edit'],
  },
  {
    id: 'browser',
    name: '浏览器',
    skillIds: ['browser-skill'],
  },
];

export const cloneDefaultGroups = (): SkillGroup[] =>
  DEFAULT_SKILL_GROUPS.map((group) => ({ ...group, skillIds: [...group.skillIds] }));

export const normalizeGroupsFile = (value: unknown): GroupsFile => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new GroupFileError('分组配置格式不正确');
  }
  const record = value as Record<string, unknown>;
  if (record.version !== 1) throw new GroupFileError('分组配置版本不受支持');
  if (!Array.isArray(record.groups)) throw new GroupFileError('分组列表格式不正确');
  if (record.groups.length > GROUP_LIMIT) throw new GroupFileError(`分组不能超过 ${GROUP_LIMIT} 个`);

  const groups: SkillGroup[] = [];
  const groupIds = new Set<string>();
  const names = new Set<string>();
  for (const [index, item] of record.groups.entries()) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new GroupFileError(`第 ${index + 1} 个分组格式不正确`);
    }
    const group = item as Record<string, unknown>;
    if (typeof group.id !== 'string' || !GROUP_ID_PATTERN.test(group.id) || RESERVED_GROUP_IDS.has(group.id)) {
      throw new GroupFileError(`第 ${index + 1} 个分组的 ID 无效`);
    }
    if (groupIds.has(group.id)) throw new GroupFileError(`分组 ID 重复：${group.id}`);
    const name = typeof group.name === 'string' ? group.name.trim() : '';
    if (!name || name.length > GROUP_NAME_MAX || /[\u0000-\u001f\u007f]/.test(name)) {
      throw new GroupFileError(`第 ${index + 1} 个分组名称需为 1-${GROUP_NAME_MAX} 个字符`);
    }
    const nameKey = name.toLowerCase();
    if (names.has(nameKey)) throw new GroupFileError(`分组名称重复：${name}`);
    if (!Array.isArray(group.skillIds)) throw new GroupFileError(`分组「${name}」的成员格式不正确`);
    if (group.skillIds.length > GROUP_MEMBER_LIMIT) {
      throw new GroupFileError(`分组「${name}」的成员不能超过 ${GROUP_MEMBER_LIMIT} 个`);
    }
    const skillIds: string[] = [];
    const seen = new Set<string>();
    for (const skillId of group.skillIds) {
      if (typeof skillId !== 'string' || !skillId || skillId.length > 128) {
        throw new GroupFileError(`分组「${name}」含无效的技能 ID`);
      }
      if (seen.has(skillId)) continue;
      seen.add(skillId);
      skillIds.push(skillId);
    }
    groupIds.add(group.id);
    names.add(nameKey);
    groups.push({ id: group.id, name, skillIds });
  }
  return { version: 1, groups };
};
