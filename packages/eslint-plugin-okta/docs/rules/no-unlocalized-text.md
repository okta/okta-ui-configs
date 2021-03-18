# Disallow using unlocalized text in components

For packages that utilize the user's locale, no unlocalized text is allowed to be hardcoded into component attributes. Developers are required to utilize the `loc` utility method to ensure values are localized correctly.

## Rule Details

`'@okta/okta/no-unlocalized-text': 2`

## Examples

Examples of **incorrect** code for this rule:

```js
Okta.createButton({
  title: 'Primary Button',
  className: 'button-primary',
  click: notify('success', 'Primary button clicked'),
  visible: true,
});

Okta.createCallout({
  size: 'compact',
  type: 'info',
  title: 'A compact/info callout with a title',
});
```

```js
Okta.Form.extend({
  layout: 'o-form-theme',
  title: 'A form title',

  inputs: [
    {
      name: 'a-name',
      type: 'text',
      label: 'Using raw explain text',
      explain: 'Raw explain text',
    },
});
```

Examples of **correct** code for this rule:

```js
import { loc } from '@okta/core.common';

Okta.createButton({
  title: loc('button.primary', 'myBundle'), // 'Primary Button'
  className: 'button-primary',
  click: notify('success', loc('button.primary.click', 'myBundle'), // 'Primary button clicked'
  visible: true,
});

Okta.createCallout({
  size: 'compact',
  type: 'info',
  title: loc('callout.title', 'myBundle'), // 'A compact/info callout with a title'
});
```

```js
import { loc } from '@okta/core.common';

Okta.Form.extend({
  layout: 'o-form-theme',
  title: loc('form.title', 'myBundle'), // 'A form title'

  inputs: [
    {
      name: 'a-name',
      type: 'text',
      label: loc('input.a.name.text', 'myBundle'), // 'Using raw explain text'
      explain: loc('input.a.name.explain', 'myBundle'), // 'Raw explain text'
    },
});
```

## Fixing

Replace the existing unlocalized string with the new property key. You can leverage the `loc` utility function for this:

```diff
+ import { loc } from '@okta/core.common';

Okta.createButton({
-  title: 'Primary Button',
+  title: loc('button.primary', 'myBundle'), // 'Primary Button'
  className: 'button-primary',
-  click: notify('success', 'Primary button clicked'),
+  click: notify('success', loc('button.primary.click', 'myBundle'), // 'Primary button clicked'
  visible: true,
});
```
