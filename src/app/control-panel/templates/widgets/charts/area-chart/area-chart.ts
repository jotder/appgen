import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-area-chart',
    imports: [],
    templateUrl: './area-chart.html',
    styleUrl: './area-chart.scss'
})
export class AreaChart {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
