'use strict';
/*global _*/

var utilities = {

  Loop: function(array, index) {
    var self = this;
    // What index is the Loop at?
    self.index = index;
    self.array = array;
    
    // Loop.walk() accepts a positive or negative integer and increments and decrements the index accordingly.
    // The incrementing and decrementing wrap around, so that the array is circular.
    // It returns the element of `array` at the new `index`
    // If the `shift` arg is true, the `index` is not altered.
    self.walk = function(num, shift) {

      // Set `temp` counter to keep from altering the `index` if desired
      var temp = self.index;
      // Repeat the absolute number of times
      for (var i = 0; i < Math.abs(num); i++) {
        // If num is positive, increment each time or go back to zero
        if (num > 0) self.array[++temp] || self.array[(temp = 0)];
        // If num is negative, decrement each time or go to end of array
        if (num < 0) self.array[--temp] || self.array[(temp = self.array.length - 1)];
      }

      // If `shift` argument is true, change `index`
      if (shift) self.index = temp;
      return self.array[temp];
    };
    
    self.move = function (num) {
      return self.walk(num, true);
    };

    self.read = function (num) {
      var ret = self.walk(num, false);
      return ret;
    };
  },


  // This generates a unique ID. Got it off stackoverflow.
  generateUUID: function() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
  },

  //eliminates any rows that contain only falsey values
  trimEmptyRows: function(input) {
    return _.filter(input, function(a) {
      return _.reduce(a, function(accumulator, value) {
        if (accumulator || value) return true;
        return false;
      });
    });
  },

  //compacts all arrays in array (one level)
  innerCompact: function(input) {
    var output = [];
    _.forEach(input, function(row) {
      output.push(_.compact(row));
    });
    return output;
  },

  hotToD3: function(input, y_axis_key) {
    //clean out empty columns and rows
    var clean = this.innerCompact(this.trimEmptyRows(input)),
        //remove and store header row
        header = clean.splice(0, 1)[0],
        //remove and store x axis key
        x_axis_key = header.splice(0, 1)[0],
        //init output obj
        output = {
          chart_data: [],
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
        output.chart_data.push(doc);
      });
    });

    return output;
  }

};