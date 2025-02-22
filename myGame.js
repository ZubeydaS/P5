let backgroundImg;
let interactions = 0;
let message = "";
let clickedObjects = {
  bed: false,
  desk: false,
  mirror: false
};

function preload() {
  backgroundImg = loadImage("bedroom.png");
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(255);
  image(backgroundImg, 0, 0, width, height);

  displayCoordinates();
  highlightInteractiveZones();

  // Display message when clicked
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(message, width / 2, 50);

  // Show score
  textSize(16);
  textAlign(LEFT);
  text(`Interactions: ${interactions}/3`, 20, 30);

  // End the game
  if (interactions === 3) {
    textSize(30);
    fill(0, 150, 0);
    textAlign(CENTER);
    text("You explored everything in your room!", width / 2, height / 2);
  }
}

function displayCoordinates() {
  fill(0);
  textSize(12);
  textAlign(LEFT);
  text(`X: ${mouseX} Y: ${mouseY}`, 10, height - 10);
}

function highlightInteractiveZones() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);

  // Bed (adjust these coordinates based on your actual image)
  rect(100, 300, 200, 150);

  // Desk
  rect(600, 400, 250, 200);

  // Mirror
  rect(850, 200, 100, 200);
}

function mousePressed() {
  // Bed interaction
  if (isHovering(100, 300, 300, 450) && !clickedObjects.bed) {
    message = "You sit on the bed. It's surprisingly comfy!";
    clickedObjects.bed = true;
    interactions++;
  }

  // Desk interaction
  else if (isHovering(600, 850, 400, 600) && !clickedObjects.desk) {
    message = "You find some old notes on the desk.";
    clickedObjects.desk = true;
    interactions++;
  }

  // Mirror interaction
  else if (isHovering(850, 950, 200, 400) && !clickedObjects.mirror) {
    message = "You look into the mirror. Looking sharp!";
    clickedObjects.mirror = true;
    interactions++;
  }
}

function isHovering(x1, x2, y1, y2) {
  return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
}
