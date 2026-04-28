Enhance the GSAP animations in $ARGUMENTS for a premium feel.

Rules:
- Micro-interactions only (hover, enter, exit, click feedback)
- Use `useTemplateRef` to grab elements
- All GSAP calls inside `onMounted`, cleaned up in `onUnmounted`
- Ease preference: `power2.out` for movement, `expo.out` for reveals
- Duration: 0.15s–0.35s max
- No heavy page transitions
- Performance first — avoid animating layout-affecting properties

Return the full component with polished animations.
