var webpack = require('webpack');
var merge = require('webpack-merge');
var opts = require('./tools/options');
var ip = require('./tools/utils/ip');
var DEBUG = opts.isDevelopment();

/**
 * Define config files
 */
var clientConfig = {
  entry: {
    app: [
      './src/app'
    ]
  },
  output: {
    path: opts.paths.dist,
    filename: DEBUG ? '[name].js' : 'js/[name].min.js',
    publicPath: DEBUG ? 'http://' + ip() + ':3000/' : '/'
  }
};

if (DEBUG) {
  clientConfig = merge.smart(require('./tools/webpack/dev.config'), clientConfig);
} else {
  clientConfig = merge.smart(require('./tools/webpack/prod.config'), clientConfig)
}

module.exports = clientConfig;