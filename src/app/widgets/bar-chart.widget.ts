import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {WIDGET_CONFIG} from '../core/tokens';
import {IWidgetComponent} from '../core/services/widget-registry';
import {WidgetModel} from '../core/models/widget.model';

// Data shape for a single bar
interface BarChartRecord {
    label: string;
    value: number;
}

// Widget-specific config properties
interface BarChartConfig {
    maxValue: number;
    valuePrefix?: string;
}

@Component({
    selector: 'app-bar-chart-widget',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <div class="bar-chart-container">
            @for (item of config.data; track item.label) {
                <div class="bar-item">
                    <div class="label">{{ item.label }}</div>
                    <div class="bar-wrapper">
                        <div class="bar" [style.width.%]="(item.value / config.config.maxValue) * 100">
                            {{ config.config.valuePrefix }}{{ item.value }}
                        </div>
                    </div>
                </div>
            }
        </div>
    `,
    styles: [`
      .bar-chart-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .bar-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .label {
        flex: 0 0 100px;
        text-align: right;
        font-size: 0.9em;
        color: #666;
      }

      .bar-wrapper {
        flex-grow: 1;
        background-color: #f0f0f0;
        border-radius: 4px;
      }

      .bar {
        background-color: #3f51b5;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        font-size: 0.9em;
        text-align: left;
        height: 24px;
        line-height: 16px;
      }
    `]
})
export class BarChartWidget implements IWidgetComponent<BarChartConfig, BarChartRecord[]> {
    config = inject<WidgetModel<BarChartConfig, BarChartRecord[]>>(WIDGET_CONFIG);
}