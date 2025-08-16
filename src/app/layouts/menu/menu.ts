import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu } from '../../core/services/menu';
import { MenuItem } from '../../core/models/models';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private menuService: Menu) { }

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuConfig().items;
  }
}
