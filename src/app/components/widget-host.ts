import {Component, effect, inject, Injector, input, ViewChild, ViewContainerRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {WidgetRegistry} from '../core/services/widget-registry';
import {WIDGET_CONFIG} from '../core/tokens';
import {WidgetModel} from '../core/models';

/**
 * A host component that dynamically loads and renders a widget component
 * based on the provided widget configuration.
 */
@Component({
    selector: 'app-widget-host',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardHeader, MatCard],
    template: `
        <mat-card class="widget-card">
            <mat-card-header>
                <mat-card-title>{{ config().config.title ?? 'Widget' }}</mat-card-title>
                <mat-card-subtitle>Type: {{ config().type }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
                <ng-container #container></ng-container>
            </mat-card-content>
        </mat-card>
    `,
    styles: [`
      .widget-card {
        height: 100%;
      }
    `]
})

export class WidgetHost {
    /** The configuration for the widget to be rendered. */
    config = input.required<WidgetModel>();

    @ViewChild('container', {read: ViewContainerRef, static: true})
    private container!: ViewContainerRef;

    private widgetRegistry = inject(WidgetRegistry);
    private injector = inject(Injector);

    constructor() {
        effect(() => {
            this.loadWidget();
        });
    }

    private loadWidget(): void {
        // Clear any previously rendered widget
        this.container.clear();

        const widgetData = this.config();
        if (!widgetData) {
            return;
        }

        // Prevent rendering if the widget's specific 'config' property is missing.
        // This makes the host resilient to malformed data from the JSON source.
        if (!widgetData.config) {
            console.warn(`[WidgetHost] Widget "${widgetData.type}" (instanceId: ${widgetData.instanceId}) is missing its 'config' object. It will not be rendered.`);
            return;
        }

        const componentType = this.widgetRegistry.getWidget(widgetData.type);

        if (componentType) {
            // Create a custom injector to provide the specific widget config to the component
            const widgetInjector = Injector.create({
                providers: [
                    {provide: WIDGET_CONFIG, useValue: widgetData},
                ],
                parent: this.injector,
            });

            // Create and insert the component into the container
            this.container.createComponent(componentType, {injector: widgetInjector});
        } else {
            console.error(`[WidgetHost] No component found for widget type: ${widgetData.type}`);
        }
    }
}
