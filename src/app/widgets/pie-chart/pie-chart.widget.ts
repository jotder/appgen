import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WIDGET_CONFIG} from '../../core/tokens';
import {IWidgetComponent} from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models';

// Data shape for a single pie slice
interface PieChartRecord {
    category: string;
    sales: number;
}

// Widget-specific config properties
interface PieChartConfig {}

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pie-chart.widget.html',
    styleUrls: ['./pie-chart.widget.scss'],
})
export class PieChartWidget implements IWidgetComponent<PieChartConfig, PieChartRecord[]> {
    config = inject<WidgetModel<PieChartConfig, PieChartRecord[]>>(WIDGET_CONFIG);
}