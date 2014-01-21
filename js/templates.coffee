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
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="http://dimplejs.org/dist/dimple.v1.1.2.min.js"></script>
        <form>
          <label><input type="radio" name="dataset" value="apples" checked> Apples</label>
          <label><input type="radio" name="dataset" value="oranges"> Oranges</label>
        </form>
        <script>
          (function(){
            var color = d3.scale.category20c(); 
            var h = (350);
            var padding = 50;
            var w = h + padding * 2;
            var radius = (h / 2);
            var outerRadius = radius - padding;
            var innerRadius = outerRadius / 2

            var dataset = {{ chart_data }};

            var nested = d3.nest()
              .key(function(d) { return d["{{ x_axis_key }}"]; })
              .entries(dataset);

            console.log(nested[0].values)

            var arc = d3.svg.arc()
              .innerRadius(innerRadius) 
              .outerRadius(outerRadius);
              
            var pie = d3.layout.pie()
              .value(function(d) { 
                console.log('pie d', d);
                return d["{{ y_axis_key }}"] 
              })
              .sort( null );;


            // create svg for donut
            var svg = d3.select("#{{ chart_id }}")  
              .append("svg")
              .attr("width", w)
              .attr("height", h);

            var group = svg.append('g')
              .attr("transform", "translate(" + (radius + padding) + "," + radius + ")");

            // Create arc groups
            var arcs = group.selectAll(".arc") 
              .data(pie(nested[0].values)) 
              .enter()
              .append("g")
              .attr("class", "arc");
              // .each(function(d) { this._current = d; });

            // Draw arc paths
            var paths = arcs.append("path")
              .attr("d", arc)
              .attr("fill", function(d, i) { return color(i); })


            // Switch and transition x-axis value
            d3.selectAll("input")
              .on("change", change);

            function change() {
              console.log(this)
              // var value = this.value;
              pie.value(function(d) { d["{{ y_axis_key }}"]; }); // change the value function
              arcs = arcs.data(pie)
              // .enter()
              
              paths.attr("d", arc)
              // arcs.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
            }


            // function change() {
            //     // var jobs_counts = getRandomCounts();
            //     // var jobs_colors = ["green", "yellow", "red", "blue", "cyan"];    
            //     arcs = arcs.data(pie(nested[1].values))
            //       .attr("fill", function(d, i) { return color(i); })

            //     arcs.transition().duration(500).attrTween("d", function(a) {
            //       console.log('transition this', this)
            //       var i = d3.interpolate(this._current, a);
            //     this._current = i(0);
            //     return function(t) {
            //       return arc
            //         .innerRadius(innerRadius) 
            //         .outerRadius(outerRadius);
            //      };
            //     });                                            
            // }


            // Make group to hold labels
            var labels = arcs.append("g")
              .attr("transform", function(d) {
                var c = arc.centroid(d);
                return "translate(" + c[0]*1.8 +"," + c[1]*1.6 + ")";
              })

            labels.append("text") // First line
              .text(function(d) { return d.data.series; })
              .attr("text-anchor", "middle")

            labels.append("text") // Second line
              .text(function(d) { return d.data["{{ y_axis_key }}"]; })
              .attr("dy", "1em")
              .attr("text-anchor", "middle")

            // Store the displayed angles in _current.
            // Then, interpolate from _current to the new angles.
            // During the transition, _current is updated in-place by d3.interpolate.
            function arcTween(a) {
              console.log('arctween this, a', this, a)
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function (t) {
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