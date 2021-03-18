# Disallow using unlocalized text in templates

For packages that utilize the user's locale, no unlocalized text is allowed to be hardcoded into the view template. Developers are required to utilize the `i18n` tag or `loc` utility method to ensure values are localized correctly.

## Rule Details

`'@okta/okta/no-unlocalized-text-in-templates': 2`

## Examples

Examples of **incorrect** code for this rule:

```js
Okta.View.extend({
  template: '<div>Hello, world!</div>'
});

Okta.View.extend({
    template: '<img src="/img/ui/button/file-browse-01.png" alt="Click me!" class="browse"/>'
})
```

```js
import { tpl } from '@okta/core.common';

const template = tpl(`<p id="myElement" class="greeter">Hello, world!</p>`);

Okta.View.extend({
  ...
  this.add(template);
});
```

Examples of **correct** code for this rule:

```js
Okta.View.extend({
  template: '<div>{{i18n code="mymodule.greeting" bundle="my-module-bundle"}}</div>'
});

Okta.View.extend({
    template: '<img src="/img/ui/button/file-browse-01.png" alt={{i18n code="mymodule.browse.alt" bundle="my-module"}} class="browse"/>'
})
```

```js
import { loc, tpl } from '@okta/core.common';

const template = tpl(`<p id="myElement" class="greeter">
  {{i18n code="mymodule.greeting" bundle="my-module"}}
</p>`);

// Alternatively
const template = tpl(
  '<p id="myElement" class="greeter">{{greeting}}</p>',
  { greeting: loc('mymodule.greeting', 'my-module') }
);

// Pass a name through the localization utility
const template = tpl(
  '<p id="myElement" class="greeter">{{greeting}}</p>',
  { greeting: loc('mymodule.greeting.name', 'my-module', [user.firstName]) }
);

export default View.extend({
  ...
  this.add(template);
});
```

## Fixing

Support for localization (l10n) is as [easy as 123](https://www.youtube.com/watch?v=diu8i5UKTHc).

1. Verify a `properties` directory and `{my-module}.properties` file exists in your package. If one does not exist, create it matching the following schema:

    ```bash
    okta-ui/
      packages/
        admin/
          {my-module}/
            properties/
              {my-module}.properties
    ```

2. Create a new unique lookup key based on the context of the string that needs to be translated. This key should be assigned the English String value.

    ```bash
    # my-module.properties

    # This is the properties bundle for this package. When you need to add a
    # string to this package, add it to this bundle.
    mymodule.greeting = Hello, world!
    mymodule.greeting.name = Hello, {0}!
    ```

    If the value already exists in the properties file **and** is mapped to a key describing the use case, please reuse the existing key.

    For more information on adding, editing, or deleting keys - adhere to the instructions in the [i18n Dev Process](https://oktawiki.atlassian.net/wiki/spaces/eng/pages/741293778/i18n+dev+process+From+Oct+2019+onwards#I-need-to-add%2Fedit%2Fdelete-strings).

3. Replace the existing unlocalized string with the new property key. You can leverage the `{{i18n}}` tag or `loc` utility function for this:

    ```diff
    const template = tpl(`
      <p id="myElement" class="greeter">
    -   Hello, world!
    +   {{i18n code="mymodule.greeting" bundle="my-module"}}
      </p>
    `);
    ```

    ```diff
    const template = tpl(`
      <p id="myElement" class="greeter">
    -   Hello, world!
    +   {{greeting}}
      </p>
    -`);
    + `, { greeting: loc('mymodule.greeting', 'my-module') }
    ```
