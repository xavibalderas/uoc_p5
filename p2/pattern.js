//Variables de configuració
let scalePattern = 1;
let granularity = 20;
let transparency = false;
let randomScale = false; // si es "true", cada vegada que s'inicia scalePattern es diferent

//UI
let scaleSlider;
let seedSlider;
let seedLabel;
let startSlider;
let startLabel;
let scaleLabel;
let tilesLabel;
let reloadButton;

//color palete
let baseColor = [];
let secondaryColor = [];
let punctuationColor = [];

//Text elements
let seed=0;
let seedLength = 0;
// http://writing.upenn.edu/library/Schwitters-Kurt_URSONATE.html
let ursonate ='';
let textSeed = '';
let lastLetter = '';
let currentLetter = '';
let textPointer = 0; //el cursor que es mou restrejant el text


function preload() {
  //Carrega el text abans d'executar l'sketch
  ursonate = loadStrings('https://raw.githubusercontent.com/xavibalderas/uoc_p5/master/p2/ursonate.txt');
}

function setup() {  

  createCanvas(512, 512);
  frameRate(10); // no cal un frameRate massa alt perquè no tenim animació
  
  seed=random(0,1000); // el seed inicial es random, així fem que cada vegada que s'executa sigui diferent
  
  //Configurem el text
  textSeed = ursonate.toString(); //Ho pasem tot a un unic string, enlloc d'un array per linies
  seedLength = textSeed.length; //Cuantes lletres hi tenim

  //Configurem el pattern
  scalePattern = (randomScale)? random(0.3,1) : scalePattern; // el factor d'escala pot ser random d'inici.
  
  //Configurem la paleta de colors
  baseColor = [random(255), random(255), random(255)];
  secondaryColor = [random(255), random(255), random(255)];
  punctuationColor = [random(255), random(255), random(255)];

  //Afegim els elemets de l'UI
  //Un slider per l'escala.
  scaleSlider = createSlider(0.1, 2, scalePattern, 0.1); 
  scaleSlider.position(10, height-30);
  scaleSlider.style('width', (width-20) + 'px');
  scaleLabel = createP("Scale factor: "); //etiqueta
  scaleLabel.position(10, height-60);
  
  //Un slider per definir l'inici del text.
  startSlider = createSlider(0, textSeed.length-1, round(random() * textSeed.length), 1);
  startSlider.position(10, height-100);
  startSlider.style('width', (width-20) + 'px');
  startLabel = createP("Start seed: "); //etiqueta
  startLabel.position(10, height-130);
  
  //Un slider per definir quant text s'utilitza.
  seedSlider = createSlider(1, textSeed.length, round(random(1,textSeed.length)),1);
  seedSlider.position(10, height-60);
  seedSlider.style('width', (width-20) + 'px');
  seedLabel = createP("Seed length: "); //etiqueta
  seedLabel.position(10, height-90);

  //Un botó per carregar un nou pattern aleatori
  reloadButton = createButton('reload');
  reloadButton.position(10,10);
  reloadButton.mousePressed(reloadPattern);
  
  //Una etiqueta que ens indica quants objectes tenim al pattern
  tilesLabel = createP("Tiles: ");
  tilesLabel.position(10, 20);
}

//Quan es prem el butó "reload", s'executa aquesta funció
function reloadPattern(){
    randomSeed(new Date().getTime()); // per afegir variació utilitzem el temps actual, així sempre tenim un seed diferent.
    seed=random(0,1000); // nova llavor random
    //Nova paleta
    baseColor = [random(255), random(255), random(255)];
    secondaryColor = [random(255), random(255), random(255)];
    punctuationColor = [random(255), random(255), random(255)];
}


function draw() {

  background(255);
  randomSeed(seed); // així fem que a cada draw, el pattern és el mateix.

  // Agafem els paràmetres de configuració de l'UI
  seedLength = seedSlider.value(); // longitud the text
  scalePattern = scaleSlider.value(); // factor d'escala
  let startPoint = startSlider.value(); // punt d'inici del text
  textPointer = startPoint; // posem el cursor al punt d'inici.

  //afegim els valors a les etiquetes
  scaleLabel.html('Scale factor: ' + scalePattern );
  seedLabel.html('Seed length: ' + seedLength );
  startLabel.html('Start seed: ' + startPoint );
  
  let tileCount = round(granularity / scalePattern);  //calculem el nombre d'objectes en fucnió de l'escala
  let tileSize = width / tileCount; // la mida de cada "rajola"

  tilesLabel.html('Tiles: ' + (tileCount * tileCount)); //mostrem el nombre d'objectes al label.
  
  // Dos bucles per recórrer les files x columnes del canvas
  for (let filas = 0; filas < tileCount; filas++) {
    for (let columnas = 0; columnas < tileCount; columnas++) {
      
      //Agafem la lletra actual, basant-nos en la variable textPointer, que es mou a cada iteració
      currentLetter = textSeed[textPointer];
      let charCode = currentLetter.charCodeAt(); // el codi ASCII de la lletra

      //Movem el sistema de coordenades al punt d'inici filaxcolumna
      translate(tileSize * columnas, tileSize * filas);
        noStroke(); 
        // si "transparency" té un valor "true", llavors afegim un factor d'opacitat a la paleta
        // transparency es controla amb la tecla "t"
        if (transparency) {
          fill(baseColor.concat([random(255)]));
        } else {
          fill(baseColor);
          stroke ('white'); // sense transparéncia, afegim una línea blanca
        }

        if (charCode > 223 && charCode < 253) { // totes les lletres amb accent o "umlaut"
          fill(secondaryColor);
          triangle(0, tileSize, tileSize / 2, 0, tileSize, tileSize);
        } else { // per la resta
          switch (currentLetter) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
              //totes les vocals
              ellipse(tileSize / 2, tileSize / 2, tileSize, tileSize);
              break;
            case ' ':
              //tots els espais
              stroke(punctuationColor);
              line(0, tileSize/2, tileSize, tileSize/2);
              break;
            default:
              //la resta de caracters
              square(0, 0, tileSize);
          }//switch
      }//if

      resetMatrix(); //tornem les coordenades al punt original, abans de la següent iteració
      textPointer++; // movem el cursor sobre el text al següent caracter

      //comprovem si el cursor ha sobrepassat la longitud definida o el final del text.
      if (textPointer >= (startPoint + seedLength) ) {
        textPointer = startPoint;
      }else if(textPointer == textSeed.length){
        textPointer = 0;
      }
      //guardem la lletra actual, per utilitzar-la a la següent iteració
      lastLetter = currentLetter;

    } //columnas
  } // filas
  
}


// funció que s'executa cada vegada que "soltem" una tecla
function keyReleased() {

  switch (key) {
    case 's':
      //guardem el pattern. Li agefim el temps numéric, per tenir un nom únic cada vegada
      save ('patterns' + new Date().getTime() + '.png');
      break;
    case 't':
      // activa / desactiva la transparéncia a la paleta
      transparency = !transparency;
      break; 
  }
  
  return false;
}