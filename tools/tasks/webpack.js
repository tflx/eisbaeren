var gulp = require('gulp');
var gutil = require('gulp-util');
var args = require('../args');
var errorHandler = require('../utils/error-handler');

gulp.task('webpack', (done) => {
  var webpack = require('webpack');
  var config = require('../../webpack.config');
  var compiler = webpack(config);
  
  if (args.isWatching()) {
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
        gutil.log('Webpack compiled in:', gutil.colors.magenta(stats.endTime - stats.startTime + ' ms'));
      }

      if (done) {
        done();
        done = null;
      }
    });
  } else {
    compiler.run((err, stats) => {
      if (err) {
        errorHandler(new gutil.PluginError("webpack", err));
      } else {
        console.log(stats.toString({
          // output options
          colors: true,
          timings: true,
          assets: true,
          modules: false,
          reasons: true,
          chunks: false,
          children: false,
          chunkModules: false
        }));

        if (stats.hasErrors()) {
          errorHandler(new Error('Failed to package the application. See terminal for details.'));
        }
        done();
      }
    })
  }
});