let c;

function setup() {
    c = createCanvas(windowWidth, windowHeight);
    background(255);
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
    background(255);
}