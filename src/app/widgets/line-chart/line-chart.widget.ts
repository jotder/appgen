import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WIDGET_CONFIG} from '../../core/tokens';
import {IWidgetComponent} from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models';

// Data shape for a row (generic object)
type LineChartRecord = Record<string, any>;

// Widget-specific config properties
interface LineChartConfig {
    categoryKey: string;
    valueKey: string;
    title?: string;
}

@Component({
    selector: 'app-line-chart-widget',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './line-chart.widget.html',
    styleUrls: ['./line-chart.widget.scss'],
})
export class LineChartWidget implements IWidgetComponent<LineChartConfig, LineChartRecord[]> {
    config = inject<WidgetModel<LineChartConfig, LineChartRecord[]>>(WIDGET_CONFIG);
}