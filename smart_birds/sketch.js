let gravity; 
let birds;
let target;
let bgImg, targetImg, redImg;
function preload() {
  bgImg = loadImage('assets/bg-0.jpeg');
  targetImg = loadImage('assets/target.png');
  redImg = loadImage('assets/Red.png');
}

// 1442 719

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  gravity = createVector(0, 0.3);
  target = createVector(width * 0.9, height * 0.4);
  birds = new Population(100, 0.01);
}

function draw() {
  
  
  renderGraphics();
  frameRate(300);
  birds.update();
  renderText();
  
}

function renderText() {
  textSize(17)
  fill(17);
  text('Generation: ' + birds.gen, 20, 30);
  text('Accuracy: ' + birds.accuracy + ' %', 20, 60);
}

function renderGraphics() {

  //background(240);
  imageMode(CORNER)
  
  background(bgImg)
  noStroke()
  fill(80);
  let x = width * 0.15;
  let y = height - 150;
  rect(x - 20, y - 10, 40, 10);
  ellipse(target.x, target.y, 20);
  imageMode(CENTER)
  image(targetImg, target.x, target.y, 30, 30)
}