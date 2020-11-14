# Properties

Processor to handle parsing `properties` files as JS.

## Configuration

Add the plugin via the `plugins` object in your ESLint configuration and utilize the processor for `*.properties` files:

```js
// .eslintrc.js
module.exports = {
  ...
  plugins: [
    '@okta/okta',
  ],
  overrides: [
    {
      files: ['*.properties'],
      processor: '@okta/okta/properties',
      rules: {
        // List of additional rules to be run on properties files
      }
    },
  ],
};
```

Consuming this processor will inherit all rules declared in an [ESLint configuration file](https://eslint.org/docs/user-guide/configuring). To apply rules specifically to `*.properties` files, utilize the `overrides` entry to separate these rules:

```js
module.exports = {
  overrides: [
    {
      files: ['*.js'],
      rules: [
        // List of rules to be run on JS files
      ]
    },
    {
      plugins: [
        '@okta/okta',
      ],
      files: ['*.properties'],
      processor: '@okta/okta/properties',
      rules: {
        // List of rules to be run on properties files
      }
    },
  ]
}
```
