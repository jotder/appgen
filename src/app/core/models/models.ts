export type ID = string;
export type Timestamp = string; // ISO 8601 format

export interface WidgetPreference {
    widgetId: string;
    refreshIntervalMs: number;
    paused: boolean;
    customConfig?: any;
}

export interface PagePreference {
    id: string;                  // Preference record ID
    userId: string;               // Admin user ID
    pageTemplateId: string;  // Which page template it applies to
    widgets: WidgetPreference[];  // Per-widget settings
    lastUpdated: string;          // ISO timestamp
}

export interface PageState {
    pageId: string; // which page
    widgets: WidgetConfig[];
    filters: { [key: string]: any };
    layout: any; // could be a grid layout object
}

export interface WidgetState {
    filterValues: Record<string, any>;
    refreshInterval: number;
    collapsed: boolean;
    scrollY: number;
}

export type WidgetTypeId =
| 'JobSummaryChart'
| 'AlertsList'
| 'UserActivityLog'
| 'CasesByStatusDonut'
| 'JobsNextRunTable'
| 'NotificationsStream'
| 'table-simple'
| 'table-search'
| 'table-crud'
| 'line-chart'
| 'pie-chart'
| 'bubble-chart'
| 'area-chart'
| 'shortest-path'
| 'zoom-graph'
| 'dialog'
| 'detail'
| 'rule-edit'
| 'form-simple'
| 'form-lookup'
| 'counter'
| 'message';


export interface WidgetSchema {
    /** Basic JSON Schema draft-lite we’ll support */
    $id?: string
    title?: string
    type: 'object'
    properties: Record<string, {
        type: 'string'|'number'|'boolean'|'array'|'object';
        title?: string;
        description?: string;
        enum?: any[];
        items?: { type: 'string'|'number'|'boolean'|'object' };
        default?: any;
    }>
    required?: string[];
}

export interface WidgetTypeDef {
    id: WidgetTypeId;
    name: string;
    description?: string;        /** Where data comes from by default (can be overridden per config) */
    defaultApi?: string;        /** JSON schema to render dynamic form */
    schema: WidgetSchema;        /** Optional preview hint */
    previewExample?: Record<string, any>;
}

export interface WidgetConfig {
    id: ID;
    name: string;
    widgetType: WidgetTypeId;
    params: Record<string, any>;
    tags?: string[];
    createdBy?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    version?: number;
}

export interface Page {
    id: ID;
    name: string;
    layout: {
        columns: number;
    };
    widgets: PageWidget[];
    createdBy?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface PageWidget {
    id: ID;
    widgetConfigId: ID;
    titleOverride?: string;
    position: { colStart: number; colSpan: number; row?: number }; // simple grid
}

export interface PageConfig {
    id: string;
    title: string;
    layout: string;
    widgets: WidgetInstanceConfig[];
}

export interface WidgetInstanceConfig {
    instanceId: string;
    type: WidgetTypeId;
    config: any;
}

export interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}

export interface MenuConfig {
  items: MenuItem[];
}
