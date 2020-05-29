'usestrict'

window.onload   = init;
window.onresize = init;

// レンジスライダーの値を表示する為のイベントを追加する
function init() {
    const body = document.querySelector('body');
    const zipper = document.querySelector('.zipper');
    const elements = document.querySelectorAll('li');
    
    if(!body || !zipper || !elements) return;
    
    zipper.setAttribute('max', zipper.clientWidth);
    zipper.addEventListener('input', changeValue);

    const size = zipper.clientWidth / 10;
    elements.forEach(e => e.style.height = `${size}px`);
}

function changeValue() {
    const zipper = document.querySelector('.zipper');
    const elements = document.querySelectorAll('li');

    if(!zipper || !elements) return;

    const progress = (zipper.value / zipper.clientWidth) * 100;
    elements.forEach(e => {
        if(Number(e.textContent <= progress)){
            e.classList.add('move');
        } else {
            e.classList.remove('move');
        }
    });
}
