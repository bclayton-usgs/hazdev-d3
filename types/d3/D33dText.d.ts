import { D33dTextOptions } from './';

/**
 * Text to be plotted at a point in the view.
 *
 * options {Object}
 * options.className {String}
 *        default 'D33dText'.
 *        element class attribute value (may include spaces).
 * options.coords {Array<Number>}
 *        3d coordinates where text should be positioned.
 * options.text {String}
 *        text content.
 * options.textAnchor {String}
 *        default 'start'.
 *        svg text anchor.
 */
export class D33dText {

  constructor(options: D33dTextOptions);

  /**
   * Free references.
   */
  destroy(): void;

  /**
   * @return data for D33dView plotting.
   */
  getData(): {
      coords: number[],
      direction: number[],
      el: SVGElement
    }

  /**
   * Render everything except position.
   */
  render(): void;

}
