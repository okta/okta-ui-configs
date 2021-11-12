const { dirname, resolve } = require('path');
const webpack = require('webpack');

const BUILD_PROFILE_NODE_MODULES = resolve(__dirname, './node_modules');

module.exports = {
  webpack: function (config, env) {
    if (env === 'production') {
      // JS Overrides
      config.output.filename = 'static/js/[name].js';
      config.output.chunkFilename = 'static/js/[name].chunk.js';

      // CSS Overrides
      const cssPlugin = config.plugins.find(plugin => plugin.constructor.name === 'MiniCssExtractPlugin');
      cssPlugin.options.filename = 'static/css/[name].css';
      cssPlugin.options.chunkFilename = 'static/css/[name].chunk.css';

      // Disable code splitting for now
      config.optimization.runtimeChunk = false;
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false,
        },
      };
      config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }));
    }

    /**
     * Actual webpack config comes from:
     * okta-ui-react/node_modules/react-scripts/config/webpack.config
     * 
     * Runtime precedence for webpack resolves.modules is:
     * 
     * 1) okta-ui-react/scripts/build_profiles/utils/node_modules
     * 2) node_modules
     * 3) okta-ui-react/<the app>/node_modules
     * 
     * This means that if the app has a dependency with a version that is provided by
     * okta-ui-react/scripts/build_profiles/utils, it is used.
     * If not, any node_modules folder according to node resolution algorithm is valid
     * And finally the app's specific node_modules folder is checked.
     */
    config.resolve.modules.unshift(BUILD_PROFILE_NODE_MODULES);

    return config;
  },
  // The Jest config to use when running your jest tests
  jest: function (config) {
    // Allow individual packages to do their own jest setup configuration if they choose to do so.
    if (!config.setupFilesAfterEnv || config.setupFilesAfterEnv.length === 0) {
      config.setupFilesAfterEnv = [`${__dirname}/jest.setup.js`];
    }
    config.moduleNameMapper = { '^dnd-core$': 'dnd-core/dist/cjs',
      '^react-dnd$': 'react-dnd/dist/cjs',
      '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
      '@okta/react-components': '@okta/react-components/plugins/react-components-mock.ts',
      '@okta/fetch': '@okta/fetch/plugins/shared-mock.ts',
      ...config.moduleNameMapper };

    if (process.env.REPORTS_FILE) {
      config.reporters = [
        'default',
        ['jest-junit', {
          output: process.env.REPORTS_FILE,
          classNameTemplate: '{title}',
          usePathForSuiteName: 'true',
        }],
      ];
    }
    return config;
  },
  paths: function (paths, env) {
    paths.appPath = resolve(__dirname, '');
    return paths;
  },
};
