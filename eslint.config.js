const tseslint = require('typescript-eslint');
const eslintPluginPlaywright = require('eslint-plugin-playwright');

module.exports = tseslint.config(
  ...tseslint.configs.recommended,
  eslintPluginPlaywright.configs['flat/recommended'],
);
