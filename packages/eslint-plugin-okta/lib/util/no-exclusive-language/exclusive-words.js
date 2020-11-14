// Current focus: https://oktawiki.atlassian.net/wiki/spaces/~885879886/pages/1282643380/Inclusive+Language
module.exports = {
  deny: [
    {
      word: 'blacklist',
      suggestion: ['block list'],
    },
    {
      word: 'black list',
      suggestion: ['block list'],
    },
    {
      word: 'black-list',
      suggestion: ['block-list'],
    },
    {
      word: 'blacklisted',
      suggestion: ['blocked', 'block listed'],
    },
    {
      word: 'blacklisting',
      suggestion: ['blocking', 'block listing'],
    },
    {
      word: 'whitelist',
      suggestion: ['allow list'],
    },
    {
      word: 'white list',
      suggestion: ['allow list'],
    },
    {
      word: 'white-list',
      suggestion: ['allow list'],
    },
    {
      word: 'whitelisted',
      suggestion: ['allowed', 'allow listed'],
    },
    {
      word: 'whitelisting',
      suggestion: ['allow', 'allow listing'],
    },
    {
      word: 'master',
      suggestion: ['source', 'leader', 'main', 'backed'],
    },
    {
      word: 'mastering',
      suggestion: ['as a source', 'sourcing', 'backed'],
    },
    {
      word: 'slave',
      suggestion: ['replica', 'backup', 'follower', 'worker-node', 'instance'],
    },
    {
      word: 'slaving',
      suggestion: ['replicating', 'assigned'],
    },
  ],
};
