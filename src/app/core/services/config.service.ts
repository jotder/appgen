import { Injectable } from '@angular/core';
import { AppConfig, PageConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONFIG_BASE_PATH = '/assets/data';

  async getAppConfig(): Promise<AppConfig> {
    try {
      const response = await fetch(`${this.CONFIG_BASE_PATH}/app.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch app config: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching application configuration:', error);
      return Promise.reject(error);
    }
  }

  async getPageConfig(pageId: string): Promise<PageConfig> {
    try {
      // In a real app, you might fetch a single page config,
      // but here we fetch a file containing all pages.
      const response = await fetch(`${this.CONFIG_BASE_PATH}/dashboard.json`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch page config for "${pageId}": ${response.statusText}`
        );
      }
      const allPages: PageConfig[] = (await response.json()).pages;
      const page = allPages.find((p) => p.id === pageId);
      if (!page) {
        throw new Error(`Page with id "${pageId}" not found.`);
      }
      return page;
    } catch (error) {
      console.error(`Error fetching configuration for page "${pageId}":`, error);
      return Promise.reject(error);
    }
  }
}
