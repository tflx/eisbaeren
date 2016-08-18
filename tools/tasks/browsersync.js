var gulp = require('gulp');
var args = require('../args');

gulp.task('browsersync', function(done) {
  var browsersync;
  if (args.isProduction()) {
    browsersync = require('../server.prod');
  } else {
    browsersync = require('../server');
  }
  
  browsersync.emitter.on('init', () => done());
});
