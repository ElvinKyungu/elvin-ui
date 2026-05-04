<script setup lang="ts">
interface Props {
  value: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  label?: string
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default',
  showValue: false,
})

const clamped = computed(() => Math.min(100, Math.max(0, props.value)))
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div v-if="label || showValue" class="flex items-center justify-between text-sm">
      <span v-if="label" class="text-zinc-400">{{ label }}</span>
      <span v-if="showValue" class="text-zinc-400 tabular-nums ml-auto">{{ clamped }}%</span>
    </div>
    <div
      :class="[
        'w-full bg-zinc-800 rounded-full overflow-hidden',
        {
          'h-1.5': size === 'sm',
          'h-2': size === 'md',
          'h-3': size === 'lg',
        },
      ]"
      role="progressbar"
      :aria-valuenow="clamped"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        :style="{ width: `${clamped}%` }"
        :class="[
          'h-full rounded-full transition-all duration-500 ease-out',
          {
            'bg-indigo-500': variant === 'default',
            'bg-green-500': variant === 'success',
            'bg-amber-500': variant === 'warning',
            'bg-red-500': variant === 'danger',
          },
        ]"
      />
    </div>
  </div>
</template>

<!--
USAGE:
<UiProgress :value="75" label="Upload" show-value />
<UiProgress :value="42" variant="success" size="lg" />
-->
