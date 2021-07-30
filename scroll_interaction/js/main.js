'use strict';

const container = document.querySelector('.container');
const center_box = document.querySelector('.center_box');

const box1 = document.querySelector('.box1');
const text1 = document.querySelector('.text1');

const box2 = document.querySelector('.box2');
const text2 = document.querySelector('.text2');

let height = window.innerHeight;
// console.log(height);
let ticking = false;

function doSomething(scroll_pos) {
    center_box.style.transform = `rotate(${map(scroll_pos, 0, height, 0, 360)}deg)`;

    box1.style.left = - map(scroll_pos, 0, height, 0, 150) + 'px';
    text1.style.opacity = 1 - map(scroll_pos, 0, height, 0, 1);

    box2.style.left = -150 + map(scroll_pos, 0, height, 0, 150) + 'px';
    text2.style.opacity = 0 + map(scroll_pos, 0, height, 0, 1);
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