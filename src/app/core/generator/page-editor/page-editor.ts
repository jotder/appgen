import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page, PageWidget, WidgetConfig } from '../../models/models';
import { PageComposer } from '../../services/page-composer';
import { WidgetConfigService } from '../../services/widget-config.service';

@Component({
  selector: 'app-page-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-editor.html',
  styleUrls: ['./page-editor.scss']
})
export class PageEditor implements OnInit {
  pages = signal<Page[]>([]);
  selected = signal<Page | null>(null);
  widgetConfigs = signal<WidgetConfig[]>([]);

  constructor(
    private api: PageComposer,
    private cfgApi: WidgetConfigService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.api.list().subscribe(pages => this.pages.set(pages));
    this.cfgApi.list().subscribe(cfgs => this.widgetConfigs.set(cfgs));
  }

  selectPage(d: Page) { this.selected.set(d); }

  newPage() {
    const d: Partial<Page> = { name: 'New Page', layout: { columns: 3 }, widgets: [] as any };
    this.api.create(d).subscribe(res => {
      this.reload();
      this.selected.set(res);
    });
  }

  savePage() {
    const d = this.selected();
    if (!d) return;
    this.api.update(d.id, d).subscribe(res => this.selected.set(res));
  }

  addWidget(config: WidgetConfig) {
    const d = this.selected();
    if (!d) return;
    const w: PageWidget = {
      id: this.uuid(),
      widgetConfigId: config.id,
      position: { colStart: 1, colSpan: 1 }
    };
    d.widgets.push(w);
    this.savePage();
  }

  removeWidget(widgetId: string) {
    const d = this.selected();
    if (!d) return;
    d.widgets = d.widgets.filter(w => w.id !== widgetId);
    this.savePage();
  }

  moveLeft(w: PageWidget) {
    w.position.colStart = Math.max(1, w.position.colStart - 1);
    this.savePage();
  }

  moveRight(w: PageWidget, columns: number) {
    w.position.colStart = Math.min(columns, w.position.colStart + 1);
    this.savePage();
  }

  widen(w: PageWidget, columns: number) {
    w.position.colSpan = Math.min(columns - w.position.colStart + 1, w.position.colSpan + 1);
    this.savePage();
  }

  narrow(w: PageWidget) {
    w.position.colSpan = Math.max(1, w.position.colSpan - 1);
    this.savePage();
  }

  private uuid(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  getWidgetName(widgetConfigId: string): string {
    const config = this.widgetConfigs().find(c => c.id === widgetConfigId);
    return config ? config.name : 'Unknown Widget';
  }
}
