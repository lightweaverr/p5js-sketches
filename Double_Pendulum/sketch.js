let L1 = 190;
let L2 = 190;
let M1 = 15;
let M2 = 15;
let THETA1 = Math.PI * Math.random() * 10;
let THETA2 = Math.PI * Math.random() * 10;
let V1 = 0;
let V2 = 0;
let g = 0.3;
let x = 0

let s1, s2, s3, s4;

setup = () => {
  trailCanvas = createGraphics(windowWidth, windowHeight-20)
  trailCanvas.clear()
  createCanvas(windowWidth, windowHeight-20);
  s1 = createSlider(1, 50, 15, 0.1);
  s2 = createSlider(10, 300, 190, 1);
  s3 = createSlider(1, 50, 15, 0.1);
  s4 = createSlider(10, 300, 190, 1);
}


draw = () => {
  background(17);
  M1 = s1.value()
  L1 = s2.value()
  M2 = s3.value()
  L2 = s4.value()
  
  

  let A1 = ((-g * (2 * M1 + M2) * sin(THETA1)) + (-M2 * g * sin(THETA1 - 2 * THETA2)) + (-2 * sin(THETA1 - THETA2) * M2) * (V2 * V2 * L2 + V1 * V1 * L1 * cos(THETA1 - THETA2))) / (L1 * (2 * M1 + M2 - M2 * cos(2 * THETA1 - 2 * THETA2)));
  
  let A2 = ((2 * sin(THETA1 - THETA2)) * ((V1 * V1 * L1 * (M1 + M2)) + (g * (M1 + M2) * cos(THETA1)) + (V2 * V2 * L2 * M2 * cos(THETA1 - THETA2)))) / (L2 * (2 * M1 + M2 - M2 * cos(2 * THETA1 - 2 * THETA2)));
  
  translate(width/2, 100);
  //trailCanvas.translate(windowWidth/2, 100)
  stroke(255);
  strokeWeight(3);
  
  let x1 = L1 * sin(THETA1);
  let y1 = L1 * cos(THETA1);

  let x2 = x1 + L2 * sin(THETA2);
  let y2 = y1 + L2 * cos(THETA2);

  line(0, 0, x1, y1);
  fill(255);
  ellipse(x1, y1, M1 * 2);
  trailCanvas.fill(255, 17)
  trailCanvas.noStroke()
  trailCanvas.ellipse(width/2+ x2, 100 + y2, M2);

  line(x1, y1, x2, y2);
  fill(255);
  ellipse(x2, y2, M2 * 2);

  V1 += A1;
  V2 += A2;
  THETA1 += V1;
  THETA2 += V2;
  
  // x = (x + 1) % 100
  // x === 0 ? trailCanvas.clear() : true 
  
  
  image(trailCanvas,-width/2 , -100)
}





