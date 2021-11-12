const propertiesToJson = require('@okta/build-profiles.utils/properties-to-json');
const runReactAppRewired = require('@okta/build-profiles.utils/run-react-app-rewired');

const task = 'start';
exports.command = 'start';
exports.desc = 'Starts react app';

exports.handler = async () => {
  await propertiesToJson();

  runReactAppRewired({ task });
};
