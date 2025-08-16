import { Injectable } from '@angular/core';
import { PageConfig } from '../models/models';
import * as dashboardConfig from '../../../assets/data/dashboard.config.json';

@Injectable({
  providedIn: 'root'
})
export class PageConfigService {
  private pageConfigs: PageConfig[] = (dashboardConfig as any).dashboards;

  constructor() { }

  public getPageConfig(id: string): PageConfig | undefined {
    return this.pageConfigs.find(d => d.id === id);
  }
}