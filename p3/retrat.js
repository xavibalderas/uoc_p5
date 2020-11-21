// Aquest sketch dibuixa el meu autoretrat partit en dos estils diferents. D'una banda, la meitat esquerra basada en vèrtexs i polígons.
// La part dreta, d'altra banda, està formada per corbes.
// El retrat projecta una ombra a la part esquerra i aquesta es troba també ombrejada. Una línia talla pel centre dividint les dues parts.


// Guardem els punts dels polígons dins d'un array per tal d'iterar aquest i dibuixar el model més fàcilment.
// Aquest array (caraPoligons) té la següent forma:
//    [ color (en HEX), [punt_1_x, punt_1_y], [punt_2_x, punt_2_y].....]
// L'ordre dels poligons a l'array és també l'ordre de dibuix, i per tant les capes, d'inferior a superior.
// Cada element de l'array representa 1 poligon

let caraPoligons = [
  ["#C47329",[116,280],[105,316],[108,369],[129,355]], //orella 
  //------------ Coll
  ["#331D11",[180,516],[191,542],[243,526]], 
  ["#603314",[180,516],[182,556],[191,542]], 
  ["#93562B",[191,542],[242,554],[243,526]], 
  ["#E29C69",[244,580],[191,542],[242,554]], 
  ["#EFB389",[193,571],[191,542],[222,564]], 
  ["#EFC3A4",[200,591],[222,564],[193,571]], 
  ["#F5D1B9",[244,626],[222,564],[244,580]], 
  ["#E5BAA2",[200,591],[222,564],[244,626]],
  ["#8D4D30",[158,545],[181,535],[191,542],[193,563]],
  //------------ Fi Coll
  //------------ Pell boca
  ["#F9DFC2",[203,441],[228,432],[235,466]], 
  ["#F8B36B",[228,432],[241,444],[243,428]], 
  ["#F3D1AB",[228,432],[231,442],[238,441]], 
  ["#F8B36B",[210,446],[231,461],[218,463]], 
  ["#F8B36B",[243,459],[232,450],[232,463]], 
  ["#FCC98B",[231,451],[243,459],[242,452]],
  //------------ Fi pell boca
  //------------ Cara
  ["#FCC98B",[117,314],[122,390],[181,325]], 
  ["#F8AF66",[117,314],[144,268],[181,325]], 
  ["#F4BD82",[181,325],[171,403],[138,371]], 
  ["#F3D1AB",[163,239],[242,303],[242,251]], 
  ["#FDD9B7",[144,268],[242,303],[163,239]], 
  ["#F4BD82",[144,268],[181,325],[242,303]], 
  ["#F3D1AB",[221,310],[175,375],[181,325]], 
  ["#F3D1AB",[171,403],[223,376],[175,375]], 
  ["#F9DFC2",[175,375],[244,376],[221,310]], 
  ["#FAD0A3",[221,310],[246,302],[244,376]], 
  ["#F9DFC2",[171,403],[223,376],[241,410]], 
  ["#F8B36B",[171,403],[184,418],[241,410]], 
  ["#F8E8DD",[223,376],[246,374],[243,415]], 
  //------------ Fi Cara
  //------------ Ropa
  ["#A4A4A3",[190,559],[127,577],[79,592],[158,538]], 
  ["#717171",[79,592],[33,803],[98,708]], 
  ["#BFBEBF",[119,651],[151,571],[190,559]], 
  ["#A2A3A2",[79,592],[151,571],[98,708]], 
  ["#828383",[99,803],[98,708],[33,803]], 
  ["#BFBEBF",[98,708],[187,685],[119,651]], 
  ["#D6D7D7",[119,651],[190,559],[187,685]], 
  ["#D6D7D7",[98,708],[99,803],[187,685]], 
  ["#E6E8E6",[190,559],[243,696],[187,685]], 
  ["#FFFFFF",[187,685],[190,805],[243,696]], 
  ["#E5E5E4",[187,685],[99,803],[190,805]], 
  ["#FFFFFF",[204,594],[242,626],[243,696]], 
  //------------ Fi Ropa
  //------------ Ulls
  ["#F2F3F2",[243,696],[190,805],[246,804]], 
  ["#EFEFEF",[179,286],[149,306],[177,314],[211,303]],
  //------------ Fi Ulls
  //------------ Llavis
  ["#CF3030",[217,442],[218,447],[225,447]], 
  ["#E64B4B",[217,442],[232,440],[225,447]], 
  ["#E26C6D",[225,447],[236,447],[232,440]], 
  ["#D69090",[232,440],[242,439],[236,447]], 
  ["#F7D0D0",[236,447],[244,448],[242,439]], 
  ["#A13333",[218,447],[218,449],[234,447]], 
  ["#783333",[226,453],[234,447],[218,449]], 
  ["#923131",[234,447],[234,453],[226,453]], 
  ["#AB3B3B",[234,450],[242,447],[234,447]],
  ["#702A2A",[243,453],[234,450],[234,453]], 
  ["#9C3232",[242,447],[234,450],[243,453]],
  //------------ Fi llavis
  //------------ Nas
  ["#F8AF66",[232,323],[232,348],[243,341]], 
  ["#EFD7C0",[232,323],[243,341],[245,323]], 
  ["#A06E40",[232,348],[230,372],[236,357]], 
  ["#926947",[220,387],[231,381],[230,372]], 
  ["#CF8751",[242,368],[232,348],[243,341]], 
  ["#E68D52",[244,378],[230,372],[236,357],[242,368]], 
  ["#F6AC79",[245,387],[231,381],[230,372],[244,378]], 
  ["#4F2F1A",[220,395],[231,381],[220,387]], 
  ["#ED8A48",[242,394],[231,381],[242,384]], 
  ["#60381D",[232,391],[231,381],[220,395]], 
  ["#8F5833",[231,381],[232,391],[242,394]],
  //------------ Fi Nas
  //------------ Pupila
  ["#6D2A11",[183,298],[179,307],[170,300], [177,296] ], 
  //------------ Fi Pupila
  //------------ Barba
  ["#372312",[114,347],[124,454],[152,386]], 
  ["#5A3212",[181,413],[141,414],[152,386]], 
  ["#683811",[141,414],[156,496],[232,410]], 
  ["#1D120B",[124,454],[156,496],[141,414]], 
  ["#A44A17",[206,439],[242,496],[169,480]], 
  ["#5B3516",[193,524],[242,496],[242,526]], 
  ["#72360F",[169,480],[193,524],[242,496]], 
  ["#884814",[232,410],[241,430],[206,439]], 
  ["#5B3516",[156,496],[193,524],[169,480]], 
  ["#A4551F",[220,461],[242,458],[242,496]], 
  ["#A4551F",[232,410],[243,409],[241,430]], 
  //------------ Fi Barba
  //------------ Cabell
  ["#372312",[112,321],[108,235],[166,237]], 
  ["#5A3212",[169,164],[159,212],[108,235]], 
  ["#7B4413",[108,235],[159,212],[184,242]], 
  ["#A44A17",[169,164],[182,216],[159,212]], 
  ["#A44A17",[159,212],[245,226],[184,242]], 
  ["#7B4413",[184,242],[246,253],[246,226]], 
  ["#7B4413",[169,164],[241,193],[182,216]], 
  ["#5A3212",[169,164],[245,151],[241,193]], 
  ["#5A3212",[182,216],[241,193],[246,226]], 
  ["#5A3212",[154,152],[162,149],[169,164]], 
  ["#5A3212",[172,151],[177,154],[169,164]]
  //------------ Fi Cabell
]; // Fi de l'array caraPoligons

// La segona part, amb les curves, la guardem també en un array similar a l'anterior, però modificant els components de cada punt.
// Aquest array (caraCorbes) té la següent forma:
//    [ 
//      color (en HEX), 
//      [anchor_1_x, anchor_1_y], -> el primer anchor de la corba
//      [Acontrol1_x, Acontrol1_y, Acontrol2_x, Acontrol2_y, Aanchor2_x, Aanchor2_y], -> cada Bezier te 2 controls i 2 anchors, el primer anchor és l'últim de la corba anterior
//      [Bcontrol1_x, Bcontrol1_y, Bcontrol2_x, Bcontrol2_y, Banchor2_x, Banchor2_y],
//      ...
//    ]
// L'ordre de les corbes a l'array és també l'ordre de dibuix, i per tant les capes, d'inferior a superior.
// Cada element de l'array representa 1 figura completa tancada, and les diferents corbes necessaries pel seu dibuix.

let caraCorbes = [
  //------------ Coll
  [
  '#C4732A',
    [379, 328],
    [396, 297, 396, 380, 387, 370],
    [374, 362, 382, 338, 379, 328],
  ], 
  [
  '#361900',
    [243, 531],
    [244, 521, 337, 508, 318, 541],
    [316, 544, 242, 558, 243, 531],
  ], 
  [
  '#603211',
    [245, 555],
    [250, 554, 326, 566, 320, 541],
    [311, 542, 254, 539, 245, 542],
    [243, 545, 245, 555, 245, 555],
  ], 
  [
  '#E29B6A',
    [246, 608],
    [261, 594, 299, 586, 298, 575],
    [300, 555, 334, 555, 320, 541],
    [322, 560, 243, 555, 244, 553],
    [244, 553, 246, 608, 246, 608],
  ],  
  [
  '#E5B9A1',
    [245, 629],
    [267, 640, 322, 592, 325, 574],
    [328, 545, 326, 545, 301, 556],
    [269, 601, 243, 578, 245, 629],
  ],
  //------------ Fi Coll
  //------------ Cara
  [
  '#FFDAB6',
    [244, 246],
    [333, 225, 406, 306, 378, 393],
    [358, 430, 270, 443, 244, 419],
    [244, 411, 244, 246, 244, 246],
  ],
  //------------ Fi cara
  //------------ Ull
  [
  '#EFEFEF',
    [274, 304],
    [280, 291, 334, 282, 335, 310],
    [335, 310, 298, 327, 274, 304],
  ], 
  //------------ Fi Ull
  //------------ Sombra barba
  [
  '#FFB469',
    [246, 406],
    [288, 423, 338, 400, 374, 393],
    [374, 393, 321, 421, 317, 421],
    [310, 417, 236, 421, 246, 406],
  ], 
  //------------ Fi sombra barba
  //------------ Reflex pell
  [
  '#F9F0E8',
    [341, 276],
    [355, 291, 377, 374, 368, 397],
    [401, 383, 364, 290, 341, 276],
  ],
  //------------ Fi Reflex pell
  //------------ Ullera
  [
  '#F4BD82',
    [274, 307],
    [281, 318, 327, 318, 335, 310],
    [335, 338, 277, 314, 274, 307],
  ],
  //------------ Fi Ullera
  //------------ Nas
  [
  '#F4BD82',
    [254, 323],
    [253, 328, 254, 377, 260, 382],
    [262, 383, 266, 390, 263, 393],
    [259, 397, 252, 390, 243, 392],
    [251, 387, 240, 319, 250, 323],
  ], 
  //------------ Fi Nas
  //------------ Pupil·la
  [
  '#6D290F',
    [303, 306],
    [300, 301, 311, 304, 312, 305],
    [311, 304, 311, 316, 303, 306],
  ], 
  //------------ Fi Pupil·la
  //------------ Pell boca
  [
  '#FFDAB6',
    [244, 426],
    [261, 425, 280, 436, 288, 452],
    [288, 452, 260, 470, 244, 470],
  ],
  //------------ Fi Pell boca
  //------------ Llavi superior
  [
  '#E26D6D',
    [245, 439],
    [247, 439, 258, 439, 261, 441],
    [277, 449, 244, 447, 245, 446],
    [245, 446, 247, 439, 245, 439],
  ], 
  //------------ Fi Llavi superior
  //------------ Llavi inferior
  [
  '#773232',
    [246, 451],
    [246, 451, 262, 454, 265, 452],
    [276, 441, 247, 448, 245, 446],
    [245, 446, 246, 451, 246, 451],
  ],
  //------------ Fi Llavi inferior
  //------------ Roba
  [
  '#E6E8E6',
    [332, 542],
    [441, 584, 457, 710, 450, 797],
    [450, 797, 248, 798, 248, 798],
    [239, 517, 245, 710, 332, 542],
  ],
  [
  '#FFFFFF',
    [340, 566],
    [429, 566, 473, 836, 410, 787],
    [396, 755, 404, 680, 380, 649],
    //['S',305, 560, 340, 566],
  ],
  [
  '#BFBFBF',
    [258, 635],
    [258, 635, 255, 786, 259, 789],
    [276, 761, 279, 696, 258, 635],
  ],
  //------------ Fi Roba
  //------------ Cabell
  [
  '#5B3006',
    [245, 153],
    [245, 153, 290, 152, 304, 162],
    [328, 185, 345, 178, 356, 201],
    [380, 219, 387, 262, 387, 289],
    [390, 285, 384, 360, 375, 332],
    [378, 304, 359, 216, 327, 205],
    [311, 201, 309, 193, 304, 183],
    [294, 169, 256, 188, 245, 183],
    [245, 183, 245, 153, 245, 153],
  ], 
  [
  '#7A4311',
    [245, 183],
    [276, 183, 290, 162, 304, 183],
    [320, 199, 328, 206, 342, 212],
    [364, 222, 382, 335, 375, 332],
    [364, 301, 330, 222, 294, 213],
    [249, 201, 242, 245, 245, 183],
  ],
  [
  '#A3541F',
    [248, 215],
    [248, 215, 239, 249, 247, 250],
    [295, 254, 335, 255, 356, 284],
    [330, 232, 312, 187, 248, 215],
  ],
  //------------ Fi Cabell
  //------------ Barba
  [
  '#72350C',
    [384, 369],
    [385, 381, 363, 509, 322, 523],
    [300, 525, 245, 528, 245, 528],
    [250, 427, 238, 482, 282, 450],
    [283, 437, 247, 427, 247, 427],
    [231, 388, 291, 433, 330, 415],
    [358, 404, 364, 375, 384, 369],
  ],
  [
  '#7A4311',
    [366, 394],
    [357, 433, 332, 502, 281, 504],
    [239, 497, 242, 503, 247, 475],
    [247, 475, 252, 501, 286, 478],
    [286, 478, 310, 430, 321, 420],
    [332, 411, 366, 394, 366, 394],
  ],
  //------------ Fi Barba
]; // Fi de l'array caraCorbes

// Guardem el contorn de la part poligonal a un array anomenat "contorn" amb els punts d'aquest. Aquest array l'utilitzarem per les ombres.
// Cada element de l'array conté les coordenades [x,y] d'un punt del polígon tancat.

let contorn = [
  [245,150],
  [169,163], 
  [107,236],
  [110,298],
  [104,316],
  [108,370],
  [115,365], 
  [124,452], 
  [156,496], 
  [180,516],
  [180,535],
  [164,541],
  [158,538],
  [78,592],
  [33,800], 
  [245,800]
];

function setup() {
  createCanvas(500, 800);
};

function draw() {
  background('#569A6D');
  patternFons(); //dibuixem el pattern del fons. Un element decoratiu per demostrar com funciona l'opacitat de la sombra  

  push(); // guardem la configuració actual
    noStroke();
    fill(0,0,0,90);  // definim el color de l'ombra. Negre amb opacitat al 90 (35%)
    translate(-15, 10); // movem les coordenades -15 a l'eix X i 10 a l'eix Y. 
                        // aquest desplaçament ens permet utilitzar el mateix polígon que pel contorn per tal de fer l'ombra
                        // sense haver de canviar les coordenades
    dibuixarPoligon(contorn); // aquest funció dibuixa qualsevol forma que li pasem com a paràmetre.
  pop(); // tornem a la configuració anterior (desfem "translate")

  // Ara dibuixem el retrat. Per tal de resoldre errades d'alineació entre les figures i posibles forats
  // fem que totes le sfigures dibuixades tinguin una linia exterior d'1 pixel, amb el mateix color que el farçit.
  strokeWeight(1);  
  strokeJoin(ROUND);
  dibuixarCaraPoligons(); // Dibuixa la part poligonal de la cara 
  dibuixarCaraCorbes(); // Dibuixa la part corbada de la cara

  // Ara afegim les celles, i per aixó utilitzem un gruix de linia específic, ja que seran simples línies.
  strokeWeight(10);
  stroke(0,0,0); // celles negres
  line(244,0,244,800); //Dibuixem la linia central
  dibuixarCelles(); //Afegim les celles

  // Afegirem l'ombreig a la part esquerra de la cara, així doncs, configurem el color i la línia
  noStroke();
  fill(0,0,0,90);
  dibuixarPoligon(contorn);
}

//Aquesta funció dibuixa les celles
function dibuixarCelles(){
  // Volem que les celles segueixen l'aparença de la cara (angles i corbes)
  // Per aixó definim els JOINTS i CAPS per cada cella
  strokeJoin(BEVEL);
  strokeCap(SQUARE);
  noFill(); // només volem línia

  //Primer la cella en angles
  beginShape();
    vertex(152, 283);
    vertex(180, 270);
    vertex(210, 285);
  endShape(); //no cal que tanquem la forma

  strokeCap(ROUND); // ara la cella corba
  arc(299, 295, 60, 30, -PI + ( QUARTER_PI / 2 ), -QUARTER_PI);
};

//Aquesta funció dibuixa els patterns del fons
function patternFons(){
  noStroke();  //sense linia
  fill(255, 255, 255, 30); // color blanc amb 30 d'opacitat.

  //Començem amb el "diamants". Els espaiem 25 pixels.
  //Utilitzem dos bucles per tal de recórrer l'espai en files i columnes
  for( let x = 0; x < 250; x += 25 ){
    for( let y = 0; y < 800; y += 25 ){
      quad(x, y, x + 10, y + 10, x, y + 20, x - 10, y + 10); //posicionem els 4 punts necesaris per definir la forma quadrilàtera, de 20 pixels d'ample i alt.
    }
  }

  //A continuació farem els cercles. Comemçem a la coordenada 240 a l'eix X i seguim un patró similar a l'anterior
  for( let x = 240; x < 500; x += 25){
    for( let y = 0; y < 800; y += 25){
      ellipse(x + 10, y + 10, 18, 18); //donat que la primera coordenada es el centre, hem de correguir la posició. Enlloc de 20pixels de diàmetre, 18 sembla visualment més correcte.
    }
  }
};

// Aquesta funció dubuixa una forma tancada seguint els punts pasat a l'array com a paràmetere.
// Params: pol = Array bidimensional de punts en format [x,y]
//         punts = Bool. Si és cert, enlloc de la forma tancada es dibuixen els punts en vermell. S'utilitza per depurar i definir les imatges. Per defecte és falsa.
function dibuixarPoligon(pol, punts = false){    
    if (punts == true){
      stroke('red');
      strokeWeight(4);
      noFill();
      beginShape(POINTS);
    }else{
      beginShape();
    }    
    pol.forEach( punto => {
      vertex(punto[0], punto[1]);
    });
    endShape(CLOSE);  //tancat
};

//Aquesta funció dibuixa la cara poligonal utilitzant les dades a l'array caraPoligons
function dibuixarCaraPoligons(){
  caraPoligons.forEach(poligon => { // iterem per a cada poligon que forma l'array
    beginShape(); //començem la forma
      fill(poligon[0]); // en el numero 0 sempre tenim el color en HEX
      stroke(poligon[0]); //truc per resoldre errades i forats, el gruix de la linia està definit a la funció draw com 1 pixel.
      for( let i = 1; i < poligon.length; i++ ){
          vertex(poligon[i][0], poligon[i][1] );// index 0 = x; index 1 = y
      }; 
    endShape(CLOSE); //tanquem la forma
  });
};

// Aquesta funció dibuixa la cara amb corbes utilitzant les dades a l'array caraCorbes. 
// Es similar a l'anterior, però utilitza bezierVertex i l'array caraCorbes és diferent.
function dibuixarCaraCorbes(){
  caraCorbes.forEach(corba => { // iterem per a cada corba que forma l'array.
    beginShape(); //començem la forma
      fill(corba[0]);  // en el numero 0 sempre tenim el color en HEX
      stroke(corba[0]); //truc per resoldre errades i forats, el gruix de la linia està definit a la funció draw com 1 pixel.
      vertex(corba[1][0], corba[1][1]); // el segon element de l'array conté el primer anchor de la corba
      for(let i = 2; i< corba.length; i++){
        bezierVertex(corba[i][0], corba[i][1], corba[i][2], corba[i][3], corba[i][4], corba[i][5]); // seguim l'orde definit a l'array per afegir els punts de control i els anchors.     
      };
    endShape(CLOSE); 
  });
};