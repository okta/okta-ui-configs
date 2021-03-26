const { parseEvidence, scan } = require('../util/no-unlocalized-text/i18nLint');

function isHtml(value) {
  return /<[a-z]+|[a-z]+>/.test(value);
}

function isTestFile(filename) {
  return filename.endsWith('_spec.js');
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow unlocalized string literals in templates',
      category: 'Best Practice',
      recommended: true
    },
    fixable: null,
    schema: [],
    messages: {
      noUnlocalizedTextInTemplates: 'Unexpected string: {{rawString}}'
    }
  },

  create(context) {
    function report(node, value) {
      context.report({
        messageId: 'noUnlocalizedTextInTemplates',
        data: {
          rawString: value
        },
        node
      });
    }

    function check(node) {
      const isTemplateElement = node.type === 'TemplateElement';
      const value = isTemplateElement ? node.value.raw : node.raw;

      if (!isHtml(value) || isTestFile(context.getFilename())) {
        return;
      }

      scan(value)
        .forEach(err => {
          const evidenceString = parseEvidence(err.evidence, err.scope);
          report(node, evidenceString);
        });
    }

    return {
      Literal: check,
      TemplateElement: check
    };
  }
};
