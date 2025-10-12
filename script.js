function translate(text) {
  return text
    .replace(/\bhappy\b/gi, "😊")
    .replace(/\bsad\b/gi, "😢")
    .replace(/\blove\b/gi, "❤️");
}

if (typeof module !== "undefined") {
  module.exports = { translate };
}

