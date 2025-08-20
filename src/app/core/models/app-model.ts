import { MenuItem } from './menu.model';

/** Defines the structure for the application layout settings. */
export interface AppLayoutConfig {
    menu: boolean;
    header: boolean;
    footer: boolean;
}

/** Defines the authentication-related configuration, including role-based menus. */
export interface AppAuthConfig {
    // Using an index signature allows for flexible role definitions (e.g., 'user', 'admin').
    [role: string]: {
        menu: MenuItem[];
    };
}

/** Defines the root structure for the 'application' object in app.json. */
export interface ApplicationConfig {
    layout: AppLayoutConfig;
    landingPage: string;
    auth: AppAuthConfig;
}

/**
 * Defines the top-level structure of the app.json configuration file.
 * This is the main model for the application's configuration.
 */
export interface AppModel {
    application: ApplicationConfig;
}