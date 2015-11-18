'use strict';

var Util = require('util/Util'),
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


  _this = View(Util.extend({
    // View will not create an element if any "el" property is specified.
    // Do this so an element is only created if not configured.
    el: null
  }, options));

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    if (_this.el === null) {
      _this.el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    }

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
