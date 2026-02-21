import { Route } from '@angular/router'
import { Area } from './area/area'
import { Bar } from './bar/bar'
import { Bubble } from './bubble/bubble'
import { Candlestick } from './candlestick/candlestick'
import { Column } from './column/column'
import { Heatmap } from './heatmap/heatmap'
import { Line } from './line/line'
import { Mixed } from './mixed/mixed'
import { Timeline } from './timeline/timeline'
import { Boxplot } from './boxplot/boxplot'
import { Treemap } from './treemap/treemap'
import { Pie } from './pie/pie'
import { Radar } from './radar/radar'
import { Radialbar } from './radialbar/radialbar'
import { Scatter } from './scatter/scatter'
import { PolarArea } from './polar-area/polar-area'

export const CHART_ROUTES: Route[] = [
  {
    path: 'area',
    component: Area,
    data: { title: 'Apex Area Chart' },
  },
  {
    path: 'bar',
    component: Bar,
    data: { title: 'Apex Bar Chart' },
  },
  {
    path: 'bubble',
    component: Bubble,
    data: { title: 'Apex Bubble Chart' },
  },
  {
    path: 'candlestick',
    component: Candlestick,
    data: { title: 'Apex Candlestick Chart' },
  },
  {
    path: 'column',
    component: Column,
    data: { title: 'Apex Column Chart' },
  },
  {
    path: 'heatmap',
    component: Heatmap,
    data: { title: 'Apex Heatmap Chart' },
  },
  {
    path: 'line',
    component: Line,
    data: { title: 'Apex Line Chart' },
  },
  {
    path: 'mixed',
    component: Mixed,
    data: { title: 'Apex Mixed Chart' },
  },
  {
    path: 'timeline',
    component: Timeline,
    data: { title: 'Apex Timeline Chart' },
  },
  {
    path: 'boxplot',
    component: Boxplot,
    data: { title: 'Apex Boxplot Chart' },
  },
  {
    path: 'treemap',
    component: Treemap,
    data: { title: 'Apex Treemap Chart' },
  },
  {
    path: 'pie',
    component: Pie,
    data: { title: 'Apex Pie Chart' },
  },
  {
    path: 'radar',
    component: Radar,
    data: { title: 'Apex Radar Chart' },
  },
  {
    path: 'radialbar',
    component: Radialbar,
    data: { title: 'Apex Radialbar Chart' },
  },
  {
    path: 'scatter',
    component: Scatter,
    data: { title: 'Apex Scatter Chart' },
  },
  {
    path: 'polar-area',
    component: PolarArea,
    data: { title: 'Apex Polar Area Chart' },
  }
]
