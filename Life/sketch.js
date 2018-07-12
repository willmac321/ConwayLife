var gridCountX;
var gridCountY;
var gridSize = 50;
var liveC;
var deadC;
var oldSec;
var oldCells = [];
var newCells = [];
function setup() {
  createCanvas(600,600);
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

  var newSec = second();
  //if (newSec != oldSec){// && newSec % 5 == 0) {
    oldSec = newSec;
    update();

    for(var y = 0; y < gridCountY; y++){
      for(var x = 0; x < gridCountX; x++){
          noStroke();
          rect(x * gridSize, y * gridSize, gridSize, gridSize);
          if(newCells[x + y * gridCountY] == 1 ){
            fill(liveC);
          }
          else{
            fill(deadC);

          }
      }
  //  }
  }
}

function update(){
  newCells = oldCells;
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
      if ( i!=0 || j!= 0 || i != gridCountX - 1 || j != gridCountY - 1){
        oldCells[i + j * gridCountY] = round(random());
        newCells[i + j * gridCountY] = oldCells[i + j * gridCountY];
      }
      else{
        oldCells[i + j * gridCountY] = 0;
      }

    }
}
}

function updateBasedOnRules(x, y){
  //rv is false for dead, true for live
  var index = round(x + y * gridCountY);
  var isAlive = oldCells[index];
  var willLive = 0;
  for(var i = x - 1; i < x + 2; i++){
    for(var j = y - 1; j < y + 2; j++){
      if(x != i || y != j){
        willLive += oldCells[i + j * gridCountY];
      }
    }
  }

  if(isAlive == 1){
    if(willLive < 2 || willLive > 3){
      isAlive = 0;
    }
  }
  else if(isAlive == 0){
    if(willLive == 3){
      isAlive = 1;
  //      console.log(x + ", " + y + " " + index + " live: " + willLive + " isAlive: " + isAlive);
    }
  }

  newCells[index] = isAlive;


}
