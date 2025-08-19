import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../core/services/config.service';
import { PageHostComponent } from '../../components/page-host/page-host.component';
import { PageConfig } from '../../core/models';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, PageHostComponent],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly configService = inject(ConfigService);

  private params = toSignal(this.route.paramMap);

  pageName = computed(() => this.params()?.get('id') ?? null);

  pageConfig = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (!id) {
          return Promise.resolve(null);
        }
        return this.configService.getPageConfig(id);
      })
    )
  );
}
