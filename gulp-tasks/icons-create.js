/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    const glob = require('glob'),
          Grunticon = require('grunticon-lib');

    // grab the file paths
    let files = glob.sync('assets/img/svg/*.svg'),
        grunticon = new Grunticon(files, 'docs/assets/css/icons', {enhanceSVG: true});

    return function () {
        return grunticon.process();
    }
};