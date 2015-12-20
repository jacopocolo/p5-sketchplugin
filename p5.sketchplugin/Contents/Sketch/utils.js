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
