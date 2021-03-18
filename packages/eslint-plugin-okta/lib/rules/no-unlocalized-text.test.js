const rule = require('./no-unlocalized-text');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    sourceType: 'module',
  },
});

const buildCode = (key, value) => {
  return `module.exports = { ${key}: ${value} };`;
};

ruleTester.run('no-unlocalized-text', rule, {
  valid: [
    { code: buildCode('title', 'loc(\'user.name\', \'bundle\')' )},
    { code: buildCode('label', 'Okta.loc(\'user.name\', \'bundle\')' )},

    // Allowed values
    { code: buildCode('tooltip', 'null' )},
    { code: buildCode('tooltip', 'true' )},
    { code: buildCode('tooltip', 'false' )},
    { code: buildCode('tooltip', '\'string\'' )},
    { code: buildCode('tooltip', '\'\'' )},
    { code: buildCode('tooltip', '\'       \'' )},

    // Special cases with HTML
    { code: buildCode('content', '\'<p></p>\'') },
    { code: buildCode('content', '\'<p>{{i18n code="foo" bundle="bar"}}</p>\'') },

    // Test files - omit these as hardcoded values are OK
    {
      code: buildCode('title', '\'Foo\''),
      filename: '/test/Class_spec.js',
    },
  ],

  invalid: [
    {
      code: buildCode('title', '\'Foo\''),
      errors: [
        {
          messageId: 'noUnlocalizedText',
          data: {
            rawString: 'Foo',
          },
        },
      ]
    },
    {
      code: buildCode('label', '\'This is a label.\''),
      errors: [
        {
          messageId: 'noUnlocalizedText',
          data: {
            rawString: 'This is a label.',
          },
        },
      ]
    },
    {
      code: buildCode('placeholder', '`Hello, ${world}`'),
      errors: [
        {
          messageId: 'noUnlocalizedText',
          data: {
            rawString: 'Hello, ',
          },
        },
      ]
    },
    {
      code: buildCode('content', '`<p>This is a paragraph</p>`'),
      errors: [
        {
          messageId: 'noUnlocalizedText',
          data: {
            rawString: 'This is a paragraph',
          },
        },
      ]
    },
  ],
});
