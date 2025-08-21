import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Config} from '../../core/services/config';
import {MenuItem, PageModel, WidgetModel} from '../../core/models';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PageWizardComponent} from '../../components/page-wizard/page-wizard.component';
import {PageEditorComponent} from '../../components/page-editor/page-editor.component';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {ConfigStore} from '../../core/services/config.store';

@Component({
  selector: 'app-control-panel-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageWizardComponent, PageEditorComponent, DragDropModule],
  templateUrl: './control-panel-page.html',
  styleUrls: ['./control-panel-page.scss'],
})
export class ControlPanelPage {
  // Service Injections
  private readonly configService = inject(Config);
  private readonly configStore = inject(ConfigStore);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  // --- Component State ---
  private readonly fragment = toSignal(this.route.fragment);
  selectedSection = signal<'appConfig' | 'pages' | 'menu' | 'wizard' | 'widgets' | ''>('');

  // App Config State
  appConfigForm!: FormGroup;

  // Menu Management State
  adminMenu = signal<MenuItem[]>([]);
  userMenu = signal<MenuItem[]>([]);

  // Page Management State
  pages = signal<PageModel[]>([]);
  selectedPageId = signal<string | null>(null);
  selectedPage = computed(() => this.pages().find(p => p.id === this.selectedPageId()));

  // Widget Management State
  widgetConfigForm!: FormGroup;
  allWidgets = computed(() => {
    return this.pages().flatMap(p =>
      (p.widgets || []).map(w => {
        // The canonical title is in the config object. This normalizes it for display.
        const displayTitle = w.config?.title || w.title || 'Untitled Widget';
        return {
          ...w,
          pageId: p.id,
          pageTitle: p.title,
          displayTitle: displayTitle
        };
      })
    );
  });
  selectedWidgetId = signal<string | null>(null);
  selectedWidget = computed(() => this.allWidgets().find(w => w.instanceId === this.selectedWidgetId()));

  constructor() {
    this.initializeStateAndForms();
    this.setupEffects();
  }

  // --- Initialization ---

  private initializeStateAndForms(): void {
    // Initialize local state from the configuration service
    this.pages.set(this.configService.getAllPages());
    this.adminMenu.set(this.configService.getMenuForRole('admin'));
    this.userMenu.set(this.configService.getMenuForRole('user'));

    // Initialize reactive forms with initial data
    const appConfig = this.configService.appConfig();
    this.appConfigForm = this.fb.group({
      landingPage: [appConfig.landingPage],
      layout: this.fb.group({
        menu: [appConfig.layout.menu],
        header: [appConfig.layout.header],
        footer: [appConfig.layout.footer],
      }),
    });

    this.widgetConfigForm = this.fb.group({
      id: [{value: '', disabled: true}],
      title: [''],
      type: [{value: '', disabled: true}],
      config: [''] // Will be a JSON string in a textarea
    });
  }

  private setupEffects(): void {
    // Effect to react to URL fragment changes and update the selected section.
    effect(() => {
      const frag = this.fragment();
      if (frag === 'appConfig' || frag === 'pages' || frag === 'menu' || frag === 'widgets') {
        this.selectedSection.set(frag);
      } else {
        // If fragment is null, undefined, or not a valid section, show the default welcome view.
        this.selectedSection.set('');
      }
    });

    // Effect to update the widget form when a new widget is selected.
    effect(() => {
      const widget = this.selectedWidget();
      if (widget) {
        this.widgetConfigForm.patchValue({
          id: widget.instanceId,
          title: widget.displayTitle, // Use the normalized display title
          type: widget.type,
          config: JSON.stringify(widget.config, null, 2)
        });
      } else {
        this.widgetConfigForm.reset();
      }
    });
  }

  // --- Global Save ---

  /**
   * Persists all local "draft" changes (app config, pages, menus) to the config store.
   */
  saveChanges(): void {
    // 1. Update App Config
    const originalAppConfig = this.configService.appConfig();
    const updatedAppConfig = {
      ...originalAppConfig,
      landingPage: this.appConfigForm.value.landingPage,
      layout: this.appConfigForm.value.layout,
      auth: {
        ...originalAppConfig.auth,
        admin: {...originalAppConfig.auth['admin'], menu: this.adminMenu()},
        user: {...originalAppConfig.auth['user'], menu: this.userMenu()}
      }
    };
    this.configStore.updateAppConfig(updatedAppConfig);

    // 2. Update all pages, handling both new and existing ones.
    const originalPageIds = new Set(this.configService.getAllPages().map(p => p.id));
    this.pages().forEach(page => {
      if (originalPageIds.has(page.id)) {
        this.configStore.updatePage(page);
      } else {
        this.configStore.addPage(page);
      }
    });

    // 3. Reload data in the service to propagate changes throughout the app.
    this.configService.loadData();
    alert('Changes saved and application state updated!');
  }

  // --- Event Handlers ---

  handlePageCreated(newPage: PageModel): void {
    // Add the new page and its menu item to our local "draft" state.
    this.pages.update(currentPages => [...currentPages, newPage]);
    const newMenuItem = {id: newPage.id, title: newPage.title, page: newPage.id};
    this.adminMenu.update(currentMenu => [...currentMenu, newMenuItem]);
    this.selectedSection.set('pages');
    // Select the newly created page in the dropdown
    this.selectedPageId.set(newPage.id);
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

  onPageSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedPageId.set(selectElement.value || null);
  }

  onWidgetSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedWidgetId.set(selectElement.value || null);
  }

  saveWidgetChanges(): void {
    const selected = this.selectedWidget();
    if (!selected) {
      return;
    }
    const formValue = this.widgetConfigForm.getRawValue();
    // Destructure to remove temporary UI properties and get the original widget data.
    const { pageId, pageTitle, displayTitle, ...originalWidgetData } = selected;

    try {
      // 1. Parse the config from the textarea.
      const newConfig = JSON.parse(formValue.config);
      // 2. Update the title inside the config object from the dedicated title input.
      newConfig.title = formValue.title;

      // 3. Create the final, updated widget model.
      const updatedWidgetData: WidgetModel = {
        ...(originalWidgetData as WidgetModel),
        config: newConfig,
        title: undefined // Ensure top-level title is not persisted
      };

      // 4. Update the pages signal with the modified widget.
      this.pages.update(currentPages =>
        currentPages.map(page => {
          if (page.id !== pageId) {
            return page;
          }
          const newWidgets = (page.widgets || []).map(w =>
            w.instanceId === updatedWidgetData.instanceId ? updatedWidgetData : w
          );
          return {...page, widgets: newWidgets};
        })
      );
    } catch (e) {
      alert('Invalid JSON in widget configuration.');
      console.error('Error parsing widget config JSON', e);
      return;
    }

    alert('Widget updated locally. Remember to save all application changes to persist.');
  }
}
