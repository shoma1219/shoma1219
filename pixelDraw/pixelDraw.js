class Pallet {
    constructor() {
        this.colors = [
            color('#000000'),
            color('#1D2B53'),
            color('#7E2553'),
            color('#008751'),
            color('#AB5236'),
            color('#5F574F'),
            color('#C2C3C7'),
            color('#FFF1E8'),
            color('#FF004D'),
            color('#FFA300'),
            color('#FFEC27'),
            color('#00E436'),
            color('#29ADFF'),
            color('#83769C'),
            color('#FF77A8'),
            color('#FFCCAA'),
        ];
        this.w = 50;
        this.h = 50;
        this.x = 0;
        this.y = windowHeight - this.h;
        this.selectColor = 12;
        this.margin = 4;
    }

    selected() {
        for (let i = 0; i < this.colors.length; i++) {
            if (
                mouseX > this.x + (i * this.w) &&
                mouseX < this.x + (i * this.w) + this.w &&
                mouseY > this.y &&
                mouseY < this.y + this.h
            ) {
                this.selectColor = i;
            }
        }
    }

    showUI() {
        for (let i = 0; i < this.colors.length; i++) {
            push();
            fill(this.colors[i]);
            rect(this.x + (i * this.w), this.y, this.w, this.h);

            if (this.selectColor === i) {
                fill(50);
                rect(this.x + (i * this.w), this.y, this.w, this.h);
                fill(this.colors[i]);
                rect(this.x + (i * this.w) + this.margin, this.y + this.margin, this.w - (this.margin * 2), this.h - (this.margin * 2));
            }
            pop();
        }
    }
}

class Tile {
    constructor() {
        this.tiles = [
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7],
        ];
        this.w = 100;
        this.h = 100;
    }

    draw() {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (
                    mouseX > x * this.w && mouseX < x * this.w + this.w &&
                    mouseY > y * this.h && mouseY < y * this.h + this.h
                ) {
                    for (let i = 0; i < pallet.colors.length; i++) {
                        if (pallet.selectColor === i) {
                            this.tiles[y][x] = i;
                        }
                    }
                }
            }
        }
    }

    show() {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {

                push();

                for (let i = 0; i < pallet.colors.length; i++) {
                    if (this.tiles[y][x] === i) {
                        fill(pallet.colors[i]);
                    }
                }

                rect(x * this.w, y * this.h, this.w, this.h);
                pop();
            }
        }
    }
}

let tile;
let pallet;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tile = new Tile();
    pallet = new Pallet();
}

function draw() {
    background(170);

    tile.show();
    pallet.showUI();
}

function mousePressed() {
    tile.draw();
    pallet.selected();
}

