//parser: grabs the code from Sketch artboard and saves it to file for execution
function parseCode() {
  var p5code = getArtboardWithName("p5code");
  if (p5code) {
  var all_layers = getArtboardWithName("p5code").layers()
  var code = [all_layers objectAtIndex: 0]
  sketch = code.stringValue().toString()
  sketch = sketch.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

  var string = [NSString stringWithFormat: "%@", sketch],
    filePath = "/Users/" + NSUserName() + "/Library/Application Support/com.bohemiancoding.sketch3/Plugins/p5.sketchplugin/Contents/Sketch/sketch.js";

  [string writeToFile: filePath atomically: true
    encoding: NSUTF8StringEncoding error: nil];
  }
}

function setUpP5Code() {
  var p5canvas = getArtboardWithName("p5canvas");
  var p5code = getArtboardWithName("p5code");
  //first canvas artboard, then code artboard
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
  }
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

function resizeLayerToFitText(layer) {
	[layer adjustFrameToFit];
    [layer select:true byExpandingSelection:false];
    [layer setIsEditingText:true];
    [layer setIsEditingText:false];
    [layer select:false byExpandingSelection:false];
}
