// To-do
// implement noStroke()
// implement strokeWitdh()
// Implement arc()
// Implement triangle()
// if there is an artboard named p5.canvas, draw there. Else create a artboard called p5.canvas and draw there

@import 'utils.js'

var doc;
var canvasWidth = 600
var canvasHeight = 800;
var textSize = 12;
var textFont = "Helvetica";
var fillColor = "#000000";
var strokeColor = "#000000";
var strokeThikness = "1";

var onRun = function(context) {
  doc = context.document;
  var selection = context.selection;
  var page = [doc currentPage];
  var view = [doc currentView];
  var artboard;

  function createCanvas(width, height) {
    canvasWidth = width;
    canvasHeight = height;

    var p5canvas = getArtboardWithName("p5canvas");

    if(!p5canvas) {
        artboard = MSArtboardGroup.new()
        frame = artboard.frame()
        frame.setX(0)
        frame.setY(0)
        frame.setWidth(canvasWidth)
        frame.setHeight(canvasHeight)
        artboard.setName("p5canvas")
        artboard.setHasBackgroundColor(true);
        doc.currentPage().addLayers([artboard])
      }
    else {
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

  function triangle(x1,y1,x2,y2,x3,y3) {
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
    createCanvas(500, 500);
    background("#f9f9f9");
  }

  function draw() {
    stroke("#000000");
    strokeWeight(4);
    fill("#e9e9e9");
    line(0, 0, canvasWidth, canvasHeight);
    triangle(0,10,100,0,50,50)
  };

  setup();
  draw();
};
