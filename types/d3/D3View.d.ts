import { Collection } from 'hazdev-webutils'
import { D3BaseView, D3LineView, D3Options, D3SubView } from './';

/**
 * View for a D3 plot.
 *
 * @param options
 *        options are passed to View.
 */
export class D3View {

  views: Collection<D3View | D3BaseView | D3LineView>;

  constructor(options: D3Options);

  /**
   * Destroy view.
   */
  destroy(): void;

  /**
   * Views collection add handler.
   *
   * @param views
   *        views that were added.
   */
  onAdd(views: D3SubView[], dontrender: boolean): void;

  /**
   * Called when a view is clicked.
   *
   * @param view
   *        view that was clicked.
   */
  onClick(view: D3SubView): void;

  /**
   * Views collection select handler.
   *
   * @param view
   *        view that was selected.
   */
  onDeselect(view: D3SubView): void;

  /**
   * Views collection remove handler.
   *
   * @param views
   *        views that were removed.
   */
  onRemove(views: D3SubView[], dontrender: boolean): void;

  /**
   * Views collection reset handler.
   */
  onReset(): void;

  /**
   * Views collection select handler.
   *
   * @param view
   *        view that was selected.
   */
  onSelect(view: D3SubView): void;

  /**
   * Render view.
   *
   * @param changed
   *        default is _this.model.get.
   *        list of properties that have changed.
   */
  render(changed: object): void;

  /**
   * Re-render sub-views.
   */
  renderViews(): void;

  /**
   * Get the plot x extent, including padding.
   *
   * @return x extents.
   */
  getPlotXExtent(xExtent: number[]): number[];

  /**
   * Get the plot y extent, including padding.
   *
   * @param xExtent
   *        xExtent is passed to _this.getYExtent().
   * @return y extents.
   */
  getPlotYExtent(xExtent: number[]): number[];

  /**
   * Get the data x extent.
   *
   * @return x extents.
   */
  getXExtent(): number[];

  /**
   * Get the data y extent, including padding.
   *
   * @param xExtent
   *        x extent, in case y extent is filtered based on x extent.
   * @return x extents.
   */
  getYExtent(): number[];

  /**
   * Show a tooltip on the graph.
   *
   * @param coords
   *        coordinate for origin of tooltip.
   * @param data
   *        tooltip content, passed to formatTooltip.
   */
  showTooltip(coords: number[], data: any[]): void;

  }
