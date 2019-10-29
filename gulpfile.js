/*jslint node:true, esnext: true */
'use strict';

const path = require('path'),
      gulp = require('gulp'),
      tasksPath = path.join(__dirname, 'gulp-tasks'),
      gulpSequence = require('gulp-sequence');

// Load all gulp tasks, using the name of each file in the tasksPath as the name of the task.
require('fs').readdirSync(tasksPath).forEach(
    function (filename) {
        gulp.task(path.basename(filename, '.js'), require(path.join(tasksPath, filename))(gulp));
    }
);

gulp.task('build', gulpSequence('dist-clean', ['html', 'css', 'js', 'static']));
//gulp.task('build', gulpSequence('dist-clean', ['html', 'css', 'js', 'static'], 'icons', 'css-critical'));
gulp.task('build-dev', [ 'css-dev', 'js-dev', 'static', 'html']);
gulp.task('watch', ['build-dev', 'css-watch', 'js-watch', 'static-watch', 'html-watch']);
gulp.task('develop', ['build-dev', 'watch', 'server']);
gulp.task('default', ['build']);
gulp.task('icons', gulpSequence('icons-svgo', 'icons-update-page', 'icons-create', 'icons-clean'));