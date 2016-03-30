var runFromFile = false; //can be removed?

//grabs the code from panel and saves it to file for execution
function saveCode(code) {
    var string = [NSString stringWithFormat: "%@", code],
      filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";

    [string writeToFile: filePath atomically: true
      encoding: NSUTF8StringEncoding error: nil];
}

function readCode() {
  filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";
  var file = [NSData dataWithContentsOfFile:filePath];
  var codeString = [[NSString alloc] initWithData:file encoding:NSUTF8StringEncoding];
  return codeString;
}

//get javascript array from NSArray
function jsArray(array) {
  var length = [array count];
  var jsArray = [];

  while(length--) {
  	jsArray.push([array objectAtIndex: length]);
  }
  return jsArray;
}

//find artboard with name
function getArtboardWithName(name) {
	var artboards = jsArray([doc artboards]);
	for(var i = 0; i < artboards.length; i++) {
	  	var artboard = artboards[i];
	  	//if page matches name
	  	if([artboard name] == name) {
	  		return artboard;
	  	}
	}
	return;
}

//find layer based on layer name and artboard name
function getLayerWithName(layerName, artboardName) {
  var all_layers = getArtboardWithName(artboardName).layers();
    for (x = 0; x < [all_layers count]; x++) {
      if (all_layers.objectAtIndex(x).name() == layerName) {
        return all_layers.objectAtIndex(x);
    }
  }
}

  //filter array using predicate
function predicate(format, array) {

	//make sure that format is speficied
	if(!format || !format.key  || !format.match) return;

	//create predicate
	var predicate = NSPredicate.predicateWithFormat(format.key, format.match);

	//perform query
	var queryResult = array.filteredArrayUsingPredicate(predicate);

	//return result
	return queryResult;
}

function deleteLayer(layer){
	var parent = [layer parentGroup];
	if(parent) [parent removeLayer: layer];
}


function deleteAllLayers(artboardName) {
    var all_layers = getArtboardWithName(artboardName).layers()
    while ([all_layers count] > 0) {
      var i = 0;
      var layer = all_layers.objectAtIndex(i);
      deleteLayer(layer);
      i = i+1;
    }
}

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

  var PERLIN_YWRAPB = 4;
  var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
  var PERLIN_ZWRAPB = 8;
  var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
  var PERLIN_SIZE = 4095;

  var perlin_octaves = 4; // default to medium smooth
  var perlin_amp_falloff = 0.5; // 50% reduction/octave

  var scaled_cosine = function(i) {
    return 0.5*(1.0-Math.cos(i*Math.PI));
  };

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

function resizeLayerToFitText(layer) {
	[layer adjustFrameToFit];
    [layer select:true byExpandingSelection:false];
    [layer setIsEditingText:true];
    [layer setIsEditingText:false];
    [layer select:false byExpandingSelection:false];
}

function resizeSketchjs(){
  var sketchjs = getLayerWithName("sketch.js", "p5code");
    sketchjs.frame().setWidth(450);
    sketchjs.setTextBehaviour(1);
    var h = sketchjs.frame().height();
  var p5code = getArtboardWithName("p5code");
    var r = p5code.rect();
    r.size.height = h+100;
    r.size.width = 500;
    p5code.setRect(r);
}

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

//Panel
function createPluginPanel(){
  var rect = NSMakeRect(0,0,500,300);
  var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0,0,500,300));
  var scrollView = NSScrollView.alloc().initWithFrame(rect);
  scrollView.setHasVerticalScroller(true);
  var code = NSTextView.alloc().initWithFrame(rect);

  filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";
  var file = [NSData dataWithContentsOfFile:filePath];
  var codeString = [[NSString alloc] initWithData:file encoding:NSUTF8StringEncoding];
  //let’s be sure that there’s something in the code editor
  if (!codeString || codeString == null || codeString == undefined || codeString == nil) {
    codeString = "function setup() {\n	createCanvas(500, 500)\n};\n\nfunction draw() {\n	line(0, 0, 100, 100);\n}"
  }

  [code setFont:[NSFont fontWithName:@"Monaco" size:13]];
  code.backgroundColor = [NSColor colorWithCalibratedRed:0.8 green:0.8 blue:0.8 alpha:1]
  code.setString(codeString);
  code.setEditable(true);
  code.setSelectable(true);
  scrollView.setDocumentView(code);
  accessoryView.addSubview(scrollView);

  //  force rename checkbox
  var alert = NSAlert.alloc().init();
  // var icon = NSImage.alloc().initByReferencingFile(bundlePath() + '/Contents/Resources/proof-copy.icns');

  //alert.setIcon(icon);
  alert.setMessageText(pluginName);
  alert.informativeText = 'Write some p5.js code';

  alert.addButtonWithTitle('Run');
  alert.addButtonWithTitle('Cancel');
  alert.setAccessoryView(accessoryView);

  var responseCode = alert.runModal();
  var string = code.string().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

  return {
    responseCode: responseCode,
    data: string
  };
}
