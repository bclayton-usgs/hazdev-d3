'use strict';

var View = require('mvc/View');


/**
 * View for a D3 plot.
 */
var D3View = function (options) {
  var _this,
      _initialize;


  _this = View(options);

  _initialize = function (/*options*/) {
    _this.el.innerHTML = 'D3View';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3View;
