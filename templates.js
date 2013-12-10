// Generated by CoffeeScript 1.6.3
var templates;

templates = {
  stacked_area: '<div id="{{ chart_id }}">\n  <script src="http://d3js.org/d3.v3.min.js"></script>\n  <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>\n  <script>\n    var svg = dimple.newSvg("#{{ chart_id }}", "100%", "500px");\n    var myChart = new dimple.chart(svg, {{ chart_data }});\n    myChart.setMargins("60px", "60px", "40px", "40px");\n    var x = myChart.addCategoryAxis("x", "{{ x_axis_key }}");\n    myChart.addMeasureAxis("y", "{{ y_axis_key }}");\n    myChart.addSeries("series", dimple.plot.area);\n    myChart.addLegend(20, 20, 1000, 10, "left");\n    //timeout to make sure it picks up the right dimensions\n    setTimeout(function(){ myChart.draw() }, 10);\n  \n    window.onresize = function () {\n      myChart.draw(0, true);\n    };\n  </script>\n</div>'
};
