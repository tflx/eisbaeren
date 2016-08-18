var gulp = require('gulp');

/**
 * Print the Size of the files in the dist directory
 * @returns {*}
 */
gulp.task('size', function() {
	var size = require('gulp-size');
	var filter = require('gulp-filter');
	var opts = require('../options');

	//RegEx that detects files with rev hash in the file name.
	var hashRegEx = new RegExp('^(.*)-[0-9a-f]{8,10}');

	return gulp.src(opts.paths.dist + '/**/*.{css,js}' )
		.pipe(filter(function(file) {
			return !hashRegEx.test(file.path);
		}))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
});
