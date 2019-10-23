/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const imagemin = require('gulp-imagemin');

    return function () {
        return gulp.src('mapswipe.github.io/assets/img/**/*')
                .pipe(imagemin([
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.jpegtran({progressive: true}),
                    imagemin.optipng({optimizationLevel: 5}),
                    imagemin.svgo({plugins: [{removeViewBox: true}]})
                ]))
                .pipe(gulp.dest('mapswipe.github.io/assets/img'));
    };
};
