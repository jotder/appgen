import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Config} from '../../core/services/config';
import {WidgetHost} from '../../components/widget-host';
import {PageModel} from '../../core/models';

/** Renders a page and its widgets based on the route's ':id' parameter. */
@Component({
    selector: 'app-dynamic-page',
    standalone: true,
    imports: [CommonModule, WidgetHost],
    templateUrl: './dynamic-page.html',
    styleUrls: ['./dynamic-page.scss'],
})
export class DynamicPage {
    private readonly route = inject(ActivatedRoute);
    private readonly configService = inject(Config);

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
