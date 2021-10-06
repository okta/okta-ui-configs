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

const properties = require('properties-to-json');

let propertiesMap;

/**
 * In order to properly map line numbers, we need to create a map for each JSON key to where it is
 * located in the properties file.
 *
 * @param {*} propertiesText: Raw properties file content
 * @param {*} json: Output of properties file conversion to JSON
 */
const linkPropertiesToJson = (propertiesText, json) => {
  propertiesMap = {};
  let extras = [];
  propertiesText
    .split(/\r?\n/)
    .forEach((line, index) => {
      // Check the properties key for a match in our JSON
      const matches = line.match(/[^=]*/);
      const key = matches[0] && matches[0].trim();

      // We won't always have a key specified (comments and extra newlines)
      if (key && json[key]) {
        propertiesMap[key] = {
          value: key,
          column: 0,
          line: index + 1, // non-zero index
          extras,
        };
        // Reset the comments array to account for multiple comment blocks
        extras = [];
      } else {
        extras.push(key);
      }
    });
};

/**
 * Converts loaded *.properties files into a consumable format for ESLint
 * @param {*} text 
 * @param {*} filename 
 */
const preprocess = (text, filename) => {
  if (!text) return;
  const json = properties(text);
  linkPropertiesToJson(text, json);

  let objectText = 'module.exports = {';
  
  // Walk through our generated JSON and prepend parsed comments and newlines
  Object.keys(json).forEach(key => {
    if (!key) return;
    const extras = propertiesMap[key] ? propertiesMap[key].extras : [];
    extras.forEach(extras => {
      objectText += `\n  ${extras.replace('#', '//')}`;
    });
    const value = json[key].replace(/"/g, '\\"'); // Escape double quotes
    objectText += `\n  "${key}": "${value}",`;
  });
  objectText += '\n};';

  return [{
    text: objectText,
    filename,
  }];
};

/**
 * Formats ESLint messages
 * @param {*} messages 
 */
const postprocess = (messages) => {
  const alteredMessages = messages[0]
    .map(msg => {
      // Converting from properties files to JS will add additional lines.
      // We keep a map so we can display the correct line number
      const reference = Object
        .values(propertiesMap)
        .find(value => value.line === msg.line - 1); // Account for 'module.exports'

      return Object.assign(
        msg,
        reference
          ? { line: reference.line, column: 0 }
          : { line: 0, column: 0 },
      );
    });
  return [].concat(...alteredMessages);
};

module.exports = {
  preprocess,
  postprocess,
  supportsAutofix: false
};
