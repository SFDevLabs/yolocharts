/*global $, _, console*/


$(document).ready(function(){

  var chartData = '[{"day":"0","type":"foo","number":"12","rowNumber":1},{"day":"1","type":"foo","number":"23","rowNumber":2},{"day":"2","type":"foo","number":"16","rowNumber":3},{"day":"3","type":"foo","number":"45","rowNumber":4},{"day":"4","type":"foo","number":"23","rowNumber":5},{"day":"5","type":"foo","number":"43","rowNumber":6},{"day":"6","type":"foo","number":"54","rowNumber":7},{"day":"7","type":"foo","number":"23","rowNumber":8},{"day":"8","type":"foo","number":"56","rowNumber":9},{"day":"9","type":"foo","number":"65","rowNumber":10},{"day":"0","type":"bar","number":"13","rowNumber":11},{"day":"1","type":"bar","number":"15","rowNumber":12},{"day":"2","type":"bar","number":"42","rowNumber":13},{"day":"3","type":"bar","number":"54","rowNumber":14},{"day":"4","type":"bar","number":"32","rowNumber":15},{"day":"5","type":"bar","number":"12","rowNumber":16},{"day":"6","type":"bar","number":"23","rowNumber":17},{"day":"7","type":"bar","number":"12","rowNumber":18},{"day":"8","type":"bar","number":"12","rowNumber":19},{"day":"9","type":"bar","number":"22","rowNumber":20}]';


  var exampleData = [
    ["day", "foo", "bar", "", "", ""],
    ["1", "45", "23", null, null, null],
    ["2", "56", "12", null, null, null],
    ["3", "87", "10", null, null, null],
    ["4", "76", "13", null, null, null],
    ["5", "52", "24", null, null, null],
    ["6", "45", "35", null, null, null],
    ["7", "48", "41", null, null, null],
    ["8", "42", "45", null, null, null],
    ["9", "41", "41", null, null, null],
    [null, null, null, null, null, null]
  ];

  // $("#example").handsontable({
  //     data: exampleData,
  //     startRows: 5,
  //     startCols: 5,
  //     minSpareCols: 1,
  //     //always keep at least 1 spare row at the right
  //     minSpareRows: 1,
  //     //always keep at least 1 spare row at the bottom,
  //     rowHeaders: true,
  //     colHeaders: true,
  //     contextMenu: true
  // });

  // function template(chartData, setBounds, xAxis) {
  //   return '<div id="yolochart">' +
  //     '<script src="http://d3js.org/d3.v3.min.js"></script>' +
  //     '<script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>' +
  //     '<script>' +
  //       'var data = ' + chartData + ';' +
  //       'var svg = dimple.newSvg("#yolochart", 590, 155);' +
  //       'var myChart = new dimple.chart(svg, data);' +
  //       'myChart.setBounds(' + setBounds + ');' +
  //       'var x = myChart.addCategoryAxis("x", "' + xAxis + '");' +
  //       'myChart.addMeasureAxis("y", "number");' +
  //       'myChart.addSeries("type", dimple.plot.area);' +
  //       'myChart.addLegend(60, 10, 500, 20, "right");' +
  //       'myChart.draw();' +
  //     '</script>' +
  //   '</div>';
  // }

  // $('#yolochart').replaceWith(template(chartData, setBounds, xAxis));
  // $('#embedBox').text(template(chartData, setBounds, xAxis));

  // $('#redraw').on('click', function(){
  //   console.log('redraw');
  //   xAxis = 'number';
  //   $('#yolochart').replaceWith(template(chartData, setBounds, xAxis));
  //   $('#embedBox').text(template(chartData, setBounds, xAxis));
  // });


  //eliminates any rows that contain only falsey values
  function trimEmptyRows(input) {
    return _.filter(input, function(a) {
      return _.reduce(a, function(accumulator, value) {
        if (accumulator || value) return true;
        return false;
      });
    });
  }

  //compacts all arrays in array (one level)
  function innerCompact(input) {
    var output = [];
    _.forEach(input, function(row) {
      output.push(_.compact(row));
    });
    return output;
  }

  function hotToD3(input) {
    //clean out empty columns and rows
    var clean = innerCompact(trimEmptyRows(input)),
        //remove and store header row
        header = clean.splice(0, 1)[0],
        //remove and store x axis key
        x_axis_key = header.splice(0, 1)[0],
        output = [];

    _.forEach(clean, function(row){
      // get value of x-axis, per row
      var x_axis_value = row.splice(0, 1)[0];

      _.forEach(header, function(value, index){
        var doc = {};
        doc[x_axis_key] = x_axis_value;
        // match given keyname from header to value from row
        doc['type'] = value;
        doc['num'] = row[index];
        output.push(doc);
      });
    });

    return output;
  }


  function drawTable(data) {
    $('#table').handsontable({
      data: data,
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
  }

  function drawChart(chartData, chartId, embedId, setBounds, xAxis) {
    var chartDataString = JSON.stringify(chartData);
    var template = '<div id="' + chartId + '">' +
      '<script src="http://d3js.org/d3.v3.min.js"></script>' +
      '<script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>' +
      '<script>' +
        'var data = ' + chartDataString + ';' +
        'var svg = dimple.newSvg("#' + chartId + '", 590, 155);' +
        'var myChart = new dimple.chart(svg, data);' +
        'myChart.setBounds(' + setBounds + ');' +
        'var x = myChart.addCategoryAxis("x", "' + xAxis + '");' +
        'myChart.addMeasureAxis("y", "num");' +
        'myChart.addSeries("type", dimple.plot.area);' +
        'myChart.addLegend(60, 10, 500, 20, "right");' +
        'myChart.draw();' +
      '</script>' +
    '</div>';

    console.log(template);

    $('#' + chartId).replaceWith(template);
    $('#' + embedId).text(template);
  }


  drawTable(exampleData);
  var hotTable = $('#table').handsontable('getInstance');
  console.log(hotTable.getData());
  drawChart(hotToD3(hotTable.getData()), 'yolochart', 'embedBox', '60, 30, 505, 105', 'day');

  $('#redraw').on('click', function(){
    drawChart(hotToD3(hotTable.getData()), 'yolochart', 'embedBox', '60, 30, 505, 105', 'day');
  });

});



