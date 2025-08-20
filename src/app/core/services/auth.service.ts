import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _userRole = signal<'user' | 'admin' | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      const storedRole = sessionStorage.getItem('userRole');
      if (storedRole === 'user' || storedRole === 'admin') {
        this._userRole.set(storedRole);
      }
    }
  }

  readonly userRole = this._userRole.asReadonly();
  readonly isAuthenticated = computed(() => this._userRole() !== null);

  login(role: 'user' | 'admin'): void {
    this._userRole.set(role);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userRole', role);
    }
  }

  logout(): void {
    this._userRole.set(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('userRole');
    }
  }
}