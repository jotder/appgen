import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Manages user authentication state and navigation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  /** Signal indicating if the user is currently authenticated. */
  readonly isAuthenticated = signal<boolean>(false);

  constructor() {
    // In a real app, this would involve checking for a token in session/local storage.
    // This is a simplified mock for demonstration.
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAuthenticated.set(loggedIn);
  }

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.isAuthenticated.set(true);
    this.router.navigate(['/']); // Redirect to the main page after login.
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']); // Redirect to login after logout.
  }
}