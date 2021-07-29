// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Constraint = Matter.Constraint,
    Runner = Matter.Runner,
    Body = Matter.Body,
    MouseConstraint = Matter.MouseConstraint,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

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
        showCollisions: true,
        showPositions: true,
        showVelocity: true

    }
});

// create two boxes and a ground
const boxA = Bodies.rectangle(width / 2, 200, 80, 80);
const circleA = Bodies.circle(width / 2, 430, 40);
const circleB = Bodies.circle(width / 2, 430, 40);
// const polygonA = Bodies.polygon(width / 2, 430, 5, 40);

const wallA = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
const wallB = Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
const ceiling = Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true });
const ground = Bodies.rectangle(width / 2, height, width, 20, { isStatic: true });

// 束縛を作る
const anchorA = Constraint.create({
    pointA: { x: 0, y: 0 }, // 円盤の中心
    bodyA: boxA,
    pointB: { x: 200, y: 200 }, // 空間のこの位置に固定
    length: 0,
});

const anchorB = Constraint.create({
    pointA: { x: 0, y: 0 }, // 円盤の中心
    bodyA: circleA,
    pointB: { x: 0, y: 0 }, // 空間のこの位置に固定
    bodyB: circleB,
    length: 100,
});

// 速度を追加して回転させる
Body.setAngularVelocity(boxA, 0.1);

// マウスドラッグに対応
const mousedrag = MouseConstraint.create(engine, {
    element: document.body,
});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, circleA, circleB, anchorA, anchorB, wallA, wallB, ceiling, ground, mousedrag]);

Matter.Events.on(engine, "collisionStart", (event) => {
    if (boxA) {
        console.log('boxA');
    }
    if (circleA) {
        console.log('circleA');
    }
});

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);