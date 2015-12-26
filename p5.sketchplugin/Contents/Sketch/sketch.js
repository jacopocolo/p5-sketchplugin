function setup() {
    createCanvas(600, 600);
    background("#e6e6e6");
  }

  function draw() {
    fill("#0000FF");
    arc(canvasWidth/2,canvasHeight/2,500,500,0,0.5);
    fill("#FF0000");
    arc(canvasWidth/2,canvasHeight/2,500,500,0.5,PI);
    fill("#00FF00");
    arc(canvasWidth/2,canvasHeight/2,500,500,PI,TWO_PI);
  }
