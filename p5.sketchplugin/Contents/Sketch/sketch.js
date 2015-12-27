function setup() {
    createCanvas(500, 500);
    background("#e6e6e6");
  }

  function draw() {
    fill("#0000ff")
    noStroke()
    bezier(10, 10, 10, 10, 90, 45, 45, 90);
}
