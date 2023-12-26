import * as Yup from 'yup';
import {displayErrorMessage} from "./handle-error-massages.js";

const buttonApply = document.querySelector('[data-form-promo-btn]');
const promoInput = document.querySelector('[data-form-promo-input]');
const successMessage = document.querySelector('[data-success-message]');
const promoImg = document.querySelector('[data-promo-img-apply]');
const isPromoCodeValid = async (promo) => {
    const promoSchema = Yup.string()
        .test('valid-promo', 'Invalid coupon code :(', (value) => {
            const validatePromoCodes = ['promo10'];
            return validatePromoCodes.includes(value);
        });

    try {
        await promoSchema.validate(promo);

        return true;
    } catch (error) {
        displayErrorMessage('promo', error.message )
        return false;
    }
};

const applyPromoCode = async () => {

    const promoCode = promoInput.value.trim();

    if( promoCode === "" ) {
        return;
    }

    const isValid = await isPromoCodeValid(promoCode);

    if (isValid === true) {
        handleValidPromoCode();
    } else {
        handleInvalidPromoCode();
    }
};


buttonApply.addEventListener('click', async () => {
    if(!promoInput.hasAttribute('data-error')) {
        await applyPromoCode();
    } else {
        await resetInput()
    }
});


function handleValidPromoCode() {
    successMessage.innerText = 'Your coupon has been applied';
    promoImg.src = './src/assets/check-circle-filled.svg';
    buttonApply.style.transform = 'translateY(-150%)';
    promoInput.removeAttribute('data-error');
}

function handleInvalidPromoCode() {
    promoImg.src = './src/assets/bin.svg';
    promoImg.classList.remove('success-icon');
    buttonApply.setAttribute('data-error-btn', 'data-error-btn');
    promoInput.style.borderColor = '#EB5757'
    promoInput.setAttribute('data-error', 'data-error');
}

function resetInput () {
    promoImg.src = 'src/assets/Apply (1).svg';
    promoInput.style.borderColor = '#D3E2F9'
    promoInput.value = '';
    promoInput.removeAttribute('data-error');
}