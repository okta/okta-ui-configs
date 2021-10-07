/*!
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow messages without comments for arguments and single-word messages',
      category: 'Best Practice',
      recommended: true
    },
    schema: [
      {
        type: 'object',
        properties: {
          templateDelimiters: {
            type: 'array'
          },
        },
        additionalProperties: false
      }
    ],
    messages: {
      missingSingularComment: 'Single-word values are often mistranslated. Add a comment above "{{entry}}" to describe how it is used.',
      missingArgumentComment: 'Context for "{{arg}}" is missing. Add a comment above "{{entry}}" to describe how it is used.',
    },
    fixable: null,
  },

  create(context) {
    function report(messageId, details) {
      context.report({ messageId, ...details });
    }

    /**
     * Parse through the node tree and locate the comments above the given node value
     * @param {*} node
     * @returns {string} Comments joined by newlines
     */
    function getComments(node) {
      const tokens = context
        .getSourceCode()
        .getTokensBefore(node, { includeComments: true })
        .reverse();

      // Drop the first two tokens, as these will be ["keyname", ":"]
      tokens.shift();
      tokens.shift();

      const comment = tokens
        .slice(0, tokens.findIndex(token => ['String', 'Punctuator'].includes(token.type))) // Extract comments between keys 
        .map(token => token.value)
        .reverse()
        .join('\n'); // Treat comments as a single entity

      return comment;
    }

    function check(node) {
      const [nextNode] = context.getSourceCode().getTokensAfter(node, 1);
      if (nextNode && nextNode.value === ':') {
        // Return when the current node is not the value of a key/value pair. 
        return;
      }

      // If a custom set of template delimiters are passed, use them:
      const options = context.options[0] || {};
      const [ startDel, endDel ] = options.templateDelimiters || ['{', '}'];

      // Check if arguments are used
      const regex = new RegExp(`${startDel}([0-9]+?)${endDel}`, 'ig');
      const matches = node.value.match(regex) || [];

      // Check if value consists of multiple words
      const isMultiWord = node.value.trim().includes(' ');

      if (!matches.length && isMultiWord) {
        // Return when there are no arguments for a multi-word value
        return;
      }

      // Get all comments before the node
      const comment = getComments(node);

      // Single-word case
      if (!isMultiWord && !comment) {
        report('missingSingularComment', { node, data: { entry: node.value } });
        return; // Do not report for both singular and matches
      }

      matches.forEach(match => {
        if (!comment.includes(match)) {
          report('missingArgumentComment', { node, data: { entry: node.value, arg: match } });
        }
      });
    }

    return {
      Literal: check,
    };
  }
};
