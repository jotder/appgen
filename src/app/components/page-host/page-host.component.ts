import {
  Component,
  inject,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { PageRegistryService } from '../../core/services/page-registry.service';
import { PAGE_CONFIG } from '../../core/tokens';
import { PageConfig } from '../../core/models';

@Component({
  selector: 'app-page-host',
  standalone: true,
  template: '', // The view is dynamically created
})
export class PageHostComponent implements OnChanges {
  private readonly pageRegistry = inject(PageRegistryService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly injector = inject(Injector);

  @Input({ required: true }) pageName: string | null = null;
  @Input() pageConfig: PageConfig | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageName'] && this.pageName) {
      this.loadPage();
    }
  }

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
      providers: [{ provide: PAGE_CONFIG, useValue: this.pageConfig }],
      parent: this.injector,
    });

    // Create the component
    this.vcr.createComponent(component, { injector: customInjector });
  }
}
