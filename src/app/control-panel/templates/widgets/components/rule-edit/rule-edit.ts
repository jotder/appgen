import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-rule-edit',
    imports: [],
    templateUrl: './rule-edit.html',
    styleUrl: './rule-edit.scss'
})
export class RuleEdit {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
