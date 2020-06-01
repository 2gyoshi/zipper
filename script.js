'use strict'

window.addEventListener('load', init);
window.addEventListener('resize', init);

function init(){
    const line = document.querySelector('.line');
    const handle = document.querySelector('.handle');
    const elements = document.querySelectorAll('li');

    if(!line || !handle || !elements) return;

    handle.addEventListener('mousedown', addEvent);
    window.addEventListener('mouseup', removeEvent);

    const max = line.clientHeight;
    const height = max / 10;
    elements.forEach(e => e.style.height = `${height}px`);
}

function addEvent() {
    window.addEventListener('mousemove', slide, false);
}

function removeEvent() {
    window.removeEventListener('mousemove', slide, false);
    resetSlider();
}

function slide(event) {
    rotateHandle(event);
    moveSlider(event);
    setStatus(event);
}

function rotateHandle(event) {
    const target = document.querySelector('.handle');

    if(!target) return;

    // マウスの座標を取得する
    const mx = event.clientX;
    const my = event.clientY;

    // 対象要素の座標を取得する
    const position = getPosition(target);
    const tx = position.x;
    const ty = position.y;

    // 対象の要素とマウスの座標環の角度を取得する
    const radian = Math.atan2(tx - mx, my - ty);
    const angle = radian * (180 / Math.PI);

    // 対象の要素を変形する
    target.rotate = angle;
    target.style.transition = null;
    target.style.transformOrigin = `50% 0`;
    target.style.transform = `translateX(-50%) rotate(${angle}deg)`;

}

function moveSlider(event){
    const slider = document.querySelector('.slider');
    const handle = document.querySelector('.handle');

    if(!slider || !handle) return;

    // マウスの座標を取得する
    const my = event.clientY;

    // 引手の座標を取得する
    const adjust = -50;
    const hy = my - handle.clientHeight + adjust;

    // 要素を移動する
    slider.style.position = 'absolute';
    slider.style.top = `${hy}px`

}

function setStatus(event) {
    const slider = document.querySelector('.slider');
    const elements = document.querySelectorAll('li');

    if(!slider || !elements) return;

    const progress = getProgress(event);

    elements.forEach(e => {
        if(Number(e.innerText <= progress)){
            e.classList.add('open');
        } else {
            e.classList.remove('open');
        }
    });

    if(progress === 100) {
        slider.classList.add('end')
    } else {
        slider.classList.remove('end')
    }
}

function resetSlider() {
    const target = document.querySelector('.handle');

    if(!target) return;

    // 対象の要素を変形する
    target.rotate = 0;
    target.style.transformOrigin = `50% 0`;
    target.style.transform = `translateX(-50%) rotate(0deg)`;
    target.style.transition=  'all .5s ease';
}

function getPosition(target) {
    const position = {x: 0, y: 0};

    const tr = target.getBoundingClientRect();
    position.x = window.pageXOffset + tr.left + target.clientWidth / 2;
    position.y = window.pageYOffset + tr.top;

    if(!target.rotate) {
        return position;
    }

    if(target.rotate > 90) {
        position.x = window.pageXOffset + tr.right;
        position.y = window.pageYOffset + tr.bottom;
    }

    if(target.rotate < -90) {
        position.x = window.pageXOffset + tr.left;
        position.y = window.pageYOffset + tr.bottom;
    }

    return position;
}

function getProgress(event) {
    const line = document.querySelector('.line');
    const slider = document.querySelector('.slider');

    if(!line || !slider) return result;

    const my = event.clientY;
    const sr = slider.getBoundingClientRect();
    const top = sr.top;

    let progress = (top / line.clientHeight) * 100;
    if(my >= line.clientHeight - 1) {
        progress = 100;
    }

    return progress;
}