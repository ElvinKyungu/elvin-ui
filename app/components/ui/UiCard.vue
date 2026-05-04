<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  hoverable: false,
})
</script>

<template>
  <div
    :class="[
      'bg-zinc-900 border border-zinc-800 rounded-xl',
      {
        'p-0': padding === 'none',
        'p-3': padding === 'sm',
        'p-5': padding === 'md',
        'p-7': padding === 'lg',
        'transition-all duration-200 hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 cursor-pointer': hoverable,
      },
    ]"
  >
    <slot />
  </div>
</template>

<!--
USAGE:
<UiCard padding="md" hoverable>
  <h3 class="text-white font-semibold">Card title</h3>
  <p class="text-zinc-400 text-sm mt-1">Card content goes here.</p>
</UiCard>
-->
