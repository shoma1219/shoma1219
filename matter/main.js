// スマホの傾き
var deviceOrientation = window.orientation; //デバイスの傾きを取得

//デバイスが動くたびに実行 : devicemotion
window.addEventListener("devicemotion", function devicemotionHandler(event) {


    //重力加速度 (物体の重力を調節)
    var xg = event.accelerationIncludingGravity.x / 10;
    var yg = event.accelerationIncludingGravity.y / 10;

    // 傾きに応じて重力を調節
    switch (deviceOrientation) {
        case 0:
            engine.world.gravity.x = xg + event.acceleration.x;
            engine.world.gravity.y = -yg + event.acceleration.y;
            break;
        case 90:
            engine.world.gravity.x = -yg - event.acceleration.x;
            engine.world.gravity.y = -xg + event.acceleration.x;
            break;
        case -90:
            engine.world.gravity.x = yg + event.acceleration.x;
            engine.world.gravity.y = xg - event.acceleration.x;
            break;
        case 180:
            engine.world.gravity.x = -xg - event.acceleration.x;
            engine.world.gravity.y = yg - event.acceleration.x;
    }

    // androidとiOSは加速度が真逆なのでその対応
    if (window.navigator.userAgent.indexOf('Android') > 0) {
        engine.world.gravity.x = - engine.world.gravity.x;
        engine.world.gravity.y = - engine.world.gravity.y;
    }
});

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
        pixelRatio: 2,
        showCollisions: true,
        showPositions: true,
        showVelocity: true
    }
});

// create two boxes and a ground
const boxA = Bodies.rectangle(width / 2, 200, 140, 140);
const circleA = Bodies.circle(width / 2, 300, 40);
const circleB = Bodies.circle(width / 2, 430, 40);
// const polygonA = Bodies.polygon(width / 2, 430, 5, 40);

const wallA = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
const wallB = Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
const ceiling = Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true });
const ground = Bodies.rectangle(width / 2, height, width, 20, { isStatic: true });
const center = Bodies.rectangle(width / 2, height / 2, width - 30, 20, { isStatic: true });

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

// マウスドラッグに対応
const mousedrag = MouseConstraint.create(engine, {
    element: document.body,
});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, circleA, circleB, anchorA, anchorB, wallA, wallB, ceiling, ground, center, mousedrag]);

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