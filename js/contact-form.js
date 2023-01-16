"use strict";
window.addEventListener('load', () => {
    const sadEmoji = '&#128531;';
    const happyEmoji = '&#128522;';
    const successMessage = 'Thanks for your submission! ' + happyEmoji;
    const errorMessage = 'Oops! There was a problem submitting your form ' + sadEmoji;
    // AJAX
    async function handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        let status = document.getElementById('form-status');
        let data = new FormData(target);
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
            if (response.ok) {
                status.innerHTML = successMessage;
                status.classList.add('success-status');
                target.reset();
            }
            else {
                status.innerHTML = errorMessage;
                status.classList.add('error-status');
            }
        }).catch(error => {
            status.innerHTML = errorMessage;
            status.classList.add('error-status');
        });
    }
    // Bind submit event
    var form = document.getElementById('contact-form');
    form.addEventListener('submit', handleSubmit);
});
