import fs from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type {
  BulkResponse,
  ConflictKind,
  ConflictView,
  ResolveResponse,
  RootView,
  SkillState,
  SkillView,
  SkillsResponse,
  Summary,
} from '../shared/types.ts';

const ROOT_DIR = ['.config', 'opencode', 'skills'] as const;
const MAX_DEPTH = 6;
const MAX_SKILL_BYTES = 2_000_000;
const IGNORED_DIRS = new Set(['node_modules', '.git', '.svn', '.hg']);
const CONFLICT_ORDER: Record<ConflictKind, number> = {
  both: 0,
  'read-error': 1,
  duplicate: 2,
  invalid: 3,
  empty: 4,
  manual: 5,
  'no-description': 6,
};

type Frontmatter = {
  name: string;
  description: string;
  autoInvokeOff: boolean;
  hasFrontmatter: boolean;
  valid: boolean;
  empty: boolean;
};

type Entry = {
  id: string;
  activePath: string | null;
  disabledPath: string | null;
  frontmatter: Frontmatter;
  error: string | null;
};

type Move = { id: string; from: string; to: string };
type EntryKind = 'file' | 'dir' | 'other';
type Keep = 'enabled' | 'disabled';

export class SkillsError extends Error {
  readonly code: string;
  readonly status: number;
  readonly conflicts?: ConflictView[];

  constructor(code: string, status: number, message: string, conflicts?: ConflictView[]) {
    super(message);
    this.name = 'SkillsError';
    this.code = code;
    this.status = status;
    this.conflicts = conflicts;
  }
}

const describeFs = (error: unknown): string => {
  const code = (error as NodeJS.ErrnoException).code;
  if (code === 'EACCES' || code === 'EPERM') return '权限不足';
  if (code === 'ENOENT') return '路径不存在';
  if (code === 'ENOTDIR') return '不是目录';
  if (code === 'EISDIR') return '是目录';
  return error instanceof Error ? error.message : '文件系统错误';
};

const parseBoolean = (value: string): boolean | undefined => {
  const text = value.trim().toLowerCase();
  if (['true', 'yes', 'on', '1'].includes(text)) return true;
  if (['false', 'no', 'off', '0'].includes(text)) return false;
  return undefined;
};

const unquote = (value: string): string => {
  const text = value.trim();
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  }
  if (text.length >= 2 && text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1).replace(/''/g, "'");
  }
  return text;
};

const fallbackFrontmatter = (id: string): Frontmatter => ({
  name: id,
  description: '',
  autoInvokeOff: false,
  hasFrontmatter: false,
  valid: true,
  empty: false,
});

export const parseFrontmatter = (text: string, id: string): Frontmatter => {
  const withoutBom = text.replace(/^\uFEFF/, '');
  if (withoutBom.trim().length === 0) {
    return { ...fallbackFrontmatter(id), empty: true };
  }
  const lines = withoutBom.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return fallbackFrontmatter(id);
  let end = -1;
  for (let index = 1; index < lines.length; index += 1) {
    const value = lines[index]?.trim();
    if (value === '---' || value === '...') {
      end = index;
      break;
    }
  }
  if (end < 0) {
    return { ...fallbackFrontmatter(id), hasFrontmatter: true, valid: false };
  }

  const block = lines.slice(1, end);
  let name = '';
  let description = '';
  let disable: boolean | undefined;
  let metaAutoInvoke: boolean | undefined;

  for (let index = 0; index < block.length; index += 1) {
    const line = block[index] ?? '';
    if (line.trim().length === 0 || /^\s/.test(line)) continue;
    const match = /^([^:]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = (match[1] ?? '').trim().replace(/^["']|["']$/g, '');
    const raw = (match[2] ?? '').trim();

    if (key === 'name' || key === 'description') {
      let value = raw;
      if (/^[>|][+-]?$/.test(value)) {
        const folded = value.startsWith('>');
        const collected: string[] = [];
        let cursor = index + 1;
        while (cursor < block.length) {
          const next = block[cursor] ?? '';
          if (next.trim().length > 0 && !/^\s/.test(next)) break;
          collected.push(next);
          cursor += 1;
        }
        const indents = collected.filter((item) => item.trim().length > 0).map((item) => item.match(/^\s*/)?.[0].length ?? 0);
        const base = indents.length > 0 ? Math.min(...indents) : 0;
        value = collected
          .map((item) => item.slice(Math.min(base, item.length)))
          .join(folded ? ' ' : '\n')
          .trim();
        index = cursor - 1;
      } else {
        value = unquote(value);
      }
      if (key === 'name') name = value.trim();
      else description = value.trim();
      continue;
    }

    if (key === 'disable-model-invocation') {
      disable = parseBoolean(unquote(raw));
      continue;
    }

    if (key === 'metadata') {
      if (raw.startsWith('{')) {
        const inline = /["']?opencode\/autoinvoke["']?\s*:\s*(true|false|yes|no|on|off|1|0)/i.exec(raw);
        if (inline) metaAutoInvoke = parseBoolean(inline[1] ?? '');
        continue;
      }
      let cursor = index + 1;
      while (cursor < block.length) {
        const next = block[cursor] ?? '';
        if (next.trim().length > 0 && !/^\s/.test(next)) break;
        const nested = /^\s+["']?opencode\/autoinvoke["']?\s*:\s*(.*)$/.exec(next);
        if (nested) metaAutoInvoke = parseBoolean(unquote(nested[1] ?? ''));
        cursor += 1;
      }
      index = cursor - 1;
    }
  }

  return {
    name: name.trim() || id,
    description: description.trim(),
    autoInvokeOff: metaAutoInvoke !== undefined ? !metaAutoInvoke : disable === true,
    hasFrontmatter: true,
    valid: true,
    empty: false,
  };
};

const rootView = async (home: string): Promise<RootView> => {
  const root = path.join(home, ...ROOT_DIR);
  try {
    const info = await fs.stat(root);
    return { path: root, exists: info.isDirectory(), error: info.isDirectory() ? null : '不是目录' };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return { path: root, exists: false, error: code === 'ENOENT' ? null : describeFs(error) };
  }
};

const classify = async (directory: string, entry: Dirent): Promise<EntryKind> => {
  if (entry.isFile()) return 'file';
  if (entry.isDirectory()) return 'dir';
  if (!entry.isSymbolicLink()) return 'other';
  try {
    const info = await fs.stat(path.join(directory, entry.name));
    return info.isFile() ? 'file' : info.isDirectory() ? 'dir' : 'other';
  } catch {
    return 'other';
  }
};

const readFrontmatterFor = async (
  id: string,
  activePath: string | null,
  disabledPath: string | null,
): Promise<{ frontmatter: Frontmatter; error: string | null }> => {
  let activeError: string | null = null;
  if (activePath) {
    try {
      const info = await fs.stat(activePath);
      if (info.size > MAX_SKILL_BYTES) activeError = '入口文件超过 2 MB';
      else {
        const text = await fs.readFile(activePath, 'utf8');
        return { frontmatter: parseFrontmatter(text, id), error: null };
      }
    } catch (error) {
      activeError = describeFs(error);
    }
  }
  if (disabledPath) {
    try {
      const info = await fs.stat(disabledPath);
      if (info.size > MAX_SKILL_BYTES) {
        return { frontmatter: fallbackFrontmatter(id), error: activeError ?? '停用入口超过 2 MB' };
      }
      const text = await fs.readFile(disabledPath, 'utf8');
      return { frontmatter: parseFrontmatter(text, id), error: activeError };
    } catch (error) {
      return { frontmatter: fallbackFrontmatter(id), error: activeError ?? describeFs(error) };
    }
  }
  return { frontmatter: fallbackFrontmatter(id), error: activeError ?? '无法读取入口文件' };
};

const scanDirectory = async (
  root: RootView,
  directory: string,
  depth: number,
  entries: Entry[],
  visited: Set<string>,
): Promise<void> => {
  let dirents: Dirent[];
  try {
    dirents = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (!root.error) root.error = `无法读取 ${directory}：${describeFs(error)}`;
    return;
  }

  const visible = dirents.filter((entry) => !entry.name.startsWith('.') && !IGNORED_DIRS.has(entry.name));
  const classified = await Promise.all(visible.map(async (entry) => ({ entry, kind: await classify(directory, entry) })));
  const active = classified.find((item) => item.kind === 'file' && item.entry.name === 'SKILL.md');
  const disabled = classified.find((item) => item.kind === 'file' && item.entry.name === 'SKILL.md.disabled');

  if (active || disabled) {
    const id = path.basename(directory);
    const activePath = active ? path.join(directory, 'SKILL.md') : null;
    const disabledPath = disabled ? path.join(directory, 'SKILL.md.disabled') : null;
    const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
    entries.push({ id, activePath, disabledPath, frontmatter, error });
    if (active) return;
  }

  if (depth === 0) {
    const flat = classified.filter(
      (item) =>
        item.kind === 'file' &&
        item.entry.name !== 'SKILL.md.disabled' &&
        (item.entry.name.endsWith('.md') || item.entry.name.endsWith('.md.disabled')),
    );
    const ids = new Set<string>();
    for (const item of flat) {
      ids.add(item.entry.name.endsWith('.md.disabled')
        ? item.entry.name.slice(0, -'.md.disabled'.length)
        : item.entry.name.slice(0, -'.md'.length));
    }
    for (const id of ids) {
      const activeItem = flat.find((item) => item.entry.name === `${id}.md`);
      const disabledItem = flat.find((item) => item.entry.name === `${id}.md.disabled`);
      const activePath = activeItem ? path.join(directory, activeItem.entry.name) : null;
      const disabledPath = disabledItem ? path.join(directory, disabledItem.entry.name) : null;
      if (!activePath && !disabledPath) continue;
      const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
      entries.push({ id, activePath, disabledPath, frontmatter, error });
    }
  }

  if (depth >= MAX_DEPTH) return;
  for (const item of classified) {
    if (item.kind !== 'dir') continue;
    const child = path.join(directory, item.entry.name);
    let real = child;
    try {
      real = await fs.realpath(child);
    } catch {
    }
    if (visited.has(real)) continue;
    visited.add(real);
    await scanDirectory(root, child, depth + 1, entries, visited);
  }
};

const addConflict = (conflicts: ConflictView[], seen: Set<string>, conflict: ConflictView): void => {
  const key = [conflict.kind, conflict.skillId, conflict.activePath ?? '', conflict.disabledPath ?? '', conflict.message].join('|');
  if (seen.has(key)) return;
  seen.add(key);
  conflicts.push(conflict);
};

const estimateTokens = (name: string, id: string, description: string): number =>
  Math.max(1, Math.ceil((name.length + id.length + description.length) / 4) + 8);

const buildResponse = (root: RootView, entries: Entry[]): SkillsResponse => {
  const groups = new Map<string, Entry[]>();
  for (const entry of entries) {
    const group = groups.get(entry.id);
    if (group) group.push(entry);
    else groups.set(entry.id, [entry]);
  }

  const skills: SkillView[] = [];
  for (const [id, group] of groups) {
    group.sort((left, right) => (left.activePath ?? left.disabledPath ?? '').localeCompare(right.activePath ?? right.disabledPath ?? ''));
    const active = group.filter((entry) => entry.activePath);
    const disabled = group.filter((entry) => entry.disabledPath);
    const loadable = active.filter((entry) => !entry.error && entry.frontmatter.valid && !entry.frontmatter.empty);
    const winner = loadable.at(-1) ?? active.at(-1) ?? group[0] ?? null;
    const both = group.some((entry) => entry.activePath && entry.disabledPath);
    const state: SkillState = both
      ? 'conflict'
      : active.length > 0 && disabled.length > 0
        ? 'mixed'
        : active.length > 0
          ? 'enabled'
          : 'disabled';

    const conflicts: ConflictView[] = [];
    const seen = new Set<string>();
    for (const entry of group) {
      if (entry.activePath && entry.disabledPath) {
        addConflict(conflicts, seen, {
          kind: 'both',
          skillId: id,
          message: '同一目录同时存在启用和停用入口，需要先选择保留哪一个。',
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: true,
        });
      }
      if (entry.error) {
        addConflict(conflicts, seen, {
          kind: 'read-error',
          skillId: id,
          message: `无法读取入口：${entry.error}`,
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false,
        });
      }
      if (!entry.frontmatter.valid) {
        addConflict(conflicts, seen, {
          kind: 'invalid',
          skillId: id,
          message: 'frontmatter 未闭合，OpenCode 可能跳过此技能；入口开关仍可用。',
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false,
        });
      }
      if (entry.frontmatter.empty) {
        addConflict(conflicts, seen, {
          kind: 'empty',
          skillId: id,
          message: '入口文件为空，OpenCode 不会加载它。',
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false,
        });
      }
    }
    if (group.length > 1) {
      const winnerLabel = winner
        ? winner.activePath ?? winner.disabledPath ?? '未知入口'
        : '无（入口不可加载）';
      addConflict(conflicts, seen, {
        kind: 'duplicate',
        skillId: id,
        message: `同 ID 有 ${group.length} 个入口；生效入口：${winnerLabel}。`,
        activePath: winner?.activePath ?? null,
        disabledPath: winner?.disabledPath ?? null,
        blocking: false,
      });
    }
    if (winner?.activePath && winner.frontmatter.autoInvokeOff) {
      addConflict(conflicts, seen, {
        kind: 'manual',
        skillId: id,
        message: '入口已启用，但标记为仅手动调用；模型看不到它。',
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false,
      });
    }
    if (winner?.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && !winner.frontmatter.description.trim()) {
      addConflict(conflicts, seen, {
        kind: 'no-description',
        skillId: id,
        message: '入口已启用，但没有 description；模型不会自动选用。',
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false,
      });
    }

    const advertised = Boolean(
      winner &&
        winner.activePath &&
        !winner.error &&
        winner.frontmatter.valid &&
        !winner.frontmatter.empty &&
        winner.frontmatter.description.trim().length > 0 &&
        !winner.frontmatter.autoInvokeOff,
    );
    const name = winner?.frontmatter.name || id;
    const description = winner?.frontmatter.description ?? '';
    skills.push({
      id,
      name,
      description,
      state,
      advertised,
      autoInvokeOff: winner?.frontmatter.autoInvokeOff ?? false,
      activePaths: active.flatMap((entry) => (entry.activePath ? [entry.activePath] : [])),
      disabledPaths: disabled.flatMap((entry) => (entry.disabledPath ? [entry.disabledPath] : [])),
      conflicts,
      warnings: Array.from(new Set(conflicts.filter((conflict) => !conflict.blocking).map((conflict) => conflict.message))),
      estimatedTokens: advertised ? estimateTokens(name, id, description) : 0,
    });
  }

  skills.sort((left, right) => left.id.localeCompare(right.id));
  const conflicts = skills.flatMap((skill) => skill.conflicts);
  conflicts.sort((left, right) => {
    if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
    const kind = CONFLICT_ORDER[left.kind] - CONFLICT_ORDER[right.kind];
    return kind !== 0 ? kind : left.skillId.localeCompare(right.skillId);
  });
  const summary: Summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === 'disabled').length,
    blockingConflicts: conflicts.filter((conflict) => conflict.blocking).length,
    warnings: conflicts.filter((conflict) => !conflict.blocking).length,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0),
  };
  return { skills, conflicts, summary, root, scannedAt: Date.now() };
};

export const scanSkills = async (home: string): Promise<SkillsResponse> => {
  const root = await rootView(home);
  const entries: Entry[] = [];
  if (root.exists) {
    const visited = new Set<string>();
    try {
      visited.add(await fs.realpath(root.path));
    } catch {
      visited.add(root.path);
    }
    await scanDirectory(root, root.path, 0, entries, visited);
  }
  return buildResponse(root, entries);
};

const exists = async (file: string): Promise<boolean> => {
  try {
    await fs.lstat(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
};

const applyMoves = async (moves: Move[]): Promise<void> => {
  if (moves.length === 0) return;
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError('conflict', 409, `目标入口已存在：${move.to}`);
      }
      if (!(await exists(move.from))) {
        throw new SkillsError('conflict', 409, `入口已变化，请重新扫描：${move.from}`);
      }
    }
  } catch (error) {
    if (error instanceof SkillsError) throw error;
    throw new SkillsError('io', 500, `检查入口失败：${describeFs(error)}`);
  }

  const done: Move[] = [];
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError('conflict', 409, `目标入口已存在：${move.to}`);
      }
      await fs.rename(move.from, move.to);
      done.push(move);
      if ((await exists(move.from)) || !(await exists(move.to))) {
        throw new SkillsError('io', 500, `改名后校验失败：${move.to}`);
      }
    }
  } catch (error) {
    for (const move of done.reverse()) {
      try {
        if ((await exists(move.to)) && !(await exists(move.from))) await fs.rename(move.to, move.from);
      } catch {
      }
    }
    if (error instanceof SkillsError) throw error;
    throw new SkillsError('io', 500, `改名失败：${describeFs(error)}`);
  }
};

const assertRootReadable = (scan: SkillsResponse): void => {
  if (scan.root.error) {
    throw new SkillsError('read-error', 409, `技能目录无法读取：${scan.root.error}`);
  }
};

export const setSkillEnabled = async (home: string, id: string, enabled: boolean): Promise<SkillsResponse> => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const skill = before.skills.find((item) => item.id === id);
  if (!skill) throw new SkillsError('not-found', 404, `没有找到技能 ${id}`);
  if (skill.conflicts.some((conflict) => conflict.kind === 'both')) {
    throw new SkillsError('conflict', 409, `技能 ${id} 有未解决的入口冲突。`, skill.conflicts);
  }

  const moves: Move[] = [];
  if (!enabled) {
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  } else {
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith('.disabled')) {
        throw new SkillsError('io', 500, `无法识别停用入口：${disabledPath}`);
      }
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -'.disabled'.length) });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  return scanSkills(home);
};

export const bulkSetEnabled = async (home: string, enabled: boolean): Promise<BulkResponse> => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const blocking = before.conflicts.filter((conflict) => conflict.kind === 'both');
  if (blocking.length > 0) {
    throw new SkillsError('conflict', 409, '还有未解决的入口冲突，不能批量操作。', blocking);
  }

  const moves: Move[] = [];
  for (const skill of before.skills) {
    if (!enabled) {
      for (const activePath of skill.activePaths) {
        moves.push({ id: skill.id, from: activePath, to: `${activePath}.disabled` });
      }
    } else {
      for (const disabledPath of skill.disabledPaths) {
        if (!disabledPath.endsWith('.disabled')) continue;
        moves.push({ id: skill.id, from: disabledPath, to: disabledPath.slice(0, -'.disabled'.length) });
      }
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(home);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};

export const resolveBoth = async (
  home: string,
  entryPath: string,
  keep: Keep,
): Promise<ResolveResponse> => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const skill = before.skills.find((item) =>
    item.activePaths.includes(entryPath) || item.disabledPaths.includes(entryPath),
  );
  if (!skill) throw new SkillsError('not-found', 404, '没有找到这个入口冲突，请重新扫描。');
  let activePath: string | null = null;
  let disabledPath: string | null = null;
  if (skill.activePaths.includes(entryPath)) {
    activePath = entryPath;
    disabledPath = `${entryPath}.disabled`;
  } else if (skill.disabledPaths.includes(entryPath)) {
    disabledPath = entryPath;
    activePath = entryPath.endsWith('.disabled') ? entryPath.slice(0, -'.disabled'.length) : null;
  }
  if (
    !activePath ||
    !disabledPath ||
    !skill.activePaths.includes(activePath) ||
    !skill.disabledPaths.includes(disabledPath)
  ) {
    throw new SkillsError('not-found', 404, '没有找到这个入口冲突，请重新扫描。');
  }

  const backupPath = `${disabledPath}.conflict-${Date.now()}-${randomUUID().slice(0, 8)}`;
  if (keep === 'enabled') {
    await applyMoves([{ id: skill.id, from: disabledPath, to: backupPath }]);
  } else {
    await applyMoves([{ id: skill.id, from: disabledPath, to: backupPath }]);
    try {
      await applyMoves([{ id: skill.id, from: activePath, to: disabledPath }]);
    } catch (error) {
      try {
        await applyMoves([{ id: skill.id, from: backupPath, to: disabledPath }]);
      } catch {
      }
      throw error;
    }
  }
  const after = await scanSkills(home);
  return { ...after, backupPath };
};
