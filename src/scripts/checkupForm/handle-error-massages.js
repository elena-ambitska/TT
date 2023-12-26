export function displayErrorMessage(selector, message) {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-message');
    errorContainer.innerText = message;

    const inputField = document.querySelector( `input[name=${selector}]`);
    const formGroup = inputField.closest('.form-group');
    formGroup.appendChild(errorContainer);
    inputField.style.borderColor = '#EB5757';
}

export function clearErrorMessages(fieldName) {
    const errorMessages = document.querySelectorAll('.error-message');

    errorMessages.forEach((message) => {
        message.remove();
    });

    const inputField = document.querySelector(`[name="${fieldName}"]`);
    if (inputField) {
        inputField.style.borderColor = '#D3E2F9';
    }
}