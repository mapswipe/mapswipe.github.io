/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const clean = require('gulp-clean');

    return function () {
        return gulp.src(['./assets/css/icons/preview.html',
                './assets/css/icons/grunticon.loader.js',
                './assets/css/icons/icons.data.png.css',
                './assets/css/icons/icons.fallback.css',
                './assets/css/icons/png/',])
            .pipe(clean({force: true}));
    };
};
