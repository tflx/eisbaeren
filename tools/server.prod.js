var browserSync = require('browser-sync').create();
var apiMiddleware = require('./middleware/api-middleware');
var opts = require('./options');

/**
 * Production server, to host the dist directory
 */
browserSync.init({
  server: {
    baseDir: 'dist',
  },
  middleware: [
    apiMiddleware({
      base: opts.paths.api,
      endpoint: opts.apiEndpoint
    }),
  ],
  logLevel: 'info',
  logPrefix: "BrowserSync",
  logFileChanges: true,
  notify: false,
  open: false,
  files: [
    'dist/**/*.*'
  ]
});

module.exports = browserSync;