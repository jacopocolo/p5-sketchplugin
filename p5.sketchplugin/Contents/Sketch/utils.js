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

// This function checks if a canvas already exists and if it doesn’t it draws it
// If the canvas already exists, it deletes all the layers inside and draw new ones
// The idea is to mimic the behaviour of the Processing canvas, where every time you
// run the code, you create something new.
function createCanvas(w, h) {
  width = w;
  height = h;
  parseCode();

  var p5canvas = getArtboardWithName("p5canvas");
  var p5code = getArtboardWithName("p5code");

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
    artboard.setHasBackgroundColor(true);
    doc.currentPage().addLayers([artboard])
    setUpP5Code()
  } else {
    deleteAllLayers("p5canvas")
    artboard = p5canvas;
    frame = artboard.frame()
    frame.setWidth(width)
    frame.setHeight(height)
    setUpP5Code()
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
    frame.setHeight(600);
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
            sketchTextLayer.textColor = MSColor.colorWithRed_green_blue_alpha(207,207,207,0.2);
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
