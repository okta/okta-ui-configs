const runReactAppRewired = require('@okta/build-profiles.utils/run-react-app-rewired');
const propertiesToJson = require('@okta/build-profiles.utils/properties-to-json');
const parseTestCommand = require('@okta/build-profiles.react-test/lib/parse-test-command');

exports.command = 'test';
exports.desc = 'Test a react library';

exports.handler = async (argv) => {
  await propertiesToJson();
  runReactAppRewired(parseTestCommand(argv));
};
