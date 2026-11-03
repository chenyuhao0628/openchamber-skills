import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXAMPLE_SKILL_GROUPS,
  GROUP_ID_PATTERN,
  GROUP_NAME_MAX,
  GroupFileError,
  cloneExampleGroups,
  mergeExampleGroups,
  normalizeGroupsFile,
} from '../src/shared/groups.ts';

test('example groups are unique, valid and independent', () => {
  const ids = EXAMPLE_SKILL_GROUPS.map((group) => group.id);
  const names = EXAMPLE_SKILL_GROUPS.map((group) => group.name.toLowerCase());
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(names).size, names.length);
  for (const group of EXAMPLE_SKILL_GROUPS) {
    assert.match(group.id, GROUP_ID_PATTERN);
    assert.ok(group.name.length > 0 && group.name.length <= GROUP_NAME_MAX);
    assert.ok(group.skillIds.length > 0);
  }

  const copy = cloneExampleGroups();
  copy[0].name = 'changed';
  copy[0].skillIds.push('extra');
  assert.equal(EXAMPLE_SKILL_GROUPS[0].name, 'macOS UI');
  assert.equal(EXAMPLE_SKILL_GROUPS[0].skillIds.includes('extra'), false);
});

test('example groups merge without overwriting existing ids or names', () => {
  const existing = [
    { id: 'custom-a', name: EXAMPLE_SKILL_GROUPS[0].name, skillIds: ['alpha'] },
    { id: EXAMPLE_SKILL_GROUPS[1].id, name: '自定义名称', skillIds: ['beta'] },
  ];
  const { groups, added } = mergeExampleGroups(existing);
  assert.equal(added.length, EXAMPLE_SKILL_GROUPS.length - 2);
  assert.deepEqual(groups.slice(0, existing.length), existing);
  assert.equal(groups.length, existing.length + added.length);
  assert.equal(added.some((group) => group.id === EXAMPLE_SKILL_GROUPS[1].id), false);
  assert.equal(added.some((group) => group.name === EXAMPLE_SKILL_GROUPS[0].name), false);
});

test('merging examples twice adds nothing', () => {
  const first = mergeExampleGroups([]);
  assert.equal(first.added.length, EXAMPLE_SKILL_GROUPS.length);
  const second = mergeExampleGroups(first.groups);
  assert.equal(second.added.length, 0);
  assert.deepEqual(second.groups, first.groups);
});

test('group config trims names and dedupes members', () => {
  const file = normalizeGroupsFile({
    version: 1,
    groups: [{ id: 'custom-daily', name: '  日常开发  ', skillIds: ['alpha', 'alpha', 'beta'] }],
  });
  assert.deepEqual(file.groups, [{ id: 'custom-daily', name: '日常开发', skillIds: ['alpha', 'beta'] }]);
});

test('group config rejects reserved ids, duplicate names and empty payloads', () => {
  const group = { id: 'custom-a', name: 'A', skillIds: ['alpha'] };
  assert.throws(() => normalizeGroupsFile(null), GroupFileError);
  assert.throws(() => normalizeGroupsFile({ version: 1, groups: [{ ...group, id: 'all' }] }), GroupFileError);
  assert.throws(() => normalizeGroupsFile({ version: 1, groups: [group, { ...group, id: 'custom-b' }] }), GroupFileError);
  assert.throws(() => normalizeGroupsFile({ version: 1, groups: [{ ...group, name: '   ' }] }), GroupFileError);
  assert.throws(() => normalizeGroupsFile({ version: 1, groups: [group, { ...group }] }), GroupFileError);
  assert.throws(() => normalizeGroupsFile({ version: 1, groups: [{ ...group, name: 'x'.repeat(41) }] }), GroupFileError);
});
