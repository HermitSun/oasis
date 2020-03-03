module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/{!(router|store),}/{!(*.d),}.{ts,vue}",
    "!**/node_modules/**"
  ]
};
