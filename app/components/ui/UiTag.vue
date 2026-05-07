<script setup lang="ts">
interface Props {
  variant?: 'default' | 'indigo' | 'green' | 'amber' | 'red'
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  removable: false,
})

defineEmits<{ remove: [] }>()

const styles = {
  default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  green:   'bg-green-500/10 text-green-400 border-green-500/25',
  amber:   'bg-amber-500/10 text-amber-400 border-amber-500/25',
  red:     'bg-red-500/10 text-red-400 border-red-500/25',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors',
      styles[variant],
    ]"
  >
    <slot />
    <button
      v-if="removable"
      @click.stop="$emit('remove')"
      class="ml-0.5 -mr-0.5 opacity-60 hover:opacity-100 transition-opacity"
      aria-label="Remove"
    >
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
      </svg>
    </button>
  </span>
</template>

<!--
USAGE:
<UiTag variant="indigo">TypeScript</UiTag>
<UiTag variant="green" removable @remove="removeTag('vue')">Vue</UiTag>
-->
