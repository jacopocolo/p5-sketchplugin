// To-do
// implement noStroke()
// implement strokeWitdh()
// Implement arc()
// Fix artboard placement if there is an artboard already. It should loop, find the one most on the left and go to the left of that. Righ now it only goes to the left of the first artboard
// Implement noise()?
// Clean artboard on run

@import 'utils.js'

var doc;
var padding = 50;
var canvasWidth = 600
var canvasHeight = 800;
var textSize = 12;
var textFont = "Helvetica";
var fillColor = "#000000";
var strokeColor = "#000000";
var strokeThikness = "1";
var seeded;

var onRun = function(context) {
  doc = context.document;
  var selection = context.selection;
  var page = [doc currentPage];
  var view = [doc currentView];
  var artboards = [[doc currentPage] artboards];
  var artboard;

  function createCanvas(width, height) {
    canvasWidth = width;
    canvasHeight = height;

    var p5canvas = getArtboardWithName("p5canvas");

    if (!p5canvas) {
      artboard = MSArtboardGroup.new()
      frame = artboard.frame()
      if (artboards == nil || [artboards count] == 0) {
        frame.x = 0
        frame.y = 100
        log("this")
      } else {
        //if p5canvas doesn’t exist already, we place it 50px before the first artboard
        firstArtboard = artboards[0];
        firstArtboardFrame = firstArtboard.frame()
        firstArtboardFrameX = firstArtboardFrame.minX()
        firstArtboardFrameY = firstArtboardFrame.minY()
        frame.x = firstArtboardFrameX - canvasWidth - padding
        frame.y = firstArtboardFrameY
      }
      frame.setWidth(canvasWidth)
      frame.setHeight(canvasHeight)
      artboard.setName("p5canvas")
      artboard.setHasBackgroundColor(true);
      doc.currentPage().addLayers([artboard])
    } else {
      artboard = p5canvas;
      frame = artboard.frame()
      frame.setWidth(canvasWidth)
      frame.setHeight(canvasHeight)
    }
  }

  function point(x, y) {
    var path = NSBezierPath.bezierPath();
    path.moveToPoint(NSMakePoint(x, y));
    path.lineToPoint(NSMakePoint(x, y));
    path.lineToPoint(NSMakePoint(x + 1, y));
    path.lineToPoint(NSMakePoint(x + 1, y + 1));
    path.lineToPoint(NSMakePoint(x, y + 1));
    path.lineToPoint(NSMakePoint(x, y));
    path.closePath();

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var fill = shape.style().fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(fillColor);

    artboard.addLayers([shape]);
  }

  function line(x1, y1, x2, y2) {
    var path = NSBezierPath.bezierPath();
    path.moveToPoint(NSMakePoint(x1, y1));
    path.lineToPoint(NSMakePoint(x1, y1));
    path.lineToPoint(NSMakePoint(x2, y2));
    path.closePath();

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var border = shape.style().borders().addNewStylePart();
    border.color = MSColor.colorWithSVGString(strokeColor);
    border.thickness = strokeThikness;

    artboard.addLayers([shape]);
  }

  function rect(x, y, w, h) {
    var path = NSBezierPath.bezierPath();
    path.moveToPoint(NSMakePoint(x, y));
    path.lineToPoint(NSMakePoint(x, y));
    path.lineToPoint(NSMakePoint(x + w, y));
    path.lineToPoint(NSMakePoint(x + w, y + h));
    path.lineToPoint(NSMakePoint(x, y + h));
    path.lineToPoint(NSMakePoint(x, y));
    path.closePath();

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var fill = shape.style().fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(fillColor);

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var border = shape.style().borders().addNewStylePart();
    border.color = MSColor.colorWithSVGString(strokeColor);
    border.thickness = strokeThikness;

    artboard.addLayers([shape]);
  }

  function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
    var path = NSBezierPath.bezierPath();
    path.moveToPoint(NSMakePoint(x1, y1));
    path.lineToPoint(NSMakePoint(x1, y1));
    path.lineToPoint(NSMakePoint(x2, y2));
    path.lineToPoint(NSMakePoint(x3, y3));
    path.lineToPoint(NSMakePoint(x4, y4));
    path.lineToPoint(NSMakePoint(x1, y1));
    path.closePath();

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var fill = shape.style().fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(fillColor);

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var border = shape.style().borders().addNewStylePart();
    border.color = MSColor.colorWithSVGString(strokeColor);
    border.thickness = strokeThikness;

    artboard.addLayers([shape]);
  }

  function triangle(x1, y1, x2, y2, x3, y3) {
    var path = NSBezierPath.bezierPath();
    path.moveToPoint(NSMakePoint(x1, y1));
    path.lineToPoint(NSMakePoint(x1, y1));
    path.lineToPoint(NSMakePoint(x2, y2));
    path.lineToPoint(NSMakePoint(x3, y3));
    path.lineToPoint(NSMakePoint(x1, y1));
    path.closePath();

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    var fill = shape.style().fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(fillColor);

    var shape = MSShapeGroup.shapeWithBezierPath(path);
    shape.setName("triangle");
    var border = shape.style().borders().addNewStylePart();
    border.color = MSColor.colorWithSVGString(strokeColor);
    border.thickness = strokeThikness;

    artboard.addLayers([shape]);
  }

  function ellipse(a, b, c, d) {
    var doc = context.document;
    centerX = a - c / 2;
    centerY = b - d / 2;
    var ovalShape = MSOvalShape.alloc().init();
    ovalShape.frame = MSRect.rectWithRect(NSMakeRect(centerX, centerY, c, d));

    var shapeGroup = MSShapeGroup.shapeWithPath(ovalShape);
    var fill = shapeGroup.style().fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(fillColor);

    var border = shapeGroup.style().borders().addNewStylePart();
    border.color = MSColor.colorWithSVGString(strokeColor);
    border.thickness = strokeThikness;

    artboard.addLayers([shapeGroup]);
  }

  function text(str, x, y, x2, y2) {
    var textLayer = artboard.addLayerOfType("text");
    textLayer.textColor = MSColor.colorWithSVGString(fillColor);
    textLayer.fontSize = textSize;
    textLayer.setFontPostscriptName(textFont);
    textLayer.setName(str);
    textLayer.setNameIsFixed(true);
    textLayer.setStringValue(str);

    textLayer.frame().setX(x);
    textLayer.frame().setY(y);

    if (x2 == undefined || y2 == undefined) {
      resizeLayerToFitText(textLayer);
    } else {
      textLayer.frame().setWidth(x2);
      textLayer.frame().setHeight(y2);
    }
    return textLayer;
  };

  function textSize(size) {
    textSize = size;
  };

  function textFont(font) {
    textFont = font;
  };

  function fill(color) {
    fillColor = color;
  };

  function stroke(color) {
    strokeColor = color;
  };

  function strokeWeight(weight) {
    strokeThikness = weight;
  };

  function noStroke() {
    strokeWeight = 0; //not the best solution but it works
  };

  function background(color) {
    artboard.setBackgroundColor(MSColor.colorWithSVGString(color));
  };

  function setup() {
    createCanvas(640, 480);
    background("#e5e1d6");
  }

  function draw() {
    strokeWeight(5);
    stroke("#f0f0f0");
    triangle(0, 480, 0, 0, 480, 0);
    ellipse(300, -42, 400, 400);
    ellipse(300, -42, 230, 230);
    ellipse(300, 155, 148, 148);
    ellipse(300, 155, 130, 130);
    noStroke();
    ellipse(295, 155, 70, 70);
    stroke("#000000");
    strokeWeight(1);
    ellipse(294, 155, 45, 45);
    //grid ellipse 2
    noStroke();
    ellipse(158, 145, 100, 115);
    ellipse(158, 145, 90, 103);
    ellipse(158, 150, 80, 100);
    ellipse(158, 158, 70, 90);
    stroke("#000000");
    strokeWeight(2);
    ellipse(158, 160, 53, 70);
    quad(640, 182, 556, 110, 474, 424, 640, 424);
    quad(478, 44, 556, 110, 520, 246, 260, 294);
    quad(-83, 425, 42, 74, 262, 283, 60, 536);
    quad(162, 188, 222, 92, 334, 206, 262, 283);
    quad(294, 164, 418, 36, 452, 72, 334, 206);
    triangle(428, 0, 642, 184, 642, 0);
    quad(460, 24, 480, 0, 512, 0, 478, 40);
  };

  setup();
  draw();
};
