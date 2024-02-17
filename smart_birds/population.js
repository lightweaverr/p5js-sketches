class Population {
  constructor(populationSize, mutationRate) {
    this.numOfDead = 0;
    this.best = 1000000;
    this.accuracy = 0;
    this.gen = 0;
    this.mutationRate = mutationRate;
    this.birds = [];
    this.makeRandomPopulation(populationSize);
  }

  makeRandomPopulation(n) {
    for (let i = 0; i < n; i++) {
      this.birds.push(new Bird());
    }
  }
  
  naturalSelection() {
    let fuck = 0
    let fittest = 0;
    let fit = 0;
    for (let bird of this.birds) {
      let x = 1 / (bird.DNA.minDist)**3;
      if (bird.DNA.minDist < 21) fuck++;
      if (bird.DNA.minDist < this.best) this.best = bird.DNA.minDist;
      bird.DNA.fitness = x;
      fit += x;
    }
    this.accuracy = floor(fuck/this.birds.length * 100);
    
    for (let bird of this.birds) {
      bird.DNA.fitness /= fit;
      if (bird.DNA.fitness > fittest ) fittest = bird.DNA.fitness;
    }
    this.best = 1000000;
    let newBirds = [];
    let pool = [];
      
    for (let bird of this.birds) {
      let x = bird.DNA.fitness * 1000;
      for (let i = 0; i < x; i++) {
        pool.push(bird);
      }
    }
    for (let i = 0; i < this.birds.length; i++) {
      let parent1, parent2;
      // let flag = false;
      // while(!flag) {
      //   let prl = random(this.birds);
      //   if (random(1) < prl.DNA.fitness) {
      //     parent1 = prl;
      //     flag = true;
      //   }
      // }
      // flag = false;
      // while(!flag) {
      //   let prl = random(this.birds);
      //   if (random(1) < prl.DNA.fitness) {
      //     parent2 = prl;
      //     flag = true;
      //   }
      // }
      
      
      parent1 = random(pool);
      parent2 = random(pool);
      let b = new Bird();
      b.DNA.vec.setHeading(parent1.DNA.originalVec.heading());
      b.DNA.vec.setMag(parent2.DNA.originalVec.mag());
      b.DNA.originalVec.setHeading(parent1.DNA.originalVec.heading());
      b.DNA.originalVec.setMag(parent2.DNA.originalVec.mag());
      b.DNA.mutate(this.mutationRate);
      newBirds.push(b);
    }
    this.birds = newBirds;
    this.numOfDead = 0;
    this.gen++;
  }

  update(force) {
    this.numOfDead = 0;
    for (let bird of this.birds) {
      bird.update(gravity);
      bird.show();
      if (bird.isDead) this.numOfDead++;
    }
    //console.log(this.numOfDead);
    if (this.numOfDead >= this.birds.length) {
      this.naturalSelection();
      // this.birds = [];
      // this.makeRandomPopulation(this.numOfDead);
      // this.numOfDead = 0;
    }
  }
}
