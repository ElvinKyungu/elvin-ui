<script setup lang="ts">
import { gsap } from 'gsap'

interface Tab {
  id: string
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: string
  tabs: Tab[]
  variant?: 'underline' | 'pill'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'underline',
})

const emit = defineEmits<{ 'update:modelValue': [id: string] }>()

const indicatorEl = useTemplateRef('indicatorEl')
const tabsEl = useTemplateRef('tabsEl')

function select(tab: Tab) {
  if (tab.disabled || tab.id === props.modelValue) return
  emit('update:modelValue', tab.id)
}

watch(() => props.modelValue, () => {
  nextTick(moveIndicator)
})

function moveIndicator() {
  if (!tabsEl.value || !indicatorEl.value || props.variant !== 'underline') return
  const activeBtn = tabsEl.value.querySelector<HTMLElement>('[data-active="true"]')
  if (!activeBtn) return
  gsap.to(indicatorEl.value, {
    x: activeBtn.offsetLeft,
    width: activeBtn.offsetWidth,
    duration: 0.25,
    ease: 'power2.out',
  })
}

onMounted(() => nextTick(moveIndicator))
</script>

<template>
  <!-- Underline variant -->
  <div v-if="variant === 'underline'">
    <div ref="tabsEl" class="relative flex border-b border-zinc-800">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :data-active="tab.id === modelValue"
        @click="select(tab)"
        :class="[
          'px-4 py-2.5 text-sm font-medium transition-colors duration-150 relative',
          tab.id === modelValue ? 'text-white' : 'text-zinc-500 hover:text-zinc-200',
          tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        ]"
      >{{ tab.label }}</button>
      <div ref="indicatorEl" class="absolute bottom-0 h-0.5 bg-indigo-500 rounded-full" />
    </div>
    <div class="pt-4">
      <slot />
    </div>
  </div>

  <!-- Pill variant -->
  <div v-else>
    <div class="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl gap-0.5">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="select(tab)"
        :class="[
          'px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150',
          tab.id === modelValue
            ? 'bg-zinc-700 text-white shadow-sm'
            : 'text-zinc-500 hover:text-zinc-200',
          tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        ]"
      >{{ tab.label }}</button>
    </div>
    <div class="pt-4">
      <slot />
    </div>
  </div>
</template>

<!--
USAGE:
<UiTabs v-model="activeTab" :tabs="[{ id: 'overview', label: 'Overview' }, { id: 'analytics', label: 'Analytics' }]">
  <div v-if="activeTab === 'overview'">...</div>
</UiTabs>
-->
