/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const server = require('gulp-server-livereload'),
          browserSync = require('browser-sync');
    
    var htmlTimeout;

    return function () {
        browserSync.init({
            server: {
                baseDir: "docs/"
            },
            port: 8090
        });
        
        gulp.watch("docs/**/*.html").on('change', function () {
            clearTimeout(htmlTimeout);
            htmlTimeout = setTimeout(browserSync.reload, 150);
        });
    };
};
