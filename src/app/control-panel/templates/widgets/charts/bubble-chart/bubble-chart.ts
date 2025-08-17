import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-bubble-chart',
    imports: [],
    templateUrl: './bubble-chart.html',
    styleUrl: './bubble-chart.scss'
})
export class BubbleChart {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
