/**
 * Represents the configuration for a single widget instance on a page.
 * @template C The type for the widget-specific configuration properties.
 * @template D The type for the widget's data payload.
 */
export interface WidgetModel<C = Record<string, any>, D = any> {
  instanceId: string; // A unique identifier for this widget instance on the page.
  type: string;  // The type of the widget (e.g., 'line-chart', 'summary-cards').
  config: C & { title?: string };// A `title` property is common and expected for display in the widget host.
  data?: D;  // Optional data for the widget. Can be preloaded or fetched by the widget itself.
}
