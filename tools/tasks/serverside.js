var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var opts = require('../options');
var errorHandler = require('../utils/error-handler');

function cleanup() {
  //Delete the css files - Just use the app.min.css file - But webpack wants to extract them
  del.sync(opts.paths.dist + '/css/server*');
}

function expose() {
  var exportGlobalVars = require('../utils/export-global');
  exportGlobalVars(opts.paths.src + '/exports.js', opts.paths.dist + '/js/server.bundle.js')
}

function test(done) {
  var spawn = require('child_process').spawn;
  var childProcess = spawn('node', ['serverside/serverside-test.js'], { stdio: 'inherit' });
  childProcess.on('close', function(code) {
    if (code > 0 && !opts.isWatching()) {
      process.exit(code);
    }
    if (done) done();
  });
}

gulp.task('serverside', (done) => {
  var originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'server';

  var webpack = require('webpack');
  var config = require('../webpack/server-bundle.config');
  var compiler = webpack(config);


  if (opts.isWatching()) {
    // You should run the 'server' instead
    compiler.watch({}, (err, stats) => {
      if (stats.hasErrors()) {
        console.log(stats.toString({
          // output options
          timings: false,
          hash: false,
          version: false,
          assets: false,
          chunkModules: false
        }));
      } else {
        gutil.log('Server bundle compiled in:', gutil.colors.magenta(stats.endTime - stats.startTime + ' ms'));
      }

      cleanup();
      expose();
      test(done);
      if (done) {
        done = null;
      }
    });
  } else {
    compiler.run((err, stats) => {
      process.env.NODE_ENV = originalEnv;

      if (err) {
        errorHandler(new gutil.PluginError('serverside', err));
      } else {
        if (stats.hasErrors()) {
          errorHandler(new Error('Failed to package the server bundle. See terminal for details.'));
        }

        cleanup();
        expose();
        test(done);
      }
    })
  }
});