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
          rules: {
            '@okta/okta/no-missing-i18n-comments': 2,
          }
        },
      ],
    },
    'courage-app': {
      // Rules that are relevant to all courage-apps
      plugins: ['@okta/okta'],
      rules: {
        '@okta/okta/no-exclusive-language': 1,
      },
      overrides: [
        {
          files: ['*.properties'],
          processor: '@okta/okta/properties',
          rules: {
            '@okta/okta/no-missing-i18n-comments': 2,
          }
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
    'no-missing-i18n-comments': require('./lib/rules/no-missing-i18n-comments'),
    'no-unlocalized-text-in-templates': require('./lib/rules/no-unlocalized-text-in-templates'),
    'no-unlocalized-text': require('./lib/rules/no-unlocalized-text'),
  },
  processors: {
    properties: require('./lib/processors/properties')
  },
};
