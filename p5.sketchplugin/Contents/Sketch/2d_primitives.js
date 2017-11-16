/*----------------
DRAWING FUNCTIONS
----------------*/

// A simple point. Here it’s drawn as a 1x1 pixels rectangl.
// It does have a fill color, it doesn’t have a stroke color
// You can call it like this: point(100,100)
function point(x, y) {
  if (drawingContext.hasTranslate()) {
    x = x+drawingContext.translateX();
    y = y+drawingContext.translateY();
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x, y));
  path.lineToPoint(NSMakePoint(x, y));
  path.lineToPoint(NSMakePoint(x + 1, y));
  path.lineToPoint(NSMakePoint(x + 1, y + 1));
  path.lineToPoint(NSMakePoint(x, y + 1));
  path.lineToPoint(NSMakePoint(x, y));
  path.closePath();

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Point");

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = drawingContext.strokeEnding();
  borderOptions.lineJoinStyle = drawingContext.strokeJoining();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
}
// A simple line from x1, y1 to x2, y2. It sadly doesn’t behave like the Sketch
// line but as a path. I.E.: you cannot edit it as a line.
// It doesn’t have a fill color, it has a stroke color
// You can call it like this: line(0,0,100,100)
function line(x1, y1, x2, y2) {
  if (drawingContext.hasTranslate()) {
    x1 = x1+drawingContext.translateX();
    y1 = y1+drawingContext.translateY();
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x2, y2));

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Line");

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = drawingContext.strokeEnding();
  borderOptions.lineJoinStyle = drawingContext.strokeJoining();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
}

//Shapes functions
var newShape = null;
var firstPoint = true;
var CLOSE = "CLOSE";

function beginShape() {
  newShape = NSBezierPath.bezierPath();
}

function vertex(x1, y1) {
  if (drawingContext.hasTranslate()) {
    x1 = x1+drawingContext.translateX();
    y1 = y1+drawingContext.translateY();
  }

  //move to point only if it’s the first point of the shape
  if (firstPoint == true) {
  newShape.moveToPoint(NSMakePoint(x1, y1));
  }
  newShape.lineToPoint(NSMakePoint(x1, y1));
  firstPoint = false;
}

function bezierVertex(x2,y2,x3,y3,x4,y4) {
  if (drawingContext.hasTranslate()) {
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
    x3 = x3+drawingContext.translateX();
    y3 = y3+drawingContext.translateY();
    x4 = x4+drawingContext.translateX();
    y4 = y4+drawingContext.translateY();
  }
  [newShape curveToPoint:NSMakePoint(x4, y4)
        controlPoint1:NSMakePoint(x2, y2)
        controlPoint2:NSMakePoint(x3, y3)]
}

function endShape(mode) {
  if (mode == "CLOSE") {
  newShape.closePath();
  }

  var shape = MSShapeGroup.shapeWithBezierPath(newShape);
  shape.setName("Shape");

  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = drawingContext.strokeEnding();
  borderOptions.lineJoinStyle = drawingContext.strokeJoining();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
  firstPoint = true; //reset after you close the shape
  newShape = null;
}

// A rectangle that starts from x, y and has a height of h and a width of w.
// The angles are always at 90 degrees. It has both a fill and a stroke color
// You can call it like this: rect(0,0,100,200).
//NOTE: rect( is replaced with rectangle( when the code is executed to avoid conflicts with
//some Sketch native API. It caused a lot of issues
function rectangle(x, y, w, h) {
  if (drawingContext.hasTranslate()) {
    x = x+drawingContext.translateX();
    y = y+drawingContext.translateY();
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x, y));
  path.lineToPoint(NSMakePoint(x, y));
  path.lineToPoint(NSMakePoint(x + w, y));
  path.lineToPoint(NSMakePoint(x + w, y + h));
  path.lineToPoint(NSMakePoint(x, y + h));
  path.lineToPoint(NSMakePoint(x, y));
  path.closePath();

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Rectangle");

  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = drawingContext.strokeEnding();
  borderOptions.lineJoinStyle = drawingContext.strokeJoining();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
}

// A four sided polygon. With corners in (x1, y1), (x2, y2), (x3, y3), (x4, y4)
// It has both a fill and a stroke color
// You can call it like this: quad(0,0,100,200,400,400,200,90,20)
function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
  if (drawingContext.hasTranslate()) {
    x1 = x1+drawingContext.translateX();
    y1 = y1+drawingContext.translateY();
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
    x3 = x3+drawingContext.translateX();
    y3 = y3+drawingContext.translateY();
    x4 = x4+drawingContext.translateX();
    y4 = y4+drawingContext.translateY();
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x2, y2));
  path.lineToPoint(NSMakePoint(x3, y3));
  path.lineToPoint(NSMakePoint(x4, y4));
  path.lineToPoint(NSMakePoint(x1, y1));
  path.closePath();

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Quad");

  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
}

// A three sided polygon. With corners in (x1, y1), (x2, y2), (x3, y3)
// It has both a fill and a stroke color
// You can call it like this: triangle(0,0,100,200,400,400,200)
function triangle(x1, y1, x2, y2, x3, y3) {
  if (drawingContext.hasTranslate()) {
    x1 = x1+drawingContext.translateX();
    y1 = y1+drawingContext.translateY();
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
    x3 = x3+drawingContext.translateX();
    y3 = y3+drawingContext.translateY();
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x2, y2));
  path.lineToPoint(NSMakePoint(x3, y3));
  path.lineToPoint(NSMakePoint(x1, y1));
  path.closePath();

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  shape.setName("triangle");

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
}

// An ellipse centered in (a, b) and with a width of c and an height of d
// It has both a fill and a stroke color
// You can call it like this: ellipse(250,250,500,100)
function ellipse(a, b, c, d) {
  if (drawingContext.hasTranslate()) {
    a = a+drawingContext.translateX();
    b = b+drawingContext.translateY();
  }
  centerX = a - c / 2;
  centerY = b - d / 2;
  var ovalShape = MSOvalShape.alloc().init();
  ovalShape.frame = MSRect.rectWithRect(NSMakeRect(centerX, centerY, c, d));

  var shapeGroup = MSShapeGroup.shapeWithPath(ovalShape);
  shapeGroup.setName("Oval");
  if (drawingContext.hasFill() == true) {
  var fill = shapeGroup.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  if (drawingContext.hasStroke() == true) {
  var border = shapeGroup.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  }

  shapeGroup.setRotation(drawingContext.rotation());

  artboard.addLayers([shapeGroup]);
}

// An arc with the center in (a, b) a width of c and an height of d
// Start and stop are starting point and ending point of the angle misured in radians
// You can use radians(degrees) to convert from degrees to radians
// It has both a fill and a stroke color
// You can call it like this: arc(250,250,500,100,0,PI)
function arc(a,b,c,d,start,stop) {
  doc.currentPage().changeSelectionBySelectingLayers(nil);

  if (drawingContext.hasTranslate()) {
    a = a+drawingContext.translateX();
    b = b+drawingContext.translateY();
  }
  var center = NSMakePoint(a, b)
  rect = NSMakeRect(a-c/2, b-d/2, c, d)
  var rad;
  if (c > d) {rad = c} else {rad = d}

  clipPath = [NSBezierPath bezierPath]
  [clipPath moveToPoint:center]
  [clipPath appendBezierPathWithArcWithCenter:center radius:rad+1.0 startAngle:degrees(start) endAngle:degrees(stop)]
  [clipPath closePath]

  path = [NSBezierPath bezierPath]
  [path appendBezierPathWithOvalInRect:rect]
  [path closePath]

  var shape = MSShapeGroup.shapeWithBezierPath(path);

  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  shape.setName("Arc");

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = drawingContext.strokeEnding();
  borderOptions.lineJoinStyle = drawingContext.strokeJoining();
  }

  var mask = MSShapeGroup.shapeWithBezierPath(clipPath);
  if (drawingContext.hasFill() == true) {
  var fill = mask.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }
  mask.setName("Arc");

  mask.setRotation(drawingContext.rotation());
  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape])
  artboard.addLayers([mask])
  mask.select_byExtendingSelection(true, true);
  shape.select_byExtendingSelection(true, true);

  var intersectAction = doc.actionsController().actionForID("MSIntersectAction");
  if (intersectAction.validate()) {
      intersectAction.booleanIntersect(nil)
  }
  doc.currentPage().changeSelectionBySelectingLayers(nil);
}

// A text block with str as content, placred in (x, y) and with optional values
// of (x2, y2) to set the size of the bounding box. If x2 and y2 are not set
// the bounding box will wrap around the text
// You can call it like this: text("Hello world",10,10,100,200)
function text(str, x, y, x2, y2) {
  str = str.toString();
  if (drawingContext.hasTranslate()) {
    x = x+drawingContext.translateX();
    y = y+drawingContext.translateY();
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
  }
  //var textLayer = artboard.addLayerOfType("text");
  var textLayer = MSTextLayer.alloc().initWithFrame_(NSMakeRect(0, 0, 100, 100));
  if (drawingContext.hasFill() == true) {
    //I can't believe this is the only way to do this but at least it works
    //I’m unpacking the MSColor and rebuilding it as MSImmutableColor
    var r = drawingContext.fillColor().toString().substring(3,11)
    var g = drawingContext.fillColor().toString().substring(14,22)
    var b = drawingContext.fillColor().toString().substring(25,33)
    var a = drawingContext.fillColor().toString().substring(36,44)
  textLayer.textColor = MSImmutableColor.colorWithRed_green_blue_alpha(r,g,b,a);
  }

  if (drawingContext.hasStroke() == true) {
  var border = textLayer.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = textLayer.style().borderOptions();
  }

  textLayer.fontSize = drawingContext.size();
  textLayer.setFontPostscriptName(drawingContext.font().toString());
  textLayer.setName(str);
  textLayer.setNameIsFixed(true);
  textLayer.setStringValue(str);
  textLayer.setTextAlignment(drawingContext.alignment());
  textLayer.setLineHeight(drawingContext.lineHeight());
  textLayer.frame().setX(Number(x));
  textLayer.frame().setY(Number(y));

  if (x2 == undefined || y2 == undefined || x2 == null || y2 == null) {
    resizeLayerToFitText(textLayer);
  } else {
    //this doesn't work
    textLayer.setTextBehaviour(1);
    textLayer.frame().setWidth(x2);
    textLayer.frame().setHeight(y2);
  }

  textLayer.setRotation(drawingContext.rotation());

  //return textLayer;
  artboard.addLayers_([textLayer]);
};

function bezier(x1,y1,x2,y2,x3,y3,x4,y4) {
  if (drawingContext.hasTranslate()) {
    x1 = x1+drawingContext.translateX();
    y1 = y1+drawingContext.translateY();
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
    x3 = x3+drawingContext.translateX();
    y3 = y3+drawingContext.translateY();
    x4 = x4+drawingContext.translateX();
    y4 = y4+drawingContext.translateY();
  }
  var path = NSBezierPath.bezierPath();
  [path moveToPoint:NSMakePoint(x1, y1)]
  [path curveToPoint:NSMakePoint(x4, y4)
        controlPoint1:NSMakePoint(x2, y2)
        controlPoint2:NSMakePoint(x3, y3)]

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Bezier");

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = drawingContext.strokeEnding();
  borderOptions.lineJoinStyle = drawingContext.strokeJoining();
  }

  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  shape.setRotation(drawingContext.rotation());

  artboard.addLayers([shape]);
}

function symbol(name,x,y) {
  var symbol = findSymbolByName(name)
  symbolRect = symbol.frame();
  symbolRect.setX(x);
  symbolRect.setY(y);
  artboard.addLayers([symbol]);
}

function image(name, x, y) {
  symbol(name,x,y);
}
