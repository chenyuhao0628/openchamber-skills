export type SkillState = 'enabled' | 'disabled' | 'mixed' | 'conflict';

export type ConflictKind =
  | 'both'
  | 'duplicate'
  | 'invalid'
  | 'empty'
  | 'read-error'
  | 'manual'
  | 'no-description';

export type RootView = {
  path: string;
  exists: boolean;
  error: string | null;
};

export type ConflictView = {
  kind: ConflictKind;
  skillId: string;
  message: string;
  activePath: string | null;
  disabledPath: string | null;
  blocking: boolean;
};

export type SkillView = {
  id: string;
  name: string;
  description: string;
  state: SkillState;
  advertised: boolean;
  autoInvokeOff: boolean;
  activePaths: string[];
  disabledPaths: string[];
  conflicts: ConflictView[];
  warnings: string[];
  estimatedTokens: number;
  contentHash: string;
};

export type Summary = {
  total: number;
  advertised: number;
  disabled: number;
  blockingConflicts: number;
  warnings: number;
  estimatedTokens: number;
};

export type SkillsResponse = {
  skills: SkillView[];
  conflicts: ConflictView[];
  summary: Summary;
  root: RootView;
  scannedAt: number;
};

export type BulkResponse = SkillsResponse & {
  changed: string[];
};

export type TranslationEntry = {
  hash: string;
  nameZh: string;
  descriptionZh: string;
  updatedAt: number;
};

export type TranslationCache = {
  version: 1;
  locale: 'zh-CN';
  entries: Record<string, TranslationEntry>;
};

export type BatchResponse = SkillsResponse & {
  changed: string[];
};

export type ResolveResponse = SkillsResponse & {
  backupPath: string;
};

export type ErrorResponse = {
  error: string;
  code?: string;
  conflicts?: ConflictView[];
};
