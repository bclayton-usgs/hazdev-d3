import * as d3 from 'd3';
import { D3Options } from './';

export interface D3LineViewOptions extends D3Options {
  data?: number[][];
  lineFormat?: d3.svg.Line<any>;
  pointRadius?: number;
  showLine?: boolean;
  showPoints?: boolean;
}
