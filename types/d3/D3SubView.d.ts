import { D3Options } from './';

/**
 * Sub view for a D3 plot.
 *
 * Manages mouseover, mouseout, click events for view.
 * mouseover and mouseout toggle a "mouseover" class on view.
 * click triggers "click" event.
 *
 * When added to a D3View, "click" event triggers "select" in collection.
 * D3View calls onSelect, onDeselect methods when collection selection changes.
 *
 * Subclasses should override at least getXExtent(), getYExtent(), render(view).
 *
 * @param options
 *        all options are passed to View.
 */
export class D3SubView {

  constructor(options: D3Options);

  /**
   * Destroy view.
   */
  destroy(): void;

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
   * Render sub view.
   * Element has already been attached to view.
   */
  render(): void;

}
