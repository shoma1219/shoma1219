let c;

function setup() {
    c = createCanvas(windowWidth, windowHeight);
    background(200);
}

function draw() {
    if (mouseIsPressed) {
        ellipse(mouseX, mouseY, 40, 40);
    }
}

function downloadImage() {
    saveCanvas(c, 'myCanvas', 'jpg');
}

function clearRect() {
    background(200);
}