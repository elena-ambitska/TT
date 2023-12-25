
export function focusInput(elements) {
    elements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus');
        })
    })

    elements.forEach(element => {
        element.addEventListener('blur', () => {
            element.classList.remove('focus');
        })
    })
}