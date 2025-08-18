# AI Assistant Rules

These are strict rules to be followed when generating or modifying code for the AppGenerator project.

1.  **Use Modern Angular:** All code must use features from Angular 20.1.6 or newer. This includes, but is not limited to:
    -   Signal-based components and state management.
    -   The new built-in control flow (`@if`, `@for`, `@switch`).
    -   Standalone components, directives, and pipes.
    -   experimental resource API.

2.  **Avoid Observables and RxJS:** The project mandate is to avoid `Observable` and the `RxJS` library wherever possible. Use `signal` and `computed` for reactive state. Use `resource` from `@angular/core/rxjs-interop` (or a similar pattern) only when absolutely necessary to bridge with APIs that might return Observables, but prefer signal-based service methods.

3.  **No Deprecated Syntax:** Do not use any deprecated Angular syntax or features. This includes `*ngIf`, `*ngFor`, and `*ngSwitch`.

4.  **Embrace Generics and DRY:** Use TypeScript generics to create reusable and type-safe functions and classes. Actively look for opportunities to apply the "Don't Repeat Yourself" (DRY) principle.

5.  **Strict Typing:** Always include explicit type annotations for all function parameters and return types. Avoid using `any` unless absolutely necessary and justified.

6.  **Use Named Exports:** Exclusively use named exports. Do not use `export default`. This ensures consistency across the codebase.