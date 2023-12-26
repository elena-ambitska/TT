import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    'card-number': Yup.string().required('Required').matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Invalid card number'),
    'card-date': Yup.string().matches(/^\d{2}\/\d{4}$/, 'Invalid date').required('Required').test('expiry-date', 'Invalid expiration date', function (expiryDate) {
            const parts = expiryDate.split('/');
            if (parts.length !== 2) {
                return false;
            }

            const month = parseInt(parts[0], 10);
            const year = parseInt(parts[1], 10);

            if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
                return false;
            }

            const currentYear = new Date().getFullYear();

            if (year < currentYear || (year === currentYear && month < new Date().getMonth() + 1)) {
                return false;
            }

            return true;
        }),
    'card-cvv': Yup.string().matches(/^\d{3}$/, 'Invalid CVV').required('Required'),
    'card-holder-name': Yup.string().required('Required'),
    promo: Yup.string(),
});
