let bedroomImg;
let objects = [
    { name: "Bed", x: 200, y: 600, w: 400, h: 200, message: "Your bed looks cozy but unmade." },
    { name: "Desk", x: 600, y: 500, w: 300, h: 200, message: "The desk is cluttered." },
    { name: "Mirror", x: 800, y: 200, w: 150, h: 300, message: "Your reflection stares back at you." }
];
let clickedObjects = {};
let totalInteractions = 0;

function preload() {
    bedroomImg = loadImage("bedroom.png");  // Load background image
}

function setup() {
    createCanvas(1000, 1000);
    imageMode(CENTER);
    clickedObjects = objects.reduce((acc, obj) => ({ ...acc, [obj.name]: false }), {});
}

function draw() {
    background(255);
    image(bedroomImg, width / 2, height / 2, width, height);

    displayCoordinates();
    highlightObjects();
    
    if (totalInteractions === objects.length) {
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("You've explored everything in the room!", width / 2, height - 50);
    }
}

function displayCoordinates() {
    fill(255);
    rect(10, height - 30, 120, 20);
    fill(0);
    textSize(14);
    text(`X: ${mouseX}, Y: ${mouseY}`, 20, height - 15);
}

function highlightObjects() {
    objects.forEach(obj => {
        if (mouseX > obj.x && mouseX < obj.x + obj.w && mouseY > obj.y && mouseY < obj.y + obj.h) {
            cursor('pointer');
        }
    });
}

function mousePressed() {
    objects.forEach(obj => {
        if (mouseX > obj.x && mouseX < obj.x + obj.w && mouseY > obj.y && mouseY < obj.y + obj.h) {
            if (!clickedObjects[obj.name]) {
                clickedObjects[obj.name] = true;
                totalInteractions++;
            }
            displayMessage(obj.message);
        }
    });
}

function displayMessage(msg) {
    fill(0, 0, 0, 200);
    rect(50, 50, 900, 100);
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(msg, width / 2, 100);
}
