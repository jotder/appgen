import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PAGE_CONFIG} from '../../core/tokens';
import {IPage} from '../../core/services/page-registry';
import {PageModel} from '../../core/models';
import {WidgetHost} from "../../components/widget-host";

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [CommonModule, WidgetHost],
    templateUrl: './dashboard-page.html',
})
export class DashboardPage implements IPage {
    config: PageModel | null = inject(PAGE_CONFIG);
}
