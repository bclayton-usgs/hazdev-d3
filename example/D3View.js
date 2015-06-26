'use strict';

var D3LineView = require('d3/D3LineView'),
    D3View = require('d3/D3View');


var line,
    view;

view = D3View({
  el: document.querySelector('#example'),
  title: 'D3 View Example',
  xLabel: 'X axis',
  yLabel: 'Y Axis'
});

line = D3LineView({
  data: [[1,0], [2,2], [3,0]],
  label: 'D3 Line',
  xLabel: 'X',
  yLabel: 'Y'
});
view.views.add(line);

line = D3LineView({
  data: [[1,3], [2,1], [3,2]],
  label: 'D3 Line',
  xLabel: 'X',
  yLabel: 'Y'
});
view.views.add(line);
