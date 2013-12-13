# View this with html syntax highlighting!

templates =
  
  simple_line:

    '''
    <div id="{{ chart_id }}">
      <script src="http://d3js.org/d3.v3.min.js"></script>
      <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
      <script>
        var svg = dimple.newSvg("#{{ chart_id }}", "100%", "500px");
        var myChart = new dimple.chart(svg, {{ chart_data }});
        myChart.setMargins("60px", "60px", "40px", "40px");

        myChart.addCategoryAxis("x", "{{ x_axis_key }}");
        myChart.addMeasureAxis("y", "{{ y_axis_key }}");

        myChart.addSeries("series", dimple.plot.line);
        myChart.addLegend(20, 20, 1000, 10, "left");
        //timeout to make sure it picks up the right dimensions
        setTimeout(function(){ myChart.draw() }, 10);
      
        window.onresize = function () {
          myChart.draw(0, true);
        };
      </script>
    </div>
    '''

  simple_bar:

    '''
    <div id="{{ chart_id }}">
      <script src="http://d3js.org/d3.v3.min.js"></script>
      <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
      <script>
        var svg = dimple.newSvg("#{{ chart_id }}", "100%", "500px");
        var myChart = new dimple.chart(svg, {{ chart_data }});
        myChart.setMargins("60px", "60px", "40px", "40px");

        myChart.addCategoryAxis("x", "{{ x_axis_key }}");
        myChart.addMeasureAxis("y", "{{ y_axis_key }}");

        myChart.addSeries("series", dimple.plot.bar);
        myChart.addLegend(20, 20, 1000, 10, "left");
        //timeout to make sure it picks up the right dimensions
        setTimeout(function(){ myChart.draw() }, 10);
      
        window.onresize = function () {
          myChart.draw(0, true);
        };
      </script>
    </div>
    '''

  simple_area:

    '''
    <div id="{{ chart_id }}">
      <script src="http://d3js.org/d3.v3.min.js"></script>
      <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
      <script>
        var svg = dimple.newSvg("#{{ chart_id }}", "100%", "500px");
        var myChart = new dimple.chart(svg, {{ chart_data }});
        myChart.setMargins("60px", "60px", "40px", "40px");

        myChart.addCategoryAxis("x", "{{ x_axis_key }}");
        myChart.addMeasureAxis("y", "{{ y_axis_key }}");

        myChart.addSeries("series", dimple.plot.area);
        myChart.addLegend(20, 20, 1000, 10, "left");
        //timeout to make sure it picks up the right dimensions
        setTimeout(function(){ myChart.draw() }, 10);
      
        window.onresize = function () {
          myChart.draw(0, true);
        };
      </script>
    </div>
    '''