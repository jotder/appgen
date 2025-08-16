import { Injectable } from '@angular/core';
import { MenuConfig } from '../models/models';
import * as menuConfig from '../../assets/data/menu.json';

@Injectable({
  providedIn: 'root'
})
export class Menu {
  constructor() { }

  getMenuConfig(): MenuConfig {
    return menuConfig;
  }
}
