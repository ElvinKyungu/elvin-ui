<script setup lang="ts">
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  dismissible?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: false,
})

const emit = defineEmits<{ dismiss: [] }>()

const visible = ref(true)

const config = computed(() => ({
  info:    { icon: 'lucide:info',           color: 'emerald', bg: 'bg-emerald-500/10',  border: 'border-emerald-500/25', text: 'text-emerald-400',  title: 'text-emerald-300' },
  success: { icon: 'lucide:check-circle',   color: 'green',  bg: 'bg-green-500/10',   border: 'border-green-500/25',  text: 'text-green-400',   title: 'text-green-300' },
  warning: { icon: 'lucide:alert-triangle', color: 'amber',  bg: 'bg-amber-500/10',   border: 'border-amber-500/25',  text: 'text-amber-400',   title: 'text-amber-300' },
  error:   { icon: 'lucide:x-circle',       color: 'red',    bg: 'bg-red-500/10',     border: 'border-red-500/25',    text: 'text-red-400',     title: 'text-red-300' },
}))

function dismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 -translate-y-1"
    leave-active-class="transition-all duration-200"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="visible"
      :class="[
        'flex gap-3 p-4 rounded-xl border',
        config[variant].bg,
        config[variant].border,
      ]"
      role="alert"
    >
      <Icon :name="config[variant].icon" :class="['w-5 h-5 shrink-0 mt-0.5', config[variant].text]" />
      <div class="flex-1 min-w-0">
        <p v-if="title" :class="['text-sm font-semibold mb-0.5', config[variant].title]">{{ title }}</p>
        <div :class="['text-sm', config[variant].text, title ? 'opacity-80' : '']">
          <slot />
        </div>
      </div>
      <button
        v-if="dismissible"
        @click="dismiss"
        :class="['shrink-0 mt-0.5 transition-opacity hover:opacity-70', config[variant].text]"
        aria-label="Dismiss"
      >
        <Icon name="lucide:x" class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>

<!--
USAGE:
<UiAlert variant="success" title="Saved!" dismissible>Your changes have been saved.</UiAlert>
<UiAlert variant="error">Something went wrong. Please try again.</UiAlert>
-->
