let backgroundImg;
let interactions = 0;
let message = "";
let clickedObjects = {
  bed: false,
  tv: false,
  frame: false,
  carpet: false,
  scratch_post: false,
  toys: false,
  pillow: false,
  cat: false,
  cat_tail: false,
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
  text(`Interactions: ${interactions}/9`, 20, 30);

  // End the game
  if (interactions === 9) {
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

  // Example coordinates; adjust these using your displayCoordinates()
  rect(100, 300, 200, 150); // Bed
  rect(600, 400, 250, 200); // TV
  rect(850, 200, 100, 200); // Frame
  rect(300, 600, 300, 100); // Carpet
  rect(700, 700, 100, 200); // Scratch Post
  rect(200, 800, 100, 100); // Toys
  rect(150, 350, 150, 100); // Pillow
  rect(500, 500, 100, 100); // Cat
  rect(520, 600, 50, 100);  // Cat Tail
}

function mousePressed() {
  if (checkInteraction(100, 300, 200, 150, 'bed', "You sit on the bed. It's surprisingly comfy!")) return;
  if (checkInteraction(600, 400, 250, 200, 'tv', "You find something to watch on TV.")) return;
  if (checkInteraction(850, 200, 100, 200, 'frame', "You admire the framed picture.")) return;
  if (checkInteraction(300, 600, 300, 100, 'carpet', "The carpet... perfect to ruin.")) return;
  if (checkInteraction(700, 700, 100, 200, 'scratch_post', "I'd rather scratch the bed.")) return;
  if (checkInteraction(200, 800, 100, 100, 'toys', "My favorite toys neatly piled :).")) return;
  if (checkInteraction(150, 350, 150, 100, 'pillow', "The pillow looks fluffy.")) return;
  if (checkInteraction(500, 500, 100, 100, 'cat', "Hey!")) return;
  if (checkInteraction(520, 600, 50, 100, 'cat_tail', "That tickes >:(")) return;
}

function checkInteraction(x, y, w, h, objectName, interactionMessage) {
  if (isHovering(x, y, w, h) && !clickedObjects[objectName]) {
    message = interactionMessage;
    clickedObjects[objectName] = true;
    interactions++;
    return true;
  }
  return false;
}

function isHovering(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}
