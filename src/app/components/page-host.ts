import {Component, inject, Injector, Input, OnChanges, SimpleChanges, ViewContainerRef,} from '@angular/core';
import {PageRegistry} from '../core/services/page-registry';
import {PAGE_CONFIG} from '../core/tokens';
import { PageModel} from '../core/models/page.model';

/**
 * Dynamically loads and renders a page component from the PageRegistry.
 */
@Component({
    selector: 'app-page-host',
    standalone: true,
    template: '', // The view is dynamically created
})
export class PageHost implements OnChanges {
    @Input({required: true}) pageName: string | null = null;
    /** Optional configuration to be injected into the dynamic page component. */
    @Input() pageConfig: PageModel | null = null;

    private readonly pageRegistry = inject(PageRegistry);
    private readonly vcr = inject(ViewContainerRef);
    private readonly injector = inject(Injector);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['pageName'] && this.pageName) {
            this.loadPage();
        }
    }

    /** Loads the component associated with the current pageName. */
    private loadPage(): void {
        if (!this.pageName) {
            console.error('Page host requires a "pageName" property.');
            return;
        }

        const component = this.pageRegistry.getPage(this.pageName);
        if (!component) {
            console.error(`Page name "${this.pageName}" not found in registry.`);
            return;
        }

        // Clear previous view
        this.vcr.clear();

        // Create a custom injector to provide the PAGE_CONFIG token
        const customInjector = Injector.create({
            providers: [{provide: PAGE_CONFIG, useValue: this.pageConfig}],
            parent: this.injector,
        });

        // Create the component
        this.vcr.createComponent(component, {injector: customInjector});
    }
}
