import type { SkillView, TranslationEntry } from './types.ts';

export type SkillStateFilter = 'all' | 'enabled' | 'disabled' | 'attention';
export type SkillSortMode = 'default' | 'tokens';

export const isAttentionSkill = (skill: SkillView): boolean =>
  skill.state === 'conflict' ||
  skill.state === 'mixed' ||
  skill.conflicts.length > 0 ||
  skill.warnings.length > 0 ||
  (skill.state === 'enabled' && !skill.advertised);

export const matchesSkillStateFilter = (skill: SkillView, filter: SkillStateFilter): boolean => {
  switch (filter) {
    case 'enabled':
      return skill.state === 'enabled';
    case 'disabled':
      return skill.state === 'disabled';
    case 'attention':
      return isAttentionSkill(skill);
    case 'all':
    default:
      return true;
  }
};

export const matchesSkillQuery = (
  skill: SkillView,
  query: string,
  translation?: TranslationEntry | null,
): boolean => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  const haystack = [
    skill.id,
    skill.name,
    skill.description,
    translation?.nameZh ?? '',
    translation?.descriptionZh ?? '',
    ...skill.warnings,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(trimmed);
};

export const filterAndSortSkills = (
  skills: readonly SkillView[],
  options: {
    query: string;
    stateFilter: SkillStateFilter;
    sortMode: SkillSortMode;
    getTranslation?: (skill: SkillView) => TranslationEntry | null;
  },
): SkillView[] => {
  const filtered = skills.filter(
    (skill) =>
      matchesSkillStateFilter(skill, options.stateFilter) &&
      matchesSkillQuery(skill, options.query, options.getTranslation?.(skill)),
  );
  if (options.sortMode === 'tokens') {
    return [...filtered].sort((a, b) => {
      if (b.estimatedTokens !== a.estimatedTokens) return b.estimatedTokens - a.estimatedTokens;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) || a.id.localeCompare(b.id);
    });
  }
  return filtered;
};
