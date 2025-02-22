let bedroomImg;
let message = "";
let clickedObjects = {
  bed: false,
  desk: false,
  mirror: false
};
let interactions = 0;

function preload() {
  bedroomImg = loadImage("bedroom.png");
}

function setup() {
  createCanvas(1000, 1000);
  textSize(20);
  textAlign(CENTER);
}

function draw() {
  background(bedroomImg);

  // Show interaction messages
  fill(255);
  text(message, width / 2, height - 50);

  // Display interaction completion
  if (interactions === 3) {
    fill(0, 200, 0);
    textSize(30);
    text("You've explored everything in the room!", width / 2, height / 2);
  }

  // Display mouse coordinates (for debugging)
  fill(0);
  textSize(12);
  text(`X: ${mouseX} Y: ${mouseY}`, 50, height - 10);

  // Highlight interactive zones on hover
  highlightInteractiveZones();
}

function mousePressed() {
  // Bed interaction
  if (isHovering(100, 200, 300, 500) && !clickedObjects.bed) {
    message = "You sit on the bed. It's comfy!";
    clickedObjects.bed = true;
    interactions++;
  }
  // Desk interaction
  else if (isHovering(600, 800, 400, 600) && !clickedObjects.desk) {
    message = "You find some old notes on the desk.";
    clickedObjects.desk = true;
    interactions++;
  }
  // Mirror interaction
  else if (isHovering(850, 950, 200, 400) && !clickedObjects.mirror) {
    message = "You stare at your reflection. Deep thoughts ensue.";
    clickedObjects.mirror = true;
    interactions++;
  }
}

function isHovering(x1, x2, y1, y2) {
  return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
}

function highlightInteractiveZones() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);

  if (isHovering(100, 200, 300, 500)) {
    rect(100, 300, 100, 200); // Bed area
    cursor('pointer');
  } else if (isHovering(600, 800, 400, 600)) {
    rect(600, 400, 200, 200); // Desk area
    cursor('pointer');
  } else if (isHovering(850, 950, 200, 400)) {
    rect(850, 200, 100, 200); // Mirror area
    cursor('pointer');
  } else {
    cursor('default');
  }
}
