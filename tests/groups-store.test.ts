import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { GroupError, readGroups, writeGroups } from '../src/core/groups.ts';
import { DEFAULT_SKILL_GROUPS } from '../src/shared/groups.ts';

const groupsPath = (home: string): string =>
  path.join(home, '.config/openchamber/skills-manager/groups.json');

const exists = async (file: string): Promise<boolean> => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

test('missing group config returns presets without writing a file', async (t) => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'skills-groups-'));
  t.after(() => rm(home, { recursive: true, force: true }));

  const result = await readGroups(home);
  assert.equal(result.version, 1);
  assert.deepEqual(result.groups.map((group) => group.id), DEFAULT_SKILL_GROUPS.map((group) => group.id));
  assert.equal(await exists(groupsPath(home)), false);
});

test('group config is written atomically with 0600 permissions', async (t) => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'skills-groups-'));
  t.after(() => rm(home, { recursive: true, force: true }));

  const saved = await writeGroups(home, {
    version: 1,
    groups: [{ id: 'custom-daily', name: '日常开发', skillIds: ['alpha', 'beta'] }],
  });
  assert.deepEqual(saved.groups, [{ id: 'custom-daily', name: '日常开发', skillIds: ['alpha', 'beta'] }]);

  const file = groupsPath(home);
  assert.equal((await stat(file)).mode & 0o777, 0o600);
  const raw = JSON.parse(await readFile(file, 'utf8')) as { version: number; groups: unknown[] };
  assert.equal(raw.version, 1);
  assert.equal(raw.groups.length, 1);
  assert.deepEqual((await readGroups(home)).groups[0].name, '日常开发');
});

test('a corrupt group file is reported and left untouched', async (t) => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'skills-groups-'));
  t.after(() => rm(home, { recursive: true, force: true }));

  const file = groupsPath(home);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, '{"broken"');

  await assert.rejects(
    readGroups(home),
    (error: unknown) => error instanceof GroupError && error.code === 'invalid-groups' && error.status === 500,
  );
  assert.equal(await readFile(file, 'utf8'), '{"broken"');
});

test('invalid write payloads are rejected before the file changes', async (t) => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'skills-groups-'));
  t.after(() => rm(home, { recursive: true, force: true }));

  await writeGroups(home, {
    version: 1,
    groups: [{ id: 'custom-daily', name: '日常开发', skillIds: ['alpha'] }],
  });
  const file = groupsPath(home);
  const before = await readFile(file, 'utf8');

  await assert.rejects(
    writeGroups(home, { version: 1, groups: [{ id: 'all', name: '全部', skillIds: ['alpha'] }] }),
    (error: unknown) => error instanceof GroupError && error.status === 400,
  );
  await assert.rejects(
    writeGroups(home, { version: 2, groups: [] }),
    (error: unknown) => error instanceof GroupError && error.status === 400,
  );
  assert.equal(await readFile(file, 'utf8'), before);
});
