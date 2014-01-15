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
  }, {
    name: 'multi_donut',
    html: '<!-- MULTI_DONUT -->\n<div id="{{ chart_id }}">\n  <script src="http://d3js.org/d3.v3.min.js"></script>\n  <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>\n  <script>\n    (function(){\n      var canvasWidth = 300, //width\n          canvasHeight = 300,   //height\n          outerRadius = 100,   //radius\n          color = d3.scale.category20c(); //builtin range of colors\n\n      var dataSet = {{ chart_data }};\n\n      var nested = d3.nest()\n          .key(function(d) { return d["{{ x_axis_key }}"]; })\n          .entries(dataSet);\n\n      console.log(nested[0].values)\n\n      var vis = d3.select("#" + "{{ chart_id }}")\n        .append("svg:svg") //create the SVG element inside the <body>\n          .data([nested[0].values]) //associate our data with the document\n          .attr("width", canvasWidth) //set the width of the canvas\n          .attr("height", canvasHeight) //set the height of the canvas\n          .append("svg:g") //make a group to hold our pie chart\n            .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to "outerRadius,outerRadius"\n\n      // This will create <path> elements for us using arc data...\n      var arc = d3.svg.arc()\n        .outerRadius(outerRadius);\n\n      var pie = d3.layout.pie() //this will create arc data for us given a list of values\n        .value(function(d) { return d["{{ y_axis_key }}"]; }) // Binding each value to the pie\n        .sort(function(d) { return null; } );\n\n      // Select all <g> elements with class slice (there aren"t any yet)\n      var arcs = vis.selectAll("g.slice")\n        // Associate the generated pie data (an array of arcs, each having startAngle,\n        // endAngle and value properties) \n        .data(pie)\n        // This will create <g> elements for every "extra" data element that should be associated\n        // with a selection. The result is creating a <g> for every object in the data array\n        .enter()\n        // Create a group to hold each slice (we will have a <path> and a <text>\n        // element associated with each slice)\n        .append("svg:g")\n        .attr("class", "slice");    //allow us to style things in the slices (like text)\n\n      arcs.append("svg:path")\n        //set the color for each slice to be chosen from the color function defined above\n        .attr("fill", function(d, i) { return color(i); } )\n        //this creates the actual SVG path using the associated data (pie) with the arc drawing function\n        .attr("d", arc);\n\n      // Add a legendLabel to each arc slice...\n      arcs.append("svg:text")\n        .attr("transform", function(d) { //set the label"s origin to the center of the arc\n          //we have to make sure to set these before calling arc.centroid\n          d.outerRadius = outerRadius + 50; // Set Outer Coordinate\n          d.innerRadius = outerRadius + 45; // Set Inner Coordinate\n          return "translate(" + arc.centroid(d) + ")";\n        })\n        .attr("text-anchor", "middle") //center the text on it"s origin\n        .style("fill", "Purple")\n        .style("font", "bold 12px Arial")\n        .text(function(d, i) { return dataSet[i].series; }); //get the label from our original data array\n\n      // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.\n      arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")\n        .attr("dy", ".35em")\n        .attr("text-anchor", "middle")\n        .attr("transform", function(d) { //set the label"s origin to the center of the arc\n          //we have to make sure to set these before calling arc.centroid\n          d.outerRadius = outerRadius; // Set Outer Coordinate\n          d.innerRadius = outerRadius / 2; // Set Inner Coordinate\n          return "translate(" + arc.centroid(d) + ")";\n        })\n        .style("fill", "White")\n        .style("font", "bold 12px Arial")\n        .text(function(d) { return d.data["{{ y_axis_key }}"]; });\n\n      // Computes the angle of an arc, converting from radians to degrees.\n      function angle(d) {\n        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;\n        return a > 90 ? a - 180 : a;\n      }\n\n    })();\n  </script>\n</div>',
    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'], ['2009', '0', '2941', '4303', '354', '5814'], ['2010', '5', '2905', '2867', '412', '5284'], ['2011', '4', '2517', '4822', '552', '6127'], ['2012', '2', '2422', '5399', '776', '4151'], [null, null, null, null, null, null]],
    y_axis_key: 'Thousands Sold'
  }
];
