import {Component, Inject} from '@angular/core';
import {WIDGET_CONFIG} from "../../../shared/components/widget-host/widget-host";

@Component({
    selector: 'app-message',
    imports: [],
    template: `
        <div class="message-widget">
            <p>{{ config.text }}</p>
        </div>
    `,
    styles: `
    `
})
export class Message {
    constructor(@Inject(WIDGET_CONFIG) public config: any) {
    }
}
