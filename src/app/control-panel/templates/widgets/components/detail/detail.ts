import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
