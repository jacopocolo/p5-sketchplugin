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

function resizeLayerToFitText(layer) {
	[layer adjustFrameToFit];
    [layer select:true byExpandingSelection:false];
    [layer setIsEditingText:true];
    [layer setIsEditingText:false];
    [layer select:false byExpandingSelection:false];
}

// function resizeSketchjs(){
//   var sketchjs = getLayerWithName("sketch.js", "p5code");
//     sketchjs.frame().setWidth(450);
//     sketchjs.setTextBehaviour(1);
//     var h = sketchjs.frame().height();
//   var p5code = getArtboardWithName("p5code");
//     var r = p5code.rect();
//     r.size.height = h+100;
//     r.size.width = 500;
//     p5code.setRect(r);
// }
