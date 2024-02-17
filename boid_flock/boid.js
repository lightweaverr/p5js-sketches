class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(5), random(5));
    this.maxSpeed = random(3, 6);
    this.maxForce = random(0.1, 0.4);
    this.theta = 0;
    this.r = 7;
  }

  flock(flock) {
    let acc = createVector(0,0);
    acc.add(this.align(flock).mult(alignSlider.value()));
    acc.add(this.cohesion(flock).mult(cohesionSlider.value()));
    acc.add(this.separation(flock).mult(separationSlider.value()))
    this.applyForce(acc);
  }

  update(flock) {
    this.flock(flock);
    this.theta = this.vel.heading();
    this.pos.add(this.vel);
    this.edges();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.theta);
    strokeWeight(0.5);
    stroke(140);
    fill(240);
    let r = this.r;
    triangle(r * 2, 0, -r / 2, -r / 2, -r / 2, r / 2);
    pop();
  }

  applyForce(force) {
    this.vel.add(force);
    this.vel.limit(this.maxSpeed);
  }

  align(flock) {
    let perceptionRadius = 25;
    let avg = createVector(0, 0);
    let total = 0;
    //let flock = flockk.map(a => ({...a}));
    
    for (let boid of flock) {
      if (this.pos.dist(boid.pos) < perceptionRadius) {
        avg.add(boid.vel);
        total++;
      }
    }
    avg.div(total).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
    return avg;
  }

  cohesion(flock) {
    let perceptionRadius = 50;
    let avg = createVector(0, 0);
    let total = 0;
    for (let boid of flock) {
      if (this.pos != boid.pos && this.pos.dist(boid.pos) < perceptionRadius) {
        avg.add(boid.pos);
        total++;
      }
    }
    if (total > 0) {
      avg.div(total);
      avg.sub(this.pos)
      avg.setMag(this.maxSpeed);
      avg.sub(this.vel);
      avg.limit(this.maxForce);
    }
    return avg;
  }

  separation(flock) {
    let perceptionRadius = 25;
    let avg = createVector(0, 0);
    let total = 0;
    for (let boid of flock) {
      let d = this.pos.dist(boid.pos);
      if (this != boid && d < perceptionRadius) {
        let dv = p5.Vector.sub(this.pos, boid.pos);
        dv.div(d * d);
        avg.add(dv);
        total++;
      }
    }
    if (total > 0) {
      avg.div(total);
      avg.setMag(this.maxSpeed);
      avg.sub(this.vel);
      avg.limit(this.maxForce);
    }
    return avg;
  }

  seek(target) {
    let desiredVelocity = p5.Vector.sub(target, this.pos)
      .normalize()
      .mult(this.maxSpeed);

    let steering = p5.Vector.sub(desiredVelocity, this.vel);
    return steering.limit(this.maxForce);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width;
    else this.pos.x = this.pos.x % width;
    if (this.pos.y < 0) this.pos.y = height;
    else this.pos.y = this.pos.y % height;
  }
}
