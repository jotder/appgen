/**
 * Defines the structure for a single navigation menu item.
 * It supports nested children for creating submenus.
 */
export interface MenuItem {
    id: string;
    title: string;
    /** The page ID this menu item links to. */
    page: string;
    /** Optional URL fragment for in-page navigation. */
    fragment?: string;
    /** Optional array of child menu items for submenus. */
    children?: MenuItem[];
}