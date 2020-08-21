import * as d3 from 'd3';
import { D33dView, D3BaseView, D3View } from './';

export interface D3Options {
  el?: SVGElement | HTMLElement;
  legend?: SVGElement;
  className?: string;
  clickToSelect?: boolean;
  height?: number;
  label?: string;
  legendPosition?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
  legendOffset?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  pointRadius?: number;
  title?: string;
  tooltipOffset?: number;
  tooltipPadding?: number;
  width?: number;
  xAxisFormat?: () => {} | string;
  xAxisPadding?: number;
  xAxisScale?: d3.scale.Linear<number, number>;
  xAxisTicks?: (extent: number[]) => {} | number[];
  xExtent?: number[];
  xLabel?: string;
  yAxisFormat?: () => {} | string;
  yAxisPadding?: number;
  yAxisScale?: d3.scale.Linear<number, number>;
  yAxisTicks?: (extent: number[]) => {} | number[];
  yExtent?: number[];
  yLabel?: string;
  view?: D3View | D3BaseView | D33dView;
}
