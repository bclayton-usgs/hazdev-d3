'use strict';

var D3SubView = require('d3/D3SubView');


/**
 * Line view for a D3 plot.
 */
var D3LineView = function (options) {
  var _this,
      _initialize;


  _this = D3SubView(options);

  _initialize = function (/*options*/) {
    _this.el.innerHTML = 'D3LineView';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3LineView;
