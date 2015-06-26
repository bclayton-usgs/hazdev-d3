'use strict';

var View = require('mvc/View');


/**
 * Sub view for a D3 plot.
 */
var D3SubView = function (options) {
  var _this,
      _initialize;


  _this = View(options);

  _initialize = function (/*options*/) {
    _this.el.innerHTML = 'D3SubView';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3SubView;
