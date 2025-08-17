import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-table-search',
    imports: [],
    templateUrl: './table-search.html',
    styleUrl: './table-search.scss'
})
export class TableSearch {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
