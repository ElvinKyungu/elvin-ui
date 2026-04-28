Design a clean, scalable props API for the component $ARGUMENTS.

Must include:
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- Any component-specific props that make sense

Output:
1. The full TypeScript `Props` interface
2. `withDefaults` with sensible defaults
3. How each prop maps to Tailwind classes
4. A usage example showing all variants

TypeScript strict mode. No `any`. Consistent with the Elvin UI design system.
