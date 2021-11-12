const propertiesToJson = require('@okta/build-profiles.utils/properties-to-json');
const generatePseudoLoc = require('@okta/build-profiles.i18n/lib/pseudo-loc');

exports.command = 'i18n';
exports.desc = 'Converts properties file to json for a react app';

exports.handler = async (argv) => {
  generatePseudoLoc(argv);
  await propertiesToJson();
};
