import { Injectable, Type } from '@angular/core';
import { SummaryCardsWidget } from '../../widgets/summary-cards/summary-cards.widget';
import { WidgetModel } from '../models/widget.model';

/**
 * A base interface for all widget components to ensure type safety and a common API.
 */
export interface IWidgetComponent {
  /**
   * The configuration object for the widget instance.
   * This is provided via dependency injection using the WIDGET_CONFIG token.
   */
  config: WidgetModel;
}

/**
 * Manages the registration and retrieval of widget components.
 * This service provides a central map from a widget type string (from JSON config)
 * to the actual Angular component class that should be rendered.
 */
@Injectable({
  providedIn: 'root',
})
export class WidgetRegistry {
  private widgetMap = new Map<string, Type<IWidgetComponent>>();

  constructor() {
    this.registerAllWidgets();
  }

  /**
   * Retrieves the component type for a given widget type string.
   * @param type The type string of the widget (e.g., 'summary-cards').
   * @returns The component's Type, or undefined if no component is registered for that type.
   */
  getWidget(type: string): Type<IWidgetComponent> | undefined {
    return this.widgetMap.get(type);
  }

  /**
   * Registers a single widget component.
   * @param type The type string to associate with the component.
   * @param component The component class (Type).
   */
  registerWidget(type: string, component: Type<IWidgetComponent>): void {
    if (this.widgetMap.has(type)) {
      console.warn(`[WidgetRegistry] Widget type "${type}" is already registered. Overwriting.`);
    }
    this.widgetMap.set(type, component);
  }

  private registerAllWidgets(): void {
    this.registerWidget('summary-cards', SummaryCardsWidget);
  }
}