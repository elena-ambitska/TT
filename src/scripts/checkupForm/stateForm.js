import {clearErrorMessages} from "./handle-error-massages.js";

export function focusInput(elements) {
    elements.forEach(element => {
        element.addEventListener('focus', () => {
            clearErrorMessages(element.getAttribute('name'))
            element.classList.add('focus');
        })
    })

    elements.forEach(element => {
        element.addEventListener('blur', () => {
            element.classList.remove('focus');
        })
    })
}