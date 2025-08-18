import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../core/services/config.service';
import { PageHostComponent } from '../../components/page-host/page-host.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, PageHostComponent],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly configService = inject(ConfigService);

  pageConfig = signal<any>(null);
  pageName = signal<string | null>(null);

  ngOnInit(): void {
    // This is one of the few places where using an observable is necessary
    // because Angular's router is built with RxJS.
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        this.pageName.set(id);
        const config = await this.configService.getPageConfig(id);
        this.pageConfig.set(config);
      }
    });
  }
}
