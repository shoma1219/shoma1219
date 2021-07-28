'use strict';

const textareaData = document.getElementById('textareaData');
let myData = localStorage.getItem('data');
textareaData.textContent = myData;

window.addEventListener('keyup', () => {
    localStorage.setItem('data', textareaData.value);
});

const copyBtn = document.getElementById('copyBtn');
const deleteBtn = document.getElementById('deleteBtn');

copyBtn.addEventListener('click', () => {
    textareaData.select();
    document.execCommand("copy");
});

deleteBtn.addEventListener('click', () => {
    textareaData.value = '';
    localStorage.setItem('data', textareaData.value);
});