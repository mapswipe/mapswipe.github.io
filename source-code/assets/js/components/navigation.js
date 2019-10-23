'use strict'

export default class Navigation {
    constructor(element) {
        this.root = element;

        this.bindEvents();
    }

    toggleNav(e) {
        var icon = e.currentTarget;
        var mobileMenu = e.currentTarget.parentNode.parentNode;

        (mobileMenu.classList.contains('active')) ? this.closeNav(icon, mobileMenu): this.openNav(icon, mobileMenu);
    }

    openNav(icon, mobileMenu) {
        mobileMenu.classList.add('active');
        icon.classList.add('active');
        document.querySelector('body').classList.add('menu-active');

        // mobileMenu.querySelector('.navlink:first-child').focus();
    }

    closeNav(icon, mobileMenu) {
        mobileMenu.classList.remove('active');
        icon.classList.remove('active');
        document.querySelector('body').classList.remove('menu-active');
    }

    bindEvents() {
        this.root.addEventListener('click', this.toggleNav.bind(this));
    }
}