module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": "off", // 在打包阶段使用Terser对console和debugger进行统一清理，此处不再检测
    "no-debugger": "off",
    "@typescript-eslint/camelcase": "off", // 否则TerserPlugin会报错
    "@typescript-eslint/no-var-requires": "off" // 与JS兼容
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
