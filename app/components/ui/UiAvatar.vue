<script setup lang="ts">
interface Props {
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'indigo' | 'green' | 'amber' | 'red' | 'pink' | 'zinc'
  online?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'indigo',
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
})

const colorMap = {
  indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  green:  'bg-green-500/20 text-green-400 border-green-500/30',
  amber:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  red:    'bg-red-500/20 text-red-400 border-red-500/30',
  pink:   'bg-pink-500/20 text-pink-400 border-pink-500/30',
  zinc:   'bg-zinc-700 text-zinc-300 border-zinc-600',
}
</script>

<template>
  <div class="relative inline-flex flex-shrink-0">
    <div
      :class="[
        'rounded-full border flex items-center justify-center font-semibold overflow-hidden',
        colorMap[color],
        {
          'w-6 h-6 text-[9px]': size === 'xs',
          'w-8 h-8 text-xs': size === 'sm',
          'w-10 h-10 text-sm': size === 'md',
          'w-12 h-12 text-base': size === 'lg',
          'w-16 h-16 text-lg': size === 'xl',
        },
      ]"
    >
      <img v-if="src" :src="src" :alt="name" class="w-full h-full object-cover" />
      <span v-else>{{ initials }}</span>
    </div>
    <span
      v-if="online !== undefined"
      :class="[
        'absolute bottom-0 right-0 rounded-full border-2 border-zinc-950',
        online ? 'bg-green-400' : 'bg-zinc-600',
        {
          'w-1.5 h-1.5': size === 'xs',
          'w-2 h-2': size === 'sm',
          'w-2.5 h-2.5': size === 'md',
          'w-3 h-3': size === 'lg',
          'w-3.5 h-3.5': size === 'xl',
        },
      ]"
    />
  </div>
</template>

<!--
USAGE:
<UiAvatar name="Elvin Kyungu" size="md" :online="true" />
<UiAvatar src="/avatar.jpg" name="Jane Doe" size="lg" />
-->
