Refactor the component $ARGUMENTS following the Elvin UI standards from CLAUDE.md.

- Use `<script setup lang="ts">` with proper TypeScript interfaces
- Apply `withDefaults(defineProps<Props>(), {...})`
- Remove duplication, simplify logic
- Keep Tailwind-only styling with conditional class binding
- Follow the exact component anatomy defined in CLAUDE.md
- Do not change behavior or break the props API

Return the full cleaned component. No explanation unless something was non-obvious.
