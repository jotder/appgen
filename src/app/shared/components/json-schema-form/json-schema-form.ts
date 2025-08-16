import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-schema-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-schema-form.html',
  styleUrl: './json-schema-form.scss'
})
export class JsonSchemaForm {
  @Input() schema: any;
  @Input() formData: any;
  @Output() formDataChange = new EventEmitter<any>();
}
