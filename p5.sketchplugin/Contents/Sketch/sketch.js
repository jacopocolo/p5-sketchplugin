function setup() {
    createCanvas(500, 500);
    background("#e6e6e6");
  }

  function draw() {
    fill("#0000ff")
    line(0,0,100,100)
    bezier(10, 10, 10, 10, 90, 45, 45, 90);
}
