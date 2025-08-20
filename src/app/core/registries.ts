import {PageRegistry} from './services/page-registry';
import {WidgetRegistry} from './services/widget-registry';
import {DashboardPage} from '../pages/dashboard/dashboard-page';
import {LineChartWidget} from '../widgets/line-chart/line-chart.widget';

export function registerPages(registry: PageRegistry): void {
    registry.registerPage('dashboard', DashboardPage);
    // Register other pages here
}

export function registerWidgets(registry: WidgetRegistry): void {
    registry.registerWidget('line-chart', LineChartWidget);
    // Register other widgets here
}
