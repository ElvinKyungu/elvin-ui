Create a complete new Elvin UI block section: $ARGUMENTS

## Step 1 — Create the block file

Path: `app/components/blocks/[Name]Section.vue` (or the most fitting name)

Block rules:
- GSAP ScrollTrigger entrance animation: `start: 'top 75%', once: true`
- Stagger children on scroll reveal for visual depth
- Fully responsive — mobile-first Tailwind classes
- Accent color: emerald- only (text-emerald-400, bg-emerald-500, border-emerald-500/30...)
- Real content — no Lorem Ipsum. Use Elvin UI branding and realistic copy.
- `onUnmounted`: kill all GSAP tweens with `gsap.killTweensOf()` and any ScrollTrigger instances
- SSR-safe: all GSAP and DOM access inside `onMounted`

Look at existing blocks like `HeroSection.vue`, `FeaturesSection.vue` for reference on style and structure.

## Step 2 — Register in blocks data

Read `app/data/blocks.ts` to understand the exact data structure and existing entries.
Add a new entry matching the same shape:
- id, name, description, category
- isNew: true

## Step 3 — Add wireframe thumbnail

Read `app/components/ui/UiBlockPreview.vue` and understand the wireframe template pattern used by existing blocks.
Add a new `<template v-else-if="id === '[block-id]'">` block with an abstract wireframe that visually represents the new block's layout.
Keep it minimal: rectangles, lines, dots — no real icons or text.

## Final step
Confirm the 3 file paths that were created/modified.
