import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { WidgetManager } from './control-panel/templates/widgets/widget-manager';

// In a real app, you would have a component that dynamically renders pages based on the route ID.
// For this demonstration, we'll route the menu items to the WidgetManager page to show the layout.

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'pages/main', pathMatch: 'full' },
      { path: 'pages/main', component: WidgetManager },
      { path: 'pages/simple', component: WidgetManager },
      { path: 'settings', component: WidgetManager }
    ]
  },
  { path: '**', redirectTo: '' } // Fallback route
];