const properties = require('properties-to-json');

let propertiesMap;

/**
 * In order to properly map line numbers, we need to create a map for each JSON key to where it is
 * located in the properties file.
 *
 * @param {*} propertiesText:  raw properties file content
 * @param {*} json: Output of properties file conversion to JSON
 */
const linkPropertiesToJson = (propertiesText, json) => {
  propertiesMap = {};
  propertiesText
    .split(/\r?\n/)
    .forEach((line, index) => {
      // Check the properties key for a match in our JSON
      const matches = line.match(/[^=]*/);
      const key = matches[0] && matches[0].trim();

      // We won't always have a key specified (comments, multi-line values, and extra newlines)
      if (key && json[key]) {
        let jsonIndex = Object
          .keys(json)
          .findIndex(jsonKey => jsonKey === key);
        propertiesMap[key] = {
          column: 0,
          jsonLine: jsonIndex + 1, // Account for "module.exports"
          line: index,
        };
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
  return [{
    text: `module.exports = ${JSON.stringify(json, null, 2)};`,
    filename,
  }];
};

/**
 * Formats ESLint messages
 * @param {*} messages 
 * @param {*} filename 
 */
const postprocess = (messages) => {
  const alteredMessages = messages[0]
    .map(msg => {
      // Converting from properties files to JS will remove newlines and comments
      // We keep a map so we can display the correct line number
      const reference = Object
        .values(propertiesMap)
        .find(value => value.jsonLine === msg.line);

      // In some cases, we're unable to find a reference to JSON object
      // To avoid a confusing message - remove the line numbers.
      return Object.assign(
        msg,
        reference
          ? { line: reference.line + 1, column: reference.column } // Non-zero index
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
