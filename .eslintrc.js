// // https://eslint.org/docs/user-guide/configuring

// module.exports = {
//     root: true,
//     parserOptions: {
//         parser: 'babel-eslint'
//     },
//     env: {
//         browser: true,
//     },
//     extends: [
//         // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
//         // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
//         'plugin:vue/essential',
//         // https://github.com/standard/standard/blob/master/docs/RULES-en.md
//         'standard'
//     ],
//     // required to lint *.vue files
//     plugins: [
//         'vue'
//     ],
//     // add your custom rules here
//     rules: {
//         'indent': [2, 4, { "SwitchCase": 1 }],
//         // allow async-await
//         'generator-star-spacing': 'off',
//         // allow debugger during development
//         'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
//     }
// }

module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'error',
    'space-before-function-paren': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-bitwise': 'off',
    'prefer-rest-params': 'off',
    'no-trailing-spaces': 'off',
    'comma-dangle': 'off',
    'quote-props': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'prefer-spread': 'warn',
    'semi': 'off',
    'indent': 'warn',
    'no-tabs': 'warn',
    'no-unused-vars': 'warn',
    'quotes': 'off',
    'no-void': 'off',
    'no-nested-ternary': 'off',
    'import/no-unresolved': 'off',
    'no-return-assign': 'warn',
    'linebreak-style': 'off',
    'prefer-destructuring': 'off',
    'no-restricted-syntax': 'warn'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

