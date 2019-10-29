/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const plumber = require('gulp-plumber'),
        html = require('gulp-html-ssi'),
        rename = require('gulp-rename'),
        path = require('path'),
        browserSync = require('browser-sync');

    return function () {
         return gulp.src(['./*.shtml','./**/*.shtml'])
            .pipe(html({root: path.resolve('./')}))
            .pipe(rename(function (path) {
                path.extname = ".html";
            }))
            .pipe(gulp.dest('docs/'));
    };
};
