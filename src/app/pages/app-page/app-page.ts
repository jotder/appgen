import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageConfig } from '../../core/models/models';
import { PageGenerator } from '../../core/generator/page-generator/page-generator';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [CommonModule, PageGenerator],
  template: `
    <ng-container *ngIf="pageConfig$ | async as pageConfig">
      <app-page-generator [pageConfig]="pageConfig"></app-page-generator>
    </ng-container>
  `
})
export class AppPage implements OnInit {
  pageConfig$!: Observable<PageConfig | undefined | null>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.pageConfig$ = this.route.params.pipe(
      switchMap(params => this.getPageConfig(params['id']))
    );
  }

  private getPageConfig(id: string): Observable<PageConfig | undefined> {
    return this.http.get<{dashboards: PageConfig[]}>(`/assets/data/dashboard.config.json`).pipe(
      map(data => data.dashboards.find(d => d.id === id))
    );
  }
}
