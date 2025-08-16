import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig } from '../../../../../core/models/models';
import { WidgetConfigService } from '../../../../../core/services/widget-config.service';
import { WidgetTypesRegistry } from '../../../../../core/generator/widget-types-registry';
import { JsonSchemaForm } from '../../../../../shared/components/json-schema-form/json-schema-form';

@Component({
  selector: 'app-widget-config-manager',
  standalone: true,
  imports: [CommonModule, JsonSchemaForm],
  templateUrl: './widget-config-manager.html',
  styleUrls: ['./widget-config-manager.scss']
})
export class WidgetConfigManager implements OnInit {
  configs = signal<WidgetConfig[]>([]);
  loading = signal(true);
  selected = signal<WidgetConfig | null>(null);
  formParams = signal<Record<string, any>>({});
  creating = signal<boolean>(false);

  constructor(
    private api: WidgetConfigService,
    public types: WidgetTypesRegistry
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.loading.set(true);
    this.api.list().subscribe(data => {
      this.configs.set(data);
      this.loading.set(false);
    });
  }

  select(c: WidgetConfig) {
    this.creating.set(false);
    this.selected.set(c);
    this.formParams.set({ ...c.params });
  }

  newConfig() {
    this.creating.set(true);
    this.selected.set({
      id: '',
      name: 'New Config',
      widgetType: this.types.list()[0].id,
      params: {}
    });
    this.formParams.set({});
  }

  save() {
    const current = this.selected();
    if (!current) return;
    const payload = {
      ...current,
      params: this.formParams()
    };
    if (!current.id) {
      this.api.create(payload).subscribe(res => {
        this.selected.set(res);
        this.reload();
      });
    } else {
      this.api.update(current.id, payload).subscribe(res => {
        this.selected.set(res);
        this.reload();
      });
    }
  }

  remove(c: WidgetConfig) {
    if (!c.id) return;
    if (!confirm('Delete this widget config? Pages using it will be affected.')) return;
    this.api.delete(c.id).subscribe(() => {
      this.selected.set(null);
      this.reload();
    });
  }

  usage(c: WidgetConfig) {
    if (!c.id) return;
    this.api.usage(c.id).subscribe(res => {
      alert(`Used in dashboards: ${res.dashboards.map(d => d.name).join(', ') || '(none)'}`);
    });
  }

  schemaOfSelected() {
    const c = this.selected();
    if (!c) return null;
    return this.types.get(c.widgetType)?.schema ?? null;
  }
}
