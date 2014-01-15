'use strict';
/*global $, utilities, _*/

function Table (template) {
  var self = $.observable(this);

  self.data = {
    table_data: template.data,
    y_axis_key: template.y_axis_key
  };
}



function ChartCarousel (templates, chosen) {
  var self = $.observable(this),
      start_index = _.findIndex(templates, {name: chosen});

  self.data = {};
  self.templates = new utilities.Loop(templates, start_index);

  self.load = function (data) {
    // Process the data for d3
    self.data = utilities.hotToD3(data.table_data, data.y_axis_key);
  };

  self.render = function (num) {
    var template_vars = {
        chart_data: JSON.stringify(self.data.chart_data),
        chart_id: 'chartable-' + utilities.generateUUID(),
        x_axis_key: self.data.x_axis_key,
        y_axis_key: self.data.y_axis_key
      };

    var rendered = $.render(self.templates.read(num).html, template_vars);
    return rendered;
  };
}



function Chart (templates, chosen) {
  var self = $.observable(this),
      start_index = _.findIndex(templates, {name: chosen});
      
  self.data = {};
  self.templates = new utilities.Loop(templates, start_index);

  self.load = function (data) {
    // Process the data for d3
    self.data = utilities.hotToD3(data.table_data, data.y_axis_key);
  };

  self.render = function (num) {
    var template_vars = {
        chart_data: JSON.stringify(self.data.chart_data),
        chart_id: 'chartable-' + utilities.generateUUID(),
        x_axis_key: self.data.x_axis_key,
        y_axis_key: self.data.y_axis_key
      };

    var rendered = $.render(self.templates.read(num).html, template_vars);
    return rendered;
  };
}
