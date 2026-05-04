<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'white' | 'muted'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
})
</script>

<template>
  <div
    role="status"
    aria-label="Loading"
    :class="[
      'rounded-full border-2 animate-spin',
      {
        'w-4 h-4': size === 'sm',
        'w-6 h-6': size === 'md',
        'w-9 h-9': size === 'lg',
        'border-indigo-500/30 border-t-indigo-500': variant === 'primary',
        'border-white/30 border-t-white': variant === 'white',
        'border-zinc-700 border-t-zinc-400': variant === 'muted',
      },
    ]"
  />
</template>

<!--
USAGE:
<UiSpinner />
<UiSpinner size="lg" variant="white" />
<UiSpinner size="sm" variant="muted" />
-->
