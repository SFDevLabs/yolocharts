

var data = [["","foo","bar"],["2009","1000",2941],["2010","2000",2905],["2011","3000",2517],["2012","4000",2422]];

var chartData = [{"day":"0","type":"foo","number":"12","rowNumber":1},{"day":"1","type":"foo","number":"23","rowNumber":2},{"day":"2","type":"foo","number":"16","rowNumber":3},{"day":"3","type":"foo","number":"45","rowNumber":4},{"day":"4","type":"foo","number":"23","rowNumber":5},{"day":"5","type":"foo","number":"43","rowNumber":6},{"day":"6","type":"foo","number":"54","rowNumber":7},{"day":"7","type":"foo","number":"23","rowNumber":8},{"day":"8","type":"foo","number":"56","rowNumber":9},{"day":"9","type":"foo","number":"65","rowNumber":10},{"day":"0","type":"bar","number":"13","rowNumber":11},{"day":"1","type":"bar","number":"15","rowNumber":12},{"day":"2","type":"bar","number":"42","rowNumber":13},{"day":"3","type":"bar","number":"54","rowNumber":14},{"day":"4","type":"bar","number":"32","rowNumber":15},{"day":"5","type":"bar","number":"12","rowNumber":16},{"day":"6","type":"bar","number":"23","rowNumber":17},{"day":"7","type":"bar","number":"12","rowNumber":18},{"day":"8","type":"bar","number":"12","rowNumber":19},{"day":"9","type":"bar","number":"22","rowNumber":20}];


$('#example').handsontable({
  data: data,
  minSpareRows: 1,
  colHeaders: false,
  contextMenu: true
});

var svg = dimple.newSvg("#chartexample", 590, 155);
var myChart = new dimple.chart(svg, chartData);myChart.setBounds(60, 30, 505, 105);
var x = myChart.addCategoryAxis("x", "day");
myChart.addMeasureAxis("y", "number");
myChart.addSeries("type", dimple.plot.area);
myChart.addLegend(60, 10, 500, 20, "right");
myChart.draw();



var data=$("#example").data('handsontable').getData()


//remove the first Col
_.map(data, function(val, num){

  console.log(val, num)

});

//remove the first row.