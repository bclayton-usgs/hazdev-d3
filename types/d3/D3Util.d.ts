
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
export function formatText(el: SVGElement, data: any): void;

/**
 * Persistently tries to get the bounding box for the given element.
 *
 * @param element
 *      The element for which to get the bounding box.
 * @return
 *      A bounding box object with x, y, width, height attributes
 */
export function getBBox(element: SVGTextElement): DOMRect;

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
export function padExtent(extent: number[], amount: number): number[];

/**
 * Pad a log based extent.
 *
 * Similar to _padExtent(), but padding occurs in log space.
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
export function padLogExtent(extent: number[], amount: number): number;
