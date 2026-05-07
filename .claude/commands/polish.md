Run a full quality audit and fix everything in: $ARGUMENTS

Read the file, then go through every check below. Fix each issue found directly.

## TypeScript
- Props use a strict TypeScript interface — no `any`, no loose types
- `withDefaults` covers every prop with a sensible default
- Emits declared with `defineEmits<{...}>()`
- Template refs use `useTemplateRef`, not `ref<HTMLElement | null>(null)`

## Elvin UI conventions
- Component named correctly: `Ui` prefix for atomic (`UiButton`), descriptive for blocks (`HeroSection`)
- File in the right folder: `app/components/ui/` vs `app/components/blocks/`
- TailwindCSS only — no inline `style=""` unless GSAP requires it
- Accent color is emerald- (never indigo-, violet-, purple- — those were replaced)
- Variants present when applicable: primary, secondary, ghost, danger
- Sizes present when applicable: sm, md, lg

## GSAP & animations
- Every animated ref has `gsap.killTweensOf(ref.value)` in `onUnmounted`
- Every ScrollTrigger killed in `onUnmounted`: `ScrollTrigger.getAll().forEach(t => t.kill())`
- Durations: 0.15s–0.35s interactions, 0.6s–1s scroll reveals
- No animations on layout properties (width, height, padding, margin)

## Responsive
- Mobile-first: base classes for mobile, `sm:` / `md:` for wider screens
- No horizontal overflow risk
- Tap targets at least 44px tall for interactive elements

## Code hygiene
- No dead code, no commented-out blocks
- No unnecessary `watch` that could be a `computed`
- All `window` / `document` access inside `onMounted`
- Event listeners added in `onMounted`, removed in `onUnmounted`

After fixing, return the full corrected component followed by a concise bullet list of what was changed.
