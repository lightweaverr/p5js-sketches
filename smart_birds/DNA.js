class DNA {
  constructor() {
    this.vec = p5.Vector.random2D();
    this.vec.mult(random(30));
    this.originalVec = this.vec.copy();
    this.minDist = 100000;
    this.fitness = 0;
  }

  calcFitness() {
    this.fitness = 1 / minDist;
  }

  crossover(partner) {
    let child = new DNA();

    if (random(1) > 0.5) child.vec.setHeading(this.heading());
    else child.vec.setHeading(partner.heading());

    if (random(1) > 0.5) child.vec.setMag(this.mag());
    else child.vec.setMag(partner.mag());

    return child;
  }

  mutate(mutationRate) {
    if (random(1) < mutationRate) {
      if (random(1) < 0.5) this.vec.setMag(this.vec.mag() + random(2));
      else this.vec.setMag(this.vec.mag() - random(2));
    }

    if (random(1) < mutationRate) {
      if (random(1) < 0.5) this.vec.setHeading(this.vec.heading() + random(0.1));
      else this.vec.setHeading(this.vec.heading() - random(0.1));
    }
    this.vec.setMag(this.vec.mag() + random([random(0.07), -random(0.07)]));
  }
}
