const { execSync } = require('child_process');
const { resolve } = require('path');
const parseLintCommand = require('@okta/build-profiles.react-lint/lib/parse-lint-command');

exports.command = 'lint';
exports.desc = 'Runs ESLint and Stylelint for a react library';

exports.handler = (argv) => {
  const { eslintCmd, styleCmd } = parseLintCommand(argv);
  const rootDir = resolve(__dirname, '../../../../');
  console.log(`Executing eslint: ${eslintCmd}`); // eslint-disable-line no-console
  execSync(`${eslintCmd}`, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env },
  });

  // Stylelint
  if (styleCmd) {
    console.log('Executing stylelint: ', styleCmd); // eslint-disable-line no-console
    execSync(styleCmd, {
      stdio: 'inherit',
      env: { ...process.env },
    });
  }
};
