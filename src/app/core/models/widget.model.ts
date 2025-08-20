/**
 * Represents the configuration for a single widget instance on a page.
 * @template C The type for the widget-specific configuration properties.
 * @template D The type for the widget's data payload.
 */
export interface WidgetModel<C = Record<string, any>, D = any> {
    /** A unique identifier for this widget instance on the page. */
    instanceId: string;
    /** The type of the widget (e.g., 'line-chart', 'summary-cards'). */
    type: string;

    /**
     * Widget-specific configuration properties.
     * A `title` property is common and expected for display in the widget host.
     */
    config: C & { title?: string };
    /** Optional data for the widget. Can be preloaded or fetched by the widget itself. */
    data?: D;
}