# ESLint Plugin Okta UI React

This package contains Okta's custom [ESLint rules](https://eslint.org/) for React based projects.

**Table of Contents**

<!-- TOC depthFrom:2 -->

- [Configuration](#configuration)
- [Rules](#rules)
  - [Internationalization (i18n)](#internationalization-i18n)

<!-- /TOC -->

## Configuration

This plugin provides a [sharable configuration](https://eslint.org/docs/developer-guide/shareable-configs) that can be extended in any React project.

To use this preset, add the following to your configuration file:

```js
module.exports = {
  extends: [
    'plugin:@okta/okta-ui-react/recommended',
  ],
}
```

## Rules

By default, this plugin extends upon the following configurations:

- [Recommended ESLint](https://eslint.org/docs/rules/)
- [Recommended TSLint](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
- [Recommended React](https://github.com/yannickcr/eslint-plugin-react)
- Import
  - [Errors](https://github.com/import-js/eslint-plugin-import/blob/main/config/errors.js)
  - [Warnings](https://github.com/import-js/eslint-plugin-import/blob/main/config/warnings.js)
- Plus more!

### Internationalization (i18n)

Nested within the `recommended` configuration are rules specific to disallowing unlocalized text. The `i18next/no-literal-string` rule is enforced for all packages to ensure **no literal strings** are used.

:warning: **Important** :warning:
Some component attributes report as false-positives. If this happens, either add the attribute to our [`ignoreAttribute` list](./i18n.js), or [disable the rule inline](https://eslint.org/docs/user-guide/configuring/rules#disabling-rules).
