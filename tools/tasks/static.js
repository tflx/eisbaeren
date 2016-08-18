var gulp = require('gulp');
var opts = require('../options');

/**
 * Copy static files
 */
gulp.task('static', ()=> {
  return gulp.src(opts.paths.static + '/**/*.*', {})
    .pipe(gulp.dest(opts.paths.dist))
});