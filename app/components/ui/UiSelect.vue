<script setup lang="ts">
interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  options: Option[]
  disabled?: boolean
  error?: string
  hint?: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

defineEmits<{ 'update:modelValue': [value: string | number] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-zinc-300">{{ label }}</label>
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :class="[
          'w-full px-3 py-2 pr-8 rounded-lg text-sm bg-zinc-900 text-white border outline-none appearance-none transition-all duration-200 cursor-pointer',
          'focus:ring-2 focus:ring-indigo-500/30',
          error
            ? 'border-red-500/60 focus:border-red-500'
            : 'border-zinc-700 focus:border-indigo-500/60',
          !modelValue && 'text-zinc-500',
          disabled && 'opacity-40 cursor-not-allowed',
        ]"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >{{ opt.label }}</option>
      </select>
      <svg
        class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      >
        <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-500">{{ hint }}</p>
  </div>
</template>

<!--
USAGE:
<UiSelect v-model="plan" label="Plan" placeholder="Choose a plan"
  :options="[{ label: 'Free', value: 'free' }, { label: 'Pro', value: 'pro' }]"
/>
-->
