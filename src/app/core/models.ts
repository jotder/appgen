export interface AppConfig {
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  route: string;
}

export interface PageConfig {
  id: string;
  title: string;
  layout: string;
  widgets: WidgetConfig[];
}

export interface WidgetConfig {
  instanceId: string;
  type: string;
  config: any;
}
