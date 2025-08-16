import { Component, Inject } from '@angular/core';
import { WIDGET_CONFIG } from '../../../../../shared/components/widget-host/widget-host';

@Component({
  selector: 'app-form-simple',
  imports: [],
  templateUrl: './form-simple.html',
  styleUrl: './form-simple.scss'
})
export class FormSimple {
  constructor(@Inject(WIDGET_CONFIG) public config: any) {}
}
