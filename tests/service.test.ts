import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const project = fileURLToPath(new URL('..', import.meta.url));
const token = 'fixture-skills-token';

const exists = async (file: string): Promise<boolean> => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

const skillText = (name: string, description: string): string =>
  `---\nname: ${name}\ndescription: ${description}\n---\n\nBody for ${name}.\n`;

test('skills service enforces auth and checks entry conflicts', async (t) => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), 'skills-service-'));
  const opencode = path.join(fixture, '.config/opencode/skills');
  await mkdir(opencode, { recursive: true });

  const alpha = path.join(opencode, 'alpha/SKILL.md');
  await mkdir(path.dirname(alpha), { recursive: true });
  await writeFile(alpha, skillText('Alpha', 'Alpha skill'));
  const beta = path.join(opencode, 'beta.md');
  await writeFile(beta, skillText('Beta', 'Flat skill'));

  const other = path.join(fixture, '.claude/skills/other/SKILL.md');
  await mkdir(path.dirname(other), { recursive: true });
  await writeFile(other, skillText('Other', 'Other agent skill'));

  const prelude = path.join(fixture, 'isolate.cjs');
  await writeFile(
    prelude,
    `require('node:os').homedir = () => ${JSON.stringify(fixture)}; require('node:module').syncBuiltinESMExports();`,
  );

  const reservation = http.createServer();
  reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = (reservation.address() as { port: number }).port;
  await new Promise((resolve) => reservation.close(resolve));

  const child = spawn(process.execPath, ['--require', prelude, path.join(project, 'service/main.js')], {
    env: { ...process.env, OPENCHAMBER_SERVICE_PORT: String(port), OPENCHAMBER_SERVICE_TOKEN: token },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  child.stdout.on('data', (chunk) => { logs += chunk; });
  child.stderr.on('data', (chunk) => { logs += chunk; });

  t.after(async () => {
    if (child.exitCode === null) {
      child.kill();
      await once(child, 'exit');
    }
    await rm(fixture, { recursive: true, force: true });
  });

  const call = async (
    route: string,
    method = 'GET',
    body?: unknown,
    authenticated = true,
  ): Promise<{ status: number; data: Record<string, unknown> }> => {
    const response = await fetch(`http://127.0.0.1:${port}${route}`, {
      method,
      headers: {
        ...(authenticated ? { Authorization: `Bearer ${token}` } : {}),
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      ...(body === undefined ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }),
    });
    const data = JSON.parse(await response.text()) as Record<string, unknown>;
    return { status: response.status, data };
  };

  let ready = false;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      ready = (await call('/health')).status === 200;
      if (ready) break;
    } catch {
    }
    if (child.exitCode !== null) throw new Error(`Service exited: ${logs}`);
    await delay(25);
  }
  assert.ok(ready, `service starts: ${logs}`);

  await t.test('requires the host bearer token', async () => {
    assert.equal((await call('/health', 'GET', undefined, false)).status, 401);
    assert.equal((await call('/skills', 'GET', undefined, false)).status, 401);
  });

  await t.test('lists only the OpenCode directory', async () => {
    const result = await call('/skills');
    assert.equal(result.status, 200);
    const skills = result.data.skills as Array<{ id: string; advertised: boolean; contentHash: string }>;
    assert.equal(skills.find((skill) => skill.id === 'alpha')?.advertised, true);
    assert.equal(skills.find((skill) => skill.id === 'alpha')?.contentHash.length, 64);
    assert.equal(skills.find((skill) => skill.id === 'beta')?.advertised, true);
    assert.equal(skills.some((skill) => skill.id === 'other'), false);
  });

  await t.test('toggles an entry document off and back on', async () => {
    const off = await call('/skills/toggle', 'POST', { id: 'alpha', enabled: false });
    assert.equal(off.status, 200);
    assert.equal(await exists(alpha), false);
    assert.equal(await exists(`${alpha}.disabled`), true);
    let skills = off.data.skills as Array<{ id: string; state: string }>;
    assert.equal(skills.find((skill) => skill.id === 'alpha')?.state, 'disabled');

    const on = await call('/skills/toggle', 'POST', { id: 'alpha', enabled: true });
    assert.equal(on.status, 200);
    assert.equal(await exists(alpha), true);
    assert.equal(await exists(`${alpha}.disabled`), false);
    skills = on.data.skills as Array<{ id: string; state: string }>;
    assert.equal(skills.find((skill) => skill.id === 'alpha')?.state, 'enabled');
  });

  await t.test('bulk operations cover the OpenCode directory', async () => {
    const off = await call('/skills/bulk', 'POST', { enabled: false });
    assert.equal(off.status, 200);
    assert.equal(await exists(`${alpha}.disabled`), true);
    assert.equal(await exists(`${beta}.disabled`), true);
    const on = await call('/skills/bulk', 'POST', { enabled: true });
    assert.equal(on.status, 200);
    assert.equal(await exists(alpha), true);
    assert.equal(await exists(beta), true);
  });

  await t.test('batch changes only the requested skills', async () => {
    const off = await call('/skills/batch', 'POST', { enable: [], disable: ['alpha'] });
    assert.equal(off.status, 200);
    assert.equal(await exists(`${alpha}.disabled`), true);
    assert.equal(await exists(beta), true);
    const on = await call('/skills/batch', 'POST', { enable: ['alpha'], disable: [] });
    assert.equal(on.status, 200);
    assert.equal(await exists(alpha), true);
  });

  await t.test('stores translation cache privately', async () => {
    const initial = await call('/translations');
    assert.equal(initial.status, 200);
    assert.deepEqual(initial.data.entries, {});
    const saved = await call('/translations', 'POST', {
      version: 1,
      locale: 'zh-CN',
      entries: {
        alpha: { hash: 'abc', nameZh: '阿尔法', descriptionZh: '中文说明', updatedAt: 1 },
      },
    });
    assert.equal(saved.status, 200);
    assert.equal((saved.data.entries as Record<string, { nameZh: string }>).alpha.nameZh, '阿尔法');
    const cacheFile = path.join(fixture, '.config/openchamber/skills-manager/translations.json');
    const cacheStat = await stat(cacheFile);
    assert.equal(cacheStat.mode & 0o777, 0o600);
  });

  await t.test('reports both-file conflicts and resolves them explicitly', async () => {
    const both = path.join(opencode, 'both/SKILL.md');
    await mkdir(path.dirname(both), { recursive: true });
    await writeFile(both, skillText('Both', 'Conflict skill'));
    await writeFile(`${both}.disabled`, skillText('Both old', 'Old conflict copy'));

    const scan = await call('/skills');
    const skills = scan.data.skills as Array<{ id: string; state: string }>;
    assert.equal(skills.find((skill) => skill.id === 'both')?.state, 'conflict');

    const blocked = await call('/skills/toggle', 'POST', { id: 'both', enabled: false });
    assert.equal(blocked.status, 409);
    assert.equal(blocked.data.code, 'conflict');

    const resolved = await call('/skills/resolve', 'POST', { path: both, keep: 'disabled' });
    assert.equal(resolved.status, 200);
    assert.equal(typeof resolved.data.backupPath, 'string');
    assert.equal(await exists(both), false);
    assert.equal(await exists(`${both}.disabled`), true);
    assert.equal(await exists(String(resolved.data.backupPath)), true);
  });

  await t.test('rejects malformed requests without stopping', async () => {
    assert.equal((await call('/skills/toggle', 'POST', '{broken')).status, 400);
    assert.equal((await call('/skills/toggle', 'POST', { id: 'alpha' })).status, 400);
    assert.equal((await call('/skills/resolve', 'POST', { path: alpha, keep: 'maybe' })).status, 400);
    assert.equal((await call('/unknown')).status, 404);
    assert.equal((await call('/health')).status, 200);
  });

  await t.test('an unreadable root blocks writes', async () => {
    await rm(opencode, { recursive: true, force: true });
    await writeFile(opencode, 'not a directory');
    const scan = await call('/skills');
    assert.equal(scan.status, 200);
    assert.equal((scan.data.root as { error: string | null }).error, '不是目录');
    const blocked = await call('/skills/toggle', 'POST', { id: 'alpha', enabled: false });
    assert.equal(blocked.status, 409);
    assert.equal(blocked.data.code, 'read-error');
  });
});
