module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  setupFiles: ["jest-canvas-mock"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/{!(router|store),}/{!(*.d),}.{ts,vue}",
    "src/{!(router|store),}/**/{!(*.d),}.{ts,vue}",
    "!**/node_modules/**"
  ]
};
