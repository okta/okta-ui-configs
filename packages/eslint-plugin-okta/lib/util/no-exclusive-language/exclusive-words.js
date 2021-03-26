/*!
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

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
