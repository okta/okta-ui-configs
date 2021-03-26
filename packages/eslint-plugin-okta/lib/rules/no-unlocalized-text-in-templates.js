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
