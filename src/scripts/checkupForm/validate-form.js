import {validationSchema} from "./validate-rules.js";
import {sendCardDataToServer} from "./services.js";
import {displayErrorMessage} from "./handle-error-massages.js";
import {cardInputGroup, submitButton} from "../variables.js";

const form = document.querySelector('[data-form]');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const data = getFormData(form)
        await validationSchema.validate(data, { abortEarly: false });
        await sendCardDataToServer(data);

    } catch (error) {

        const errorMessages = {};
        error.inner.forEach((err) => {
            if(cardInputGroup.includes(err.path))  {
                if (typeof errorMessages['card-number'] === 'undefined') {
                    errorMessages['card-number'] = err.message;
                } else if (err.path !== 'card-number'){
                    errorMessages[err.path] = '';
                }
            } else {
                errorMessages[err.path] = err.message;
            }
        });

        Object.entries(errorMessages).forEach(([name, message]) => {
            displayErrorMessage(name, message);
        });

        submitButton.setAttribute('disabled', 'disabled');
    }
});

function getFormData(form) {
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    return data;
}
