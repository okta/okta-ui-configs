# Disallow messages without comments for arguments and single-word messages

Comments are valuable for both developers and translators to properly represent and understand the intended use of a message. When single-value resources or arguments are included in a message, a comment must be provided to describe it's usage.

## Rule Details

`'@okta/okta/no-missing-i18n-comments': 2`

## Options

| Option               | Type             | Description                              |
|----------------------|------------------|------------------------------------------|
| `templateDelimiters` | Array of Strings | Beginning and ending argument delimiters |
|                      |                  | Defaults to `['{', '}']`                 |
| `checkSingleWords`   | Boolean          | Report errors for single-word values     |
|                      |                  | Defaults to `false`                      |

When configuring the rule, specify the enforcement **first**, followed by any overrides:

```js
rules: {
  '@okta/okta/no-missing-i18n-comments': [ 2, {
    templateDelimiters: ['<%', '%>'],
    checkSingleWords: true,
  }],
}
```

### `checkSingleWords`

Examples of **incorrect** code for this rule with the `checkSingleWords` option:

```properties
# Problem: "Settings" and "Preferences" can be synonymous in some contexts,
#          however the intent here is for two distinct navigation items.
#          Result: May get translated as the same value
navigation.preferences = Preferences
navigation.settings = Settings
```

Examples of **correct** code for this rule with the `checkSingleWords` option:

```properties
# Navigation option for users to change the appearance of an app
navigation.preferences = Preferences
# Navigation option for users to change app-specific options
navigation.settings = Settings
```

## Examples

Examples of **incorrect** code for this rule:

```properties
# Problem: Unclear what {0} is in reference to.
desktop_sso.test_mode.help = Use {0} to test your Desktop SSO web application.
```

Examples of **correct** code for this rule:

```properties
# {0} is a URL
desktop_sso.test_mode.help = Use {0} to test your Desktop SSO web application.
```
