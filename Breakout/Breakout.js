class Block {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    show() {
        push();
        fill(this.c);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}

class Wall {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.w = 100;
        this.h = 40;
        this.blocks = [];
        this.num = 12;
        for (let i = 0; i < this.num; i++) {
            const posX = this.x + (i % 4 * 120);
            const posY = this.y + (i % 3 * 120);
            this.blocks[i] = new Block(posX, posY, this.w, this.h, 100);
        }
    }

    show() {
        for (let i = 0; i < game.wall.blocks.length; i++) {
            this.blocks[i].show();
        }
    }
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 3;
        this.vy = 3;
        this.isCollision = false;
    }

    move() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    collision() {
        // display collision
        if (this.x > windowWidth || this.x < 0) {
            this.vx = this.vx * -1;
        }
        if (this.y > windowHeight || this.y < 0) {
            this.vy = this.vy * -1;
        }

        // block collision
        for (let i = 0; i < game.wall.blocks.length; i++) {
            if (
                this.x < game.wall.blocks[i].x + game.wall.blocks[i].w &&
                this.x > game.wall.blocks[i].x &&
                this.y > game.wall.blocks[i].y &&
                this.y < game.wall.blocks[i].y + game.wall.blocks[i].h
            ) {
                this.isCollision = true;
            } else {
                this.isCollision = false;
            }

            if (this.isCollision) {
                if (this.x < game.wall.blocks[i].x + game.wall.blocks[i].w - 2 &&
                    this.x > game.wall.blocks[i].x + 2) {
                    this.vy = this.vy * -1;
                }
                if (this.y > game.wall.blocks[i].y + 2 &&
                    this.y < game.wall.blocks[i].y + game.wall.blocks[i].h - 2) {
                    this.vx = this.vx * -1;
                }
                game.wall.blocks.splice(i, 1);
                game.score.score++;
                console.log(game.wall.blocks);
            }
        }

        //paddle collision
        if (
            this.y > game.paddle.y &&
            this.x > game.paddle.x &&
            this.x < game.paddle.x + game.paddle.w
        ) {
            this.vy = this.vy * -1;
        }
    }

    show() {
        push();
        fill(100, 100, 170);
        ellipse(this.x, this.y, this.r);
        pop();
    }
}

class Paddle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 50;
    }

    move() {
        this.x = mouseX;
        this.y = windowHeight - 100;
    }

    show() {
        rect(this.x, this.y, this.w, this.h);
    }
}

class Score {
    constructor() {
        this.score = 0;
    }

    show() {
        textSize(50);
        text(this.score, 60, 60);
    }
}

class Game {
    constructor() {
        this.wall = new Wall();
        this.ball = new Ball(10, 50, 30);
        this.paddle = new Paddle();
        this.score = new Score();
    }

    show() {
        this.wall.show();
        this.ball.move();
        this.ball.collision();
        this.ball.show();
        this.paddle.move();
        this.paddle.show();
        this.score.show();
    }
}

const game = new Game();

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(50);
    game.show();
}
