<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  delay: 100,
})

const visible = ref(false)
const tooltipEl = useTemplateRef('tooltipEl')
let showTimer: ReturnType<typeof setTimeout>

function show() {
  clearTimeout(showTimer)
  showTimer = setTimeout(() => {
    visible.value = true
    nextTick(() => {
      if (!tooltipEl.value) return
      gsap.fromTo(tooltipEl.value,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
      )
    })
  }, props.delay)
}

function hide() {
  clearTimeout(showTimer)
  visible.value = false
}

const placementClasses = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}
</script>

<template>
  <div class="relative inline-flex" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
    <slot />
    <div
      v-if="visible"
      ref="tooltipEl"
      role="tooltip"
      :class="[
        'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl whitespace-nowrap pointer-events-none',
        placementClasses[placement],
      ]"
    >{{ content }}</div>
  </div>
</template>

<!--
USAGE:
<UiTooltip content="Copy to clipboard" placement="top">
  <UiIconButton label="Copy" variant="ghost">
    <Icon name="lucide:copy" class="w-4 h-4" />
  </UiIconButton>
</UiTooltip>
-->
