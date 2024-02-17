class Node {
  constructor(x, y) {
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.x = x;
    this.y = y;
    this.isVisited = false;
    this.inFrontier = false;
    this.neighbors = [];
    this.parent = null;
    this.isWall = false;
    if (random(1) < 0.5) {
      this.isWall = true;
    }
  }

  show(col) {
    noStroke();
    fill(col);
    if (this.isWall) {
      fill(100);
      ellipse(this.x * res + res / 2, this.y * res + res / 2, res / 2.9);
    } else rect(this.x * res, this.y * res, res, res);
  }

  addNeighbors(grid) {
    let i = this.y;
    let j = this.x;

    if (j < cols - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i < rows - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < rows - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < cols - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < rows - 1 && j < cols - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}
