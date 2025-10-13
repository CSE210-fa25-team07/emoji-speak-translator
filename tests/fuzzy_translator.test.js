const { translate } = require('../backend/fuzzy_translator.js');

test('translates a single word', async () => {
  const result = await translate('polite', 'text2emoji');
  expect(result).toBe('😀');
});

test('translates a sentence', async () => {
  const result = await translate('smile and love', 'text2emoji');
  expect(result).toBe('😃 and 🥰');
});

test('no translation', async () => {
  const result = await translate('hello world', 'text2emoji');
  expect(result).toBe('hello world');
});

test('mixed case', async () => {
  const result = await translate('Polite and SMILE', 'text2emoji');
  expect(result).toBe('😀 and 😃');
});

test('translate back to words', async () => {
  const result = await translate('😀 🥰', 'emoji2text');
  expect(result).toBe('polite love');
});

test('fuzzy translation', async () => {
  const result = await translate('smille', 'text2emoji', { fuzzy: true, threshold: 0.7 });
  expect(result).toBe('😃');
});

