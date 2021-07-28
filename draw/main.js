'use strict';

// Canvasからbase64エンコーディングされた画像データを取得する
let canvas;
let base64;

window.onload = function () {
    console.log('ok');
    canvas = document.getElementById('defaultCanvas0');
    const ctx = canvas.getContext('2d');
    const getBase64 = window.localStorage.getItem("saveKey");

    // Imageオブジェクトを作成し、src属性にデータを設定する
    const image = new Image();
    image.src = getBase64;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, windowWidth, windowHeight);
    }
}

// LocalStorageに保存する
window.addEventListener('click', () => {
    canvas = document.getElementById('defaultCanvas0');
    base64 = canvas.toDataURL();
    window.localStorage.setItem("saveKey", base64);
});

window.addEventListener('touchend', () => {
    canvas = document.getElementById('defaultCanvas0');
    base64 = canvas.toDataURL();
    window.localStorage.setItem("saveKey", base64);
});