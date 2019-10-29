/*eslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const sourcemaps = require('gulp-sourcemaps'),
        jslint = require('gulp-jshint'),
        browserify = require('browserify'),
        merge = require('merge-stream'),
        babelify = require('babelify'),
        stylish = require('jshint-stylish'),
        browserSync = require('browser-sync'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer');

    return function () {
        let jslinted =
                gulp.src(['assets/js/*.js'])
                //gulp.src(['assets/js/components/*.js', 'assets/js/framework*.js'])
                .pipe(jslint())
                .pipe(jslint.reporter(stylish)),

            browserified = browserify({
                    entries: 'assets/js/index.js', 
                    debug: true
                })
                .transform("babelify", {presets: [["env", {"targets": {"browsers": ["last 2 versions"]}}]]})
                .bundle()
                .pipe(source('index.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('docs/assets/js/'))
                .pipe(browserSync.stream()),
            
            serviceWorker = browserify({
                    entries: 'assets/js/serviceWorker.js', 
                    debug: true
                })
                .transform("babelify", {presets: [["env", {"targets": {"browsers": ["last 2 versions"]}}]]})
                .bundle()
                .pipe(source('serviceWorker.js'))
                .pipe(buffer())
                .pipe(gulp.dest('docs/'));

        return merge(jslinted, browserified, serviceWorker);
    };
};
