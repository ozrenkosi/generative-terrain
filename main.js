let colors = {
  background: "#E6E3DC",
  deepWater: "#04417a",
  shallowWater: "#238aeb80",
  sand: "#cdaa65",
  grass: "#8db543",
  forest: "#41832d",
  mountainPeak: "#ecece8",
  treeTrunk: "#422e0c",
  treeLeaves: "#36600f"
};

let boxes = [];
let numOfBoxes = 40;
let terrainSize;
let boxSize;
let margin;

const seaLevel = 0.4; // 0 is the deepest point of the water and 1 is the highest mountain peak
const deepWaterLevel = 0.25;
const grassLevel = 0.5;
const forestLevel = 0.7;
const mountainPeakLevel = 0.8;

let deepestPixelHeight = 20;
let highestPixelHeight = 200;
let seaLevelPixelHeight;

let terrainSmoothness = 0.09;
let animationSpeedFlying = 0.0002;
let animationSpeedBreathing = 0.0001;
let orbitSpeed = 0.0001;

let mode = "fixed"; // default mode

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);

  margin = width / 6;
  terrainSize = width - (margin * 2);
  boxSize = terrainSize / numOfBoxes;
  seaLevelPixelHeight = map(seaLevel, 0, 1, deepestPixelHeight, highestPixelHeight);

  for (let i = 0; i < numOfBoxes; i++) {
    boxes[i] = [];
    for (let j = 0; j < numOfBoxes; j++) {
      let x = -(width / 2) + margin + (i * boxSize) + (boxSize / 2);
      let y = -(height / 2) + margin + (j * boxSize) + (boxSize / 2);
      let z = 0;

      boxes[i][j] = new Box(x, y, z, boxSize);
    }
  }

  // Buttons
  let btnFlying = createButton("Flying");
  btnFlying.position(20, height - 40);
  btnFlying.mousePressed(() => mode = "flying");

  let btnOrbiting = createButton("Orbiting");
  btnOrbiting.position(75, height - 40);
  btnOrbiting.mousePressed(() => mode = "orbiting");

  let btnFixed = createButton("Fixed");
  btnFixed.position(140, height - 40);
  btnFixed.mousePressed(() => mode = "fixed");
}

function draw() {
  background(colors.background);

  if (mode === "flying") {
    // fixed camera for flying animation
    camera(0, width, width / 1.5);
  } else if (mode === "orbiting") {
    // orbiting camera for breathing animation
    camera(width * sin(millis() * orbitSpeed), width * cos(millis() * orbitSpeed), width / 1.7, 0, 0, 0, 0, 0, -1);
  } else {
    // fixed camera for breathing animation
    camera(width / 1.3, width / 1.3, width / 1.5, 0, 0, 0, 0, 0, -1);
  }

  directionalLight(255, 198, 114, -1, 0.75, -1);
  ambientLight(200);

  for (let i = 0; i < numOfBoxes; i++) {
    for (let j = 0; j < numOfBoxes; j++) {
      if (mode === "flying") {
        boxes[i][j].update(perlinNoiseFlying(i, j)); // send height between 0 and 1
      } else {
        boxes[i][j].update(perlinNoiseBreathing(i, j)); // send height between 0 and 1
      }
      boxes[i][j].draw();
    }
  }

  // Water
  translate(0, 0, seaLevelPixelHeight / 2);
  fill(colors.shallowWater);
  box(terrainSize - 0.1, terrainSize - 0.1, seaLevelPixelHeight);
}

function perlinNoiseFlying(x, y) {
  return noise(x * terrainSmoothness, y * terrainSmoothness - millis() * animationSpeedFlying);
}

function perlinNoiseBreathing(x, y) {
  return noise(x * terrainSmoothness, y * terrainSmoothness, millis() * animationSpeedBreathing);
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5); // saves a 5 second GIF
  }
}