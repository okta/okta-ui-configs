const rule = require('./no-unlocalized-text-in-templates');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    sourceType: 'module',
  },
});

ruleTester.run('no-unlocalized-text-in-templates', rule, {
  valid: [
    {code: '"<span>{{type}}</span>"'},
    {code: '"<div>{{type}}</div>"'},
    {code: '"<p>\t<p>"'},
    {code: '`<p>${literal}</p>`'},
    {code: '"<div>{{{raw}}}</div>"'},
    {code: '"<div class=\'foo\'><p>{{{raw}}}</p></div>"'},
    {code: '"<div>{{i18n code=\'app.page.title\'}}</div>"'},
    {code: '"<script>var foo = \'Bar\';</script>"'},
    {code: '"<div>{{#if something}}</div>"'},
    {code: '"<p>{{username}}</p>"'},
    {code: '"<input placeholder=\'{{placeholder}}\'></input>"'},
    {code: '"<abbr title=\'{{longTitle}}\'>{{title}}</abbr>"'},
    {code: '"<span>&nbsp;</span>"'},
    {code: '"<div>{{higher}} &gt; {{lower}}</div>"'},
    {
      code: '"<b>Test Code</b>"',
      filename: 'Class_spec.js',
    },
  ],

  invalid: [
    {
      code: '"<span>User</span>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'User',
          },
        },
      ]
    },
    {
      code: '"<div><p>User</p></div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'User',
          },
        }
      ]
    },
    {
      code: '"<div>{{type}} and text</div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'and text',
          },
        }
      ]
    },
    {
      code: '"<a href=\'{{{url}}}\'>Link text</a>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Link text',
          },
        }
      ]
    },
    {
      code: '"<div>(required)</div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'required',
          },
        }
      ]
    },
    {
      code: '"<div>Hello (there) \
          oh no \
        </div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Hello (there) \
          oh no',
          },
        }
      ]
    },
    {
      code: '"<div>Test single quotes' +
      ' here' +
      '</div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Test single quotes here',
          },
        }
      ]
    },
    {
      code: '"<div>Multiple Errors!<p>Try again.</p></div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Multiple Errors!',
          },
        },
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Try again.',
          },
        }
      ],
    },
    {
      code: '"<b>Test Code</b>"',
      filename: 'Class_test.js', // Convention is _spec.js
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Test Code',
          },
        },
      ],
    },
    // Accessibility
    {
      code: '"<img src=\'file.png\' alt=\'Assistive text\'></img>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Assistive text',
          },
        }
      ]
    },
    {
      code: '"<button aria-label=\'Exit\'>x</button>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Exit',
          },
        }
      ]
    },
    {
      code: '"<input placeholder=\'Placeholder\'></input>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Placeholder',
          },
        }
      ]
    },
    {
      code: '"<abbr title=\'Long title\'>{{title}}</abbr>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Long title',
          },
        }
      ]
    },
    {
      code: '"<div aria-label=\'Description of the overall image\'><img src=\'img.jpg\' /></div>"',
      errors: [
        {
          messageId: 'noUnlocalizedTextInTemplates',
          data: {
            rawString: 'Description of the overall image',
          },
        }
      ]
    },
  ],
});
