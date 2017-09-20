function append(array, value) {
  array.push(value);
  return array;
};

function arrayCopy(
  src,
  srcPosition,
  dst,
  dstPosition,
  length) {

  // the index to begin splicing from dst array
  var start,
      end;

  if (typeof length !== 'undefined') {

    end = Math.min(length, src.length);
    start = dstPosition;
    src = src.slice(srcPosition, end + srcPosition);

  } else {

    if (typeof dst !== 'undefined') { // src, dst, length
      // rename  so we don't get confused
      end = dst;
      end = Math.min(end, src.length);
    } else { // src, dst
      end = src.length;
    }

    start = 0;
    // rename  so we don't get confused
    dst = srcPosition;
    src = src.slice(0, end);
  }

  // Since we are not returning the array and JavaScript is pass by reference
  // we must modify the actual values of the array
  // instead of reassigning arrays
  Array.prototype.splice.apply(dst, [start, end].concat(src));

};

function concat(list0, list1) {
  return list0.concat(list1);
};

function reverse(list) {
  return list.reverse();
};

function shorten(list) {
  list.pop();
  return list;
};

function shuffle(arr, boolean) {
 var isView = ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(arr);
 arr = boolean || isView ? arr : arr.slice();

 var rnd, tmp, idx = arr.length;
 while (idx > 1) {
   rnd = Math.random()*idx | 0;

   tmp = arr[--idx];
   arr[idx] = arr[rnd];
   arr[rnd] = tmp;
 }

 return arr;
};

function sort(list, count) {
  var arr = count ? list.slice(0, Math.min(count, list.length)) : list;
  var rest = count ? list.slice(Math.min(count, list.length)) : [];
  if (typeof arr[0] === 'string') {
    arr = arr.sort();
  } else {
    arr = arr.sort(function(a,b){return a-b;});
  }
  return arr.concat(rest);
};

function splice(list, value, index) {

  // note that splice returns spliced elements and not an array
  Array.prototype.splice.apply(list, [index, 0].concat(value));

  return list;
};

function subset(list, start, count) {
  if (typeof count !== 'undefined') {
    return list.slice(start, start + count);
  } else {
    return list.slice(start, list.length);
  }
};
