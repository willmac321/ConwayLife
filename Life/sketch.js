var gridCountX;
var gridCountY;
var gridSize = 20;
var liveC;
var deadC;
var oldSec;
var oldCells = [];
var newCells = [];
var colorTrack = [];
var alphaTrack = [];

function setup() {
  createCanvas(800, 800);
  background(60);
  gridCountX = floor(width/gridSize);
  gridCountY = floor(height/gridSize);
  liveC = color(255);
  deadC = color(60);
  oldSec = 0;
  init();
  //update();
}

function draw(){

  var newSec = millis();
  if (newSec > oldSec + 50 ){// && newSec % 5 == 0) {
    oldSec = newSec;
    update();
    for(var y = 0; y < gridCountY; y++){
      for(var x = 0; x < gridCountX; x++){
          noStroke();
          if(newCells[x + y * gridCountY] == 1 ){
          //  alpha
            //colorTrack[x + y * gridCountY] = colorMode(colorTrack[x + y * gridCountY], (alpha + 1) % 255);
            alphaTrack[x + y * gridCountY] += 1;
            fill(red(colorTrack[x + y * gridCountY]), green(colorTrack[x + y * gridCountY]), blue(colorTrack[x + y * gridCountY]), map(alphaTrack[x + y * gridCountY], 0, 500, 0, 255 ));
          //  colorTrack[x + y * gridCountY] += 1;
          }
          else{
            fill(deadC);
                    //console.log("x: " + x + " y: " + y);
          }
          rect(x * gridSize, y * gridSize, gridSize, gridSize);
      }
    }
  }
}

function update(){
  newCells = [];
  for(var x = 0; x < gridCountX; x++){
    for(var y = 0; y < gridCountY; y++){
      updateBasedOnRules(x, y);
    }
  }
  oldCells = newCells;
}

function init(){
  for(var j = 0; j < gridCountY; j++){
    for(var i = 0; i < gridCountX; i++){
      if ( i !=0 && j != 0 && i != gridCountX - 1 && j != gridCountY - 1){
        oldCells[i + j * gridCountY] = round(random());
        newCells[i + j * gridCountY] = oldCells[i + j * gridCountY];
        colorTrack[i + j * gridCountY] = color(floor(random(255)), floor(random(255)), floor(random(255)));
      }
      else{
        oldCells[i + j * gridCountY] = 0;
        colorTrack[i + j * gridCountY] = color(floor(random(255)), floor(random(255)), floor(random(255)));
      }
      alphaTrack[i + j * gridCountY] = 1;
    }
  }
}

function updateBasedOnRules(x, y){
  //rv is false for dead, true for live
  var index = (x + y * gridCountY);
  var isAlive = oldCells[index];
  var willLive = 0;
  for(var i = x - 1; i < x + 2; i++){
    for(var j = y - 1; j < y + 2; j++){
      if ((i != x) || (j != y)){
        var t = i;
        var u = j;
        if(t < 0 || t >= gridCountX){
          t = (i + gridCountX) % gridCountX;
        }
        if( u < 0 || u >= gridCountY){
          u = (j + gridCountY) % gridCountY;
        }
        willLive += oldCells[t + u * gridCountY];
      }
    }
  }

  if(isAlive === 1){
    if(willLive < 2 || willLive > 3){
      isAlive = 0;
    }
  }
  else if(isAlive === 0){
    if(willLive === 3){
      isAlive = 1;
  //      console.log(x + ", " + y + " " + index + " live: " + willLive + " isAlive: " + isAlive);
    }
  }

  newCells[index] = isAlive;


}
