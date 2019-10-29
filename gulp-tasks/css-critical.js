/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const critical = require('critical');

    return function () {
        return critical.generate({
	        inline: false,
	        base: 'docs/',
	        src: 'docs/index.html',
	        css: 'docs/assets/css/main.css',
	        dest: 'docs/assets/css/critical.css',
	        minify: true,
	        width: 1920,
	        height: 900
	    });

//        return gulp.src('docs/markup/layouts/ml01-prototype.html')
//            .pipe(critical({base: 'docs/', inline: false, css: 'docs/assets/css/main.css',minify: true, width: 1920,height: 800}))
//            .pipe(gulp.dest('docs/assets/css/'));
    };
};