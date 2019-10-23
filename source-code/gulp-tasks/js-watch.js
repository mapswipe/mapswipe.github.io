/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const watch = require('gulp-watch');

    return function () {
        return watch(['assets/js/**/*.js', '!assets/js/lib/**'], function () {
            gulp.start('js-dev');
        });
    };
};
