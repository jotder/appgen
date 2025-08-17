import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-zoom-graph',
    imports: [],
    templateUrl: './zoom-graph.html',
    styleUrl: './zoom-graph.scss'
})
export class ZoomGraph {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
