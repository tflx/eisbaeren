var webpack = require('webpack');
var merge = require('webpack-merge');
var commonConfig = require('./common.config.js');
var options = require('../options');

var devConfig = {
  debug: false,
  devtool: '#cheap-eval-source-map',
  plugins: []
};

/**
 * If HMR is enabled, add the needed configuration
 */
if (options.HMR) {
  devConfig.entry = {
    app: [
      // Add the client which connects to our middleware
      'webpack-hot-middleware/client?reload=true&noInfo=true',
      'react-hot-loader/patch'
    ]
  };
  devConfig.plugins = devConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
}

module.exports = merge.smart(commonConfig, devConfig);
