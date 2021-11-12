const runReactAppRewired = require('@okta/build-profiles.utils/run-react-app-rewired');
const propertiesToJson = require('@okta/build-profiles.utils/properties-to-json');
const parseTestCommand = require('../lib/parse-test-command');

const task = 'test';
exports.command = task;
exports.desc = 'Test a react app or a library';

exports.builder = {
  debug: {
    description: 'Runs unit tests in debug mode',
  },
  watch: {
    description: 'Runs unit tests in watch mode',
  },
  report: {
    description: 'Generate report',
  },
  test: {
    description: 'Specify specific unit test path to run',
  },
  update: {
    description: 'Update snapshots',
  },
  coverage: {
    description: 'Enables code coverage',
  },
};

exports.handler = async (argv) => {
  await propertiesToJson();
  runReactAppRewired(parseTestCommand(argv));
};
