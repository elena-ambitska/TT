import {focusInput} from "./stateForm.js";
import {initPromoCode} from "./init-promo-code.js";

export function initCheckupForm () {
    const form = document.querySelector('[data-form]');
    const inputs = form.querySelectorAll('input')
    focusInput(inputs)
    initPromoCode();
}

initCheckupForm()