import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Page } from '../models/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageComposer {
  private pages: Page[] = [];
  private pagesLoaded = false;

  constructor(private http: HttpClient) {}

  list(): Observable<Page[]> {
    if (this.pagesLoaded) {
      return of(this.pages);
    }
    return this.http.get<Page[]>('/assets/data/pages.json').pipe(
      tap(pages => {
        this.pages = pages;
        this.pagesLoaded = true;
      })
    );
  }

  create(page: Partial<Page>): Observable<Page> {
    const newPage = { ...page, id: this.uuid() } as Page;
    this.pages.push(newPage);
    return of(newPage);
  }

  update(id: string, page: Page): Observable<Page> {
    const index = this.pages.findIndex(p => p.id === id);
    if (index > -1) {
      this.pages[index] = page;
    }
    return of(page);
  }

  private uuid(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
