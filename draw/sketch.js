let c;
let backgroundColor;
let lineColor;

if (window.matchMedia('(prefers-color-scheme: dark)').matches == true) {
    backgroundColor = 0;
    lineColor = 255;
    console.log('dark ok');
} else {
    backgroundColor = 255;
    lineColor = 0;
    console.log('white ok');
}

function setup() {
    c = createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    stroke(lineColor);
}

function draw() {
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function downloadImage() {
    saveCanvas(c, 'myCanvas', 'jpg');
}

function clearRect() {
    background(backgroundColor);
}