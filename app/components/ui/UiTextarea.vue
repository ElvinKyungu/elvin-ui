<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  error?: string
  hint?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 4,
  disabled: false,
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-zinc-300">{{ label }}</label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :class="[
        'w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 text-white placeholder-zinc-500 border outline-none transition-all duration-200 resize-y',
        'focus:ring-2 focus:ring-emerald-500/30',
        error
          ? 'border-red-500/60 focus:border-red-500'
          : 'border-zinc-700 focus:border-emerald-500/60',
        disabled && 'opacity-40 cursor-not-allowed',
      ]"
    />
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-500">{{ hint }}</p>
  </div>
</template>

<!--
USAGE:
<UiTextarea v-model="message" label="Message" placeholder="Write something..." :rows="5" />
-->
