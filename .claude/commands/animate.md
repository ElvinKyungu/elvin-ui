Add GSAP micro-interactions and scroll animations to: $ARGUMENTS

## Step 1 — Analyse the component

Read the target file and identify:
- Interactive elements: buttons, cards, links, inputs, toggles
- Elements that should reveal on scroll: sections, headings, feature lists, grids
- Elements that should animate on mount: hero content, page entry

## Step 2 — Implement animations

### Micro-interactions (hover / click)
- `mouseenter` → scale up, brighten, lift (translateY: -2 to -4px)
- `mouseleave` → return to rest state
- Click feedback → brief scale down then back
- Add/remove listeners in `onMounted` / `onUnmounted`

### Scroll reveals (ScrollTrigger)
- `gsap.registerPlugin(ScrollTrigger)` inside `onMounted`
- Single elements: `fromTo({ y: 24, opacity: 0 }, { y: 0, opacity: 1 })`
- Lists/grids: add `stagger: 0.08` to 0.12
- Trigger: `start: 'top 75%', once: true`
- Kill all instances in `onUnmounted`: `ScrollTrigger.getAll().forEach(t => t.kill())`

### Mount animations (if relevant)
- `gsap.from(el, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })`

## Strict rules
- Duration: 0.15s–0.35s for interactions, 0.6s–1s for reveals
- Ease: `power2.out` for movement, `expo.out` for reveals, `back.out(1.5)` for spring
- Never animate layout properties: width, height, padding, margin, display
- Only animate: opacity, x, y, scale, rotation
- `useTemplateRef` for all element refs
- `gsap.killTweensOf(el)` in `onUnmounted` for every animated ref

Return the full updated component.
