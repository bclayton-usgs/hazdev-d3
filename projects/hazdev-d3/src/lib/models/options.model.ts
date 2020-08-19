import * as d3 from 'd3';

/**
 * D3 options
 */
export interface Options {
  clickToSelect?: boolean;
  height?: number;
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
  xAxisScale?: d3.AxisScale<d3.AxisDomain>;
  xAxisTicks?: () => {} | number[];
  xExtent?: number[];
  xLabel?: string;
  yAxisFormat?: () => {} | string;
  yAxisPadding?: number;
  yAxisScale?: d3.AxisScale<d3.AxisDomain>;
  yAxisTicks?: () => {} | number[];
  yExtent?: number[];
  yLabel?: string;
}
