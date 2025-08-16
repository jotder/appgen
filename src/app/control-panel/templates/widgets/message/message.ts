import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.scss'
})
export class Message {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
