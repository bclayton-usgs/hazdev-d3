import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HazdevD3Module } from 'projects/hazdev-d3/src/public-api';

import { LineplotComponent } from '../components/lineplot/lineplot.component';

const routes: Routes = [
  {
    path: '',
    component: LineplotComponent
  }
];

@NgModule({
  declarations: [LineplotComponent],
  imports: [
    CommonModule,
    HazdevD3Module,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LineplotModule { }
