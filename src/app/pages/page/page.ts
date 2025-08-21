import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

import {PageModel} from '../../core/models';
import {Config} from '../../core/services/config';
import {WidgetHost} from "../../components/widget-host";


/**
 * Renders a page and its widgets based on a route parameter
 */
@Component({
    selector: 'app-page',
    standalone: true,
    imports: [CommonModule, WidgetHost],
    templateUrl: './page.html',
    styleUrls: ['./page.scss'],
})
export class Page {
    private route = inject(ActivatedRoute);
    private configService = inject(Config);

    /** Signal representing the current route parameters. */
    private params = toSignal(this.route.paramMap);
    /** Signal for the current page ID from the route. */
    private pageId = computed(() => this.params()?.get('id'));

    /** The configuration for the current page, derived from the pageId signal. */
    readonly page = computed<PageModel | undefined>(() => {
        const id = this.pageId();
        return id ? this.configService.getPage(id) : undefined;
    });
}
