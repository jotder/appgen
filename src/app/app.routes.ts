import { Routes } from '@angular/router';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';

export const routes: Routes = [
  {
    path: 'pages/:id',
    component: DynamicPageComponent,
  },
  {
    path: '',
    redirectTo: '/pages/dashboard', // Default route
    pathMatch: 'full',
  },
];
