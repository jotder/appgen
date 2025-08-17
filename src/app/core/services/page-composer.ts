import {Injectable} from '@angular/core';
import {Page} from '../models/models';
import * as pageData from '../../../assets/data/pages.json';

@Injectable({providedIn: 'root'})
export class PageComposer {
    private pages: Page[] = [];

    constructor() {
        this.pages = (pageData as any).default;
    }

    list(): Page[] {
        return this.pages;
    }

    create(page: Partial<Page>): Page {
        const newPage = {...page, id: this.uuid()} as Page;
        this.pages.push(newPage);
        return newPage;
    }

    update(id: string, page: Page): Page {
        const index = this.pages.findIndex(p => p.id === id);
        if (index > -1) {
            this.pages[index] = page;
        }
        return page;
    }

    private uuid(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}
