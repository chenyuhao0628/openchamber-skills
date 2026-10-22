import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { TranslationCache, TranslationEntry } from '../shared/types.ts';

const DATA_DIR = ['.config', 'openchamber', 'skills-manager'] as const;
const CACHE_FILE = 'translations.json';
const MAX_ENTRIES = 300;
const MAX_NAME = 300;
const MAX_DESCRIPTION = 8_000;

export class TranslationError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, status: number, message: string) {
    super(message);
    this.name = 'TranslationError';
    this.code = code;
    this.status = status;
  }
}

const empty = (): TranslationCache => ({ version: 1, locale: 'zh-CN', entries: {} });

const cacheFile = (home: string): string => path.join(home, ...DATA_DIR, CACHE_FILE);

const validateEntry = (value: unknown): TranslationEntry | null => {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (
    typeof record.hash !== 'string' ||
    typeof record.nameZh !== 'string' ||
    typeof record.descriptionZh !== 'string' ||
    typeof record.updatedAt !== 'number'
  ) {
    return null;
  }
  const hash = record.hash.slice(0, 128);
  const nameZh = record.nameZh.trim().slice(0, MAX_NAME);
  const descriptionZh = record.descriptionZh.trim().slice(0, MAX_DESCRIPTION);
  if (!hash || !nameZh) return null;
  return { hash, nameZh, descriptionZh, updatedAt: record.updatedAt };
};

export const readTranslations = async (home: string): Promise<TranslationCache> => {
  let raw: string;
  try {
    raw = await fs.readFile(cacheFile(home), 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return empty();
    throw new TranslationError('read-error', 500, '无法读取翻译缓存，请检查文件权限。');
  }
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; locale?: unknown; entries?: unknown };
    if (parsed.version !== 1 || parsed.locale !== 'zh-CN' || !parsed.entries || typeof parsed.entries !== 'object') {
      throw new Error('invalid cache');
    }
    const entries: Record<string, TranslationEntry> = {};
    for (const [id, value] of Object.entries(parsed.entries as Record<string, unknown>)) {
      if (!id || id.length > 128) continue;
      const entry = validateEntry(value);
      if (entry) entries[id] = entry;
    }
    return { version: 1, locale: 'zh-CN', entries };
  } catch {
    throw new TranslationError('invalid-cache', 500, '翻译缓存文件损坏；原文件未修改。');
  }
};

export const writeTranslations = async (home: string, value: unknown): Promise<TranslationCache> => {
  if (!value || typeof value !== 'object') {
    throw new TranslationError('invalid-cache', 400, '翻译缓存格式不正确。');
  }
  const record = value as { version?: unknown; locale?: unknown; entries?: unknown };
  if (record.version !== 1 || record.locale !== 'zh-CN' || !record.entries || typeof record.entries !== 'object' || Array.isArray(record.entries)) {
    throw new TranslationError('invalid-cache', 400, '翻译缓存格式不正确。');
  }
  const rawEntries = Object.entries(record.entries as Record<string, unknown>);
  if (rawEntries.length > MAX_ENTRIES) {
    throw new TranslationError('invalid-cache', 400, '翻译缓存条目过多。');
  }
  const entries: Record<string, TranslationEntry> = {};
  for (const [id, item] of rawEntries) {
    if (!id || id.length > 128) continue;
    const entry = validateEntry(item);
    if (entry) entries[id] = entry;
  }

  const dir = path.join(home, ...DATA_DIR);
  const file = cacheFile(home);
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    await fs.mkdir(dir, { recursive: true, mode: 0o700 });
    await fs.writeFile(temporary, `${JSON.stringify({ version: 1, locale: 'zh-CN', entries }, null, 2)}\n`, {
      encoding: 'utf8',
      mode: 0o600,
    });
    await fs.rename(temporary, file);
    const check = await readTranslations(home);
    return check;
  } catch (error) {
    try {
      await fs.unlink(temporary);
    } catch {
    }
    if (error instanceof TranslationError) throw error;
    throw new TranslationError('write-error', 500, '保存翻译缓存失败，请检查目录权限。');
  }
};
