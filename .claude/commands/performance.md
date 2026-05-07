Audit and fix performance issues in: $ARGUMENTS

Read the file, check every point below, fix what's wrong, return the corrected file.

## Imports & bundle
- GSAP imported selectively: `import { gsap } from 'gsap'` + `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
  Never: `import * as gsap from 'gsap'`
- animejs loaded dynamically if used: `const { animate, stagger } = await import('animejs')`
- No unused imports at the top of the file

## Vue reactivity
- `ref()` for primitives, `reactive()` for objects/forms
- Replace `watch` with `computed` wherever the value is derived, not side-effect-based
- No `watchEffect` running heavy logic on every reactive change
- `v-for` lists use a stable unique `:key` (id or slug, never array index on dynamic lists)

## GSAP memory
- `gsap.killTweensOf(el)` in `onUnmounted` for every ref that was animated
- All ScrollTrigger instances killed: `ScrollTrigger.getAll().forEach(t => t.kill())`
- Infinite loops (`repeat: -1`) only on decorative elements, never on lists > 5 items
- `once: true` on all scroll reveal triggers

## DOM & rendering
- `v-show` instead of `v-if` for elements toggled frequently (dropdowns, tabs, modals)
- `v-if` for elements that are rarely shown and expensive to render
- No direct DOM queries (`document.querySelector`) — use `useTemplateRef` instead
- Images have explicit `width` and `height` attributes to prevent layout shift

## SSR safety
- No `window`, `document`, `navigator`, `localStorage` at the top level of `<script setup>`
- All browser APIs inside `onMounted` or guarded with `if (process.client)`
- `useTemplateRef` values accessed only after mount

Report each issue found as a bullet, then return the corrected file.
