let scalePattern = 1;
let randomScale = false;
let granularity = 20;
let scale = false;
let textPointer = 0;
let transparency = false;
let lastLetter = '';
let currentLetter = '';
let baseColor = [];
let seed=0;
// http://writing.upenn.edu/library/Schwitters-Kurt_URSONATE.html
let ursonate ='';
let textSeed = '';

function preload() {
  ursonate = loadStrings('https://raw.githubusercontent.com/xavibalderas/uoc_p5/master/p2/ursonate.txt');
}

function setup() {  
  createCanvas(512, 512);
  frameRate(10);
  seed=random(0,1000);
  textSeed = ursonate.toString();
  scalePattern = (randomScale)? random(0.3,1) : scalePattern;
  baseColor = [random(255), random(255), random(255)];
}

function draw() {
  background(255);
  randomSeed(seed);
  if (scale) {
    scalePattern = map(mouseY, 0, height, 0.1, 1);
  }
  textPointer = round(random()*textSeed.length);
  let tileCount = round(granularity / scalePattern);
  let tileSize = width / tileCount;
  for (let filas = 0; filas < tileCount; filas++) {
    for (let columnas = 0; columnas < tileCount; columnas++) {
      currentLetter = textSeed[textPointer];
      translate(tileSize * columnas, tileSize * filas);
      noStroke();
      if (transparency) {
        fill(baseColor.concat([random(255)]));
      } else {
        fill(baseColor);
        stroke ('white');
      }
      let charCode = currentLetter.charCodeAt();

      if (false) {
        stroke(random(255));
        strokeWeight(1);
        line(0, random(0, tileSize), tileSize, random(0, tileSize));
      } else if (charCode > 223 && charCode < 253) {
        triangle(0, tileSize, tileSize / 2, 0, tileSize, tileSize);
      } else {
        switch (currentLetter) {
          case 'a':
          case 'e':
          case 'i':
          case 'o':
          case 'u':
            ellipse(tileSize / 2, tileSize / 2, tileSize, tileSize);
            break;
          case ' ':
            stroke(baseColor);
            line(0, tileSize/2, tileSize, tileSize/2);
            break;
          default:
            square(0, 0, tileSize);
        }
      }

      resetMatrix();
      textPointer++;
      if (textPointer == textSeed.length) {
        textPointer = 0;
      }
      lastLetter = currentLetter;

    } //columnas
  } // filas
  textPointer = 0;

}

function keyReleased() {

  switch (key) {
    case 's':
      scale = !scale;
      break;
    case 't':
      transparency = !transparency;
      break;
    case 'd':
        save ('patterns' + new Date().getTime() + '.png');
      break;
  }

  return false;
}