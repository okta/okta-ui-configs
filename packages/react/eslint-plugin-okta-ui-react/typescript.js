/**
 * ESLint rules for enforcing best practices within TypeScript files.
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    comment: true,
    useJSXTextNode: true,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
