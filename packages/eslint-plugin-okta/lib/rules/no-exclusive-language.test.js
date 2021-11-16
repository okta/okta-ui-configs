const rule = require('./no-exclusive-language');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    sourceType: 'module',
  },
});

ruleTester.run('no-exclusive-language', rule, {
  valid: [
    '\'blocklist\'',
    '\'banlist\'',
    '\'block list\'',
    '\'blocked\'',
    '\'masterson\'',
    '\'lemaster\'',
  ],

  invalid: [
    {
      code: '\'add to blacklist\'',
      errors: [{
        message: 'Usage of "blacklist" is deprecated. Utilize "block list" instead.',
      }]
    },
    {
      code: '\'add to black list\'',
      errors: [{
        message: 'Usage of "black list" is deprecated. Utilize "block list" instead.',
      }]
    },
    {
      code: '\'you were blacklisted\'',
      errors: [{
        message: 'Usage of "blacklisted" is deprecated. Utilize "blocked" or "block listed" instead.',
      }]
    },
    {
      code: '\'blacklisting user\'',
      errors: [{
        message: 'Usage of "blacklisting" is deprecated. Utilize "blocking" or "block listing" instead.',
      }]
    },
    {
      code: '\'add to whitelist\'',
      errors: [{
        message: 'Usage of "whitelist" is deprecated. Utilize "allow list" instead.',
      }]
    },
    {
      code: '\'add to white list\'',
      errors: [{
        message: 'Usage of "white list" is deprecated. Utilize "allow list" instead.',
      }]
    },
    {
      code: '\'add to white-list\'',
      errors: [{
        message: 'Usage of "white-list" is deprecated. Utilize "allow list" instead.',
      }]
    },
    {
      code: '\'you were whitelisted\'',
      errors: [{
        message: 'Usage of "whitelisted" is deprecated. Utilize "allowed" or "allow listed" instead.',
      }]
    },
    {
      code: '\'whitelisting user\'',
      errors: [{
        message: 'Usage of "whitelisting" is deprecated. Utilize "allow" or "allow listing" instead.',
      }]
    },
    {
      code: '\'// whitelist\'',
      errors: [{
        message: 'Usage of "whitelist" is deprecated. Utilize "allow list" instead.',
      }]
    },
    {
      code: '\'/* whitelist */\'',
      errors: [{
        message: 'Usage of "whitelist" is deprecated. Utilize "allow list" instead.',
      }]
    },
    {
      code: '\'master list\'',
      errors: [{
        message: 'Usage of "master" is deprecated. Utilize "source", "leader", "main" or "backed" instead.',
      }]
    },
    {
      code: '\'AD mastered\'',
      errors: [{
        message: 'Usage of "mastered" is deprecated. Utilize "sourced" instead.',
      }]
    },
    {
      code: '\'profile mastering\'',
      errors: [{
        message: 'Usage of "mastering" is deprecated. Utilize "as a source", "sourcing" or "backed" instead.',
      }]
    },
    {
      code: '\'build slave\'',
      errors: [{
        message: 'Usage of "slave" is deprecated. Utilize "replica", "backup", "follower", "worker-node" or "instance" instead.',
      }]
    },
    {
      code: '\'slaving database\'',
      errors: [{
        message: 'Usage of "slaving" is deprecated. Utilize "replicating" or "assigned" instead.',
      }]
    },
  ],
});
