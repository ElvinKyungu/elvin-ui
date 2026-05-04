<script setup lang="ts">
interface Item {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  modelValue?: string
  items: Item[]
  variant?: 'default' | 'segmented'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <!-- Segmented control -->
  <div v-if="variant === 'segmented'" class="inline-flex p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg gap-0.5">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :disabled="item.disabled"
      @click="$emit('update:modelValue', item.value)"
      :class="[
        'px-3 py-1.5 text-sm rounded-md transition-all duration-150 font-medium',
        modelValue === item.value
          ? 'bg-zinc-700 text-white shadow-sm'
          : 'text-zinc-500 hover:text-zinc-200',
        item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
      ]"
    >{{ item.label }}</button>
  </div>

  <!-- Default joined group -->
  <div v-else class="inline-flex">
    <button
      v-for="(item, i) in items"
      :key="item.value"
      type="button"
      :disabled="item.disabled"
      @click="$emit('update:modelValue', item.value)"
      :class="[
        'px-3 py-2 text-sm border transition-all duration-150 font-medium',
        i === 0 ? 'rounded-l-lg' : '',
        i === items.length - 1 ? 'rounded-r-lg' : 'border-r-0',
        modelValue === item.value
          ? 'bg-white text-zinc-950 border-white z-10'
          : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white',
        item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
      ]"
    >{{ item.label }}</button>
  </div>
</template>

<!--
USAGE:
<UiButtonGroup
  v-model="view"
  :items="[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]"
/>
<UiButtonGroup variant="segmented" v-model="tab" :items="tabs" />
-->
