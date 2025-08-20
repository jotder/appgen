import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageModel, WidgetModel } from '../../core/models';
import { WidgetEditorComponent } from '../widget-editor/widget-editor.component';

@Component({
  selector: 'app-page-editor',
  standalone: true,
  imports: [ReactiveFormsModule, WidgetEditorComponent],
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements OnInit {
  @Input() page!: PageModel;
  @Output() pageUpdated = new EventEmitter<PageModel>();

  pageForm: FormGroup;
  showWidgetEditor = signal(false);
  editingWidget = signal<WidgetModel | undefined>(undefined);

  constructor(private fb: FormBuilder) {
    this.pageForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.page) {
      this.pageForm.patchValue(this.page);
    }
  }

  save(): void {
    if (this.pageForm.valid) {
      const updatedPage = {
        ...this.page,
        ...this.pageForm.value,
      };
      this.pageUpdated.emit(updatedPage);
    }
  }

  addWidget(): void {
    this.editingWidget.set(undefined);
    this.showWidgetEditor.set(true);
  }

  editWidget(widget: WidgetModel): void {
    this.editingWidget.set(widget);
    this.showWidgetEditor.set(true);
  }

  removeWidget(widget: WidgetModel): void {
    const updatedWidgets = this.page.widgets.filter(w => w.instanceId !== widget.instanceId);
    this.page = { ...this.page, widgets: updatedWidgets };
    this.pageUpdated.emit(this.page);
  }

  handleWidgetSaved(widget: WidgetModel): void {
    let updatedWidgets;
    if (this.editingWidget()) {
      updatedWidgets = this.page.widgets.map(w =>
        w.instanceId === widget.instanceId ? widget : w
      );
    } else {
      updatedWidgets = [...this.page.widgets, widget];
    }
    this.page = { ...this.page, widgets: updatedWidgets };
    this.pageUpdated.emit(this.page);
    this.showWidgetEditor.set(false);
  }

  handleWidgetEditorCancelled(): void {
    this.showWidgetEditor.set(false);
  }
}
