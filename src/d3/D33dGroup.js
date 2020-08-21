'use strict';

var D33dSubView = require('./D33dSubView'),
    Util = require('hazdev-webutils').util.Util;


var _DEFAULTS = {
  'className': 'D33dGroup',
  'coords': [0, 0, 0],
  'items': []
};


/**
 * Text to be plotted at a point in the view.
 *
 * @param options {Object}
 * @param options.className {String}
 *        default 'D33dGroup'.
 *        element class attribute value (may include spaces).
 * @param options.coords {Array<Number>}
 *        3d coordinates where text should be positioned.
 * @param options.items {Array<Object>}
 *        nested items.
 */
var D33dGroup = function (options) {
  var _this,
      _initialize;


  _this = D33dSubView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.model.set({
      className: options.className,
      coords: options.coords,
      items: options.items
    }, {silent: true});
  };

  /**
   * @return data for D33dView plotting.
   */
  _this.getData = function () {
    return {
      el: _this.el,
      items: _this.model.get('items').map(function (item) {
        return item.getData();
      })
    };
  };

  /**
   * Render everything except position.
   */
  _this.render = function (view) {
    _this.el.setAttribute('class', _this.model.get('className'));
    // render nested views
    _this.model.get('items').forEach(function (item) {
      item.render(view);
    });
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D33dGroup;
