module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      env: {
        commonjs: true,
        node: true,
        es6: true,
        'jest/globals': true,
      },
      extends: ['eslint:recommended'],
      plugins: ['jest'],
      rules: {
        indent: ['error', 2],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
      },
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaVersion: 2018,
        'requireConfigFile': false
      },
    },
  ],
};
