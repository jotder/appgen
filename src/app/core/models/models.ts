/**
 * A generic type for unique identifiers, typically a string like a UUID.
 */
export type ID = string;

/**
 * A string representing a date and time in ISO 8601 format (e.g., "2023-10-27T10:00:00Z").
 */
export type Timestamp = string;

/**
 * Defines user-specific preferences for a single widget instance on a page.
 * This allows users to customize widget behavior without altering the base `WidgetConfig`.
 */
export interface WidgetPreference {
    /** The unique identifier of the widget instance this preference applies to. */
    widgetId: string;
    /** How often the widget should refresh its data, in milliseconds. */
    refreshIntervalMs: number;
    /** Whether the widget's automatic refresh is paused. */
    paused: boolean;
    /** A flexible object for any other user-specific custom settings. */
    customConfig?: any;
}




/**
 * Captures the state of an individual widget instance at runtime.
 */
export interface WidgetState {
    /** Current values of any filters specific to this widget. */
    filterValues: Record<string, any>;
    /** The widget's current refresh interval. */
    refreshInterval: number;
    /** Whether the widget is currently collapsed or expanded. */
    collapsed: boolean;
    /** The vertical scroll position within the widget, if applicable. */
    scrollY: number;
}

/**
 * A string literal type that enumerates all valid, registered widget types in the system.
 * This ensures type safety when referencing widget types.
 */
export type WidgetTypeId =
    | 'JobSummaryChart'       // Example business-specific widget
    | 'AlertsList'            // Example business-specific widget
    | 'UserActivityLog'       // Example business-specific widget
    | 'CasesByStatusDonut'    // Example business-specific widget
    | 'JobsNextRunTable'      // Example business-specific widget
    | 'NotificationsStream'   // Example business-specific widget
    | 'table-simple'          // Generic simple table widget
    | 'table-search'          // Table with search capabilities
    | 'table-crud'            // Table with full CRUD operations
    | 'line-chart'            // Generic line chart widget
    | 'pie-chart'             // Generic pie chart widget
    | 'bubble-chart'          // Generic bubble chart widget
    | 'area-chart'            // Generic area chart widget
    | 'shortest-path'         // Graph visualization widget
    | 'zoom-graph'            // Interactive graph widget
    | 'dialog'                // A widget that can open a dialog
    | 'detail'                // A widget for showing item details
    | 'rule-edit'             // A form for editing rules
    | 'form-simple'           // A simple, generic form widget
    | 'form-lookup'           // A form with lookup capabilities
    | 'counter'               // A simple counter/KPI widget
    | 'message';              // A widget for displaying a static message


/**
 * Defines the structure of a widget's configurable parameters using a subset of JSON Schema.
 * This schema is used to dynamically generate a configuration form for the widget.
 */
export interface WidgetSchema {
    /** Basic JSON Schema draft-lite we’ll support */
    $id?: string
    title?: string
    type: 'object'
    properties: Record<string, {
        type: 'string' | 'number' | 'boolean' | 'array' | 'object';
        title?: string;
        description?: string;
        enum?: any[];
        items?: { type: 'string' | 'number' | 'boolean' | 'object' };
        default?: any;
    }>
    required?: string[];
}

/**
 * Defines a type of widget available in the system. It's a template definition.
 * It contains metadata, the default API endpoint, and the schema for its configuration parameters.
 */
export interface WidgetTypeDef {
    /** The unique identifier for this widget type. */
    id: WidgetTypeId;
    /** The human-readable name of the widget type. */
    name: string;
    /** A brief description of what the widget does. */
    description?: string;
    /** The default API endpoint to fetch data from (can be overridden in `WidgetConfig`). */
    defaultApi?: string;
    /** The JSON schema that defines the configurable `params` for this widget type. */
    schema: WidgetSchema;
    /** An example of parameter values, useful for previews or documentation. */
    previewExample?: Record<string, any>;
}

/**
 * Represents a saved, reusable configuration for a widget.
 * This defines a specific instance of a `WidgetTypeDef` with concrete parameters.
 * For example, a `line-chart` type could have a config named "Sales Last 30 Days".
 */
export interface WidgetConfig {
    /** The unique ID of this specific widget configuration. */
    id: ID;
    /** A human-readable name for this configuration (e.g., "Users Online Counter"). */
    name: string;
    /** The type of widget this configuration is for. */
    widgetType: WidgetTypeId;
    /** A key-value map of parameters that configure the widget, conforming to the `WidgetTypeDef.schema`. */
    params: Record<string, any>;
    /** Optional tags for organizing and filtering widget configurations. */
    tags?: string[];
    /** The user who created this configuration. */
    createdBy?: string;
    /** The timestamp of when this configuration was created. */
    createdAt?: Timestamp;
    /** The timestamp of when this configuration was last updated. */
    updatedAt?: Timestamp;
    /** A version number for tracking changes. */
    version?: number;
}


/**
 * Stores a user's personalized settings for a specific page template.
 */
export interface PagePreference {
    /** The unique ID of this preference record. */
    id: string;
    /** The ID of the user who owns these preferences. */
    userId: string;
    /** The ID of the page template these preferences apply to. */
    pageTemplateId: string;
    /** An array of widget-specific preferences for this page. */
    widgets: WidgetPreference[];
    /** The timestamp of when these preferences were last updated. */
    lastUpdated: Timestamp;
}
/**
 * Represents the complete runtime state of a page, potentially for saving and restoring sessions.
 */
export interface PageState {
    /** The ID of the page this state belongs to. */
    pageId: string;
    /** The configuration of all widgets currently on the page. */
    widgets: WidgetConfig[];
    /** A map of active filters applied to the page. */
    filters: { [key: string]: any };
    /** The layout configuration of the page, e.g., grid settings. */
    layout: any;
}
/**
 * Defines the structure and content of a dashboard page.
 */
export interface Page {
    /** The unique ID of the page. */
    id: ID;
    /** The display name of the page. */
    name: string;
    /** Defines the layout grid for the page, e.g., number of columns. */
    layout: {
        columns: number;
    };
    /** An array of widget instances that appear on this page. */
    widgets: PageWidget[];
    /** The user who created the page. */
    createdBy?: string;
    /** The timestamp of when the page was created. */
    createdAt?: Timestamp;
    /** The timestamp of when the page was last updated. */
    updatedAt?: Timestamp;
}

/**
 * Represents a specific instance of a widget placed on a `Page`.
 * It links to a reusable `WidgetConfig` and defines its specific position and title on the page.
 */
export interface PageWidget {
    /** A unique identifier for this specific widget instance on the page. */
    id: ID;
    /** The ID of the `WidgetConfig` to use for this instance. */
    widgetConfigId: ID;
    /** An optional title that overrides the one from `WidgetConfig.name` for this instance only. */
    titleOverride?: string;
    /** The position and size of the widget within the page's grid layout. */
    position: { colStart: number; colSpan: number; row?: number };
}

/**
 * A simplified or alternative model for a page configuration.
 * This might be used for pages generated from a simpler, flat configuration source.
 */
export interface PageConfig {

    id: string;  /** The unique ID of the page configuration. */
    /** The title of the page. */
    title: string;
    /** A string identifier for the layout template (e.g., 'two-column'). */
    layout: string;
    /** The list of widget instances on this page. */
    widgets: WidgetInstanceConfig[];
}

/**
 * A simplified model for a widget instance, used within `PageConfig`.
 */
export interface WidgetInstanceConfig {
    /** A unique identifier for this widget instance. */
    instanceId: string;
    /** The type of widget to render. */
    type: WidgetTypeId;
    /** The specific configuration for this instance, which may not be a reusable `WidgetConfig`. */
    config: any;
}


/**
 * Defines a single, navigable item in the application's menu.
 */
export interface MenuItem {
    /** The text to display for the menu item. */
    label: string;
    /** The router link for navigation. */
    route: string;
    /** An optional icon to display next to the label. */
    icon?: string;
}

/**
 * Defines the structure of the entire application menu.
 */
export interface MenuConfig {
    /** An array of menu items. */
    items: MenuItem[];
}

// Each component under src/app/control-panel/templates/widgets will be widget component.
// each widget must have a WidgetConfig json to to make it functional