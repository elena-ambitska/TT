const buttonMenu = document.querySelector('[data-menu-btn]');
buttonMenu.addEventListener('click', () => {
    buttonMenu.classList.toggle('active');
})