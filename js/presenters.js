'use strict';
/*global $, table, chart, crowbar, console*/


var tableBox = function($el) {
  $('.js-y-axis-field', $el).on('keyup', function(){
    table.y_axis_key = $(this).val();
    table.trigger('updated', table.getData());
  });

  //Simply calls crowbar.js. Janky hack for now, but works. Need to fix Illustrator bugs
  $('.js-save-svg', $el).on('click', function() {
    crowbar();
  });

  $('.js-table', $el).handsontable({
    data: table.data,
    // minCols: 20,
    minSpareCols: 1,
    minSpareRows: 1,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true,
    nativeScrollbars: true,
    afterInit: function() {
      table.trigger('updated', table.read());
      jankyTable();
    },
    afterChange: function() {
      table.trigger('updated', table.read());
      jankyTable();
    }
  });

  // Janky hack to allow the bloated handsontable.js to be centered
  function jankyTable() {
    $('.js-jankytable', $el).width($('.htCore', $el).width());
  }
};



var chartCarousel = function($el, $embed_box) {
  console.log('chart carousel presenter init')
  table.on('updated', function(data){
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
    $embed_box.text(render(0));
    console.log('draw done')
  }

  function prepend() {
    $el.prepend($el.children('.item:nth-child(5)').empty());
    console.log(chart.types.move(-1));
    $el.children('.item:nth-child(2)').html(render(-1));
    // $el.children('.item:nth-child(3)').html(render(0));
    // $el.children('.item:nth-child(4)').html(render(1));
    $embed_box.text(render(0));
  }

  function append() {
    $el.append($el.children('.item:nth-child(1)').empty());
    console.log(chart.types.move(1));
    // $el.children('.item:nth-child(2)').html(render(-1));
    // $el.children('.item:nth-child(3)').html(render(0));
    $el.children('.item:nth-child(4)').html(render(1));
    $embed_box.text(render(0));
  }
};