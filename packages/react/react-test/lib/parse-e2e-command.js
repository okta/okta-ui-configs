const { resolve } = require('path');
/**
 * @param {object} arguments 
 * @returns {string} testcafeCmd
 */
module.exports = (argv) => {
  const packageDir = process.cwd();
  const testcafeBin = resolve(__dirname, '../node_modules/.bin/testcafe');
  const serve = resolve(__dirname, '../node_modules/.bin/serve');
  const browser = argv.browser || 'chrome:headless:cdpPort=9222';
  const test = argv.test || 'test/testcafe/spec/**/*.ts';

  // https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784
  let testcafeCmd = `${testcafeBin} -c 1 '${browser}' '${test}'`;
  if (argv.report) {
    const pkgJson = require(`${packageDir}/package.json`);
    const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
    const outputFile = `${reportsDir}/e2e/${pkgJson.name.replace('@okta/', '')}.xml`;
    testcafeCmd += ` --reporter xunit:${outputFile} --screenshots path=${reportsDir}/e2e/screenshots,takeOnFails=true --app "${serve} -s build -l 3000"`;
  }
  return testcafeCmd;
};
