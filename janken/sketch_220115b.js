// ジャンケンアプリ

function init() {
    background(255);
    fill(0);
    textSize(32);
    text("じゃんけん..", width / 2 - 140, height / 2);
    textSize(20);
    text("出す手を頭の中でイメージしたら", width / 2 - 140, height / 2 + 50);
    text("画面をタップしてください。", width / 2 - 140, height / 2 + 80);
}

function play() {
    col = int(random(4));

    if (col == 0) {
        fill(0, 0, 240);
        janken = "グー"
    }
    if (col == 1) {
        fill(240, 0, 0);
        janken = "チョキ"
    }
    if (col == 2) {
        fill(0, 240, 0);
        janken = "パー"
    }
    if (col == 3) {
        fill(240, 0, 0);
        janken = "運勢は大吉です"
    }
    background(255);
    textSize(40);
    text(janken, width / 2 - 140, height / 2);
    textSize(20);
    text("タップしてスタート画面に戻る", width / 2 - 140, height / 2 + 50);
}

function setup() {
    width = windowWidth;
    height = windowHeight;
    is_play = false;
    createCanvas(width, height);
    init();
}


function draw() {

}

function mousePressed() {
    if (is_play) {
        init()
        is_play = false;
    } else {
        play();
        is_play = true;
    }
}
