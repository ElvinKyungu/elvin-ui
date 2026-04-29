# Elvin UI — Claude Context

## Project

Elvin UI is a Nuxt 4 UI system built for copy-paste components and reusable UI blocks.

It is NOT a package. NOT an npm library.

The goal is to ship fast, clean, production-ready UI code that developers can directly paste into Nuxt 4 projects.

---

## Core philosophy

- Copy over install
- Simplicity over abstraction
- Speed of building over architecture complexity
- Clean, readable, reusable code
- Developer experience first

---

## Tech stack

- Nuxt 4
- Vue 3 (Composition API only)
- TypeScript (strict mode)
- TailwindCSS
- GSAP (micro-interactions only)

---

## Architecture rules

### Components

- Must be fully self-contained
- Must work in Nuxt 4 without modification
- Must not rely on hidden utilities unless explicitly provided
- Must include full source code
- Must include usage example
- Must be copy-paste ready

### UI Blocks

- Can compose multiple components
- Must remain reusable and portable
- Must not depend on project-specific logic

---

## Styling rules

- TailwindCSS only (avoid custom CSS unless absolutely necessary)
- Consistent spacing system
- Modern minimal UI
- Variants system required:
  - primary
  - secondary
  - ghost
  - danger

---

## Animation rules

- GSAP for micro-interactions only
- Hover / enter / exit animations only
- No heavy page transitions
- Performance-first mindset

---

## Nuxt 4 rules

- Always use `<script setup>`
- Prefer composables only when necessary
- Keep code server-safe (SSR compatible)
- Avoid unnecessary stores (Pinia only if required)
- Follow Nuxt auto-import conventions when relevant

---

## Component structure standard

Every component should follow this structure:

1. Props (TypeScript)
2. Logic (Composition API)
3. Template
4. Optional animations (GSAP)
5. Usage example

---

## Output rules for Claude

When generating code:

- Always return full components (not partial snippets)
- No unnecessary explanations unless asked
- Code must be production-ready
- Prioritize simplicity and clarity
- Avoid over-engineering

---

## File structure

```
app/
  components/
    ui/          → atomic components (Button, Input, Badge, Card...)
    blocks/      → composed sections (Hero, Navbar, Footer, Pricing...)
  pages/         → demo & showcase pages only
  layouts/       → default layout, docs layout
  composables/   → shared logic (useAnimation, useToast...)
  assets/
    main.css     → global styles, CSS variables
public/          → static assets (fonts, images)
ai/
  context/       → project & stack documentation
  skills/        → prompt templates
.claude/
  commands/      → custom slash commands (/clean, /commit, /polish...)
```

---

## Naming conventions

- **UI components**: PascalCase with `Ui` prefix → `UiButton.vue`, `UiInput.vue`, `UiBadge.vue`
- **Block components**: PascalCase descriptive → `HeroSection.vue`, `NavBar.vue`, `PricingCards.vue`
- **Composables**: camelCase with `use` prefix → `useAnimation.ts`, `useToast.ts`
- **Pages**: kebab-case → `getting-started.vue`, `components.vue`
- **CSS classes**: Tailwind only — no custom class names unless strictly necessary

---

## Component anatomy

Every UI component must follow this exact structure:

```vue
<script setup lang="ts">
import { gsap } from "gsap";

// 1. Props
interface Props {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
});

// 2. Logic
const el = useTemplateRef("el");

// 3. Animations (GSAP — only if needed)
onMounted(() => {
  if (!el.value) return;
  el.value.addEventListener("mouseenter", () => {
    gsap.to(el.value, { scale: 1.03, duration: 0.2, ease: "power2.out" });
  });
  el.value.addEventListener("mouseleave", () => {
    gsap.to(el.value, { scale: 1, duration: 0.2, ease: "power2.out" });
  });
});
</script>

<template>
  <!-- 4. Template -->
  <button
    ref="el"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      {
        'bg-zinc-900 text-white hover:bg-zinc-700': variant === 'primary',
        'bg-zinc-100 text-zinc-900 hover:bg-zinc-200': variant === 'secondary',
        'bg-transparent border border-zinc-300 hover:bg-zinc-50':
          variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
        'opacity-50 cursor-not-allowed': disabled,
      },
    ]"
  >
    <slot />
  </button>
</template>

<!--
USAGE:
<UiButton variant="primary" size="md">Click me</UiButton>
<UiButton variant="ghost" disabled>Disabled</UiButton>
-->
```

---

## Goal

Help developers build Nuxt 4 applications 10x faster using beautiful, reusable, copy-paste UI components with premium UX and micro-interactions.
