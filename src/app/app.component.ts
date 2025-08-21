import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Config} from './core/services/config';
import {AuthService} from './core/services/auth.service';
import {MenuItem} from './core/models';

/** The root component of the application. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly config = inject(Config);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * A computed signal for the main navigation menu items.
   * It derives the correct menu from the application configuration
   * based on the current user's role from the AuthService.
   */
  readonly menuItems = computed<MenuItem[]>(() => {
    const role = this.authService.userRole();
    return role ? this.config.getMenuForRole(role) : [];
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
