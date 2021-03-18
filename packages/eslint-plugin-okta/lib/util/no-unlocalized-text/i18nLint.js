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
