function playSound (e) {
    const AUDIO = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const KEY = document.querySelector(`.key[data-key='${e.keyCode}']`);
    if(!AUDIO) return;
    AUDIO.currentTime = 0;
    AUDIO.play();
    KEY.classList.toggle('playing');
}

function removeTransition( e) {
    if(e.propertyName !== 'transform') return
    this.classList.remove('playing');
}

const KEYS = document.querySelectorAll('.key');
KEYS.forEach( key => {
    key.addEventListener('transitionend', removeTransition); 
});

window.addEventListener('keydown', playSound);