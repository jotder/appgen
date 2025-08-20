import { Injectable, signal } from '@angular/core';

/**
 * A placeholder service for managing user authentication state.
 * In a real application, this would interact with a backend to log in/out
 * and retrieve user information.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * A signal representing the current user's role. Defaults to 'user'.
   * In a real app, this would be set after a successful login.
   */
  readonly userRole = signal<'user' | 'admin'>('user');
}