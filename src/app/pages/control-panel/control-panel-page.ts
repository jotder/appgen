import { Component, inject, signal } from '@angular/core';
import { Config } from '../../core/services/config';
import { PageModel } from '../../core/models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageWizardComponent } from '../../components/page-wizard/page-wizard.component';

@Component({
  selector: 'app-control-panel-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageWizardComponent],
  templateUrl: './control-panel-page.html',
  styleUrls: ['./control-panel-page.scss'],
})
export class ControlPanelPage {
  private readonly config = inject(Config);
  private readonly fb = inject(FormBuilder);

  showWizard = signal(false);
  pages = signal<PageModel[]>(this.config.getAllPages());
  configForm: FormGroup;

  constructor() {
    const formControls: { [key: string]: any } = {
      appConfig: [JSON.stringify(this.config.appConfig(), null, 2)],
    };
    this.pages().forEach(page => {
      formControls[page.id] = [JSON.stringify(page, null, 2)];
    });
    this.configForm = this.fb.group(formControls);
  }

  saveChanges(): void {
    // In a real application, this would send the updated JSON to a backend service.
    // For this demo, we can just log the changes to the console.
    console.log('Saving app config:', this.configForm.get('appConfig')?.value);
    this.pages().forEach(page => {
      console.log(
        `Saving page config for ${page.id}:`,
        this.configForm.get(page.id)?.value
      );
    });
  }

  toggleWizard(): void {
    this.showWizard.set(!this.showWizard());
  }

  handlePageCreated(newPage: PageModel): void {
    // For now, we'll just log the new page to the console.
    // In a real app, this would involve creating a new file.
    console.log('New page created:', newPage);
    this.toggleWizard();
  }
}
