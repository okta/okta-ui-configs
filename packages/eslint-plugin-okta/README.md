# ESLINT-PLUGIN-OKTA

This package contains Okta's custom [ESlint](https://eslint.org/) rules.

**Table of Contents**

<!-- TOC depthFrom:2 -->

- [Configuration](#configuration)
- [Rules](#rules)
- [Processors](#processors)
- [Writing a new rule](#writing-a-new-rule)

<!-- /TOC -->

## Configuration

This plugin provides a [sharable configuration](https://eslint.org/docs/developer-guide/shareable-configs) that can be extended in any UI project.

To use this preset, add the following to your configuration file:

```js
module.exports = {
  extends: [
    'plugin:@okta/okta/recommended',
  ],
}
```

Extending an existing config with this sharable configuration will result in all `*.properties` and `*.js` files in your project to be checked. To apply rules specifically to `*.js` files, utilize the `overrides` entry to separate these rules:

```js
module.exports = {
  extends: [
    'plugin:@okta/okta/recommended',
  ],
  overrides: [
    {
      files: ['*.js'],
      rules: [
        'max-len': ['error', { code: 120 }],
        // List of additional rules to be run on JS files
      ]
    },
  ]
}
```

## Rules

| Rule | Description |
| -- | -- |
| [no-exclusive-language](docs/rules/no-exclusive-language.md) | Disallow exclusionary words |

## Processors

| Processors | Description |
| -- | -- |
| [properties](docs/processors/properties.md) | Parse properties files as JavaScript |

## Writing a new rule

Custom rules follow the standard ESLint guidelines - check out their [Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules) page for a good primer. When writing rules, you'll often need to find the right [Selector](https://eslint.org/docs/developer-guide/selectors) to match the nodes you want to test against - a useful tool for finding these is the [AST Explorer](https://astexplorer.net/).

Once you've got the basics down, create these 3 files. When coming up with a rule name, follow the [Rule Naming Conventions](https://eslint.org/docs/developer-guide/working-with-rules#rule-naming-conventions), and check out [ESLint's list of rules](https://eslint.org/docs/rules/) for examples of good rule names.

1. `lib/rules/${your-rule}.js`

    This is the rule definition. If it's possible, [add a fix function](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes) to the rule.

2. `lib/rules/${your-rule}.test.js`

    This is the test file. We use ESLint's [RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester), which makes this extra easy.

3. `docs/rules/${your-rule}.md`

    This is the documentation for your rule. Check out the existing docs, or brows through [ESLint's own rule docs](https://github.com/eslint/eslint/tree/master/docs/rules) for good examples of what you should write.

As you're writing your rule, you can run the tests with yarn:

```bash
yarn test
```
