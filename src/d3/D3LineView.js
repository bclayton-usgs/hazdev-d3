'use strict';

var d3 = require('d3'),
    ClassList = require('./ClassList'),
    D3SubView = require('d3/D3SubView'),
    Util = require('util/Util');


/**
 * Line view for a D3 plot.
 */
var D3LineView = function (options) {
  var _this,
      _initialize,
      // variables
      _el,
      _legend,
      _legendLine,
      _legendText,
      _line,
      _lineFormat,
      _view,
      _x,
      _y,
      // methods
      _getScaleX,
      _getScaleY,
      _getX,
      _getY;


  _this = D3SubView(options);

  /**
   * Initialize view.
   */
  _initialize = function (options) {
    _this.model.set(Util.extend({
      data: [],
      pointRadius: 5,
      showLine: true,
      showPoints: true
    }, options), {silent: true});

    ClassList.polyfill(_this.el);
    _this.el.classList.add('D3LineView');
    _el = d3.select(_this.el);

    _legend = d3.select(_this.legend);
    if (_legend) {
      _this.legend.classList.add('D3LineView');
      _legendLine = _legend.append('path')
          .attr('class', 'line');
      _legendText = _legend.append('text')
          .attr('class', 'text');
    } else {
      _legendLine = null;
      _legendText = null;
    }

    _line = _el.append('path')
        .attr('class', 'line')
        .attr('clip-path', 'url(#plotAreaClip)');

    _lineFormat = options.lineFormat || d3.svg.line();
    _lineFormat.x(_getScaleX);
    _lineFormat.y(_getScaleY);
  };

  /**
   * Convert a data coordinate to a plot coordinate.
   *
   * @param d {Array<Number>}
   *        data point.
   * @return {Number} x plot coordinate.
   */
  _getScaleX = function (d) {
    return _x(d[0]);
  };

  /**
   * Convert a data coordinate to a plot coordinate.
   *
   * @param d {Array<Number>}
   *        data point.
   * @return {Number} y plot coordinate.
   */
  _getScaleY = function (d) {
    return _y(d[1]);
  };

  /**
   * Convert an x data coordinate from a data object.
   *
   * @param d {Array<Number>}
   *        data point.
   * @return {Number} x plot coordinate.
   */
  _getX = function (d) {
    return d[0];
  };

  /**
   * Get a y data coordinate from a data object.
   *
   * @param d {Array<Number>}
   *        data point.
   * @return {Number} y plot coordinate.
   */
  _getY = function (d) {
    return d[1];
  };

  /**
   * Destroy view.
   */
  _this.destroy = Util.compose(function () {
    var points;

    if (_el) {
      // remove point event listeners
      points = _el.selectAll('.point')
          .on('mouseout', null)
          .on('mouseover', null);
      _el = null;
    }

    if (_legend) {
      _legendLine = null;
      _legendText = null;
    }

    _line = null;
    _lineFormat = null;

    _view = null;
    _x = null;
    _y = null;
    _this = null;
  }, _this.destroy);

  /**
   * X extent for view.
   *
   * @return {Array<Number>}
   *         x extent for view.
   */
  _this.getXExtent = function () {
    return d3.extent(_this.model.get('data'), _getX);
  };

  /**
   * Y extent for view.
   *
   * @return {Array<Number>}
   *         y extent for view.
   */
  _this.getYExtent = function () {
    return d3.extent(_this.model.get('data'), _getY);
  };

  /**
   * Point mouseout event handler.
   */
  _this.onPointOut = function () {
    var point;

    point = d3.event.target;
    point.classList.remove('mouseover');

    // clear previous tooltip
    _view.showTooltip(null, null);
  };

  /**
   * Point mouseover event handler.
   *
   * @param coords {Array<Number>}
   *        x, y coordinate of point.
   */
  _this.onPointOver = function (coords) {
    var point;

    point = d3.event.target;
    point.classList.add('mouseover');

    _view.showTooltip(coords, [
      {text: _this.model.get('label')},
      [
        {class: 'label', text: _this.model.get('xLabel') + ': '},
        {class: 'value', text: coords[0]}
      ],
      [
        {class: 'label', text: _this.model.get('yLabel') + ': '},
        {class: 'value', text: coords[1]}
      ]
    ]);
  };

  /**
   * Render sub view.
   * Element has already been attached to view.
   *
   * @param view {D3View}
   *        view where sub view is plotted.
   */
  _this.render = function (view) {
    var data,
        points;

    _view = view;
    _x = view.model.get('xAxisScale');
    _y = view.model.get('yAxisScale');

    // update legend
    if (_legend) {
      _legendLine.attr('d', 'M0,0L25,0');
      _legendText.text(_this.model.get('label')).attr('dx', 30);
    }

    data = _this.model.get('data');

    // update line
    if (!_this.model.get('showLine')) {
      _line.attr('d', null);
    } else {
      _line.attr('d', _lineFormat(data));
    }

    // update points
    points = _el.selectAll('.point')
        .data(data);
    if (!_this.model.get('showPoints')) {
      points.remove();
    } else {
      points.enter()
          .append('svg:circle')
          .attr('class', 'point')
          .on('mouseout', _this.onPointOut)
          .on('mouseover', _this.onPointOver);
      points.attr('r', _this.model.get('pointRadius'))
          .attr('cx', _getScaleX)
          .attr('cy', _getScaleY);
      points.exit()
          .on('mouseout', null)
          .on('mouseover', null)
          .remove();
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3LineView;
