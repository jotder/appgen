import {
  Component,
  inject,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { WidgetRegistryService } from '../../core/services/widget-registry.service';
import { WIDGET_CONFIG } from '../../core/tokens';

@Component({
  selector: 'app-widget-host',
  standalone: true,
  template: '', // The view is dynamically created
})
export class WidgetHostComponent implements OnChanges {
  private readonly widgetRegistry = inject(WidgetRegistryService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly injector = inject(Injector);

  @Input({ required: true }) widgetConfig: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['widgetConfig'] && this.widgetConfig) {
      this.loadWidget();
    }
  }

  private loadWidget(): void {
    const widgetType = this.widgetConfig?.type;
    if (!widgetType) {
      console.error('Widget configuration must have a "type" property.');
      return;
    }

    const component = this.widgetRegistry.getWidget(widgetType);
    if (!component) {
      console.error(`Widget type "${widgetType}" not found in registry.`);
      return;
    }

    // Clear previous view
    this.vcr.clear();

    // Create a custom injector to provide the WIDGET_CONFIG token
    const customInjector = Injector.create({
      providers: [{ provide: WIDGET_CONFIG, useValue: this.widgetConfig }],
      parent: this.injector,
    });

    // Create the component
    this.vcr.createComponent(component, { injector: customInjector });
  }
}
