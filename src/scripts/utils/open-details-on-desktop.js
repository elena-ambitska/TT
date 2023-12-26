import { desktopMinWidth } from '../variables';
function openDetailsOnDesktop(minWidth) {
    const details = document.querySelectorAll('[data-details]');

    for (let detail of details) {
        if (window.innerWidth >= minWidth) {
            detail.open = true;
        }
    }
}

openDetailsOnDesktop(desktopMinWidth);
