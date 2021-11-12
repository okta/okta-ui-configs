const { resolve, dirname } = require('path');
/**
 * @param {object} arguments 
 * @returns {object} options
 * @returns {string} options.eslintCmd
 * @returns {string} options.packageDir
 * @returns {string} options.styleCmd
 */
module.exports = (argv) => {
  const packageDir = process.cwd();
  const eslintBin = resolve(__dirname, '../node_modules/.bin/eslint');
  const stylelintBin = resolve(__dirname, '../node_modules/.bin/stylelint');
  const stylelintrc = resolve(__dirname, '../.stylelintrc.json');
  let outputFilePrefix = '';

  let eslintCmd = `${eslintBin} ${packageDir} --ext=.js,.jsx,.ts,.tsx,.properties`;
  let styleCmd = '';
  if (argv.fix) {
    eslintCmd += ' --fix';
  }
  if (argv.verbose) {
    eslintCmd += ' --debug';
  }
  if (argv.report) {
    const pkgJson = require(`${packageDir}/package.json`);
    const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
    outputFilePrefix = `${reportsDir}/lint/${pkgJson.name.replace('@okta/', '')}`;
    eslintCmd += ` --quiet -f checkstyle -o ${outputFilePrefix}_eslint_checkstyle.xml`;
  }

  // Stylelint
  if (!argv.skipStyleLint) {
    styleCmd = `${stylelintBin} ${packageDir}/**/*.scss --config ${stylelintrc} --allow-empty-input`;
    if (argv.report) {
      const checkstyleFormatter = dirname(require.resolve('stylelint-checkstyle-formatter/package.json'));
      styleCmd += ` --custom-formatter ${checkstyleFormatter} > ${outputFilePrefix}_checkstyle.xml`;
    }
  }

  return {
    packageDir,
    eslintCmd,
    styleCmd,
  };
};
