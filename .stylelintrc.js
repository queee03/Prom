module.exports = {
  extends: 'stylelint-config-ali',
  rules: {
    'selector-max-id': null,
  },
  overrides: [
    {
      files: '**/*.scss',
      customSyntax: require.resolve('postcss-scss'),
    },
    {
      files: '**/*.less',
      customSyntax: require.resolve('postcss-less'),
    },
    {
      files: '**/*.{html,vue}',
      customSyntax: require.resolve('postcss-html'),
    },
    {
      files: '**/*.css',
      customSyntax: require.resolve('postcss-safe-parser'),
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
