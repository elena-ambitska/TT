export function initRedirectPayment() {
    const buttons = document.querySelectorAll('[data-redirect-button]');
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('popup open or redirect to another page for payment')
        })
    })
}