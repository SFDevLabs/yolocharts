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
    // Data must be loaded into model before any rendering can occur
    chart.load(data);
    chart.trigger('dom_init');
  });

  $el.on('click', '.item:nth-child(2)', chart.trigger('prepend'));
  $el.on('click', '.item:nth-child(4)', chart.trigger('append'));

  //Usually the first draw after page load
  chart.on('dom_init', function() {
    $el.children('.item:nth-child(2)').html(chart.render(-1));
    $el.children('.item:nth-child(3)').html(chart.render(0));
    $el.children('.item:nth-child(4)').html(chart.render(1));
    $('.js-embed-box').text(chart.render(0));
  });

  //Moving the carousel right
  chart.on('prepend', function() {
    $el.prepend($el.children('.item:nth-child(5)').empty());
    chart.templates.move(-1);
    $el.children('.item:nth-child(2)').html(chart.render(-1));
    $('.js-embed-box').text(chart.render(0));
    chart.trigger('type_change', chart.templates.read(0));
  });

  //Moving the carousel left
  chart.on('append', function() {
    $el.append($el.children('.item:nth-child(1)').empty());
    chart.templates.move(1);
    $el.children('.item:nth-child(4)').html(chart.render(1));
    $('.js-embed-box').text(chart.render(0));
    chart.trigger('type_change', chart.templates.read(0));
  });
};