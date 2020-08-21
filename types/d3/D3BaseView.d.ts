import { Collection } from 'hazdev-webutils'
import { D3LineView, D3Options, D3SubView, D3View, Info } from './';

/**
 * View for a D3 plot.
 *
 * @param options
 *        options are passed to View.
 */
export class D3BaseView {

  views: Collection<D3BaseView | D3View | D3LineView>;

  constructor(options: D3Options)

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
  onRemove(views: D3SubView, dontrender: boolean): void;

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
  onSelect(view: D3BaseView): void;

  /**
   * Project data coordinates to plot coordinates.
   *
   * @param coords
   *        data coordinate.
   * @return
   *         plot coordinate.
   */
  project(coords: number[]): number[];

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
   *
   * @param info
   *        plot information.
   *
   */
  renderViews(info: Info): void;

  /**
   * Re-render legend.
   *
   * @param info
   *        plot information.
   */
  renderLegend(info: Info): void;

  /**
   * Show a tooltip on the graph.
   *
   * @param coords
   *        plot coordinates for origin of tooltip, should be pre-projected.
   * @param data
   *        tooltip content, passed to formatTooltip.
   */
  showTooltip(coords: number[], data: any[]): void;

}
