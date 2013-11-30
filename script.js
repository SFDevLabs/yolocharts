/*global $*/


$(document).ready(function(){
  
  var chartData = '[{"day":"0","type":"foo","number":"12","rowNumber":1},{"day":"1","type":"foo","number":"23","rowNumber":2},{"day":"2","type":"foo","number":"16","rowNumber":3},{"day":"3","type":"foo","number":"45","rowNumber":4},{"day":"4","type":"foo","number":"23","rowNumber":5},{"day":"5","type":"foo","number":"43","rowNumber":6},{"day":"6","type":"foo","number":"54","rowNumber":7},{"day":"7","type":"foo","number":"23","rowNumber":8},{"day":"8","type":"foo","number":"56","rowNumber":9},{"day":"9","type":"foo","number":"65","rowNumber":10},{"day":"0","type":"bar","number":"13","rowNumber":11},{"day":"1","type":"bar","number":"15","rowNumber":12},{"day":"2","type":"bar","number":"42","rowNumber":13},{"day":"3","type":"bar","number":"54","rowNumber":14},{"day":"4","type":"bar","number":"32","rowNumber":15},{"day":"5","type":"bar","number":"12","rowNumber":16},{"day":"6","type":"bar","number":"23","rowNumber":17},{"day":"7","type":"bar","number":"12","rowNumber":18},{"day":"8","type":"bar","number":"12","rowNumber":19},{"day":"9","type":"bar","number":"22","rowNumber":20}]';

  var setBounds = '60, 30, 505, 105';

  var xAxis = 'day';

  $("#example").handsontable({
      data: chartData,
      startRows: 5,
      startCols: 5,
      minSpareCols: 1,
      //always keep at least 1 spare row at the right
      minSpareRows: 1,
      //always keep at least 1 spare row at the bottom,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true
  });

  function template(chartData, setBounds, xAxis) {
    return '<div id="yolochart">' +
      '<script src="http://d3js.org/d3.v3.min.js"></script>' +
      '<script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>' +
      '<script>' +
        'var data = ' + chartData + ';' +
        'var svg = dimple.newSvg("#yolochart", 590, 155);' +
        'var myChart = new dimple.chart(svg, data);' +
        'myChart.setBounds(' + setBounds + ');' +
        'var x = myChart.addCategoryAxis("x", "' + xAxis + '");' +
        'myChart.addMeasureAxis("y", "number");' +
        'myChart.addSeries("type", dimple.plot.area);' +
        'myChart.addLegend(60, 10, 500, 20, "right");' +
        'myChart.draw();' +
      '</script>' +
    '</div>';
  }

  console.log(template(chartData, setBounds, xAxis));

  $('#yolochart').replaceWith(template(chartData, setBounds, xAxis));
  $('#embedBox').text(template(chartData, setBounds, xAxis));

  $('#redraw').on('click', function(){
    console.log('redraw');
    xAxis = 'number';
    $('#yolochart').replaceWith(template(chartData, setBounds, xAxis));
    $('#embedBox').text(template(chartData, setBounds, xAxis));
  });

});