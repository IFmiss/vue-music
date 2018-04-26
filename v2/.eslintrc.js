// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development,
    'indent': 0,
    'no-tabs': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-promise-reject-errors': 0,
    'no-trailing-spaces': 0,
    'space-in-parens': 0,
    'no-mixed-spaces-and-tabs': 0
  }
}
