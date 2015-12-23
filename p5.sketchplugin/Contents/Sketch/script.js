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
var font = "Georgia";
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
    shape.setName("Line");
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
    shape.setName("Rectangle");
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
    shape.setName("Rectangle");
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
    shapeGroup.setName("Oval");
    var fill = shapeGroup.style().fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(fillColor);

    var border = shapeGroup.style().borders().addNewStylePart();
    border.color = MSColor.colorWithSVGString(strokeColor);
    border.thickness = strokeThikness;

    artboard.addLayers([shapeGroup]);
  }

  function text(str, x, y, x2, y2) {
    var textLayer = artboard.addLayerOfType("text");
    textLayer.textColor = MSColor.colorWithSVGString(strokeColor);
    textLayer.fontSize = 50;
    textLayer.setFontPostscriptName(font.toString());
    textLayer.setName(str);
    textLayer.setNameIsFixed(true);
    textLayer.setStringValue(str);
    textLayer.frame().setX(Number(x));
    textLayer.frame().setY(Number(y));

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
    font = font;
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








  var i = 0;
  numberToDraw = 100;

  function setup() {
    createCanvas(500, 500);
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
    textFont("Georgia")
    stroke("rgb(255,0,0)")
    text('Hello world', canvasWidth / 2-130, canvasHeight / 2+50)
  }














  setup();
  draw();
};
