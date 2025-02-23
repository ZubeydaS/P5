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
    text("You explored everything in your room! Kitty is chilled out.", width / 2, height / 2);
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
  rect(401, 518, 314, 135); // Bed
  rect(-31, 272, 227, 226); // TV
  rect(263, 339, 97, 78); // Frame
  rect(289, 678, 444, 280); // Carpet
  rect(84, 715, 155, 186); // Scratch Post
  rect(794, 714, 145, 267); // Toys
  rect(781, 320, 212, 86); // Pillow
  rect(634, 316, 288, 221); // Cat
  rect(734, 549, 42, 134);  // Cat Tail
}

function mousePressed() {
  if (checkInteraction(401, 518, 314, 135, 'bed', "You sit on the bed. It's surprisingly comfy!")) return;
  if (checkInteraction(-31, 272, 227, 226, 'tv', "You find something to watch on TV.")) return;
  if (checkInteraction(263, 339, 97, 78, 'frame', "You admire the framed picture.")) return;
  if (checkInteraction(289, 678, 444, 280, 'carpet', "The carpet... perfect to ruin.")) return;
  if (checkInteraction(84, 715, 155, 186, 'scratch_post', "I'd rather scratch the bed.")) return;
  if (checkInteraction(794, 714, 145, 267, 'toys', "My favorite toys neatly piled :).")) return;
  if (checkInteraction(781, 320, 212, 86, 'pillow', "The pillow looks fluffy.")) return;
  if (checkInteraction(634, 316, 288, 221, 'cat', "Hey!")) return;
  if (checkInteraction(734, 549, 42, 134, 'cat_tail', "That tickes >:(")) return;
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
