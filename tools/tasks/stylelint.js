var args = require('../args');
var opts = require('../options');
var gulp = require('gulp');
var errorHandler = require('../utils/error-handler');

gulp.task('stylelint', function() {
  //If watch mode, start watching for changes.
  if (args.isWatching()) {
    var watch = require('gulp-watch');
    watch([opts.paths.src + '/**/*.{css,scss}', '.stylelintrc'], runLinter);
  }

  return runLinter();
});

function runLinter() {
  var gutil = require('gulp-util');
  var cache = require('gulp-cached');
  var plumber = require('gulp-plumber');
  var postcss = require('gulp-postcss');
  var scssSyntax = require('postcss-scss');

  return gulp.src([opts.paths.src + '/**/*.{css,scss}', '!**/spritesheet.css'])
    .pipe(plumber(errorHandler))
    .pipe(args.isWatching() ? cache('linting') : gutil.noop()) // Ignore unchanged files
    .pipe(postcss([
      require('stylelint')({ /* your options */ }),
      require('postcss-reporter')({
        clearMessages: true,
        throwError   : !args.isWatching(),
      })], {syntax: scssSyntax})
    )
}