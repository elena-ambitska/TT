import {ERROR_STATE} from "./error-state.js";
import {VALIDATE_RULES} from "./validate-rules.js";

export function displayErrorMessage(field, message) {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-message');
    errorContainer.setAttribute('data-field', field);
    errorContainer.innerText = message;

    const inputField = document.querySelector(field);
    const formGroup = inputField.closest('.form-group');
    formGroup.appendChild(errorContainer);
    addStylesErrorMessage(inputField);
}

export function clearErrorMessages(field) {
    if (field) {
        const inputField = document.querySelector(field);
        const errorMessages = document.querySelectorAll(`.error-message[data-field="${field}"]`);
        errorMessages.forEach((errorMessage) => errorMessage.remove());
        inputField.style.borderColor = '#D3E2F9';
        inputField.removeAttribute('data-is-error');
        ERROR_STATE[field] = false;
    } else {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((errorMessage) => errorMessage.remove());
        Object.keys(VALIDATE_RULES).forEach((key) => {
            ERROR_STATE[key] = false;
        });
    }
}

export function addStylesErrorMessage(inputField) {
    inputField.style.borderColor = '#EB5757';
    inputField.setAttribute('data-is-error', 'data-is-error');
}