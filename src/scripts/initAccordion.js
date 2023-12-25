
const buttonsAccordion = document.querySelectorAll('[data-accordion-button]')
buttonsAccordion.forEach(button => {
    button.addEventListener('click', (evt) => {
        evt.preventDefault();
        console.log('click')
        const accordionContainer = button.nextElementSibling;
        console.log(accordionContainer)
        accordionContainer.classList.toggle('active');
        button.classList.toggle('active');
    });
})

