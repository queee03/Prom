const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
  overrideDevServer,
} = require('customize-cra');
const path = require('path');

const devServerConfig = () => (config) => {
  return {
    ...config,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  };
};

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    addDecoratorsLegacy(),
  ),
  devServer: overrideDevServer(devServerConfig()),
};
