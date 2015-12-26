// To-do
// Implement arc()
// Fix artboard placement if there is an artboard already. It should loop, find the one most on the left and go to the left of that. Righ now it only goes to the left of the first artboard
// Implement noise()?
// Implement noFill()
// Clean artboard on run
// Fix resizeLayerToFitText

@import 'utils.js'
@import 'sketch.js'

var ctx, doc, selection, page, view, artboard, artboards;

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

var PI = Math.PI;
var HALF_PI = Math.PI / 2;
var QUARTER_PI = PI / 4;
var TAU = PI * 2;
var TWO_PI = PI * 2;

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
