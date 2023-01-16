class Menu
{
	private button : HTMLElement = {} as HTMLElement;
	private nav : HTMLElement = {} as HTMLElement;

	private openClassName : string = 'open';

	constructor()
	{
		window.addEventListener('load', () =>
		{
			this.init();
		});
	}

	private init() : void
	{
		this.button = document.querySelector('#hamburger') as HTMLElement;
		this.nav = document.querySelector('nav') as HTMLElement;
		this.button.addEventListener('click', this.toggle);

		const elementsExceptHeader : NodeListOf<HTMLElement> = document.querySelectorAll('section, footer');
		elementsExceptHeader.forEach(elementExceptHeader => elementExceptHeader.addEventListener('click', this.close));
		
		const links : NodeListOf<HTMLElement> = document.querySelectorAll('.nav-links') as NodeListOf<HTMLElement>;
		for (const link of links)
		{
			link.addEventListener('click', this.close);
			link.addEventListener('click', this.removeHashFromWindowLocation);
		}
		
		const socialLinks : NodeListOf<HTMLElement> = document.querySelectorAll('.social-links') as NodeListOf<HTMLElement>;
		socialLinks.forEach(socialLink => socialLink.addEventListener('click', this.close));

		window.addEventListener('resize', this.close);
		window.addEventListener('scroll', this.close);
	}

	// Public
	public toggle = (event : Event) =>
	{
		event.preventDefault();
		this.nav.classList.toggle(this.openClassName);
		this.button.classList.toggle(this.openClassName);
	}

	public close = (event : Event) =>
	{
		this.nav.classList.remove(this.openClassName);
		this.button.classList.remove(this.openClassName);
	}

	// Private
	private removeHashFromWindowLocation = (event : Event) =>
	{
		// Wait 5ms in order to work properly
		setTimeout(() => 
		{
			let uri = window.location.toString();
			if (uri.indexOf('#') > 0) 
			{
				let uriWithoutHash = uri.substring(0, uri.indexOf('#'));
				window.history.replaceState({}, document.title, uriWithoutHash);
			}
		}, 5);
	}
}

const menu : Menu = new Menu();