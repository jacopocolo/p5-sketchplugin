@import "MochaJSDelegate.js";
@import 'utils.js'
@import 'notsupported.js'

var ctx, doc, selection, page, view, artboards;

function exposeContext(context) {
  ctx = context;
  doc = context.document;
  selection = context.selection;
  page = [doc currentPage];
  view = [doc currentView];
  artboards = [[doc currentPage] artboards];
}

var artboard; //p5Canvas

//values of drawingContext are: size [0], font [1], fillColor [2], hasFill [3], strokeColor [3], hasStroke [4], strokeThikness [5], strokeEnding [6]
//var drawingContext = [[14, "Helvetica", MSImmutableColor.colorWithSVGString("#D8D8D8"), true, MSImmutableColor.colorWithSVGString("#979797"), true, 1, 0]]
// function returnLatest(array) {
//   return array[array.length-1];
// };

//the drawingContext contains all the information regarding the current style and context of the sketch.
var drawingContext = {
  //artboardSize: [[200, 200]],
  //artboardHasBackgroundColor: [false],
  //artboardBackgroundColor: [],
  hasTranslates: [false],
  hasTranslate: function() {return this.hasTranslates[this.hasTranslates.length-1]},
  translates: [[0,0]],
  translateX: function() {return this.translates[this.translates.length-1][0]},
  translateY: function() {return this.translates[this.translates.length-1][1]},
  // rotations: [0],
  // rotate: function() {return this.rotations[this.rotations.length-1]},
  sizes: ['14'],
  size: function() {return this.sizes[this.sizes.length-1]},
  fonts: ['Helvetica'],
  font: function() {return this.fonts[this.fonts.length-1]},
  fillColors: [MSImmutableColor.colorWithSVGString("#FFFFFF")],
  fillColor: function() {return this.fillColors[this.fillColors.length-1]},
  hasFills: [true],
  hasFill: function() {return this.hasFills[this.hasFills.length-1]},
  strokeColors: [MSImmutableColor.colorWithSVGString("#000000")],
  strokeColor: function() {return this.strokeColors[this.strokeColors.length-1]},
  hasStrokes: [true],
  hasStroke: function() {return this.hasStrokes[this.hasStrokes.length-1];},
  strokeThiknesses: [1],
  strokeThikness: function() {return this.strokeThiknesses[this.strokeThiknesses.length-1]},
  strokeEndings: [0],
  strokeEnding: function() {return this.strokeEndings[this.strokeEndings.length-1]},
  // seeded: false,
  // seed: [0],
  reset: function () {
    this.hasTranslates = [false];
    this.translates = [[0,0]];
    this.sizes = ['14'];
    this.fonts = ['Helvetica'];
    this.fillColors = [MSImmutableColor.colorWithSVGString("#FFFFFF")];
    this.hasFills = [true];
    this.strokeColors = [MSImmutableColor.colorWithSVGString("#000000")];
    this.hasStrokes = [true];
    this.strokeThiknesses = [1];
    this.strokeEndings = [0];
  }
};

var padding = 50; //distance from p5canvas to the first artboard
var width;
var height;
var size = drawingContext.size();
var font = drawingContext.font();
var fillColor = drawingContext.fillColor();
var hasFill = drawingContext.hasFill();
var strokeColor = drawingContext.strokeColor();
var hasStroke = drawingContext.hasStroke();
var strokeThikness = drawingContext.strokeThikness();
var strokeEnding = drawingContext.strokeEnding();
var strokeJoining; //default
var seeded;
var rotationValue = 0;
var hasTranslate = drawingContext.hasTranslate();
var deltaX = 0; //default translate
var deltaY = 0; //default translate

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
function createCanvas(w, h) {
  width = w;
  height = h;

  var p5canvas = getArtboardWithName("p5canvas");

  if (!p5canvas) {
    artboard = MSArtboardGroup.new()
    frame = artboard.frame()
    if (artboards == nil || [artboards count] == 0) {
      frame.x = 0
      frame.y = 0
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
      frame.x = minX - w - padding
      frame.y = minY
    }
    frame.setWidth(w)
    frame.setHeight(h)
    artboard.setName("p5canvas")
    artboard.setHasBackgroundColor(false);
    doc.currentPage().addLayers([artboard])
    //setUpP5Code()
  } else {
    deleteAllLayers("p5canvas");
    artboard = p5canvas;
    frame = artboard.frame()
    frame.setWidth(w)
    frame.setHeight(h)
    artboard.setHasBackgroundColor(false);
    //setUpP5Code()
  }
}

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
    log("ok");
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
  borderOptions.lineCapStyle = strokeEnding;
  }

  shape.setRotation(rotationValue);

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
  //path.setLineCapStyle(NSRoundLineCapStyle)

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Line");

  if (drawingContext.hasStroke() == true) {
  var border = shape.style().addStylePartOfType(1);
  border.color = drawingContext.strokeColor();
  border.thickness = drawingContext.strokeThikness();
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = strokeEnding;
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
}

//Shapes functions
var newShape;
var firstPoint = true;
var CLOSE = "CLOSE"

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
    x4 = x3+drawingContext.translateX();
    y4 = y3+drawingContext.translateY();
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
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
  firstPoint = true; //reset after you close the shape
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
  borderOptions.lineCapStyle = strokeEnding;
  }

  shape.setRotation(rotationValue);

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

  shape.setRotation(rotationValue);

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

  shape.setRotation(rotationValue);

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

  shapeGroup.setRotation(rotationValue);

  artboard.addLayers([shapeGroup]);
}

// An arc with the center in (a, b) a width of c and an height of d
// Start and stop are starting point and ending point of the angle misured in radians
// You can use radians(degrees) to convert from degrees to radians
// It has both a fill and a stroke color
// You can call it like this: arc(250,250,500,100,0,PI)
function arc(a,b,c,d,start,stop) {
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
  borderOptions.lineCapStyle = strokeEnding;
  }

  var mask = MSShapeGroup.shapeWithBezierPath(clipPath);
  if (drawingContext.hasFill() == true) {
  var fill = mask.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }
  mask.setName("Arc");

  mask.setRotation(rotationValue);
  shape.setRotation(rotationValue);

  artboard.addLayers([shape])
  artboard.addLayers([mask])
  mask.select_byExpandingSelection(true, true)
  shape.select_byExpandingSelection(true, true)

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
  if (drawingContext.hasTranslate()) {
    x = x+drawingContext.translateX();
    y = y+drawingContext.translateY();
    x2 = x2+drawingContext.translateX();
    y2 = y2+drawingContext.translateY();
  }
  //var textLayer = artboard.addLayerOfType("text");
  var textLayer = MSTextLayer.alloc().initWithFrame_(NSMakeRect(0, 0, 100, 100));
  if (drawingContext.hasFill() == true) {
  textLayer.textColor = drawingContext.fillColor();
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

  textLayer.setRotation(rotationValue);

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
  borderOptions.lineCapStyle = strokeEnding;
  }

  if (drawingContext.hasFill() == true) {
  var fill = shape.style().addStylePartOfType(0);
  fill.color = drawingContext.fillColor();
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
}

/*----------------
SET FUNCTIONS
In set functions we overwrite the latest item in the drawingContext arrays
----------------*/

function textSize(fontSize) {
  drawingContext.sizes[drawingContext.sizes.length-1] = fontSize;
};

function textFont(textFont) {
  drawingContext.fonts[drawingContext.fonts.length-1] = textFont;
};

// function fill(color) {
//   drawingContext.hasFill = color;
// };

function fill(r, g, b, a) {
    if (a == undefined) {
      if (g == undefined && b == undefined) {
        if (r[0] == "#") {
            drawingContext.fillColors[drawingContext.fillColors.length-1] = MSImmutableColor.colorWithSVGString(r); //it’s an hex color
            return
        } else {
        r = r/255;
        drawingContext.fillColors[drawingContext.fillColors.length-1] = MSColor.colorWithRed_green_blue_alpha(r,r,r,1) //It’s a gray
        return
        }
      }
      else {
      r = r/255;
      g = g/255;
      b = b/255;
      drawingContext.fillColors[drawingContext.fillColors.length-1] = MSColor.colorWithRed_green_blue_alpha(r,g,b,1) //it’s a RGB color
      return
      }
    }
    else {
      r = r/255;
      g = g/255;
      b = b/255;
      a = a/255;
      drawingContext.fillColors[drawingContext.fillColors.length-1] = MSColor.colorWithRed_green_blue_alpha(r,g,b,a) //it’s a RGBA color
      return
    }
  };

  function stroke(r, g, b, a) {
      if (a == undefined) {
        if (g == undefined && b == undefined) {
          if (r[0] == "#") {
              drawingContext.strokeColors[drawingContext.strokeColors.length-1] = MSImmutableColor.colorWithSVGString(r); //it’s an hex color
              return
          } else {
          r = r/255;
          drawingContext.strokeColors[drawingContext.strokeColors.length-1] = MSColor.colorWithRed_green_blue_alpha(r,r,r,1) //It’s a gray
          return
          }
        }
        else {
        r = r/255;
        g = g/255;
        b = b/255;
        drawingContext.strokeColors[drawingContext.strokeColors.length-1] = MSColor.colorWithRed_green_blue_alpha(r,g,b,1) //it’s a RGB color
        return
        }
      }
      else {
        r = r/255;
        g = g/255;
        b = b/255;
        a = a/255;
        drawingContext.strokeColors[drawingContext.strokeColors.length-1] = MSColor.colorWithRed_green_blue_alpha(r,g,b,a) //it’s a RGBA color
        return
      }
    };

function strokeWeight(weight) {
  drawingContext.strokeThiknesses[drawingContext.strokeThiknesses.length-1] = weight;
};

//Caps and joins values. Only valid in uppercase
var SQUARE = 0;
var MITER = 0;
var ROUND = 1;
var PROJECT = 2;
var BEVEL = 2;

function strokeCap(cap) {
  drawingContext.strokeEndings[drawingContext.strokeEndings-1] = cap;
};

function strokeJoint(join) {
  strokeJoining = join;
};

function noStroke() {
  drawingContext.hasStrokes[drawingContext.hasStrokes.length-1] = false;
};

function noFill() {
  drawingContext.hasFills[drawingContext.hasFills.length-1] = false;
};

function background(r, g, b, a) {
  artboard.setHasBackgroundColor(true);
  var backgroundColor = MSImmutableColor.colorWithSVGString("#ffffff");

  if (a == undefined) {
    if (g == undefined && b == undefined) {
      if (r[0] == "#") {
          backgroundColor = MSImmutableColor.colorWithSVGString(r); //it’s an hex color
      } else {
      r = r/255;
      backgroundColor = MSColor.colorWithRed_green_blue_alpha(r,r,r,1) //It’s a gray
      }
    }
    else {
    r = r/255;
    g = g/255;
    b = b/255;
    backgroundColor = MSColor.colorWithRed_green_blue_alpha(r,g,b,1) //it’s a RGB color
    }
  }
  else {
    r = r/255;
    g = g/255;
    b = b/255;
    backgroundColor = MSColor.colorWithRed_green_blue_alpha(r,g,b,a) //it’s a RGBA color
  }

  if (artboard != undefined) {artboard.setBackgroundColor(backgroundColor);}
};

function rotate(rad) {
    rotationValue = rotationValue+degrees(rad);
    rotationValue = -rotationValue;
  }

function translate(x, y) {
  drawingContext.hasTranslates[drawingContext.hasTranslates.length-1] = true;
  drawingContext.translates[drawingContext.translates.length-1][0] += x;
  drawingContext.translates[drawingContext.translates.length-1][1] += y;
}

/*----------------
PUSH AND POP FUNCTIONS
----------------*/
//A note: I’m sure there's a better way than manually pushing and popping. I haven't found it yet.

//Push sould go through all the arrays in drawingContext and duplicating them.
//The drawingContext methods always refer to the latest elements in the arrays
function push() {
  drawingContext.hasTranslates.push(drawingContext.hasTranslates[drawingContext.hasTranslates.length-1]);
  drawingContext.translates.push([drawingContext.translates[drawingContext.translates.length-1][0],drawingContext.translates[drawingContext.translates.length-1][1]]);
  drawingContext.sizes.push(drawingContext.sizes[drawingContext.sizes.length-1]);
  drawingContext.fonts.push(drawingContext.fonts[drawingContext.fonts.length-1]);
  drawingContext.fillColors.push(drawingContext.fillColors[drawingContext.fillColors.length-1]);
  drawingContext.hasFills.push(drawingContext.hasFills[drawingContext.hasFills.length-1]);
  drawingContext.strokeColors.push(drawingContext.strokeColors[drawingContext.strokeColors.length-1]);
  drawingContext.hasStrokes.push(drawingContext.hasStrokes[drawingContext.hasStrokes.length-1]);
  drawingContext.strokeThiknesses.push(drawingContext.strokeThiknesses[drawingContext.strokeThiknesses.length-1]);
  drawingContext.strokeEndings.push(drawingContext.strokeEndings[drawingContext.strokeEndings.length-1]);
}
//Pop sould go through all the arrays in drawingContext and deletes the latest element in them.
function pop() {
  //we only pop if we have things to pop. You should not be allowed to pop the default values
  if (drawingContext.sizes.length>1) {
  drawingContext.hasTranslates.pop();
  drawingContext.translates.pop();
  drawingContext.sizes.pop();
  drawingContext.fonts.pop();
  drawingContext.fillColors.pop();
  drawingContext.hasFills.pop();
  drawingContext.strokeColors.pop();
  drawingContext.hasStrokes.pop();
  drawingContext.strokeThiknesses.pop();
  drawingContext.strokeEndings.pop();
  }
}

/*----------------
RANDOM FUNCTIONS
----------------*/

var seeded = false;

function random(min, max) {
      var rand;
      if (seeded) {
        rand = lcg.rand();
      } else {
        rand = Math.random();
      }
      if (arguments.length === 0) {
        return rand;
      } else if (arguments.length === 1) {
        return rand * min;
      } else {
        if (min > max) {
          var tmp = min;
          min = max;
          max = tmp;
        }
        return rand * (max - min) + min;
      }
};

var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

var perlin_octaves = 4; // default to medium smooth
var perlin_amp_falloff = 0.5; // 50% reduction/octave

var perlin; // will be initialized lazily by noise() or noiseSeed()

function noise(x,y,z) {
      y = y || 0;
      z = z || 0;

      if (perlin == null) {
        perlin = new Array(PERLIN_SIZE + 1);
        for (var i = 0; i < PERLIN_SIZE + 1; i++) {
          perlin[i] = Math.random();
        }
      }

      if (x<0) { x=-x; }
      if (y<0) { y=-y; }
      if (z<0) { z=-z; }

      var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
      var xf = x - xi;
      var yf = y - yi;
      var zf = z - zi;
      var rxf, ryf;

      var r=0;
      var ampl=0.5;

      var n1,n2,n3;

      for (var o=0; o<perlin_octaves; o++) {
        var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);

        rxf = scaled_cosine(xf);
        ryf = scaled_cosine(yf);

        n1  = perlin[of&PERLIN_SIZE];
        n1 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n1);
        n2  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
        n2 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
        n1 += ryf*(n2-n1);

        of += PERLIN_ZWRAP;
        n2  = perlin[of&PERLIN_SIZE];
        n2 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n2);
        n3  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
        n3 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
        n2 += ryf*(n3-n2);

        n1 += scaled_cosine(zf)*(n2-n1);

        r += n1*ampl;
        ampl *= perlin_amp_falloff;
        xi<<=1;
        xf*=2;
        yi<<=1;
        yf*=2;
        zi<<=1;
        zf*=2;

        if (xf>=1.0) { xi++; xf--; }
        if (yf>=1.0) { yi++; yf--; }
        if (zf>=1.0) { zi++; zf--; }
      }
      return r;
    };

var seed;

function noiseSeed(seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  var lcg = (function() {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296,
    // a - 1 should be divisible by m's prime factors
    a = 1664525,
     // c and m should be co-prime
    c = 1013904223,
    seed, z;
    return {
      setSeed : function(val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        z = seed = (val == null ? Math.random() * m : val) >>> 0;
      },
      getSeed : function() {
        return seed;
      },
      rand : function() {
        // define the recurrence relationship
        z = (a * z + c) % m;
        // return a float in [0, 1)
        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
        return z / m;
      }
    };
  }())
};

/*----------------
MATH FUNCTIONS
----------------*/

function degrees(rad) {
      return rad*(180/PI);
    }

function radians(deg) {
      return deg * Math.PI/180;
    }

function cos(angle) {
      return Math.cos(angle)
};

function sin(angle) {
   return Math.sin(angle);
};

function tan(angle) {
    return Math.tan(angle);
};

function abs(n) {return Math.abs(n)};

function ceil(n) {return Math.ceil(n)};

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
};

function dist(x1, y1, x2, y2) {
  return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
};

function exp(n) {return Math.exp(n)};

function floor(n) {return Math.floor(n)};

function lerp(start, stop, amt) {
  return amt*(stop-start)+start;
};

//uncomment on release. It overwrites Sketch log()
//function log(n) {return Math.log(n)};

function mag(x, y) {
  return Math.sqrt(x*x+y*y);
};

function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  };

function max(n) {
  if (arguments[0] instanceof Array) {
    return Math.max.apply(null,arguments[0]);
  } else {
    return Math.max.apply(null,arguments);
  }
};

function min(n) {
  if (arguments[0] instanceof Array) {
    return Math.min.apply(null,arguments[0]);
  } else {
    return Math.min.apply(null,arguments);
  }
};

function norm(n, start, stop) {
  return this.map(n, start, stop, 0, 1);
};

function pow(n) {return Math.pow(n)};

function round(n) {return Math.round(n)};

function sq(n) {return n*n};

function sqrt(n) {return Math.sqrt(n)};

var scaled_cosine = function(i) {
  return 0.5*(1.0-Math.cos(i*Math.PI));
};

//STILL TESTING THESE
function nf() {
  if (arguments[0] instanceof Array) {
    var a = arguments[1];
    var b = arguments[2];
    return arguments[0].map(function (x) {
      return doNf(x, a, b);
    });
  }
  else{
    var typeOfFirst = Object.prototype.toString.call(arguments[0]);
    if(typeOfFirst === '[object Arguments]'){
      if(arguments[0].length===3){
        return this.nf(arguments[0][0],arguments[0][1],arguments[0][2]);
      }
      else if(arguments[0].length===2){
        return this.nf(arguments[0][0],arguments[0][1]);
      }
      else{
        return this.nf(arguments[0][0]);
      }
    }
    else {
      return doNf.apply(this, arguments);
    }
  }
};

function doNf() {
  var num = arguments[0];
  var neg = num < 0;
  var n = neg ? num.toString().substring(1) : num.toString();
  var decimalInd = n.indexOf('.');
  var intPart = decimalInd !== -1 ? n.substring(0, decimalInd) : n;
  var decPart = decimalInd !== -1 ? n.substring(decimalInd + 1) : '';
  var str = neg ? '-' : '';
  if (arguments.length === 3) {
    var decimal = '';
    if(decimalInd !== -1 || arguments[2] - decPart.length > 0){
      decimal = '.';
    }
    if (decPart.length > arguments[2]) {
      decPart = decPart.substring(0, arguments[2]);
    }
    for (var i = 0; i < arguments[1] - intPart.length; i++) {
      str += '0';
    }
    str += intPart;
    str += decimal;
    str += decPart;
    for (var j = 0; j < arguments[2] - decPart.length; j++) {
      str += '0';
    }
    return str;
  }
  else {
    for (var k = 0; k < Math.max(arguments[1] - intPart.length, 0); k++) {
      str += '0';
    }
    str += n;
    return str;
  }
}

/*----------------
RUNNING FUNCTIONS
----------------*/

function onRun(context) {
  exposeContext(context);

  var userDefaults = NSUserDefaults.standardUserDefaults();

	// create a window
  var title = "p5xSketchapp";
  var identifier = "com.jacopocolo.p5xsketchapp";
  var threadDictionary = NSThread.mainThread().threadDictionary();

  if (threadDictionary[identifier]) {
        return;
  }

  var windowWidth = 600,
        windowHeight = 450;
    var p5Window = NSPanel.alloc().init();
    p5Window.setFrame_display(NSMakeRect(0, 0, windowWidth, windowHeight), true);
    p5Window.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask);
    p5Window.setBackgroundColor(NSColor.whiteColor());
    p5Window.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
    p5Window.standardWindowButton(NSWindowZoomButton).setHidden(true);
    p5Window.setTitle(title);
    p5Window.setTitlebarAppearsTransparent(true);
    p5Window.becomeKeyWindow();
    p5Window.setLevel(NSFloatingWindowLevel);
    threadDictionary[identifier] = p5Window;
    COScript.currentCOScript().setShouldKeepAround_(true);

    // Add Web View to window
      var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, windowWidth, windowHeight - 24));
      var windowObject = webView.windowScriptObject();
      var delegate = new MochaJSDelegate({

          "webView:didFinishLoadForFrame:" : (function(webView, webFrame) {

              windowObject.evaluateWebScript(initCode);

              userDefaults.setObject_forKey(initCode, swatchDefaultKey);
              userDefaults.synchronize();

          }),

          "webView:didChangeLocationWithinPageForFrame:" : (function(webView, webFrame) {

              var locationHash = windowObject.evaluateWebScript("window.location.hash");
              var title = windowObject.evaluateWebScript("document.getElementById('title').innerHTML");
              var colorName = windowObject.evaluateWebScript("document.getElementById('colorName').innerHTML");

              if (locationHash) {
                  //We force an update to update what we are selecting
                  var selection = updateContext().selection;
                  //We apply the setting
                  var code = [webView stringByEvaluatingJavaScriptFromString:@"myCodeMirror.getValue();"];
                  //rect() creates some problems with native Sketch API. However…
                  //We want to allow the users to use it in the code but we swap it way with regex in execution
                  var code = code.replace(/\brect\b/g,'rectangle');
                  //log(code);
                  saveCode(code);
                  //hacky hack: I’m running the code the user wrote and calling the two functions with eval. But apparently it’s the only way to prevent Sketch from using the chached version of the file I’m saving.
                  eval(code+'; setup(); draw();');
                  drawingContext.reset();
              }

          })
      });

      webView.setFrameLoadDelegate_(delegate.getClassInstance());
      webView.setMainFrameURL_(context.plugin.urlForResourceNamed("editor.html").path());

      p5Window.contentView().addSubview(webView);
      p5Window.center();
      p5Window.makeKeyAndOrderFront(nil);

      // Close Window
      var closeButton = p5Window.standardWindowButton(NSWindowCloseButton);
      closeButton.setCOSJSTargetFunction(function(sender) {
          COScript.currentCOScript().setShouldKeepAround(false);
          threadDictionary.removeObjectForKey(identifier);
          p5Window.close();
      });
      closeButton.setAction("callAction:");
  };

  function getTitleFromHandler(handler) {
      for (var i = 0; i < swatches.length; i++) {
          if (swatches[i].handler == handler) {
              return swatches[i].title;
          }
      }
  }

  function updateContext() {
      var doc = NSDocumentController.sharedDocumentController().currentDocument();

      if (MSApplicationMetadata.metadata().appVersion > 41.2) {
          var selection = doc.selectedLayers().layers();
      } else {
          var selection = doc.selectedLayers();
      }

      return {
          document: doc,
          selection: selection
      }
};
