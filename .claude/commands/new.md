Create a complete new Elvin UI component: $ARGUMENTS

## Step 1 — Create the component file

Path: `app/components/ui/Ui[Name].vue`

Follow the exact anatomy from CLAUDE.md:
1. Props TypeScript interface + `withDefaults` (no `any`, strict mode)
2. Composition API logic with `useTemplateRef`
3. Template — TailwindCSS only, conditional class binding, variants + sizes
4. GSAP micro-interactions in `onMounted` + cleanup in `onUnmounted` (only if they add real value)
5. Usage comment at the bottom: `<!-- USAGE: <UiXxx variant="primary" size="md" /> -->`

Required variants (if applicable): primary, secondary, ghost, danger
Required sizes (if applicable): sm, md, lg
Accent color: emerald- (never indigo-, violet-, purple-)
SSR-safe: no window/document outside onMounted

## Step 2 — Register in data file

Read `app/data/ui-components.ts` to understand the full structure and existing entries.
Add a new entry that matches the exact same shape as existing ones:
- id, name, description, category, isNew: true
- props array with: name, type, default, description for each prop
- A realistic code usage example

## Step 3 — Add preview template

Read `app/pages/components/[id].vue` and find the section where component previews are defined.
Add a new preview block for this component showing all variants and sizes in action.
The preview must be visually complete — not a placeholder.

## Final step
Confirm the 3 file paths that were created/modified.
