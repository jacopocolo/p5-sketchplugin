function setup() {
	createCanvas(500, 500);
};

function draw() {
	strokeWeight(10);
	strokeCap("project");
	bezier(85, 20, 10, 10, 90, 90, 15, 80);
}
