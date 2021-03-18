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
    'courage-app': {
      plugins: ['@okta/okta'],
      rules: {
        '@okta/okta/no-exclusive-language': 1,
      },
      overrides: [
        {
          files: ['*.properties'],
          processor: '@okta/okta/properties',
        },
        {
          files: ['*.js'],
          rules: {
            '@okta/okta/no-unlocalized-text-in-templates': 2,
            '@okta/okta/no-unlocalized-text': 2,
          }
        }
      ],
    }
  },
  rules: {
    'no-exclusive-language': require('./lib/rules/no-exclusive-language'),
    'no-unlocalized-text-in-templates': require('./lib/rules/no-unlocalized-text-in-templates'),
    'no-unlocalized-text': require('./lib/rules/no-unlocalized-text'),
  },
  processors: {
    properties: require('./lib/processors/properties')
  },
};
