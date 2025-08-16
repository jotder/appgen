import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
