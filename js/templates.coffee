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
        <script>
          (function(){
            var canvasWidth = 300, //width
                canvasHeight = 300,   //height
                outerRadius = 100,   //radius
                color = d3.scale.category20c(); //builtin range of colors

            var dataSet = {{ chart_data }};

            var nested = d3.nest()
                .key(function(d) { return d["{{ x_axis_key }}"]; })
                .entries(dataSet);

            console.log(nested[0].values)

            var vis = d3.select("#" + "{{ chart_id }}")
              .append("svg:svg") //create the SVG element inside the <body>
                .data([nested[0].values]) //associate our data with the document
                .attr("width", canvasWidth) //set the width of the canvas
                .attr("height", canvasHeight) //set the height of the canvas
                .append("svg:g") //make a group to hold our pie chart
                  .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to "outerRadius,outerRadius"

            // This will create <path> elements for us using arc data...
            var arc = d3.svg.arc()
              .outerRadius(outerRadius);

            var pie = d3.layout.pie() //this will create arc data for us given a list of values
              .value(function(d) { return d["{{ y_axis_key }}"]; }) // Binding each value to the pie
              .sort(function(d) { return null; } );

            // Select all <g> elements with class slice (there aren"t any yet)
            var arcs = vis.selectAll("g.slice")
              // Associate the generated pie data (an array of arcs, each having startAngle,
              // endAngle and value properties) 
              .data(pie)
              // This will create <g> elements for every "extra" data element that should be associated
              // with a selection. The result is creating a <g> for every object in the data array
              .enter()
              // Create a group to hold each slice (we will have a <path> and a <text>
              // element associated with each slice)
              .append("svg:g")
              .attr("class", "slice");    //allow us to style things in the slices (like text)

            arcs.append("svg:path")
              //set the color for each slice to be chosen from the color function defined above
              .attr("fill", function(d, i) { return color(i); } )
              //this creates the actual SVG path using the associated data (pie) with the arc drawing function
              .attr("d", arc);

            // Add a legendLabel to each arc slice...
            arcs.append("svg:text")
              .attr("transform", function(d) { //set the label"s origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.outerRadius = outerRadius + 50; // Set Outer Coordinate
                d.innerRadius = outerRadius + 45; // Set Inner Coordinate
                return "translate(" + arc.centroid(d) + ")";
              })
              .attr("text-anchor", "middle") //center the text on it"s origin
              .style("fill", "Purple")
              .style("font", "bold 12px Arial")
              .text(function(d, i) { return dataSet[i].series; }); //get the label from our original data array

            // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
            arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
              .attr("dy", ".35em")
              .attr("text-anchor", "middle")
              .attr("transform", function(d) { //set the label"s origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.outerRadius = outerRadius; // Set Outer Coordinate
                d.innerRadius = outerRadius / 2; // Set Inner Coordinate
                return "translate(" + arc.centroid(d) + ")";
              })
              .style("fill", "White")
              .style("font", "bold 12px Arial")
              .text(function(d) { return d.data["{{ y_axis_key }}"]; });

            // Computes the angle of an arc, converting from radians to degrees.
            function angle(d) {
              var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
              return a > 90 ? a - 180 : a;
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