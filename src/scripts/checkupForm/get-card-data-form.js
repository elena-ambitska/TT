export function getCardDataForm(selector) {
    const form = document.querySelector(selector);
    const formData = {}

    for (const element of form.elements) {

        if (element.name && element.value) {
            formData[element.name] = element.value;
        }
    }

    return formData;
}