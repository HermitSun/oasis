module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off', // 在打包阶段使用Terser对console和debugger进行统一清理，此处不再检测
    'no-debugger': 'off',
    // 以下是个人爱好
    'semi': ['error', 'always'], // 分号结尾
    'space-before-function-paren': ['error', 'never'], // 声明的括号前不要空格
    'vue/html-self-closing': ['error', { // template中的自闭合标签
      'html': {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    // 以下内容交给prettier处理
    'vue/max-attributes-per-line': 'off',
    'indent': 'off',
    'func-call-spacing': 'off',
    'arrow-parens': 'off'
  }
};
