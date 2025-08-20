import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {WIDGET_CONFIG} from '../core/tokens';
import {IWidgetComponent} from '../core/services/widget-registry';
import {WidgetModel} from '../core/models/widget.model';

// Widget-specific config properties
interface DataTableConfig {
    // The keys of the data objects to display
    displayedColumns: string[];
    // The friendly names for the column headers
    columnHeaders: { [key: string]: string };
}

// Data shape for a row (generic object)
type DataTableRow = Record<string, any>;

@Component({
    selector: 'app-data-table-widget',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    template: `
        <div class="data-table-container">
            <table mat-table [dataSource]="config.data ?? []" class="mat-elevation-z2">

                <!-- Column Definitions -->
                @for (col of displayedColumns; track col) {
                    <ng-container [matColumnDef]="col">
                        <th mat-header-cell *matHeaderCellDef> {{ columnHeaders[col] }}</th>
                        <td mat-cell *matCellDef="let element"> {{ element[col] }}</td>
                    </ng-container>
                }

                <!-- Header and Row Declarations -->
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <!-- Row shown when there is no data. -->
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" [attr.colspan]="displayedColumns.length">
                        No data available.
                    </td>
                </tr>
            </table>
        </div>
    `,
    styles: [`
      .data-table-container {
        overflow: auto;
        height: 100%;
      }

      table {
        width: 100%;
      }
    `]
})
export class DataTableWidget implements IWidgetComponent<DataTableConfig, DataTableRow[]> {
    config = inject<WidgetModel<DataTableConfig, DataTableRow[]>>(WIDGET_CONFIG);

    get displayedColumns(): string[] {
        return this.config.config?.displayedColumns ?? [];
    }

    get columnHeaders(): { [key: string]: string } {
        return this.config.config?.columnHeaders ?? {};
    }
}