// To-do
// Implement noise()?
// Implement noFill()
// Implement map()
//Make consistent functions for fill() and stroke()
// Implement rgba() for both fill() and stroke()
//implement rotate()

@import 'utils.js'
@import 'sketch.js'

var ctx, doc, selection, page, view, artboard, artboards;

var padding = 50; //distance from p5canvas to the first artboard
var canvasWidth = 600 //default
var canvasHeight = 800 //default
var textSize = 12 //default
var font = "Helverica" //default
var fillColor = "#ffffff"; //default
var strokeColor = "#000000"; //default
var strokeThikness = "1"; //default
var seeded;

// Trigoniometry constants
var PI = Math.PI;
var HALF_PI = Math.PI / 2;
var QUARTER_PI = PI / 4;
var TAU = PI * 2;
var TWO_PI = PI * 2;

// This function checks if a canvas already exists and if it doesn’t it draws it
// If the canvas already exists, it deletes all the layers inside and draw new ones
// The idea is to mimic the behaviour of the Processing canvas, where every time you
// run the code, you create something new.

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
      var numberOfArtboards = [artboards count];
      minX = 0;
      minY = 0;
      for (i = 0; i < numberOfArtboards; i++) {
          if (artboards[i].frame().minX() <= minX) {
            minX = artboards[i].frame().minX();
            minY = artboards[i].frame().minY();
          }
      }
      firstArtboard = artboards[0];
      firstArtboardFrame = firstArtboard.frame()
      firstArtboardFrameX = firstArtboardFrame.minX()
      firstArtboardFrameY = firstArtboardFrame.minY()
      frame.x = minX - canvasWidth - padding
      frame.y = minY
    }
    frame.setWidth(canvasWidth)
    frame.setHeight(canvasHeight)
    artboard.setName("p5canvas")
    artboard.setHasBackgroundColor(true);
    doc.currentPage().addLayers([artboard])
  } else {
    deleteAllLayers("p5canvas")
    artboard = p5canvas;
    frame = artboard.frame()
    frame.setWidth(canvasWidth)
    frame.setHeight(canvasHeight)
  }
}

// A simple point. Here it’s drawn as a 1x1 pixels rectangl.
// It does have a fill color, it doesn’t have a stroke color
// You can call it like this: point(100,100)
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
// A simple line from x1, y1 to x2, y2. It sadly doesn’t behave like the Sketch
// line but as a path. I.E.: you cannot edit it as a line.
// It doesn’t have a fill color, it has a stroke color
// You can call it like this: line(0,0,100,100)
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
// A rectangle that starts from x, y and has a height of h and a width of w.
// The angles are always at 90 degrees. It has both a fill and a stroke color
// You can call it like this: rect(0,0,100,200)
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
  shape.setName("Rectangle");
  var border = shape.style().borders().addNewStylePart();
  border.color = MSColor.colorWithSVGString(strokeColor);
  border.thickness = strokeThikness;

  artboard.addLayers([shape]);
}

// A four sided polygon. With corners in (x1, y1), (x2, y2), (x3, y3), (x4, y4)
// It has both a fill and a stroke color
// You can call it like this: quad(0,0,100,200,400,400,200,90,20)
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
  shape.setName("Rectangle");
  var border = shape.style().borders().addNewStylePart();
  border.color = MSColor.colorWithSVGString(strokeColor);
  border.thickness = strokeThikness;

  artboard.addLayers([shape]);
}

// A three sided polygon. With corners in (x1, y1), (x2, y2), (x3, y3)
// It has both a fill and a stroke color
// You can call it like this: triangle(0,0,100,200,400,400,200)
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
  shape.setName("triangle");
  var border = shape.style().borders().addNewStylePart();
  border.color = MSColor.colorWithSVGString(strokeColor);
  border.thickness = strokeThikness;

  artboard.addLayers([shape]);
}

// An ellipse centered in (a, b) and with a width of c and an height of d
// It has both a fill and a stroke color
// You can call it like this: ellipse(250,250,500,100)
function ellipse(a, b, c, d) {
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

// An arc with the center in (a, b) a width of c and an height of d
// Start and stop are starting point and ending point of the angle misured in radians
// You can use degreesToRadians(degrees) to convert from degrees to radians
// It has both a fill and a stroke color
// You can call it like this: arc(250,250,500,100,0,PI)
function arc(a,b,c,d,start,stop) {
  var center = NSMakePoint(a, b)
  rect = NSMakeRect(a-c/2, b-d/2, c, d)
  var rad;
  if (c > d) {rad = c} else {rad = d}

  clipPath = [NSBezierPath bezierPath]
  [clipPath moveToPoint:center]
  [clipPath appendBezierPathWithArcWithCenter:center radius:rad+1.0 startAngle:radiansToDegrees(start) endAngle:radiansToDegrees(stop)]
  [clipPath closePath]

  path = [NSBezierPath bezierPath]
  [path appendBezierPathWithOvalInRect:rect]
  [path closePath]

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  var fill = shape.style().fills().addNewStylePart();
  fill.color = MSColor.colorWithSVGString(fillColor);
  shape.setName("Arc");
  var border = shape.style().borders().addNewStylePart();
  border.color = MSColor.colorWithSVGString(strokeColor);
  border.thickness = strokeThikness;

  var mask = MSShapeGroup.shapeWithBezierPath(clipPath);
  var fill = mask.style().fills().addNewStylePart();
  fill.color = MSColor.colorWithSVGString(fillColor);
  mask.setName("Arc");

  artboard.addLayers([shape])
  artboard.addLayers([mask])
  mask.select_byExpandingSelection(true, true)
  shape.select_byExpandingSelection(true, true)

  var intersectAction = doc.actionsController().actionWithName("MSIntersectAction");
  if (intersectAction.validate()) {
      intersectAction.booleanIntersect(nil)
  }
  doc.currentPage().deselectAllLayers()
}

// A text block with str as content, placred in (x, y) and with optional values
// of (x2, y2) to set the size of the bounding box. If x2 and y2 are not set
// the bounding box will wrap around the text
// You can call it like this: text("Hello world",10,10,100,200)
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

  if (x2 == undefined || y2 == undefined || x2 == null || y2 == null) {
    resizeLayerToFitText(textLayer);
  } else {
    textLayer.frame().setWidth(x2);
    textLayer.frame().setHeight(y2);
  }

  return textLayer;
};

function bezier(x1,y1,x2,y2,x3,y3,x4,y4) {
  var path = NSBezierPath.bezierPath();
  [path moveToPoint:NSMakePoint(x1, y1)]
  [path curveToPoint:NSMakePoint(x4, y4)
        controlPoint1:NSMakePoint(x2, y2)
        controlPoint2:NSMakePoint(x3, y3)]

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Bezier");
  var border = shape.style().borders().addNewStylePart();
  border.color = MSColor.colorWithSVGString(strokeColor);
  border.thickness = strokeThikness;
  var fill = shape.style().fills().addNewStylePart();
  fill.color = MSColor.colorWithSVGString(fillColor);

  artboard.addLayers([shape]);
}

function textSize(size) {
  textSize = size;
};

function textFont(textFont) {
  font = textFont;
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
  strokeThikness = 0; //not the best solution but it works
};

function background(color) {
  artboard.setBackgroundColor(MSColor.colorWithSVGString(color));
};

var onRun = function(context) {
  ctx = context;
  doc = context.document;
  selection = context.selection;
  page = [doc currentPage];
  view = [doc currentView];
  artboards = [[doc currentPage] artboards];

  setup();
  draw();
};
