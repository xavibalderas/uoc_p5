var markers=[];
var data;

var MIN_LONG = -3.3523637;
var MAX_LONG = -0.858467215624994;
var MIN_LAT = 43.865565170927454;
var MAX_LAT =  42.405890093086605;


// Markers class
class Markers {
  constructor(mark, index) {
    this.lat = float(mark.lat);
    this.lng = float(mark.lng);
    this.title = mark.tile;
    this.id = mark.id;
    this.radius = 0;
    this.index = index;
    this.over = false;
    this.mark = mark;
    this.y = map(this.lat, MIN_LAT, MAX_LAT, 10, width-10);
    this.x = map(this.lng, MIN_LONG, MAX_LONG, 10, height-10);
  }

  // Check if mouse is over the bubble
  rollover(px, py) {
    let d = dist(px, py, this.lat, this.lng);
    this.over = d < this.radius;
  }

  // Display the Bubble
  draw() {
    noStroke();
    //strokeWeight(0.8);
    fill(0,0,0,10);
    ellipse(this.x, this.y, 10, 10);
    //text(this.id, this.x+5, this.y+20);
  }
  
  connect(mark){
    stroke(0,0,0,10);
    strokeWeight(0.9);
    line(this.x, this.y, mark.x, mark.y);
  }
}



function preload() {
  // Get the most recent earthquake in the database
  let url ='data/markers.json';
  data = loadJSON(url);
}

function setup() {
  var lats = [];
  var longs = [];
  
  createCanvas(600, 600);

  for (var key in data){
    markers.push(new Markers(data[key], key));
  }
}

function draw() {
  background(240);
  var next = 1;
  for (var i = 0; i< markers.length; i++){    
    markers[i].connect(markers[next]);
    markers[i].draw();
    next = (next == markers.length-1) ? 0 : (next +1);
  }
}