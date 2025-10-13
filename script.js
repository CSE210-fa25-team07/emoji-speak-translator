function translate(text) {
  return text
    .replace(/\bhappy\b/gi, "😊")
    .replace(/\bsad\b/gi, "😢")
    .replace(/\blove\b/gi, "❤️");
}

module.exports = { translate };