import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { Options } from '../../models/options.model';

@Component({
  selector: 'hazdev-d3-view',
  templateUrl: './d3-view.component.html',
  styleUrls: ['./d3-view.component.scss']
})
export class D3ViewComponent implements OnInit {

  @ViewChild('d3View')
  el: ElementRef<HTMLElement>;

  @ViewChild('innerFrame')
  innerFrameEl: ElementRef<SVGGElement>;

  @ViewChild('legend')
  legendEl: ElementRef<SVGGElement>;

  @ViewChild('margin')
  marginEl: ElementRef<SVGGElement>;

  @ViewChild('outerFrame')
  outerFrameEl: ElementRef<SVGGElement>;

  @ViewChild('padding')
  paddingEl: ElementRef<SVGGElement>;

  @ViewChild('plot')
  plotAreaEl: ElementRef<SVGGElement>;

  @ViewChild('plotAreaClip')
  plotAreaClipEl: ElementRef<SVGRectElement>;

  @ViewChild('plotTitle')
  plotTitleEl: ElementRef<SVGTextElement>;

  @ViewChild('svg')
  svgEl: ElementRef<SVGElement>;

  @ViewChild('tooltip')
  tooltipEl: ElementRef<SVGGElement>;

  @ViewChild('x')
  xEl: ElementRef<SVGGElement>;

  @ViewChild('xAxis')
  xAxisEl: ElementRef<SVGGElement>;

  @ViewChild('xAxisLabel')
  xAxisLabelEl: ElementRef<SVGTextElement>;

  @ViewChild('y')
  yEl: ElementRef<SVGGElement>;

  @ViewChild('yAxis')
  yAxisEl: ElementRef<SVGGElement>;

  @ViewChild('yAxisLabel')
  yAxisLabelEl: ElementRef<SVGTextElement>;

  defaultOptions: Options = {
    clickToSelect: true,
    height: 480,
    legendPosition: 'topright',
    legendOffset: 20,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingBottom: 80,
    paddingLeft: 80,
    paddingRight: 20,
    paddingTop: 50,
    pointRadius: 3,
    title: '',
    tooltipOffset: 10,
    tooltipPadding: 5,
    width: 640,
    xAxisFormat: null,
    xAxisPadding: 0.05,
    xAxisScale: d3.scaleLinear(),
    xAxisTicks: null,
    xExtent: null,
    xLabel: '',
    yAxisFormat: null,
    yAxisPadding: 0.05,
    yAxisScale: d3.scaleLinear(),
    yAxisTicks: null,
    yExtent: null,
    yLabel: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
