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
  if (!codeString || codeString == null || codeString == undefined || codeString == nil || codeString == "") {
    codeString = "function setup() {\n	createCanvas(500, 500)\n};\n\nfunction draw() {\n	line(0, 0, 100, 100);\n}"
  }

  //still figuring out how to enable undo in the text field
  log(code.allowsUndo())

  [code setFont:[NSFont fontWithName:@"Monaco" size:13]];
  code.backgroundColor = [NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1]
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

  var run = alert.addButtonWithTitle('Run');
  alert.addButtonWithTitle('Cancel');
  alert.setAccessoryView(accessoryView);

  var responseCode = alert.runModal();
  var string = code.string().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

  return {
    responseCode: responseCode,
    data: string
  };
}
