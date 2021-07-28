// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
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
        height: height
    }
});

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const circleA = Bodies.circle(430, 430, 40);
const wallA = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
const wallB = Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
const ground = Bodies.rectangle(width / 2, height, width, 20, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, circleA, wallA, wallB, ground]);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);