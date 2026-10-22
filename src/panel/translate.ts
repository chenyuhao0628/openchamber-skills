export type TranslationInput = {
  id: string;
  name: string;
  description: string;
};

export type TranslationResult = {
  id: string;
  nameZh: string;
  descriptionZh: string;
};

export const TRANSLATION_SYSTEM = [
  '你是技术文档翻译。把输入的技能名称和描述翻译成简体中文。',
  '保留技能 ID、命令、文件路径、代码、产品名和技术专有名词，不要翻译代码块。',
  '不要添加解释、标题或 Markdown。',
  '只输出 JSON：{"items":[{"id":"原样 ID","nameZh":"中文名称","descriptionZh":"中文描述"}]}',
].join('');

export const buildTranslationPrompt = (items: TranslationInput[]): string =>
  JSON.stringify(items.map((item) => ({ id: item.id, name: item.name, description: item.description })));

export const parseTranslationResponse = (text: string): TranslationResult[] => {
  let raw = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end <= start) return [];
  raw = raw.slice(start, end + 1);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return [];
  }
  const record = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
  const items = Array.isArray(parsed) ? parsed : Array.isArray(record?.items) ? record.items : [];
  const results: TranslationResult[] = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const value = item as Record<string, unknown>;
    if (typeof value.id !== 'string' || !value.id) continue;
    if (typeof value.nameZh !== 'string' || !value.nameZh.trim()) continue;
    if (typeof value.descriptionZh !== 'string') continue;
    results.push({
      id: value.id.slice(0, 128),
      nameZh: value.nameZh.trim().slice(0, 300),
      descriptionZh: value.descriptionZh.trim().slice(0, 8_000),
    });
  }
  return results;
};
