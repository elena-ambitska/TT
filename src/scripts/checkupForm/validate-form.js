import {VALIDATE_RULES} from "./validate-rules.js";
import {ERROR_STATE} from "./error-state.js";
import {addStylesErrorMessage, clearErrorMessages, displayErrorMessage} from "./handle-error-massages.js";
import {sendCardDataToServer} from "./services.js";
import {cardFields} from "../variables.js";

export function getFieldValidity(field) {
    const value = document.querySelector(field).value.trim();
    const rule = VALIDATE_RULES[field];

    const isFieldEmpty = rule.required && !value;
    const isValueInvalid = rule.rule && !rule.rule(value);

    return {
        rule,
        isFieldEmpty,
        isValueInvalid,
    };
}

function validateField(field) {

    clearErrorMessages(field);

    const { rule, isFieldEmpty, isValueInvalid } = getFieldValidity(field);

    if (field === '[data-form-promo-input]') {
        return;
    }

    if ((isFieldEmpty || isValueInvalid) && !ERROR_STATE[field]) {
        if(cardFields.includes(field)) {
            const element = document.querySelector(field);
            addStylesErrorMessage(element);
        }else {
            displayErrorMessage(field, isFieldEmpty ? 'Required' : rule.message);
        }
        ERROR_STATE[field] = true;
    } else if (!isFieldEmpty && !isValueInvalid) {
        clearErrorMessages(field);
        ERROR_STATE[field] = false;
    }

    handleInputCardGroup()

    document.querySelector('[data-submit-button]').disabled = Object.values(ERROR_STATE).some((error) => error);
}

function handleInputCardGroup() {

    let cardFieldWithError = 0;
    cardFields.forEach((selector) => {
        if ( document.querySelector(selector).hasAttribute('data-is-error')) {
            cardFieldWithError++;
        }
    })

    if(cardFieldWithError === cardFields.length) {
        displayErrorMessage('[data-form-card]',  'Required');
    }
}


function validateFormHandler(event) {
    event.preventDefault();

    clearErrorMessages();

    let isValid = true;

    Object.keys(VALIDATE_RULES).forEach((field) => {
        validateField(field);

        if (ERROR_STATE[field]) {
            isValid = false;
        }
    });

    document.querySelector('[data-submit-button]').disabled = !isValid;

    if (isValid) {
        sendCardDataToServer('[data-form]')
        document.querySelector('[data-form]').reset();
    }
}

Object.keys(VALIDATE_RULES).forEach((field) => {
    if (field === '[data-form-promo-input]') {
        return;
    }

    const inputField = document.querySelector(field);
    inputField.addEventListener('blur', () => {
       validateField(field);
    });
});

document.querySelector('[data-form]').addEventListener('submit', validateFormHandler);