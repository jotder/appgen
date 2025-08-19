import {APP_INITIALIZER, ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {PageRegistry} from './core/services/page-registry';
import {WidgetRegistry} from './core/services/widget-registry';
import {registerPages, registerWidgets} from './core/registries';

/** Application configuration object. */
export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        {
            // Registers pages and widgets on application startup.
            provide: APP_INITIALIZER,
            useFactory: (
                pageRegistry: PageRegistry,
                widgetRegistry: WidgetRegistry
            ) => {
                return () => {
                    registerPages(pageRegistry);
                    registerWidgets(widgetRegistry);
                };
            },
            deps: [PageRegistry, WidgetRegistry],
            multi: true,
        },
    ],
};
