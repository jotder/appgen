import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AppPage } from './pages/app-page/app-page';
import { SettingsPage } from './settings/settings-page/settings-page';
import { PageEditor } from './core/generator/page-editor/page-editor';
import {WidgetManager} from "./control-panel/templates/widgets/widget-manager";
import { LoginComponent } from './core/auth/login.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'pages/main', pathMatch: 'full' },
      { path: 'pages/:id', component: AppPage, data: { prerender: false } },
      { path: 'settings', component: SettingsPage },
      { path: 'admin/pages', component: PageEditor },
      { path: 'admin/widgets', component: WidgetManager },
    ]
  },
  // The wildcard route will be protected by the auth guard on the '' path
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
