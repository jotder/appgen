import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="login-container">
            <h2>Login</h2>
            <p>This is a simulated login. No credentials needed.</p>
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="any username"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="any password"/>
            </div>
            <button (click)="login()">Log In</button>
        </div>
    `,
    styles: [`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #fdfdfd;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }

      button {
        align-self: center;
      }
    `]
})
export class LoginComponent {
    private readonly authService = inject(AuthService);

    login(): void {
        this.authService.login();
    }
}