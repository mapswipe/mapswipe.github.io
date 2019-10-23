/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const critical = require('critical');

    return function () {
        return critical.generate({
	        inline: false,
	        base: 'mapswipe.github.io/',
	        src: 'mapswipe.github.io/index.html',
	        css: 'mapswipe.github.io/assets/css/main.css',
	        dest: 'mapswipe.github.io/assets/css/critical.css',
	        minify: true,
	        width: 1920,
	        height: 900
	    });

//        return gulp.src('mapswipe.github.io/markup/layouts/ml01-prototype.html')
//            .pipe(critical({base: 'mapswipe.github.io/', inline: false, css: 'mapswipe.github.io/assets/css/main.css',minify: true, width: 1920,height: 800}))
//            .pipe(gulp.dest('mapswipe.github.io/assets/css/'));
    };
};