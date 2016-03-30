var length = 40;
var x = 0;
var x1 = length;
var x2 = 0;
var y = 0;
var y1 = length;
var y2 = 0;

function setup() {
    createCanvas(500,500);
    background(64, 64, 224);
}

function draw() {
    var strokeW = length/3;
    stroke(160, 160, 255);
    strokeWeight(strokeW);
    strokeCap(SQUARE);
    while (y <= height) {
        while (x>width) {x=0; x1=length; x2=0; y+=length;}
        if (Math.random() > 0.5) {
            line(x1+x, y1+y, x2 + x, y2+y);
        } else {
            line(x1+x, y2+y, x2 + x, y1+y);
        }
          x+=length;
    };
}