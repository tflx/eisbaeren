var gulp = require('gulp');
var opts = require('../options');

gulp.task('storybook', function(done) {
  var spawn = require('child_process').spawn;
  if (opts.isProduction()) {
    var childProcess = spawn('npm', ['run', 'storybook:build'], { stdio: 'inherit' });
    childProcess.on('close', function(code) {
      done();
    });
  } else {
    spawn('npm', ['run', 'storybook'], { stdio: 'inherit' });
    done();
  }
});
