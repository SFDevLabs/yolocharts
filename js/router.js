'use strict';
/*global templates, Chart, Table, _, $, tableBox, chartCarousel*/

var table,
    chart,
    hash = window.location.hash;

var trim_hash = hash.slice(1),
    chosen_template;

if (!templates[trim_hash]) {
  trim_hash = 'simple_area';
  window.location.hash = trim_hash;
}

chosen_template = templates[trim_hash];

table = new Table(chosen_template.data, chosen_template.y_axis_key);
chart = new Chart(templates, trim_hash);
chartCarousel($('#js-chart-carousel'), $('#js-embed-box'));
tableBox($('#js-table-box'));

chart.on('type_change', function(type) {
  window.location.hash = type;
});

// $.route(function(hash) {
//   console.log('ROUTE')
// });
