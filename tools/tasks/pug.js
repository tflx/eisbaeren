var gulp = require('gulp');
var opts = require('../options');
var pugData = require('../utils/jade-data');
var errorHandler = require('../utils/error-handler');

gulp.task('pug', ()=> {
  var plumber = require('gulp-plumber');
  var pug = require('gulp-pug');
  var data = require('gulp-data');

  return gulp.src(opts.paths.src + '/**/!(_)*.{pug,jade}')
    .pipe(plumber(errorHandler))
    .pipe(data(getData))
    .pipe(pug())
    .pipe(gulp.dest(opts.paths.dist))
});

function getData(file) {
  return pugData.getData(file.path);
}