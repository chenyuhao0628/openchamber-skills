import test from 'node:test';
import assert from 'node:assert/strict';
import type { SkillView, TranslationEntry } from '../src/shared/types.ts';
import {
  filterAndSortSkills,
  isAttentionSkill,
  matchesSkillQuery,
  matchesSkillStateFilter,
} from '../src/shared/filter.ts';

const makeSkill = (overrides: Partial<SkillView> & Pick<SkillView, 'id' | 'name'>): SkillView => ({
  id: overrides.id,
  name: overrides.name,
  description: overrides.description ?? `${overrides.name} description`,
  state: overrides.state ?? 'enabled',
  advertised: overrides.advertised ?? (overrides.state ?? 'enabled') === 'enabled',
  autoInvokeOff: overrides.autoInvokeOff ?? false,
  activePaths: overrides.activePaths ?? [`/tmp/skills/${overrides.id}/SKILL.md`],
  disabledPaths: overrides.disabledPaths ?? [],
  conflicts: overrides.conflicts ?? [],
  warnings: overrides.warnings ?? [],
  estimatedTokens: overrides.estimatedTokens ?? 120,
  contentHash: overrides.contentHash ?? `hash-${overrides.id}`,
});

test('state filter separates enabled, disabled, and attention skills', () => {
  const normal = makeSkill({ id: 'alpha', name: 'Alpha', state: 'enabled', advertised: true });
  const manualOnly = makeSkill({ id: 'manual', name: 'Manual', state: 'enabled', advertised: false });
  const off = makeSkill({ id: 'beta', name: 'Beta', state: 'disabled', advertised: false });
  const conflicted = makeSkill({ id: 'gamma', name: 'Gamma', state: 'conflict', advertised: false });

  assert.equal(isAttentionSkill(normal), false);
  assert.equal(isAttentionSkill(manualOnly), true);
  assert.equal(isAttentionSkill(off), false);
  assert.equal(isAttentionSkill(conflicted), true);

  assert.equal(matchesSkillStateFilter(normal, 'enabled'), true);
  assert.equal(matchesSkillStateFilter(off, 'disabled'), true);
  assert.equal(matchesSkillStateFilter(manualOnly, 'attention'), true);
  assert.equal(matchesSkillStateFilter(conflicted, 'attention'), true);
});

test('filterAndSortSkills searches original + Chinese translations and sorts by tokens descending', () => {
  const skills: SkillView[] = [
    makeSkill({ id: 'alpha', name: 'Alpha', estimatedTokens: 90 }),
    makeSkill({ id: 'zeta', name: 'Zeta Heavy', estimatedTokens: 640 }),
    makeSkill({ id: 'beta', name: 'Beta Warn', estimatedTokens: 210, warnings: ['入口已启用，但没有 description'] }),
  ];
  const translations: Record<string, TranslationEntry> = {
    zeta: {
      hash: 'hash-zeta',
      nameZh: '大型架构技能',
      descriptionZh: '用于梳理大型模块边界',
      updatedAt: 1,
    },
  };

  const byZh = filterAndSortSkills(skills, {
    query: '架构',
    stateFilter: 'all',
    sortMode: 'default',
    getTranslation: (skill) => translations[skill.id] ?? null,
  });
  assert.deepEqual(byZh.map((skill) => skill.id), ['zeta']);

  const byTokens = filterAndSortSkills(skills, {
    query: '',
    stateFilter: 'all',
    sortMode: 'tokens',
  });
  assert.deepEqual(byTokens.map((skill) => skill.id), ['zeta', 'beta', 'alpha']);

  assert.equal(matchesSkillQuery(skills[2], 'description', null), true);
});
