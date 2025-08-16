import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
