var angles = [ 30, 10, 45, 35, 60, 38, 75, 67 ];

function setup() {
  createCanvas(400, 400);
}

var noiseScale=0.02;

function draw() {
  background("#000000");
  for (var x=0; x < width; x++) {
    var noiseVal = noise((100+x)*noiseScale, 200*noiseScale);
    stroke("rgb("+noiseVal*255+","+noiseVal*255+","+noiseVal*255+")");
    line(x, 200+noiseVal*80, x, height);
  }
}