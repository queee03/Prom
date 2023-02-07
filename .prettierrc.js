module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  importOrder: [
    '^react(.*)$',
    '^umi(.*)$',
    '^ice(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^(?!.*(.css|.less|.sass|.scss|.jpg|.png|.gif|.svg|.jpeg|.bmp|.webp|.tiff|.ico|@/services))(@/.*)',
    '^(?!.*(.css|.less|.sass|.scss|.jpg|.png|.gif|.svg|.jpeg|.bmp|.webp|.tiff|.ico))(@/services.*)',
    '^(?!.*(.css|.less|.sass|.scss|.jpg|.png|.gif|.svg|.jpeg|.bmp|.webp|.tiff|.ico))(..?/.*)',
    '(.jpg|.png|.gif|.svg|.jpeg|.bmp|.webp|.tiff|.ico)$',
    '(.css|.less|.sass|.scss)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    '["decorators", { "decoratorsBeforeExport": true }]',
  ],
};
