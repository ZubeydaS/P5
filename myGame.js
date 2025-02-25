let backgroundImg;
let interactions = 0;
let message = "";
let gameEnded = false;
let catClicks = 0;
let tailClicks = 0;
let gameRestarted = false;

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
  let canvas = createCanvas(1000, 1000);
  canvas.parent("gameContainer"); 
}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  displayCoordinates();
  highlightInteractiveZones();

  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(message, width / 2, 50);

  textSize(16);
  textAlign(LEFT);
  text(`Interactions: ${interactions}/9`, 20, 30);

  if (gameEnded) {
    textSize(30);
    fill(0, 150, 0);
    textAlign(CENTER);
    text("You pet the cat to sleep. Early Game Over. 💤", width / 2, height / 2);
  } else if (gameRestarted) {
    textSize(30);
    fill(200, 0, 0);
    textAlign(CENTER);
    text("😾 The cat hissed at you! Restarting the game...", width / 2, height / 2);
  } else if (interactions === 9) {
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

  rect(401, 518, 314, 135); // Bed
  rect(-31, 272, 227, 226); // TV
  rect(263, 339, 97, 78); // Frame
  rect(289, 678, 444, 280); // Carpet
  rect(84, 715, 155, 186); // Scratch Post
  rect(794, 714, 145, 267); // Toys
  rect(781, 320, 212, 86); // Pillow
  rect(634, 316, 288, 221); // Cat
  rect(734, 549, 42, 134); // Cat Tail
}

function mousePressed() {
  if (gameEnded || gameRestarted) return;

  if (checkInteraction(401, 518, 314, 135, 'bed', "You sit on the bed. It's surprisingly comfy!")) return;
  if (checkInteraction(-31, 272, 227, 226, 'tv', "You find something to watch on TV.")) return;
  if (checkInteraction(263, 339, 97, 78, 'frame', "You admire the framed picture.")) return;
  if (checkInteraction(289, 678, 444, 280, 'carpet', "The carpet... perfect to ruin.")) return;
  if (checkInteraction(84, 715, 155, 186, 'scratch_post', "I'd rather scratch the bed.")) return;
  if (checkInteraction(794, 714, 145, 267, 'toys', "My favorite toys neatly piled :).")) return;
  if (checkInteraction(781, 320, 212, 86, 'pillow', "The pillow looks fluffy.")) return;
  if (checkCatInteraction()) return;
  if (checkTailInteraction()) return;
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

function checkCatInteraction() {
  if (isHovering(634, 316, 288, 221)) {
    catClicks++;
    if (catClicks < 5) {
      message = `You pet the cat. It seems happy (${catClicks}/5).`;
    } else if (catClicks === 5) {
      message = "The cat falls asleep in your lap. You win early! 🐱💤";
      gameEnded = true;
    }
    if (!clickedObjects['cat']) {
      clickedObjects['cat'] = true;
      interactions++;
    }
    return true;
  }
  return false;
}

function checkTailInteraction() {
  if (isHovering(734, 549, 42, 134)) {
    tailClicks++;
    if (tailClicks < 5) {
      message = `You poked the tail. The cat seems annoyed (${tailClicks}/5).`;
    } else if (tailClicks === 5) {
      message = "😾 The cat hissed! You annoyed it too much. Restarting the game...";
      restartGame();
    }
    if (!clickedObjects['cat_tail']) {
      clickedObjects['cat_tail'] = true;
      interactions++;
    }
    return true;
  }
  return false;
}

function restartGame() {
  gameRestarted = true;
  document.getElementById('restartButton').style.display = 'block';

  setTimeout(() => {
    interactions = 0;
    catClicks = 0;
    tailClicks = 0;
    gameEnded = false;
    gameRestarted = false;
    message = "";

    for (let obj in clickedObjects) {
      clickedObjects[obj] = false;
    }
    document.getElementById('restartButton').style.display = 'none';
  }, 3000);
}

function isHovering(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}