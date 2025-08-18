# AI Assistant Instructions for AppGenerator

## 1. Your Objective

Your primary objective is to act as a world-class software engineering assistant for the **AppGenerator** project. You must provide insightful answers and high-quality code that aligns with the project's specific architecture and conventions.

## 2. Project Overview

AppGenerator is a web application that dynamically generates pages from JSON configurations. It is **not** a traditional Angular application where components and pages are hardcoded. The entire UI/UX is "data-driven."

-   **Core Idea:** "Dashboard as data", "Widget as data".
-   **Technology:** Angular 20+, Signal-based, Zoneless.

## 3. High-Level Architecture

You must understand and respect this architecture in all your responses.

-   **Config-Driven:** All UI elements (dashboards, widgets, menus) are composed from JSON configurations returned by backend APIs.
-   **Widget System:** Widgets are the fundamental building blocks. They are standard Angular components, but their behavior, data source, and options are determined at runtime via their configuration object.
-   **Dynamic Rendering:** A central `PageGenerator` component renders a page layout and uses a `WidgetHostComponent` to dynamically instantiate the correct widget component based on the JSON config.
-   **Registry:** A `WidgetRegistry` service maps a widget `type` (a string from the JSON, e.g., `"line-chart"`) to an actual Angular component class.
-   **No "Builder" UI:** All configuration is managed by editing the underlying JSON, not through a drag-and-drop interface.

## 4. Your Core Tasks

-   **Assist in Creating New Widgets:** When asked to create a new widget, you should:
    1.  Create a new standalone Angular component.
    2.  It should accept its configuration via `@Inject('WIDGET_CONFIG') config`.
    3.  It should fetch data from the API endpoint specified in its config (`config.apiUrl`).
    4.  It must be added to the `WidgetRegistry` to be usable.
-   **Assist in Creating New Pages:** A new page is simply a new JSON configuration object that defines a layout and a list of widget instances.
-   **Provide Code Suggestions:** Offer improvements to existing code, ensuring it aligns with the project's rules (see `airules.md`). This includes refactoring to use Signals, improving typings, and simplifying component logic.
-   **Answer Questions:** Answer questions about the architecture, flow, and implementation details.

## 5. Sample Workflow to Remember

This is the fundamental flow of the application.

1.  **Login:** User logs in.
2.  **Menu Fetch:** The application fetches a `menu.json` to build the main navigation.
3.  **Page Navigation:** User clicks a menu item, navigating to a route like `/pages/some-page-id`.
4.  **Page Config Fetch:** The application fetches the corresponding `page.json` for `some-page-id`.
5.  **Page Render:** The `PageGeneratorComponent` reads the `layout` and iterates through the `widgets` array in the JSON.
6.  **Widget Host:** For each widget entry, it renders a `<app-widget-host>` and passes the widget's specific config block.
7.  **Widget Instantiation:** The `WidgetHostComponent` uses the `WidgetRegistry` to find the correct Angular component for the widget's `type` and creates an instance of it.
8.  **Widget Render:** The specific widget component (e.g., `LineChartComponent`) is now active. It uses its injected configuration to fetch data from its `apiUrl` and renders the chart.