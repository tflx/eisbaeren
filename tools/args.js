var gutil = require('gulp-util');
var gulpTasks = gutil.env._;

//Check for release or production target flag
if (gulpTasks.indexOf('build') > -1 || gulpTasks.indexOf('deploy') > -1 || gulpTasks.indexOf('release') > -1 ||
    gutil.env['release'] || gutil.env['production'] || gutil.env['prod'] || gutil.env['target'] == 'production') {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

if (gutil.env['development'] || gutil.env['dev'] || gutil.env['target'] == 'dev') {
  process.env.NODE_ENV = 'development';
}

process.env.WATCHING = gutil.env['watch'] ? 'true' : 'false';

var force = gutil.env['force'];

module.exports = {
  force: force,
  setWatchMode: function() {
    process.env.WATCHING = 'true';
  },
  //Find all vendor modules used as dependencies, and return array.
  isDevelopment: function() {
    return process.env.NODE_ENV == 'development';
  },
  isProduction: function() {
    return process.env.NODE_ENV == 'production';
  },
  isWatching: function() {
    return process.env.WATCHING === 'true';
  }
};