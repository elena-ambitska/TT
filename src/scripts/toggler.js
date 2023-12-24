const toggleInput = document.querySelector('[data-toggler]');
toggleInput.addEventListener('change', () => {
    const statusElement = document.querySelector('.status');
    statusElement.textContent = toggleInput.checked ? 'ON' : 'OFF';
});