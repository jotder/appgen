import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss'
})
export class LineChart {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
