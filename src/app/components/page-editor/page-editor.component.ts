import { Component, computed, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageModel, WidgetModel } from '../../core/models';
import { WidgetEditorComponent } from '../widget-editor/widget-editor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-editor',
  standalone: true,
  imports: [ReactiveFormsModule, WidgetEditorComponent,CommonModule],
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  @Input({ required: true }) page!: PageModel;
  @Output() pageUpdated = new EventEmitter<PageModel>();

  pageForm!: FormGroup;

  // State for the widget editor
  showWidgetEditor = signal(false);
  editingWidget = signal<WidgetModel | undefined>(undefined);

  // A computed signal to get the ID of the currently selected widget for the dropdown
  selectedWidgetId = computed(() => this.editingWidget()?.instanceId ?? 'null');

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      title: [this.page.title],
    });
  }

  onWidgetSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const widgetId = selectElement.value;

    if (widgetId && widgetId !== 'null') {
      const widgetToEdit = this.page.widgets.find(w => w.instanceId === widgetId);
      if (widgetToEdit) {
        this.editWidget(widgetToEdit);
      }
    } else {
      this.handleWidgetEditorCancelled();
    }
  }

  editWidget(widget: WidgetModel): void {
    this.editingWidget.set(widget);
    this.showWidgetEditor.set(true);
  }

  removeSelectedWidget(): void {
    const widgetToRemove = this.editingWidget();
    if (!widgetToRemove) {
      return;
    }

    const confirmed = confirm(`Are you sure you want to remove the widget "${widgetToRemove.config?.title || widgetToRemove.type}"?`);
    if (confirmed) {
      // Create a new array instead of mutating
      const updatedWidgets = this.page.widgets.filter(w => w.instanceId !== widgetToRemove.instanceId);
      this.page = { ...this.page, widgets: updatedWidgets };
      this.handleWidgetEditorCancelled();
      this.save(); // auto-save page after removing a widget
    }
  }

  addWidget(): void {
    // Create a new placeholder widget
    const newWidget: WidgetModel = {
      instanceId: `widget_${Date.now()}`, // Simple unique ID
      type: 'new-widget', // Placeholder type
      config: {
        title: 'New Widget'
      }
    };
    this.editWidget(newWidget);
  }

  handleWidgetSaved(savedWidget: WidgetModel): void {
    const existingWidgetIndex = this.page.widgets.findIndex(w => w.instanceId === savedWidget.instanceId);

    let updatedWidgets: WidgetModel[];

    if (existingWidgetIndex > -1) {
      // Update existing widget
      updatedWidgets = this.page.widgets.map(w => w.instanceId === savedWidget.instanceId ? savedWidget : w);
    } else {
      // Add new widget
      updatedWidgets = [...this.page.widgets, savedWidget];
    }

    this.page = { ...this.page, widgets: updatedWidgets };
    this.handleWidgetEditorCancelled();
    this.save(); // auto-save page after adding/editing a widget
  }

  handleWidgetEditorCancelled(): void {
    this.editingWidget.set(undefined);
    this.showWidgetEditor.set(false);
  }

  save(): void {
    const updatedPage: PageModel = {
      ...this.page,
      title: this.pageForm.value.title,
      // widgets are already updated on the this.page object
    };
    this.pageUpdated.emit(updatedPage);
    alert(`Page "${updatedPage.title}" updated locally. Remember to save all application changes to persist.`);
  }
}
