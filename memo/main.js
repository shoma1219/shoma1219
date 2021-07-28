'use strict';

// データの保存
const textareaData = document.getElementById('textareaData');
let myData = localStorage.getItem('data');

// リロード時にテキストエリアにフォーカスする
textareaData.value = '';
textareaData.focus();
textareaData.value = myData;

window.addEventListener('keyup', () => {
    localStorage.setItem('data', textareaData.value);
});

// コピーと削除ボタン
const copyBtn = document.getElementById('copyBtn');
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('saveBtn');

copyBtn.addEventListener('click', () => {
    textareaData.select();
    document.execCommand("copy");
});

deleteBtn.addEventListener('click', () => {
    textareaData.value = '';
    localStorage.setItem('data', textareaData.value);
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('data', textareaData.value);
});