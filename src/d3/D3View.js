'use strict';

var d3 = require('d3'),
    Collection = require('mvc/Collection'),
    D3Util = require('./D3Util'),
    Util = require('util/Util'),
    View = require('mvc/View');


/**
 * View for a D3 plot.
 *
 * @param options {Object}
 *        options are passed to View.
 * @param options.clickToSelect {Boolean}
 *        default true.
 *        when true, clicking a view causes it to be selected in the
 *        views collection.
 * @param options.height {Number}
 *        default 480.
 *        overall (viewbox) height of svg element.
 * @param options.legendPosition {String}
 *        default 'topleft'.
 *        one of (topright|topleft|bottomright|bottomleft).
 *        position of legend element.
 * @param options.marginBottom {Number}
 *        default 0.
 * @param options.marginLeft {Number}
 *        default 0.
 * @param options.marginRight {Number}
 *        default 0.
 * @param options.marginTop {Number}
 *        default 0.
 * @param options.paddingBottom {Number}
 *        default 80.
 * @param options.paddingLeft {Number}
 *        default 80.
 * @param options.paddingRight {Number}
 *        default 20.
 * @param options.paddingTop {Number}
 *        default 50.
 * @param options.title {String}
 *        title for plot.
 * @param options.tooltipOffset {Number}
 *        default 10.
 *        x/y distance from tooltip coordinate.
 * @param options.tooltipPadding {Number}
 *        default 5.
 *        padding around tooltip content.
 * @param options.width {Number}
 *        default 640.
 *        width of svg viewBox.
 * @param options.xAxisFormat {Function|String}
 *        default null.
 *        x axis tickFormat.
 * @param options.xAxisPadding {Number}
 *        default 0.05.
 *        pad extents by this ratio.
 *        For example:  0.05 pads the x axis extent by 5% of the range.
 * @param options.xAxisScale {d3.scale}
 *        default d3.scale.linear().
 * @param options.xAxisTicks {Function(extent)|Array<Number>}
 *        default null.
 *        x axis tick values.
 * @param optoins.xExtent {Array<Number>}
 *        default null.
 *        explicit x extent for graph, default is auto.
 * @param options.xLabel {String}
 *        label for x axis.
 * @param options.yAxisFormat {Function|String}
 *        default null.
 *        y axis tickFormat.
 * @param options.yAxisPadding {Number}
 *        default 0.05.
 *        pad extents by this ratio.
 *        For example:  0.05 pads the y axis extent by 5% of the range.
 * @param options.yAxisScale {d3.scale}
 *        default d3.scale.linear().
 * @param options.yAxisTicks {Function(extent)|Array<Number>}
 *        default null.
 *        y axis tick values.
 * @param optoins.yExtent {Array<Number>}
 *        default null.
 *        explicit y extent for graph, default is auto.
 * @param options.yLabel {String}
 *        label for y axis.
 */
var D3View = function (options) {
  var _this,
      _initialize,
      // variables
      _firstRender,
      _innerFrame,
      _legend,
      _margin,
      _outerFrame,
      _padding,
      _plotArea,
      _plotAreaClip,
      _plotTitle,
      _svg,
      _tooltip,
      _xAxis,
      _xAxisEl,
      _xAxisLabel,
      _xEl,
      _yAxis,
      _yAxisEl,
      _yAxisLabel,
      _yEl;


  _this = View(options);

  /**
   * Initialize view.
   */
  _initialize = function (options) {
    var el;

    options = options || {};
    _firstRender = true;

    _this.model.set(Util.extend({
      clickToSelect: true,
      height: 480,
      legendPosition: 'topright',
      legendOffset: 20,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      paddingBottom: 80,
      paddingLeft: 80,
      paddingRight: 20,
      paddingTop: 50,
      pointRadius: 3,
      title: '',
      tooltipOffset: 10,
      tooltipPadding: 5,
      width: 640,
      xAxisFormat: null,
      xAxisPadding: 0.05,
      xAxisScale: d3.scale.linear(),
      xAxisTicks: null,
      xExtent: null,
      xLabel: '',
      yAxisFormat: null,
      yAxisPadding: 0.05,
      yAxisScale: d3.scale.linear(),
      yAxisTicks: null,
      yExtent: null,
      yLabel: ''
    }, options), {silent: true});

    el = _this.el;
    el.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" class="D3View">' +
            '<defs>' +
              '<clipPath id="plotAreaClip">' +
                '<rect x="0" y="0"></rect>' +
              '</clipPath>' +
            '</defs>' +
            '<g class="margin">' +
              '<rect class="outer-frame"></rect>' +
              '<text class="plot-title" text-anchor="middle"></text>' +
              '<g class="padding">' +
                '<rect class="inner-frame"></rect>' +
                '<g class="legend"></g>' +
                '<g class="x">' +
                  '<g class="axis"></g>' +
                  '<text class="label" text-anchor="middle"></text>' +
                '</g>' +
                '<g class="y">' +
                  '<g class="axis"></g>' +
                  '<text class="label" text-anchor="middle"' +
                      ' transform="rotate(-90)"></text>' +
                '</g>' +
                '<g class="plot"></g>' +
                '<g class="tooltip"></g>' +
              '</g>' +
            '</g>' +
          '</svg>';

    _svg = el.querySelector('svg');
    _plotAreaClip = _svg.querySelector('#plotAreaClip > rect');
    _outerFrame = _svg.querySelector('.outer-frame');
    _innerFrame = _svg.querySelector('.inner-frame');
    _margin = _svg.querySelector('.margin');
    _plotTitle = _margin.querySelector('.plot-title');
    _padding = _margin.querySelector('.padding');
    _legend = _padding.querySelector('.legend');
    _xEl = _padding.querySelector('.x');
    _xAxisEl = _xEl.querySelector('.axis');
    _xAxisLabel = _xEl.querySelector('.label');
    _yEl = _padding.querySelector('.y');
    _yAxisEl = _yEl.querySelector('.axis');
    _yAxisLabel = _yEl.querySelector('.label');
    _plotArea = _padding.querySelector('.plot');
    _tooltip = _padding.querySelector('.tooltip');

    _this.views = Collection([]);
    _this.views.on('add', _this.onAdd);
    _this.views.on('deselect', _this.onDeselect);
    _this.views.on('remove', _this.onRemove);
    _this.views.on('reset', _this.onReset);
    _this.views.on('select', _this.onSelect);

    _xAxis = d3.svg.axis().orient('bottom').outerTickSize(0);
    _yAxis = d3.svg.axis().orient('left').outerTickSize(0);
  };


  /**
   * Destroy view.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      // already destroyed
      return;
    }

    _this.views.off();
    _this.views.destroy();

    _this.views = null;
    _innerFrame = null;
    _legend = null;
    _margin = null;
    _outerFrame = null;
    _padding = null;
    _plotArea = null;
    _plotAreaClip = null;
    _plotTitle = null;
    _svg = null;
    _tooltip = null;
    _xAxis = null;
    _xAxisEl = null;
    _xAxisLabel = null;
    _xEl = null;
    _yAxis = null;
    _yAxisEl = null;
    _yAxisLabel = null;
    _yEl = null;
    _this = null;
  }, _this.destroy);

  /**
   * Views collection add handler.
   *
   * @param views {Array<D3SubView>}
   *        views that were added.
   */
  _this.onAdd = function (views, dontrender) {
    views.forEach(function (view) {
      view._d3view_onclick = function () {
        _this.onClick(view);
      };
      view.on('click', view._d3view_onclick);
    });
    if (!dontrender) {
      _this.render();
    }
  };

  /**
   * Called when a view is clicked.
   *
   * @param view {D3SubView}
   *        view that was clicked.
   */
  _this.onClick = function (view) {
    if (_this.model.get('clickToSelect')) {
      _this.views.select(view);
    }
  };

  /**
   * Views collection select handler.
   *
   * @param view {D3SubView}
   *        view that was selected.
   */
  _this.onDeselect = function (view) {
    view.onDeselect();
  };

  /**
   * Views collection remove handler.
   *
   * @param views {Array<D3SubView>}
   *        views that were removed.
   */
  _this.onRemove = function (views, dontrender) {
    views.forEach(function (view) {
      view.off('click', view._d3view_onclick);
      view._d3view_onclick = null;
    });
    if (!dontrender) {
      _this.render();
    }
  };

  /**
   * Views collection reset handler.
   */
  _this.onReset = function () {
    var el,
        toRemove = [];
    // call onRemove for all existing views.
    while (_plotArea.firstChild) {
      // detach view
      el = _plotArea.firstChild;
      _plotArea.removeChild(el);
      // call remove to clean up
      toRemove.push(el.view);
    }
    _this.onRemove(toRemove);
    // call onAdd for all views
    _this.onAdd(_this.views.data());
  };

  /**
   * Views collection select handler.
   *
   * @param view {D3SubView}
   *        view that was selected.
   */
  _this.onSelect = function (view) {
    view.onSelect();
  };

  /**
   * Render view.
   *
   * @param changed {Object}
   *        default is _this.model.get.
   *        list of properties that have changed.
   */
  _this.render = function (changed) {
    var height,
        innerWidth,
        innerHeight,
        legendPosition,
        legendX,
        legendY,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        options,
        outerHeight,
        outerWidth,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        width,
        xAxisScale,
        xAxisTicks,
        xExtent,
        yAxisScale,
        yAxisTicks,
        yExtent;


    options = _this.model.get();
    if (_firstRender || !changed) {
      changed = options;
      _firstRender = false;
    }

    // all options
    xAxisScale = options.xAxisScale;
    yAxisScale = options.yAxisScale;
    // these are used for label positioning
    paddingBottom = options.paddingBottom;
    paddingLeft = options.paddingLeft;

    if (changed.hasOwnProperty('title')) {
      _plotTitle.textContent = options.title;
      _plotTitle.setAttribute('y', _plotTitle.getBBox().height);
    }
    if (changed.hasOwnProperty('xLabel')) {
      _xAxisLabel.textContent = options.xLabel;
    }
    if (changed.hasOwnProperty('yLabel')) {
      _yAxisLabel.textContent = options.yLabel;
    }

    if (changed.hasOwnProperty('width') ||
        changed.hasOwnProperty('height') ||
        changed.hasOwnProperty('legendPosition') ||
        changed.hasOwnProperty('marginBottom') ||
        changed.hasOwnProperty('marginLeft') ||
        changed.hasOwnProperty('marginRight') ||
        changed.hasOwnProperty('marginTop') ||
        changed.hasOwnProperty('paddingBottom') ||
        changed.hasOwnProperty('paddingLeft') ||
        changed.hasOwnProperty('paddingRight') ||
        changed.hasOwnProperty('paddingTop')) {
      width = options.width;
      height = options.height;
      marginBottom = options.marginBottom;
      marginLeft = options.marginLeft;
      marginRight = options.marginRight;
      marginTop = options.marginTop;
      paddingRight = options.paddingRight;
      paddingTop = options.paddingTop;
      // adjust based on margin/padding
      outerWidth = width - marginLeft - marginRight;
      outerHeight = height - marginTop - marginBottom;
      innerWidth = outerWidth - paddingLeft - paddingRight;
      innerHeight = outerHeight - paddingTop - paddingBottom;
      // update elements
      _svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
      _svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
      _svg.setAttribute('height', height);
      _plotAreaClip.setAttribute('width', innerWidth);
      _plotAreaClip.setAttribute('height', innerHeight);
      _margin.setAttribute('transform',
          'translate(' + marginLeft + ',' + marginTop + ')');
      _outerFrame.setAttribute('height', outerHeight);
      _outerFrame.setAttribute('width', outerWidth);
      _plotTitle.setAttribute('x', outerWidth / 2);
      _padding.setAttribute('transform',
          'translate(' + paddingLeft + ',' + paddingTop + ')');
      _innerFrame.setAttribute('width', innerWidth);
      _innerFrame.setAttribute('height', innerHeight);
      _xEl.setAttribute('transform',
          'translate(0,' + innerHeight + ')');
      // update axes range and position
      xAxisScale.range([0, innerWidth]);
      yAxisScale.range([innerHeight, 0]);
      _xAxisLabel.setAttribute('x', innerWidth / 2);
      _yAxisLabel.setAttribute('x', -innerHeight / 2);

      legendPosition = options.legendPosition;
      legendX = 0;
      legendY = 0;
      if (legendPosition === 'topright') {
        legendX = innerWidth;
      } else if (legendPosition === 'bottomleft') {
        legendY = innerHeight;
      } else if (legendPosition === 'bottomright') {
        legendX = innerWidth;
        legendY = innerHeight;
      } // else 'topleft'
      _legend.setAttribute('transform',
          'translate(' + legendX + ',' + legendY + ')');
    }

    // update axes extent
    xExtent = _this.getPlotXExtent();
    xAxisScale.domain(xExtent);
    yExtent = _this.getPlotYExtent(xExtent);
    yAxisScale.domain(yExtent);

    // redraw axes
    _xAxis.scale(xAxisScale);
    _xAxis.tickFormat(options.xAxisFormat);
    xAxisTicks = options.xAxisTicks;
    if (typeof xAxisTicks === 'function') {
      xAxisTicks = xAxisTicks(xExtent);
    }
    _xAxis.tickValues(xAxisTicks);

    _yAxis.scale(yAxisScale);
    _yAxis.tickFormat(options.yAxisFormat);
    yAxisTicks = options.yAxisTicks;
    if (typeof yAxisTicks === 'function') {
      yAxisTicks = yAxisTicks(yExtent);
    }
    _yAxis.tickValues(yAxisTicks);

    d3.select(_xAxisEl).call(_xAxis);
    d3.select(_yAxisEl).call(_yAxis);

    // update label positions based on axes size
    _xAxisLabel.setAttribute('y', paddingBottom - _xAxisLabel.getBBox().height);
    _yAxisLabel.setAttribute('y', _yAxisLabel.getBBox().height - paddingLeft);

    // now render views
    _this.renderViews();
  };

  /**
   * Re-render sub-views.
   */
  _this.renderViews = function () {
    var bbox,
        legendContent,
        legendOffset,
        legendPosition,
        legendX,
        legendY;

    // clear plot area
    Util.empty(_plotArea);
    Util.empty(_legend);
    legendContent = d3.select(_legend)
        .append('g')
        .attr('class', 'legend-content').node();

    // add views to plot area
    legendY = 0;
    _this.views.data().forEach(function (view, index) {
      // add elements
      _plotArea.appendChild(view.el);
      view.el.setAttribute('data-index', index);
      if (view.legend) {
        legendContent.appendChild(view.legend);
        view.legend.setAttribute('data-index', index);
      }
      // render elements
      view.render(_this);
      // position legend
      if (view.legend) {
        bbox = view.legend.getBBox();
        legendY += bbox.height;
        view.legend.setAttribute('transform',
            'translate(0,' + legendY  + ')');
      }
    });

    // position legend content.
    bbox = legendContent.getBBox();
    legendOffset = _this.model.get('legendOffset');
    legendPosition = _this.model.get('legendPosition');
    legendX = legendOffset;
    legendY = legendOffset;
    if (legendPosition === 'topright') {
      legendX = -(legendOffset + bbox.width);
    } else if (legendPosition === 'bottomleft') {
      legendY = -(legendOffset + bbox.height);
    } else if (legendPosition === 'bottomright') {
      legendX = -(legendOffset + bbox.width);
      legendY = -(legendOffset + bbox.height);
    } // else 'topleft'
    legendContent.setAttribute('transform',
        'translate(' + legendX + ',' + legendY + ')');
  };

  /**
   * Get the plot x extent, including padding.
   *
   * @return {Array<Number>} x extents.
   */
  _this.getPlotXExtent = function () {
    var xAxisPadding,
        xAxisScale,
        xExtent;

    xExtent = _this.getXExtent();
    xAxisPadding = _this.model.get('xAxisPadding');
    if (xAxisPadding) {
      xAxisScale = _this.model.get('xAxisScale');
      xExtent = (typeof xAxisScale.base === 'function' ?
            D3Util.padLogExtent : D3Util.padExtent)(xExtent, xAxisPadding);
    }

    return xExtent;
  };

  /**
   * Get the plot y extent, including padding.
   *
   * @param xExtent {Array<Number>}
   *        xExtent is passed to _this.getYExtent().
   * @return {Array<Number>} y extents.
   */
  _this.getPlotYExtent = function (xExtent) {
    var yAxisPadding,
        yAxisScale,
        yExtent;

    yExtent = _this.getYExtent(xExtent);
    yAxisPadding = _this.model.get('yAxisPadding');
    if (yAxisPadding) {
      yAxisScale = _this.model.get('yAxisScale');
      yExtent = (typeof yAxisScale.base === 'function' ?
            D3Util.padLogExtent : D3Util.padExtent)(yExtent, yAxisPadding);
    }

    return yExtent;
  };

  /**
   * Get the data x extent.
   *
   * @return {Array<Number>} x extents.
   */
  _this.getXExtent = function () {
    var xExtent;

    xExtent = _this.model.get('xExtent');
    if (xExtent === null) {
      xExtent = [];
      _this.views.data().forEach(function (view) {
        xExtent = xExtent.concat(view.getXExtent());
      });
      xExtent = d3.extent(xExtent);
    }

    return xExtent;
  };

  /**
   * Get the data y extent, including padding.
   *
   * @param xExtent {Array<Number>}
   *        x extent, in case y extent is filtered based on x extent.
   * @return {Array<Number>} x extents.
   */
  _this.getYExtent = function (/* xExtent */) {
    var yExtent;

    yExtent = _this.model.get('yExtent');
    if (yExtent === null) {
      yExtent = [];
      _this.views.data().forEach(function (view) {
        yExtent = yExtent.concat(view.getYExtent());
      });
      yExtent = d3.extent(yExtent);
    }

    return yExtent;
  };

  /**
   * Show a tooltip on the graph.
   *
   * @param coords {Array<x, y>}
   *        coordinate for origin of tooltip.
   * @param data {Array<Object|Array>}
   *        tooltip content, passed to formatTooltip.
   */
  _this.showTooltip = function (coords, data) {
    var bbox,
        content,
        offset,
        options,
        outline,
        padding,
        tooltip,
        tooltipBbox,
        x,
        y;

    tooltip = d3.select(_tooltip);
    // clear tooltip
    tooltip.selectAll('*').remove();
    if (!coords || !data) {
      return;
    }

    options = _this.model.get();
    offset = options.tooltipOffset;
    padding = options.tooltipPadding;
    // create tooltip content
    outline = tooltip.append('rect').attr('class', 'tooltip-outline');
    content = tooltip.append('g').attr('class', 'tooltip-content');
    D3Util.formatText(content, data);
    // position tooltip outline
    bbox = tooltip.node().getBBox();
    outline.attr('width', bbox.width + 2 * padding)
        .attr('height', bbox.height + 2 * padding);
    content.attr('transform', 'translate(' + padding + ',0)');

    // position tooltip on graph
    // center of point
    x = options.xAxisScale(coords[0]);
    y = options.yAxisScale(coords[1]);
    // box rendering inside
    bbox = _innerFrame.getBBox();
    // box being rendered
    tooltipBbox = _tooltip.getBBox();
    // keep tooltip in graph area
    if (x + tooltipBbox.width > bbox.width) {
      x = x - tooltipBbox.width - offset;
    } else {
      x = x + offset;
    }
    if (y + tooltipBbox.height > bbox.height) {
      y = y - tooltipBbox.height - offset;
    } else {
      y = y + offset;
    }
    // set position
    _tooltip.setAttribute('transform',
        'translate(' + x + ',' + y + ')');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3View;
