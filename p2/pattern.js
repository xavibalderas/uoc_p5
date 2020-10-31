let scalePattern = 1;
let scaleSlider;
let seedSlider;
let seedLabel;
let startSlider;
let startLabel;
let scaleLabel;
let tilesLabel;
let randomScale = false;
let granularity = 20;
let scale = false;
let textPointer = 0;
let transparency = false;
let lastLetter = '';
let currentLetter = '';
let baseColor = [];
let secondaryColor = [];
let punctuationColor = [];
let seed=0;
let seedLength = 0;
// http://writing.upenn.edu/library/Schwitters-Kurt_URSONATE.html
let ursonate ='';
let textSeed = '';
let reloadButton;

function preload() {
  ursonate = loadStrings('https://raw.githubusercontent.com/xavibalderas/uoc_p5/master/p2/ursonate.txt');
}

function setup() {  
  createCanvas(512, 512);
  frameRate(10);
  seed=random(0,1000);
  textSeed = ursonate.toString();
  seedLength = textSeed.length;
  scalePattern = (randomScale)? random(0.3,1) : scalePattern;
  baseColor = [random(255), random(255), random(255)];
  secondaryColor = [random(255), random(255), random(255)];
  punctuationColor = [random(255), random(255), random(255)];
  scaleSlider = createSlider(0.1, 2, 1, 0.1);
  scaleSlider.position(10, height-30);
  scaleSlider.style('width', (width-20) + 'px');
  
  startSlider = createSlider(0, textSeed.length-1, round(random()*textSeed.length), 1);
  startSlider.position(10, height-100);
  startSlider.style('width', (width-20) + 'px');
  startLabel = createP("Start seed: ");
  startLabel.position(10, height-130);
  
  seedSlider = createSlider(1, textSeed.length, round(random(1,textSeed.length)),1);
  seedSlider.position(10, height-60);
  seedSlider.style('width', (width-20) + 'px');
  reloadButton = createButton('reload');
  reloadButton.position(10,10);
  reloadButton.mousePressed(reloadPattern);
  seedLabel = createP("Seed length: ");
  seedLabel.position(10, height-90);
  scaleLabel = createP("Scale factor: ");
  scaleLabel.position(10, height-60);
  tilesLabel = createP("Tiles: ");
  tilesLabel.position(10, 20);
}

function reloadPattern(){
    seed=random(0,1000);
    baseColor = [random(255), random(255), random(255)];
    secondaryColor = [random(255), random(255), random(255)];
  punctuationColor = [random(255), random(255), random(255)];
}


function draw() {
  background(255);
  randomSeed(seed);

  seedLength = seedSlider.value();
  scalePattern = scaleSlider.value();
  let startPoint = startSlider.value();
  textPointer = startPoint;
  
  let tileCount = round(granularity / scalePattern);
  tilesLabel.html('Tiles: ' + (tileCount * tileCount));
  
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

        if (charCode > 223 && charCode < 253) {            
          fill(secondaryColor);
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
              stroke(punctuationColor);
              line(0, tileSize/2, tileSize, tileSize/2);
              break;
            default:
              square(0, 0, tileSize);
          }//switch
      }//if

      resetMatrix();
      textPointer++;
      if (textPointer >= (startPoint + seedLength) ) {
        textPointer = startPoint;
      }else if(textPointer == textSeed.length){
        textPointer = 0;
      }
      lastLetter = currentLetter;

    } //columnas
  } // filas
  textPointer = startPoint;
  scaleLabel.html('Scale factor: ' + scalePattern );
  seedLabel.html('Seed length: ' + seedLength );
  startLabel.html('Start seed: ' + startPoint );
}

function keyReleased() {

  switch (key) {
    case 's':
      save ('patterns' + new Date().getTime() + '.png');
      break;
    case 't':
      transparency = !transparency;
      break; 
  }

  return false;
}