'use strict';

var d3 = require('d3'),
    ClassList = require('./ClassList'),
    D3SubView = require('d3/D3SubView'),
    Util = require('util/Util');


/**
 * Line view for a D3 plot.
 *
 * @param options {Object}
 *        options are passed to D3SubView.
 * @param options.data {Array<Array<Number>>}
 *        default [].
 *        array of arrays of x, y coordinates:
 *        [ [x0, y0], [x1, y1], ... ]
 * @param lineFormat {D3 Line}
 *        default d3.svg.line().
 * @param pointRadius {Number}
 *        default 5.
 *        radius for points.
 * @param showLine {Boolean}
 *        default true.
 *        whether to plot line.
 * @param showPoints {Boolean}
 *        default true.
 *        whether to plot points.
 */
var D3LineView = function (options) {
  var _this,
      _initialize,
      // variables
      _el,
      _legend,
      _legendLine,
      _legendPoint,
      _legendText,
      _line,
      _lineFormat,
      _x,
      _y,
      // methods
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
      showPoints: true,
      showLegendPoint: true,
    }, options, _this.model.get()), {silent: true});

    ClassList.polyfill(_this.el);
    _this.el.classList.add('D3LineView');
    _el = d3.select(_this.el);

    if (_this.legend) {
      ClassList.polyfill(_this.legend);
      _this.legend.classList.add('D3LineView');
      _legend = d3.select(_this.legend);
      _legendLine = _legend.append('path')
          .attr('class', 'line');
      _legendText = _legend.append('text')
          .attr('class', 'text');
    } else {
      _legend = null;
      _legendLine = null;
      _legendText = null;
    }

    _line = _el.append('path')
        .attr('class', 'line')
        .attr('clip-path', 'url(#plotAreaClip)');

    _lineFormat = options.lineFormat || d3.svg.line();
    _lineFormat.x(_this.getScaleX);
    _lineFormat.y(_this.getScaleY);
  };

  /**
   * Convert a data coordinate to a plot coordinate.
   *
   * @param d {Array<Number>}
   *        data point.
   * @return {Number} x plot coordinate.
   */
  _this.getScaleX = function (d) {
    return _x(d[0]);
  };

  /**
   * Convert a data coordinate to a plot coordinate.
   *
   * @param d {Array<Number>}
   *        data point.
   * @return {Number} y plot coordinate.
   */
  _this.getScaleY = function (d) {
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

    _x = null;
    _y = null;
    _this = null;
  }, _this.destroy);

  /**
   * Format x value for tooltip.
   *
   * @param x {Number}
   *        value to format.
   * @return {String}
   *         formatted number.
   */
  _this.formatX = function (x) {
    return x;
  };

  /**
   * Format y value for tooltip.
   *
   * @param y {Number}
   *        value to format.
   * @return {String}
   *         formatted number.
   */
  _this.formatY = function (y) {
    return y;
  };

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
    ClassList.polyfill(point);
    point.classList.remove('mouseover');

    // clear previous tooltip
    _this.view.showTooltip(null, null);
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
    ClassList.polyfill(point);
    point.classList.add('mouseover');

    _this.view.showTooltip(coords, [
      {text: _this.model.get('label')},
      [
        {class: 'label', text: _this.view.model.get('xLabel') + ': '},
        {class: 'value', text: _this.formatX(_getX(coords))}
      ],
      [
        {class: 'label', text: _this.view.model.get('yLabel') + ': '},
        {class: 'value', text: _this.formatY(_getY(coords))}
      ]
    ]);
  };

  _this.plotPoints = function (points) {
    points.enter()
        .append('svg:circle')
        .attr('class', 'point')
        .on('mouseout', _this.onPointOut)
        .on('mouseover', _this.onPointOver);

    points.attr('r', _this.model.get('pointRadius'))
        .attr('cx', _this.getScaleX)
        .attr('cy', _this.getScaleY);

    points.exit()
        .on('mouseout', null)
        .on('mouseover', null)
        .remove();
  };

  /**
   * Render sub view.
   * Element has already been attached to view.
   */
  _this.render = function () {
    var data,
        points;

    data = _this.model.get('data');
    _x = _this.view.model.get('xAxisScale');
    _y = _this.view.model.get('yAxisScale');

    // update legend
    if (_this.legend) {
      _legendLine.attr('d', 'M0,-3L25,-3');

      _legendPoint = _legend.selectAll('.point');
      if (!_this.model.get('showLegendPoint')) {
        _legendPoint.remove();
      } else {

        if (!_legendPoint) {
          _legendPoint = _legend.append('circle')
              .attr('class', 'point');
        }

        _legendPoint
            .attr('r', _this.model.get('pointRadius'))
            .attr('cx', 12.5)
            .attr('cy', -3);
      }

      _legendText
          .text(_this.model.get('label'))
          .attr('dx', 30);
    }

    // update line
    if (data.length === 0 || !_this.model.get('showLine')) {
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
      _this.plotPoints(points);
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3LineView;
