function setup() {
    createCanvas(300, 500);
    background("#e6e6e6");
  }

  function draw() {
    stroke("rgb(0,0,255)");
    fill("rgb(0,255,0)")
    ellipse(canvasWidth / 2, canvasHeight / 2, 100, 100);
    line(0, 0, canvasWidth, canvasHeight);
    line(0, canvasHeight, canvasWidth, 0);

    //a simple grid
    for (x = 0; x < canvasWidth; x = x + 50) {
      line(x, 0, x, canvasHeight)
    }
    for (y = 0; y < canvasHeight; y = y + 50) {
      line(0, y, canvasWidth, y)
    }
    textFont("Helvetica Bold")
    stroke("rgb(255,0,0)")
    text('Hello world', canvasWidth / 2-130, canvasHeight / 2+50)
  }
