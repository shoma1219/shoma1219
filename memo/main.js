'use strict';

const textareaData = document.getElementById('textareaData');
let myData;
textareaData.textContent = myData;

window.addEventListener('keydown', () => {
    localStorage.setItem('data', textareaData.value);
    myData = localStorage.getItem('data');
    // console.log(myData);
});


