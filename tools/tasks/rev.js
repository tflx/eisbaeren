var opts = require('../options');
var gulp = require('gulp');

gulp.task('rev-create', [], createRevision);
gulp.task('rev', ['rev-create'], revReplace);

/**
 * Create a hash revision of the files
 * @returns {*}
 */
function createRevision() {
  var rev = require('gulp-rev');
  var filter = require('gulp-filter');
  var plumber = require('gulp-plumber');

  //RegEx that detects files with rev hash in the file name.
  var hashRegEx = new RegExp('^(.*)-[0-9a-f]{8,10}');

  return gulp.src([opts.paths.dist + "/{js,css}/**/*.min.{js,css}"], {base: opts.paths.dist})
    .pipe(plumber())
    .pipe(filter(function (file) {
      return !hashRegEx.test(file.path);
    }))
    .pipe(rev())
    .pipe(gulp.dest(opts.paths.dist))

    //Write files in the pipe to manifest.json file.
    .pipe(rev.manifest())
    .pipe(gulp.dest(opts.paths.dist))
}

/**
 * Updates references in HTML
 **/
function revReplace() {
  var revReplace = require('gulp-rev-replace');
  var manifestJson = gulp.src(opts.paths.dist + "/rev-manifest.json");

  return gulp.src(opts.paths.dist + "/**/*.html")
    .pipe(revReplace({manifest: manifestJson}))
    .pipe(gulp.dest(opts.paths.dist));
}