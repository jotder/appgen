// import {Component, inject, Injector, input, OnInit, ViewContainerRef,} from '@angular/core';
// import {WidgetConfig} from '../core/models/widget.model';
// import {WidgetRegistry} from '../core/services/widget-registry';
// import {WIDGET_CONFIG} from '../core/tokens';
//
// @Component({
//     selector: 'app-widget-host',
//     standalone: true,
//     template: '', // The host itself has no template; it just hosts the dynamic component.
// })
// export class WidgetHost implements OnInit {
//     /** The configuration for the widget to be rendered. */
//     widgetConfig = input.required<WidgetConfig>();
//
//     private vcr = inject(ViewContainerRef);
//     private registry = inject(WidgetRegistry);
//     private parentInjector = inject(Injector);
//
//     ngOnInit(): void {
//         this.loadWidget();
//     }
//
//     private loadWidget(): void {
//         this.vcr.clear();
//         const config = this.widgetConfig();
//         const componentType = this.registry.getWidget(config.type);
//
//         if (componentType) {
//             // Create a custom injector to provide the specific widget config via the WIDGET_CONFIG token.
//             const injector = Injector.create({
//                 providers: [{provide: WIDGET_CONFIG, useValue: config}],
//                 parent: this.parentInjector
//             });
//             this.vcr.createComponent(componentType, {injector});
//         } else {
//             console.error(`[WidgetHost] Widget type "${config.type}" not found in registry.`);
//         }
//     }
// }