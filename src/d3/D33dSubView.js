'use strict';

var d3 = require('d3'),
    ClassList = require('./ClassList'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {
  element: 'g',
  elementNamespace: 'http://www.w3.org/2000/svg',
  id: null
};

var _ID_SEQUENCE = 0;


/**
 * Sub view for a D3 plot.
 *
 * Manages mouseover, mouseout, click events for view.
 * mouseover and mouseout toggle a "mouseover" class on view.
 * click triggers "click" event.
 *
 * When added to a D3BaseView, "click" event triggers "select" in collection.
 * D3BaseView calls onSelect, onDeselect methods when collection selection
 * changes.
 *
 * @param options {Object}
 *        all options are passed to View.
 */
var D33dSubView = function (options) {
  var _this,
      _initialize,
      // variables
      _el;


  _this = View(Util.extend({
    // View will not create an element if any "el" property is specified.
    // Do this so an element is only created if not configured.
    el: null
  }, options));

  /**
   * Initialize view.
   */
  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    // ensure views have a unique id
    _this.id = options.id || (_ID_SEQUENCE++);

    if (_this.el === null) {
      _this.el = document.createElementNS(
          options.elementNamespace,
          options.element);
    }

    // reference to view from element
    _this.el.view = _this;

    ClassList.polyfill(_this.el);
    _el = d3.select(_this.el);
    _el.on('click', _this.onClick);
    _el.on('mouseout', _this.onMouseOut);
    _el.on('mouseover', _this.onMouseOver);
  };

  /**
   * Destroy view.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      // already destroyed
      return;
    }

    if (_el) {
      _el.on('click', null);
      _el.on('mouseout', null);
      _el.on('mouseover', null);
      _el = null;
    }

    _this.el.view = null;
    _this = null;
  }, _this.destroy);

  /**
   * Click event handler.
   */
  _this.onClick = function () {
    _this.trigger('click');
  };

  /**
   * Deselect event handler.
   */
  _this.onDeselect = function () {
    _this.el.classList.remove('selected');
  };

  /**
   * Mouseout event handler.
   */
  _this.onMouseOut = function () {
    _this.el.classList.remove('mouseover');
  };

  /**
   * Mouseover event handler.
   */
  _this.onMouseOver = function () {
    _this.el.classList.add('mouseover');
  };

  /**
   * Select event handler.
   */
  _this.onSelect = function () {
    _this.el.classList.add('selected');
  };

  /**
   * Get plotting data for D33dView.
   *
   * @return {Object}
   *         el - view element
   *         when el is a SVG "g" element
   *             items {Array<Object>}
   *                 items within group
   *         when el is a SVG "text" element
   *             coords {Array<Number>}
   *                 coordinates for text anchor point.
   *         when el is a SVG "path" element
   *             close {Boolean}
   *                 default true
   *             coords {Array<Array<Number>>}
   *                 array of path coordinates.
   */
  _this.getData = function () {
    throw new Error('D33dSubView.getData not implemented');
  };

  /**
   * Render sub view.
   * Update all view attributes except coordinates (updated by D33dView).
   */
  _this.render = function () {
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D33dSubView;
