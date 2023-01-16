"use strict";
class Menu {
    constructor() {
        this.button = {};
        this.nav = {};
        this.openClassName = 'open';
        // Public
        this.toggle = (event) => {
            event.preventDefault();
            this.nav.classList.toggle(this.openClassName);
            this.button.classList.toggle(this.openClassName);
        };
        this.close = (event) => {
            this.nav.classList.remove(this.openClassName);
            this.button.classList.remove(this.openClassName);
        };
        // Private
        this.removeHashFromWindowLocation = (event) => {
            // Wait 5ms in order to work properly
            setTimeout(() => {
                let uri = window.location.toString();
                if (uri.indexOf('#') > 0) {
                    let uriWithoutHash = uri.substring(0, uri.indexOf('#'));
                    window.history.replaceState({}, document.title, uriWithoutHash);
                }
            }, 5);
        };
        window.addEventListener('load', () => {
            this.init();
        });
    }
    init() {
        this.button = document.querySelector('#hamburger');
        this.nav = document.querySelector('nav');
        this.button.addEventListener('click', this.toggle);
        const elementsExceptHeader = document.querySelectorAll('section, footer');
        elementsExceptHeader.forEach(elementExceptHeader => elementExceptHeader.addEventListener('click', this.close));
        const links = document.querySelectorAll('.nav-links');
        for (const link of links) {
            link.addEventListener('click', this.close);
            link.addEventListener('click', this.removeHashFromWindowLocation);
        }
        const socialLinks = document.querySelectorAll('.social-links');
        socialLinks.forEach(socialLink => socialLink.addEventListener('click', this.close));
        window.addEventListener('resize', this.close);
        window.addEventListener('scroll', this.close);
    }
}
const menu = new Menu();
