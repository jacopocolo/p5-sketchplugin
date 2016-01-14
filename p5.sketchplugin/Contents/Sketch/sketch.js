var angles = [ 30, 10, 45, 35, 60, 38, 75, 67 ];

function setup() {
  createCanvas(720, 400);
}

function draw() {
  pieChart(300, angles);
}

function pieChart(diameter, data) {
  var lastAngle = 0;
  for (var i = 0; i < data.length; i++) {
    arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
    lastAngle += radians(angles[i]);
  }
}