import { D33dAxisOptions } from './';

/**
 * A 3d axis.
 *
 * options {Object}
 * extent {Array<Array<Number>>}
 *        default [[0, 0, 0], [1, 0, 0]].
 *        axis extent.
 * format {Function(Array<Number>)}
 *        format one coordinate (for ticks).
 * labelAnchor {'start'|'middle'|'end'}
 *        default 'middle'.
 *        svg text-anchor property for tick labels.
 * labelDirection {Array<Number>}
 *        default null.
 *        rotate label text to be parallel to this vector.
 * labelVector {Array<Number>}
 *        default tickVector.multiply(2).
 *        placement of tick labels
 * padding {Number}
 *        default 0.05
 *        padding outside extent.  0.05 would be 5% padding based on extent.
 * tickVector {Array<Number>}
 *        direction and length of tick marks.
 * ticks {Number}
 *        number of ticks to create.
 * title {String}
 *        axis title.
 * titleAnchor {'start'|'middle'|'end'}
 *        default 'middle'.
 *        svg text-anchor property for title.
 * titleDirection {Array<Number>}
 *        default null.
 *        rotate title to be parallel to this vector.
 * titleVector {Array<Number>}
 *        default Vector(tickVector).multiply(5).
 *        direction and distance to title from center of axis extent.
 */
export class D3Axis {

  constructor(options: D33dAxisOptions);

  /**
   * Free references.
   */
  destroy(): void;

}
