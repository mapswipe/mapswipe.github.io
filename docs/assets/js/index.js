(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
    function Navigation(element) {
        _classCallCheck(this, Navigation);

        this.root = element;

        this.bindEvents();
    }

    _createClass(Navigation, [{
        key: 'toggleNav',
        value: function toggleNav(e) {
            var icon = e.currentTarget;
            var mobileMenu = e.currentTarget.parentNode.parentNode;

            mobileMenu.classList.contains('active') ? this.closeNav(icon, mobileMenu) : this.openNav(icon, mobileMenu);
        }
    }, {
        key: 'openNav',
        value: function openNav(icon, mobileMenu) {
            mobileMenu.classList.add('active');
            icon.classList.add('active');
            document.querySelector('body').classList.add('menu-active');

            // mobileMenu.querySelector('.navlink:first-child').focus();
        }
    }, {
        key: 'closeNav',
        value: function closeNav(icon, mobileMenu) {
            mobileMenu.classList.remove('active');
            icon.classList.remove('active');
            document.querySelector('body').classList.remove('menu-active');
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            this.root.addEventListener('click', this.toggleNav.bind(this));
        }
    }]);

    return Navigation;
}();

exports.default = Navigation;

},{}],2:[function(require,module,exports){
'use strict';

var _navigation = require('./components/navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = document.querySelector('html');
var isMobile = false;
var resizeId = void 0;
// let menu = new Navigation(document.querySelector('.navigation'));

if (html.classList.contains('mobile')) {
    isMobile = true;
}

if (html.querySelector('#year')) {
    var theDate = new Date();
    html.querySelector('#year').innerHTML = theDate.getFullYear();
}

if (html.querySelector('.burger-menu')) {
    new _navigation2.default(html.querySelector('.burger-menu'));
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

function doneResizing() {
    device();
    viewport();

    var wasMobile = isMobile;

    html.classList.contains('mobile') ? isMobile = true : isMobile = false;

    if (wasMobile != isMobile) {
        // isMobile ? menu.closeDesktopSearch() : menu.closeMobileMenu();
    }
}

// Basic functions to add relevant classes to html tag
viewport();
device();
touchEnabled();

window.addEventListener('resize', function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

},{"./components/navigation.js":1}]},{},[2])

//# sourceMappingURL=index.js.map
