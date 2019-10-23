/*jslint node:true, esnext: true */
'use strict';

module.exports = function (gulp) {
    return function () {
        require('../update-icons-list');
    };
};
