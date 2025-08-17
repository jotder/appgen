import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'app-dialog',
    imports: [],
    template: `<p>dialog works!</p>`,
    styles: ``
})
export class Dialog {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
