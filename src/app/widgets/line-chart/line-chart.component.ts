import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WIDGET_CONFIG } from '../../core/tokens';
import { IWidget } from '../../core/services/widget-registry.service';
import { WidgetConfig } from '../../core/models';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements IWidget {
  config: WidgetConfig = inject(WIDGET_CONFIG);
}
