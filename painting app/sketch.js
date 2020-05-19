var canvas;
var drawing = [];
var currentPath = [];
var isDrawing = false;


function setup() {
  canvas = createCanvas(displayWidth - 70, displayHeight - 270);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer')
  canvas.mouseReleased(endPath);
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);


  textSize(18);
  textFont('Georgia');


  database = firebase.database();
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}


function draw() {
  background(255);
  fill("black")
  textSize(30);
  textFont('Georgia');
  text("Painting App", 550, 30);


  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }
  beginShape();
  stroke(0);
  strokeWeight(4);
  noFill();


  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i]
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y)
    }
    endShape();
  }

  drawSprites();
}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    drawing: drawing
  }
  ref.push(data);

}

function clearDrawing() {
  drawing = [];
}
