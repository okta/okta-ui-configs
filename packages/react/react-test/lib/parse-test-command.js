/**
 * @param {object} arguments 
 * @returns {object} options
 * @returns {string} options.task
 * @returns {string} options.params
 * @returns {string} options.tasParams
 */
module.exports = (argv) => {
  const packageDir = process.cwd();
  let taskParams = '--passWithNoTests';
  let params = '';
  if (argv.debug) {
    taskParams += ' --runInBand --no-cache';
    params += ' --inspect-brk';
  } else if (argv.watch) {
    taskParams += ' --watch';
  } else {
    taskParams += ' --watchAll=false';
  }
  if (argv.report) {
    const pkgJson = require(`${packageDir}/package.json`);
    const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
    const outputFile = `${reportsDir}/unit/${pkgJson.name.replace('@okta/', '')}.xml`;
    process.env.REPORTS_FILE = outputFile;
    taskParams += ' --ci';
  }
  if (argv.test) {
    taskParams += ' --testPathPattern ';
    taskParams += argv.test;
  }
  if (argv.update) {
    taskParams += ' -u';
  }
  if (argv.coverage) {
    taskParams += ' --coverage';
  }
  return {
    task: 'test',
    params,
    taskParams,
  };
};
