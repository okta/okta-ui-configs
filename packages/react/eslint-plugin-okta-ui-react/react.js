/**
 * ESLint rules for enforcing best practices with React code.
 */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'react-app',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
};
