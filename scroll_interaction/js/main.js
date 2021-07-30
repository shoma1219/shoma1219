'use strict';

const container = document.querySelector('.container');
const center_box = document.querySelector('.center_box');

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');

let height = window.innerHeight;
let ticking = false;

function doSomething(scroll_pos) {
    center_box.style.transform = `rotate(${map(scroll_pos, 0, height, 0, 360)}deg)`;
    center_box.style.background = `rgb(${255 - map(scroll_pos, 0, height, 0, 37)}, ${255 - map(scroll_pos, 0, height, 0, 114)}, ${255 - map(scroll_pos, 0, height, 0, 114)})`;

    box1.style.left = - map(scroll_pos, 0, height, 0, 150) + 'px';
    box2.style.left = -150 + map(scroll_pos, 0, height, 0, 150) + 'px';
}

container.addEventListener('scroll', function (e) {
    console.log(container.scrollTop);

    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething(container.scrollTop);
            ticking = false;
        });

        ticking = true;
    }
});

// map関数
const map = (value, fromMin, fromMax, toMin, toMax) => {

    let result = 0;

    result = (value <= fromMin)
        ? toMin : (value >= fromMax)
            ? toMax : (() => {

                let ratio = (toMax - toMin) / (fromMax - fromMin);
                return (value - fromMin) * ratio + toMin;

            })();

    return result;
};