'use strict';
/*global $, input, crowbar, console*/


var inputBox = function ($el) {

  $el.on('keyup', function () {
    readCode();
    input.trigger('updated');
  });

  // // Bind text box values to model properties
  // input.data.html = $('#js-html', $el).get(0).value;
  // input.data.css = $('#js-css', $el).get(0).value;
  // input.data.js = $('#js-js', $el).get(0).value;

  // Get code from input boxes
  function readCode () {
    input.data.html = $('#js-html', $el).val();
    input.data.css = $('#js-css', $el).val();
    input.data.js = $('#js-js', $el).val();
  }

  //Simply calls crowbar.js. Janky hack for now, but works. Need to fix Illustrator bugs
  $('.js-save-svg').on('click', function () {
    crowbar();
  });

  $('.js-table', $el).handsontable({
    data: input.data.table_data,
    minCols: 15,
    minSpareCols: 1,
    minSpareRows: 1,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true,
    nativeScrollbars: false,
    afterChange: function () {
      input.trigger('updated');
      // jankyTable();
    }
  });

  // Janky hack to allow the bloated handsontable.js to be centered
  function jankyTable () {
    console.log('jankytable', $('.js-jankytable'));
    $('.js-jankytable').width($('.htCore').width());
  }
};



var previewBox = function ($el) {
  input.on('updated', function(){
    console.log(input.data);
    draw(input.data);
  });


  function draw (data) {
    var iframeDoc = $('#js-preview', $el).get(0).contentWindow.document;
    iframeDoc.write(
      data.html + '<style>' + data.css + '<\/style><script>var fiddle_data = ' + JSON.stringify(data.table_data) + '; ' + data.js + '<\/script>'
    );
    iframeDoc.close();
  }

  // $el.on('click', '.item:nth-child(2)', function () {
  //   chart.trigger('prepend');
  // });

  // $el.on('click', '.item:nth-child(4)', function () {
  //   chart.trigger('append');
  // });

  // // Usually the first draw after page load
  // chart.on('dom_init', function () {
  //   $el.children('.item:nth-child(2)').html(chart.render(-1));
  //   $el.children('.item:nth-child(3)').html(chart.render(0));
  //   $el.children('.item:nth-child(4)').html(chart.render(1));
  //   $('.js-embed-box').text(chart.render(0));
  // });

  // // Moving the carousel right
  // chart.on('prepend', function () {
  //   $el.prepend($el.children('.item:nth-child(5)').empty());
  //   chart.templates.move(-1);
  //   $el.children('.item:nth-child(2)').html(chart.render(-1));
  //   redraw();
  // });

  // // Moving the carousel left
  // chart.on('append', function () {
  //   $el.append($el.children('.item:nth-child(1)').empty());
  //   chart.templates.move(1);
  //   $el.children('.item:nth-child(4)').html(chart.render(1));
  //   redraw();
  // });

  // function redraw (num){
  //   $('.js-embed-box').text(chart.render(0));
  //   //Broadcasts the new chart type
  //   chart.trigger('type_change', chart.templates.read(0).name);
  // }
};
