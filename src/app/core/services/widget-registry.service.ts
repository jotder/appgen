import { Injectable, Type } from '@angular/core';

// Define a common interface for all widget components
export interface IWidget {
  config: any;
}

// A type for the component class itself
export type WidgetComponentType = Type<IWidget>;

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  private widgetRegistry = new Map<string, WidgetComponentType>();

  registerWidget(widgetType: string, component: WidgetComponentType): void {
    if (this.widgetRegistry.has(widgetType)) {
      console.warn(`Widget type "${widgetType}" is already registered. Overwriting.`);
    }
    this.widgetRegistry.set(widgetType, component);
  }

  getWidget(widgetType: string): WidgetComponentType | undefined {
    return this.widgetRegistry.get(widgetType);
  }
}
