<script setup lang="ts">
interface Props {
  variant?: 'default' | 'indigo' | 'green' | 'red' | 'zinc'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      {
        'bg-zinc-800 text-zinc-300 border border-zinc-700':             variant === 'default',
        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20': variant === 'indigo',
        'bg-green-500/10 text-green-400 border border-green-500/20':    variant === 'green',
        'bg-red-500/10 text-red-400 border border-red-500/20':          variant === 'red',
        'bg-zinc-900 text-zinc-500 border border-zinc-800':             variant === 'zinc',
      },
    ]"
  >
    <slot />
  </span>
</template>

<!--
USAGE:
<UiBadge>Default</UiBadge>
<UiBadge variant="indigo">TypeScript</UiBadge>
-->
