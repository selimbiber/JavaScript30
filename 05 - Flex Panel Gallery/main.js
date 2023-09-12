const PANELS = document.querySelectorAll('.panel');

function toggleOpenPanel() {
    this.classList.toggle('open');
}

function toggleActivePanel(e) {
    if ( e.propertyName.includes('flex') ) {
        this.classList.toggle('open-active');
    }
}

PANELS.forEach(panel => panel.addEventListener('click', toggleOpenPanel));
PANELS.forEach(panel => panel.addEventListener('transitionend', toggleActivePanel));