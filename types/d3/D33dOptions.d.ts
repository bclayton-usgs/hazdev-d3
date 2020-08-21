import { D3Options } from './D3Options';

export type Anchor = 'start' | 'middle' | 'end';

export interface D3ViewOptions extends D3Options {
  lookAt?: number[];
  origin?: number[];
  up?: number[];
  zoom?: number;
}

export interface D33dSubViewOptions {
  element?: string;
  elementNamespace?: string;
  id?: number;
}

export interface D33dPathOptions extends D33dSubViewOptions {
  className?: string;
  close?: boolean;
  coords?: number[];
}

export interface D33dTextOptions extends D33dSubViewOptions {
  className?: string;
  coords?: number[];
  direction?: number[];
  text?: string;
  textAnchor?: Anchor;
}

export interface D33dGroupOptions {
  className?: string;
  coords?: number[];
  items?: object[];
}

export interface D33dAxisOptions extends D33dGroupOptions {
  extent?: number[][];
  format?: (coord: number[]) => {};
  labelAnchor?: Anchor;
  labelDirection?: number[];
  labelVector?: number[];
  padding?: number;
  tickVector?: number[];
  ticks?: number;
  title?: string;
  titleAnchor?: Anchor;
  titleDirection?: number[];
  titleVector?: number[];
}

export interface D33dCuboidOptions extends D33dGroupOptions {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
}
