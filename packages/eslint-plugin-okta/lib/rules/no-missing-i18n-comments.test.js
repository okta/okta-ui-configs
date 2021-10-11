const rule = require('./no-missing-i18n-comments');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    sourceType: 'module',
  },
});

function buildTestCode(codeLines) {
  return `module.exports = {\n  ${codeLines.join('\n  ')}\n};`;
}

ruleTester.run('no-missing-i18n-comments', rule, {
  valid: [
    buildTestCode([
      'key: "single"',
    ]),
    buildTestCode([
      '// {0} refers to something',
      'key: "{0}"',
    ]),
    buildTestCode(['key: "foo bar",']),
    buildTestCode([
      '// here is a long comment with a description for {0} and {1}',
      'key: "{0} and {1}",',
    ]),
    buildTestCode([
      '// First comment',
      '// Second: {0} refers to something',
      'key: "{0}",',
    ]),
    buildTestCode([
      '// First comment with reference {0}',
      '// Second does not',
      'key: "{0}",',
    ]),
    buildTestCode([
      '// Comment with reference {0}',
      'key: "{0}",',
      '// Another comment',
      'key2: "Some data",',
      '// Another param {0}',
      'key3: "{0} - here",'
    ]),
    {
      code: buildTestCode([
        '// Comment explaining {{0}}',
        'key: "{{0}}",'
      ]),
      options: [{ templateDelimiters: ['{{', '}}'] }],
    },
    {
      code: buildTestCode([
        '// Comment explaining <%0%>',
        'key: "<%0%>",'
      ]),
      options: [{ templateDelimiters: ['<%', '%>'] }],
    },
    {
      code: buildTestCode([
        '// Description of single',
        'key: "single"',
      ]),
      options: [{ checkSingleWords: true }],
    }
  ],

  invalid: [
    {
      code: buildTestCode(['key: "Value {0}"']),
      errors: [{
        message: 'Context for "{0}" is missing. Add a comment above "Value {0}" to describe how it is used.',
      }]
    },
    {
      code: buildTestCode(['key: "Value {5}"']),
      errors: [{
        message: 'Context for "{5}" is missing. Add a comment above "Value {5}" to describe how it is used.',
      }]
    },
    {
      code: buildTestCode([
        '// Value of something',
        'key: "Value {0}"'
      ]),
      errors: [{
        message: 'Context for "{0}" is missing. Add a comment above "Value {0}" to describe how it is used.',
      }]
    },
    {
      // Invalid reference
      code: buildTestCode([
        '// {1} is a value',
        'key: "Value {0}"'
      ]),
      errors: [{
        message: 'Context for "{0}" is missing. Add a comment above "Value {0}" to describe how it is used.',
      }]
    },
    {
      // Multiple arguments
      code: buildTestCode([
        '// {0} is something',
        'key: "Value {0} - {1}"'
      ]),
      errors: [{
        message: 'Context for "{1}" is missing. Add a comment above "Value {0} - {1}" to describe how it is used.',
      }]
    },
    {
      // Multiple entries
      code: buildTestCode([
        '// First comment',
        'key: "Value here",',
        '// Second comment - missing',
        'key2: "Name: {0}",',
        '// Third comment',
        'key3: "Foo bar",'
      ]),
      errors: [{
        message: 'Context for "{0}" is missing. Add a comment above "Name: {0}" to describe how it is used.',
      }]
    },
    {
      code: buildTestCode([ 'key: "Name: {{0}}",' ]),
      options: [{ templateDelimiters: ['{{', '}}'] }],
      errors: [{
        message: 'Context for "{{0}}" is missing. Add a comment above "Name: {{0}}" to describe how it is used.',
      }]
    },
    {
      code: buildTestCode([ 'key: "Name: <%0%>",' ]),
      options: [{ templateDelimiters: ['<%', '%>'] }],
      errors: [{
        message: 'Context for "<%0%>" is missing. Add a comment above "Name: <%0%>" to describe how it is used.',
      }]
    },
    // Single-words
    {
      code: buildTestCode(['key: "single"']),
      options: [{ checkSingleWords: true }],
      errors: [{
        message: 'Single-word values are often mistranslated. Add a comment above "single" to describe how it is used.',
      }]
    },
    {
      code: buildTestCode([
        'key: "first",',
        'key2: "second value"',
      ]),
      options: [{ checkSingleWords: true }],
      errors: [{
        message: 'Single-word values are often mistranslated. Add a comment above "first" to describe how it is used.',
      }]
    },
  ],
});
