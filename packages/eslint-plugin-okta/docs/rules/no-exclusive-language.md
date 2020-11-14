# No Exclusive Language

Words have power. They also have legacy connotations. The language we use in our everyday communication, in our deliverables, in anything and everything, influences the environment around us. It also has the power to attract similar elements. We want to create an environment that empowers our people by promoting a sense of inclusion and belonging; to achieve this, we must use language that is inclusive to all and doesn’t exclude or offend certain groups.

## Rule Details

`'@okta/okta/no-exclusive-language': 2`

## Examples

Examples of **incorrect** code for this rule:

```js
const title = 'Blacklist users';
const slave = 'Process slave';
// Whitelist approved orgs
```

A full list of blocked words and suggested replacements are available under the [Inclusive Language](https://oktawiki.atlassian.net/wiki/spaces/~885879886/pages/1282643380/Inclusive+Language) wiki. As new terms are added, the [`exclusive-words`](../../lib/util/no-exclusive-language/exclusive-words.js) file is updated.

Examples of **correct** code for this rule:

```diff
-const title = 'Blacklist users';
-const slave = 'Process slave';
-// Whitelist approved orgs
+const title = 'Block list users';
+const instance = 'Process instance';
+// Allow list of approved orgs
```
