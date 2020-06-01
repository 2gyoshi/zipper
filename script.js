'use strict'

window.addEventListener('load', init);
window.addEventListener('resize', init);

function init(){
    const area = document.querySelector('.center');
    const handle = document.querySelector('.handle');
    const elements = document.querySelectorAll('li');

    if(!area || !handle || !elements) return;


    handle.addEventListener('mousedown', addEvent);
    window.addEventListener('mouseup', removeEvent);

    const max = area.clientHeight;
    const height = max / 10;
    elements.forEach(e => e.style.height = `${height}px`);
}

function addEvent() {
    window.addEventListener('mousemove', test, false);
}

function removeEvent() {
    window.removeEventListener('mousemove', test, false);
    resetSlider();
}


function test(event) {
    rotate(event);
    slide(event);
    move();
}

function rotate(event) {
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

function slide(event){
    const slider = document.querySelector('.slider');
    const handle = document.querySelector('.handle');

    if(!slider) return;

    // マウスの座標を取得する
    const my = event.clientY;

    // 要素の座標を取得する
    const sr = slider.getBoundingClientRect()
    const sy = window.pageYOffset + sr.top;

    // 要素を移動する
    const distance = 5;

    if(my > sy) {
        slider.style.position = 'absolute';
        slider.style.top = `${sy + distance}px`;
    }

    if(my < sy) {
        slider.style.position = 'absolute';
        slider.style.top = `${sy - distance}px`;
    }
}

function move() {
    const area = document.querySelector('.center');
    const slider = document.querySelector('.slider');
    const elements = document.querySelectorAll('li');

    if(!area || !slider || !elements) return;

    const sr = slider.getBoundingClientRect()
    const sy = sr.top;

    const progress = (sy / area.clientHeight) * 100;

    elements.forEach(e => {
        if(Number(e.textContent <= progress)){
            e.classList.add('move');
        } else {
            e.classList.remove('move');
        }
    });
}

function getPosition(target) {
    const position = {x: 0, y: 0};

    const tr = target.getBoundingClientRect();
    position.x = window.pageXOffset + tr.left;
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
        position.y = window.pageXOffset + tr.bottom;
    }

    return position;
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
