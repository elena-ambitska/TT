export const VALIDATE_RULES = {
    '[data-form-email]': {
        rule: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Invalid email format',
        required: true,
    },
    '[data-form-card]': {
        rule: (cardNumber) => cardNumber.replace(/\s/g, '').length === 16,
        message: 'Your card number is invalid',
        required: true,
    },
    '[data-form-card-date]': {
        rule: (expiryDate) => {
            const parts = expiryDate.split('/');
            if (parts.length !== 2) {
                return 'Your card\'s expiration date is incomplete';
            }

            const month = parseInt(parts[0], 10);
            const year = parseInt(parts[1], 10);

            if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
                return 'Invalid month in expiration date';
            }

            const currentYear = new Date().getFullYear();

            if (year < currentYear || (year === currentYear && month < new Date().getMonth() + 1)) {
                return 'Your card\'s expiration year is in the past';
            }

            return true;
        },
        message: 'Invalid expiration date format (MM/YYYY)',
        required: true,
    },
    '[data-form-card-cvv]': {
        rule: (cvv) => /^\d{3,4}$/.test(cvv),
        message: 'Invalid CVV format',
        required: true,
    },
    '[data-form-name-card]': {
        rule: (name) => name.trim() !== '',
        message: 'Cardholder name is required',
        required: true,
    },
    '[data-form-promo-input]': {
        rule: (promo) => {
            const validatePromoCodes = ['promo10'];
            return validatePromoCodes.includes(promo);
        },
        message:'Invalid coupon code :(',
        required: false,
    }
};
