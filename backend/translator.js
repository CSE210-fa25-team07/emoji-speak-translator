const emojiDict = require('../data/dict.json');

// Create a reverse dictionary for word to emoji mapping
const wordToEmojiDict = {};
for (const emoji in emojiDict) {
    const word = emojiDict[emoji];
    wordToEmojiDict[word] = emoji;
}

function translate(text, mode) {
    if (mode === 'toEmoji') {
        return translateToEmoji(text);
    } else if (mode === 'toWord') {
        return translateToWord(text);
    } else {
        throw new Error('Invalid mode. Use "toEmoji" or "toWord".');
    }
}

function translateToEmoji(text) {
    return text
        .split(/\s+/)
        .map(word => wordToEmojiDict[word.toLowerCase()] || word)
        .join(' ');
}

function translateToWord(emojiText) {
    return emojiText
        .split(/\s+/)
        .map(token => emojiDict[token] || token)
        .join(' ');
}

// Export the function for testing
module.exports = { translate };
