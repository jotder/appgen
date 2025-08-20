import {Injectable, signal} from '@angular/core';
import {ApplicationConfig, MenuItem, PageModel, WidgetModel} from '../models';

// In a real app, this data would come from an API.
// For this project, we import the mock JSON data directly.

import * as appData from '../../../assets/data/app.json';
import * as dashboardData from '../../../assets/data/dashboard.json';
import * as salesReportData from '../../../assets/data/sales-report.json';
import * as userActivityData from '../../../assets/data/user-activity.json';

/**
 * Loads and provides access to all application configuration data.
 */
@Injectable({
    providedIn: 'root',
})
export class Config {
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
        // The config might not be loaded yet, or auth might be missing.
        if (!config?.auth) {
            return [];
        }
        return config.auth[role]?.menu ?? [];
    }

    /** Loads all JSON configuration data into memory. */
    private loadData(): void {
        // The `default` property can appear when TypeScript's `esModuleInterop` is true.
        // We handle both cases for robustness.
        const loadedAppData = (appData as any).default || appData;
        this.appConfig.set(loadedAppData.application);

        // Each JSON file represents a single PageModel object.
        // We collect them into an array directly.
        const allPages: PageModel[] = [
            (dashboardData as any).default || dashboardData,
            (salesReportData as any).default || salesReportData,
            (userActivityData as any).default || userActivityData,
        ];

        allPages.forEach(page => {
            // Data Normalization: The source JSON files have widget data nested inside
            // the `config` object for authoring convenience. However, the `WidgetModel`
            // expects the `data` property at the root level of the widget object.
            // We normalize the structure here during the loading process to ensure
            // the rest of the application works with a consistent and predictable data model.
            if (page?.widgets) {
                page.widgets.forEach((widget: WidgetModel) => {
                    const configWithData = widget.config as any;
                    if (configWithData.data) {
                        widget.data = configWithData.data;
                        delete configWithData.data; // Clean up to prevent confusion
                    }
                });
            }
            this.pages.set(page.id, page);
        });
    }
}
