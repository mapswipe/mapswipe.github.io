/*jslint node:true, esnext: true*/
'use strict';

module.exports = function (gulp) {
    const merge = require('merge-stream');

    return function () {
        return merge(
            gulp.src('assets/img/**/*').pipe(gulp.dest('docs/assets/img/')),
            gulp.src('assets/fonts/**/*').pipe(gulp.dest('docs/assets/fonts/')),
            gulp.src(['assets/*.*', '!assets/*.shtml']).pipe(gulp.dest('docs/'))
        );
    };
};
