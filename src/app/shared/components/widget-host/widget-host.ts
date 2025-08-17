import {
    Component,
    ComponentRef,
    InjectionToken,
    Injector,
    Input,
    OnChanges,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {WidgetInstanceConfig} from '../../../core/models/models';
import {WidgetTypesRegistry} from '../../../core/generator/widget-types-registry';

export const WIDGET_CONFIG = new InjectionToken<any>('WIDGET_CONFIG');

@Component({
    selector: 'app-widget-host',
    standalone: true,
    imports: [],
    template: '',
})
export class WidgetHost implements OnChanges {
    @Input() widget!: WidgetInstanceConfig;

    private componentRef?: ComponentRef<any>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private widgetRegistry: WidgetTypesRegistry,
        private injector: Injector
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['widget']) {
            this.loadComponent();
        }
    }

    private loadComponent(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.viewContainerRef.clear();

        if (this.widget) {
            const componentType = this.widgetRegistry.getWidget(this.widget.type);
            if (componentType) {
                const injector = Injector.create({
                    providers: [{provide: WIDGET_CONFIG, useValue: this.widget.config}],
                    parent: this.injector,
                });
                this.componentRef = this.viewContainerRef.createComponent(componentType, {injector});
            }
        }
    }
}
