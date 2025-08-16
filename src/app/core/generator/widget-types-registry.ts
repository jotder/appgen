import { Injectable, Type } from '@angular/core';
import { WidgetTypeDef, WidgetTypeId } from '../models/models';

import { TableSimple } from '../../control-panel/templates/widgets/tables/table-simple/table-simple';
import { TableSearch } from '../../control-panel/templates/widgets/tables/table-search/table-search';
import { TableCrud } from '../../control-panel/templates/widgets/tables/table-crud/table-crud';
import { LineChart } from '../../control-panel/templates/widgets/charts/line-chart/line-chart';
import { PieChart } from '../../control-panel/templates/widgets/charts/pie-chart/pie-chart';
import { BubbleChart } from '../../control-panel/templates/widgets/charts/bubble-chart/bubble-chart';
import { AreaChart } from '../../control-panel/templates/widgets/charts/area-chart/area-chart';
import { ShortestPath } from '../../control-panel/templates/widgets/graphs/shortest-path/shortest-path';
import { ZoomGraph } from '../../control-panel/templates/widgets/graphs/zoom-graph/zoom-graph';
import { Dialog } from '../../control-panel/templates/widgets/components/dialog/dialog';
import { Detail } from '../../control-panel/templates/widgets/components/detail/detail';
import { RuleEdit } from '../../control-panel/templates/widgets/components/rule-edit/rule-edit';
import { FormSimple } from '../../control-panel/templates/widgets/components/form-simple/form-simple';
import { FormLookup } from '../../control-panel/templates/widgets/components/form-lookup/form-lookup';
import { Counter } from '../../control-panel/templates/widgets/counter/counter';
import { Message } from '../../control-panel/templates/widgets/message/message';

@Injectable({
  providedIn: 'root'
})
export class WidgetTypesRegistry {
  private widgetRegistry = new Map<WidgetTypeId, Type<any>>();
  private widgetTypeDefs = new Map<WidgetTypeId, WidgetTypeDef>();

  constructor() {
    this.registerWidgets();
  }

  private registerWidgets(): void {
    this.widgetRegistry.set('table-simple', TableSimple);
    this.widgetRegistry.set('table-search', TableSearch);
    this.widgetRegistry.set('table-crud', TableCrud);
    this.widgetRegistry.set('line-chart', LineChart);
    this.widgetRegistry.set('pie-chart', PieChart);
    this.widgetRegistry.set('bubble-chart', BubbleChart);
    this.widgetRegistry.set('area-chart', AreaChart);
    this.widgetRegistry.set('shortest-path', ShortestPath);
    this.widgetRegistry.set('zoom-graph', ZoomGraph);
    this.widgetRegistry.set('dialog', Dialog);
    this.widgetRegistry.set('detail', Detail);
    this.widgetRegistry.set('rule-edit', RuleEdit);
    this.widgetRegistry.set('form-simple', FormSimple);
    this.widgetRegistry.set('form-lookup', FormLookup);
    this.widgetRegistry.set('counter', Counter);
    this.widgetRegistry.set('message', Message);

    this.widgetTypeDefs.set('message', {
      id: 'message',
      name: 'Message',
      schema: {
        type: 'object',
        properties: {
          text: { type: 'string', title: 'Display Text' }
        },
        required: ['text']
      }
    });
    this.widgetTypeDefs.set('counter', {
      id: 'counter',
      name: 'Counter',
      schema: {
        type: 'object',
        properties: {
          label: { type: 'string', title: 'Label' },
          apiUrl: { type: 'string', title: 'API URL' }
        },
        required: ['label']
      }
    });
  }

  getWidget(typeId: WidgetTypeId): Type<any> | undefined {
    return this.widgetRegistry.get(typeId);
  }

  get(typeId: WidgetTypeId): WidgetTypeDef | undefined {
    return this.widgetTypeDefs.get(typeId);
  }

  list(): WidgetTypeDef[] {
    return Array.from(this.widgetTypeDefs.values());
  }
}
