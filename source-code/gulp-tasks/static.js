/*jslint node:true, esnext: true*/
'use strict';

module.exports = function (gulp) {
    const merge = require('merge-stream');

    return function () {
        return merge(
            gulp.src('assets/img/**/*').pipe(gulp.dest('mapswipe.github.io/assets/img/')),
            gulp.src('assets/fonts/**/*').pipe(gulp.dest('mapswipe.github.io/assets/fonts/')),
            gulp.src(['assets/*.*', '!assets/*.shtml']).pipe(gulp.dest('mapswipe.github.io/'))
        );
    };
};
