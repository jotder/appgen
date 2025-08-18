import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { PageRegistryService } from './core/services/page-registry.service';
import { WidgetRegistryService } from './core/services/widget-registry.service';

// Import the components to register
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { LineChartWidgetComponent } from './widgets/line-chart/line-chart.component';

// Factory function to register pages
export function registerPagesFactory(pageRegistry: PageRegistryService) {
  return () => {
    pageRegistry.registerPage('dashboard', DashboardPageComponent);
    // Register other pages here
  };
}

// Factory function to register widgets
export function registerWidgetsFactory(widgetRegistry: WidgetRegistryService) {
  return () => {
    widgetRegistry.registerWidget('line-chart', LineChartWidgetComponent);
    // Register other widgets here
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Add other providers here

    // Provider to register pages on startup
    {
      provide: APP_INITIALIZER,
      useFactory: registerPagesFactory,
      deps: [PageRegistryService],
      multi: true,
    },
    // Provider to register widgets on startup
    {
      provide: APP_INITIALIZER,
      useFactory: registerWidgetsFactory,
      deps: [WidgetRegistryService],
      multi: true,
    },
  ],
};
