class Loader
{
    private loaderElement : HTMLElement = {} as HTMLElement;
    private innerLoaderElement : HTMLElement = {} as HTMLElement;

    private hiddenClassName : string = 'hidden';
    private negativeIndexClassName : string = 'negative-index';
    private noScrollClassName : string = 'no-scroll';

    constructor(eventToWaitFor : string = 'load')
    {
        window.addEventListener(eventToWaitFor, (event) =>
        {
            this.init();
            this.hide(1000);
        });
    }

    private init() : void
    {
        this.loaderElement = document.querySelector('.loader') as HTMLElement;
        this.innerLoaderElement = document.querySelector('.inner-loader') as HTMLElement;
    }

    // Public
    public show() : void
    {
        this.showLoader();
        this.showInnerLoader();
        this.disableScroll();
    }

    public hide(timeout : number = 0) : any
    {
        // First timeout: inner loader
        setTimeout(() =>
        {
            this.hideInnerLoader();

            // Second timeout: loader
            setTimeout(() =>
            {
                this.hideLoader();

                // Third timeout: negative index + scroll
                setTimeout(() => 
                {
                    this.applyLoaderNegativeIndex();
                    this.enableScroll();
                    this.triggerLoadedEvent();
                }, 501); // CSS animation time + 1ms
            }, timeout / 2);
        }, timeout / 2);
    }

    // Private
    private showLoader() : void
    {
        this.loaderElement.classList.remove(this.hiddenClassName);
        this.loaderElement.classList.remove(this.negativeIndexClassName);
    }

    private hideLoader() : void
    {
        this.loaderElement.classList.add(this.hiddenClassName);
    }

    private applyLoaderNegativeIndex() : void
    {
        this.loaderElement.classList.add(this.negativeIndexClassName);
    }

    private showInnerLoader() : void
    {
        this.innerLoaderElement.classList.remove(this.hiddenClassName);
    }

    private hideInnerLoader() : void
    {
        this.innerLoaderElement.classList.add(this.hiddenClassName);
    }

    private enableScroll() : void
    {
        document.body.classList.remove(this.noScrollClassName);
        document.documentElement.classList.remove(this.noScrollClassName);
    }

    private disableScroll() : void
    {
        document.body.classList.add(this.noScrollClassName);
        document.documentElement.classList.add(this.noScrollClassName);
    }
    
    private triggerLoadedEvent() : void
    {
        const loaderHiddenEvent = new CustomEvent('loader-hidden',
            {
                detail: {},
                bubbles: true,
                cancelable: true,
                composed: false,
            });
        window.dispatchEvent(loaderHiddenEvent);
    }
}