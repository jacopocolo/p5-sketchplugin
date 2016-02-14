var runFromFile = false;

//parser: grabs the code from Sketch artboard and saves it to file for execution
function parseCode() {
  var p5code = getArtboardWithName("p5code");
  if (p5code) {
  var code = getLayerWithName("sketch.js", "p5code");
  var runFromLayer = getLayerWithName("runFromFile", "p5code");

  //checks if we are running from file or not
  if (runFromLayer.stringValue() == "YES") {
        runFromFile = true;
  }

  //write che content of the sketch.js layer into the sketch.js file only if readFromFile is false. Otherwise we are just reading
  if (runFromFile == false) {
  sketch = code.stringValue().toString()
  sketch = sketch.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

  var string = [NSString stringWithFormat: "%@", sketch],
    filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";

  [string writeToFile: filePath atomically: true
    encoding: NSUTF8StringEncoding error: nil];
  }
}
}

function setUpP5Code() {
  var p5canvas = getArtboardWithName("p5canvas");
  var p5code = getArtboardWithName("p5code");
  //if p5code doesn’t exist already we create the canvas artboard, then code artboard
  if (!p5code) {
    //create the artboard
    var codeArtboard = MSArtboardGroup.new()
    var p5canvasFrame = p5canvas.frame()
    frame = codeArtboard.frame();
    frame.setWidth(500);
    frame.setHeight(500);
    frame.x = p5canvas.frame().minX()-500
    frame.y = 0;
    codeArtboard.setName("p5code");
    codeArtboard.setHasBackgroundColor(true);
    codeArtboard.setBackgroundColor(MSColor.colorWithSVGString("#282C34"));
    doc.currentPage().addLayers([codeArtboard])

    //read what is in sketch.js so it can be placed in the code editor
    filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";
    var file = [NSData dataWithContentsOfFile:filePath];
    var codeString = [[NSString alloc] initWithData:file encoding:NSUTF8StringEncoding];

    //let’s be sure that there’s something in the code editor
    if (!codeString || codeString == null || codeString == undefined || codeString == nil) {
      codeString = "function setup() {\n	createCanvas(500, 500)\n};\n\nfunction draw() {\n	line(0, 0, 100, 100);\n}"
    }

    //add sketch.js text layer
    var textLayer = codeArtboard.addLayerOfType("text");
    textLayer.textColor = MSColor.colorWithSVGString("#CCCCCC");
    textLayer.fontSize = 14;
    textLayer.setFontPostscriptName("Menlo");
    textLayer.setName("sketch.js");
    textLayer.setNameIsFixed(true);
    textLayer.setStringValue(codeString);
    textLayer.frame().setX(20);
    textLayer.frame().setY(60);
    resizeLayerToFitText(textLayer);

    //add shortcut info text layer
    var shortcutTextLayer = codeArtboard.addLayerOfType("text");
    shortcutTextLayer.textColor = MSColor.colorWithSVGString("#727475");
    shortcutTextLayer.fontSize = 12;
    shortcutTextLayer.setFontPostscriptName("Menlo");
    shortcutTextLayer.setName("Instructions");
    shortcutTextLayer.setNameIsFixed(true);
    shortcutTextLayer.setStringValue("Cmd + alt + r to run the code");
    shortcutTextLayer.frame().setX(20);
    shortcutTextLayer.frame().setY(20);
    resizeLayerToFitText(shortcutTextLayer);
    shortcutTextLayer.setIsLocked(true);

    //add run from file label
    var labelTextLayer = codeArtboard.addLayerOfType("text");
    labelTextLayer.textColor = MSColor.colorWithSVGString("#727475");
    labelTextLayer.fontSize = 12;
    labelTextLayer.setFontPostscriptName("Menlo");
    labelTextLayer.setName("Label");
    labelTextLayer.setNameIsFixed(true);
    labelTextLayer.setStringValue("Read just from file:");
    labelTextLayer.frame().setX(310);
    labelTextLayer.frame().setY(20);
    resizeLayerToFitText(labelTextLayer);
    labelTextLayer.setIsLocked(true);

    //add run from file value
    var runFromFileTextLayer = codeArtboard.addLayerOfType("text");
    runFromFileTextLayer.textColor = MSColor.colorWithSVGString("#727475");
    runFromFileTextLayer.fontSize = 12;
    runFromFileTextLayer.setFontPostscriptName("Menlo");
    runFromFileTextLayer.setName("runFromFile");
    runFromFileTextLayer.setNameIsFixed(true);
    runFromFileTextLayer.setStringValue("NO");
    runFromFileTextLayer.frame().setX(465);
    runFromFileTextLayer.frame().setY(20);
    resizeLayerToFitText(runFromFileTextLayer);
    runFromFileTextLayer.setIsLocked(true);

    return textLayer, shortcutTextLayer, labelTextLayer, runFromFileTextLayer
    //this else kicks in only if the p5code already exists
  }  else {

    //check if runFromFile is true.
    //if it is it: 1) reads the content of the file 2) it writes it to sketch.js layer 3) changes the color and locks it
    //if it’s not it 1) unlocks the layer and 2) changes the color back to normal
    if (runFromFile == true) {
        //read what is in sketch.js so it can be placed in the code editor
        filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";
        var file = [NSData dataWithContentsOfFile:filePath];
        var codeString = [[NSString alloc] initWithData:file encoding:NSUTF8StringEncoding];

        //let’s be sure that there’s something in the code editor
        if (!codeString || codeString == null || codeString == undefined || codeString == nil) {
          codeString = "function setup() {\n	createCanvas(500, 500)\n};\n\nfunction draw() {\n	line(0, 0, 100, 100);\n}"
        }
        var sketchTextLayer = getLayerWithName("sketch.js", "p5code");
            sketchTextLayer.textColor = MSColor.colorWithRed_green_blue_alpha(204,204,204,0.2);
            sketchTextLayer.setIsLocked(true);
            sketchTextLayer.setStringValue(codeString);
        } else {
          var sketchTextLayer = getLayerWithName("sketch.js", "p5code");
              sketchTextLayer.textColor = MSColor.colorWithSVGString("#CCCCCC");
              sketchTextLayer.setIsLocked(false);
        }
      }
      //in any case, set the width of sketch.js as fixed
      resizeSketchjs();
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

function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  };

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
}
