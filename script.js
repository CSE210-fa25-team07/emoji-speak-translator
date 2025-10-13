// Emoji dictionary - will be loaded from dict.json
let emojiDict = {};
let wordToEmojiDict = {};

// For Node.js environment
if (typeof require !== 'undefined' && typeof window === 'undefined') {
    emojiDict = require('./dict.json');
    // Create reverse mapping for word to emoji
    for (const emoji in emojiDict) {
        const word = emojiDict[emoji];
        wordToEmojiDict[word.toLowerCase()] = emoji;
    }
} else {
    // For browser - load dictionary from dict.json
    // Use synchronous XMLHttpRequest (works with file:// protocol)
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'dict.json', false); // false makes it synchronous
        xhr.send(null);

        if (xhr.status === 200 || xhr.status === 0) { // status 0 for file:// protocol
            emojiDict = JSON.parse(xhr.responseText);
            // Create reverse mapping for word to emoji
            for (const emoji in emojiDict) {
                const word = emojiDict[emoji];
                wordToEmojiDict[word.toLowerCase()] = emoji;
            }
            console.log('Dictionary loaded successfully:', Object.keys(emojiDict).length, 'emojis');
        } else {
            console.error('Failed to load dictionary. Status:', xhr.status);
        }
    } catch (error) {
        console.error('Error loading dictionary:', error);
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