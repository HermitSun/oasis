module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  collectCoverage: true,
  collectCoverageFrom: ["**/{!(*.d),}.{ts,vue}", "!**/node_modules/**"]
};
