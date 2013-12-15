/*
  Riot js templating modified to work well for js code
 */
(function() {

  // Precompiled templates (JavaScript functions)
  var FN = {};

  // Render a template with data
  $.render = function(template, data) {
    console.log('render.js template, data: ', template, data)
    return !template ? '' : (FN[template] = FN[template] || new Function("_",
      "return '" + template
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/'/g, "\\'")
        .replace(/\{\{\s*(\w+)\s*\}\}/g, "'+(_.$1?(_.$1+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):(_.$1===0?0:''))+'") +
      "'"
    ))(data);
  }

})()

// removed escaping
// .replace(/\"/g,'&quot;')