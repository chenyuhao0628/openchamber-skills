import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SKILL_GROUPS,
  GroupFileError,
  cloneDefaultGroups,
  normalizeGroupsFile,
} from '../src/shared/groups.ts';

test('preset groups cover every OpenCode file skill once in a stable order', () => {
  const ids = DEFAULT_SKILL_GROUPS.flatMap((group) => group.skillIds);
  assert.equal(new Set(ids).size, ids.length);
  const expected = [
    'appkit-interop',
    'build-run-debug',
    'cloudflare',
    'kuna-decompiler',
    'liquid-glass',
    'packaging-notarization',
    'signing-entitlements',
    'swiftpm-macos',
    'swiftui-patterns',
    'telemetry',
    'test-triage',
    'view-refactor',
    'window-management',
    'workers-best-practices',
    'wrangler',
    'browser-skill',
    'reverse-engineer-anything',
    'reverse-engineering-unpacking',
    'yichen-jianying-edit',
  ];
  assert.deepEqual(ids.slice().sort(), expected.slice().sort());
  assert.equal(DEFAULT_SKILL_GROUPS.find((group) => group.id === 'reverse')?.skillIds[0], 'reverse-engineering-unpacking');
});

test('group config trims names, dedupes members and keeps preset arrays independent', () => {
  const file = normalizeGroupsFile({
    version: 1,
    groups: [{ id: 'custom-daily', name: '  日常开发  ', skillIds: ['alpha', 'alpha', 'beta'] }],
  });
  assert.deepEqual(file.groups, [{ id: 'custom-daily', name: '日常开发', skillIds: ['alpha', 'beta'] }]);

  const copy = cloneDefaultGroups();
  copy[0].name = 'changed';
  copy[0].skillIds.push('extra');
  assert.equal(DEFAULT_SKILL_GROUPS[0].name, 'macOS UI');
  assert.equal(DEFAULT_SKILL_GROUPS[0].skillIds.includes('extra'), false);
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
