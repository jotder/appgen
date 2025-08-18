import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WIDGET_CONFIG } from '../../core/tokens';
import { IWidget } from '../../core/services/widget-registry.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
})
export class LineChartWidgetComponent implements IWidget {
  config = inject(WIDGET_CONFIG);
}
