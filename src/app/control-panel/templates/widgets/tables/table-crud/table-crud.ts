import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-table-crud',
  imports: [],
  templateUrl: './table-crud.html',
  styleUrl: './table-crud.scss'
})
export class TableCrud {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
