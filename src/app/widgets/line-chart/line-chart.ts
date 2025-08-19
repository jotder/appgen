import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WIDGET_CONFIG} from '../../core/tokens';
import { IWidgetComponent } from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models/widget.model';


@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './line-chart.html',
})
export class LineChart implements IWidgetComponent {
    config: WidgetModel = inject(WIDGET_CONFIG);
}
