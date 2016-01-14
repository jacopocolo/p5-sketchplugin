function setup() {
	createCanvas(500, 500);
};

function draw() {
	strokeWeight(10);
	strokeCap(ROUND);
	bezier(85, 20, 10, 10, 90, 90, 15, 80);
	strokeCap(ROUND);
	line(0,0,100,100);
}
