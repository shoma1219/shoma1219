'use strict';

const scrollAnimationContainer = document.querySelector('.scrollAnimationContainer');
const centerBox = document.querySelector('.scrollAnimationContainer__centerBox');
const box1 = document.querySelector('.scrollAnimationContainer__box1');
const box2 = document.querySelector('.scrollAnimationContainer__box2');
const box3 = document.querySelector('.scrollAnimationContainer__box3');
const box4 = document.querySelector('.scrollAnimationContainer__box4');

const contentContainer = document.querySelector('.contentContainer');
let height = contentContainer.clientHeight;

function scrollAnimation(scroll_top) {

    if (scroll_top <= height) {

        scrollAnimationContainer.style.background = `rgb(${100 - map(scroll_top, 0, height, 0, 37)}, ${100 - map(scroll_top, 0, height, 0, 37)}, ${100 - map(scroll_top, 0, height, 0, 37)})`;
        centerBox.style.transform = `translate(-50%, -50%) rotate(${map(scroll_top, 0, height, 0, 360)}deg)`;
        centerBox.style.background = `rgb(${255 - map(scroll_top, 0, height, 0, 37)}, ${255 - map(scroll_top, 0, height, 0, 114)}, ${255 - map(scroll_top, 0, height, 0, 114)})`;
        box1.style.left = - map(scroll_top, 0, height, 0, 100) + 'px';
        box2.style.left = -100 + map(scroll_top, 0, height, 0, 100) + 'px';

    } else if (scroll_top - height <= height) {

        centerBox.style.transform = `translate(-50%, -50%) rotate(${map(scroll_top - height, 0, height, 0, 360)}deg)`;
        box2.style.left = - map(scroll_top - height, 0, height, 0, 100) + 'px';
        box3.style.left = -100 + map(scroll_top - height, 0, height, 0, 100) + 'px';

    } else if (scroll_top - height * 2 <= height) {

        centerBox.style.transform = `translate(-50%, -50%) rotate(${map(scroll_top - height * 2, 0, height, 0, 360)}deg)`;
        box3.style.left = - map(scroll_top - height * 2, 0, height, 0, 100) + 'px';
        box4.style.left = -100 + map(scroll_top - height * 2, 0, height, 0, 100) + 'px';

    }
}

let ticking = false;
contentContainer.addEventListener('scroll', function (e) {
    // console.log(contentContainer.scrollTop);

    if (!ticking) {
        window.requestAnimationFrame(function () {
            scrollAnimation(contentContainer.scrollTop);
            ticking = false;
        });

        ticking = true;
    }
});

// map
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