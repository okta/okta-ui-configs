const { execSync } = require('child_process');
const runReactAppRewired = require('@okta/build-profiles.utils/run-react-app-rewired');

const task = 'build';
exports.command = task;
exports.desc = 'Builds react app';

exports.handler = async (argv) => {
  const packageDir = process.cwd();
  let i18nCmd = 'i18n bundle';
  if (argv.bundle) {
    i18nCmd += ` --bundle ${argv.bundle}`;
  }
  // build i18n
  execSync(i18nCmd, {
    cwd: packageDir,
    stdio: 'inherit',
  });

  if (!argv.analyze) {
    process.env.GENERATE_SOURCEMAP = false;
  } else {
    process.env.GENERATE_SOURCEMAP = true;
  }

  runReactAppRewired({
    packageDir,
    task,
  });

  if (argv.analyze) {
    execSync('npx source-map-explorer "build/static/js/*.js" --no-border-checks', {
      cwd: packageDir,
      stdio: 'inherit',
    });
  }
};
