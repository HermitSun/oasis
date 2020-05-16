module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    'echarts': 'readonly'
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
    'vue/html-self-closing': ['error', { // template中的自闭合标签
      'html': {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    // 关于这一点，我很确定我在做什么
    // 所以，请您不要检查v-html了
    'vue/no-v-html': 'off',
    // 以下内容交给prettier处理
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-indent': 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'func-call-spacing': 'off',
    'arrow-parens': 'off'
  }
};
