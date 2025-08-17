import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetConfigService} from "../../../core/services/widget-config.service";
import {WidgetTypesRegistry} from "../../../core/generator/widget-types-registry";
import {JsonSchemaForm} from "../../../shared/components/json-schema-form/json-schema-form";
import {WidgetConfig} from "../../../core/models/models";

/**
 * Manages the lifecycle of widget configurations.
 * Allows users to create, view, update, and delete widget configurations,
 * which define the behavior and appearance of individual widgets on dashboards.
 */
@Component({
  selector: 'app-widget-config-manager',
  standalone: true,
  imports: [CommonModule, JsonSchemaForm],
  templateUrl: './widget-manager.html',
  styleUrls: ['./widget-manager.scss']
})
export class WidgetManager implements OnInit {
  /** Signal holding the list of all available widget configurations. */
  configs = signal<WidgetConfig[]>([]);
  /** Signal to track the loading state, e.g., when fetching data. */
  loading = signal(true);
  /** Signal for the currently selected widget configuration for editing. */
  selected = signal<WidgetConfig | null>(null);
  /** Signal to hold the parameters for the JSON schema form, decoupled from the main `selected` signal. */
  formParams = signal<Record<string, any>>({});
  /** Signal to track if the component is in 'create new' mode. */
  creating = signal<boolean>(false);

  /**
   * A computed signal that derives the JSON schema for the currently selected widget's type.
   * This is efficient as it only recalculates when the `selected` signal changes.
   * Returns null if no widget is selected or if the type has no schema.
   */
  schemaOfSelected = computed(() => {
    const config = this.selected();
    if (!config) return null;
    return this.types.get(config.widgetType)?.schema ?? null;
  });

  /**
   * @param api Service for widget configuration CRUD operations.
   * @param types Registry of all available widget types.
   */
  constructor(
    private api: WidgetConfigService,
    public types: WidgetTypesRegistry
  ) {}

  /**
   * Angular lifecycle hook that runs on component initialization.
   */
  ngOnInit() {
    this.reload();
  }

  /**
   * Fetches the list of widget configurations from the service and updates the component's state.
   */
  reload() {
    this.loading.set(true);
    // Assuming api.list() is synchronous. The loading flag is more
    // useful if this becomes an async operation in the future.
    const data = this.api.list();
    this.configs.set(data);
    this.loading.set(false);
  }

  /**
   * Sets the provided widget configuration as the currently selected one for viewing/editing.
   * @param config The widget configuration to select.
   */
  select(config: WidgetConfig) {
    this.creating.set(false);
    // Create a copy to avoid direct mutation of the object in the configs list
    this.selected.set({ ...config });
    this.formParams.set({ ...config.params });
  }

  /**
   * Initializes a new, empty widget configuration to be created.
   */
  newConfig() {
    this.creating.set(true);
    const newWidgetConfig: WidgetConfig = {
      id: '', // Empty ID signifies a new entity
      name: 'New Config',
      widgetType: this.types.list()[0].id,
      params: {}
    };
    this.selected.set(newWidgetConfig);
    this.formParams.set({});
  }

  /**
   * Saves the currently selected widget configuration.
   * It either creates a new one if it doesn't have an ID, or updates an existing one.
   */
  save() {
    const current = this.selected();
    if (!current) return;

    const payload: WidgetConfig = {
      ...current,
      params: this.formParams()
    };

    const isNew = !current.id;

    const savedConfig = isNew
      ? this.api.create(payload)
      : this.api.update(current.id, payload);

    this.creating.set(false);
    this.selected.set(savedConfig);
    this.reload(); // Refresh the list to show changes
  }

  /**
   * Deletes the specified widget configuration after user confirmation.
   * @param config The widget configuration to remove.
   */
  remove(config: WidgetConfig) {
    if (!config.id) return;
    // A custom dialog service would be a good improvement over window.confirm
    if (confirm('Delete this widget config? Pages using it will be affected.')) {
      this.api.delete(config.id);
      this.selected.set(null);
      this.reload();
    }
  }

  /**
   * Checks and displays where a specific widget configuration is being used.
   * @param config The widget configuration to check usage for.
   */
  usage(config: WidgetConfig) {
    if (!config.id) return;
    const usageInfo = this.api.usage(config.id);
    const dashboardNames = usageInfo.dashboards.map(d => d.name).join(', ') || '(none)';
    // A custom notification/dialog service would be better than window.alert
    alert(`Used in dashboards: ${dashboardNames}`);
  }

  /**
   * Handles name input changes by updating the `selected` signal immutably.
   * @param event The input event from the name field.
   */
  onNameChange(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.selected.update(config => config ? { ...config, name } : null);
  }

  /**
   * Handles type select changes by updating the `selected` signal immutably.
   * @param event The change event from the type dropdown.
   */
  onTypeChange(event: Event): void {
    const widgetType = (event.target as HTMLSelectElement).value as WidgetConfig['widgetType'];
    this.selected.update(config => config ? { ...config, widgetType } : null);
  }
}
