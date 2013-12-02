'use strict';

/*global $, _, console*/


$(document).ready(function(){



  var exampleData = [
    ["Year", "Maserati", "Mazda", "Mercedes", "Mini", "Mitsubishi"],
    ["2009", "0", "2941", "4303", "354", "5814"],
    ["2010", "5", "2905", "2867", "412", "5284"],
    ["2011", "4", "2517", "4822", "552", "6127"],
    ["2012", "2", "2422", "5399", "776", "4151"],
    [null, null, null, null, null, null]
  ];
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

      // match given keyname from header to value from row
      _.forEach(header, function(value, index){
        var doc = {};
        doc[x_axis_key] = x_axis_value;
        doc['type'] = value;
        doc['Thousands Sold'] = row[index];
        output.push(doc);
      });
    });

    return output;
  }


  function drawTable(data) {
    $('#table').handsontable({
      data: data,
      minRows: 20,
      minCols: 20,
      minSpareCols: 1,
      //always keep at least 1 spare row at the right
      minSpareRows: 1,
      //always keep at least 1 spare row at the bottom,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true
    });
  }

  function drawChart(chartData, chartId, embedId, setBounds, xAxis, units) {
    var chartDataString = JSON.stringify(chartData);
    var template = '<div id="' + chartId + '">' +
      '<script src="http://d3js.org/d3.v3.min.js"></script>' +
      '<script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>' +
      '<script>' +
        'var data = ' + chartDataString + ';' +
        'var svg = dimple.newSvg("#' + chartId + '", 590, 300);' +
        'var myChart = new dimple.chart(svg, data);' +
        'myChart.setBounds(' + setBounds + ');' +
        'var x = myChart.addCategoryAxis("x", "' + xAxis + '");' +
        'myChart.addMeasureAxis("y", "' + units + '");' +
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
  drawChart(hotToD3(hotTable.getData()), 'yolochart', 'embedBox', '60, 30, 505, 250', 'Year', 'Thousands Sold');

  $('#redraw').on('click', function(){
    drawChart(hotToD3(hotTable.getData()), 'yolochart', 'embedBox', '60, 30, 505, 250', 'Year', 'Thousands Sold');
  });

});



