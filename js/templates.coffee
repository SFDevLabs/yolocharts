# View this with html syntax highlighting!

templates =
  
  simple_line:
    template:
      '''
      <!-- SIMPLE_LINE -->
      <div id="{{ chart_id }}">
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var svg = dimple.newSvg("#{{ chart_id }}", "100%", "100%");
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
          })();
        </script>
      </div>
      '''
    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'],
          ['2009', '0', '2941', '4303', '354', '5814'],
          ['2010', '5', '2905', '2867', '412', '5284'],
          ['2011', '4', '2517', '4822', '552', '6127'],
          ['2012', '2', '2422', '5399', '776', '4151'],
          [null, null, null, null, null, null]]

    y_axis_key: 'Thousands Sold'

  simple_bar:
    template:
      '''
      <!-- SIMPLE_BAR -->
      <div id="{{ chart_id }}">
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var svg = dimple.newSvg("#{{ chart_id }}", "100%", "100%");
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
          })();
        </script>
      </div>
      '''
    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'],
          ['2009', '0', '2941', '4303', '354', '5814'],
          ['2010', '5', '2905', '2867', '412', '5284'],
          ['2011', '4', '2517', '4822', '552', '6127'],
          ['2012', '2', '2422', '5399', '776', '4151'],
          [null, null, null, null, null, null]]

    y_axis_key: 'Thousands Sold'

  simple_area:
    template:
      '''
      <!-- SIMPLE_AREA -->
      <div id="{{ chart_id }}">
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var svg = dimple.newSvg("#{{ chart_id }}", "100%", "100%");
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
          })();
        </script>
      </div>
      '''

    data: [['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'],
          ['2009', '0', '2941', '4303', '354', '5814'],
          ['2010', '5', '2905', '2867', '412', '5284'],
          ['2011', '4', '2517', '4822', '552', '6127'],
          ['2012', '2', '2422', '5399', '776', '4151'],
          [null, null, null, null, null, null]]

    y_axis_key: 'Thousands Sold'