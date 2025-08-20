import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {WIDGET_CONFIG} from '../core/tokens';
import {IWidgetComponent} from '../core/services/widget-registry';
import {WidgetModel} from '../core/models/widget.model';

// Data shape for a single pie slice
interface PieChartRecord {
    name: string;
    value: number;
}

// Widget-specific config properties (none needed for this simple version)
interface PieChartConfig {
}

@Component({
    selector: 'app-pie-chart-widget',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <div class="pie-chart-widget-container">
            <div class="pie-visual" [style.background]="pieGradient()"></div>
            <ul class="legend">
                @for (item of config.data; track item.name; let i = $index) {
                    <li>
                        <span class="legend-color" [style.background-color]="colors[i % colors.length]"></span>
                        <span class="legend-label">{{ item.name }}</span>
                        <span class="legend-value">
              @if (total() > 0) {
                  ({{ (item.value / total() * 100).toFixed(1) }}%)
              }
            </span>
                    </li>
                }
            </ul>
        </div>
    `,
    styles: [`
      .pie-chart-widget-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
      }

      .pie-visual {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .legend {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 0.9em;
      }

      .legend li {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }

      .legend-color {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 8px;
      }

      .legend-label {
        font-weight: 500;
      }

      .legend-value {
        margin-left: auto;
        padding-left: 16px;
        color: #666;
      }
    `]
})
export class PieChartWidget implements IWidgetComponent<PieChartConfig, PieChartRecord[]> {
    config = inject<WidgetModel<PieChartConfig, PieChartRecord[]>>(WIDGET_CONFIG);

    readonly colors = ['#3f51b5', '#ff4081', '#4caf50', '#ffc107', '#9c27b0', '#00bcd4'];

    total = computed(() => {
        const data = this.config.data ?? [];
        if (!data.length) return 0;
        return data.reduce((sum, item) => sum + item.value, 0);
    });

    pieGradient = computed(() => {
        const data = this.config.data ?? [];
        const totalValue = this.total();
        if (totalValue === 0) {
            return 'conic-gradient(lightgray 0% 100%)';
        }

        let currentPercentage = 0;
        const gradientParts = data.map((item, index) => {
            const percentage = (item.value / totalValue) * 100;
            const start = currentPercentage;
            const end = currentPercentage + percentage;
            currentPercentage = end;
            return `${this.colors[index % this.colors.length]} ${start}% ${end}%`;
        });

        return `conic-gradient(${gradientParts.join(', ')})`;
    });
}