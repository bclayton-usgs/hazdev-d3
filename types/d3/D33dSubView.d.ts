import { D33dSubViewOptions } from './D33dOptions';

/**
 * Sub view for a D3 plot.
 *
 * Manages mouseover, mouseout, click events for view.
 * mouseover and mouseout toggle a "mouseover" class on view.
 * click triggers "click" event.
 *
 * When added to a D3BaseView, "click" event triggers "select" in collection.
 * D3BaseView calls onSelect, onDeselect methods when collection selection
 * changes.
 *
 * @param options
 *        all options are passed to View.
 */
export class D33dSubView {

  constructor(options: D33dSubViewOptions);

  /**
   * Destroy view.
   */
  destroy(): void;

  /**
   * Click event handler.
   */
  onClick(): void;

  /**
   * Deselect event handler.
   */
  onDeselect(): void;

  /**
   * Mouseout event handler.
   */
  onMouseOut(): void;

  /**
   * Mouseover event handler.
   */
  onMouseOver(): void;

  /**
   * Select event handler.
   */
  onSelect(): void;

  /**
   * Get plotting data for D33dView.
   *
   * @return
   *         el - view element
   *         when el is a SVG "g" element
   *             items {Array<Object>}
   *                 items within group
   *         when el is a SVG "text" element
   *             coords {Array<Number>}
   *                 coordinates for text anchor point.
   *         when el is a SVG "path" element
   *             close {Boolean}
   *                 default true
   *             coords {Array<Array<Number>>}
   *                 array of path coordinates.
   */
  getData(): void;

  /**
   * Render sub view.
   * Update all view attributes except coordinates (updated by D33dView).
   */
  render(): void;

};
