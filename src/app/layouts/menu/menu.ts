import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {Menu} from '../../core/services/menu';
import {MenuItem} from '../../core/models/models';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [RouterModule, MatListModule],
    templateUrl: './menu.html',
    styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(private menuService: Menu) {
    }

    ngOnInit(): void {
        this.menuItems = this.menuService.getMenuConfig().items;
    }
}
