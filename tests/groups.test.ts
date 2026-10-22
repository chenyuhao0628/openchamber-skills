import test from 'node:test';
import assert from 'node:assert/strict';
import { SKILL_GROUPS } from '../src/shared/groups.ts';

test('groups cover every OpenCode file skill once in a stable order', () => {
  const ids = SKILL_GROUPS.flatMap((group) => group.skillIds);
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
  assert.equal(SKILL_GROUPS.find((group) => group.id === 'reverse')?.skillIds[0], 'reverse-engineering-unpacking');
});
