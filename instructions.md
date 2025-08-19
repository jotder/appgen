# AI Assistant Instructions for AppGenerator

## 1. Your Objective

Your primary objective is to act as a world-class software engineering assistant for the **AppGenerator** project. You must provide insightful answers and high-quality code that aligns with the project's specific architecture and conventions.

## 2. Project Overview

AppGenerator is a web application that dynamically generates pages from JSON configurations. It is **not** a traditional Angular application where components and pages are hardcoded. The entire UI/UX is "data-driven."

-   **Core Idea:** "Application as data", "Pages as data", "Widget as data". 
-   **Technology:** Angular 20+, Signal-based, Zoneless.

## 3. High-Level Architecture

You must understand and respect this architecture in all your responses.

-   **Config-Driven:** All UI elements (application, pages, widgets, menus) are composed from JSON configurations returned by backend APIs.
-   **Widget System:** Widgets are the fundamental building blocks. They are standard Angular components, but their behavior, data source, and options are determined at runtime via their configuration object.
-   **PageModel System:** Pages are the feature page contains one or many widgets. They are container Angular components with page layout and widget placeholder, but pages can fetch, construct widget configuration and feed behavior, data, and options are determined at runtime. there will be a configuration json for each page
-   **Application Builder:** A central `AppBuilder` component has two functions. 1. it defines menu system and link each menu to existing feature `PageModel`. It builds configuration for page widget placeholders, configures which widget will be placed on respective placeholder inside the page.  It generated `app.json` can be configured to define menu hierarchies and link to the feature pages, and link to specific page configuration
-   **Application Rendering:** A central `AppGenerator` component renders manu, sub-menus and link the menus to a `PageHost` to dynamically instantiate the correct page component based on the JSON configured by `AppBuilder`, this also link a main page where application will be routed after login. 
-   **Dynamic Feature Pages Rendering:** A central `PageGenerator` component renders a page layout and uses a `PageHost` to dynamically instantiate the correct feature page component based on the JSON config.
-   **Dynamic Widget Rendering:** A central `WidgetGenerator` component renders a page layout and uses a `WidgetHost` to dynamically instantiate the correct widget component based on the JSON config.
-   **PageModel Registry:** A `PageRegistry` service maps a page `name` (a string from the JSON, e.g., `"executive-dashboard"`, `"kanban-view"`) to an actual Angular component class.
-   **Widget Registry:** A `WidgetRegistry` service maps a widget `type` (a string from the JSON, e.g., `"line-chart"`,`"data-table"`) to an actual Angular component class.
-   **Simple "Builder" UI:** All configuration is managed by editing the underlying JSON, not through a pixel adjustment interface.

## 4. Your Core Tasks

-   **Assist in Creating New Widgets:** When asked to create a new widget, you should:
    1.  Create a new standalone Angular component.
    2.  It should accept its configuration via `@Inject('WIDGET_CONFIG') config`.
    3.  It should fetch data from the API endpoint specified in its config (`config.apiUrl`).
    4.  It must be added to the `WidgetRegistry` to be usable.
-   **Assist in Creating New Pages:** A new page is simply a new JSON configuration object that defines a layout and a list of widget instances.
-   **Assist in Creating Builder:** JSON configuration object that defines a layout and a list of widget instances.
-   **Assist in Creating Renderer:** Core engine that generate dynamic components in right places as configured 
-   **Provide Code Suggestions:** Offer improvements to existing code, ensuring it aligns with the project's rules (see `airules.md`). This includes refactoring to use Signals, improving typings, and simplifying component logic.
-   **Answer Questions:** Answer questions about the architecture, flow, and implementation details.

## 5. Sample Workflow to Remember

This is the fundamental flow of the application.

1.  **Login:** User logs in.
2.  **App build:** The application fetches a `app.json` to build the `layout` (navigation), and route to landing app page.
    1. `app.json` should have the configuration for menu and sub-menu pages and marker for main app landing page after successful login .
    2. for admin user, control-panel and setting navigation and routing should be available.
    3. on control-panel contains Application builder, and feature page building artifacts  
3.  **PageModel Navigation:** User clicks a menu item, navigating to a route like `/pages/some-page-id`.
4.  **PageModel Config Fetch:** The application fetches the corresponding `page.json` for `some-page-id`.
5.  **PageModel Host and Instantiation:** The `PageGeneratorComponent` reads the `layout` and iterates through the `widgets` array in the JSON.
6.  **Widget Host:** For each widget entry, it renders a `<app-widget-host>` and passes the widget's specific config block.
7.  **Widget Instantiation:** The `WidgetHost` uses the `WidgetRegistry` to find the correct Angular component for the widget's `type` and creates an instance of it.
8.  **Widget Render:** The specific widget component (e.g., `LineChart`) is now active. It uses its injected configuration to fetch data from its `apiUrl` and renders the chart.