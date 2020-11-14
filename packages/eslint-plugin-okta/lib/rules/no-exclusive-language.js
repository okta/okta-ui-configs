const { deny } = require('../util/no-exclusive-language/exclusive-words');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow insensitive or inconsiderate words',
      category: 'Best Practice',
      recommended: true
    },
    messages: {
      exclusiveWord: 'Usage of "{{word}}" is deprecated. Utilize "{{suggestionString}}" instead.',
    },
    fixable: null,
    schema: []
  },

  create(context) {
    function report(node, details) {
      const { word, suggestion } = details;
      context.report({
        node,
        messageId: 'exclusiveWord',
        data: {
          word,
          // Format error message to highlight suggested replacements
          suggestionString: suggestion.join('", "').replace(/, ([^,]*)$/, ' or $1')
        },
      });
    }

    function check(node) {
      const isTemplateElement = node.type === 'TemplateElement';
      const value = isTemplateElement ? node.value.raw : node.raw;
      if (!value) return;
      const result = deny.filter(word => {
        const regex = new RegExp(`[\\w-_/]*${word.word}[\\w-_/]*`, 'ig');
        const matches = value.match(regex);
        return matches ? matches[0] : null;
      });

      if (!result || result.length === 0) return;
      report(node, result[result.length - 1]);
    }

    return {
      Literal: check,
      TemplateElement: check,
      Program(node) {
        node.comments
          .filter((c) => c.type !== 'Shebang')
          .forEach((c) => check(context, c, c.value));
      }
    };
  }
};
