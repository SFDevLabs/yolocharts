'use strict';
/*global $, utilities, templates, _*/

function Table(data, y_axis_key) {
  var self = $.observable(this);

  self.data = data;
  self.y_axis_key = y_axis_key;

  self.read = function() {
    var ret = {
      table_data: self.data,
      y_axis_key: self.y_axis_key
    };
    console.log('table.read', ret);
    return ret;
  };
}


function Chart(types, chosen) {
  var self = $.observable(this),
      index = _.indexOf(types, chosen);

  self.data = {};
  self.types = new utilities.Oroborus(types, index);

  self.render = function(chart_type) {
    // Processes the data for d3
    var conversion = utilities.hotToD3(self.data.table_data, self.data.y_axis_key),
      template_vars = {
        chart_data: JSON.stringify(conversion.data),
        chart_id: 'chartable-' + utilities.generateUUID(),
        x_axis_key: conversion.x_axis_key,
        y_axis_key: conversion.y_axis_key
      };
    
    return $.render(templates[chart_type].template, template_vars);
  };
}