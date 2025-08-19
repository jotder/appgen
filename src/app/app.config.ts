import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PageRegistryService } from './core/services/page-registry.service';
import { WidgetRegistryService } from './core/services/widget-registry.service';
import { registerPages, registerWidgets } from './core/registries';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: (
        pageRegistry: PageRegistryService,
        widgetRegistry: WidgetRegistryService
      ) => {
        return () => {
          registerPages(pageRegistry);
          registerWidgets(widgetRegistry);
        };
      },
      deps: [PageRegistryService, WidgetRegistryService],
      multi: true,
    },
  ],
};
