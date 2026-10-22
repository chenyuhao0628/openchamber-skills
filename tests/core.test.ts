import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  SkillsError,
  batchSetEnabled,
  bulkSetEnabled,
  parseFrontmatter,
  resolveBoth,
  scanSkills,
  setSkillEnabled,
} from '../src/core/skills.ts';

const skillText = (name: string, description: string, extra = ''): string =>
  `---\nname: ${name}\ndescription: ${description}\n${extra}---\n\nBody for ${name}.\n`;

const home = async (): Promise<string> => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'skills-core-'));
  await mkdir(path.join(directory, '.config/opencode/skills'), { recursive: true });
  return directory;
};

const rootPath = (directory: string): string => path.join(directory, '.config/opencode/skills');

const put = async (directory: string, id: string, text: string): Promise<string> => {
  const directoryPath = path.join(rootPath(directory), id);
  await mkdir(directoryPath, { recursive: true });
  const file = path.join(directoryPath, 'SKILL.md');
  await writeFile(file, text);
  return file;
};

const exists = async (file: string): Promise<boolean> => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

test('frontmatter reads names, descriptions, autoinvoke and malformed blocks', () => {
  const plain = parseFrontmatter(skillText('Alpha', 'Alpha skill'), 'alpha');
  assert.equal(plain.name, 'Alpha');
  assert.equal(plain.description, 'Alpha skill');
  assert.equal(plain.valid, true);
  assert.equal(plain.autoInvokeOff, false);

  const folded = parseFrontmatter(
    '---\nname: "Folded"\ndescription: >\n  line one\n  line two\nmetadata:\n  opencode/autoinvoke: false\n---\nbody',
    'folded',
  );
  assert.equal(folded.name, 'Folded');
  assert.equal(folded.description, 'line one line two');
  assert.equal(folded.autoInvokeOff, true);

  const manual = parseFrontmatter(skillText('Manual', 'Manual skill', 'disable-model-invocation: true\n'), 'manual');
  assert.equal(manual.autoInvokeOff, true);

  const metadataWins = parseFrontmatter(
    '---\nname: Meta\ndescription: Meta skill\ndisable-model-invocation: true\nmetadata:\n  opencode/autoinvoke: true\n---\n',
    'meta',
  );
  assert.equal(metadataWins.autoInvokeOff, false);

  const broken = parseFrontmatter('---\nname: Broken\ndescription: nope\n', 'broken');
  assert.equal(broken.valid, false);
  assert.equal(broken.name, 'broken');

  const empty = parseFrontmatter('   \n', 'empty');
  assert.equal(empty.empty, true);
  assert.equal(empty.name, 'empty');

  const noFrontmatter = parseFrontmatter('Just a body\n', 'plain');
  assert.equal(noFrontmatter.hasFrontmatter, false);
  assert.equal(noFrontmatter.valid, true);
  assert.equal(noFrontmatter.description, '');
});

test('scan reads only the OpenCode directory and reports entry conflicts', async (t) => {
  const directory = await home();
  t.after(() => rm(directory, { recursive: true, force: true }));

  await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));
  await put(directory, 'manual', skillText('Manual', 'Manual skill', 'disable-model-invocation: true\n'));
  await put(directory, 'nodesc', '---\nname: No description\n---\nbody\n');
  await put(directory, 'nested/team', skillText('Team', 'Nested skill'));
  await writeFile(path.join(rootPath(directory), 'beta.md'), skillText('Beta', 'Flat skill'));

  await put(directory, 'dupe', skillText('Dupe nested', 'Nested duplicate'));
  await writeFile(path.join(rootPath(directory), 'dupe.md'), skillText('Dupe flat', 'Flat duplicate'));
  const both = await put(directory, 'both', skillText('Both', 'Conflict skill'));
  await writeFile(path.join(path.dirname(both), 'SKILL.md.disabled'), skillText('Both old', 'Old copy'));
  await mkdir(path.join(rootPath(directory), 'manual-off'), { recursive: true });
  await writeFile(
    path.join(rootPath(directory), 'manual-off/SKILL.md.disabled'),
    skillText('Manual off', 'Disabled manual skill', 'disable-model-invocation: true\n'),
  );
  await mkdir(path.join(rootPath(directory), 'nodesc-off'), { recursive: true });
  await writeFile(path.join(rootPath(directory), 'nodesc-off/SKILL.md.disabled'), '---\nname: No desc off\n---\nbody\n');

  await mkdir(path.join(directory, '.claude/skills/other'), { recursive: true });
  await writeFile(path.join(directory, '.claude/skills/other/SKILL.md'), skillText('Other', 'Other agent skill'));

  const scan = await scanSkills(directory);
  const byId = new Map(scan.skills.map((skill) => [skill.id, skill]));
  assert.equal(byId.get('alpha')?.advertised, true);
  assert.equal(byId.get('alpha')?.contentHash.length, 64);
  assert.equal(byId.get('beta')?.advertised, true);
  assert.equal(byId.get('team')?.advertised, true);
  assert.equal(byId.get('manual')?.advertised, false);
  assert.ok(byId.get('manual')?.conflicts.some((conflict) => conflict.kind === 'manual'));
  assert.equal(byId.get('nodesc')?.advertised, false);
  assert.ok(byId.get('nodesc')?.conflicts.some((conflict) => conflict.kind === 'no-description'));
  assert.equal(byId.get('dupe')?.activePaths.length, 2);
  assert.ok(byId.get('dupe')?.conflicts.some((conflict) => conflict.kind === 'duplicate'));
  assert.equal(byId.get('both')?.state, 'conflict');
  assert.ok(byId.get('both')?.conflicts.some((conflict) => conflict.kind === 'both'));
  assert.equal(byId.get('manual-off')?.state, 'disabled');
  assert.equal(byId.get('manual-off')?.conflicts.some((conflict) => conflict.kind === 'manual'), false);
  assert.equal(byId.get('nodesc-off')?.state, 'disabled');
  assert.equal(byId.get('nodesc-off')?.conflicts.some((conflict) => conflict.kind === 'no-description'), false);
  assert.equal(byId.has('other'), false);
  assert.equal(scan.root.path, rootPath(directory));
  assert.equal(scan.root.exists, true);
  assert.equal(scan.root.error, null);
  assert.ok(scan.summary.blockingConflicts >= 1);
});

test('toggles entry documents, all duplicate copies, and restores them', async (t) => {
  const directory = await home();
  t.after(() => rm(directory, { recursive: true, force: true }));

  const alpha = await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));
  const beta = path.join(rootPath(directory), 'beta.md');
  await writeFile(beta, skillText('Beta', 'Flat skill'));
  const dupeNested = await put(directory, 'dupe', skillText('Dupe nested', 'Nested duplicate'));
  const dupeFlat = path.join(rootPath(directory), 'dupe.md');
  await writeFile(dupeFlat, skillText('Dupe flat', 'Flat duplicate'));

  let scan = await scanSkills(directory);
  await setSkillEnabled(directory, 'alpha', false);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'alpha')?.state, 'disabled');
  assert.equal(await exists(`${alpha}.disabled`), true);
  await setSkillEnabled(directory, 'alpha', true);
  assert.equal(await exists(alpha), true);

  await setSkillEnabled(directory, 'beta', false);
  assert.equal(await exists(`${beta}.disabled`), true);
  assert.equal(await exists(beta), false);
  await setSkillEnabled(directory, 'beta', true);
  assert.equal(await exists(beta), true);

  await setSkillEnabled(directory, 'dupe', false);
  assert.equal(await exists(`${dupeNested}.disabled`), true);
  assert.equal(await exists(`${dupeFlat}.disabled`), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'dupe')?.state, 'disabled');
  await setSkillEnabled(directory, 'dupe', true);
  assert.equal(await exists(dupeNested), true);
  assert.equal(await exists(dupeFlat), true);
});

test('resolves active/disabled conflicts without losing either document', async (t) => {
  const directory = await home();
  t.after(() => rm(directory, { recursive: true, force: true }));

  const delta = await put(directory, 'delta', skillText('Delta', 'Delta skill'));
  const deltaDisabled = path.join(path.dirname(delta), 'SKILL.md.disabled');
  await writeFile(deltaDisabled, skillText('Delta old', 'Old disabled copy'));

  let scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'delta')?.state, 'conflict');
  await setSkillEnabled(directory, 'delta', false).then(
    () => assert.fail('conflict should block the switch'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'conflict'),
  );

  const keepEnabled = await resolveBoth(directory, delta, 'enabled');
  assert.match(keepEnabled.backupPath, /\.disabled\.conflict-/);
  assert.equal(await exists(delta), true);
  assert.equal(await exists(deltaDisabled), false);
  assert.equal(await exists(keepEnabled.backupPath), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'delta')?.state, 'enabled');

  const epsilon = await put(directory, 'epsilon', skillText('Epsilon', 'Epsilon skill'));
  const epsilonDisabled = path.join(path.dirname(epsilon), 'SKILL.md.disabled');
  await writeFile(epsilonDisabled, skillText('Epsilon old', 'Old disabled copy'));
  const keepDisabled = await resolveBoth(directory, epsilon, 'disabled');
  assert.match(keepDisabled.backupPath, /\.disabled\.conflict-/);
  assert.equal(await exists(epsilon), false);
  assert.equal(await exists(epsilonDisabled), true);
  assert.equal(await exists(keepDisabled.backupPath), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'epsilon')?.state, 'disabled');
});

test('an unreadable root blocks every rename path', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'skills-root-error-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(path.join(directory, '.config/opencode'), { recursive: true });
  await writeFile(path.join(directory, '.config/opencode/skills'), 'not a directory');

  const scan = await scanSkills(directory);
  assert.equal(scan.root.exists, false);
  assert.equal(scan.root.error, '不是目录');
  await setSkillEnabled(directory, 'alpha', false).then(
    () => assert.fail('a read error must block a single toggle'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'read-error'),
  );
  await bulkSetEnabled(directory, false).then(
    () => assert.fail('a read error must block a bulk toggle'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'read-error'),
  );
  await resolveBoth(directory, path.join(rootPath(directory), 'x/SKILL.md'), 'enabled').then(
    () => assert.fail('a read error must block conflict resolution'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code === 'read-error', true),
  );
});

test('bulk operations cover the OpenCode directory', async (t) => {
  const directory = await home();
  t.after(() => rm(directory, { recursive: true, force: true }));

  const alpha = await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));
  const beta = path.join(rootPath(directory), 'beta.md');
  await writeFile(beta, skillText('Beta', 'Flat skill'));

  const off = await bulkSetEnabled(directory, false);
  assert.ok(off.changed.includes('alpha'));
  assert.ok(off.changed.includes('beta'));
  assert.equal(await exists(`${alpha}.disabled`), true);
  assert.equal(await exists(`${beta}.disabled`), true);
  let scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'alpha')?.state, 'disabled');
  assert.equal(scan.skills.find((skill) => skill.id === 'beta')?.state, 'disabled');

  const on = await bulkSetEnabled(directory, true);
  assert.ok(on.changed.includes('alpha'));
  assert.equal(await exists(alpha), true);
  assert.equal(await exists(beta), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'alpha')?.state, 'enabled');
  assert.equal(scan.summary.disabled, 0);

  const groupOff = await batchSetEnabled(directory, [], ['alpha', 'beta']);
  assert.deepEqual(groupOff.changed.sort(), ['alpha', 'beta']);
  assert.equal(await exists(`${alpha}.disabled`), true);
  assert.equal(await exists(`${beta}.disabled`), true);
  const groupOn = await batchSetEnabled(directory, ['alpha', 'beta'], []);
  assert.deepEqual(groupOn.changed.sort(), ['alpha', 'beta']);
  assert.equal(await exists(alpha), true);
  assert.equal(await exists(beta), true);
});
