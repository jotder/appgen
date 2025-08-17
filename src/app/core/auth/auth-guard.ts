import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import {AuthService} from "../services/auth";


export const authGuard: CanActivateFn = (): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    // Redirect to the login page if not authenticated
    return router.createUrlTree(['/login']);
};
