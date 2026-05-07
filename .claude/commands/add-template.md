Create a complete new Elvin UI template: $ARGUMENTS

## Step 1 — Create the template page

Path: `app/pages/templates/[id].vue`

Template rules:
- Full page layout using existing blocks: `<BlocksNavBar />`, `<BlocksFooterSection />`, and relevant section blocks
- Add custom sections if needed for the template type (landing page, dashboard, pricing page, etc.)
- `useSeoMeta` at the top with relevant title and description
- Realistic content matching the template's purpose — no placeholder text
- Accent color: emerald- only
- SSR-safe and Nuxt 4 compatible

Reuse as many existing blocks as possible before creating custom sections.

## Step 2 — Register in templates data

Read `app/data/templates.ts` to understand the exact data shape and existing entries.
Add a new entry with:
- id, name, description, category
- isNew: true
- Any additional fields present in existing entries

## Step 3 — Add preview thumbnail

Read `app/components/ui/UiTemplatePreview.vue` and understand the thumbnail wireframe pattern.
Add a new `<template v-else-if="id === '[template-id]'">` block that visually represents the page layout as a miniature wireframe.

## Final step
Confirm the 3 file paths that were created/modified.
