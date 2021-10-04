module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
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
    '@typescript-eslint/explicit-function-return-type': 'warn',
    // Override eslint no-unused-vars behavior with correct typescript detection
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    // JSON_RPC identifiers should be in snake_case
    camelcase: 'off'
  }
}
