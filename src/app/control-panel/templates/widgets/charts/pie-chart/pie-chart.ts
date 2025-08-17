import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-pie-chart',
    imports: [],
    templateUrl: './pie-chart.html',
    styleUrl: './pie-chart.scss'
})
export class PieChart {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
