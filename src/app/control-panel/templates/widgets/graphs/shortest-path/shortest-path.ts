import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-shortest-path',
    imports: [],
    templateUrl: './shortest-path.html',
    styleUrl: './shortest-path.scss'
})
export class ShortestPath {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
