// Emoji dictionaries - will be loaded from data/ directory
let emojiDict = {};
let wordToEmojiDict = {};
let currentMode = 'general'; // Track current mode

// For Node.js environment
if (typeof require !== 'undefined' && typeof window === 'undefined') {
    emojiDict = require('../data/dict.json');
    // Create reverse mapping for word to emoji
    for (const emoji in emojiDict) {
        const word = emojiDict[emoji];
        wordToEmojiDict[word.toLowerCase()] = emoji;
    }
} else {
    // For browser - load dictionary based on mode
    loadDictionary('general');
}

// Function to load dictionary dynamically
function loadDictionary(mode) {
    const dictPath = mode === 'slang' ? 'data/dict-slang.json' : 'data/dict.json';

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/dict.json', false); // false makes it synchronous
        xhr.send(null);

        if (xhr.status === 200 || xhr.status === 0) { // status 0 for file:// protocol
            emojiDict = JSON.parse(xhr.responseText);
            // Create reverse mapping for word to emoji
            wordToEmojiDict = {};
            for (const emoji in emojiDict) {
                const word = emojiDict[emoji];
                wordToEmojiDict[word.toLowerCase()] = emoji;
            }
            currentMode = mode;
            console.log(`Dictionary loaded (${mode}):`, Object.keys(emojiDict).length, 'emojis');
            return true;
        } else {
            console.error('Failed to load dictionary. Status:', xhr.status);
            return false;
        }
    } catch (error) {
        console.error('Error loading dictionary:', error);
        return false;
    }
}

function translate(text, mode = 'toEmoji') {
    if (mode === 'toEmoji') {
        return text
            .split(/\s+/)
            .map(word => wordToEmojiDict[word.toLowerCase()] || word)
            .join(' ');
    } else if (mode === 'toWord') {
        return text
            .split(/\s+/)
            .map(token => emojiDict[token] || token)
            .join(' ');
    } else {
        throw new Error('Invalid mode. Use "toEmoji" or "toWord".');
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translate };
}