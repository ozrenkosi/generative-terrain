class Box {
  constructor(x, y, z, boxWidth) {
    this.position = createVector(x, y, z);
    this.size = boxWidth;
    this.color = null;
    this.height = 0.5; // 0 is the deepest point of the water and 1 is the highest mountain peak
    this.pixelHeight = 100;

    this.tree = new Tree();
  }

  draw() {
    noStroke();

    push();

    translate(this.position.x, this.position.y, this.position.z + (this.pixelHeight / 2));
    fill(this.color);
    box(this.size, this.size, this.pixelHeight);

    // Draws the trees
    if (this.height > terrainHeight.forestLevel - 0.1) {
      this.tree.draw(this.pixelHeight);
    }

    pop();
  }

  update(value) {
    this.height = value;
    this.pixelHeight = map(this.height, 0, 1, terrainPixelHeight.deepest, terrainPixelHeight.highest);
    this.color = this.calculateColor();
  }

  calculateColor() {
    if (this.height <= terrainHeight.deepWaterLevel) {
      return colors.deepWater;
    }
    else if (this.height < terrainHeight.grassLevel) {
      return colors.sand;
    }
    else if (this.height < terrainHeight.forestLevel) {
      return colors.grass;
    }
    else {
      return colors.forest;
    }
  }
}
