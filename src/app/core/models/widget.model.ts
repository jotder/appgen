/**
 * Represents the configuration for a single widget instance on a page.
 */
export interface WidgetModel {
    /** A unique identifier for this widget instance on the page. */
    instanceId: string;
    /** The type of the widget (e.g., 'line-chart', 'summary-cards'). */
    type: string;
    /** The title of the widget, often displayed in a card header. */
    title?: string;

    /** Widget-specific configuration properties. */
    [key: string]: any;

    data: any;

    config: any;
}