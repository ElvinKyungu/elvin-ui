<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const overlayEl = useTemplateRef('overlayEl')
const panelEl = useTemplateRef('panelEl')

function close() {
  emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    nextTick(() => {
      if (overlayEl.value) gsap.fromTo(overlayEl.value, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      if (panelEl.value) gsap.fromTo(panelEl.value, { opacity: 0, y: 16, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' })
    })
  }
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" ref="overlayEl" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="close" />

        <!-- Panel -->
        <div
          ref="panelEl"
          :class="[
            'relative w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden',
            {
              'max-w-sm': size === 'sm',
              'max-w-lg': size === 'md',
              'max-w-2xl': size === 'lg',
            },
          ]"
          role="dialog"
          :aria-labelledby="title ? 'modal-title' : undefined"
        >
          <!-- Header -->
          <div v-if="title || $slots.header" class="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <slot name="header">
              <h2 id="modal-title" class="text-base font-semibold text-white">{{ title }}</h2>
            </slot>
            <button
              @click="close"
              class="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all duration-150"
              aria-label="Close"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-5 text-zinc-400 text-sm leading-relaxed">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-800">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<!--
USAGE:
<UiModal v-model="open" title="Confirm deletion" size="sm">
  Are you sure you want to delete this item?
  <template #footer>
    <UiButton variant="ghost" @click="open = false">Cancel</UiButton>
    <UiButton variant="danger" @click="confirmDelete">Delete</UiButton>
  </template>
</UiModal>
-->
