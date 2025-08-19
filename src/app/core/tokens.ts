import { InjectionToken } from '@angular/core';

/**
 * Injection token that can be used to access the data of a page.
 */
export const PAGE_CONFIG = new InjectionToken<any>('PAGE_CONFIG');

/** Injection token for providing widget-specific configuration. */
export const WIDGET_CONFIG = new InjectionToken<any>('WIDGET_CONFIG');