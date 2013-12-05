'use strict';

//future db schema
//chart_id: {
//  chartData: [...],
//  units: "",
//  chart_type: ""
//}
//
//

/*global $, _, console*/

var exampleData = [
  ["Year", "Maserati", "Mazda", "Mercedes", "Mini", "Mitsubishi"],
  ["2009", "0", "2941", "4303", "354", "5814"],
  ["2010", "5", "2905", "2867", "412", "5284"],
  ["2011", "4", "2517", "4822", "552", "6127"],
  ["2012", "2", "2422", "5399", "776", "4151"],
  [null, null, null, null, null, null]
];

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

function hotToD3(input, y_units) {
  //clean out empty columns and rows
  var clean = innerCompact(trimEmptyRows(input)),
      //remove and store header row
      header = clean.splice(0, 1)[0],
      //remove and store x axis key
      x_axis_key = header.splice(0, 1)[0],
      //init output array
      output = [];

  _.forEach(clean, function(row){
    // get value of x-axis, per row
    var x_axis_value = row.splice(0, 1)[0];

    _.forEach(header, function(value, index){
      var doc = {};
      // match given keyname from header to value from row
      doc[x_axis_key] = x_axis_value;
      // since we removed the x-axis before, all other columns are assumed to be seperate series,
      // so we set 'series' as the label for that column from the header
      doc['series'] = value;
      // get the value from the row, and put it in the field corresponding to the units the user has chosen
      doc[y_units] = row[index];
      output.push(doc);
    });
  });

  return output;
}


function Table(elements) {
  var self = $.observable(this);

  self.elements = elements;

  self.draw = function(data) {
    self.elements.table_box.handsontable({
      data: data,
      minRows: 20,
      minCols: 20,
      minSpareCols: 1,
      minSpareRows: 1,
      rowHeaders: false,
      colHeaders: false,
      contextMenu: true,
      afterChange: function() {
        self.trigger('updated', self.getData);
      }
    });
  };

  self.getData = function() {
    var instance = self.elements.table_box.handsontable('getInstance');
    return {
      table_data: instance.getData(),
      y_units: self.elements.units_field.val()
    };
  };
}


function Chart(elements) {
  var self = $.observable(this);

  self.elements = elements;

  self.draw = function(opts) {
    var data = hotToD3(opts.table_data, opts.y_units);

    self.elements.chart_box.replaceWith($.render(self.elements.template.text(), data));
    self.elements.embed_box.text($.render(self.elements.template.text(), data));
  };
}


function initEditor(hash) {
  // initialize table with its elements
  var table = new Table({
    table_box: $('#js-table'),
    units_field: $('#js-units')
  });

  // initialize chart with its elements
  var chart = new Chart({
    template: $('#' + hash + '_template'),
    chart_box: $('#js-chart'),
    embed_box: $('#js-embed')
  });

  // gets example data from dom el, stringifies, and draws table with it
  table.draw(JSON.parse($('#' + hash + '_data').text()));
  
  // when table is updated, draw the chart with the right data
  table.on('updated', function(opts){
    chart.draw(opts);
  });
}


$.route(function(hash) {
  initEditor(hash);
};
