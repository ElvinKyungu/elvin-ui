Make the component $ARGUMENTS fully copy-paste ready for any Nuxt 4 project.

Requirements:
- Self-contained: no imports from project-specific files
- All utilities inlined or clearly marked as external
- Add a comment block at the top of the file:

<!--
  ComponentName — Elvin UI
  Dependencies: tailwindcss[, gsap]
  Usage: <ComponentName variant="primary" />
-->

- Replace any local composable with inline logic if it's short
- Verify SSR safety
- Add a usage example in a comment at the bottom

Return the complete standalone component.
