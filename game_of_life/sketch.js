let unit;
let grid = [];
let newGrid = [];
let light = 240;
let dark = 17;
let button;
let runMode = true;

function setup() {
  console.log(windowWidth);
  windowWidth > 500 ? (unit = 10) : (unit = 20);
  createCanvas(windowWidth, windowHeight);
  rows = floor(height / unit) + 1;
  columns = floor(width / unit) + 1;
  button = createButton("Draw/Run");
  button.position(0, 0);
  button.mousePressed(switchMode);
  for (let i = 0; i < rows; i++) {
    // (arr = []).length = columns;
    // arr.fill(dark);
    // grid.push(arr)
    arr = [];
    for (let k = 0; k < columns; k++) {
      r = random(100);
      r > 21 ? arr.push(dark) : arr.push(light);
    }
    grid.push(arr);
  }
}

function draw() {
  newGrid = [];
  strokeWeight(0.03);
  stroke(light);
  background(17);
  for (let i = 0; i < rows; i += 1) {
    for (let k = 0; k < columns; k += 1) {
      fill(grid[i][k]);
      rect(k * unit, i * unit, unit, unit);
    }
  }

  if (runMode) {
    if (!mouseIsPressed) {
      update();
    } else {
      wtf();
    }
  } else {
    if (mouseIsPressed) {
      wtf();
    }
  }
}

const update = () => {
  for (let i = 1; i < rows - 1; i += 1) {
    row = [dark];
    for (let k = 1; k < columns - 1; k += 1) {
      hehe = 0;
      grid[i - 1][k] === light ? hehe++ : true;
      grid[i - 1][k + 1] === light ? hehe++ : true;
      grid[i][k + 1] === light ? hehe++ : true;
      grid[i + 1][k + 1] === light ? hehe++ : true;
      grid[i + 1][k] === light ? hehe++ : true;
      grid[i + 1][k - 1] === light ? hehe++ : true;
      grid[i][k - 1] === light ? hehe++ : true;
      grid[i - 1][k - 1] === light ? hehe++ : true;

      if (hehe === 3) {
        row.push(light);
      } else if (hehe > 3 || hehe < 2) {
        row.push(dark);
      } else {
        row.push(grid[i][k]);
      }
    }
    row.push(dark);
    newGrid.push(row);
  }
  (arr = []).length = columns;
  arr.fill(dark);
  newGrid.push(arr);
  newGrid.unshift(arr);
  grid = newGrid.slice();
};

const switchMode = () => {
  runMode = !runMode;
};

function wtf() {
  row = floor(mouseY / unit);
  column = floor(mouseX / unit);

  if (grid[row][column] === dark) {
    grid[row][column] = light;
    fill(light);
    rect(column * unit, row * unit, unit, unit);
  }
}

function mousePressed() {
  row = floor(mouseY / unit);
  column = floor(mouseX / unit);
  let khw;
  grid[row][column] === light ? (khw = dark) : (khw = light);
  //console.log(khw);
  fill(khw);
  grid[row][column] = khw;
  //   grid[row][column] = light;

  //   fill(light);
  rect(column * unit, row * unit, unit, unit);
}

function touchStarted() {
  row = floor(mouseY / unit);
  column = floor(mouseX / unit);
  let khw;
  grid[row][column] === light ? (khw = dark) : (khw = light);
  //console.log(khw);
  fill(khw);
  grid[row][column] = khw;
  //   grid[row][column] = light;

  //   fill(light);
  rect(column * unit, row * unit, unit, unit);
}
