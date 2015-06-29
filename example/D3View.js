'use strict';

var D3LineView = require('d3/D3LineView'),
    D3View = require('d3/D3View');


var line,
    view;

view = D3View({
  el: document.querySelector('#example'),
  title: 'D3View Example',
  xLabel: 'X Axis',
  yLabel: 'Y Axis',
  xAxisPadding: 0.1,
  yAxisPadding: 0.1
});

line = D3LineView({
  data: [[1,0], [2,2], [3,0]],
  label: 'Line 1',
  xLabel: 'X',
  yLabel: 'Y',
  view: view
});
view.views.add(line);

line = D3LineView({
  data: [[1,3], [2,1], [3,2]],
  label: 'Line 2',
  xLabel: 'X',
  yLabel: 'Y',
  view: view
});
view.views.add(line);
