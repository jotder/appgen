import {PageRegistry} from './services/page-registry';
import {WidgetRegistry} from './services/widget-registry';
import {DashboardPage} from '../pages/dashboard/dashboard-page';
import {LineChart} from '../widgets/line-chart/line-chart';

export function registerPages(registry: PageRegistry): void {
    registry.registerPage('dashboard', DashboardPage);
    // Register other pages here
}

export function registerWidgets(registry: WidgetRegistry): void {
    registry.registerWidget('line-chart', LineChart);
    // Register other widgets here
}
