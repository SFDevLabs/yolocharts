'use strict';
/*global $, utilities, _*/

function Table(data, y_axis_key) {
  var self = $.observable(this);

  self.data = data;
  self.y_axis_key = y_axis_key;

  self.read = function() {
    var ret = {
      table_data: self.data,
      y_axis_key: self.y_axis_key
    };
    return ret;
  };
}


function Chart(templates, chosen) {
  var self = $.observable(this),
      start_index = _.findIndex(templates, {name: chosen});

  self.data = {};
  self.templates = new utilities.Loop(templates, start_index);

  // self.init = function(){
  //   console.log('start index ', start_index);
  //   // Start template loop in right place
  //   self.templates.move(start_index);
  // };

  self.load = function(data) {
    // Process the data for d3
    self.data = utilities.hotToD3(data.table_data, data.y_axis_key);
  };

  self.render = function(num) {
    var template_vars = {
        chart_data: JSON.stringify(self.data.chart_data),
        chart_id: 'chartable-' + utilities.generateUUID(),
        x_axis_key: self.data.x_axis_key,
        y_axis_key: self.data.y_axis_key
      };

    var rendered = $.render(self.templates.read(num).html, template_vars);
    return rendered;
  };

  // self.init();
}