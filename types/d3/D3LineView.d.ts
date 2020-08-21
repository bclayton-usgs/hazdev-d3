import { D3LineViewOptions } from './';

/**
 * Line view for a D3 plot.
 *
 * options {Object}
 *        options are passed to D3SubView.
 * options.data {Array<Array<Number>>}
 *        default [].
 *        array of arrays of x, y coordinates:
 *        [ [x0, y0], [x1, y1], ... ]
 * lineFormat {D3 Line}
 *        default d3.svg.line().
 * pointRadius {Number}
 *        default 5.
 *        radius for points.
 * showLine {Boolean}
 *        default true.
 *        whether to plot line.
 * showPoints {Boolean}
 *        default true.
 *        whether to plot points.
 */
export class D3LineView {

  constructor(options: D3LineViewOptions);

  /**
   * Convert a data coordinate to a plot coordinate.
   *
   * @param d
   *        data point.
   * @return x plot coordinate.
   */
  getScaleX(d: number[]): number;

  /**
   * Convert a data coordinate to a plot coordinate.
   *
   * @param d
   *        data point.
   * @return y plot coordinate.
   */
  getScaleY(d: number): number;


  /**
   * Destroy view.
   */
  destroy(): void;

  /**
   * Format x value for tooltip.
   *
   * @param x
   *        value to format.
   * @return
   *         formatted number.
   */
  formatX(x: number): string;

  /**
   * Format y value for tooltip.
   *
   * @param y
   *        value to format.
   * @return
   *         formatted number.
   */
  formatY(y: number): string;

  /**
   * X extent for view.
   *
   * @return
   *         x extent for view.
   */
  getXExtent(): number[];

  /**
   * Y extent for view.
   *
   * @return
   *         y extent for view.
   */
  getYExtent(): number[];

  /**
   * Point mouseout event handler.
   */
  onPointOut(): void;

  /**
   * Point mouseover event handler.
   *
   * @param coords
   *        x, y coordinate of point.
   */
  onPointOver(coords: number[]): void

  plotPoints(points: number[]): void;

  /**
   * Render sub view.
   * Element has already been attached to view.
   */
  render(): void;

}
