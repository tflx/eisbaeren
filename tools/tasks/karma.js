var gulp = require('gulp');
var path = require('path');
var args = require('../args');

gulp.task('karma', function(done) {
	var Server = require('karma').Server;
	
	var opts = {
		configFile: path.resolve('karma.conf.js'),
		singleRun: !args.isWatching(),
		autoWatch: args.isWatching(),
	};

	var server = new Server(opts, function (exitCode) {
		if (opts.autoWatch || exitCode && !args.force) {
			process.exit(exitCode);
		} else {
			//Notify gulp that the task is complete
			done();
		}
	});
	server.start();

	//If watching, complete the task now.
	if (opts.autoWatch) {
		done();
	}
});