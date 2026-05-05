<script setup lang="ts">
interface Category {
  name: string
  count: number
}

const props = defineProps<{
  label: string
  totalCount: number
  categories: Category[]
}>()

const open = defineModel<boolean>('open', { required: true })
const search = defineModel<string>('search', { required: true })
const activeCategory = defineModel<string>('activeCategory', { required: true })

const isMobile = ref(false)

function select(name: string) {
  activeCategory.value = name
  if (isMobile.value) open.value = false
}

onMounted(() => {
  const mql = window.matchMedia('(min-width: 768px)')
  isMobile.value = !mql.matches
  open.value = mql.matches
  const handler = (e: MediaQueryListEvent) => {
    isMobile.value = !e.matches
    open.value = e.matches
  }
  mql.addEventListener('change', handler)
  onUnmounted(() => mql.removeEventListener('change', handler))
})
</script>

<template>
  <!-- Mobile backdrop -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-300"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobile && open"
      class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm"
      @click="open = false"
    />
  </Transition>

  <aside
    class="flex-shrink-0 border-r border-zinc-800/60 overflow-x-hidden bg-zinc-950"
    :class="isMobile
      ? 'fixed left-0 z-30 transition-transform duration-300 ease-in-out'
      : 'sticky top-14 self-start transition-[width] duration-300 ease-in-out'"
    :style="isMobile
      ? { top: '56px', bottom: 0, width: '264px', transform: open ? 'translateX(0)' : 'translateX(-110%)' }
      : { width: open ? '240px' : '0px', height: 'calc(100vh - 56px)' }"
  >
    <div class="h-full overflow-y-auto" :style="{ width: isMobile ? '264px' : '240px' }">
      <div class="p-4 flex flex-col gap-4">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-[3px] h-5 bg-accent rounded-full" />
            <span class="text-sm font-semibold text-white tracking-tight">{{ label }}</span>
          </div>
          <span class="text-[11px] font-semibold tabular-nums px-2 py-1 bg-zinc-900 border border-zinc-800/80 rounded-lg text-zinc-400">
            {{ totalCount }}
          </span>
        </div>

        <!-- Search -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />
          </svg>
          <input
            v-model="search"
            type="text"
            :placeholder="`Search ${label.toLowerCase()}...`"
            class="w-full pl-9 pr-8 py-2 bg-zinc-900/60 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 focus:bg-zinc-900 transition-all duration-200"
          />
          <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="opacity-0 scale-75"
            leave-active-class="transition-all duration-150"
            leave-to-class="opacity-0 scale-75"
          >
            <button
              v-if="search"
              @click="search = ''"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition-colors"
            >
              <svg class="w-2.5 h-2.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
              </svg>
            </button>
          </Transition>
        </div>

        <!-- All -->
        <button
          @click="select('All')"
          :class="[
            'w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 text-left',
            activeCategory === 'All'
              ? 'bg-zinc-800/80 text-white'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70',
          ]"
        >
          <span
            class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
            :class="activeCategory === 'All' ? 'bg-accent shadow-[0_0_6px_rgba(99,102,241,0.6)]' : 'bg-zinc-700'"
          />
          <span class="flex-1 font-medium">All</span>
          <span
            class="text-[11px] tabular-nums px-1.5 py-0.5 rounded-md"
            :class="activeCategory === 'All' ? 'bg-zinc-700 text-zinc-300' : 'text-zinc-500'"
          >{{ totalCount }}</span>
        </button>

        <!-- Categories -->
        <div class="flex flex-col gap-0.5">
          <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1 px-1">Categories</p>
          <button
            v-for="cat in categories"
            :key="cat.name"
            @click="select(cat.name)"
            :class="[
              'w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 text-left',
              activeCategory === cat.name
                ? 'bg-zinc-800/80 text-white'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70',
            ]"
          >
            <span
              class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
              :class="activeCategory === cat.name ? 'bg-accent shadow-[0_0_6px_rgba(99,102,241,0.6)]' : 'bg-zinc-700'"
            />
            <span class="flex-1">{{ cat.name }}</span>
            <span
              class="text-[11px] tabular-nums px-1.5 py-0.5 rounded-md"
              :class="activeCategory === cat.name ? 'bg-zinc-700 text-zinc-300' : 'text-zinc-500'"
            >{{ cat.count }}</span>
          </button>
        </div>

      </div>
    </div>
  </aside>
</template>

<!--
USAGE:
<UiPageSidebar
  label="Blocks"
  :total-count="blocks.length"
  :categories="sidebarCategories"
  v-model:open="sidebarOpen"
  v-model:search="search"
  v-model:active-category="activeCategory"
/>
-->
