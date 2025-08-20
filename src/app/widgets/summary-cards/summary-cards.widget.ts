import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {WIDGET_CONFIG} from '../../core/tokens';
import {IWidgetComponent} from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models';

export interface SummaryCardData {
    label: string;
    value: string;
    icon?: string;
}

/**
 * Defines the specific `config` object structure for the SummaryCardsWidget.
 */
interface SummaryCardsConfig {}

@Component({
    selector: 'app-summary-cards-widget',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <div class="summary-cards-container">
            @for (card of config.data; track card.label) {
                <mat-card class="summary-card">
                    <mat-card-header>
                        <mat-card-title>{{ card.label }}</mat-card-title>
                    </mat-card-header>
                    <mat-card-content>
                        <div class="value">{{ card.value }}</div>
                        <div class="icon-placeholder">{{ card.icon }}</div>
                    </mat-card-content>
                </mat-card>
            }
        </div>
    `,
    styles: [`
      .summary-cards-container {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        height: 100%;
        align-content: flex-start;
      }

      .summary-card {
        flex: 1 1 200px;
      }

      .value {
        font-size: 2.5em;
        font-weight: 500;
        line-height: 1.2;
      }
    `]
})
export class SummaryCardsWidget implements IWidgetComponent<SummaryCardsConfig, SummaryCardData[]> {
    config = inject<WidgetModel<SummaryCardsConfig, SummaryCardData[]>>(WIDGET_CONFIG);
}
