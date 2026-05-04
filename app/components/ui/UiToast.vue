<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  variant?: 'default' | 'success' | 'error' | 'warning'
  title: string
  description?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  duration: 4000,
})

const emit = defineEmits<{ close: [] }>()

const el = useTemplateRef('el')
const visible = ref(true)

const icon = computed(() => ({
  default: 'lucide:bell',
  success: 'lucide:check-circle',
  error: 'lucide:x-circle',
  warning: 'lucide:alert-triangle',
}[props.variant]))

const iconClass = computed(() => ({
  default: 'text-zinc-400',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
}[props.variant]))

function close() {
  if (!el.value) return emit('close')
  gsap.to(el.value, {
    opacity: 0, x: 24, duration: 0.25, ease: 'power2.in',
    onComplete: () => emit('close'),
  })
}

onMounted(() => {
  if (el.value) gsap.from(el.value, { opacity: 0, x: 24, y: 8, duration: 0.35, ease: 'power3.out' })
  if (props.duration > 0) setTimeout(close, props.duration)
})
</script>

<template>
  <div
    ref="el"
    class="flex items-start gap-3 w-72 p-4 bg-zinc-900 border border-zinc-700/80 rounded-xl shadow-2xl"
    role="alert"
  >
    <Icon :name="icon" :class="['w-4 h-4 mt-0.5 shrink-0', iconClass]" />
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-white leading-snug">{{ title }}</p>
      <p v-if="description" class="text-xs text-zinc-400 mt-0.5 leading-relaxed">{{ description }}</p>
    </div>
    <button @click="close" class="shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors">
      <Icon name="lucide:x" class="w-3.5 h-3.5" />
    </button>
  </div>
</template>

<!--
USAGE:
<UiToast title="Saved!" description="Your changes have been saved." variant="success" />
<UiToast title="Error" description="Something went wrong." variant="error" @close="removeToast" />
-->
