<script setup lang="ts">
import { gsap } from 'gsap'

interface Item {
  label: string
  icon?: string
  action?: () => void
  divider?: boolean
  danger?: boolean
  disabled?: boolean
}

interface Props {
  items: Item[]
  placement?: 'bottom-left' | 'bottom-right'
}

withDefaults(defineProps<Props>(), {
  placement: 'bottom-left',
})

const open = ref(false)
const containerEl = useTemplateRef('containerEl')
const menuEl = useTemplateRef('menuEl')

function toggle() {
  open.value = !open.value
  if (open.value) {
    nextTick(() => {
      if (!menuEl.value) return
      gsap.fromTo(menuEl.value,
        { opacity: 0, y: -6, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' },
      )
    })
  }
}

function select(item: Item) {
  if (item.disabled || item.divider) return
  item.action?.()
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (containerEl.value && !containerEl.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="containerEl" class="relative inline-block">
    <div @click.stop="toggle">
      <slot />
    </div>

    <Transition
      enter-active-class="transition-all duration-150"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      leave-active-class="transition-all duration-100"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="open"
        ref="menuEl"
        :class="[
          'absolute z-50 mt-1.5 min-w-[160px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1',
          placement === 'bottom-right' ? 'right-0' : 'left-0',
        ]"
        role="menu"
      >
        <template v-for="(item, i) in items" :key="i">
          <div v-if="item.divider" class="my-1 border-t border-zinc-800" />
          <button
            v-else
            @click="select(item)"
            role="menuitem"
            :disabled="item.disabled"
            :class="[
              'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-100 text-left',
              item.danger
                ? 'text-red-400 hover:bg-red-500/10'
                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white',
              item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
            ]"
          >
            <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4 shrink-0 opacity-70" />
            {{ item.label }}
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<!--
USAGE:
<UiDropdown :items="[
  { label: 'Edit', icon: 'lucide:pencil', action: () => edit() },
  { divider: true },
  { label: 'Delete', icon: 'lucide:trash', danger: true, action: () => remove() },
]">
  <UiButton variant="ghost" size="sm">Options ▾</UiButton>
</UiDropdown>
-->
