let grid;
let res = 12;
let rows, cols;
let frontier = [];
let visited = [];
let start, end;
let path = [];
let current;
let sel;
let button;
let button0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > 700) res = 16;
  rows = floor(height / res);
  cols = floor(width / res);
  makeGrid();
  frontier.push(start);
  start.inFrontier = true;
  
  button0 = createButton('Reset');
  button0.position(width/2 - 90, 3);
  button0.mousePressed(reset);
  
  button = createButton('Restart');
  button.position(width/2 - 30, 3);
  button.mousePressed(restart);
  
  sel = createSelect();
  sel.position(width*0.6, 3);
  sel.option('Heuristic: Manhattan');
  sel.option('Heuristic: Eucledian');
  sel.option('No Heuristic');
  sel.changed(restart);
}


function draw() {
  let txt = '';
  
  frameRate(60);
  console.log(frameRate());
  background(17);
  if (frontier.length > 0) {
    let minF = 0;
    for (let i = 0; i < frontier.length; i++) {
      if (frontier[i].f < frontier[minF].f) minF = i;
    }
    current = frontier[minF];
    current.isVisited = true;
    if (current === end) {
      console.log("Done!");
      noLoop();
    }
    visited.push(current);
    frontier.splice(minF, 1);

    let neighbors = current.neighbors;

    for (let n of neighbors) {
      if (!n.isVisited && !n.isWall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (n.inFrontier) {
          if (tempG < n.g) {
            n.g = tempG;
            newPath = true;
          }
        } else {
          n.g = tempG;
          frontier.push(n);
          n.inFrontier = true;
          newPath = true;
        }
        if (newPath) {
          n.h = heuristic(n, end);
          n.f = n.g + n.h;
          n.parent = current;
        }
      }
    }
    current.inFrontier = false;
  } else {
    noLoop();
    txt = 'No Solution Found \n Reset to try a new Maze';
    console.log("No Solution!");
  }
  renderGrid(current);   
  
  textAlign(CENTER);
  textSize(21);
  strokeWeight(0);
  fill(255);
  textFont('Helvetica');
  text(txt, 0, 150, width);
}



function makeGrid() {
  grid = new Array(rows);
  for (let i = 0; i < rows + 1; i++) {
    grid[i] = new Array(cols + 1);
  }

  for (let i = 0; i <= rows; i++) {
    for (let k = 0; k <= cols; k++) {
      grid[i][k] = new Node(k, i);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < cols; k++) {
      if (grid[i][k].isWall && i > 0 && i < rows - 1 && k > 0 && k < cols - 1) {
        if (
          !grid[i + 1][k].isWall &&
          !grid[i - 1][k].isWall &&
          !grid[i][k + 1].isWall &&
          !grid[i][k - 1].isWall
        ) {
          grid[i][k].isWall = false;
        }
      }
    }
  }

  //   for (let i = 1; i < rows; i++) {
  //       grid[i][cols - 9].isWall = true;
  //   }

  start = grid[2][2];
  start.isWall = false;
  end = grid[rows - 3][cols - 3];
  end.isWall = false;
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < cols; k++) {
      grid[i][k].addNeighbors(grid);
    }
  }
}

function renderGrid(current) {
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < cols; k++) {
      if (grid[i][k].isWall && i < rows - 1 && k < cols - 1) {
        strokeWeight(res * 0.35);
        stroke(100);
        if (grid[i + 1][k].isWall) {
          line(
            grid[i][k].x * res + res / 2,
            grid[i][k].y * res + res / 2,
            grid[i + 1][k].x * res + res / 2,
            grid[i + 1][k].y * res + res / 2
          );
        }
        if (grid[i][k + 1].isWall) {
          line(
            grid[i][k].x * res + res / 2,
            grid[i][k].y * res + res / 2,
            grid[i][k + 1].x * res + res / 2,
            grid[i][k + 1].y * res + res / 2
          );
        }
      }

      grid[i][k].show(color(17));
      if (grid[i][k].isVisited) grid[i][k].show(color(255, 82, 82, 90));
      if (grid[i][k].inFrontier) grid[i][k].show(color(82, 255, 114, 90));
    }
  }

  path = [];
  let lmao = current;
  path.push(current);
  while (current.parent != null) {
    path.push(current.parent);
    current = current.parent;
  }
  beginShape();
  noFill();
  stroke(200);
  strokeWeight(3);
  if (lmao === end) {
    stroke(240);
  }
  for (let el of path) {
    vertex(el.x * res + res / 2, el.y * res + res / 2);
    //el.show(color(230))
  }
  endShape();
  end.show(color(3, 252, 202));
  start.show(color(200, 25, 100));
}

function heuristic(a, b) {
  let d;
  if (sel.value() === 'Heuristic: Manhattan') d = abs(a.x - b.x) + abs(a.y - b.y);
  else if (sel.value() === 'Heuristic: Eucledian') d = dist(a.x, a.y, b.x, b.y); 
  else return 0;
  return d;
}

function restart() {
  loop();
  frontier = [];
  visited = [];
  path = [];
  
  for (let i = 0; i <= rows; i++) {
    for (let k = 0; k <= cols; k++) {
      grid[i][k].isVisited = false;
      grid[i][k].inFrontier = false;
    }
  }
  frontier.push(start);
  start.inFrontier = true;
}

function reset() {
  loop();
  restart();
  makeGrid();
  restart();
}
