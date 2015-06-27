'use strict';

var d3 = require('d3'),
    ClassList = require('./ClassList'),
    Util = require('util/Util'),
    View = require('mvc/View');


var ID_SEQUENCE = 0;


/**
 * Sub view for a D3 plot.
 *
 * Manages mouseover, mouseout, click events for view.
 * mouseover and mouseout toggle a "mouseover" class on view.
 * click triggers "click" event.
 *
 * When added to a D3View, "click" event triggers "select" in collection.
 * D3View calls onSelect, onDeselect methods when collection selection changes.
 *
 * Subclasses should override at least getXExtent(), getYExtent(), render(view).
 *
 * @param options {Object}
 *        all options are passed to View.
 * @param options.el {SVGElement}
 *        default svg:g.
 * @param options.legend {SVGElement}
 *        default svg:g.
 *        set to null for no legend.
 * @param options.className {String}
 *        default null.
 *        class added to el and legend.
 */
var D3SubView = function (options) {
  var _this,
      _initialize,
      // variables
      _el,
      _legend;


  _this = View(Util.extend({
    el: document.createElementNS('http://www.w3.org/2000/svg', 'g'),
  }, options));

  /**
   * Initialize view.
   */
  _initialize = function (options) {
    options = Util.extend({
      className: null,
      legend: document.createElementNS('http://www.w3.org/2000/svg', 'g')
    }, options);

    // ensure views have a unique id
    _this.id = options.id || (ID_SEQUENCE++);

    // reference to view from element
    _this.el.view = _this;

    ClassList.polyfill(_this.el);
    _el = d3.select(_this.el);
    _el.on('click', _this.onClick);
    _el.on('mouseout', _this.onMouseOut);
    _el.on('mouseover', _this.onMouseOver);

    _this.legend = options.legend;
    if (_this.legend) {
      ClassList.polyfill(_this.legend);
      _legend = d3.select(_this.legend);
      _legend.on('click', _this.onClick);
      _legend.on('mouseout', _this.onMouseOut);
      _legend.on('mouseover', _this.onMouseOver);
    }

    if (options.className) {
      _this.el.classList.add(options.className);
      if (_this.legend) {
        _this.legend.classList.add(options.className);
      }
    }
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
    if (_this.legend) {
      _legend.on('click', null);
      _legend.on('mouseout', null);
      _legend.on('mouseover', null);
      _legend = null;
    }

    _this.el.view = null;
    _this = null;
  }, _this.destroy);

  /**
   * X extent for view.
   *
   * @return {Array<Number>}
   *         x extent for view.
   */
  _this.getXExtent = function () {
    return [];
  };

  /**
   * Y extent for view.
   *
   * @return {Array<Number>}
   *         y extent for view.
   */
  _this.getYExtent = function () {
    return [];
  };

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
    if (_this.legend) {
      _this.legend.classList.remove('selected');
    }
  };

  /**
   * Mouseout event handler.
   */
  _this.onMouseOut = function () {
    _this.el.classList.remove('mouseover');
    if (_this.legend) {
      _this.legend.classList.remove('mouseover');
    }
  };

  /**
   * Mouseover event handler.
   */
  _this.onMouseOver = function () {
    _this.el.classList.add('mouseover');
    if (_this.legend) {
      _this.legend.classList.add('mouseover');
    }
  };

  /**
   * Select event handler.
   */
  _this.onSelect = function () {
    _this.el.classList.add('selected');
    if (_this.legend) {
      _this.legend.classList.add('selected');
    }
  };

  /**
   * Render sub view.
   * Element has already been attached to view.
   *
   * @param view {D3View}
   *        view where sub view is plotted.
   */
  _this.render = function (/*view*/) {
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3SubView;
