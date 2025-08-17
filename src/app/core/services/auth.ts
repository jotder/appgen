import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly router = inject(Router);
    readonly isAuthenticated = signal(false);

    login(): void {
        // In a real app, you'd have authentication logic here.
        // For this fake login, we'll just set the signal.
        this.isAuthenticated.set(true);
        this.router.navigate(['/pages/main']); // Navigate to a default page after login
    }

    logout(): void {
        this.isAuthenticated.set(false);
        this.router.navigate(['/login']);
    }
}
