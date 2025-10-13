// Emoji dictionary - inline for browser, or require for Node.js
let emojiDict = {};
let wordToEmojiDict = {};

// For Node.js environment
if (typeof require !== 'undefined' && typeof window === 'undefined') {
    emojiDict = require('./dict.json');
} else {
    // For browser - inline dictionary from dict.json
    emojiDict = {
        "😀": "polite", "😃": "smile", "😄": "enthusiasm", "😁": "grin",
        "😆": "laughing", "😂": "lmao", "🤣": "rofl", "😊": "ok",
        "🙂": "sure", "🙃": "sarcastic", "😉": "flirty", "😌": "smug",
        "😍": "obsessed", "🥰": "love", "😘": "kiss", "😅": "oops",
        "🤓": "nerd", "😎": "cool", "🤩": "wow", "🥳": "celebrate",
        "😤": "confidence", "😭": "crying", "😢": "tear", "😩": "tired",
        "🥺": "please", "😡": "mad", "🤬": "rage", "🤯": "mind blown",
        "😱": "shocked", "😴": "asleep", "🤔": "hmm", "🙄": "annoyed",
        "😇": "innocent", "💀": "dead'", "☠️": "skull", "🤡": "embarrassing",
        "🫠": "melting", "🫡": "respect", "🤝": "agreement", "👏": "emphasis",
        "🙏": "please", "💅": "unbothered", "🔥": "fire", "💯": "facts",
        "💪": "strong", "👀": "watching", "👋": "bye", "🤷": "indifferent",
        "🤦": "facepalm", "😐": "unamused", "😶": "speechless", "😬": "awkward",
        "🤪": "unhinged", "🥴": "chaotic", "🤨": "suspicious", "😔": "resigned",
        "😞": "disappointed", "🫤": "uncertain", "❤️": "love", "🩷": "affection",
        "💔": "heartbroken", "💖": "sparkly", "✨": "aesthetic", "🌟": "special",
        "🌈": "rainbow", "☀️": "sun", "🌙": "moon", "⭐": "star",
        "💫": "magical", "🌍": "earth", "🌸": "flower", "🌹": "romantic",
        "🌻": "sunflower", "🌺": "tropical", "🍀": "lucky", "🍕": "fun",
        "🍿": "popcorns", "☕": "tea", "🍵": "calm", "🍷": "chill",
        "🥂": "cheers", "🎉": "yay", "🎂": "birthday", "🎁": "gift",
        "🎶": "music", "🎤": "mic", "🎨": "creative", "📚": "studying",
        "💻": "online", "📱": "phone", "⚙️": "mechanism", "🧠": "big brain",
        "🤖": "robotic", "🪩": "party", "💃": "dancing", "🕺": "vibing",
        "👑": "royalty", "👻": "spooky", "👽": "weird", "🤠": "yee-haw",
        "🚀": "hyped", "🧍": "standing", "🧎": "defeat"
    };
}

// Create reverse mapping for word to emoji
for (const emoji in emojiDict) {
    const word = emojiDict[emoji];
    wordToEmojiDict[word.toLowerCase()] = emoji;
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