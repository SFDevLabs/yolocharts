'use strict';
/*global templates, Chart, Table, _, $, tableBox, chartCarousel*/

var input,
    chart,
    hash = window.location.hash;

var trim_hash = hash.slice(1);

// if (!templates[trim_hash]) {
//   trim_hash = 'simple_area';
//   window.location.hash = trim_hash;
// }

// var chosen_template = _.where(templates, { name: trim_hash })[0];

input = new Input();
// chart = new Chart(templates, trim_hash);
previewBox($('#js-preview-box'));
inputBox($('#js-input-box'));

// chart.on('type_change', function(type) {
//   window.location.hash = type;
// });
