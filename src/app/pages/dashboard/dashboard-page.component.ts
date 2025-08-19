import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGE_CONFIG } from '../../core/tokens';
import { IPage } from '../../core/services/page-registry.service';
import { WidgetHostComponent } from '../../components/widget-host/widget-host.component';
import { PageConfig } from '../../core/models';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, WidgetHostComponent],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent implements IPage {
  config: PageConfig | null = inject(PAGE_CONFIG);
}
