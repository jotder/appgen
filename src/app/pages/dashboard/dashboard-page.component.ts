import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGE_CONFIG } from '../../core/tokens';
import { IPage } from '../../core/services/page-registry.service';
import { WidgetHostComponent } from '../../components/widget-host/widget-host.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, WidgetHostComponent],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent implements IPage {
  config = inject(PAGE_CONFIG);

  // Helper to get widgets for a specific slot
  getWidgetsForSlot(slotId: string): any[] {
    const slot = this.config.layout?.slots?.find((s: any) => s.id === slotId);
    return slot?.widgets || [];
  }
}
