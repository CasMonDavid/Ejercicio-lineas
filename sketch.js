let input, button;
let slices = 6;

function setup() {
  createCanvas(600, 400);
  background(255);
  textAlign(CENTER, CENTER);
 
  input = createInput('6');
  input.position(665, 400);
  input.size(100);
 
  button = createButton('Cortar pizzas');
  button.position(input.x + input.width + 20, 400);
  button.mousePressed(updateSlices);
 
  strokeWeight(1);
}

function draw() {
  background(200);

  input.position(windowWidth/2, windowHeight/2);
  button.position(input.x + input.width + 20, input.y);

  textSize(16);
  fill(0);
  text('Pizza 1: Punto-Pendiente', 100, 80);
  text('Pizza 2: DDA', 300, 80);
  text('Pizza 3: Bresenham', 500, 80);
 
  drawPizza1(100, 200, 80, slices);
  drawPizza2(300, 200, 80, slices);
  drawPizza3(500, 200, 80, slices);
}

function updateSlices() {
  let val = int(input.value());
  if (val > 0 && val <= 100) { // Validar el número de rebanadas MAX = 100
    slices = val;
  }
}

// Pizza 1: Algoritmo de punto-pendiente
function drawPizza1(x, y, radius, numSlices) {
  fill('#FFD580');
  stroke(0);
  ellipse(x, y, radius * 2);
  stroke(150, 0, 0);
 
  for (let i = 0; i < numSlices; i++) {
    let angle = TWO_PI / numSlices * i;
    let xEnd = x + cos(angle) * radius;
    let yEnd = y + sin(angle) * radius;
    linePointSlope(x, y, xEnd, yEnd);
  }
}

// Pizza 2: Algoritmo DDA
function drawPizza2(x, y, radius, numSlices) {
  fill('#FFA07A');
  stroke(0);
  ellipse(x, y, radius * 2);
  stroke(0, 100, 200);
 
  for (let i = 0; i < numSlices; i++) {
    let angle = TWO_PI / numSlices * (i + 0.5);
    let xEnd = x + cos(angle) * radius;
    let yEnd = y + sin(angle) * radius;
    lineDDA(x, y, xEnd, yEnd);
  }
}

// Pizza 3: Algoritmo de Bresenham
function drawPizza3(x, y, radius, numSlices) {
  fill('#98FB98');
  stroke(0);
  ellipse(x, y, radius * 2);
  stroke(200, 100, 0);
 
  let offset = random(0.0001);
  for (let i = 0; i < numSlices; i++) {
    let angle = TWO_PI / numSlices * i + offset;
    let xEnd = x + cos(angle) * radius;
    let yEnd = y + sin(angle) * radius;
    lineBresenham(x, y, round(xEnd), round(yEnd));
  }
}

// Algoritmo de línea "punto-pendiente"
function linePointSlope(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
 
  if (abs(dx) >= abs(dy)) {
    if (x0 > x1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
      dx = x1 - x0;
      dy = y1 - y0;
    }
    let m = dy / dx;
    for (let x = x0; x <= x1; x++) {
      let y = y0 + m * (x - x0);
      point(x, y);
    }
  } else {
    if (y0 > y1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
      dx = x1 - x0;
      dy = y1 - y0;
    }
    let mInv = dx / dy;
    for (let y = y0; y <= y1; y++) {
      let x = x0 + mInv * (y - y0);
      point(x, y);
    }
  }
}

// Algoritmo DDA
function lineDDA(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let steps = max(abs(dx), abs(dy));
  let xInc = dx / steps;
  let yInc = dy / steps;
  let x = x0;
  let y = y0;
  for (let i = 0; i <= steps; i++) {
    point(round(x), round(y));
    x += xInc;
    y += yInc;
  }
}

// Algoritmo de Bresenham
function lineBresenham(x0, y0, x1, y1) {
  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = (x0 < x1) ? 1 : -1;
  let sy = (y0 < y1) ? 1 : -1;
  let err = dx - dy;
 
  while (true) {
    point(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}