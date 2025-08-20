class Tree {
  draw(boxHeight) {
    noStroke();

    push();

    translate(0, 0, (boxHeight / 2) + (boxSize / 2));
    fill(colors.treeTrunk);
    box(boxSize / 6, boxSize / 6, boxSize);

    translate(0, 0, (boxSize / 1.5) / 2);
    fill(colors.treeLeaves);
    box(boxSize / 2, boxSize / 2, boxSize / 1.5);

    pop();
  }
}