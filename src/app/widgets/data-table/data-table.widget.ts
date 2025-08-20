import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WIDGET_CONFIG} from '../../core/tokens';
import {IWidgetComponent} from '../../core/services/widget-registry';
import {WidgetModel} from '../../core/models';

// Data shape for a row (generic object)
type DataRecord = Record<string, any>;

// Column definition shape
interface ColumnConfig {
  key: string;
  header: string;
  sortable?: boolean;
}

// Widget-specific config properties
interface DataTableConfig {
  title?: string;
  columns: ColumnConfig[];
  showSearch?: boolean;
  showPaginator?: boolean;
  pageSize?: number;
}

@Component({
  selector: 'app-data-table-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './data-table.widget.html',
  styleUrls: ['./data-table.widget.scss'],
})
export class DataTableWidget implements IWidgetComponent<DataTableConfig, DataRecord[]>, OnInit, AfterViewInit {
  config = inject<WidgetModel<DataTableConfig, DataRecord[]>>(WIDGET_CONFIG);

  dataSource = new MatTableDataSource<DataRecord>();
  displayedColumns: string[] = [];

  /** Determines if search/pagination controls should be visible. */
  showControls = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.displayedColumns = this.config.config.columns.map(c => c.key);
    this.dataSource.data = this.config.data || [];

    // Conditionally show controls if data exceeds page size
    const pageSize = this.config.config.pageSize || 5; // Default to 10
    this.showControls = (this.config.data?.length || 0) > pageSize;

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
