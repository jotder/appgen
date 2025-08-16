import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu } from '../../core/services/menu';
import { MenuItem } from '../../core/models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {
  menuItems$!: Observable<MenuItem[]>;

  constructor(private menuService: Menu) { }

  ngOnInit(): void {
    this.menuItems$ = this.menuService.getMenuConfig().pipe(map(config => config.items));
  }
}
