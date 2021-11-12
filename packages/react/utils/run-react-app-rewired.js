const { resolve } = require('path');
const { execSync } = require('child_process');

/**
 * @param {object} options
 * @param {string} options.task
 * @param {string} options.params
 * @param {string} options.taskParams
 */
module.exports = (options) => {
  const reactAppRewired = resolve(__dirname, './node_modules/.bin/react-app-rewired');
  const config = resolve(__dirname, './config-overrides.js');

  let cmd = `${reactAppRewired}`;

  if (options.params) {
    cmd += ` ${options.params}`;
  }
  cmd += ` ${options.task}`;
  if (options.taskParams) {
    cmd += ` ${options.taskParams}`;
  }
  cmd += ` --config-overrides ${config}`;

  const execOptions = {
    stdio: 'inherit',
    env: { ...process.env },
  };

  execSync(cmd, execOptions);
};
