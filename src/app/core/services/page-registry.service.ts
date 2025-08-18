import { Injectable, Type } from '@angular/core';

// Define a common interface for all page components
export interface IPage {
  config: any;
}

// A type for the component class itself
export type PageComponentType = Type<IPage>;

@Injectable({
  providedIn: 'root'
})
export class PageRegistryService {
  private pageRegistry = new Map<string, PageComponentType>();

  registerPage(pageName: string, component: PageComponentType): void {
    if (this.pageRegistry.has(pageName)) {
      console.warn(`Page name "${pageName}" is already registered. Overwriting.`);
    }
    this.pageRegistry.set(pageName, component);
  }

  getPage(pageName: string): PageComponentType | undefined {
    return this.pageRegistry.get(pageName);
  }
}
