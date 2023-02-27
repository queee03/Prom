// https://www.npmjs.com/package/eslint-config-ali
// ESlint config for common ts project
module.exports = {
  extends: [
    // 'react-app',
    // 'react-app/jest',
    'eslint-config-ali/typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    'import/no-named-as-default': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
