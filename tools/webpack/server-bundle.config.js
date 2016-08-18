var webpack = require('webpack');
var merge = require('webpack-merge');
var ProgressBarPlugin = require('./plugins/progressbar');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var opts = require('../options');

/**
 * Define config files
 */
var serverConfig = {
  target: 'node',
  devtool: "#sourcemap",
  entry: {
    "server.bundle": [
      './src/server'
    ]
  },
  output: {
    path: opts.paths.dist,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].min.css', {
      allChunks: true
    }),
    new ProgressBarPlugin({
      preamble: 'Bundling server ',
      clear: false,
      width: 40,
      renderThrottle: 50
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'server'"
      }
    })
  ]
};

serverConfig = merge.smart(serverConfig, require('./common.config.js'));

/**
 * Find all CSS loaders, and wrap them in ExtractTextPlugin, so they get extracted to .css files.
 * https://github.com/webpack/extract-text-webpack-plugin
 */
serverConfig.module.loaders.filter((loader) =>
  loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
).forEach((loader) => {
  var first = loader.loaders.shift();
  loader.loader = ExtractTextPlugin.extract(first, loader.loaders.join('!'));
  delete loader.loaders
});

module.exports = serverConfig;