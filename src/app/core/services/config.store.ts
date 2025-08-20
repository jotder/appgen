import { Injectable, signal } from '@angular/core';
import { ApplicationConfig, PageModel } from '../models';

import * as appData from '../../../assets/data/app.json';
import * as dashboardData from '../../../assets/data/dashboard.json';
import * as salesReportData from '../../../assets/data/sales-report.json';
import * as userActivityData from '../../../assets/data/user-activity.json';

@Injectable({
  providedIn: 'root',
})
export class ConfigStore {
  private _appConfig = signal<ApplicationConfig>(((appData as any).default || appData).application);
  private _pages = signal<PageModel[]>([
    (dashboardData as any).default || dashboardData,
    (salesReportData as any).default || salesReportData,
    (userActivityData as any).default || userActivityData,
  ]);

  getAppConfig() {
    return this._appConfig();
  }

  getPages() {
    return this._pages();
  }

  updateAppConfig(newConfig: ApplicationConfig) {
    this._appConfig.set(newConfig);
  }

  updatePage(updatedPage: PageModel) {
    this._pages.update(pages =>
      pages.map(page => (page.id === updatedPage.id ? updatedPage : page))
    );
  }

  addPage(newPage: PageModel) {
    this._pages.update(pages => [...pages, newPage]);
  }
}
