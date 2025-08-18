# Best Practices for AppGenerator Development

This document outlines the key best practices to follow when developing for the AppGenerator project. Adhering to these guidelines ensures code quality, consistency, and maintainability.

## Angular & TypeScript

-   **Follow the official Angular Style Guide.**
-   **Enable and adhere to TypeScript's `strict` mode.**
-   **Use `OnPush` change detection strategy** for components wherever possible to optimize performance.
-   **Use modern Angular features** including Signals, new `@` control flow syntax, and new component naming guidelines.
-   **Prefer Signals over RxJS/Observables** for state management and data flow to align with the project's modern, zoneless architecture.

## Architecture & Code Organization

-   **Keep Business Logic in Services:** Components should be lean and delegate complex logic, state management, and API interactions to services.
-   **Create Feature Modules:** Encapsulate major features into their own modules to promote separation of concerns.
-   **Use Shared Components:** Create and use shared components for UI elements that appear in multiple places to maintain a consistent look and feel and promote reusability.
-   **Provide Services in `root`:** Use `providedIn: 'root'` for services unless they are truly specific to a lazy-loaded feature module.
-   **Be Cautious with the `core` Module:** Avoid modifying files in the `core` module without careful consideration, as they are foundational to the application.
-   **Follow DRY:** Adhere to the "Don't Repeat Yourself" principle. Use generics and helper functions to avoid code duplication.

## Exports & Naming

-   **Use Named Exports:** Always prefer named exports over default exports for consistency and better tree-shaking.
    ```typescript
    // Do
    export class MyService { ... }

    // Don't
    export default class MyService { ... }
    ```

## Testing

-   **Write Unit Tests:** All new components and services should have corresponding unit tests to ensure they function correctly.