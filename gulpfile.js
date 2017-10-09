/* global __dirname */
var gulp = require('gulp');
var gutil = require('gulp-util');
var args = require('./tools/args');
var sequence = require('run-sequence');
require('require-all')(__dirname + '/tools/tasks');

gutil.log("Target ENV: " + gutil.colors.green(process.env.NODE_ENV));

/**
 * Define gulp tasks
 */
gulp.task('dev', (done) => {
  args.setWatchMode();
  sequence('clean', 'browsersync', 'stylelint', 'eslint', done);
});

gulp.task('build', (done) => {
  sequence('clean', 'webpack', 'pug', 'images', 'static', done);
});

gulp.task('release', (done) => {
  sequence('eslint', 'build', 'rev', 'size', done);
  // sequence('eslint', 'karma', 'build', 'serverside', 'storybook', 'rev', 'size', done)
});

gulp.task('test', (done) => {
  args.setWatchMode();
  sequence('karma', 'storybook', done)
});

gulp.task('default', ['dev']);
