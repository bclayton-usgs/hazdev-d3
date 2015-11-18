'use strict';

var D33dSubView = require('./D33dSubView'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {
  'className': 'D33dText',
  'coords': [0, 0, 0],
  'direction': null,
  'text': '',
  'textAnchor': 'start'
};


/**
 * Text to be plotted at a point in the view.
 *
 * @param options {Object}
 * @param options.className {String}
 *        default 'D33dText'.
 *        element class attribute value (may include spaces).
 * @param options.coords {Array<Number>}
 *        3d coordinates where text should be positioned.
 * @param options.text {String}
 *        text content.
 * @param options.textAnchor {String}
 *        default 'start'.
 *        svg text anchor.
 */
var D33dText = function (options) {
  var _this,
      _initialize;


  _this = D33dSubView(Util.extend({
    element: 'text'
  }, options));

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.model.set({
      className: options.className,
      coords: options.coords,
      direction: options.direction,
      text: options.text,
      textAnchor: options.textAnchor
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
      coords: _this.model.get('coords'),
      direction: _this.model.get('direction'),
      el: _this.el
    };
  };

  /**
   * Render everything except position.
   */
  _this.render = function (/*view*/) {
    _this.el.textContent = _this.model.get('text');
    _this.el.setAttribute('class', _this.model.get('className'));
    _this.el.setAttribute('text-anchor', _this.model.get('textAnchor'));
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D33dText;
