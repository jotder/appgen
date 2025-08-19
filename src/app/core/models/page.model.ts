import { WidgetModel } from './widget.model';

/** Defines the structure for a page configuration. */
export interface PageModel {
  id: string;
  title: string;
  layout: 'grid'; // or other layouts
  widgets: WidgetModel[];
}

