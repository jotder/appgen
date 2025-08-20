import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WidgetModel } from '../../core/models';

@Component({
  selector: 'app-widget-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss'],
})
export class WidgetEditorComponent implements OnInit {
  @Input() widget: WidgetModel | undefined;
  @Output() widgetSaved = new EventEmitter<WidgetModel>();
  @Output() cancelled = new EventEmitter<void>();

  widgetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.widgetForm = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      config: this.fb.group({
        title: [''],
      }),
    });
  }

  ngOnInit(): void {
    if (this.widget) {
      this.widgetForm.patchValue(this.widget);
    }
  }

  save(): void {
    if (this.widgetForm.valid) {
      this.widgetSaved.emit(this.widgetForm.value);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
