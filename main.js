let colors = {
  background: "#E6E3DC",
  deepWater: "#04417a",
  shallowWater: "#238aebb0",
  sand: "#cdaa65",
  grass: "#8db543",
  forest: "#41832d",
  treeTrunk: "#422e0c",
  treeLeaves: "#36600f"
};

let boxes = [];
let numOfBoxes = {
  active: 40,
  low: 20,
  medium: 40,
  high: 60,
  ultra: 512,
  insane: 1024
};
let terrainSize;
let boxSize;
let margin;

// 0 is the deepest point of the water and 1 is the highest mountain peak
const seaLevel = 0.4;
const deepWaterLevel = 0.25;
const grassLevel = 0.5;
const forestLevel = 0.7;

let deepestPixelHeight = 20;
let highestPixelHeight = 200;
let seaLevelPixelHeight;

let terrainSmoothness = {
  active: 0.09,
  coarse: 0.15,
  medium: 0.09,
  smooth: 0.07,
  ultraSmooth: 0.01,
  insaneSmooth: 0.001
};
let animationSpeedFlying = 0.0002;
let animationSpeedBreathing = 0.0001;
let orbitSpeed = 0.0001;

let cameraMode = "fixed"; // default mode

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);

  margin = width / 6;
  seaLevelPixelHeight = map(seaLevel, 0, 1, deepestPixelHeight, highestPixelHeight);

  setupTerrain(numOfBoxes.active);

  // UI event listeners
  document.querySelectorAll('input[name="camera"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        cameraMode = radio.id; // "fixed", "flying", or "orbiting"
      }
    });
  });

  document.querySelectorAll('input[name="resolution"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        if (radio.id === "lowRes") {
          numOfBoxes.active = numOfBoxes.low;
          terrainSmoothness.active = terrainSmoothness.coarse;
        }
        else if (radio.id === "medRes") {
          numOfBoxes.active = numOfBoxes.medium;
          terrainSmoothness.active = terrainSmoothness.medium;
        }
        else if (radio.id === "highRes") {
          numOfBoxes.active = numOfBoxes.high;
          terrainSmoothness.active = terrainSmoothness.smooth;
        }
        else if (radio.id === "512Res") {
          numOfBoxes.active = numOfBoxes.ultra;
          terrainSmoothness.active = terrainSmoothness.ultraSmooth;
        }
        else if (radio.id === "1024Res") {
          numOfBoxes.active = numOfBoxes.insane;
          terrainSmoothness.active = terrainSmoothness.insaneSmooth;
        }

        setupTerrain(numOfBoxes.active); // rebuild terrain with new resolution
      }
    });
  });

  document.getElementById("exportGifButton").addEventListener("click", () => {
    saveGif('mySketch', 5); // saves a 5 second GIF
  });
}

function draw() {
  background(colors.background);

  if (cameraMode === "flying") {
    // fixed camera for flying animation
    camera(0, width, width / 1.5);
  } else if (cameraMode === "orbiting") {
    // orbiting camera for breathing animation
    camera(width * sin(millis() * orbitSpeed), width * cos(millis() * orbitSpeed), width / 1.7, 0, 0, 0, 0, 0, -1);
  } else {
    // fixed camera for breathing animation
    camera(width / 1.3, width / 1.3, width / 1.5, 0, 0, 0, 0, 0, -1);
  }

  directionalLight(255, 198, 114, -1, 0.75, -1);
  ambientLight(200);

  // Draws the terrain
  for (let i = 0; i < numOfBoxes.active; i++) {
    for (let j = 0; j < numOfBoxes.active; j++) {
      if (cameraMode === "flying") {
        boxes[i][j].update(perlinNoiseFlying(i, j)); // send height between 0 and 1
      } else {
        boxes[i][j].update(perlinNoiseBreathing(i, j)); // send height between 0 and 1
      }
      boxes[i][j].draw();
    }
  }

  // Draws the water
  translate(0, 0, seaLevelPixelHeight / 2);
  fill(colors.shallowWater);
  box(terrainSize - 0.1, terrainSize - 0.1, seaLevelPixelHeight);
}

function setupTerrain(resolution) {
  terrainSize = width - (margin * 2);
  boxSize = terrainSize / resolution;

  boxes = [];
  for (let i = 0; i < resolution; i++) {
    boxes[i] = [];
    for (let j = 0; j < resolution; j++) {
      let x = -(width / 2) + margin + (i * boxSize) + (boxSize / 2);
      let y = -(height / 2) + margin + (j * boxSize) + (boxSize / 2);
      let z = 0;

      boxes[i][j] = new Box(x, y, z, boxSize);
    }
  }
}

function perlinNoiseFlying(x, y) {
  return noise(x * terrainSmoothness.active, y * terrainSmoothness.active - millis() * animationSpeedFlying);
}

function perlinNoiseBreathing(x, y) {
  return noise(x * terrainSmoothness.active, y * terrainSmoothness.active, millis() * animationSpeedBreathing);
}
