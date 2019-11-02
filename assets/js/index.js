'use strict';

import Navigation from './components/navigation.js';

let html = document.querySelector('html');
let isMobile = false;
let resizeId;  
// let menu = new Navigation(document.querySelector('.navigation'));

if (html.classList.contains('mobile')) {        
    isMobile = true;
}

if (html.querySelector('#year')) {
    var theDate = new Date();
    html.querySelector('#year').innerHTML =theDate.getFullYear();
}

if (html.querySelector('.burger-menu')) {
    new Navigation(html.querySelector('.burger-menu'));
}

// Basic classes to add relevant classes to html tag
function classRemove(element, classes) {
    classes.forEach(function (clas) {
        element.classList.remove(clas);
    });
}

function viewport() {
    var width = document.body.clientWidth,
        viewport = 'default';

    if (width >= 1344) {
        viewport = 'desktop-wide';

    }
    if (width < 1344) {
        viewport = 'desktop-compact';

    }
    if (width < 1024) {
        viewport = 'tablet-portrait';

    }
    if (width < 768) {
        viewport = 'mobile-landscape';

    }
    if (width < 481) {
        viewport = 'mobile-portrait';

    }

    classRemove(html, ['default', 'desktop-compact', 'tablet-portrait', 'mobile-landscape', 'mobile-portrait']);
    html.classList.add(viewport);

    return viewport;
}

function touchEnabled() {
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
        html.classList.add('touchenabled');
        return true;
    }
    html.classList.remove('touchenabled');
    return false;
}

function device() {
    var device = 'desktop';
    switch (viewport()) {
        case 'desktop-compact':
            device = 'desktop';
            if (touchEnabled()) {
                device = 'tablet';
            }
            break;
        case 'tablet-portrait':
            device = 'tablet';
            break;
        case 'mobile-landscape':
        case 'mobile-portrait':
            device = 'mobile';
            break;
    }
    classRemove(html, ['mobile', 'tablet', 'tablet-portrait', 'desktop']);
    html.classList.add(device);

    return device;
}

function doneResizing(){
    device();
    viewport();

    let wasMobile = isMobile;

    html.classList.contains('mobile') ? isMobile = true : isMobile = false;

    if (wasMobile != isMobile) {
        // isMobile ? menu.closeDesktopSearch() : menu.closeMobileMenu();
    }
}

// Basic functions to add relevant classes to html tag
viewport();
device();
touchEnabled();     

window.addEventListener('resize', function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

