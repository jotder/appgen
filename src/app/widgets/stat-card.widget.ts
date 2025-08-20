import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {WIDGET_CONFIG} from '../core/tokens';
import {IWidgetComponent} from '../core/services/widget-registry';
import {WidgetModel} from "../core/models";

// Widget-specific config properties
interface StatCardConfig {
    // e.g., 'vs. last month'
    changeDescription?: string;
}

// Data shape for the stat card
interface StatCardData {
    value: string;
    // e.g., '+5.2%'
    change?: string;
    // 'up', 'down', or 'neutral'
    changeDirection?: 'up' | 'down' | 'neutral';
}

@Component({
    selector: 'app-stat-card-widget',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <div class="stat-card-container">
            <div class="stat-value">{{ config.data?.value }}</div>
            @if (config.data?.change) {
                <div class="stat-change" [ngClass]="'change-' + (config.data?.changeDirection ?? 'neutral')">
                    {{ config.data?.change }}
                </div>
            }
            @if (config.config.changeDescription) {
                <div class="stat-description">{{ config.config.changeDescription }}</div>
            }
        </div>
    `,
    styles: [`
      .stat-card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
      }

      .stat-value {
        font-size: 3em;
        font-weight: 500;
        line-height: 1.1;
      }

      .stat-change {
        font-size: 1.2em;
        font-weight: 500;
      }

      .stat-description {
        color: #666;
        font-size: 0.9em;
      }

      .change-up {
        color: #4caf50;
      }

      /* Green */
      .change-down {
        color: #f44336;
      }

      /* Red */
      .change-neutral {
        color: #666;
      }
    `]
})
export class StatCardWidget implements IWidgetComponent<StatCardConfig, StatCardData> {
    config = inject<WidgetModel<StatCardConfig, StatCardData>>(WIDGET_CONFIG);
}