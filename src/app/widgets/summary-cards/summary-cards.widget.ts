import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WIDGET_CONFIG } from '../../core/tokens';
import { IWidgetComponent } from '../../core/services/widget-registry';
import { WidgetModel } from '../../core/models/widget.model';

export interface SummaryCard {
  title: string;
  value: string;
  icon: string;
}

/**
 * Defines the specific configuration structure for the SummaryCardsWidget.
 * It extends the base WidgetConfig to include widget-specific properties.
 */
interface SummaryCardsWidgetConfig extends WidgetModel {
  cards: SummaryCard[];
}

@Component({
  selector: 'app-summary-cards-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="summary-cards-container">
      @for (card of config.cards; track card.title) {
        <mat-card class="summary-card">
          <mat-card-header>
            <mat-card-title>{{ card.title }}</mat-card-title>
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
export class SummaryCardsWidget implements IWidgetComponent {
  config: SummaryCardsWidgetConfig = inject(WIDGET_CONFIG);
}