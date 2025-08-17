import {Component, computed, inject, Signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {PageConfig} from '../../core/models/models';
import {CommonModule} from '@angular/common';
import {PageConfigService} from '../../core/services/page-config.service';
import {AuthService} from '../../core/services/auth.service';
import {PageGenerator} from "../../core/generator/page-generator";

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [CommonModule, PageGenerator],
    template: `
        @if (pageConfig(); as config) {
            <div class="page-container">
                <header class="page-header">
                    <h1>{{ config.title }}</h1>
                    <button (click)="logout()">Logout</button>
                </header>
                <app-page-generator [pageConfig]="config"></app-page-generator>
            </div>
        } @else {
            <p>Loading page or configuration not found...</p>
        }
    `,
    styles: [`
      .page-container {
        padding: 1rem;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ccc;
      }
    `]
})
export class AppPage {
    private readonly route = inject(ActivatedRoute);
    private readonly pageConfigService = inject(PageConfigService);
    private readonly authService = inject(AuthService);

    private readonly pageId: Signal<string | null> = toSignal(
        this.route.paramMap.pipe(map(params => params.get('id'))),
        {initialValue: null}
    );

    readonly pageConfig: Signal<PageConfig | undefined> = computed(() => {
        const id = this.pageId();
        return id ? this.pageConfigService.getPageConfig(id) : undefined;
    });

    logout(): void {
        this.authService.logout();
    }
}
