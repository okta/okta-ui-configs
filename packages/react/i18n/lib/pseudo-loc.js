const { execSync } = require('child_process');

const generatePseudoLoc = (argv) => {
  const packageDir = process.cwd();
  let bundle = packageDir.match(/packages\/(.*)/)[1];
  if (bundle === 'enduser') {
    // for enduser v2 bundle name is different than the package name
    bundle = 'enduser-v2';
  }
  if (argv.bundle) {
    bundle = argv.bundle;
  }
  const pseudoLocCmd = `pseudo-loc generate --pathToProperties src/properties --bundle ${bundle}`;
  execSync(pseudoLocCmd, {
    cwd: packageDir,
    stdio: 'inherit',
  });
};

module.exports = generatePseudoLoc;
