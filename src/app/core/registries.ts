import { PageRegistryService } from './services/page-registry.service';
import { WidgetRegistryService } from './services/widget-registry.service';
import { DashboardPageComponent } from '../pages/dashboard/dashboard-page.component';
import { LineChartComponent } from '../widgets/line-chart/line-chart.component';

export function registerPages(registry: PageRegistryService): void {
  registry.registerPage('dashboard', DashboardPageComponent);
  // Register other pages here
}

export function registerWidgets(registry: WidgetRegistryService): void {
  registry.registerWidget('line-chart', LineChartComponent);
  // Register other widgets here
}
