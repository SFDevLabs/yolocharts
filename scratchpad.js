var jeffData = [["day","foo","bar","","",""],["1","45","23",null,null,null],["2","56","12",null,null,null],["3","87","10",null,null,null],["4","76","13",null,null,null],["5","52","24",null,null,null],["6","45","35",null,null,null],["7","48","41",null,null,null],["8","42","45",null,null,null],["9","41","41",null,null,null],[null,null,null,null,null,null]];

var handsOnData = [["day","type","number","","",""],["0","foo","12",null,null,null],["1","foo","23",null,null,null],["2","foo","16",null,null,null],["3","foo","45",null,null,null],["4","foo","23",null,null,null],["5","foo","43",null,null,null],["6","foo","54",null,null,null],["7","foo","23",null,null,null],["8","foo","56",null,null,null],["9","foo","65",null,null,null],["0","bar","13",null,null,null],["1","bar","15",null,null,null],["2","bar","42",null,null,null],["3","bar","54",null,null,null],["4","bar","32",null,null,null],["5","bar","12",null,null,null],["6","bar","23",null,null,null],["7","bar","12",null,null,null],["8","bar","12",null,null,null],["9","bar","22",null,null,null],[null,null,null,null,null,null]];

var chartData = [{"day":"0","type":"foo","number":"12","rowNumber":1},{"day":"1","type":"foo","number":"23","rowNumber":2},{"day":"2","type":"foo","number":"16","rowNumber":3},{"day":"3","type":"foo","number":"45","rowNumber":4},{"day":"4","type":"foo","number":"23","rowNumber":5},{"day":"5","type":"foo","number":"43","rowNumber":6},{"day":"6","type":"foo","number":"54","rowNumber":7},{"day":"7","type":"foo","number":"23","rowNumber":8},{"day":"8","type":"foo","number":"56","rowNumber":9},{"day":"9","type":"foo","number":"65","rowNumber":10},{"day":"0","type":"bar","number":"13","rowNumber":11},{"day":"1","type":"bar","number":"15","rowNumber":12},{"day":"2","type":"bar","number":"42","rowNumber":13},{"day":"3","type":"bar","number":"54","rowNumber":14},{"day":"4","type":"bar","number":"32","rowNumber":15},{"day":"5","type":"bar","number":"12","rowNumber":16},{"day":"6","type":"bar","number":"23","rowNumber":17},{"day":"7","type":"bar","number":"12","rowNumber":18},{"day":"8","type":"bar","number":"12","rowNumber":19},{"day":"9","type":"bar","number":"22","rowNumber":20}];

//eliminates any rows that contain only falsey values
function trimEmptyRows(input) {
  return _.filter(input, function(a){
    return _.reduce(a, function(accumulator, value){
      if (accumulator || value) return true;
      return false;
    });
  });
}

//compacts all arrays in array (one level)
function innerCompact(input) {
  var output = [];
  _.forEach(input, function(row){
    output.push(_.compact(row));
  });
  return output;
}


function hotToD3(input) {
  //remove and return first row
  var header = input.splice(0, 1)[0],
      output = [];
  
  //turn rows into objects keyed from header
  _.forEach(input, function(row){
    var clean_row = _.compact(row),
        clean_header = _.compact(header);
    output.push(_.zipObject(clean_header, clean_row));
  });
  
  return output;
}



// // turn [['day','foo','bar'],
// //       ['1','23','52'],
// //       ['2','34','21']]
// // into
// // [{day:1, type:'foo', num:'23'},
// //  {day:1, type:'bar', num:'52'},
// //  {day:2, type:'foo', num:'34'},
// //  {day:2, type:'bar', num:'21'}]

// var x_axis = header.splice(0, 1)[0];

// output[x_axis] = row.splice(0, 1)[0];

// _.forEach(row, function(value, index){
  
// });




console.log(
  hotToD3(innerCompact(trimEmptyRows(handsOnData)))
);
