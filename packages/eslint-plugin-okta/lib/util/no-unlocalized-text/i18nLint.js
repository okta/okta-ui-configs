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

const I18nLint = require('i18n-lint');

const i18nOptions = {
  attributes: [
    'alt',
    'aria-label',
    'placeholder',
    'title',
  ],
  templateDelimiters: [ '{{', '}}' ], // Handlebars
};

/**
 * Returns unlocalized text from the markup.
 * 
 * Utilizes the returned evidence RegExp (ex: `"\(Raw String)/"`) to obtain
 * a string representation of the error.
 * 
 * @param {RegExp} evidenceRegExp A regex of the offending text
 * @param {string} scope Template markup where the error was found
 * @returns {string} Sanitized unlocalized text value
 * 
 */
function parseEvidence(evidenceRegExp, scope) {
  const matches = scope.match(evidenceRegExp);
  let evidenceString = (matches && matches.length) ? matches[0] : evidenceRegExp.toString();

  // The i18n utility sometimes picks up the preceding and trailing single quotes when
  // templates are passed as multi-line strings. If so, ignore it.
  if (evidenceString.startsWith('\'')) {
    evidenceString = evidenceString.substr(1);
  }

  if (['\'', '\\'].includes(evidenceString[evidenceString.length - 1])) {
    evidenceString = evidenceString.slice(0, -1);
  }

  return evidenceString;
}

function scan(value) {
  return I18nLint.scan(value, i18nOptions);
}

module.exports = {
  parseEvidence,
  scan,
};
