var args = require('../args');
var gutil = require('gulp-util');
var notifier = require('node-notifier');

module.exports = function(err, kill) {
  if (typeof kill === 'undefined') kill = true;
  err = err || {};
  var name = err.name;
  if (name !== 'Error') {
    console.log(gutil.colors.cyan(name) + ':');
  }
  console.log(gutil.colors.red(err.message));

  notifier.notify({
    title: name || err.plugin || 'Error',
    message: err.message,
    sound: "Submarine",
  });

  /**
   * Stop the stream on error
   */
  if (kill && !args.isWatching() && !args.force) {
    process.exit(1);
  } else {
    if (typeof this.emit != "undefined") {
      this.emit('end');
    }
  }
};
