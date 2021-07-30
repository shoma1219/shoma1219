'use strict';

const background = document.querySelector('.background');

const container = document.querySelector('.container');
const center_box = document.querySelector('.center_box');

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const box4 = document.querySelector('.box4');

let height = window.innerHeight;

function doSomething(scroll_top) {
    // background.style.background = `rgb(${100 - map(scroll_top, 0, height, 0, 37)}, ${100 - map(scroll_top, 0, height, 0, 37)}, ${100 - map(scroll_top, 0, height, 0, 37)})`;


    if (scroll_top <= height) {
        center_box.style.transform = `translate(-50%, -50%) rotate(${map(scroll_top, 0, height, 0, 360)}deg)`;
        center_box.style.background = `rgb(${255 - map(scroll_top, 0, height, 0, 37)}, ${255 - map(scroll_top, 0, height, 0, 114)}, ${255 - map(scroll_top, 0, height, 0, 114)})`;
        box1.style.left = - map(scroll_top, 0, height, 0, 100) + 'px';
        box2.style.left = -100 + map(scroll_top, 0, height, 0, 100) + 'px';
        console.log('1');
        console.log(box1.style.left);
        console.log(box2.style.left);
        console.log(box3.style.left);
        console.log(box4.style.left);
    } else if (scroll_top - height <= height) {
        center_box.style.transform = `translate(-50%, -50%) rotate(${map(scroll_top - height, 0, height, 0, 360)}deg)`;
        box2.style.left = - map(scroll_top - height, 0, height, 0, 100) + 'px';
        box3.style.left = -100 + map(scroll_top - height, 0, height, 0, 100) + 'px';
        console.log('2');
        console.log(box1.style.left);
        console.log(box2.style.left);
        console.log(box3.style.left);
        console.log(box4.style.left);
    } else if (scroll_top - height * 2 <= height) {
        center_box.style.transform = `translate(-50%, -50%) rotate(${map(scroll_top - height * 2, 0, height, 0, 360)}deg)`;
        box3.style.left = - map(scroll_top - height * 2, 0, height, 0, 100) + 'px';
        box4.style.left = -100 + map(scroll_top - height * 2, 0, height, 0, 100) + 'px';
        console.log('3');
        console.log(box1.style.left);
        console.log(box2.style.left);
        console.log(box3.style.left);
        console.log(box4.style.left);
    }
}

let ticking = false;
container.addEventListener('scroll', function (e) {
    // console.log(container.scrollTop);

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