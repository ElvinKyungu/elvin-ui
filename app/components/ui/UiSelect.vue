<script setup lang="ts">
import { gsap } from 'gsap'

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

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const open = ref(false)
const containerEl = useTemplateRef('containerEl')
const menuEl = useTemplateRef('menuEl')

const selectedLabel = computed(() =>
  props.options.find(o => o.value === props.modelValue)?.label,
)

function toggle() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    nextTick(() => {
      if (!menuEl.value) return
      gsap.fromTo(menuEl.value,
        { opacity: 0, y: -6, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' },
      )
    })
  }
}

function select(opt: Option) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (containerEl.value && !containerEl.value.contains(e.target as Node))
    open.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-zinc-300">{{ label }}</label>
    <div ref="containerEl" class="relative">
      <button
        type="button"
        @click.stop="toggle"
        :disabled="disabled"
        :class="[
          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm bg-zinc-900 border outline-none transition-all duration-200',
          open
            ? 'border-emerald-500/60 ring-2 ring-emerald-500/20 text-white'
            : error
              ? 'border-red-500/60 text-white'
              : 'border-zinc-700 hover:border-zinc-600',
          selectedLabel ? 'text-white' : 'text-zinc-500',
          disabled && 'opacity-40 cursor-not-allowed',
        ]"
      >
        <span class="truncate">{{ selectedLabel ?? placeholder ?? 'Select…' }}</span>
        <svg
          class="w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200"
          :class="open && 'rotate-180'"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <Transition
        enter-active-class="transition-all duration-150"
        enter-from-class="opacity-0 scale-95 -translate-y-1"
        leave-active-class="transition-all duration-100"
        leave-to-class="opacity-0 scale-95 -translate-y-1"
      >
        <div
          v-if="open"
          ref="menuEl"
          class="absolute z-50 top-full left-0 right-0 mt-1.5 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden py-1"
        >
          <button
            v-for="opt in options"
            :key="opt.value"
            type="button"
            @click.stop="select(opt)"
            :class="[
              'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors duration-100',
              opt.value === modelValue
                ? 'bg-emerald-500/15 text-emerald-300'
                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white',
              opt.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
            ]"
          >
            <span class="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              <svg
                v-if="opt.value === modelValue"
                class="w-3.5 h-3.5 text-emerald-400"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            {{ opt.label }}
          </button>
        </div>
      </Transition>
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
