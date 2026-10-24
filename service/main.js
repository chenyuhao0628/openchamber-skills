// src/service/main.ts
import http from "node:http";
import os from "node:os";

// src/core/skills.ts
import fs from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
var ROOT_DIR = [".config", "opencode", "skills"];
var MAX_DEPTH = 6;
var MAX_SKILL_BYTES = 2e6;
var IGNORED_DIRS = /* @__PURE__ */ new Set(["node_modules", ".git", ".svn", ".hg"]);
var CONFLICT_ORDER = {
  both: 0,
  "read-error": 1,
  duplicate: 2,
  invalid: 3,
  empty: 4,
  manual: 5,
  "no-description": 6
};
var SkillsError = class extends Error {
  code;
  status;
  conflicts;
  constructor(code, status, message, conflicts) {
    super(message);
    this.name = "SkillsError";
    this.code = code;
    this.status = status;
    this.conflicts = conflicts;
  }
};
var describeFs = (error) => {
  const code = error.code;
  if (code === "EACCES" || code === "EPERM") return "\u6743\u9650\u4E0D\u8DB3";
  if (code === "ENOENT") return "\u8DEF\u5F84\u4E0D\u5B58\u5728";
  if (code === "ENOTDIR") return "\u4E0D\u662F\u76EE\u5F55";
  if (code === "EISDIR") return "\u662F\u76EE\u5F55";
  return error instanceof Error ? error.message : "\u6587\u4EF6\u7CFB\u7EDF\u9519\u8BEF";
};
var parseBoolean = (value) => {
  const text = value.trim().toLowerCase();
  if (["true", "yes", "on", "1"].includes(text)) return true;
  if (["false", "no", "off", "0"].includes(text)) return false;
  return void 0;
};
var unquote = (value) => {
  const text = value.trim();
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
  }
  if (text.length >= 2 && text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1).replace(/''/g, "'");
  }
  return text;
};
var fallbackFrontmatter = (id) => ({
  name: id,
  description: "",
  autoInvokeOff: false,
  hasFrontmatter: false,
  valid: true,
  empty: false
});
var parseFrontmatter = (text, id) => {
  const withoutBom = text.replace(/^\uFEFF/, "");
  if (withoutBom.trim().length === 0) {
    return { ...fallbackFrontmatter(id), empty: true };
  }
  const lines = withoutBom.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return fallbackFrontmatter(id);
  let end = -1;
  for (let index = 1; index < lines.length; index += 1) {
    const value = lines[index]?.trim();
    if (value === "---" || value === "...") {
      end = index;
      break;
    }
  }
  if (end < 0) {
    return { ...fallbackFrontmatter(id), hasFrontmatter: true, valid: false };
  }
  const block = lines.slice(1, end);
  let name = "";
  let description = "";
  let disable;
  let metaAutoInvoke;
  for (let index = 0; index < block.length; index += 1) {
    const line = block[index] ?? "";
    if (line.trim().length === 0 || /^\s/.test(line)) continue;
    const match = /^([^:]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = (match[1] ?? "").trim().replace(/^["']|["']$/g, "");
    const raw = (match[2] ?? "").trim();
    if (key === "name" || key === "description") {
      let value = raw;
      if (/^[>|][+-]?$/.test(value)) {
        const folded = value.startsWith(">");
        const collected = [];
        let cursor = index + 1;
        while (cursor < block.length) {
          const next = block[cursor] ?? "";
          if (next.trim().length > 0 && !/^\s/.test(next)) break;
          collected.push(next);
          cursor += 1;
        }
        const indents = collected.filter((item) => item.trim().length > 0).map((item) => item.match(/^\s*/)?.[0].length ?? 0);
        const base = indents.length > 0 ? Math.min(...indents) : 0;
        value = collected.map((item) => item.slice(Math.min(base, item.length))).join(folded ? " " : "\n").trim();
        index = cursor - 1;
      } else {
        value = unquote(value);
      }
      if (key === "name") name = value.trim();
      else description = value.trim();
      continue;
    }
    if (key === "disable-model-invocation") {
      disable = parseBoolean(unquote(raw));
      continue;
    }
    if (key === "metadata") {
      if (raw.startsWith("{")) {
        const inline = /["']?opencode\/autoinvoke["']?\s*:\s*(true|false|yes|no|on|off|1|0)/i.exec(raw);
        if (inline) metaAutoInvoke = parseBoolean(inline[1] ?? "");
        continue;
      }
      let cursor = index + 1;
      while (cursor < block.length) {
        const next = block[cursor] ?? "";
        if (next.trim().length > 0 && !/^\s/.test(next)) break;
        const nested = /^\s+["']?opencode\/autoinvoke["']?\s*:\s*(.*)$/.exec(next);
        if (nested) metaAutoInvoke = parseBoolean(unquote(nested[1] ?? ""));
        cursor += 1;
      }
      index = cursor - 1;
    }
  }
  return {
    name: name.trim() || id,
    description: description.trim(),
    autoInvokeOff: metaAutoInvoke !== void 0 ? !metaAutoInvoke : disable === true,
    hasFrontmatter: true,
    valid: true,
    empty: false
  };
};
var rootView = async (home) => {
  const root = path.join(home, ...ROOT_DIR);
  try {
    const info = await fs.stat(root);
    return { path: root, exists: info.isDirectory(), error: info.isDirectory() ? null : "\u4E0D\u662F\u76EE\u5F55" };
  } catch (error) {
    const code = error.code;
    return { path: root, exists: false, error: code === "ENOENT" ? null : describeFs(error) };
  }
};
var classify = async (directory, entry) => {
  if (entry.isFile()) return "file";
  if (entry.isDirectory()) return "dir";
  if (!entry.isSymbolicLink()) return "other";
  try {
    const info = await fs.stat(path.join(directory, entry.name));
    return info.isFile() ? "file" : info.isDirectory() ? "dir" : "other";
  } catch {
    return "other";
  }
};
var readFrontmatterFor = async (id, activePath, disabledPath) => {
  let activeError = null;
  if (activePath) {
    try {
      const info = await fs.stat(activePath);
      if (info.size > MAX_SKILL_BYTES) activeError = "\u5165\u53E3\u6587\u4EF6\u8D85\u8FC7 2 MB";
      else {
        const text = await fs.readFile(activePath, "utf8");
        return { frontmatter: parseFrontmatter(text, id), error: null, hash: createHash("sha256").update(text).digest("hex") };
      }
    } catch (error) {
      activeError = describeFs(error);
    }
  }
  if (disabledPath) {
    try {
      const info = await fs.stat(disabledPath);
      if (info.size > MAX_SKILL_BYTES) {
        return { frontmatter: fallbackFrontmatter(id), error: activeError ?? "\u505C\u7528\u5165\u53E3\u8D85\u8FC7 2 MB", hash: "" };
      }
      const text = await fs.readFile(disabledPath, "utf8");
      return { frontmatter: parseFrontmatter(text, id), error: activeError, hash: createHash("sha256").update(text).digest("hex") };
    } catch (error) {
      return { frontmatter: fallbackFrontmatter(id), error: activeError ?? describeFs(error), hash: "" };
    }
  }
  return { frontmatter: fallbackFrontmatter(id), error: activeError ?? "\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\u6587\u4EF6", hash: "" };
};
var scanDirectory = async (root, directory, depth, entries, visited) => {
  let dirents;
  try {
    dirents = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (!root.error) root.error = `\u65E0\u6CD5\u8BFB\u53D6 ${directory}\uFF1A${describeFs(error)}`;
    return;
  }
  const visible = dirents.filter((entry) => !entry.name.startsWith(".") && !IGNORED_DIRS.has(entry.name));
  const classified = await Promise.all(visible.map(async (entry) => ({ entry, kind: await classify(directory, entry) })));
  const active = classified.find((item) => item.kind === "file" && item.entry.name === "SKILL.md");
  const disabled = classified.find((item) => item.kind === "file" && item.entry.name === "SKILL.md.disabled");
  if (active || disabled) {
    const id = path.basename(directory);
    const activePath = active ? path.join(directory, "SKILL.md") : null;
    const disabledPath = disabled ? path.join(directory, "SKILL.md.disabled") : null;
    const { frontmatter, error, hash } = await readFrontmatterFor(id, activePath, disabledPath);
    entries.push({ id, activePath, disabledPath, frontmatter, error, hash });
    if (active) return;
  }
  if (depth === 0) {
    const flat = classified.filter(
      (item) => item.kind === "file" && item.entry.name !== "SKILL.md.disabled" && (item.entry.name.endsWith(".md") || item.entry.name.endsWith(".md.disabled"))
    );
    const ids = /* @__PURE__ */ new Set();
    for (const item of flat) {
      ids.add(item.entry.name.endsWith(".md.disabled") ? item.entry.name.slice(0, -".md.disabled".length) : item.entry.name.slice(0, -".md".length));
    }
    for (const id of ids) {
      const activeItem = flat.find((item) => item.entry.name === `${id}.md`);
      const disabledItem = flat.find((item) => item.entry.name === `${id}.md.disabled`);
      const activePath = activeItem ? path.join(directory, activeItem.entry.name) : null;
      const disabledPath = disabledItem ? path.join(directory, disabledItem.entry.name) : null;
      if (!activePath && !disabledPath) continue;
      const { frontmatter, error, hash } = await readFrontmatterFor(id, activePath, disabledPath);
      entries.push({ id, activePath, disabledPath, frontmatter, error, hash });
    }
  }
  if (depth >= MAX_DEPTH) return;
  for (const item of classified) {
    if (item.kind !== "dir") continue;
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
var addConflict = (conflicts, seen, conflict) => {
  const key = [conflict.kind, conflict.skillId, conflict.activePath ?? "", conflict.disabledPath ?? "", conflict.message].join("|");
  if (seen.has(key)) return;
  seen.add(key);
  conflicts.push(conflict);
};
var estimateTokens = (name, id, description) => Math.max(1, Math.ceil((name.length + id.length + description.length) / 4) + 8);
var buildResponse = (root, entries) => {
  const groups = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const group = groups.get(entry.id);
    if (group) group.push(entry);
    else groups.set(entry.id, [entry]);
  }
  const skills = [];
  for (const [id, group] of groups) {
    group.sort((left, right) => (left.activePath ?? left.disabledPath ?? "").localeCompare(right.activePath ?? right.disabledPath ?? ""));
    const active = group.filter((entry) => entry.activePath);
    const disabled = group.filter((entry) => entry.disabledPath);
    const loadable = active.filter((entry) => !entry.error && entry.frontmatter.valid && !entry.frontmatter.empty);
    const winner = loadable.at(-1) ?? active.at(-1) ?? group[0] ?? null;
    const both = group.some((entry) => entry.activePath && entry.disabledPath);
    const state = both ? "conflict" : active.length > 0 && disabled.length > 0 ? "mixed" : active.length > 0 ? "enabled" : "disabled";
    const conflicts2 = [];
    const seen = /* @__PURE__ */ new Set();
    for (const entry of group) {
      if (entry.activePath && entry.disabledPath) {
        addConflict(conflicts2, seen, {
          kind: "both",
          skillId: id,
          message: "\u540C\u4E00\u76EE\u5F55\u540C\u65F6\u5B58\u5728\u542F\u7528\u548C\u505C\u7528\u5165\u53E3\uFF0C\u9700\u8981\u5148\u9009\u62E9\u4FDD\u7559\u54EA\u4E00\u4E2A\u3002",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: true
        });
      }
      if (entry.error) {
        addConflict(conflicts2, seen, {
          kind: "read-error",
          skillId: id,
          message: `\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A${entry.error}`,
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
      if (!entry.frontmatter.valid) {
        addConflict(conflicts2, seen, {
          kind: "invalid",
          skillId: id,
          message: "frontmatter \u672A\u95ED\u5408\uFF0COpenCode \u53EF\u80FD\u8DF3\u8FC7\u6B64\u6280\u80FD\uFF1B\u5165\u53E3\u5F00\u5173\u4ECD\u53EF\u7528\u3002",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
      if (entry.frontmatter.empty) {
        addConflict(conflicts2, seen, {
          kind: "empty",
          skillId: id,
          message: "\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A\uFF0COpenCode \u4E0D\u4F1A\u52A0\u8F7D\u5B83\u3002",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
    }
    if (group.length > 1) {
      const winnerLabel = winner ? winner.activePath ?? winner.disabledPath ?? "\u672A\u77E5\u5165\u53E3" : "\u65E0\uFF08\u5165\u53E3\u4E0D\u53EF\u52A0\u8F7D\uFF09";
      addConflict(conflicts2, seen, {
        kind: "duplicate",
        skillId: id,
        message: `\u540C ID \u6709 ${group.length} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A${winnerLabel}\u3002`,
        activePath: winner?.activePath ?? null,
        disabledPath: winner?.disabledPath ?? null,
        blocking: false
      });
    }
    if (winner?.activePath && winner.frontmatter.autoInvokeOff) {
      addConflict(conflicts2, seen, {
        kind: "manual",
        skillId: id,
        message: "\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6807\u8BB0\u4E3A\u4EC5\u624B\u52A8\u8C03\u7528\uFF1B\u6A21\u578B\u770B\u4E0D\u5230\u5B83\u3002",
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false
      });
    }
    if (winner?.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && !winner.frontmatter.description.trim()) {
      addConflict(conflicts2, seen, {
        kind: "no-description",
        skillId: id,
        message: "\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6CA1\u6709 description\uFF1B\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002",
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false
      });
    }
    const advertised = Boolean(
      winner && winner.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && winner.frontmatter.description.trim().length > 0 && !winner.frontmatter.autoInvokeOff
    );
    const name = winner?.frontmatter.name || id;
    const description = winner?.frontmatter.description ?? "";
    skills.push({
      id,
      name,
      description,
      state,
      advertised,
      autoInvokeOff: winner?.frontmatter.autoInvokeOff ?? false,
      activePaths: active.flatMap((entry) => entry.activePath ? [entry.activePath] : []),
      disabledPaths: disabled.flatMap((entry) => entry.disabledPath ? [entry.disabledPath] : []),
      conflicts: conflicts2,
      warnings: Array.from(new Set(conflicts2.filter((conflict) => !conflict.blocking).map((conflict) => conflict.message))),
      estimatedTokens: advertised ? estimateTokens(name, id, description) : 0,
      contentHash: winner?.hash ?? group[0]?.hash ?? ""
    });
  }
  skills.sort((left, right) => left.id.localeCompare(right.id));
  const conflicts = skills.flatMap((skill) => skill.conflicts);
  conflicts.sort((left, right) => {
    if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
    const kind = CONFLICT_ORDER[left.kind] - CONFLICT_ORDER[right.kind];
    return kind !== 0 ? kind : left.skillId.localeCompare(right.skillId);
  });
  const summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === "disabled").length,
    blockingConflicts: conflicts.filter((conflict) => conflict.blocking).length,
    warnings: conflicts.filter((conflict) => !conflict.blocking).length,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0)
  };
  return { skills, conflicts, summary, root, scannedAt: Date.now() };
};
var scanSkills = async (home) => {
  const root = await rootView(home);
  const entries = [];
  if (root.exists) {
    const visited = /* @__PURE__ */ new Set();
    try {
      visited.add(await fs.realpath(root.path));
    } catch {
      visited.add(root.path);
    }
    await scanDirectory(root, root.path, 0, entries, visited);
  }
  return buildResponse(root, entries);
};
var exists = async (file) => {
  try {
    await fs.lstat(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
};
var applyMoves = async (moves) => {
  if (moves.length === 0) return;
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError("conflict", 409, `\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A${move.to}`);
      }
      if (!await exists(move.from)) {
        throw new SkillsError("conflict", 409, `\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A${move.from}`);
      }
    }
  } catch (error) {
    if (error instanceof SkillsError) throw error;
    throw new SkillsError("io", 500, `\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A${describeFs(error)}`);
  }
  const done = [];
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError("conflict", 409, `\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A${move.to}`);
      }
      await fs.rename(move.from, move.to);
      done.push(move);
      if (await exists(move.from) || !await exists(move.to)) {
        throw new SkillsError("io", 500, `\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A${move.to}`);
      }
    }
  } catch (error) {
    for (const move of done.reverse()) {
      try {
        if (await exists(move.to) && !await exists(move.from)) await fs.rename(move.to, move.from);
      } catch {
      }
    }
    if (error instanceof SkillsError) throw error;
    throw new SkillsError("io", 500, `\u6539\u540D\u5931\u8D25\uFF1A${describeFs(error)}`);
  }
};
var assertRootReadable = (scan) => {
  if (scan.root.error) {
    throw new SkillsError("read-error", 409, `\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A${scan.root.error}`);
  }
};
var setSkillEnabled = async (home, id, enabled) => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const skill = before.skills.find((item) => item.id === id);
  if (!skill) throw new SkillsError("not-found", 404, `\u6CA1\u6709\u627E\u5230\u6280\u80FD ${id}`);
  if (skill.conflicts.some((conflict) => conflict.kind === "both")) {
    throw new SkillsError("conflict", 409, `\u6280\u80FD ${id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002`, skill.conflicts);
  }
  const moves = [];
  if (!enabled) {
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  } else {
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith(".disabled")) {
        throw new SkillsError("io", 500, `\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A${disabledPath}`);
      }
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  return scanSkills(home);
};
var batchSetEnabled = async (home, enable, disable) => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const enableIds = Array.from(new Set(enable));
  const disableIds = Array.from(new Set(disable));
  if (enableIds.some((id) => disableIds.includes(id))) {
    throw new SkillsError("invalid-request", 400, "\u540C\u4E00\u4E2A\u6280\u80FD\u4E0D\u80FD\u540C\u65F6\u542F\u7528\u548C\u5173\u95ED\u3002");
  }
  if (enableIds.length + disableIds.length > 200) {
    throw new SkillsError("invalid-request", 400, "\u4E00\u6B21\u5904\u7406\u7684\u6280\u80FD\u8FC7\u591A\u3002");
  }
  const byId = new Map(before.skills.map((skill) => [skill.id, skill]));
  for (const id of [...enableIds, ...disableIds]) {
    const skill = byId.get(id);
    if (!skill) throw new SkillsError("not-found", 404, `\u6CA1\u6709\u627E\u5230\u6280\u80FD ${id}`);
    if (skill.conflicts.some((conflict) => conflict.kind === "both")) {
      throw new SkillsError("conflict", 409, `\u6280\u80FD ${id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002`, skill.conflicts);
    }
  }
  const moves = [];
  for (const id of enableIds) {
    const skill = byId.get(id);
    if (!skill) continue;
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith(".disabled")) continue;
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
    }
  }
  for (const id of disableIds) {
    const skill = byId.get(id);
    if (!skill) continue;
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(home);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};
var bulkSetEnabled = async (home, enabled) => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const blocking = before.conflicts.filter((conflict) => conflict.kind === "both");
  if (blocking.length > 0) {
    throw new SkillsError("conflict", 409, "\u8FD8\u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\uFF0C\u4E0D\u80FD\u6279\u91CF\u64CD\u4F5C\u3002", blocking);
  }
  const moves = [];
  for (const skill of before.skills) {
    if (!enabled) {
      for (const activePath of skill.activePaths) {
        moves.push({ id: skill.id, from: activePath, to: `${activePath}.disabled` });
      }
    } else {
      for (const disabledPath of skill.disabledPaths) {
        if (!disabledPath.endsWith(".disabled")) continue;
        moves.push({ id: skill.id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
      }
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(home);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};
var resolveBoth = async (home, entryPath, keep) => {
  const before = await scanSkills(home);
  assertRootReadable(before);
  const skill = before.skills.find(
    (item) => item.activePaths.includes(entryPath) || item.disabledPaths.includes(entryPath)
  );
  if (!skill) throw new SkillsError("not-found", 404, "\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u5165\u53E3\u51B2\u7A81\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\u3002");
  let activePath = null;
  let disabledPath = null;
  if (skill.activePaths.includes(entryPath)) {
    activePath = entryPath;
    disabledPath = `${entryPath}.disabled`;
  } else if (skill.disabledPaths.includes(entryPath)) {
    disabledPath = entryPath;
    activePath = entryPath.endsWith(".disabled") ? entryPath.slice(0, -".disabled".length) : null;
  }
  if (!activePath || !disabledPath || !skill.activePaths.includes(activePath) || !skill.disabledPaths.includes(disabledPath)) {
    throw new SkillsError("not-found", 404, "\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u5165\u53E3\u51B2\u7A81\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\u3002");
  }
  const backupPath = `${disabledPath}.conflict-${Date.now()}-${randomUUID().slice(0, 8)}`;
  if (keep === "enabled") {
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

// src/core/translations.ts
import fs2 from "node:fs/promises";
import path2 from "node:path";
import { randomUUID as randomUUID2 } from "node:crypto";
var DATA_DIR = [".config", "openchamber", "skills-manager"];
var CACHE_FILE = "translations.json";
var MAX_ENTRIES = 300;
var MAX_NAME = 300;
var MAX_DESCRIPTION = 8e3;
var TranslationError = class extends Error {
  code;
  status;
  constructor(code, status, message) {
    super(message);
    this.name = "TranslationError";
    this.code = code;
    this.status = status;
  }
};
var empty = () => ({ version: 1, locale: "zh-CN", entries: {} });
var cacheFile = (home) => path2.join(home, ...DATA_DIR, CACHE_FILE);
var validateEntry = (value) => {
  if (!value || typeof value !== "object") return null;
  const record = value;
  if (typeof record.hash !== "string" || typeof record.nameZh !== "string" || typeof record.descriptionZh !== "string" || typeof record.updatedAt !== "number") {
    return null;
  }
  const hash = record.hash.slice(0, 128);
  const nameZh = record.nameZh.trim().slice(0, MAX_NAME);
  const descriptionZh = record.descriptionZh.trim().slice(0, MAX_DESCRIPTION);
  if (!hash || !nameZh) return null;
  return { hash, nameZh, descriptionZh, updatedAt: record.updatedAt };
};
var readTranslations = async (home) => {
  let raw;
  try {
    raw = await fs2.readFile(cacheFile(home), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return empty();
    throw new TranslationError("read-error", 500, "\u65E0\u6CD5\u8BFB\u53D6\u7FFB\u8BD1\u7F13\u5B58\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002");
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1 || parsed.locale !== "zh-CN" || !parsed.entries || typeof parsed.entries !== "object") {
      throw new Error("invalid cache");
    }
    const entries = {};
    for (const [id, value] of Object.entries(parsed.entries)) {
      if (!id || id.length > 128) continue;
      const entry = validateEntry(value);
      if (entry) entries[id] = entry;
    }
    return { version: 1, locale: "zh-CN", entries };
  } catch {
    throw new TranslationError("invalid-cache", 500, "\u7FFB\u8BD1\u7F13\u5B58\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\u3002");
  }
};
var writeTranslations = async (home, value) => {
  if (!value || typeof value !== "object") {
    throw new TranslationError("invalid-cache", 400, "\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002");
  }
  const record = value;
  if (record.version !== 1 || record.locale !== "zh-CN" || !record.entries || typeof record.entries !== "object" || Array.isArray(record.entries)) {
    throw new TranslationError("invalid-cache", 400, "\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002");
  }
  const rawEntries = Object.entries(record.entries);
  if (rawEntries.length > MAX_ENTRIES) {
    throw new TranslationError("invalid-cache", 400, "\u7FFB\u8BD1\u7F13\u5B58\u6761\u76EE\u8FC7\u591A\u3002");
  }
  const entries = {};
  for (const [id, item] of rawEntries) {
    if (!id || id.length > 128) continue;
    const entry = validateEntry(item);
    if (entry) entries[id] = entry;
  }
  const dir = path2.join(home, ...DATA_DIR);
  const file = cacheFile(home);
  const temporary = `${file}.${randomUUID2()}.tmp`;
  try {
    await fs2.mkdir(dir, { recursive: true, mode: 448 });
    await fs2.writeFile(temporary, `${JSON.stringify({ version: 1, locale: "zh-CN", entries }, null, 2)}
`, {
      encoding: "utf8",
      mode: 384
    });
    await fs2.rename(temporary, file);
    const check = await readTranslations(home);
    return check;
  } catch (error) {
    try {
      await fs2.unlink(temporary);
    } catch {
    }
    if (error instanceof TranslationError) throw error;
    throw new TranslationError("write-error", 500, "\u4FDD\u5B58\u7FFB\u8BD1\u7F13\u5B58\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002");
  }
};

// src/core/groups.ts
import fs3 from "node:fs/promises";
import path3 from "node:path";
import { randomUUID as randomUUID3 } from "node:crypto";

// src/shared/groups.ts
var GROUP_LIMIT = 50;
var GROUP_NAME_MAX = 40;
var GROUP_MEMBER_LIMIT = 200;
var GROUP_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
var RESERVED_GROUP_IDS = /* @__PURE__ */ new Set(["all", "new"]);
var GroupFileError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "GroupFileError";
  }
};
var DEFAULT_SKILL_GROUPS = [
  {
    id: "macos-ui",
    name: "macOS UI",
    skillIds: [
      "appkit-interop",
      "swiftui-patterns",
      "window-management",
      "liquid-glass",
      "view-refactor"
    ]
  },
  {
    id: "macos-build",
    name: "macOS \u6784\u5EFA",
    skillIds: [
      "build-run-debug",
      "test-triage",
      "swiftpm-macos",
      "signing-entitlements",
      "packaging-notarization",
      "telemetry"
    ]
  },
  {
    id: "reverse",
    name: "\u9006\u5411\u5DE5\u7A0B",
    skillIds: [
      "reverse-engineering-unpacking",
      "kuna-decompiler",
      "reverse-engineer-anything"
    ]
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    skillIds: ["cloudflare", "workers-best-practices", "wrangler"]
  },
  {
    id: "video",
    name: "\u89C6\u9891",
    skillIds: ["yichen-jianying-edit"]
  },
  {
    id: "browser",
    name: "\u6D4F\u89C8\u5668",
    skillIds: ["browser-skill"]
  }
];
var cloneDefaultGroups = () => DEFAULT_SKILL_GROUPS.map((group) => ({ ...group, skillIds: [...group.skillIds] }));
var normalizeGroupsFile = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new GroupFileError("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");
  }
  const record = value;
  if (record.version !== 1) throw new GroupFileError("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");
  if (!Array.isArray(record.groups)) throw new GroupFileError("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");
  if (record.groups.length > GROUP_LIMIT) throw new GroupFileError(`\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 ${GROUP_LIMIT} \u4E2A`);
  const groups = [];
  const groupIds = /* @__PURE__ */ new Set();
  const names = /* @__PURE__ */ new Set();
  for (const [index, item] of record.groups.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new GroupFileError(`\u7B2C ${index + 1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);
    }
    const group = item;
    if (typeof group.id !== "string" || !GROUP_ID_PATTERN.test(group.id) || RESERVED_GROUP_IDS.has(group.id)) {
      throw new GroupFileError(`\u7B2C ${index + 1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);
    }
    if (groupIds.has(group.id)) throw new GroupFileError(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${group.id}`);
    const name = typeof group.name === "string" ? group.name.trim() : "";
    if (!name || name.length > GROUP_NAME_MAX || /[\u0000-\u001f\u007f]/.test(name)) {
      throw new GroupFileError(`\u7B2C ${index + 1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-${GROUP_NAME_MAX} \u4E2A\u5B57\u7B26`);
    }
    const nameKey = name.toLowerCase();
    if (names.has(nameKey)) throw new GroupFileError(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${name}`);
    if (!Array.isArray(group.skillIds)) throw new GroupFileError(`\u5206\u7EC4\u300C${name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);
    if (group.skillIds.length > GROUP_MEMBER_LIMIT) {
      throw new GroupFileError(`\u5206\u7EC4\u300C${name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 ${GROUP_MEMBER_LIMIT} \u4E2A`);
    }
    const skillIds = [];
    const seen = /* @__PURE__ */ new Set();
    for (const skillId of group.skillIds) {
      if (typeof skillId !== "string" || !skillId || skillId.length > 128) {
        throw new GroupFileError(`\u5206\u7EC4\u300C${name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);
      }
      if (seen.has(skillId)) continue;
      seen.add(skillId);
      skillIds.push(skillId);
    }
    groupIds.add(group.id);
    names.add(nameKey);
    groups.push({ id: group.id, name, skillIds });
  }
  return { version: 1, groups };
};

// src/core/groups.ts
var DATA_DIR2 = [".config", "openchamber", "skills-manager"];
var GROUPS_FILE = "groups.json";
var GroupError = class extends Error {
  code;
  status;
  constructor(code, status, message) {
    super(message);
    this.name = "GroupError";
    this.code = code;
    this.status = status;
  }
};
var defaults = () => ({ version: 1, groups: cloneDefaultGroups() });
var groupsFile = (home) => path3.join(home, ...DATA_DIR2, GROUPS_FILE);
var readGroups = async (home) => {
  let raw;
  try {
    raw = await fs3.readFile(groupsFile(home), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return defaults();
    throw new GroupError("read-error", 500, "\u65E0\u6CD5\u8BFB\u53D6\u5206\u7EC4\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002");
  }
  try {
    return normalizeGroupsFile(JSON.parse(raw));
  } catch {
    throw new GroupError("invalid-groups", 500, "\u5206\u7EC4\u914D\u7F6E\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\uFF08~/.config/openchamber/skills-manager/groups.json\uFF09\u3002");
  }
};
var writeGroups = async (home, value) => {
  let normalized;
  try {
    normalized = normalizeGroupsFile(value);
  } catch (error) {
    if (error instanceof GroupFileError) {
      throw new GroupError("invalid-groups", 400, error.message);
    }
    throw new GroupError("invalid-groups", 400, "\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002");
  }
  const dir = path3.join(home, ...DATA_DIR2);
  const file = groupsFile(home);
  const temporary = `${file}.${randomUUID3()}.tmp`;
  try {
    await fs3.mkdir(dir, { recursive: true, mode: 448 });
    await fs3.writeFile(temporary, `${JSON.stringify(normalized, null, 2)}
`, {
      encoding: "utf8",
      mode: 384
    });
    await fs3.rename(temporary, file);
    return await readGroups(home);
  } catch (error) {
    try {
      await fs3.unlink(temporary);
    } catch {
    }
    if (error instanceof GroupError) throw error;
    throw new GroupError("write-error", 500, "\u4FDD\u5B58\u5206\u7EC4\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002");
  }
};

// src/service/main.ts
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var HOME = os.homedir();
var json = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
};
var readBody = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  let size = 0;
  let failed = false;
  req.on("data", (chunk) => {
    if (failed) return;
    size += chunk.length;
    if (size > 256 * 1024) {
      failed = true;
      chunks.length = 0;
      reject(new SkillsError("too-large", 413, "\u63D0\u4EA4\u5185\u5BB9\u8FC7\u5927"));
      return;
    }
    chunks.push(chunk);
  });
  req.on("error", () => reject(new SkillsError("invalid-request", 400, "\u8BF7\u6C42\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u8BD5")));
  req.on("end", () => {
    if (failed) return;
    try {
      const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("not an object");
      }
      resolve(parsed);
    } catch {
      reject(new SkillsError("invalid-request", 400, "\u8BF7\u6C42\u5185\u5BB9\u5FC5\u987B\u662F\u6709\u6548\u7684 JSON \u5BF9\u8C61"));
    }
  });
});
var queue = Promise.resolve();
var exclusive = (action) => {
  const next = queue.then(() => action(), () => action());
  queue = next.catch(() => void 0);
  return next;
};
var stringField = (body, key, max) => {
  const value = typeof body[key] === "string" ? body[key].trim() : "";
  if (!value) throw new SkillsError("invalid-request", 400, `\u7F3A\u5C11 ${key}`);
  if (value.length > max) throw new SkillsError("invalid-request", 400, `${key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236`);
  return value;
};
var booleanField = (body, key) => {
  const value = body[key];
  if (typeof value !== "boolean") throw new SkillsError("invalid-request", 400, `${key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);
  return value;
};
var stringArrayField = (body, key) => {
  const value = body[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length === 0 || item.length > 128)) {
    throw new SkillsError("invalid-request", 400, `${key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4`);
  }
  if (value.length > 200) throw new SkillsError("invalid-request", 400, `${key} \u6761\u76EE\u8FC7\u591A`);
  return value;
};
var handle = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    throw new SkillsError("unauthorized", 401, "unauthorized");
  }
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health" && req.method === "GET") {
    json(res, 200, { ok: true });
    return;
  }
  if (url.pathname === "/skills" && req.method === "GET") {
    json(res, 200, await exclusive(() => scanSkills(HOME)));
    return;
  }
  if (url.pathname === "/skills/toggle" && req.method === "POST") {
    const body = await readBody(req);
    const id = stringField(body, "id", 128);
    const enabled = booleanField(body, "enabled");
    json(res, 200, await exclusive(() => setSkillEnabled(HOME, id, enabled)));
    return;
  }
  if (url.pathname === "/skills/bulk" && req.method === "POST") {
    const body = await readBody(req);
    const enabled = booleanField(body, "enabled");
    json(res, 200, await exclusive(() => bulkSetEnabled(HOME, enabled)));
    return;
  }
  if (url.pathname === "/skills/batch" && req.method === "POST") {
    const body = await readBody(req);
    const enable = stringArrayField(body, "enable");
    const disable = stringArrayField(body, "disable");
    json(res, 200, await exclusive(() => batchSetEnabled(HOME, enable, disable)));
    return;
  }
  if (url.pathname === "/groups" && req.method === "GET") {
    json(res, 200, await exclusive(() => readGroups(HOME)));
    return;
  }
  if (url.pathname === "/groups" && req.method === "POST") {
    const body = await readBody(req);
    json(res, 200, await exclusive(() => writeGroups(HOME, body)));
    return;
  }
  if (url.pathname === "/translations" && req.method === "GET") {
    json(res, 200, await exclusive(() => readTranslations(HOME)));
    return;
  }
  if (url.pathname === "/translations" && req.method === "POST") {
    const body = await readBody(req);
    json(res, 200, await exclusive(() => writeTranslations(HOME, body)));
    return;
  }
  if (url.pathname === "/skills/resolve" && req.method === "POST") {
    const body = await readBody(req);
    const entryPath = stringField(body, "path", 4096);
    const keep = body.keep === "enabled" || body.keep === "disabled" ? body.keep : null;
    if (!keep) throw new SkillsError("invalid-request", 400, "keep \u5FC5\u987B\u662F enabled \u6216 disabled");
    json(res, 200, await exclusive(() => resolveBoth(HOME, entryPath, keep)));
    return;
  }
  throw new SkillsError("not-found", 404, "not-found");
};
var server = http.createServer((req, res) => {
  void handle(req, res).catch((error) => {
    if (res.headersSent || res.destroyed) return;
    if (error instanceof SkillsError || error instanceof TranslationError || error instanceof GroupError) {
      json(res, error.status, {
        error: error.message,
        code: error.code,
        ...error instanceof SkillsError && error.conflicts ? { conflicts: error.conflicts } : {}
      });
      return;
    }
    console.error("skills service:", error instanceof Error ? error.message : error);
    json(res, 500, { error: "\u672C\u5730\u670D\u52A1\u5904\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5", code: "internal" });
  });
});
server.listen(port, "127.0.0.1");
