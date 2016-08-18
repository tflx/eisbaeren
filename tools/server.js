var browserSync          = require('browser-sync').create();
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var apiMiddleware        = require('./middleware/api-middleware');
var jadeMiddleware       = require('./middleware/jade-middleware');
/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('../webpack.config');
var bundler = webpack(webpackConfig);
var opts = require('./options');

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
  server: {
    baseDir: 'src',
    middleware: [
      // See: http://webpack.github.io/docs/webpack-dev-middleware.html
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          timings: false,
          hash: false,
          version: false,
          assets: false,
          chunkModules: false
        },
        quiet: false, //Stay quiet, even if compile fails
        noInfo: true
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),
      apiMiddleware({
        base: opts.paths.api,
        endpoint: opts.apiEndpoint
      }),
      jadeMiddleware({
        base: opts.paths.src,
        data: require('./utils/jade-data').getData
      }, true)
    ]
  },
  serveStatic: [opts.paths.src + '/static'],
  logLevel: 'info',
  logPrefix: 'BrowserSync',
  logFileChanges: true,
  notify: false,
  open: false,
  files: [
    'src/**/*.html',
    'src/**/*.{jade,pug}'
  ]
});

module.exports = browserSync;