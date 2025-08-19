import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigService } from './core/services/config.service';
import { AppConfig, MenuItem } from './core/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly configService = inject(ConfigService);

  appConfig = signal<AppConfig | null>(null);
  menuItems = signal<MenuItem[]>([]);

  async ngOnInit(): Promise<void> {
    const config = await this.configService.getAppConfig();
    this.appConfig.set(config);
    this.menuItems.set(config?.menu || []);
  }
}
