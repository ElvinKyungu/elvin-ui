Create a new Elvin UI component: $ARGUMENTS

Follow the exact component anatomy from CLAUDE.md:

1. Props interface with TypeScript + `withDefaults`
2. Logic with Composition API
3. GSAP micro-interactions in `onMounted` (only if it adds value)
4. Template with Tailwind conditional classes
5. Usage example in a comment at the bottom

Naming rules:

- UI component → `Ui` prefix → `UiButton.vue`
- Block component → descriptive → `HeroSection.vue`

File location:

- Atomic → `app/components/ui/`
- Section/block → `app/components/blocks/`

Variants required: primary, secondary, ghost, danger (if applicable)
Sizes required: sm, md, lg (if applicable)

Return the full component ready to use. Also tell me the exact path where to save it.
