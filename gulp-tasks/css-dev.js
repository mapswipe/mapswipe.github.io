/*jslint node:true, esnext: true */
'use strict';

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

module.exports = function (gulp) {
    const plumber = require('gulp-plumber'),
        sass = require('gulp-sass'),
        postcss = require('gulp-postcss'),
        autoprefixer = require('autoprefixer'),
        nano = require('gulp-cssnano'),
        sassGlob = require('gulp-sass-glob'),
        sourcemaps = require('gulp-sourcemaps'),
        sassLint = require('gulp-sass-lint'),
        browserslist = require('browserslist'),
        browserMatrix = require('../package.json').browsers,
        merge = require('merge-stream'),
        browserSync = require('browser-sync');

    return function () {
        let sasslint = gulp.src(['assets/sass/*/**.scss'])
            .pipe(sassLint({
                options: {
                    formatter: 'stylish',
                    'merge-default-rules': true
                },
                configFile: '.sass-lint.yml'
            }))
            .pipe(sassLint.format()),
            
            sassbuild = gulp.src('assets/sass/*.scss')
                .pipe(sassGlob())
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(postcss(
                    [
                        autoprefixer({ browsers: browserMatrix, grid: true })
                    ]
                ))
                .on('error', swallowError)
                .pipe(sourcemaps.write('./'))
                .pipe(plumber.stop())
                .pipe(gulp.dest('docs/assets/css'))
                .pipe(browserSync.stream());

         return merge(sasslint, sassbuild);
    };
};

