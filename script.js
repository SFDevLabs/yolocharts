'use strict';

//future db schema
//chart_id: {
//  chartData: [...],
//  units: "",
//  chart_type: ""
//}
//
//

/*global $, _, console, templates*/

var example = {
  data:[['Year', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'],
  ['2009', '0', '2941', '4303', '354', '5814'],
  ['2010', '5', '2905', '2867', '412', '5284'],
  ['2011', '4', '2517', '4822', '552', '6127'],
  ['2012', '2', '2422', '5399', '776', '4151'],
  [null, null, null, null, null, null]],
  y_axis_key: "Thousands Sold"
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

//eliminates any rows that contain only falsey values
function trimEmptyRows(input) {
  return _.filter(input, function(a) {
    return _.reduce(a, function(accumulator, value) {
      if (accumulator || value) return true;
      return false;
    });
  });
}

//compacts all arrays in array (one level)
function innerCompact(input) {
  var output = [];
  _.forEach(input, function(row) {
    output.push(_.compact(row));
  });
  return output;
}

function hotToD3(input, y_axis_key) {
  
  //clean out empty columns and rows
  var clean = innerCompact(trimEmptyRows(input)),
      //remove and store header row
      header = clean.splice(0, 1)[0],
      //remove and store x axis key
      x_axis_key = header.splice(0, 1)[0],
      //init output obj
      output = {
        data: [],
        x_axis_key: x_axis_key,
        y_axis_key: y_axis_key
      };

  _.forEach(clean, function(row){
    // get value of x-axis, per row
    var x_axis_value = row.splice(0, 1)[0];

    _.forEach(header, function(value, index){
      var doc = {};
      // match given keyname from header to value from row
      doc[x_axis_key] = x_axis_value;
      // since we removed the x-axis before, all other columns are assumed to be seperate series,
      // so we set 'series' as the label for that column from the header
      doc.series = value;
      // get the value from the row, and put it in the field corresponding to the units the user has chosen
      doc[y_axis_key] = row[index];
      output.data.push(doc);
    });
  });

  return output;
}


function Table(opts) {
  var self = $.observable(this);

  self.opts = opts;

  self.draw = function(example) {
    self.opts.table_box.handsontable({
      data: example.data,
      minSpareCols: 1,
      minSpareRows: 1,
      rowHeaders: false,
      colHeaders: false,
      contextMenu: true,
      afterRender: function() {
        self.trigger('updated', self.getData());
      }
    });
  };

  self.getData = function() {
    var instance = self.opts.table_box.handsontable('getInstance');
    return {
      table_data: instance.getData(),
      y_axis_key: self.opts.y_axis_key.val()
    };
  };
}


function Chart(opts) {
  var self = $.observable(this);

  self.settings = opts;

  self.draw = function(opts) {
    console.log(opts);
    var conversion = hotToD3(opts.table_data, opts.y_axis_key),
      template_vars = {
        chart_data: JSON.stringify(conversion.data),
        chart_id: 'chartable-' + generateUUID(),
        x_axis_key: conversion.x_axis_key,
        y_axis_key: conversion.y_axis_key
      };
    
    var rendered = $.render(self.settings.template, template_vars);

    self.settings.chart_box.html(rendered);
    self.settings.embed_box.text(rendered);
  };
}


function initEditor(hash) {
  // initialize table with its elements
  var table = new Table({
    table_box: $('#js-table'),
    y_axis_key: $('#js-units')
  });

  // initialize chart with its elements
  var chart = new Chart({
    template: templates.stacked_area,
    chart_box: $('#js-chart'),
    embed_box: $('#js-embed')
  });

  // debounced keypress
  var keypress = _.debounce(function(){
    table.trigger('updated', table.getData());
  }, 300);

  $('#js-table-settings').on('keyup', keypress);

  $('#js-save-svg').on('click', function() {
    crowbar();
  });

  // when table is updated, draw the chart with the right data
  table.on('updated', function(opts){
    chart.draw(opts);
  });

  // draw table with example data
  table.draw(example);
  
}


$.route(function(hash) {
  initEditor(hash);
});
