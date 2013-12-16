'use strict';
/*global $, table, chart, crowbar, console*/


var tableBox = function($el) {
  $('.js-y-axis-key').on('keyup', function(){
    table.y_axis_key = $(this).val();
    table.trigger('updated', table.read());
  });

  //Simply calls crowbar.js. Janky hack for now, but works. Need to fix Illustrator bugs
  $('.js-save-svg').on('click', function() {
    crowbar();
  });

  $('.js-y-axis-key').val(table.y_axis_key);

  $('.js-table', $el).handsontable({
    data: table.data,
    minCols: 15,
    minSpareCols: 1,
    minSpareRows: 1,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true,
    nativeScrollbars: false,
    afterChange: function() {
      table.trigger('updated', table.read());
      // jankyTable();
    }
  });

  // Janky hack to allow the bloated handsontable.js to be centered
  function jankyTable() {
    console.log('jankytable', $('.js-jankytable'));
    $('.js-jankytable').width($('.htCore').width());
  }
};



var chartCarousel = function($el) {
  table.on('updated', function(data){
    console.log('updated', data)
    // Data must be loaded before any rendering can occur
    chart.data.table_data = data.table_data;
    chart.data.y_axis_key = data.y_axis_key;
    draw();
  });

  $el.on('click', '.item:nth-child(2)', prepend);
  $el.on('click', '.item:nth-child(4)', append);

  function render(num) {
    return chart.render(chart.types.read(num));
  }

  function draw() {
    $el.children('.item:nth-child(2)').html(render(-1));
    $el.children('.item:nth-child(3)').html(render(0));
    $el.children('.item:nth-child(4)').html(render(1));
    $('.js-embed-box').text(render(0));
    console.log('draw done')
  }

  function prepend() {
    console.log('prepend')
    $el.prepend($el.children('.item:nth-child(5)').empty());
    chart.types.move(-1);
    $el.children('.item:nth-child(2)').html(render(-1));
    // $el.children('.item:nth-child(3)').html(render(0));
    // $el.children('.item:nth-child(4)').html(render(1));
    $('.js-embed-box').text(render(0));
    chart.trigger('type_change', chart.types.read(0));
    // window.location.hash = chart.types.read(0);
  }

  function append() {
    console.log('append')
    $el.append($el.children('.item:nth-child(1)').empty());
    chart.types.move(1);
    // $el.children('.item:nth-child(2)').html(render(-1));
    // $el.children('.item:nth-child(3)').html(render(0));
    $el.children('.item:nth-child(4)').html(render(1));
    $('.js-embed-box').text(render(0));
    chart.trigger('type_change', chart.types.read(0));
    // window.location.hash = chart.types.read(0);
  }
};