import {Injectable} from '@angular/core';
import {WidgetConfig} from '../models/models';
import * as widgetConfigs from '../../../assets/data/widget-configs.json';

@Injectable({providedIn: 'root'})
export class WidgetConfigService {
    private configs: WidgetConfig[] = [];

    constructor() {
        this.configs = (widgetConfigs as any).default;
    }

    list(): WidgetConfig[] {
        return this.configs;
    }

    create(config: Partial<WidgetConfig>): WidgetConfig {
        const newConfig = {...config, id: this.uuid()} as WidgetConfig;
        this.configs.push(newConfig);
        return newConfig;
    }

    update(id: string, config: WidgetConfig): WidgetConfig {
        const index = this.configs.findIndex(c => c.id === id);
        if (index > -1) {
            this.configs[index] = config;
        }
        return config;
    }

    delete(id: string): void {
        this.configs = this.configs.filter(c => c.id !== id);
    }

    usage(id: string): { dashboards: { id: string, name: string }[] } {
        return {dashboards: [{id: 'main', name: 'Main Page'}]};
    }

    private uuid(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}
