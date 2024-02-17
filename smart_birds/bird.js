class Bird {
  constructor() {
    this.DNA = new DNA();
    this.pos = createVector(width * 0.15, height - 150);
    this.isDead = false;
  }
  
  update(force) {
    this.DNA.vec.add(force);
    this.DNA.vec.limit(25);
    this.pos.add(this.DNA.vec);
    let d = this.pos.dist(target);
    if (d < this.DNA.minDist) this.DNA.minDist = d;
    if (this.pos.y > height + 150) this.isDead = true;
  }
  
  show() {
    noStroke();
    fill(24, 70);
    if (this.idDead) fill(200, 0, 0);
    //ellipse(this.pos.x, this.pos.y, 10);
    imageMode(CENTER)
    image(redImg, this.pos.x, this.pos.y, 15, 15)
  }
}