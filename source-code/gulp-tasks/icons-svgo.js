/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const svgo = require('gulp-svgo'),
          glob = require('glob');

    return function () {
        return gulp.src('assets/img/svg/src/*.svg')
            .pipe(svgo({
            	plugins: [{
                    removeUnknownsAndDefaults: false
                }, {
                    addAttributesToSVGElement: {
            			attribute: 'focusable="false"'  
                    }
                }, {
                    cleanupIDs: {
                        remove: false
                    }
                }]
            }))
            .pipe(gulp.dest('assets/img/svg/'));
    };
};
