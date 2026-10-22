import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTranslationPrompt, parseTranslationResponse } from '../src/panel/translate.ts';

test('translation prompt keeps IDs and technical fields', () => {
  const prompt = buildTranslationPrompt([{ id: 'kuna-decompiler', name: 'Kuna Decompiler', description: 'Use `kuna` on native binaries.' }]);
  assert.match(prompt, /kuna-decompiler/);
  assert.match(prompt, /Kuna Decompiler/);
});

test('translation response accepts fenced JSON and rejects malformed items', () => {
  const parsed = parseTranslationResponse('```json\n{"items":[{"id":"alpha","nameZh":"阿尔法","descriptionZh":"中文说明"},{"id":"bad","nameZh":"","descriptionZh":"x"}]}\n```');
  assert.deepEqual(parsed, [{ id: 'alpha', nameZh: '阿尔法', descriptionZh: '中文说明' }]);
  assert.deepEqual(parseTranslationResponse('not json'), []);
  assert.deepEqual(parseTranslationResponse('{"items":[]}'), []);
});
