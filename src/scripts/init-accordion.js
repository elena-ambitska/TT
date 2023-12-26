
const buttonsAccordion = document.querySelectorAll('[data-accordion-button]')
buttonsAccordion.forEach(button => {
    button.addEventListener('click', (evt) => {
        evt.preventDefault();
        const accordionContainer = button.nextElementSibling;
        accordionContainer.classList.toggle('active');
        button.classList.toggle('active');
    });
})

