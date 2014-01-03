// Generated by CoffeeScript 1.6.3
var templates;

templates = [
  {
    name: 'simple_line',
    html: '<!-- SIMPLE_LINE -->\n<div id="{{ chart_id }}">\n  <script src="http://d3js.org/d3.v3.min.js"></script>\n  <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>\n  <script>\n    (function(){\n      var svg = dimple.newSvg("#{{ chart_id }}", "100%", "390px");\n      var myChart = new dimple.chart(svg, {{ chart_data }});\n      myChart.setMargins("60px", "60px", "40px", "40px");\n\n      myChart.addCategoryAxis("x", "{{ x_axis_key }}");\n      myChart.addMeasureAxis("y", "{{ y_axis_key }}");\n\n      myChart.addSeries("series", dimple.plot.line);\n      myChart.addLegend(20, 20, 1000, 10, "left");\n      //timeout to make sure it picks up the right dimensions\n      setTimeout(function(){ myChart.draw() }, 10);\n    \n      window.onresize = function () {\n        myChart.draw(0, true);\n      };\n    })();\n  </script>\n</div>',
    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'], ['2009', '0', '2941', '4303', '354', '5814'], ['2010', '5', '2905', '2867', '412', '5284'], ['2011', '4', '2517', '4822', '552', '6127'], ['2012', '2', '2422', '5399', '776', '4151'], [null, null, null, null, null, null]],
    y_axis_key: 'Thousands Sold'
  }, {
    name: 'simple_bar',
    html: '<!-- SIMPLE_BAR -->\n<div id="{{ chart_id }}">\n  <script src="http://d3js.org/d3.v3.min.js"></script>\n  <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>\n  <script>\n    (function(){\n      var svg = dimple.newSvg("#{{ chart_id }}", "100%", "390px");\n      var myChart = new dimple.chart(svg, {{ chart_data }});\n      myChart.setMargins("60px", "60px", "40px", "40px");\n\n      myChart.addCategoryAxis("x", "{{ x_axis_key }}");\n      myChart.addMeasureAxis("y", "{{ y_axis_key }}");\n\n      myChart.addSeries("series", dimple.plot.bar);\n      myChart.addLegend(20, 20, 1000, 10, "left");\n      //timeout to make sure it picks up the right dimensions\n      setTimeout(function(){ myChart.draw() }, 10);\n    \n      window.onresize = function () {\n        myChart.draw(0, true);\n      };\n    })();\n  </script>\n</div>',
    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'], ['2009', '0', '2941', '4303', '354', '5814'], ['2010', '5', '2905', '2867', '412', '5284'], ['2011', '4', '2517', '4822', '552', '6127'], ['2012', '2', '2422', '5399', '776', '4151'], [null, null, null, null, null, null]],
    y_axis_key: 'Thousands Sold'
  }, {
    name: 'simple_area',
    html: '<!-- SIMPLE_AREA -->\n<div id="{{ chart_id }}">\n  <script src="http://d3js.org/d3.v3.min.js"></script>\n  <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>\n  <script>\n    (function(){\n      var svg = dimple.newSvg("#{{ chart_id }}", "100%", "390px");\n      var myChart = new dimple.chart(svg, {{ chart_data }});\n      myChart.setMargins("60px", "60px", "40px", "40px");\n\n      myChart.addCategoryAxis("x", "{{ x_axis_key }}");\n      myChart.addMeasureAxis("y", "{{ y_axis_key }}");\n\n      myChart.addSeries("series", dimple.plot.area);\n      myChart.addLegend(20, 20, 1000, 10, "left");\n      //timeout to make sure it picks up the right dimensions\n      setTimeout(function(){ myChart.draw() }, 10);\n    \n      window.onresize = function () {\n        myChart.draw(0, true);\n      };\n    })();\n  </script>\n</div>',
    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'], ['2009', '0', '2941', '4303', '354', '5814'], ['2010', '5', '2905', '2867', '412', '5284'], ['2011', '4', '2517', '4822', '552', '6127'], ['2012', '2', '2422', '5399', '776', '4151'], [null, null, null, null, null, null]],
    y_axis_key: 'Thousands Sold'
  }
];
