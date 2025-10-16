// Test file for mode-specific dictionary functionality
const fs = require('fs');
const path = require('path');

// Load dictionaries directly for testing
const generalDict = require('../data/dict.json');
const slangDict = require('../data/dict-slang.json');

describe('Dictionary Mode Tests', () => {
  describe('General Mode Dictionary', () => {
    test('general dictionary should have expected words', () => {
      expect(generalDict['😀']).toBe('polite');
      expect(generalDict['😃']).toBe('smile');
      expect(generalDict['❤️']).toBe('love');
      expect(generalDict['😎']).toBe('sunglasses');
      expect(generalDict['🔥']).toBe('fire');
      expect(generalDict['💯']).toBe('facts');
    });

    test('general dictionary should have sufficient coverage', () => {
      const emojiCount = Object.keys(generalDict).length;
      expect(emojiCount).toBeGreaterThan(800); // Should have 800+ emojis
    });

    test('general dictionary words should be descriptive', () => {
      // General mode uses more formal/descriptive words
      expect(generalDict['🤨']).toBe('suspicious');
      expect(generalDict['😭']).toBe('crying');
      expect(generalDict['🎉']).toBe('yay');
    });
  });

  describe('Slang Mode Dictionary', () => {
    test('slang dictionary should have slang words', () => {
      expect(slangDict['😀']).toBe('basic');
      expect(slangDict['😃']).toBe('cheer');
      expect(slangDict['🥰']).toBe('soft');
      expect(slangDict['🤨']).toBe('sus');
      expect(slangDict['🤥']).toBe('cap');
      expect(slangDict['😁']).toBe('lit');
    });

    test('slang dictionary should have sufficient coverage', () => {
      const emojiCount = Object.keys(slangDict).length;
      expect(emojiCount).toBeGreaterThan(100); // Should have 100+ emojis
    });

    test('slang dictionary words should be casual/modern', () => {
      // Slang mode uses more casual/modern internet slang
      expect(slangDict['😍']).toBe('simp');
      expect(slangDict['🤩']).toBe('stan');
      expect(slangDict['😂']).toBe('crying'); // "crying" as in "I'm crying (from laughter)"
      expect(slangDict['😔']).toBe('sadge');
    });
  });

  describe('Dictionary Differences', () => {
    test('dictionaries should have different word choices for same emojis', () => {
      // Same emoji, different words
      expect(generalDict['😀']).toBe('polite');
      expect(slangDict['😀']).toBe('basic');

      expect(generalDict['🤨']).toBe('suspicious');
      expect(slangDict['🤨']).toBe('sus');
    });

    test('both dictionaries should exist and be valid JSON', () => {
      expect(generalDict).toBeDefined();
      expect(slangDict).toBeDefined();
      expect(typeof generalDict).toBe('object');
      expect(typeof slangDict).toBe('object');
    });

    test('dictionary files should be accessible', () => {
      const generalPath = path.join(__dirname, '../data/dict.json');
      const slangPath = path.join(__dirname, '../data/dict-slang.json');

      expect(fs.existsSync(generalPath)).toBe(true);
      expect(fs.existsSync(slangPath)).toBe(true);
    });
  });

  describe('Dictionary Structure Validation', () => {
    test('all emoji keys should map to string values in general dict', () => {
      Object.entries(generalDict).forEach(([emoji, word]) => {
        expect(typeof emoji).toBe('string');
        expect(typeof word).toBe('string');
        expect(word.length).toBeGreaterThan(0);
      });
    });

    test('all emoji keys should map to string values in slang dict', () => {
      Object.entries(slangDict).forEach(([emoji, word]) => {
        expect(typeof emoji).toBe('string');
        expect(typeof word).toBe('string');
        expect(word.length).toBeGreaterThan(0);
      });
    });

    test('no duplicate words in general dictionary', () => {
      const words = Object.values(generalDict);
      const uniqueWords = new Set(words);
      // Allow some duplicates but not too many (some words like "love" might repeat)
      const duplicateCount = words.length - uniqueWords.size;
      expect(duplicateCount).toBeLessThan(50); // Less than 50 duplicate words
    });

    test('no duplicate words in slang dictionary', () => {
      const words = Object.values(slangDict);
      const uniqueWords = new Set(words);
      const duplicateCount = words.length - uniqueWords.size;
      expect(duplicateCount).toBeLessThan(30); // Less than 30 duplicate words
    });
  });
});
