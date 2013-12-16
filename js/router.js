'use strict';
/*global templates, Chart, Table, _, $, tableBox, chartCarousel*/

var table,
    chart,
    chart_types = _.keys(templates);

$.route(function(hash) {
  var trim_hash = hash.slice(1),
      chosen_template = templates[trim_hash];

  table = new Table(chosen_template.data, chosen_template.y_axis_key);
  chart = new Chart(chart_types, trim_hash);
  chartCarousel($('#js-chart-carousel'), $('#js-embed-box'));
  tableBox($('#js-table-box'));
});