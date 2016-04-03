function setup() {
	createCanvas(100, 100) //set up a 200x200 px artboard
}

function draw() {
  	ellipse(0, 50, 33, 33);  // Left circle

push();  // Start a new drawing state
strokeWeight(10);
fill(204, 153, 0);
ellipse(33, 50, 33, 33);  // Left-middle circle

push();  // Start another new drawing state
stroke(0, 102, 153);
ellipse(66, 50, 33, 33);  // Right-middle circle
pop();  // Restore previous state

pop();  // Restore original state

ellipse(100, 50, 33, 33);  // Right circle
}