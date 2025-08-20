import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageModel } from '../../core/models';

@Component({
  selector: 'app-page-wizard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './page-wizard.component.html',
  styleUrls: ['./page-wizard.component.scss'],
})
export class PageWizardComponent {
  @Output() pageCreated = new EventEmitter<PageModel>();
  @Output() cancelled = new EventEmitter<void>();

  pageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pageForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  createPage(): void {
    if (this.pageForm.valid) {
      const newPage: PageModel = {
        id: this.pageForm.value.id,
        title: this.pageForm.value.title,
        layout: 'grid',
        widgets: [],
      };
      this.pageCreated.emit(newPage);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
