<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  disabled: false,
})

const el = useTemplateRef('el')
const cleanups: (() => void)[] = []

onMounted(() => {
  if (!el.value || props.disabled) return
  const btn = el.value
  const enter = () => gsap.to(btn, { scale: 1.08, duration: 0.18, ease: 'power2.out' })
  const leave = () => gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' })
  const down = () => gsap.to(btn, { scale: 0.92, duration: 0.08, ease: 'power2.in' })
  const up = () => gsap.to(btn, { scale: 1.08, duration: 0.12, ease: 'power2.out' })

  btn.addEventListener('mouseenter', enter)
  btn.addEventListener('mouseleave', leave)
  btn.addEventListener('mousedown', down)
  btn.addEventListener('mouseup', up)

  cleanups.push(
    () => btn.removeEventListener('mouseenter', enter),
    () => btn.removeEventListener('mouseleave', leave),
    () => btn.removeEventListener('mousedown', down),
    () => btn.removeEventListener('mouseup', up),
  )
})

onUnmounted(() => cleanups.forEach(fn => fn()))
</script>

<template>
  <button
    ref="el"
    type="button"
    :disabled="disabled"
    :aria-label="label"
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-colors cursor-pointer select-none',
      {
        'bg-white text-zinc-950 hover:bg-zinc-100': variant === 'primary',
        'bg-zinc-800 text-zinc-100 hover:bg-zinc-700': variant === 'secondary',
        'border border-zinc-700 text-zinc-300 hover:bg-zinc-800/60 hover:text-white': variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
        'w-7 h-7': size === 'sm',
        'w-9 h-9': size === 'md',
        'w-11 h-11': size === 'lg',
        'opacity-40 cursor-not-allowed pointer-events-none': disabled,
      },
    ]"
  >
    <slot />
  </button>
</template>

<!--
USAGE:
<UiIconButton label="Add item" variant="ghost">
  <Icon name="lucide:plus" class="w-4 h-4" />
</UiIconButton>
-->
