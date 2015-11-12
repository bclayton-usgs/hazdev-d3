'use strict';

var Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {
  className: 'D33dPath',
  close: true,
  coords: []
};


/**
 * Class info and constructor parameters.
 */
var D33dPath = function (options) {
  var _this,
      _initialize;


  _this = View(Util.extend({
    // View will not create an element if any "el" property is specified.
    // Do this so an element is only created if not configured.
    el: null
  }, options));

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    if (_this.el === null) {
      _this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }

    _this.model.set({
      className: options.className,
      close: options.close,
      coords: options.coords
    }, {silent: true});
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * @return data for D33dView plotting.
   */
  _this.getData = function () {
    return {
      close: _this.model.get('close'),
      coords: _this.model.get('coords'),
      el: _this.el
    };
  };

  /**
   * Render everything except coordinates.
   */
  _this.render = function (/*view*/) {
    _this.el.setAttribute('class', _this.model.get('className'));
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D33dPath;
