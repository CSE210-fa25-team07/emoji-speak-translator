let _cache = null; // { emojiToWord, wordToEmoji }

async function translate(text, mode = 'text2emoji', opts = {}) {
  const { fuzzy = false, threshold = 0.86 } = opts;
  const dict = await loadDict();
  if (!text || !text.trim()) return '';

  return mode === 'emoji2text'
    ? emojiToText(text, dict.emojiToWord)
    : textToEmoji(text, dict.wordToEmoji, { fuzzy, threshold });
}

// --- dict loading (emoji -> word in your repo root) ---
async function loadDict() {
  if (_cache) return _cache;
  const fs = require('fs').promises;
  const path = require('path');
  const dictPath = path.join(__dirname, '../dict.json');
  const data = await fs.readFile(dictPath, 'utf8');
  const emojiToWord = JSON.parse(data);      // e.g., { "😀":"polite", ... }
  // Invert to word -> emoji. If multiple words map to same emoji, keep shortest word.
  const wordToEmoji = Object.entries(emojiToWord).reduce((acc, [emo, word]) => {
    const key = (word || '').toLowerCase().trim();
    if (!key) return acc;
    // if collision, prefer shortest key
    if (!acc[key] || key.length < acc[key].length) acc[key] = emo;
    return acc;
  }, {});
  _cache = { emojiToWord, wordToEmoji };
  return _cache;
}

// --- text -> emoji ---
function textToEmoji(text, wordToEmoji, { fuzzy, threshold }) {
  // 1) exact replace by words/phrases (longest keys first)
  let out = text;
  const keys = Object.keys(wordToEmoji).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const emo = wordToEmoji[key];
    const escaped = escapeReg(key);
    // word boundaries so "cooldown" doesn't match "cool"
    const pattern = new RegExp(`(?<![\\w])${escaped}(?![\\w])`, 'gi');
    out = out.replace(pattern, emo);
  }
  if (!fuzzy) return out;

  // 2) fuzzy pass for leftover plain words (typos like "smillle" -> 😃)
  const tokens = splitWithDelims(out);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!/^[A-Za-z][A-Za-z'-]*$/.test(t)) continue;   // only words
    if (containsEmoji(t)) continue;                    // already an emoji
    const best = bestFuzzy(t.toLowerCase(), wordToEmoji, threshold);
    if (best) tokens[i] = wordToEmoji[best.key];       // replace with emoji
  }
  return tokens.join('');
}

// --- emoji -> text ---
function emojiToText(text, emojiToWord) {
  // replace longer emoji sequences first (handles multi-codepoint)
  const emos = Object.keys(emojiToWord).sort((a, b) => b.length - a.length);
  let out = text;
  for (const emo of emos) {
    const word = emojiToWord[emo];
    const pattern = new RegExp(escapeReg(emo), 'g');
    out = out.replace(pattern, word);
  }
  return out;
}

// --- helpers ---
function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function splitWithDelims(s) {
  // keep punctuation/spaces so rejoin is lossless
  const re = /[A-Za-z][A-Za-z'-]*|[^A-Za-z]+/g;
  return s.match(re) || [s];
}

function containsEmoji(s) {
  return /[\u231A-\uD83E\uDDFF]/.test(s);
}

// fuzzy: pick dict key with highest normalized Levenshtein similarity
function bestFuzzy(token, wordToEmoji, threshold) {
  let best = null;
  const maxLenDelta = 2; // small prune for speed
  for (const key of Object.keys(wordToEmoji)) {
    if (Math.abs(key.length - token.length) > maxLenDelta) continue;
    const sim = similarity(token, key);
    if (sim >= threshold && (!best || sim > best.sim)) best = { key, sim };
  }
  return best;
}

function similarity(a, b) {
  const d = levenshtein(a, b);
  const m = Math.max(a.length, b.length) || 1;
  return 1 - d / m;
}

function levenshtein(a, b) {
  const n = a.length, m = b.length;
  if (!n) return m;
  if (!m) return n;
  const dp = Array(m + 1);
  for (let j = 0; j <= m; j++) dp[j] = j;
  for (let i = 1; i <= n; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= m; j++) {
      const tmp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[m];
}

module.exports = { translate };
