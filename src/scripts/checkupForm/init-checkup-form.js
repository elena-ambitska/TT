import {focusInput} from "./stateForm.js";
import {initRedirectPayment} from "./init-redirect-payment.js";

export function initCheckupForm () {
    const form = document.querySelector('[data-form]');
    const inputs = form.querySelectorAll('input')
    focusInput(inputs)
    initRedirectPayment()
}

initCheckupForm()