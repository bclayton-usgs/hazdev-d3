'use strict';


/**
 * Format text content.
 *
 * @param el {D3Element}
 *        tooltip container element.
 * @param data {Array<Object|Array>}
 *        data passed to showTooltip.
 *        this implementation expects objects (or arrays of objects):
 *        obj.class {String} class attribute for text|tspan.
 *        obj.text {String} content for text|tspan.
 */
var _formatText = function (el, data) {
  var y;

  // add content to tooltip
  data = data.map(function (line) {
    var text = el.append('text');
    if (typeof line.forEach === 'function') {
      // array of components:
      line.forEach(function (l) {
        text.append('tspan').attr('class', l.class || '').text(l.text);
      });
    } else {
      text.attr('class', line.class || '').text(line.text);
    }
    return text;
  });
  // position lines in tooltip
  y = 0;
  data.forEach(function (line) {
    var bbox = line.node().getBBox();
    y += bbox.height;
    line.attr('y', y);
  });
};

/**
 * Persistently tries to get the bounding box for the given element.
 *
 * @param element {SVGText}
 *      The element for which to get the bounding box.
 * @return {Object}
 *      A bounding box object with x, y, width, height attributes
 */
var _getBBox = function (element) {
  var bbox;

  try {
    bbox = element.getBBox();
  } catch (e) {
    // Ignore
  }

  if (!bbox) {
    try {
      bbox = element.getBoundingClientRect();
    } catch (e) {
      // Ignore
    }
  }

  if (!bbox) {
    bbox = {x: 0, y: 0, width: 0, height: 0};
  }

  return bbox;
};

/**
 * Pad an extent.
 *
 * @param extent {Array<Number>}
 *        first entry should be minimum.
 *        last entry should be maximum.
 * @param amount {Number}
 *        percentage of range to pad.
 *        For example: 0.05 = +/- 5% of range.
 * @return {Array<Number>}
 *         padded extent.
 */
var _padExtent = function (extent, amount) {
  var start = extent[0],
      end = extent[extent.length - 1],
      range = end - start,
      pad = range * amount;

  // Deal with case where there is only one value for the extents.
  if (pad === 0) {
    pad = amount;
  }

  return [start - pad, end + pad];
};

/**
 * Pad a log based extent.
 *
 * Similar to _padExtent(), but padding occurs in log space.
 *
 * @param extent {Array<Number>}
 *        first entry should be minimum.
 *        last entry should be maximum.
 * @param amount {Number}
 *        percentage of range to pad.
 *        For example: 0.05 = +/- 5% of range.
 * @return {Array<Number>}
 *         padded extent.
 */
var _padLogExtent = function (extent, amount) {
  var base,
      baseLog,
      end,
      start;

  // convert min/max to base 10
  base = 10;
  baseLog = Math.log(base);
  start = Math.log(extent[0]) / baseLog;
  end = Math.log(extent[extent.length - 1]) / baseLog;
  extent = _padExtent([start, end], amount);
  return [Math.pow(base, extent[0]), Math.pow(base, extent[extent.length - 1])];
};


var D3Util = {
  formatText: _formatText,
  getBBox: _getBBox,
  padExtent: _padExtent,
  padLogExtent: _padLogExtent
};


module.exports = D3Util;
