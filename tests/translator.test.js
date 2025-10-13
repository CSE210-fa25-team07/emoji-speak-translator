const { translate } = require('../scripts/script.js');

test('translates a single word', () => {
  expect(translate('polite', 'toEmoji')).toBe('😀');
});

test('translates a sentence', () => {
  expect(translate('smile and love', 'toEmoji')).toBe('😃 and ❤️');
});

test('no translation', () => {
  expect(translate('hello world', 'toEmoji')).toBe('hello world');
});

test('handles mixed case', () => {
  expect(translate('Polite and SMILE', 'toEmoji')).toBe('😀 and 😃');
});

test('translates back to words', () => {
  expect(translate('😀 ❤️', 'toWord')).toBe('polite love');
});

test('throws error for invalid mode', () => {
  expect(() => translate('hello', 'invalidMode')).toThrow(/Invalid mode/);
});

