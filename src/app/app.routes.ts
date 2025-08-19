import {Routes} from '@angular/router';

/** Defines the main application routes. */
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pages/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'pages/:id',
        loadComponent: () =>
            import('./pages/dynamic-page/dynamic-page').then(
                (m) => m.DynamicPage
            ),
    },
    {
        path: '**',
        redirectTo: 'pages/dashboard', // Fallback route
    },
];