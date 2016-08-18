var webpack = require('webpack');
var chalk = require('chalk');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProgressBarPlugin = require('./plugins/progressbar');
var pck = require('../../package.json');
var opts = require('../options');
var commonConfig = require('./common.config.js');
var path = require('path');

var prodConfig = {
  devtool: '#sourcemap',
  plugins: [
    new ProgressBarPlugin({
      clear: false,
      width: 40,
      renderThrottle: 50
    }),

    // Output extracted CSS to a file
    new ExtractTextPlugin('css/[name].min.css', {
      allChunks: true
    }),

    // Search for equal or similar files and deduplicate them in the output
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    new webpack.optimize.DedupePlugin(),

    // Minimize all JavaScript output of chunks
    // https://github.com/mishoo/UglifyJS2#compressor-options
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),

    // A plugin for a more aggressive chunk merging strategy
    // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
    new webpack.optimize.AggressiveMergingPlugin(),
  ]
};

var vendorModules = getVendorModules();
if (vendorModules) {
  prodConfig.entry = {
    vendor: vendorModules
  };

  // Extract vendor files
  prodConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.min.js'));
}

/**
 * Return an array with package dependencies
 * @returns {Object}
 */
function getVendorModules() {
  if (!opts.vendorModules) return null;
  if (opts.vendorModules === true) {
    var vendorModules = [];
    var ignore = opts.excludeFromVendor || [];
    Object.keys(pck.dependencies).forEach((key) => {
      if (ignore.indexOf(key) == -1) {
        vendorModules.push(key);
      }
    });
    return vendorModules;
  } else {
    return opts.vendorModules;
  }
}

/**
 * Extract the public CSS path, by looking at the Extract CSS Plugin
 */
var extractPlugin = prodConfig.plugins.find((plugin => plugin instanceof ExtractTextPlugin));
var cssPublicPath = path.relative(path.parse(opts.paths.dist + '/' + extractPlugin.filename).dir, opts.paths.dist)  + '/';

/**
 * Find all CSS loaders, and wrap them in ExtractTextPlugin, so they get extracted to .css files.
 * https://github.com/webpack/extract-text-webpack-plugin
 */
commonConfig.module.loaders.filter((loader) =>
  loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
).forEach((loader) => {
  var first = loader.loaders.shift();
  loader.loader = ExtractTextPlugin.extract(first, loader.loaders.join('!'), {
    publicPath: cssPublicPath
  });
  delete loader.loaders
});

module.exports = merge.smart(commonConfig, prodConfig);