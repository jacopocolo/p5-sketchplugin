function setup() {
    createCanvas(500, 500);
    background("#e6e6e6");
  }

  function draw() {
    noStroke()
    fill("#69D2E7")
    arc(canvasWidth/2,canvasHeight/2,100,100,0,90);
    fill("#A7DBD8")
    arc(canvasWidth/2,canvasHeight/2,100,100,90,180);
    fill("#F38630")
    arc(canvasWidth/2,canvasHeight/2,100,100,180,270);
    fill("#FA6900")
    arc(canvasWidth/2,canvasHeight/2,100,100,270,360);
  }
