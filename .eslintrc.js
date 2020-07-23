module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'space-before-function-paren': ['error', {
      named: 'never',
      anonymous: 'never',
      asyncArrow: 'always'
    }],
    '@typescript-eslint/explicit-function-return-type': 'warn'
  }
}
