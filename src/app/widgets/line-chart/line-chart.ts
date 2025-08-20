import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WIDGET_CONFIG} from '../../core/tokens';
import {IWidgetComponent} from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models/widget.model';

// Data shape for a single point on the line chart
interface LineChartRecord {
    month: string;
    sales: number;
}

// Widget-specific config properties (none needed for this simple version)
interface LineChartConfig {
}

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './line-chart.html',
})
export class LineChart implements IWidgetComponent<LineChartConfig, LineChartRecord[]> {
    config = inject<WidgetModel<LineChartConfig, LineChartRecord[]>>(WIDGET_CONFIG);
}
