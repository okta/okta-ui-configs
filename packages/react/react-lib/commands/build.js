const { execSync } = require('child_process');
const path = require('path');
const { info } = require('@okta/scripts.logger');

exports.command = 'build';
exports.desc = 'Builds react lib';

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

  /**
   * NOTE - this option can be dangerous - use with caution - if package A and package B both have an ambient type
   *        declaration for the same third party library then order of build becomes important and can have unexpected results.
   * 
   * Allows for packages to declare ambient type declaration files for modules in the global scope which
   * will be copied to the shared node_modules folder. Without this custom option there is no way for
   * package A to get ambient type declarations from package B for a third party library C.
   * 
   * @example react-lib --babelOut dist --ambientCopy
   */
  if (argv.ambientCopy) {
    const ambientSource = path.resolve(packageDir, 'src/@types');
    const workspaceAmbientTypes = path.resolve(packageDir, '../../../node_modules/');
    // It's useful to know this is happening in all log files
    // eslint-disable-next-line no-console
    info(`Copying ambient declaration files from: ${ambientSource} to: ${workspaceAmbientTypes}`);
    const ambientTypeCopy = `cp -rf ${ambientSource} ${workspaceAmbientTypes}`;
    execSync(ambientTypeCopy, {
      cwd: packageDir,
      stdio: 'inherit',
    });
  }

  const buildCommand = 'webpack --config webpack.config.js --progress --colors --bail';

  if (!argv.analyze) {
    process.env.GENERATE_SOURCEMAP = false;
  } else {
    process.env.GENERATE_SOURCEMAP = true;
  }

  if (argv.tscAndBabel) {
    const tsOutDir = `${packageDir}/build`;
    const babelOutDir = `${packageDir}/${argv.babelOut}`;
    const typeScriptBuild = `tsc --outDir ${tsOutDir};`;
    const babelBuild = `npx babel ${tsOutDir} --out-dir ${babelOutDir};`;
    const moveTypes = `mkdir ${babelOutDir}/types; cp -rf ${tsOutDir}/types/* ${babelOutDir}/types; rm -rf ${tsOutDir};`;
    info(`Running ${typeScriptBuild}`);
    execSync(typeScriptBuild, {
      cwd: packageDir,
      stdio: 'inherit',
    });
    info(`Running ${babelBuild}`);
    execSync(babelBuild, {
      cwd: packageDir,
      stdio: 'inherit',
    });
    info(`Running ${moveTypes}`);
    execSync(moveTypes, {
      cwd: packageDir,
      stdio: 'inherit',
    });
  } else {
    info(`Running ${buildCommand}`);
    execSync(buildCommand, {
      cwd: packageDir,
      stdio: 'inherit',
    });
  }

  // This is really only useful for shared packages using webpack - like react-components
  if (argv.analyze) {
    execSync('npx source-map-explorer "dist/index.js" --no-border-checks', {
      cwd: packageDir,
      stdio: 'inherit',
    });
  }
};
