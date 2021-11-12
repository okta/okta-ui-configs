const propertiesToJson = require('@okta/build-profiles.utils/properties-to-json');
const generatePseudoLoc = require('../lib/pseudo-loc');

exports.command = 'bundle';
exports.desc = 'Converts properties file to json';

exports.handler = async (argv) => {
  generatePseudoLoc(argv);
  await propertiesToJson();
};
