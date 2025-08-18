import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly CONFIG_BASE_PATH = '/assets/data';

  async getAppConfig(): Promise<any> {
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

  async getPageConfig(pageId: string): Promise<any> {
    try {
      const response = await fetch(`${this.CONFIG_BASE_PATH}/${pageId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page config for "${pageId}": ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching configuration for page "${pageId}":`, error);
      return Promise.reject(error);
    }
  }
}
