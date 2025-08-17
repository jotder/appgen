import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-table-simple',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table-simple.html',
    styleUrl: './table-simple.scss'
})
export class TableSimple {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
