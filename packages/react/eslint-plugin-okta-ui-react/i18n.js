/**
 * ESLint rules for enforcing best practices around internationalization.
 * 
 * For additional configuration options, see: https://github.com/edvardchen/eslint-plugin-i18next
 */
module.exports = {
  extends: ['plugin:i18next/recommended'],
  rules: {
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        // Regexp pattern for values to ignore
        ignore: [
          'okta.com', // Okta owned pages
        ],
        // List of component attributes that DO NOT accept user-facing messages
        ignoreAttribute: [
          'classNames',
          'color',
          'data-se',
          'datase',
          'dataSe',
          'defaultSort',
          'descriptionKey',
          'direction',
          'fieldId',
          'icon',
          'link',
          'name', // input fields
          'overlayClassName',
          'placement',
          'position',
          'radioName',
          'selector',
          'size',
          'submitBtnType',
        ],
        // List of components that DO NOT accept user-facing messages
        ignoreComponent: [
          'ArrowBack',
          'BrowserRouter',
          'Drawer',
          'ExpandableRows',
          'GroupSearchSelectable',
          'ImportedDatePicker',
          'NavLink',
          'Route',
          'RouterLink',
          'SvgIcon',
        ],
      },
    ],
  },
};
