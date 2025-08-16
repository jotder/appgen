import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AppPage } from './pages/app-page/app-page';
import { SettingsPage } from './settings/settings-page/settings-page';
import { PageEditor } from './core/generator/page-editor/page-editor';
import { WidgetConfigManager } from './control-panel/templates/pages/dashboards/widget-config-manager/widget-config-manager';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'pages/main', pathMatch: 'full' },
      { path: 'pages/:id', component: AppPage, data: { prerender: false } },
      { path: 'settings', component: SettingsPage },
      { path: 'admin/pages', component: PageEditor },
      { path: 'admin/widgets', component: WidgetConfigManager },
    ]
  },
  { path: '**', redirectTo: '' }
];
