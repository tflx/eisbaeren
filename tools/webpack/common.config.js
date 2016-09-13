var webpack = require('webpack');
var path = require('path');
var args = require('../args');
var opts = require('../options');
var getCSSLoaders = require('./loader/css-module-loader');

var webpackConfig = {
  name: 'client',
  target: 'web',
  resolve: {
    //Use resolve-root, so 'src' acts as the root for imports. http://webpack.github.io/docs/configuration.html#resolve-root
    root: opts.paths.src,
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [] //Added below
  }
};

/**
 * Basic plugins
 */
webpackConfig.plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

/**
 * JS Loader
 */
webpackConfig.module.loaders.push({
  test   : /\.jsx?$/,
  include: opts.paths.src,
  exclude: /(node_modules)/,
  loader : 'babel-loader',
  query  : {
    cacheDirectory: args.isWatching()
  }
});

/**
 * PostCSS modules to apply
 */
webpackConfig.postcss = (webpack) => {
  return [
    require('postcss-import')({
      addDependencyTo: webpack,
      path: ['src'],
    }),
    require('postcss-simple-vars')({
      onVariables: function (variables) {
        // console.log('CSS Variables');
        // console.log(JSON.stringify(variables, null, 2));
      },
      unknown: function (node, name, result) {
        node.warn(result, 'Unknown variable ' + name);
      }
    }),
    require('postcss-calc'),
    // require('lost'),
    require('postcss-focus'),
    require('postcss-responsive-type'),
    require('precss'),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE 10']
    }),
    require('postcss-reporter')({
      clearMessages: true,
      throwError   : args.isProduction(),
    })
  ];
};

/**
 * Add CSS loaders. Kept in separate file to keep this file smaller
 */
webpackConfig.module.loaders = webpackConfig.module.loaders.concat(getCSSLoaders());

/**
 * Markodown Loader
 */
webpackConfig.module.loaders.push({
  test  : /\.md$/,
  loader: 'html!markdown'
});

/**
 * JSON Loader
 */
webpackConfig.module.loaders.push({
  test  : /\.json$/,
  loader: 'json-loader'
});

/**
 * SVG Loader
 */
webpackConfig.module.loaders.push({
  test: /\.svg$/,
  loader: 'svg-inline?removeTags=true&removeSVGTagAttrs=true',
  include: opts.paths.src,
  exclude: /(fonts)/,
});

/**
 * Fonts Loader
 */
webpackConfig.module.loaders.push({
  test: /fonts\/.*\.(woff|woff2|eot|ttf)$/,
  include: opts.paths.src,
  loader: 'file-loader?name=fonts/[name].[ext]',
});

//Export the config
module.exports = webpackConfig;