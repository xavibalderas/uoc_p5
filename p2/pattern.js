//Variables de configuració
let scalePattern = 1;
let granularity = 20;
let transparency = true;
let randomScale = true; // si es "true", cada vegada que s'inicia scalePattern es diferent

//UI
let scaleSlider;
let seedSlider;
let seedLabel;
let startSlider;
let startLabel;
let scaleLabel;
let tilesLabel;
let reloadButton;
let gridLines = false;

let presetB_A, presetB_B, presetB_C, presetB_D, presetB_E, presetB_F;

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




function preload() {
  //Carrega el text abans d'executar l'sketch
  ursonate = loadStrings('https://raw.githubusercontent.com/xavibalderas/uoc_p5/master/p2/ursonate.txt');
}

function setup() {  

  //createCanvas(512, 512);
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB); //360, 100,100,1
  frameRate(10); // no cal un frameRate massa alt perquè no tenim animació
  rectMode(CENTER);
  ellipseMode(CENTER);
  
  seed=random(0,1000); // el seed inicial es random, així fem que cada vegada que s'executa sigui diferent
  
  //Configurem el text
  textSeed = ursonate.toString(); //Ho pasem tot a un unic string, enlloc d'un array per linies
  seedLength = textSeed.length; //Cuantes lletres hi tenim

  //Configurem el pattern
  scalePattern = (randomScale)? random(0.3,1) : scalePattern; // el factor d'escala pot ser random d'inici.
  
  //Configurem la paleta de colors
  baseColor = [53,6,11];
  secondaryColor = [358,95,82];
  terciaryColor = [53,100,100];
  punctuationColor = [190,100,67];

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

  //Els botons dels presets
  presetB_A = createButton('see');
  presetB_A.position(width-70,10);
  presetB_A.mousePressed(()=>loadPreset(1766, 17, 0.3)); // si no ho passo com funció, executa directament sense l'event.

  presetB_B = createButton('corners');
  presetB_B.position(width-70,30);
  presetB_B.mousePressed(()=>loadPreset(1574, 9, 0.6));

  presetB_C = createButton('score');
  presetB_C.position(width-70,50);
  presetB_C.mousePressed(()=>loadPreset(1476, 9 ,0.6));

  presetB_D = createButton('bubbles');
  presetB_D.position(width-70,70);
  presetB_D.mousePressed(()=>loadPreset(127, 34,0.4));

  presetB_E = createButton('beach');
  presetB_E.position(width-70,90);
  presetB_E.mousePressed(()=>loadPreset(21, 6705, 0.9));

  presetB_F = createButton('tulips');
  presetB_F.position(width-70,110);
  presetB_F.mousePressed(()=>loadPreset(0, 11416, 0.1));
}

function loadPreset(seedS, seedL, tScale){
  // carrega un preset i genera una nova llavor, per donar-li una mica de variació.
  seedSlider.value(seedL);
  startSlider.value(seedS); 
  scaleSlider.value(tScale);
  randomSeed(new Date().getTime());
  seed=random(0,1000);
}

//Quan es prem el butó "reload", s'executa aquesta funció
function reloadPattern(){
    randomSeed(new Date().getTime()); // per afegir variació utilitzem el temps actual, així sempre tenim un seed diferent.
    seed=random(0,1000); // nova llavor random
    //Nova paleta on variem el to (Hue) dels colors.
    baseColor = [random(365), 6,11];
    secondaryColor = [random(365), 95,82];
    terciaryColor = [random(365), 100,100];
    punctuationColor = [random(365),100,67];
    // generem també una nova configuració dels paràmetres.
    seedSlider.value(round(random(1,textSeed.length)));
    startSlider.value( round(random() * textSeed.length)); 
    scaleSlider.value(random(0.3,1));
}


function draw() {

  let currentLetter = '';
  let textPointer = 0; //el cursor que es mou restrejant el text
  let lastPoint = 0;
  let strokeW = 1;
  let tileCount = 0;
  let tileSize = 0;

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
  
  tileCount = round(granularity / scalePattern);  //calculem el nombre d'objectes en fucnió de l'escala
  tileSize = width / tileCount; // la mida de cada "rajola"

  tilesLabel.html('Tiles: ' + (tileCount * tileCount)); //mostrem el nombre d'objectes al label.

  
  // Dos bucles per recórrer les files x columnes del canvas
  for (let filas = 0; filas < tileCount; filas++) {
    for (let columnas = 0; columnas < tileCount; columnas++) {
      
      //Agafem la lletra actual, basant-nos en la variable textPointer, que es mou a cada iteració
      currentLetter = textSeed[textPointer];
      let charCode = currentLetter.charCodeAt(); // el codi ASCII de la lletra

      //Movem el sistema de coordenades al punt d'inici filaxcolumna
      translate(tileSize * columnas, tileSize * filas);

        if(gridLines){ // si volem mostrar la reticula. Utilitzada per depurar.
          stroke("blue");
          strokeWeight(1);
          noFill();
          square(tileSize/2,tileSize/2, tileSize);    
        }
        noStroke(); 
        // si "transparency" té un valor "true", llavors afegim un factor d'opacitat a la paleta
        // transparency es controla amb la tecla "t"
        if (transparency) {
          fill(baseColor.concat([random(1)]));
        } else {
          fill(baseColor);
          stroke ('white'); // sense transparéncia, afegim una línea blanca
        }

        if (charCode > 223 && charCode < 253) { // totes les lletres amb accent o "umlaut"
          (transparency) ? fill(secondaryColor.concat([random(1)])) : fill(secondaryColor);  //amb / sense transparencia
          translate(tileSize/2, tileSize/2);  // en aquest cas, ens movem al centre del "tile"
          rotate(random(0,TWO_PI)); //rotació aleatoria
          scale(random(0.2, 2)); //scala aleatoria
          triangle(0, -tileSize / 2, tileSize / 2, tileSize/2, - tileSize / 2, tileSize/2);
        } else { // per la resta
          switch (currentLetter) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
              //totes les vocals
              (transparency) ? fill(terciaryColor.concat([random(1)])) : fill(terciaryColor); //amb / sense transparencia
              ellipse(tileSize / 2,tileSize / 2, random(tileSize/5, tileSize*2)); //mida aleatoria
              break;
            case ' ':
            case ',':
              //tots els espais i ,
              //farem linies que es conecten, per crear un disseny més dinàmic i aleatori.
              stroke(punctuationColor);
              let newPoint = random(0, tileSize); // punt final vertical de la linea
              let weigthTrend = random(-1,1); // variem el gruix cada vegada
              strokeWeight(strokeW);
              // en asegurem que el gruix no sigui més petit de 0.8 o més gran de 5;
              strokeW += weigthTrend;
              strokeW = (strokeW <= 0.8) ? 0.9 : strokeW;
              strokeW = (strokeW >= 5) ? 4.9 : strokeW;
              //dibuixem la linea
              line(0, lastPoint, tileSize, newPoint);
              lastPoint = newPoint;  //guardem el punt vertical per conectar amb el següent, si hi ha.
              break;
            default:
              //la resta de caracters    
              translate(tileSize/2, tileSize/2); // en asegurem que la rotació té lloc al centre.
              rotate(random(0,TWO_PI));
              square(0,0,random(tileSize/5, tileSize*2));
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
    case 'l':
      //mostra / oculta la retícula. L'utilitzo per depurar els gràfics.
      gridLines = !gridLines;
      break;
  }
  
  return false;
}