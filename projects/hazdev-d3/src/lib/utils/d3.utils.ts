import * as d3 from 'd3';

/**
 * Format text content.
 *
 * @param el
 *        tooltip container element.
 * @param data
 *        data passed to showTooltip.
 *        this implementation expects objects (or arrays of objects):
 *        obj.class {String} class attribute for text|tspan.
 *        obj.text {String} content for text|tspan.
 */
export const formatText = (el: d3.Selection<SVGElement, any, any, any>, data: any[]): void => {
  // add content to tooltip
  data = data.map((line) => {
    const text = el.append('text');
    if (typeof line.forEach === 'function') {
      // array of components:
      line.forEach((l) => {
        text.append('tspan').attr('class', l.class || '').text(l.text);
      });
    } else {
      text.attr('class', line.class || '').text(line.text);
    }
    return text;
  });
  // position lines in tooltip
  let y = 0;
  data.forEach((line) => {
    const bbox = line.node().getBBox();
    y += bbox.height;
    line.attr('y', y);
  });
};

/**
 * Persistently tries to get the bounding box for the given element.
 *
 * @param element
 *      The element for which to get the bounding box.
 * @return
 *      A bounding box object with x, y, width, height attributes
 */
export const getBBox = (element: SVGTextElement): DOMRect => {
  let bbox: DOMRect;

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
    bbox = new DOMRect(0, 0, 0, 0);
  }

  return bbox;
};

/**
 * Pad an extent.
 *
 * @param extent
 *        first entry should be minimum.
 *        last entry should be maximum.
 * @param amount
 *        percentage of range to pad.
 *        For example: 0.05 = +/- 5% of range.
 * @return
 *         padded extent.
 */
export const padExtent = (extent: number[], amount: number): number[] => {
  const start = extent[0];
  const end = extent[extent.length - 1];
  const range = end - start;
  let pad = range * amount;

  // Deal with case where there is only one value for the extents.
  if (pad === 0) {
    pad = amount;
  }

  return [start - pad, end + pad];
};

/**
 * Pad a log based extent.
 *
 * Similar to padExtent(), but padding occurs in log space.
 *
 * @param extent
 *        first entry should be minimum.
 *        last entry should be maximum.
 * @param amount
 *        percentage of range to pad.
 *        For example: 0.05 = +/- 5% of range.
 * @return
 *         padded extent.
 */
export const padLogExtent = (extent: number[], amount: number): number[] => {
  // convert min/max to base 10
  const base = 10;
  const baseLog = Math.log(base);
  const start = Math.log(extent[0]) / baseLog;
  const end = Math.log(extent[extent.length - 1]) / baseLog;
  extent = padExtent([start, end], amount);
  return [Math.pow(base, extent[0]), Math.pow(base, extent[extent.length - 1])];
};
