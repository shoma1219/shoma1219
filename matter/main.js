// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Constraint = Matter.Constraint,
    Runner = Matter.Runner,
    Body = Matter.Body,
    MouseConstraint = Matter.MouseConstraint,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common;

// create an engine
const engine = Engine.create();

const width = window.innerWidth;
const height = window.innerHeight;

// create a renderer
const render = Render.create({
    canvas: document.getElementById("canvas"),
    engine: engine,
    options: {
        width: width,
        height: height,
        pixelRatio: 2,
    }
});

// wall
Composite.add(engine.world, [
    // walls
    Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true }),
    Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true }),
    Bodies.rectangle(width / 2, -30, width, 60, { isStatic: true }),
    Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true }),
]);

// create two boxes and a ground
const boxA = Bodies.rectangle(width / 2, 200, 140, 140);
const circleA = Bodies.circle(width / 2, 300, 40);
const circleB = Bodies.circle(width / 2, 430, 40);
const center = Bodies.rectangle(width / 2, height / 2, width / 3, 20, { isStatic: true });

// 束縛を作る
const anchorA = Constraint.create({
    pointA: { x: 0, y: 0 }, // 円盤の中心
    bodyA: circleB,
    pointB: { x: 0, y: 0 }, // 空間のこの位置に固定
    bodyB: boxA,
    length: 160,
});

const anchorB = Constraint.create({
    pointA: { x: 0, y: 0 }, // 円盤の中心
    bodyA: circleA,
    pointB: { x: 0, y: 0 }, // 空間のこの位置に固定
    bodyB: circleB,
    length: 100,
});

// 速度を追加して回転させる
window.addEventListener('click', () => {
    Body.setAngularVelocity(circleA, 0.2);
});

// 大砲を作る
let rock = Bodies.polygon(170, 450, 8, 20, { density: 0.004 });
const anchor = { x: 170, y: 450 },
    elastic = Constraint.create({
        pointA: anchor,
        bodyB: rock,
        stiffness: 0.05
    });
Composite.add(engine.world, [rock, elastic]);

Events.on(engine, 'afterUpdate', function () {
    if ((rock.position.x > 190 || rock.position.y < 430)) {
        rock = Bodies.polygon(170, 450, 7, 20, { density: 0.004 });
        Composite.add(engine.world, rock);
        elastic.bodyB = rock;
    }
});

// ピラミッド
// const pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function (x, y) {
//     return Bodies.rectangle(x, y, 25, 40);
// });
// Composite.add(engine.world, [pyramid]);

// マウスドラッグに対応
const mousedrag = MouseConstraint.create(engine, {
    element: document.body,
});

// 重力を扱う
window.addEventListener('keydown', () => {
    engine.gravity.y = 0;
});
window.addEventListener('keyup', () => {
    engine.gravity.y = 1;
});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, circleA, circleB, anchorA, anchorB, center, mousedrag]);

// たくさん出す
var stack = Composites.stack(20, 20, 12, 5, 0, 0, function (x, y) {
    switch (Math.round(Common.random(0, 1))) {

        case 0:
            if (Common.random() < 0.8) {
                return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50));
            } else {
                return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30));
            }
        case 1:
            return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 50));

    }
});

Composite.add(engine.world, [stack]);

// Matter.Events.on(engine, "collisionStart", (event) => {
//     if (boxA) {
//         console.log('boxA');
//     }
//     if (circleA) {
//         console.log('circleA');
//     }
// });

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);