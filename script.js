'use strict';

/*global $, _, console, templates*/



function Oroborus(array, index) {
  var self = this;
  // What index is the Oroborus at?
  self.index = index;
  self.array = array;
  
  // Oroborus.walk() accepts a positive or negative integer and increments and decrements the index accordingly.
  // The incrementing and decrementing wrap around, so that the array is circular.
  // It returns the element of `array` at the new `index`
  // If the `skip` arg is true, the `index` is not altered.
  self.walk = function(num, skip) {

    // Set `temp` counter to keep from altering the `index` if desired
    var temp = self.index;
    // Repeat the absolute number of times
    for (var i = 0; i < Math.abs(num); i++) {

      // If num is positive, increment each time or go back to zero
      if (num > 0) self.array[++temp] || self.array[(temp = 0)]; // Sorry, Crockford
      // If num is negative, decrement each time or go to end of array
      if (num < 0) self.array[--temp] || self.array[(temp = self.array.length - 1)];
    }

    // If `skip` argument is false, change `index`
    if (!skip) self.index = temp;
    return self.array[temp];
  };

  // Convenience function
  self.seek = function(move, skip) {
    self.walk(move);
    return self.walk(skip, true);
  };
}


// This generates a unique ID. Got it off stackoverflow.
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




function Table(data, y_axis_key) {
  var self = $.observable(this);

  self.data = data;
  self.y_axis_key = y_axis_key;

  self.read = function() {
    return {
      table_data: self.data,
      y_axis_key: self.y_axis_key
    };
  };
}


function Chart(types, chosen) {
  var self = $.observable(this),
      index = _.indexOf(types, chosen);

  self.types = new Oroborus(types, index);

  self.render = function(chart_type) {
    // Processes the data for d3
    var conversion = hotToD3(self.data.table_data, self.data.y_axis_key),
      template_vars = {
        chart_data: JSON.stringify(conversion.data),
        chart_id: 'chartable-' + generateUUID(),
        x_axis_key: conversion.x_axis_key,
        y_axis_key: conversion.y_axis_key
      };
    
    return $.render(templates[chart_type], template_vars);
  };
}



var table,
    chart,
    chart_types = _.keys(templates);

$.route(function(hash) {
  var trim_hash = hash.slice(1),
      chosen_template = templates[trim_hash];

  table = new Table(chosen_template.data, chosen_template.y_axis_key);
  chart = new Chart(chart_types, trim_hash);
  tableBox($('#js-table-box'));
  chartCarousel($('#js-chart-carousel'), $('#js-embed-box'));
});



tableBox = function($el) {
  $('.js-y-axis-field', $el).on('keyup', function(){
    table.y_axis_key = $(this).val()
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



chartCarousel = function($el, $embed_box) {
  table.on('updated', function(data){
    // Data must be loaded before any rendering can occur
    chart.data = data;
    draw();
  });

  $el.on('click', ':nth-child(2)', prepend);
  $el.on('click', ':nth-child(4)', append);

  function render(move, skip) {
    return chart.render(chart.types.seek(move, skip));
  }

  function draw() {
    $el.children(':nth-child(2)').html(render(0, -1));
    $el.children(':nth-child(3)').html(render(0, 0));
    $el.children(':nth-child(4)').html(render(0, 1));
    $embed_box.text(render(0, 0));
  }

  function prepend() {
    $el.prepend($el.children().last().empty());
    $el.children(':nth-child(2)').html(render(-1, -1));
    $embed_box.text(render(0, 0));
  }

  function append() {
    $el.append($el.children().first().empty());
    $el.children(':nth-child(4)').html(render(1, 1));
    $embed_box.text(render(0, 0));
  }
};
