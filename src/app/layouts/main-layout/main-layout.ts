import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, MenuComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout {

}
