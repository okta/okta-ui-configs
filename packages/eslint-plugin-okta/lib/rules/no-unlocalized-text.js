const { parseEvidence, scan } = require('../util/no-unlocalized-text/i18nLint');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow unlocalized string literals in specific identifiers',
      category: 'Best Practice',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      noUnlocalizedText: 'Unexpected string: {{rawString}}',
    }
  },

  create(context) {
    function report(node, value) {
      context.report({
        messageId: 'noUnlocalizedText',
        data: {
          rawString: value,
        },
        node,
      });
    }

    function isTestFile(filename) {
      return filename.includes('/test/');
    }

    function getValueFromTemplate(node) {
      // Convert templates with vars into a single string
      // `Hello, ${name}. Welcome to okta-ui.` => 'Hello,. Welcome to okta-ui.'
      return node
        .quasis
        .map(quasi => quasi.value.cooked)
        .join('');
    }

    function check(node) {
      if (isTestFile(context.getFilename())) return;

      const keyIdentifiers = [
        'content', // This can contain HTML
        'desc', // autocomplete
        'hrefName',
        'label',
        'placeholder',
        'save',
        'subtitle',
        'text',
        'title',
        'tooltip',
      ];

      const valueIdentifiers = [
        'Literal',
        'TemplateLiteral',
      ];

      const allowedValues = [
        'string',   // Used for model schemas
        '',         // Empty strings
      ];
  
      if (keyIdentifiers.includes(node.key.name) && valueIdentifiers.includes(node.value.type)) {
        const isTemplateElement = node.value.type === 'TemplateLiteral';
        const value = isTemplateElement ? getValueFromTemplate(node.value) : node.value.value;

        if (typeof value === 'string' && !allowedValues.includes(value.trim())) {
          if (node.key.name === 'content') {
            // The `content` key accepts HTML strings, so we parse it here with our I18nLint tool
            scan(value).forEach(err => {
              const evidenceString = parseEvidence(err.evidence, err.scope);
              report(node.value, evidenceString);
            });
          } else {
            report(node.value, value);
          }
        }
      }
    }

    return {
      Property: check,
    };
  },
};
