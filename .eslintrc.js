// https://www.npmjs.com/package/eslint-config-ali
// ESlint config for common ts project
module.exports = {
  extends: ['eslint-config-ali/typescript', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'import/no-named-as-default': 0,
  },
};
