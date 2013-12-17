'use strict';
/*global templates, Chart, Table, _, $, tableBox, chartCarousel*/

var table,
    chart,
    hash = window.location.hash;

var trim_hash = hash.slice(1);

if (!templates[trim_hash]) {
  trim_hash = 'simple_area';
  window.location.hash = trim_hash;
}

var chosen_template = _.where(templates, { name: trim_hash })[0];

console.log('chosen_template trim_hash templates: ', chosen_template, trim_hash, templates)

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
