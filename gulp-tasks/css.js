/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const plumber = require('gulp-plumber'),
        sass = require('gulp-sass'),
        postcss = require('gulp-postcss'),
        autoprefixer = require('autoprefixer'),
        nano = require('gulp-cssnano'),
        sourcemaps = require('gulp-sourcemaps'),
        bless = require('gulp-bless'),
        gulpif = require('gulp-if'),
        sassGlob = require('gulp-sass-glob'),
        cachebuster = require('postcss-cachebuster'),
        ltie9 = false,
        browserslist = require('browserslist'),
        browserMatrix = require('../package.json').browsers,
        supportedbrowsers = browserslist(browserMatrix),
        sassLint = require('gulp-sass-lint'),
        merge = require('merge-stream');
    
    let split = false;
    
    // if (supportedbrowsers.includes('ie 9') || supportedbrowsers.includes('ie 8') ) {
    //     split = true;
    // }
    
    return function () {
        let sasslint =  gulp.src(['assets/sass/*/**.scss'])
            .pipe(sassLint({
                options: {
                    formatter: 'stylish',
                    'merge-default-rules': true
                },
                configFile: '.sass-lint.yml'
            }))
            .pipe(sassLint.format()),
            
        sassbuild = gulp.src('assets/sass/*.scss')
            .pipe(sassGlob({
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss(
                [
                    autoprefixer({ browsers: browserMatrix, grid: true }),
                    cachebuster({
                        cssPath : 'docs/assets/css'
                    })
                ]
            ))
            .pipe(gulpif(split, bless()))
            .pipe(nano())
            .pipe(sourcemaps.write('./'))
            .pipe(plumber.stop())
            .pipe(gulp.dest('docs/assets/css'));
        
        return merge(sasslint, sassbuild);
    };
};
