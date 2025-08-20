import { Injectable, signal, inject } from '@angular/core';
import { ApplicationConfig, MenuItem, PageModel, WidgetModel } from '../models';
import { ConfigStore } from './config.store';

/**
 * Loads and provides access to all application configuration data.
 */
@Injectable({
  providedIn: 'root',
})
export class Config {
  private readonly configStore = inject(ConfigStore);

  /** Signal for the main application configuration from app.json. */
  appConfig = signal<ApplicationConfig>({} as ApplicationConfig);
  /** A map of all available page configurations, keyed by page ID. */
  private pages = new Map<string, PageModel>();

  constructor() {
    this.loadData();
  }

  /** Retrieves a page configuration by its ID. */
  getPage(id: string): PageModel | undefined {
    return this.pages.get(id);
  }

  /** Retrieves all page configurations. */
  getAllPages(): PageModel[] {
    return Array.from(this.pages.values());
  }

  /**
   * Retrieves the menu configuration for a specific user role.
   * This is a convenience method to extract role-specific data from the main config.
   * @param role The role of the user (e.g., 'user', 'admin').
   * @returns An array of MenuItem for the given role, or an empty array if not found.
   */
  getMenuForRole(role: string): MenuItem[] {
    const config = this.appConfig();
    if (!config?.auth) {
      return [];
    }
    return config.auth[role]?.menu ?? [];
  }

  /** Loads all JSON configuration data from the ConfigStore into memory. */
  public loadData(): void {
    this.appConfig.set(this.configStore.getAppConfig());

    const allPages: PageModel[] = this.configStore.getPages();

    this.pages.clear();
    allPages.forEach(page => {
      if (page?.widgets) {
        page.widgets.forEach((widget: WidgetModel) => {
          const configWithData = widget.config as any;
          if (configWithData.data) {
            widget.data = configWithData.data;
            delete configWithData.data;
          }
        });
      }
      this.pages.set(page.id, page);
    });
  }
}
