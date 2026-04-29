<script setup lang="ts">
import { gsap } from "gsap";

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

const el = useTemplateRef("el");
const cleanups: (() => void)[] = [];

onMounted(() => {
  if (!el.value || props.disabled) return;
  const btn = el.value;

  const enter = () =>
    gsap.to(btn, { scale: 1.04, duration: 0.2, ease: "power2.out" });
  const leave = () =>
    gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
  const down = () =>
    gsap.to(btn, { scale: 0.97, duration: 0.1, ease: "power2.in" });
  const up = () =>
    gsap.to(btn, { scale: 1.04, duration: 0.15, ease: "power2.out" });

  btn.addEventListener("mouseenter", enter);
  btn.addEventListener("mouseleave", leave);
  btn.addEventListener("mousedown", down);
  btn.addEventListener("mouseup", up);

  cleanups.push(
    () => btn.removeEventListener("mouseenter", enter),
    () => btn.removeEventListener("mouseleave", leave),
    () => btn.removeEventListener("mousedown", down),
    () => btn.removeEventListener("mouseup", up),
  );
});

onUnmounted(() => cleanups.forEach((fn) => fn()));
</script>

<template>
  <button
    ref="el"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer select-none',
      {
        'bg-white text-zinc-950 hover:bg-zinc-100': variant === 'primary',
        'bg-zinc-800 text-zinc-100 hover:bg-zinc-700': variant === 'secondary',
        'border border-zinc-700 text-zinc-300 hover:bg-zinc-800/60 hover:text-white':
          variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
        'px-3 py-1.5 text-xs gap-1.5': size === 'sm',
        'px-4 py-2 text-sm gap-2': size === 'md',
        'px-6 py-3 text-base gap-2': size === 'lg',
        'opacity-40 cursor-not-allowed pointer-events-none': disabled,
      },
    ]"
  >
    <slot />
  </button>
</template>

<!--
USAGE:
<UiButton variant="primary" size="md">Click me</UiButton>
<UiButton variant="ghost" size="sm" disabled>Disabled</UiButton>
-->
