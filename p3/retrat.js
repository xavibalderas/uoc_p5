// Aquest sketch dibuixa el meu autoretrat partit en dos estils diferents. D'una banda, la meitat esquerra basada en vèrtexs i polígons.
// La part dreta, d'altra banda, està formada per corbes.
// El retrat projecta una ombra a la part esquerra i aquesta es troba també ombrejada. Una línia talla pel centre dividint les dues parts.


//Opcions de configuració.
//scaleDrawing defineix l'escala inicial, tot i que es pot canviar al les fletxes esquerra-dreta.
//patternTiles permet afegir o reduir elements al fons, i modificar la mida d'aquests.
//eyeCycle configura el parpelleig.
var scaleDrawing = 1;
var patternTiles = 10; // com més gran, més elements tenim al fons, i més petits són.
var eyeCycle = 2000; //2 segons

//variable per guardar les instàncies de les classes.
var ulls = [];
var parpelles = [];

// Guardem els punts dels polígons dins d'un array per tal d'iterar aquest i dibuixar el model més fàcilment.
// Afegim un element extra diferent al PAC1 per fer que l'sketch sigui més procedural.
// Aquest array (caraPoligons) té la següent forma:
//    [ (NOU) tipus de forma (v=poligon, c= corba), color (en HEX), [punt_1_x, punt_1_y], [punt_2_x, punt_2_y].....]
// L'ordre dels poligons a l'array és també l'ordre de dibuix, i per tant les capes, d'inferior a superior.
// Cada element de l'array representa 1 poligon

let caraPoligons = [
  ['v',"#C47329",[116,280],[105,316],[108,369],[129,355]], //orella 
  //------------ Coll
  ['v',"#331D11",[180,516],[191,542],[243,526]], 
  ['v',"#603314",[180,516],[182,556],[191,542]], 
  ['v',"#93562B",[191,542],[242,554],[243,526]], 
  ['v',"#E29C69",[244,580],[191,542],[242,554]], 
  ['v',"#EFB389",[193,571],[191,542],[222,564]], 
  ['v',"#EFC3A4",[200,591],[222,564],[193,571]], 
  ['v',"#F5D1B9",[244,626],[222,564],[244,580]], 
  ['v',"#E5BAA2",[200,591],[222,564],[244,626]],
  ['v',"#8D4D30",[158,545],[181,535],[191,542],[193,563]],
  //------------ Fi Coll
  //------------ Pell boca
  ['v',"#F9DFC2",[203,441],[228,432],[235,466]], 
  ['v',"#F8B36B",[228,432],[241,444],[243,428]], 
  ['v',"#F3D1AB",[228,432],[231,442],[238,441]], 
  ['v',"#F8B36B",[210,446],[231,461],[218,463]], 
  ['v',"#F8B36B",[243,459],[232,450],[232,463]], 
  ['v',"#FCC98B",[231,451],[243,459],[242,452]],
  //------------ Fi pell boca
  //------------ Cara
  ['v',"#FCC98B",[117,314],[122,390],[181,325]], 
  ['v',"#F8AF66",[117,314],[144,268],[181,325]], 
  ['v',"#F4BD82",[181,325],[171,403],[138,371]], 
  ['v',"#F3D1AB",[163,239],[242,303],[242,251]], 
  ['v',"#FDD9B7",[144,268],[242,303],[163,239]], 
  ['v',"#F4BD82",[144,268],[181,325],[242,303]], 
  ['v',"#F3D1AB",[221,310],[175,375],[181,325]], 
  ['v',"#F3D1AB",[171,403],[223,376],[175,375]], 
  ['v',"#F9DFC2",[175,375],[244,376],[221,310]], 
  ['v',"#FAD0A3",[221,310],[246,302],[244,376]], 
  ['v',"#F9DFC2",[171,403],[223,376],[241,410]], 
  ['v',"#F8B36B",[171,403],[184,418],[241,410]], 
  ['v',"#F8E8DD",[223,376],[246,374],[243,415]], 
  //------------ Fi Cara
  //------------ Ropa
  ['v',"#A4A4A3",[190,559],[127,577],[79,592],[158,538]], 
  ['v',"#717171",[79,592],[33,803],[98,708]], 
  ['v',"#BFBEBF",[119,651],[151,571],[190,559]], 
  ['v',"#A2A3A2",[79,592],[151,571],[98,708]], 
  ['v',"#828383",[99,803],[98,708],[33,803]], 
  ['v',"#BFBEBF",[98,708],[187,685],[119,651]], 
  ['v',"#D6D7D7",[119,651],[190,559],[187,685]], 
  ['v',"#D6D7D7",[98,708],[99,803],[187,685]], 
  ['v',"#E6E8E6",[190,559],[243,696],[187,685]], 
  ['v',"#FFFFFF",[187,685],[190,805],[243,696]], 
  ['v',"#E5E5E4",[187,685],[99,803],[190,805]], 
  ['v',"#FFFFFF",[204,594],[242,626],[243,696]], 
  ['v',"#F2F3F2",[243,696],[190,805],[246,804]], 
  //------------ Fi Ropa
  //------------ Ulls
  ['v',"#EFEFEF",[179,286],[149,306],[177,314],[211,303]],
  //------------ Fi Ulls
    //------------ Pupila
//    ['v',"#6D2A11",[183,298],[179,307],[170,300], [177,296] ], 
    //------------ Fi Pupila
  //------------ Llavis
  ['v',"#CF3030",[217,442],[218,447],[225,447]], 
  ['v',"#E64B4B",[217,442],[232,440],[225,447]], 
  ['v',"#E26C6D",[225,447],[236,447],[232,440]], 
  ['v',"#D69090",[232,440],[242,439],[236,447]], 
  ['v',"#F7D0D0",[236,447],[244,448],[242,439]], 
  ['v',"#A13333",[218,447],[218,449],[234,447]], 
  ['v',"#783333",[226,453],[234,447],[218,449]], 
  ['v',"#923131",[234,447],[234,453],[226,453]], 
  ['v',"#AB3B3B",[234,450],[242,447],[234,447]],
  ['v',"#702A2A",[243,453],[234,450],[234,453]], 
  ['v',"#9C3232",[242,447],[234,450],[243,453]],
  //------------ Fi llavis
  //------------ Nas
  ['v',"#F8AF66",[232,323],[232,348],[243,341]], 
  ['v',"#EFD7C0",[232,323],[243,341],[245,323]], 
  ['v',"#A06E40",[232,348],[230,372],[236,357]], 
  ['v',"#926947",[220,387],[231,381],[230,372]], 
  ['v',"#CF8751",[242,368],[232,348],[243,341]], 
  ['v',"#E68D52",[244,378],[230,372],[236,357],[242,368]], 
  ['v',"#F6AC79",[245,387],[231,381],[230,372],[244,378]], 
  ['v',"#4F2F1A",[220,395],[231,381],[220,387]], 
  ['v',"#ED8A48",[242,394],[231,381],[242,384]], 
  ['v',"#60381D",[232,391],[231,381],[220,395]], 
  ['v',"#8F5833",[231,381],[232,391],[242,394]],
  //------------ Fi Nas
  //------------ Barba
  ['v',"#372312",[114,347],[124,454],[152,386]], 
  ['v',"#5A3212",[181,413],[141,414],[152,386]], 
  ['v',"#683811",[141,414],[156,496],[232,410]], 
  ['v',"#1D120B",[124,454],[156,496],[141,414]], 
  ['v',"#A44A17",[206,439],[242,496],[169,480]], 
  ['v',"#5B3516",[193,524],[242,496],[242,526]], 
  ['v',"#72360F",[169,480],[193,524],[242,496]], 
  ['v',"#884814",[232,410],[241,430],[206,439]], 
  ['v',"#5B3516",[156,496],[193,524],[169,480]], 
  ['v',"#A4551F",[220,461],[242,458],[242,496]], 
  ['v',"#A4551F",[232,410],[243,409],[241,430]], 
  //------------ Fi Barba
  //------------ Cabell
  ['v',"#372312",[112,321],[108,235],[166,237]], 
  ['v',"#5A3212",[169,164],[159,212],[108,235]], 
  ['v',"#7B4413",[108,235],[159,212],[184,242]], 
  ['v',"#A44A17",[169,164],[182,216],[159,212]], 
  ['v',"#A44A17",[159,212],[245,226],[184,242]], 
  ['v',"#7B4413",[184,242],[246,253],[246,226]], 
  ['v',"#7B4413",[169,164],[241,193],[182,216]], 
  ['v',"#5A3212",[169,164],[245,151],[241,193]], 
  ['v',"#5A3212",[182,216],[241,193],[246,226]], 
  ['v',"#5A3212",[154,152],[162,149],[169,164]], 
  ['v',"#5A3212",[172,151],[177,154],[169,164]]
  //------------ Fi Cabell
]; // Fi de l'array caraPoligons

// La segona part, amb les curves, la guardem també en un array similar a l'anterior, però modificant els components de cada punt.
// Aquest array (caraCorbes) té la següent forma:
//    [ 
//      (NOU) tipus de forma (v=poligon, c= corba)
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
  'c',
  '#C4732A',
    [379, 328],
    [396, 297, 396, 380, 387, 370],
    [374, 362, 382, 338, 379, 328],
  ], 
  [
  'c',
  '#361900',
    [243, 531],
    [244, 521, 337, 508, 318, 541],
    [316, 544, 242, 558, 243, 531],
  ], 
  [
  'c',
  '#603211',
    [245, 555],
    [250, 554, 326, 566, 320, 541],
    [311, 542, 254, 539, 245, 542],
    [243, 545, 245, 555, 245, 555],
  ], 
  [
  'c',
  '#E29B6A',
    [246, 608],
    [261, 594, 299, 586, 298, 575],
    [300, 555, 334, 555, 320, 541],
    [322, 560, 243, 555, 244, 553],
    [244, 553, 246, 608, 246, 608],
  ],  
  [
  'c',
  '#E5B9A1',
    [245, 629],
    [267, 640, 322, 592, 325, 574],
    [328, 545, 326, 545, 301, 556],
    [269, 601, 243, 578, 245, 629],
  ],
  //------------ Fi Coll
  //------------ Cara
  [
  'c',
  '#FFDAB6',
    [244, 246],
    [333, 225, 406, 306, 378, 393],
    [358, 430, 270, 443, 244, 419],
    [244, 411, 244, 246, 244, 246],
  ],
  //------------ Fi cara
  //------------ Ull
 // [
 // '#EFEFEF',
 //   [274, 304],
 //   [280, 291, 334, 282, 335, 310],
 //   [335, 310, 298, 327, 274, 304],
 // ], 
  //------------ Fi Ull
  //------------ Sombra barba
  [
  'c',
  '#FFB469',
    [246, 406],
    [288, 423, 338, 400, 374, 393],
    [374, 393, 321, 421, 317, 421],
    [310, 417, 236, 421, 246, 406],
  ], 
  //------------ Fi sombra barba
  //------------ Reflex pell
  [
  'c',
  '#F9F0E8',
    [341, 276],
    [355, 291, 377, 374, 368, 397],
    [401, 383, 364, 290, 341, 276],
  ],
  //------------ Fi Reflex pell
  //------------ Ullera
  [
  'c',
  '#F4BD82',
    [274, 307],
    [281, 318, 327, 318, 335, 310],
    [335, 338, 277, 314, 274, 307],
  ],
  //------------ Fi Ullera
  //------------ Nas
  [
  'c',
  '#F4BD82',
    [254, 323],
    [253, 328, 254, 377, 260, 382],
    [262, 383, 266, 390, 263, 393],
    [259, 397, 252, 390, 243, 392],
    [251, 387, 240, 319, 250, 323],
  ], 
  //------------ Fi Nas
  //------------ Pupil·la
//  [
 // '#6D290F',
 //   [303, 306],
 //   [300, 301, 311, 304, 312, 305],
 //   [311, 304, 311, 316, 303, 306],
 // ], 
  //------------ Fi Pupil·la
  //------------ Pell boca
  [
  'c',
  '#FFDAB6',
    [244, 426],
    [261, 425, 280, 436, 288, 452],
    [288, 452, 260, 470, 244, 470],
  ],
  //------------ Fi Pell boca
  //------------ Llavi superior
  [
  'c',
  '#E26D6D',
    [245, 439],
    [247, 439, 258, 439, 261, 441],
    [277, 449, 244, 447, 245, 446],
    [245, 446, 247, 439, 245, 439],
  ], 
  //------------ Fi Llavi superior
  //------------ Llavi inferior
  [
  'c',
  '#773232',
    [246, 451],
    [246, 451, 262, 454, 265, 452],
    [276, 441, 247, 448, 245, 446],
    [245, 446, 246, 451, 246, 451],
  ],
  //------------ Fi Llavi inferior
  //------------ Roba
  [
  'c',
  '#E6E8E6',
    [332, 542],
    [441, 584, 457, 710, 450, 797],
    [450, 797, 248, 798, 248, 798],
    [239, 517, 245, 710, 332, 542],
  ],
  [
  'c',
  '#FFFFFF',
    [340, 566],
    [429, 566, 473, 836, 410, 787],
    [396, 755, 404, 680, 380, 649],
    //['S',305, 560, 340, 566],
  ],
  [
  'c',
  '#BFBFBF',
    [258, 635],
    [258, 635, 255, 786, 259, 789],
    [276, 761, 279, 696, 258, 635],
  ],
  //------------ Fi Roba
  //------------ Cabell
  [
  'c',
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
  'c',
  '#7A4311',
    [245, 183],
    [276, 183, 290, 162, 304, 183],
    [320, 199, 328, 206, 342, 212],
    [364, 222, 382, 335, 375, 332],
    [364, 301, 330, 222, 294, 213],
    [249, 201, 242, 245, 245, 183],
  ],
  [
  'c',
  '#A3541F',
    [248, 215],
    [248, 215, 239, 249, 247, 250],
    [295, 254, 335, 255, 356, 284],
    [330, 232, 312, 187, 248, 215],
  ],
  //------------ Fi Cabell
  //------------ Barba
  [
  'c',
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
  'c',
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

//Corbes i poligons de l'ombra.
let contorn = [[
  'v', '#000000',
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
  [245,800]]
];
let contornCorba = [
  //Curva 
  [
    'c',
    '#7B4413',
    [247, 798],
    [249, 798, 451, 797, 451, 797],
    [458, 710, 441, 585, 333, 542],
    [330, 546, 328, 550, 326, 554],
    [325, 552, 324, 551, 323, 550],
    [325, 547, 324, 545, 321, 541],
    [321, 541, 321, 541, 321, 541],
    [321, 541, 321, 541, 321, 541],
    [320, 541, 319, 541, 319, 541],
    [324, 532, 320, 527, 313, 524],
    [317, 523, 320, 523, 323, 523],
    [363, 510, 385, 381, 385, 369],
    [384, 369, 384, 369, 384, 369],
    [384, 368, 384, 368, 384, 367],
    [385, 368, 386, 369, 388, 370],
    [395, 379, 396, 318, 386, 321],
    [388, 306, 389, 287, 388, 289],
    [387, 263, 380, 220, 357, 201],
    [346, 179, 328, 185, 305, 162],
    [291, 152, 246, 153, 245, 153],
  ], //fin curva
];

// Definim els ulls,parpelles i pupiles.
//------------  ULL DRETA ------------
var pupila_d = [
    //------------ Pupil·la
    [
      'c',
      '#6D290F',
        [304, 304],
        [300, 301, 311, 304, 312, 305],
        [311, 304, 311, 316, 303, 306],
      ], 
      //------------ Fi Pupil·la
]
//All ulls fem una petita variació. El primer poligon es el fons, la resta de poligons es dibuixen a la capa superior per enmascarar la pupila.
var ull_d = [
    //------------ Ull
    [
      'c',
      '#FFFFFF',
      [292, 291],
      [301, 290, 316, 293, 325, 297],
      [333, 301, 335, 305, 334, 308],
      [334, 311, 328, 315, 314, 315],
      [301, 316, 290, 315, 281, 311],
      [276, 309, 274, 305, 273, 301],
      [273, 299, 279, 292, 292, 291],
    ], 
    [
      'c',
      '#F4BD82',
        [274, 307],
        [281, 318, 327, 318, 335, 310],
        [335, 338, 277, 314, 274, 307],
      ],
    //------------ Fi Ullera
      //------------ Fi Ull
]
var parpella_d =[
  [
    'c',
    '#FFDAB6',
    [292, 291],
    [301, 290, 316, 293, 325, 297],
    [333, 301, 335, 305, 334, 308],
    [334, 311, 328, 315, 314, 315],
    [301, 316, 290, 315, 281, 311],
    [276, 309, 274, 305, 273, 301],
    [273, 299, 279, 292, 292, 291],
    ], 
] 
//------------  ULL ESQUERRA ------------
var parpella_e =[
  ['v','#F4BD82',[179,286],[149,306],[177,314],[211,303]], 
]
var ull_e =[
  ['v','#FFFFFF',[179,286],[149,306],[177,314],[211,303]], 
  ['v','#F4BD82',[163,297],[179,286],[211,303],[177,314],[173,312],[178,321],[226,303],[178,280],[155,285]], 
  ['v','#F8AF66',[155,285],[131,309],[178,321],[173,312],[149,306],[163,297]], 
]
var pupila_e = [
  ['v',"#6D2A11",[183,298],[179,305],[175,300], [177,298] ], 
]

//Definim les classes que utilizarem i ens ajuden per l'animació. Tenim un calsse per els Ulls i una altra per les parpelles.

class Ull {
  constructor(ull, pupila, origin){

    //La pupila respon a la posició del ratolí. Hem de fer una serie d'adaptacions perquè les coordenades del ratolí son absolutes.

    this.ull = ull;  //shape per l'ull i les màscares
    this.pupila = pupila; //shape per la pupila
    this.origin = origin; //punt on es posiciona la pupila
    this.tOrigin = translateCoords(...this.origin); // traslladem l'origen a coordenades relatives.
    //Per definir els límits del mapping relatiu al ratolí, mirem la distància amb les 4 cantonades.
    var forces = [
      dist(this.origin[0], this.origin[1], 0,0),
      dist(this.origin[0], this.origin[1], 0,height),
      dist(this.origin[0], this.origin[1], width,0),
      dist(this.origin[0], this.origin[1], width, height),
    ];  
    this.maxForca = Math.max(...forces); // identifiquem la força màxima.   
    this.originVector = createVector(this.origin[0], this.origin[1]); //guardem l'origen de la pupila (abs) com a vector.
  }

  draw(){
    var forca = dist(this.origin[0], this.origin[1],mouseX, mouseY); //distància entre la pupila i el ratolí
    var mouseVector = createVector(mouseX, mouseY); //posició del ratolí com a vector
    var direction = p5.Vector.sub(mouseVector, this.originVector); // agafem la direcció i força de la distancia entre el ratolí i la pupila.
    // calculem el vector de desplaçament per la pupila. Amb aquesta técnica aconseguim que l'influéncia tingui en compte la distància del ratolí
    // amb la pupila. Això ens dona una animació més natural.
    direction.normalize().mult(map(forca, 0, this.maxForca, 0, 10)); //normalitzem i escalem en funció de la distància.

    push(); //farem transformacions basades en la pupila, així doncs, salvem el matrix anterior.
      drawShape(this.ull[0]); // dibuixem el fons de l'ull.
      translate(this.tOrigin.x, this.tOrigin.y); //ens movem a la posició de la pupila      
      applyMatrix(1, 0, 0, 1, direction.x, direction.y); // apliquem la "força" del ratolí. Es podria fer amb translate també...
      this.pupila.forEach(poligon => {
        drawShape(poligon, false); //Dibuixem la pupila
      })
    pop(); //tornem al matrix anterior.
    //dibuixem els elements "exteriors" que ens ajuden a "enmascarar" la pupila.
    if( this.ull.length > 1){
      for(var i = 1; i< this.ull.length; i++){
        drawShape(this.ull[i]);
      }
    }
  }
}

//auqesta clase s'encarrega del tancament de la parpella.
class Parpella {

  constructor(poligon, anchor){
    this.poligon = poligon; //shape de la parpella
    this.scale = 0.5;
    this.interval = 0.1; //velocitat de tancament
    this.anchor = anchor; //anchor per la transformació d'escala
    this.tancar = true; //direcció de l'animació
    this.enMoviment = false; //si s'ha d'animar
  }

  //cridem aquesta funció per començar l'animació
  start(){
    this.enMoviment = true;
  }

  draw(){  
    push(); //utilizemt l'scale, així que guardem el transformation matrix.
      //Si tenim moviment, actualitzem el valor de l'escala Y.
      // per fer una animació més natural, utilitzem funcions d'ease.
      if(this.enMoviment && this.tancar){
        this.scale = easeOutCirc(this.scale + this.interval); 
      }else if (this.enMoviment && !this.tancar){
        this.scale = easeInCirc(this.scale - this.interval) ;
      }else{
        this.scale = 0;
      }
      translate(this.anchor[0],this.anchor[1]); //ens movem a la posicó de l'escala
      scale(1,this.scale); //apliquem l'escala.
      this.poligon.forEach(poligon=>{
        drawShape(poligon, false); //dibuix de la parpella
      }); 
    pop(); // retornem a la situació normal

    //controlem quan s'ha d'invertir el moviment.
    if (this.scale == 1 ) {
      this.tancar = false;      
    }else if(this.scale == 0 && this.enMoviment){
      this.enMoviment = false;
      this.tancar=true;
    }
  }
}

function setup() {
  createCanvas(500, 800);
  //utilitzem la funció "modificarCoordenades" per traslladar els objectes de coordenades absolutes a relatives.
  modificarCoordenades(caraPoligons);
  modificarCoordenades(caraCorbes);
  modificarCoordenades(pupila_d);  
  modificarCoordenades(pupila_e);  
  modificarCoordenades(ull_d);
  modificarCoordenades(ull_e);
  modificarCoordenades(parpella_e);   
  modificarCoordenades(parpella_d);
  modificarCoordenades(contornCorba);   
  modificarCoordenades(contorn);    
  //creem els objectes per l'animació dels ulls
  ulls.push(new Ull(ull_d, pupila_d, [304,304]));
  ulls.push(new Ull(ull_e, pupila_e, [183,298]));
  parpelles.push(new Parpella(parpella_e, parpella_e[0][2]));
  parpelles.push(new Parpella(parpella_d, parpella_d[0][2]));
  //definim un framRate desitjat que permeti una animació fluida.
  frameRate(25);
  //la rutina que s'encarrega d'animar el parpelleig automàtic.
  setTimeout(timeParpelleig, eyeCycle);
};

function draw() {
  background('#569A6D');
  patternFons(); //dibuixem el pattern del fons. Un element decoratiu per demostrar com funciona l'opacitat de la sombra  

  push();
    //per permetre fer l'escala, movem l'origen al punt del centre inferior. Aquest punt s'ha utilitzat també per definir les coordenades relative
    //que configurem a la funció "modificarCoordenades"
    translate(width/2, height);
    scale(scaleDrawing); //definim l'escala. scaleDrawing es modifica al keyEvent
    push(); // guardem la configuració actual
      noStroke();
      fill(0,0,0,90);  // definim el color de l'ombra. Negre amb opacitat al 90 (35%)
      var dispX = map(mouseX - width/2, -width/2, width/2, -15, 15);  //calculem el desplaçament de l'ombra. en funció de la distància amb el ratolí      
      translate(-dispX, 0); // movem les coordenades segons la posició del ratolí
                          // aquest desplaçament ens permet utilitzar el mateix polígon que pel contorn per tal de fer l'ombra
                          // sense haver de canviar les coordenades    
      drawShape(contorn[0], true, false); //Dibuixem les ombres. El color ja està definit aquí, així que ignorem la configuració del poligon.
      drawShape(contornCorba[0], true, false);
    pop(); // tornem a la configuració anterior (desfem "translate")

    // Ara dibuixem el retrat. Per tal de resoldre errades d'alineació entre les figures i posibles forats
    // fem que totes le sfigures dibuixades tinguin una linia exterior d'1 pixel, amb el mateix color que el farçit.
    strokeWeight(1);  
    strokeJoin(ROUND);    
    caraPoligons.forEach(poligon=>{
      drawShape(poligon); //utilitzem la nova funció que dibuixa qualsevol shape.
    })
    caraCorbes.forEach(poligon=>{
      drawShape(poligon); //utilitzem la nova funció que dibuixa qualsevol shape.
    })
    
    ulls.forEach(ull=>{
      ull.draw(); //dibuixem cada ull
    });
    parpelles.forEach(parpella=>{
      parpella.draw(); //dibuixem cada parpella
    })

    // Ara afegim les celles, i per aixó utilitzem un gruix de linia específic, ja que seran simples línies.
    strokeWeight(10);
    stroke(0,0,0); // celles negres  
    dibuixarCelles(); //Afegim les celles

    // Afegirem l'ombreig a la cara. Dibuixem una forma o l'altre segons a quin costat es troba el ratolí
    noStroke();
    fill(0,0,0,90);
    if (mouseX > width/2){
      drawShape(contorn[0],true, false);  
    }else{
      drawShape(contornCorba[0],true, false);
    }
  pop(); //tornem a les coordenades i escala original
  
  //Dibuixem la linia central. Aquesta no necesita forma part de les transformacions, així que millor fora del "push"
  strokeWeight(10);
  stroke(0,0,0);
  line(245,0,245,800); //Dibuixem la linia central
}


function timeParpelleig(){
  parpelleig();
  setTimeout(timeParpelleig, randomGaussian(2000, 500)); //amb aixó faig que el parpelleig sigui random en la frequéncia al voltant del temps desitjat (+-500 miliseconds).
}

//Itera per les parpelles i inicia el moviment. Cridat per timeout al setup.
function parpelleig(){
  parpelles.forEach(parpella=>{
    parpella.start();
  })
}

//Aquesta funció dibuixa les celles
function dibuixarCelles(){
  // Volem que les celles segueixen l'aparença de la cara (angles i corbes)
  // Per aixó definim els JOINTS i CAPS per cada cella
  strokeJoin(BEVEL);
  strokeCap(SQUARE);
  noFill(); // només volem línia

  //l'origen de coordenades es troba al punt central inferior.
  //Primer la cella en angles
  beginShape();
     vertex(-95, -513);
     vertex(-68, -525);
     vertex(-38, -510);
  endShape(); //no cal que tanquem la forma

  strokeCap(ROUND); // ara la cella corba
  arc(50, -508, 60, 30, -PI + ( QUARTER_PI / 2 ), -QUARTER_PI);
};

//Aquesta funció dibuixa els patterns del fons
function patternFons(){
  noStroke();  //sense linia
  fill(255, 255, 255, 30); // color blanc amb 30 d'opacitat.
  var tileSize = Math.round(width/2/patternTiles); //definim la mida en funció de la configuració
  var radius = 0;
  radius = (tileSize-5) + (sin(millis()/400)*3); //per animar el fons, utilitzem sin & milis. Escalem els valors per tal de controlar la velocitat.
  //Començem amb el "diamants". Els espaiem 25 pixels.
  //Utilitzem dos bucles per tal de recórrer l'espai en files i columnes
  for( let x = 0; x < 250; x += tileSize ){
    for( let y = 0; y < 800; y += tileSize ){      
      quad(x, y, x + radius/2, y + radius/2, x, y + radius, x - radius/2, y + radius/2); //posicionem els 4 punts necesaris per definir la forma quadrilàtera, de 20 pixels d'ample i alt.
    }
  }

  //A continuació farem els cercles. Comemçem a la coordenada 240 a l'eix X i seguim un patró similar a l'anterior
  for( let x = 240; x < 500; x += tileSize){
    for( let y = 0; y < 800; y += tileSize){      
      ellipse(x + 10, y + 10, radius, radius); //donat que la primera coordenada es el centre, hem de correguir la posició. Enlloc de 20pixels de diàmetre, 18 sembla visualment més correcte.
    }
  }
};

//Iteració amb el teclat
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    parpelleig(); // fem un parpelleig.
  }else if(keyCode === LEFT_ARROW){
    scaleDrawing-=0.1; //fem la imatge més petita
     if (scaleDrawing<0.1) scaleDrawing=0.1; //controlem un limit inferior
  }else if(keyCode === RIGHT_ARROW){
    scaleDrawing+=0.1; //fem la imatge més gran
    if (scaleDrawing>2) scaleDrawing=2; //controlem un límit superior
  }
  return false; // evitem el funcionament normal
}

// Aquesta es una funció d'ajuda que ens permet agafar una coordenada i retorna un vector relatiu amb l'origen de coordenades al centre inferior del canvas.
function translateCoords(x, y){
  var coordV = createVector(x,y);
  var translatedOrigin = createVector(width/2, height);   
  return p5.Vector.sub(coordV, translatedOrigin);
}

//Ease per fer animació més natural. Basat en les funcions de Andrey Sitnik and Ivan Solovev https://easings.net/#
function easeOutCirc(x) {
  return round(sqrt(1 - pow(x - 1, 2)), 3);
}

//Ease per fer animació més natural. Basat en les funcions de Andrey Sitnik and Ivan Solovev https://easings.net/#
function easeInCirc(x) {
  if (x<0) return 0; // si el numero es <0, sqrt dona errada!
  return round(1 - sqrt(1 - pow(x, 2)),5);
}

//Aquesta funció substueix les antigues dibuixarCaraPoligons, dibuixarCaraCorbes i dibuixarPoligon
// amb la variable extra afegida als array (index 0 = tipus de shape) podem generalitzar el dibuix.
// Params:
// s: shape que s'ha de dibuixar
// move: si s'ha de traslladar l'oriden de coordenades al primer punt
// paint: si s'ha d'aplicar fill o no
function drawShape(s, move = true, paint=true){
  var shapeType = s[0]; // mirem el tipus de forma.
  push();
    if (move) translate(s[2][0],s[2][1]); // a vegades no necessitem moure les coordenades
    beginShape();
    if(paint) fill(s[1]); // en el numero 0 sempre tenim el color en HEX
    if(paint) stroke(s[1]); //truc per resoldre errades i forats, el gruix de la linia està definit a la funció draw com 1 pixel.
    vertex(0, 0);
    if (shapeType=="v"){
      for( let i = 3; i < s.length; i++ ){
        vertex(s[i][0], s[i][1] );// index 0 = x; index 1 = y        
      }; 
    }else{
      for( let i = 3; i < s.length; i++ ){        
        bezierVertex(s[i][0], s[i][1], s[i][2], s[i][3], s[i][4], s[i][5]); // seguim l'orde definit a l'array per afegir els punts de control i els anchors.      
      };   
    }
  endShape(CLOSE); //tanquem la forma
  pop();
}

//Els arrays es troben en coordeandes absolutes, pero amb aquest funció convertim tot a coordenades relatives.
//Per fer-ho, utilitzem les operacions amb vectors.
//Aixó ens permet realitzar les animacions amb transformacions sencilles.
function modificarCoordenades(figura){
  figura.forEach(poligon=>{
      var bVector = createVector(poligon[2][0],poligon[2][1]);     
      var translatedOrigin = createVector(width/2, height);   
      var modifiedOrigin = p5.Vector.sub(bVector,translatedOrigin); //utlitzem la diferéncia entre dos vectors, per obtenir les coordenades relatives.
      //el primer punt del poligon, serà el punt d'origen de la transformació relativa.
      poligon[2][0] = modifiedOrigin.x;
      poligon[2][1] = modifiedOrigin.y;
      for(var i = 3; i<poligon.length; i++){
        for(var p = 0; p<poligon[i].length; p+=2){
            var nV = createVector(poligon[i][p], poligon[i][p+1]);            
            var transV = p5.Vector.sub(nV, bVector);
            poligon[i][p] = transV.x;
            poligon[i][p+1] = transV.y;
        }
    }
  });
}