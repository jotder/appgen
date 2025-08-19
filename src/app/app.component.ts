import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Config} from './core/services/config';

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

    /** Signal for the main navigation menu items. */
    readonly menuItems = this.config.menuItems;
}
