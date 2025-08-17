import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-widget-manager',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Page Content</mat-card-title>
        <mat-card-subtitle>Dynamic Page Area</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>This is where the page content, generated from a configuration, would be displayed.</p>
        <p>For now, this is a placeholder to demonstrate the layout.</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class WidgetManager {}