import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuConfig } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class Menu {
  constructor(private http: HttpClient) { }

  getMenuConfig(): Observable<MenuConfig> {
    return this.http.get<MenuConfig>('/assets/data/menu.json');
  }
}
