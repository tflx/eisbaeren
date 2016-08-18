var gulp = require('gulp');
var opts = require('../options');

gulp.task('images', function () {
  var plumber = require('gulp-plumber');
  var imagemin = require('gulp-imagemin');
  var errorHandler = require('../utils/error-handler');

  var paths = [
    opts.paths.src + '/**/{*.png,*.jpg,*.gif,*.svg}',
    '!' + opts.paths.static + '/**'
  ];

  return gulp.src(paths)
    .pipe(plumber(errorHandler))
    // .pipe(imagemin({
    //   progressive: true,
    //   svgoPlugins: [
    //     {removeViewBox: false},  //Need for IE resizing support
    //     {removeXMLProcInst: false}, //Need for files to be readable in Windows
    //     {cleanupIDs: false}
    //   ],
    // }))

    //Output all the images
    .pipe(gulp.dest(opts.paths.dist))
});