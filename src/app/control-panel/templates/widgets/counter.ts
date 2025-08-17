import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from '../../../shared/components/widget-host/widget-host';

@Component({
    selector: 'counter',
    imports: [],
    template: `
        <div class="counter-widget">
            <h3>{{ config.label }}</h3>
            <p class="count">Fetching...</p>
        </div>
    `,
    styles: `
    `
})
export class Counter {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
