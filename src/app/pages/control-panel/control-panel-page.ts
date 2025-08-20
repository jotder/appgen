import { Component, inject, signal } from '@angular/core';
import { Config } from '../../core/services/config';
import { PageModel, MenuItem } from '../../core/models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageWizardComponent } from '../../components/page-wizard/page-wizard.component';
import { PageEditorComponent } from '../../components/page-editor/page-editor.component';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfigStore } from '../../core/services/config.store';

@Component({
  selector: 'app-control-panel-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageWizardComponent, PageEditorComponent, DragDropModule],
  templateUrl: './control-panel-page.html',
  styleUrls: ['./control-panel-page.scss'],
})
export class ControlPanelPage {
  private readonly configService = inject(Config);
  private readonly configStore = inject(ConfigStore);
  private readonly fb = inject(FormBuilder);

  showWizard = signal(false);
  pages = signal<PageModel[]>(this.configService.getAllPages());
  appConfigForm: FormGroup;
  adminMenu = signal<MenuItem[]>([]);
  userMenu = signal<MenuItem[]>([]);

  constructor() {
    const appConfig = this.configService.appConfig();
    this.appConfigForm = this.fb.group({
      landingPage: [appConfig.landingPage],
      layout: this.fb.group({
        menu: [appConfig.layout.menu],
        header: [appConfig.layout.header],
        footer: [appConfig.layout.footer],
      }),
    });

    this.adminMenu.set(this.configService.getMenuForRole('admin'));
    this.userMenu.set(this.configService.getMenuForRole('user'));
  }

  saveChanges(): void {
    const appConfig = this.configService.appConfig();
    appConfig.landingPage = this.appConfigForm.value.landingPage;
    appConfig.layout = this.appConfigForm.value.layout;
    appConfig.auth['admin'].menu = this.adminMenu();
    appConfig.auth['user'].menu = this.userMenu();

    this.configStore.updateAppConfig(appConfig);

    this.pages().forEach(page => {
      this.configStore.updatePage(page);
    });

    this.configService.loadData();
    alert('Changes saved and application state updated!');
  }

  toggleWizard(): void {
    this.showWizard.set(!this.showWizard());
  }

  handlePageCreated(newPage: PageModel): void {
    this.configStore.addPage(newPage);
    const newMenuItem = { id: newPage.id, title: newPage.title, page: newPage.id };
    const appConfig = this.configService.appConfig();
    appConfig.auth['admin'].menu.push(newMenuItem);
    this.configStore.updateAppConfig(appConfig);

    this.configService.loadData();
    this.pages.set(this.configService.getAllPages());
    this.adminMenu.set(this.configService.getMenuForRole('admin'));
    this.toggleWizard();
  }

  handlePageUpdated(updatedPage: PageModel): void {
    this.pages.update(pages =>
      pages.map(page => (page.id === updatedPage.id ? updatedPage : page))
    );
  }

  drop(event: CdkDragDrop<MenuItem[]>, role: 'admin' | 'user'): void {
    const menu = role === 'admin' ? this.adminMenu : this.userMenu;
    menu.update(menuItems => {
      moveItemInArray(menuItems, event.previousIndex, event.currentIndex);
      return [...menuItems];
    });
  }
}
