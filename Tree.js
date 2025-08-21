class Tree {
  draw(boxPixelHeight) {
    noStroke();

    push();

    translate(0, 0, (boxPixelHeight / 2) + (boxWidth / 2));
    fill(colors.treeTrunk);
    box(boxWidth / 6, boxWidth / 6, boxWidth);

    translate(0, 0, (boxWidth / 1.5) / 2);
    fill(colors.treeLeaves);
    box(boxWidth / 2, boxWidth / 2, boxWidth / 1.5);

    pop();
  }
}
