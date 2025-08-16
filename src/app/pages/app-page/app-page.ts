import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageConfig } from '../../core/models/models';
import { CommonModule } from '@angular/common';
import { PageConfigService } from '../../core/services/page-config.service';
import {PageGenerator} from "../../core/generator/page-generator/page-generator";

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [CommonModule, PageGenerator],
  template: `
    @if (pageConfig(); as config) {
      <app-page-generator [pageConfig]="config"></app-page-generator>
    } @else {
      <p>Page configuration not found for this route.</p>
    }
  `
})
export class AppPage implements OnInit {
  pageConfig: WritableSignal<PageConfig | undefined> = signal(undefined);

  constructor(
    private route: ActivatedRoute,
    private pageConfigService: PageConfigService
  ) {}

  ngOnInit(): void {
    const pageId = this.route.snapshot.paramMap.get('id');
    if (pageId) {
      this.pageConfig.set(this.pageConfigService.getPageConfig(pageId));
    }
  }
}
