import {Injectable, signal} from '@angular/core';
import {PageModel} from '../models/page.model';
import {MenuItem} from '../models/menu.model';

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
    /** Signal for the main navigation menu items. */
    menuItems = signal<MenuItem[]>([]);
    /** A map of all available page configurations, keyed by page ID. */
    private pages = new Map<string, PageModel>();

    constructor() {
        this.loadData();
    }

    /** Retrieves a page configuration by its ID. */
    getPage(id: string): PageModel | undefined {
        return this.pages.get(id);
    }

    /** Loads all JSON configuration data into memory. */
    private loadData(): void {
        this.menuItems.set((appData as any).menu);

        const allPages: PageModel[] = [
            ...(dashboardData as any).pages,
            ...(salesReportData as any).pages,
            ...(userActivityData as any).pages,
        ];

        allPages.forEach(page => this.pages.set(page.id, page));
    }
}