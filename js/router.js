'use strict';
/*global templates, Chart, Table, _, $, tableBox, chartCarousel*/

var table,
    chart,
    hash = window.location.hash;

var trim_hash = hash.slice(1);

// conssole.log(trim_hash)

// if (!templates[trim_hash]) {
//   trim_hash = 'simple_area';
//   window.location.hash = trim_hash;
// }

var chosen_template = _.where(templates, { name: trim_hash })[0];

table = new Table(chosen_template);
chart = new Chart(templates, trim_hash);

chartBox($('#js-chart-box'), $('#js-embed-box'));
tableBox($('#js-table-box'));

chart.on('type_change', function(type) {
  window.location.hash = type;
});




// // Instance the tour
// var tour = new Tour();

// // Add your steps. Not too many, you don't really want to get your users sleepy
// tour.addSteps([
//   {
//     element: '#js-table-box', // string (jQuery selector) - html element next to which the step popover should be shown
//     title: 'Insert data', // string - title of the popover
//     placement: 'top',
//     backdrop: false,
//     content: 'Put your data here. You can paste from Excel or Google Docs.' // string - content of the popover
//   }
// ]);

// // Initialize the tour
// tour.init();

// // Start the tour
// tour.start();

