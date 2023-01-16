window.addEventListener('load', () =>
{
    const sadEmoji : string = '&#128531;';
    const happyEmoji : string = '&#128522;';

    const successMessage : string = 'Thanks for your submission! ' + happyEmoji;
    const errorMessage : string = 'Oops! There was a problem submitting your form ' + sadEmoji;

    // AJAX
    async function handleSubmit(event : Event) : Promise<void>
    {
        event.preventDefault();
        
        const target : HTMLFormElement = event.target as HTMLFormElement;
        let status : HTMLElement  = document.getElementById('form-status') as HTMLElement;
        let data : FormData = new FormData(target);

        status.innerHTML = '';
        status.classList.remove('success-status');
        status.classList.remove('error-status');

        fetch(target.action, {
            method: target.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) 
            {
                status.innerHTML = successMessage;
                status.classList.add('success-status');
                target.reset();
            } 
            else 
            {
                status.innerHTML = errorMessage;
                status.classList.add('error-status');
            }
        }).catch(error => {
            status.innerHTML = errorMessage;
            status.classList.add('error-status');
        });
    }

    // Bind submit event
    var form : HTMLFormElement = document.getElementById('contact-form') as HTMLFormElement;
    form.addEventListener('submit', handleSubmit);
});