'use strict'

window.addEventListener('load', init);
window.addEventListener('resize', init);

function init(){
    const slider = document.querySelector('.slider');
    const elements = document.querySelectorAll('li');

    if(!slider) return;

    const max = slider.clientWidth;
    slider.setAttribute('max', max);
    slider.addEventListener('input', slide);

    const height = max / 10;
    elements.forEach(e => e.style.height = `${height}px`);
}

function slide() {
    const slider = document.querySelector('.slider');
    const elements = document.querySelectorAll('li');

    if(!slider || !elements) return;

    const progress = (slider.value / slider.clientWidth) * 100;
    elements.forEach(e => {
        if(Number(e.textContent <= progress)){
            e.classList.add('move');
        } else {
            e.classList.remove('move');
        }
    });
}

