import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WIDGET_CONFIG} from '../../core/tokens';
import {IWidgetComponent} from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models';

// Data shape for a single bar
interface BarChartRecord {
    region: string;
    sales: number;
}

// Widget-specific config properties
interface BarChartConfig {}

@Component({
    selector: 'app-bar-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bar-chart.widget.html',
    styleUrls: ['./bar-chart.widget.scss'],
})
export class BarChartWidget implements IWidgetComponent<BarChartConfig, BarChartRecord[]> {
    config = inject<WidgetModel<BarChartConfig, BarChartRecord[]>>(WIDGET_CONFIG);
}