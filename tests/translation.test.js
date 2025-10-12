const { translate } = require("../script.js");

test("translates happy", () => {
  expect(translate("I am happy")).toBe("I am 😊");
});

test("translates sad", () => {
  expect(translate("I feel sad")).toBe("I feel 😢");
});

test("translates love", () => {
  expect(translate("I love pizza")).toBe("I ❤️ pizza");
});

