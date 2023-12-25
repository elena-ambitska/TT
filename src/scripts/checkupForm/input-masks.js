import IMask from 'imask';

document.addEventListener('DOMContentLoaded', () => {
    const maskForm = {
        '[data-form-card]': createCardNumberMask,
        '[data-form-email]': createEmailMask,
        '[data-form-card-date]': createExpiryDateMask,
        '[data-form-card-cvv]': createSecureCodeMask,
        '[data-form-name-card]': createNameCardMask
    }
    Object.entries(maskForm).forEach(([selector, maskFunction]) => {
        const element = document.querySelector(selector);
        if (element) {
            maskFunction(element);
        }
    })
})

function createCardNumberMask(element) {
    const mask = IMask(element, {
        mask: [
            {
                mask: '0000 000000 00000',
                regex: '^3[47]\\d{0,13}',
                cardtype: 'american express'
            },
            {
                mask: '0000 0000 0000 0000',
                regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
                cardtype: 'discover'
            },
            {
                mask: '0000 0000 0000 0000',
                regex: '^4\\d{0,15}',
                cardtype: 'visa'
            },
            {
                mask: '0000 0000 0000 0000',
                regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
                cardtype: 'mastercard'
            },
        ],
        maxLength: 16,
    });
}

function createEmailMask(element) {
    const mask = IMask(element, {
        mask: /^\w+\S*@?\S*$/,
        prepareChar: str => str.toLowerCase().trim(),
    });
}

function createExpiryDateMask(element) {
    const mask = IMask(element, {
        mask: 'MM/YYYY',
        blocks: {
            MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2,
            },
            YYYY: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 3000,
            }
        },
    });
}

function createSecureCodeMask(element) {
    const mask = IMask(element, {
        mask: '000',
        blocks: {
            0: {
                mask: /^[0-9]$/,
            },
            1: {
                mask: /^[0-9]$/,
            },
            2: {
                mask: /^[0-9]$/,
            },
        },
    });
}

function createNameCardMask(element) {
    const mask = IMask(element, {
        mask: /^[a-zA-Z\s]+$/,
    });
}