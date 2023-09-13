const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.plugins = [
    ...config.plugins,
    new webpack.EnvironmentPlugin([
      'EXPO_PUBLIC_API_URL'
    ])
  ]
  return config;
};
