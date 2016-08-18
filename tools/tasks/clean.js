var gulp = require('gulp');

/**
 * Simple task that deletes everything in the 'dist' directory. Use to ensure a clean release build.
 */
gulp.task('clean', () => {
  var del = require('del');
  var config = require('../options');

  //Delete the dist directory
  del.sync(config.paths.dist);
});