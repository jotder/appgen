import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { ControlPanelPage } from './pages/control-panel/control-panel-page';

/** Defines the main application routes. */
export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'pages/control-panel',
    canActivate: [authGuard, adminGuard],
    component: ControlPanelPage,
  },
  {
    path: 'pages/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dynamic-page/dynamic-page').then(
        (m) => m.DynamicPage
      ),
  },
  {
    path: '**',
    redirectTo: 'login', // Fallback route
  },
];