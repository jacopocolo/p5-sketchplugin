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

var padding = 50; //distance from p5canvas to the first artboard
var width = 600 //default
var height = 800 //default
var size = 12 //default
var font = "Helverica" //default
var fillColor = MSColor.colorWithSVGString("#D8D8D8"); //default Sketch fill #D8D8D8
var hasFill = true;
var strokeColor = MSColor.colorWithSVGString("#979797"); //default Sketch stroke #979797
var hasStroke = true;
var strokeThikness = "1"; //default
var strokeEnding; //default
var strokeJoining; //default
var seeded;
var rotationValue = 0;
var hasTraslate = null;
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
  //parseCode();

  var p5canvas = getArtboardWithName("p5canvas");
  //var p5code = getArtboardWithName("p5code");

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
      frame.x = minX - width - padding
      frame.y = minY
    }
    frame.setWidth(width)
    frame.setHeight(height)
    artboard.setName("p5canvas")
    artboard.setHasBackgroundColor(false);
    doc.currentPage().addLayers([artboard])
    //setUpP5Code()
  } else {
    deleteAllLayers("p5canvas");
    artboard = p5canvas;
    frame = artboard.frame()
    frame.setWidth(width)
    frame.setHeight(height)
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
  if (hasTraslate) {
    x = x+deltaX
    y = y+deltaY
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
  var border = shape.style().borders().addNewStylePart();

  if (hasStroke == true) {
  border.color = strokeColor;
  border.thickness = strokeThikness;
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
  if (hasTraslate) {
    x1 = x1+deltaX
    y1 = y1+deltaY
    x2 = x2+deltaX
    y2 = y2+deltaY
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x2, y2));
  //path.setLineCapStyle(NSRoundLineCapStyle)

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Line");
  var border = shape.style().borders().addNewStylePart();

  if (hasStroke == true) {
  border.color = strokeColor;
  border.thickness = strokeThikness;
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
  if (hasTraslate) {
    x1 = x1+deltaX
    y1 = y1+deltaY
  }
  //move to point only if it’s the first point of the shape
  if (firstPoint == true) {
  newShape.moveToPoint(NSMakePoint(x1, y1));
  }
  newShape.lineToPoint(NSMakePoint(x1, y1));
  firstPoint = false;
}

function bezierVertex(x2,y2,x3,y3,x4,y4) {
  if (hasTraslate) {
    x2 = x2+deltaX
    y2 = y2+deltaY
    x3 = x3+deltaX
    y3 = y3+deltaY
    x4 = x3+deltaX
    y4 = y3+deltaY
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

  if (hasFill == true) {
      var fill = shape.style().fills().addNewStylePart();
      fill.color = fillColor;
  }

  if (hasStroke == true) {
  var border = shape.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
  firstPoint = true; //reset after you close the shape
}

// A rectangle that starts from x, y and has a height of h and a width of w.
// The angles are always at 90 degrees. It has both a fill and a stroke color
// You can call it like this: rect(0,0,100,200)
function rect(x, y, w, h) {
  if (hasTraslate) {
    x = x+deltaX
    y = y+deltaY
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

  if (hasFill == true) {
    var fill = shape.style().fills().addNewStylePart();
    fill.color = fillColor;
  }

  if (hasStroke == true) {
  var border = shape.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
}

// A four sided polygon. With corners in (x1, y1), (x2, y2), (x3, y3), (x4, y4)
// It has both a fill and a stroke color
// You can call it like this: quad(0,0,100,200,400,400,200,90,20)
function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
  if (hasTraslate) {
    x1 = x1+deltaX
    y1 = y1+deltaY
    x2 = x2+deltaX
    y2 = y2+deltaY
    x3 = x3+deltaX
    y3 = y3+deltaY
    x4 = x4+deltaX
    y4 = y4+deltaY
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
  shape.setName("Rectangle");

  if (hasFill == true) {
  var fill = shape.style().fills().addNewStylePart();
  fill.color = fillColor;
  }

  if (hasStroke == true) {
  var border = shape.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
}

// A three sided polygon. With corners in (x1, y1), (x2, y2), (x3, y3)
// It has both a fill and a stroke color
// You can call it like this: triangle(0,0,100,200,400,400,200)
function triangle(x1, y1, x2, y2, x3, y3) {
  if (hasTraslate) {
    x1 = x1+deltaX
    y1 = y1+deltaY
    x2 = x2+deltaX
    y2 = y2+deltaY
    x3 = x3+deltaX
    y3 = y3+deltaY
  }
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x2, y2));
  path.lineToPoint(NSMakePoint(x3, y3));
  path.lineToPoint(NSMakePoint(x1, y1));
  path.closePath();

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  if (hasFill == true) {
  var fill = shape.style().fills().addNewStylePart();
  fill.color = fillColor;
  }

  shape.setName("triangle");

  if (hasStroke == true) {
  var border = shape.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
}

// An ellipse centered in (a, b) and with a width of c and an height of d
// It has both a fill and a stroke color
// You can call it like this: ellipse(250,250,500,100)
function ellipse(a, b, c, d) {
  if (hasTraslate) {
    a = a+deltaX
    b = b+deltaY
  }
  centerX = a - c / 2;
  centerY = b - d / 2;
  var ovalShape = MSOvalShape.alloc().init();
  ovalShape.frame = MSRect.rectWithRect(NSMakeRect(centerX, centerY, c, d));

  var shapeGroup = MSShapeGroup.shapeWithPath(ovalShape);
  shapeGroup.setName("Oval");
  if (hasFill == true) {
  var fill = shapeGroup.style().fills().addNewStylePart();
  fill.color = fillColor;
  }

  if (hasStroke == true) {
  var border = shapeGroup.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
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
  if (hasTraslate) {
    a = a+deltaX
    b = b+deltaY
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

  if (hasFill == true) {
  var fill = shape.style().fills().addNewStylePart();
  fill.color = fillColor;
  }

  shape.setName("Arc");

  if (hasStroke == true) {
  var border = shape.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = strokeEnding;
  }

  var mask = MSShapeGroup.shapeWithBezierPath(clipPath);
  if (hasFill == true) {
  var fill = mask.style().fills().addNewStylePart();
  fill.color = fillColor;
  }
  mask.setName("Arc");

  mask.setRotation(rotationValue);
  shape.setRotation(rotationValue);

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
  if (hasTraslate) {
    x = x+deltaX
    y = y+deltaY
    x2 = x2+deltaX
    y2 = y2+deltaY
  }
  var textLayer = artboard.addLayerOfType("text");
  if (hasFill == true) {
  textLayer.textColor = fillColor;
  }
  textLayer.fontSize = size;
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

  textLayer.setRotation(rotationValue);

  return textLayer;
};

function bezier(x1,y1,x2,y2,x3,y3,x4,y4) {
  if (hasTraslate) {
    x1 = x1+deltaX
    y1 = y1+deltaY
    x2 = x2+deltaX
    y2 = y2+deltaY
    x3 = x3+deltaX
    y3 = y3+deltaY
    x4 = x4+deltaX
    y4 = y4+deltaY
  }
  var path = NSBezierPath.bezierPath();
  [path moveToPoint:NSMakePoint(x1, y1)]
  [path curveToPoint:NSMakePoint(x4, y4)
        controlPoint1:NSMakePoint(x2, y2)
        controlPoint2:NSMakePoint(x3, y3)]

  var shape = MSShapeGroup.shapeWithBezierPath(path);
  shape.setName("Bezier");

  if (hasStroke == true) {
  var border = shape.style().borders().addNewStylePart();
  border.color = strokeColor;
  border.thickness = strokeThikness;
  var borderOptions = shape.style().borderOptions();
  borderOptions.lineCapStyle = strokeEnding;
  }

  if (hasFill == true) {
  var fill = shape.style().fills().addNewStylePart();
  fill.color = fillColor;
  }

  shape.setRotation(rotationValue);

  artboard.addLayers([shape]);
}

/*----------------
SET FUNCTIONS
----------------*/

function textSize(fontSize) {
  size = fontSize;
};

function textFont(textFont) {
  font = textFont;
};

function fill(color) {
  fillColor = color;
};

function fill(r, g, b, a) {
    if (a == undefined) {
      if (g == undefined && b == undefined) {
        if (r[0] == "#") {
            fillColor = MSColor.colorWithSVGString(r); //it’s an hex color
            return
        } else {
        r = r/255;
        fillColor = MSColor.colorWithRed_green_blue_alpha(r,r,r,1) //It’s a gray
        return
        }
      }
      else {
      r = r/255;
      g = g/255;
      b = b/255;
      fillColor = MSColor.colorWithRed_green_blue_alpha(r,g,b,1) //it’s a RGB color
      return
      }
    }
    else {
      r = r/255;
      g = g/255;
      b = b/255;
      fillColor = MSColor.colorWithRed_green_blue_alpha(r,g,b,a) //it’s a RGBA color
      return
    }
  };

  function stroke(r, g, b, a) {
      if (a == undefined) {
        if (g == undefined && b == undefined) {
          if (r[0] == "#") {
              strokeColor = MSColor.colorWithSVGString(r); //it’s an hex color
              return
          } else {
          r = r/255;
          strokeColor = MSColor.colorWithRed_green_blue_alpha(r,r,r,1) //It’s a gray
          return
          }
        }
        else {
        r = r/255;
        g = g/255;
        b = b/255;
        strokeColor = MSColor.colorWithRed_green_blue_alpha(r,g,b,1) //it’s a RGB color
        return
        }
      }
      else {
        r = r/255;
        g = g/255;
        b = b/255;
        strokeColor = MSColor.colorWithRed_green_blue_alpha(r,g,b,a) //it’s a RGBA color
        return
      }
    };

function strokeWeight(weight) {
  strokeThikness = weight;
};

//Caps and joins values. Only valid in uppercase
var SQUARE = 0;
var MITER = 0;
var ROUND = 1;
var PROJECT = 2;
var BEVEL = 2;

function strokeCap(cap) {
  strokeEnding = cap;
};

function strokeJoint(join) {
  strokeJoining = join;
};

function noStroke() {
  hasStroke = false;
};

function noFill() {
  hasFill = false;
};

function background(r, g, b, a) {
  artboard.setHasBackgroundColor(true);
  var backgroundColor = MSColor.colorWithSVGString("#ffffff");

  if (a == undefined) {
    if (g == undefined && b == undefined) {
      if (r[0] == "#") {
          backgroundColor = MSColor.colorWithSVGString(r); //it’s an hex color
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
  hasTraslate = true;
  deltaX += x;
  deltaY += y;
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
	var defaults = [NSUserDefaults standardUserDefaults], default_values = [NSMutableDictionary dictionary];

	// create a window
	var window = [[NSWindow alloc] init]
	var windowTitle = "P5Sketch"
	[window setTitle:windowTitle]
	[window setFrame:NSMakeRect(0, 0, 500, 420) display:false]

  var filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Resources/editor.html";

  var frame = NSMakeRect(0,60,500,340);
  var url = [NSURL fileURLWithPath:filePath];
  var webView = [[WebView alloc] initWithFrame:frame]
  [[webView mainFrame] loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:filePath]]]
  //var mask = NSTitledWindowMask + NSClosableWindowMask + NSMiniaturizableWindowMask + NSResizableWindowMask + NSUtilityWindowMask;
  [[window contentView] addSubview:webView]
  [window center]

	// create OK button
	var okButton = [[NSButton alloc] initWithFrame:NSMakeRect(0, 0, 0, 0)]
	var userClickedOK = false
	[okButton setTitle:"  Run  "]
	[okButton setBezelStyle:NSRoundedBezelStyle]
	[okButton sizeToFit]
	[okButton setFrame:NSMakeRect([window frame].size.width - [okButton frame].size.width - 20, 14, [okButton frame].size.width, [okButton frame].size.height)]
	[okButton setKeyEquivalent:"\r"] // return key
	[okButton setCOSJSTargetFunction:function(sender) {
		userClickedOK = true
		[window orderOut:nil]
		[NSApp stopModal]
	}];

	[[window contentView] addSubview:okButton]

	// create cancel button
	var cancelButton = [[NSButton alloc] initWithFrame:NSMakeRect(0, 0, 0, 0)]
	var userClickedCancel = false
	[cancelButton setTitle:"  Cancel  "]
	[cancelButton setBezelStyle:NSRoundedBezelStyle]
	[cancelButton sizeToFit]
	[cancelButton setFrame:NSMakeRect([okButton frame].origin.x - [cancelButton frame].size.width, 14, [cancelButton frame].size.width, [cancelButton frame].size.height)]
	[cancelButton setKeyEquivalent:@"\033"] // escape key
	[cancelButton setCOSJSTargetFunction:function(sender) {
		userClickedCancel = true
		[window orderOut:nil]
		[NSApp stopModal]
	}]

	[[window contentView] addSubview:cancelButton]

	// get the user input
	[NSApp runModalForWindow:window]

	if (!userClickedCancel) {
    var code = [webView stringByEvaluatingJavaScriptFromString:@"myCodeMirror.getValue();"];
    saveCode(code);
    //hacky hack: I’m running the code the user wrote and calling the two functions with eval. But apparently it’s the only way to prevent Sketch from using the chached version of the file I’m saving.
    eval(code+'; setup(); draw();');
	}

	// let the GC gather these guys (and the targets!)
	okButton = nil;
	cancelButton = nil;
	window = nil;
};

var runAgain = function(context) {
  exposeContext(context)
  code = readCode();
  eval(code+'; setup(); draw();');
};
