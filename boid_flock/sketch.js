let pattern;
let target;
let maxSpeedSlider, steeringPowerSlider;
let flock = [];
let N = 221;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < 500) N = 70;
  sliderSetup();
  target = createVector(random(width), random(height));
  for (let i = 0; i < N; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  target = createVector(mouseX, mouseY);
  background(17);
  for (let boid of flock) {
    boid.update(flock);
    boid.show();
  }
}

function sliderSetup() {
  alignSlider = createSlider(0, 3, 1, 0.01);
  alignSlider.style('width', width/2 + 'px');
  alignSlider.position(0,height - 45);
  cohesionSlider = createSlider(0, 3, 1, 0.01);
  cohesionSlider.style('width', width/2 + 'px');
  cohesionSlider.position(0,height - 25);
  separationSlider = createSlider(0, 3, 1, 0.01);
  separationSlider.style('width', width/2 + 'px');
  separationSlider.position(0,height - 65);
  
}

