module.exports = {
  configs: {
    recommended: {
      plugins: ['@okta/okta'],
      // Rules that extend to all checked file types
      rules: {
        '@okta/okta/no-exclusive-language': 1,
      },
      overrides: [
        {
          files: ['*.properties'],
          processor: '@okta/okta/properties',
        },
      ],
    },
  },
  rules: {
    'no-exclusive-language': require('./lib/rules/no-exclusive-language'),
  },
  processors: {
    properties: require('./lib/processors/properties')
  },
};
