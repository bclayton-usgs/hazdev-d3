import { D33dPathOptions } from './';

/**
 * Class info and constructor parameters.
 */
export class D33dPath {

  constructor(options: D33dPathOptions);

  /**
   * @return data for D33dView plotting.
   */
  getData(): {
    close: boolean,
    coords: number[],
    el: SVGElement
  };

  /**
   * Render everything except coordinates.
   */
  render(): void;

}
