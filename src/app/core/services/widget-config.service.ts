import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WidgetConfig } from '../models/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WidgetConfigService {
  private configs: WidgetConfig[] = [];
  private configsLoaded = false;

  constructor(private http: HttpClient) {}

  list(): Observable<WidgetConfig[]> {
    if (this.configsLoaded) {
      return of(this.configs);
    }
    return this.http.get<WidgetConfig[]>('/assets/data/widget-configs.json').pipe(
      tap(configs => {
        this.configs = configs;
        this.configsLoaded = true;
      })
    );
  }

  create(config: Partial<WidgetConfig>): Observable<WidgetConfig> {
    const newConfig = { ...config, id: this.uuid() } as WidgetConfig;
    this.configs.push(newConfig);
    return of(newConfig);
  }

  update(id: string, config: WidgetConfig): Observable<WidgetConfig> {
    const index = this.configs.findIndex(c => c.id === id);
    if (index > -1) {
      this.configs[index] = config;
    }
    return of(config);
  }

  delete(id: string): Observable<void> {
    this.configs = this.configs.filter(c => c.id !== id);
    return of(undefined);
  }

  usage(id: string): Observable<{ dashboards: {id: string, name: string}[] }> {
    return of({ dashboards: [{id: 'main', name: 'Main Page'}] });
  }

  private uuid(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
