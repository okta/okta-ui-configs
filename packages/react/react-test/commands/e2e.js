const { execSync } = require('child_process');
const { info } = require('@okta/scripts.logger');
const parseE2eCommand = require('../lib/parse-e2e-command');

exports.command = 'e2e';
exports.describe = 'Executes e2e tests';
exports.builder = {
  browser: {
    description: 'Browser to test',
    default: 'chrome:headless:cdpPort=9222',
  },
  test: {
    description: 'Specify specific test to run',
    default: 'test/testcafe/spec/**/*.ts',
  },
  skipBuild: {
    description: 'If set will not build package',
  },
  report: {
    description: 'Writes reports to xml',
  },
};

/* eslint max-statements: ["error", 20], complexity: ["error", 10] */
exports.handler = (argv) => {
  const packageDir = process.cwd();

  if (!argv.skipBuild) {
    const setupCmd = 'yarn build';

    execSync(setupCmd, {
      cwd: packageDir,
      stdio: 'inherit',
    });
  }

  const testcafeCmd = parseE2eCommand(argv);
  info('running e2e command: ', testcafeCmd);
  execSync(testcafeCmd, {
    cwd: packageDir,
    stdio: 'inherit',
  });

  process.exit(0);
};
