import { getFieldValidity } from "./validate-form.js";
import { ERROR_STATE } from "./error-state.js";
import { clearErrorMessages, displayErrorMessage } from "./handle-error-massages.js";

export function initPromoCode() {
    const buttonApply = document.querySelector('[data-form-promo-btn]');
    const messageContainer = document.querySelector('[data-success-message]');
    const promoImg = document.querySelector('[data-promo-img-apply]');
    const promoCodeField = '[data-form-promo-input]';

    buttonApply.addEventListener('click', handleApplyButtonClick);

    function handleApplyButtonClick(evt) {
        evt.preventDefault();

        const inputValue = document.querySelector(promoCodeField).value;
        if (inputValue === '') {
            return;
        }

        const isPromoValid = validatePromoCode();
        const { rule } = getFieldValidity(promoCodeField);

        console.log('isPromoValid ', isPromoValid)

        isPromoValid ? handleValidPromoCode() :  handleInvalidPromoCode(rule);
    }

    function handleValidPromoCode() {
        console.log(handleValidPromoCode)
        messageContainer.innerText = 'Your coupon has been applied';
        promoImg.src = './src/assets/check-circle-filled.svg';
        buttonApply.style.transform = 'translateY(-150%)';
        ERROR_STATE[promoCodeField] = false;
    }

    function handleInvalidPromoCode(rule) {
        console.log('handleInvalidPromoCode')
        promoImg.src = './src/assets/bin.svg';
        displayErrorMessage(promoCodeField, rule.message);
        ERROR_STATE[promoCodeField] = true;
        promoImg.classList.remove('success-icon');
        buttonApply.setAttribute('data-error-btn', 'data-error-btn');
        resetErrorValidation();
    }

    function resetErrorValidation() {
        if (!buttonApply.hasAttribute('data-error-btn')) {
            return;
        }

        buttonApply.addEventListener('click', handleResetButtonClick);

        function handleResetButtonClick() {
            clearErrorMessages(promoCodeField);
            buttonApply.removeAttribute('data-error-btn');
            promoImg.src = 'src/assets/Apply (1).svg';
        }
    }

    function validatePromoCode() {
        console.log('validatePromoCode')
        const promoCodeField = '[data-form-promo-input]';
        const { isFieldEmpty, isValueInvalid } = getFieldValidity(promoCodeField);

        return !isFieldEmpty && !isValueInvalid && !ERROR_STATE[promoCodeField];
    }
}
