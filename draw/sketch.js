function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    if (mouseIsPressed) {
        ellipse(mouseX, mouseY, 40, 40);
    }
}