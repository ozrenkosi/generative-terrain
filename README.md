# Generative Terrain Animation

Procedurally generated terrain animation built with **p5.js**

## Overview

This project demonstrates a procedural terrain animation rendered in the web browser using **p5.js**, a JavaScript library for creative coding and visualization. 

The goal is to show how simple algorithmic methods can be combined into a visually engaging and dynamic result.  

It is customizable with parameters such as **camera position** and **terrain resolution**, and also offers **GIF export** for capturing animations.


## Demo

Live demo available here:  
[ozrenkosi.github.io/generative-terrain/](https://ozrenkosi.github.io/generative-terrain/)


## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ozrenkosi/generative-terrain.git
   ```
2. Open `index.html` in your browser (best to use a local server)
3. Watch the terrain come to life!


## How It Works

The terrain is generated dynamically in the draw loop using a combination of 3D boxes and noise-based transformations:

1. **Canvas Setup**
    - In `main.js`, A `WEBGL` canvas is created with p5.js, allowing 3D rendering.
    - The camera is positioned at an angle to view the grid of boxes as a landscape.

2. **Terrain Grid**
    - The terrain consists of a grid of `Box` objects.
    - Each box has a height determined by **Perlin noise**, creating natural smooth variations instead of random spikes.
    - As the noise offset shifts over time, the terrain animates like moving waves.

3. **Trees**
    - `Tree.js` defines tree objects that can be placed at certain grid heights.
