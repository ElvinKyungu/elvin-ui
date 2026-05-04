<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
})

defineEmits<{ 'update:modelValue': [value: boolean] }>()

const checkEl = useTemplateRef('checkEl')

watch(() => props.modelValue, (val) => {
  if (!checkEl.value) return
  if (val) gsap.fromTo(checkEl.value, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' })
})
</script>

<template>
  <label
    :class="[
      'inline-flex items-center gap-2.5 cursor-pointer select-none',
      disabled && 'opacity-40 cursor-not-allowed',
    ]"
  >
    <div class="relative flex-shrink-0">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        class="sr-only"
      />
      <div
        :class="[
          'w-4 h-4 rounded border flex items-center justify-center transition-all duration-150',
          modelValue || indeterminate
            ? 'bg-indigo-500 border-indigo-500'
            : 'bg-zinc-900 border-zinc-600 hover:border-zinc-400',
        ]"
      >
        <svg
          v-if="modelValue && !indeterminate"
          ref="checkEl"
          class="w-2.5 h-2.5 text-white"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
        >
          <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div v-else-if="indeterminate" class="w-2 h-0.5 bg-white rounded-full" />
      </div>
    </div>
    <span v-if="label" class="text-sm text-zinc-300">{{ label }}</span>
    <slot />
  </label>
</template>

<!--
USAGE:
<UiCheckbox v-model="accepted" label="Accept terms and conditions" />
<UiCheckbox v-model="all" :indeterminate="partial" label="Select all" />
-->
