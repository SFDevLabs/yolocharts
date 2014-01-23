# View this with html syntax highlighting!

templates = [
  
    name: 'simple_line'
    html:
      '''
      <!-- SIMPLE_LINE -->
      <div id="{{ chart_id }}">
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var svg = dimple.newSvg("#{{ chart_id }}", "100%", "390px");
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
  ,
    name: 'simple_bar'
    html:
      '''
      <!-- SIMPLE_BAR -->
      <div id="{{ chart_id }}">
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var svg = dimple.newSvg("#{{ chart_id }}", "100%", "390px");
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
  ,
    name: 'simple_area'
    html:
      '''
      <!-- SIMPLE_AREA -->
      <div id="{{ chart_id }}">
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var svg = dimple.newSvg("#{{ chart_id }}", "100%", "390px");
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
  ,
    name: 'multi_donut'
    html:
      '''
      <!-- MULTI_DONUT -->
      <div id="{{ chart_id }}">
        <style>
          .svg-{{ chart_id }} {
            float: left !important;
          }
        </style>
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <script>
          (function(){
            var width = 380,
                height = width,
                radius = width / 2.6,
                data = {{ chart_data }};

            var nested = d3.nest()
              .key(function(d) { return d["{{ x_axis_key }}"]; })
              .entries(data);

            var color = d3.scale.category20c();

            var pie = d3.layout.pie()
                .value(function(d) { return d["{{ y_axis_key }}"]; })
                .sort(null);

            var arc = d3.svg.arc()
                .innerRadius(radius / 2.5)
                .outerRadius(radius / 1.3);

            // Make pie chart svg
            var svg = d3.select("#{{ chart_id }}").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "svg-{{ chart_id }}" )
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            // Make group to hold slice path and label
            var slice_group = svg.datum(nested[0].values).selectAll("path")
              .data(pie)
              .enter()
                .append("g");

            // This is the actual slice path
            var slice_path = slice_group.append("path")
              .attr("fill", function(d, i) { return color(i); })
              .attr("d", arc)
              .each(function(d) { this._current = d; }); // store the initial angles

            // Make group to hold labels
            var label_group = slice_group.append("g")
              .attr("transform", labelPos);

            var line_1 = label_group.append("text") // First line
              .text(function(d) { return d.data.series; })
              .attr("text-anchor", "middle");

            var line_2 = label_group.append("text") // Second line
              .text(function(d) { return d.data["{{ y_axis_key }}"]; })
              .attr("dy", "1em")
              .attr("text-anchor", "middle");

            // Make dataset selector
            var selector = d3.select("#{{ chart_id }}").append("form").selectAll("label")
              .data(nested)
              .enter()
                .append("label")
                .html(function (d, i) {
                  var checked = (i === 0) ? "checked" : "";
                  return "<input type='radio' name='dataset' value='" + i + "'" + checked + ">" + d.key;
                });

            // Switch data
            selector.selectAll("input")
              .on("change", change);

            function change() {
              console.log(nested, this)
              var value = this.value;
              svg.datum(nested[value].values);

              slice_path.data(pie) // compute the new angles
                .transition().duration(750).attrTween("d", arcTween); // redraw the arcs

              label_group.data(pie)
                .transition().duration(750)
                .attr("transform", labelPos);

              line_1.data(pie)
                .text(function(d) { return d.data["series"]; });

              line_2.data(pie)
                .text(function(d) { return d.data["{{ y_axis_key }}"]; });
            }

            function labelPos (d) {
              var c = arc.centroid(d);
              return "translate(" + c[0] * 1.8 +"," + c[1] * 1.6 + ")";
            }

            // Store the displayed angles in _current.
            // Then, interpolate from _current to the new angles.
            // During the transition, _current is updated in-place by d3.interpolate.
            function arcTween (a) {
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) {
                return arc(i(t));
              };
            }

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
]