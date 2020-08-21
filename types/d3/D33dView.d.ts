import { D3ViewOptions } from './D33dOptions';
import { Info } from './Info';

/**
 * Simulate a 3D view.
 *
 * Add objects to the D33dView.views collection to make them plot:
 * - D33dGroup
 *   - D33dAxis
 *   - D33dCuboid
 * - D33dPath
 * - D33dText
 *
 * The properties lookAt, origin, up, and zoom, can be modified by updating the
 * corresponding D33dView.model properties.
 *
 * options {Object}
 * options.lookAt {Array<x, y, z>}
 *        default [0, 0, 0].
 *        where view looks at.
 * options.origin {Array<x, y, z>}
 *        default [100, 100, 100].
 *        where view looks from.
 * options.up {Array<x, y, z>}
 *        default [0, 0, 1] (z-axis up).
 *        up vector.
 * options.zoom {Number}
 *        default 10.
 *        scaling factor for plot.
 */
export class D33dView {

  constructor(options: D3ViewOptions);

  /**
   * Free references.
   */
  destroy(): void;

  /**
   * Project a single coordinate into the view x/y plane.
   *
   * @return projected coordinates.
   *         z represents the distance from the camera plane to the object.
   */
  project(coord: number[]): number[];

  /**
   * Render all views.
   *
   * @param info
   *        plot information.
   */
  renderViews(info: Info): void;

}
