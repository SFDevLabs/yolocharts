'use strict';
/*global describe, it, beforeEach, expect, utilities, Chart, Table*/

describe('The Chart model', function() {

  var templates, chart;
  
  utilities.generateUUID = function(){
    return 'UUID';
  };
  
  templates = [
    {
      name: 'test0',
      html: '{{ chart_id }} {{ chart_data }} {{ x_axis_key }} {{ y_axis_key }}',
      table_data: [
        ['x-axis', 'foo', 'bar'],
        ['2000', '23', '45'],
        ['2001', '32', '54']
      ],
      y_axis_key: 'y-axis'
    },
    {
      name: 'test1',
      html: '{{ chart_id }} {{ chart_data }} {{ x_axis_key }} {{ y_axis_key }}',
      table_data: [
        ['x-axis', 'foo', 'bar'],
        ['2000', '23', '45'],
        ['2001', '32', '54']
      ],
      y_axis_key: 'y-axis'
    },
    {
      name: 'test2',
      html: '{{ chart_id }} {{ chart_data }} {{ x_axis_key }} {{ y_axis_key }}',
      table_data: [
        ['x-axis', 'foo', 'bar'],
        ['2000', '23', '45'],
        ['2001', '32', '54']
      ],
      y_axis_key: 'y-axis'
    }
  ];

  it('initializes correctly', function(){
    chart = new Chart(templates, 'test1');
    expect(chart.templates.read(0).name).toEqual('test1');
  });

  it('moves and reads correctly', function(){
    chart = new Chart(templates, 'test0');
    expect(chart.templates.move(2).name).toEqual('test2');
    expect(chart.templates.read(-2).name).toEqual('test0');
    expect(chart.templates.read(0).name).toEqual('test2');
  });
  
  it('loads and processes table data', function(){
    chart = new Chart(templates, 'test0');
    chart.load({table_data: templates[0].table_data, y_axis_key: templates[0].y_axis_key});
    expect(chart.data).toEqual({
      chart_data: [
        {'x-axis':'2000','series':'foo','y-axis':'23'},
        {'x-axis':'2000','series':'bar','y-axis':'45'},
        {'x-axis':'2001','series':'foo','y-axis':'32'},
        {'x-axis':'2001','series':'bar','y-axis':'54'}
      ],
      x_axis_key: 'x-axis',
      y_axis_key: 'y-axis'
    });
  });

  it('renders correctly', function(){
    chart = new Chart(templates, 'test0');
    chart.data = {
      chart_data: [0,1,2,3],
      x_axis_key: 'x_axis_key',
      y_axis_key: 'y_axis_key'
    };
    expect(chart.render(0)).toEqual('chartable-UUID [0,1,2,3] x_axis_key y_axis_key');
  });
});