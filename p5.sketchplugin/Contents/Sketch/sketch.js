function setup() {
	createCanvas(500,500);
}

 function draw() {
   background(200);
   var maxX = 2.8;
   var maxY = 1.5;

   var xValue = map(100, 0, width, 0, maxX);
   if (xValue > 0) {
     var yValue = log(xValue);
     var y = map(yValue, -maxY, maxY, height, 0);

     var legend = "log(" + nf(xValue, 1, 2) + ")\n= " + nf(yValue, 1, 3);
     stroke(150);
     line(100, y, 100, height);
     fill(0);
     text (legend, 5, 15);
     noStroke();
     ellipse (100, y, 7, 7);
   }

   noFill();
   stroke(0);
   beginShape();
   for(var x=0; x < width; x++) {
     xValue = map(x, 0, width, 0, maxX);
     yValue = log(xValue);
     y = map(yValue, -maxY, maxY, height, 0);
     vertex(x, y);
   }
   endShape();
   line(0,0,0,height);
   line(0,height/2,width, height/2);
 }