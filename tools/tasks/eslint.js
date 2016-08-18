var path = require('path');
var opts = require('../options');
var gulp = require('gulp');
var errorHandler = require('../utils/error-handler');
var resultCache = {};

gulp.task('eslint', function() {
  //If watch mode, start watching for changes.
  if (opts.isWatching()) {
    var watch = require('gulp-watch');
    watch([opts.paths.src + '/**/*.{js,jsx}', '.eslintrc'], runLinter);
  }

  return runLinter();
});

function runLinter() {
  var gutil = require('gulp-util');
  var cache = require('gulp-cached');
  var plumber = require('gulp-plumber');
  var eslint = require('gulp-eslint');

  return gulp.src(opts.paths.src + '/**/*.{js,jsx}')
    .pipe(plumber(errorHandler))
    .pipe(opts.isWatching() ? cache('linting') : gutil.noop()) // Ignore unchanged files
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(opts.isWatching() ? eslint.result(function (result) {
      var cachedResult = resultCache[result.filePath];
      if (cachedResult && (cachedResult.warningCount || cachedResult.errorCount)) {
        // Cached result has errors/warnings
        if (!result.warningCount && !result.errorCount) {
          var file = path.relative(opts.paths.src, result.filePath);
          console.log(gutil.colors.bold.green('✓ ') + file);
        }
      }

      resultCache[result.filePath] = result;
    }) : gutil.noop())
    .pipe(!opts.isWatching() ? eslint.failAfterError() : gutil.noop())
}