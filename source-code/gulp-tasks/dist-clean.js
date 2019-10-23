/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const clean = require('gulp-clean');

    return function () {
        return gulp.src('mapswipe.github.io/')
            .pipe(clean({force: true}));
    };
};
