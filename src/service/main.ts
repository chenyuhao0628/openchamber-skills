import http from 'node:http';
import os from 'node:os';
import {
  SkillsError,
  bulkSetEnabled,
  resolveBoth,
  scanSkills,
  setSkillEnabled,
} from '../core/skills.ts';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';
if (!port || !token) {
  console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required');
  process.exit(1);
}

const HOME = os.homedir();

const json = (res: http.ServerResponse, status: number, body: unknown): void => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
};

const readBody = (req: http.IncomingMessage): Promise<Record<string, unknown>> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    let failed = false;
    req.on('data', (chunk: Buffer) => {
      if (failed) return;
      size += chunk.length;
      if (size > 64 * 1024) {
        failed = true;
        chunks.length = 0;
        reject(new SkillsError('too-large', 413, '提交内容过大'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('error', () => reject(new SkillsError('invalid-request', 400, '请求中断，请重试')));
    req.on('end', () => {
      if (failed) return;
      try {
        const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('not an object');
        }
        resolve(parsed as Record<string, unknown>);
      } catch {
        reject(new SkillsError('invalid-request', 400, '请求内容必须是有效的 JSON 对象'));
      }
    });
  });

let queue: Promise<unknown> = Promise.resolve();
const exclusive = <T>(action: () => Promise<T>): Promise<T> => {
  const next = queue.then(() => action(), () => action());
  queue = next.catch(() => undefined);
  return next;
};

const stringField = (body: Record<string, unknown>, key: string, max: number): string => {
  const value = typeof body[key] === 'string' ? body[key].trim() : '';
  if (!value) throw new SkillsError('invalid-request', 400, `缺少 ${key}`);
  if (value.length > max) throw new SkillsError('invalid-request', 400, `${key} 长度超出限制`);
  return value;
};

const booleanField = (body: Record<string, unknown>, key: string): boolean => {
  const value = body[key];
  if (typeof value !== 'boolean') throw new SkillsError('invalid-request', 400, `${key} 必须是布尔值`);
  return value;
};

const handle = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    throw new SkillsError('unauthorized', 401, 'unauthorized');
  }
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/health' && req.method === 'GET') {
    json(res, 200, { ok: true });
    return;
  }
  if (url.pathname === '/skills' && req.method === 'GET') {
    json(res, 200, await exclusive(() => scanSkills(HOME)));
    return;
  }
  if (url.pathname === '/skills/toggle' && req.method === 'POST') {
    const body = await readBody(req);
    const id = stringField(body, 'id', 128);
    const enabled = booleanField(body, 'enabled');
    json(res, 200, await exclusive(() => setSkillEnabled(HOME, id, enabled)));
    return;
  }
  if (url.pathname === '/skills/bulk' && req.method === 'POST') {
    const body = await readBody(req);
    const enabled = booleanField(body, 'enabled');
    json(res, 200, await exclusive(() => bulkSetEnabled(HOME, enabled)));
    return;
  }
  if (url.pathname === '/skills/resolve' && req.method === 'POST') {
    const body = await readBody(req);
    const entryPath = stringField(body, 'path', 4096);
    const keep = body.keep === 'enabled' || body.keep === 'disabled' ? body.keep : null;
    if (!keep) throw new SkillsError('invalid-request', 400, 'keep 必须是 enabled 或 disabled');
    json(res, 200, await exclusive(() => resolveBoth(HOME, entryPath, keep)));
    return;
  }
  throw new SkillsError('not-found', 404, 'not-found');
};

const server = http.createServer((req, res) => {
  void handle(req, res).catch((error: unknown) => {
    if (res.headersSent || res.destroyed) return;
    if (error instanceof SkillsError) {
      json(res, error.status, {
        error: error.message,
        code: error.code,
        ...(error.conflicts ? { conflicts: error.conflicts } : {}),
      });
      return;
    }
    console.error('skills service:', error instanceof Error ? error.message : error);
    json(res, 500, { error: '本地服务处理失败，请重试', code: 'internal' });
  });
});

server.listen(port, '127.0.0.1');
