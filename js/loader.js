"use strict";
class Loader {
    constructor(eventToWaitFor = 'load') {
        this.loaderElement = {};
        this.innerLoaderElement = {};
        this.hiddenClassName = 'hidden';
        this.negativeIndexClassName = 'negative-index';
        this.noScrollClassName = 'no-scroll';
        window.addEventListener(eventToWaitFor, (event) => {
            this.init();
            this.hide(1000);
        });
    }
    init() {
        this.loaderElement = document.querySelector('.loader');
        this.innerLoaderElement = document.querySelector('.inner-loader');
    }
    // Public
    show() {
        this.showLoader();
        this.showInnerLoader();
        this.disableScroll();
    }
    hide(timeout = 0) {
        // First timeout: inner loader
        setTimeout(() => {
            this.hideInnerLoader();
            // Second timeout: loader
            setTimeout(() => {
                this.hideLoader();
                // Third timeout: negative index + scroll
                setTimeout(() => {
                    this.applyLoaderNegativeIndex();
                    this.enableScroll();
                    this.triggerLoadedEvent();
                }, 501); // CSS animation time + 1ms
            }, timeout / 2);
        }, timeout / 2);
    }
    // Private
    showLoader() {
        this.loaderElement.classList.remove(this.hiddenClassName);
        this.loaderElement.classList.remove(this.negativeIndexClassName);
    }
    hideLoader() {
        this.loaderElement.classList.add(this.hiddenClassName);
    }
    applyLoaderNegativeIndex() {
        this.loaderElement.classList.add(this.negativeIndexClassName);
    }
    showInnerLoader() {
        this.innerLoaderElement.classList.remove(this.hiddenClassName);
    }
    hideInnerLoader() {
        this.innerLoaderElement.classList.add(this.hiddenClassName);
    }
    enableScroll() {
        document.body.classList.remove(this.noScrollClassName);
        document.documentElement.classList.remove(this.noScrollClassName);
    }
    disableScroll() {
        document.body.classList.add(this.noScrollClassName);
        document.documentElement.classList.add(this.noScrollClassName);
    }
    triggerLoadedEvent() {
        const loaderHiddenEvent = new CustomEvent('loader-hidden', {
            detail: {},
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        window.dispatchEvent(loaderHiddenEvent);
    }
}
