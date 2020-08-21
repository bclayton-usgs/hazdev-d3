import { D33dGroupOptions, D33dView } from './';

/**
 * Text to be plotted at a point in the view.
 *
 * options {Object}
 * options.className {String}
 *        default 'D33dGroup'.
 *        element class attribute value (may include spaces).
 * options.coords {Array<Number>}
 *        3d coordinates where text should be positioned.
 * options.items {Array<Object>}
 *        nested items.
 */
export class D33dGroup {

  constructor(options: D33dGroupOptions);

  /**
   * @return data for D33dView plotting.
   */
  getData(): {
    el: SVGElement,
    items: any[]
  };

  /**
   * Render everything except position.
   */
  render(view: D33dView): void;

}
