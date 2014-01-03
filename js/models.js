'use strict';
/*global $, utilities, _, Firebase, FirebaseSimpleLogin */

// var fb = new Firebase('https://datafiddle.firebaseio.com');
// var auth = new FirebaseSimpleLogin(fb, function(error, user) {
//   if (error) {
//     // an error occurred while attempting login
//     console.log(error);
//   } else if (user) {
//     // user authenticated with Firebase
//     console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
//   } else {
//     // user is logged out
//   }
// });


function Input (fiddle) {
  var self = $.observable(this);

  var empty_fiddle = {
    table_data: [[],[],[],[],[],[],[],[],[]],
    html: '',
    css: '',
    js: ''
  };

  // var fiddle = fiddle || empty_fiddle;

  // console.log(fiddle)

  // Initialize with data on page load
  self.data = fiddle || empty_fiddle;
}

// function Chart (fiddle) {
//   var self = $.observable(this);
//       // start_index = _.findIndex(templates, {name: chosen});

//   self.data = {};
//   // self.templates = new utilities.Loop(templates, start_index);

//   // self.load = function(data) {
//   //   // Process the data for d3
//   //   self.data = utilities.hotToD3(data.table_data, data.y_axis_key);
//   // };

//   // self.render = function(num) {
//   //   var template_vars = {
//   //       chart_data: JSON.stringify(self.data.chart_data),
//   //       chart_id: 'chartable-' + utilities.generateUUID(),
//   //       x_axis_key: self.data.x_axis_key,
//   //       y_axis_key: self.data.y_axis_key
//   //     };

//   //   var rendered = $.render(self.templates.read(num).html, template_vars);
//   //   return rendered;
//   // };
// }