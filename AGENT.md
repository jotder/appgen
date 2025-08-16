# AGENT.md

This file provides context to the AI assistant to help it understand the project and provide better assistance.

## Project Overview

This project is a web application geneter for creating dynamic feature pages using page templates and precreated wizard templates. 

## Architecture

The application is built using Angular for the frontend and a java backend (spring boot / quarkus). It follows a component-based architecture.

-   `src/app/core`: Core modules, services, and models.

## Key Libraries and Frameworks

-   **Angular**: The primary framework for the frontend. version 20.1.4
-   **NgRx (optional)**: For state management if the application becomes complex.
-   **G6 or similar**: https://g6.antv.antgroup.com For data visualizations in the dashboards.
-   **Angular Material**: For UI components.

## Coding Conventions

-   Follow the official [Angular Style Guide](https://angular.dev/style-guide).
-   Use TypeScript strict mode.
-   Components should have `OnPush` change detection strategy where possible.
-   Services should be provided in `root` unless they are specific to a feature module.

## Rules
-   Use Angular 20 version features wherever possible.
-   Avoid Observables and RxJS as much as possible.
-   Use resources with signals (preview features are ok).
-   Avoid deprecated syntax and features.
-   Use generics and follow the DRY (Don't Repeat Yourself) principle.
-   Always include type annotations for function parameters.
-   Avoid using default exports; prefer named exports.

## Do's and Don'ts

**Do:**
-   Create a new feature module for each new major feature.
-   Use shared components for UI elements that are used in multiple places.
-   Write unit tests for components and services.

**Don't:**

-   Put business logic directly into components. Use services for that.
-   Modify files in the `core` module without careful consideration.

## Important Files

## Major Modules
