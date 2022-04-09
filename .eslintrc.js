module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'multi-word-component-names': 'off',
  },
  plugins: [],
}
