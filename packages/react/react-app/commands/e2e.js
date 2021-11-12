const { execSync } = require('child_process');
const { info } = require('@okta/scripts.logger');
const parseE2eCommand = require('@okta/build-profiles.react-test/lib/parse-e2e-command');

exports.command = 'e2e';
exports.describe = 'Executes e2e tests for a react app';

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
