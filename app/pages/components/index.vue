<script setup lang="ts">
import { gsap } from 'gsap'
import { allItems, categories } from '~/data/ui-components'

const route = useRoute()
const search = inject<Ref<string>>('comp-search', ref(''))
const sidebarOpen = inject<Ref<boolean>>('comp-sidebar-open', ref(true))
const toggleSidebar = inject<() => void>('comp-toggle-sidebar', () => {})

const activeId = computed(() => {
  if (route.query.cat) return route.query.cat as string
  return 'all'
})

const filteredItems = computed(() => {
  const q = search.value.toLowerCase()
  const filter = activeId.value
  return allItems.filter(item => {
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.categoryName.toLowerCase().includes(q)
    const matchesFilter = filter === 'all' || filter === item.categoryId || filter === item.id
    return matchesSearch && matchesFilter
  })
})

const gridEl = useTemplateRef<HTMLElement>('gridEl')

function animateGrid() {
  if (!gridEl.value) return
  const items = Array.from(gridEl.value.children)
  gsap.killTweensOf(items)
  gsap.fromTo(items,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'transform,opacity' },
  )
}

watch(filteredItems, () => nextTick(animateGrid))
onMounted(() => nextTick(animateGrid))
</script>

<template>
  <main class="flex-1 min-w-0">

    <!-- Toolbar -->
    <div class="sticky top-14 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 h-11 flex items-center gap-3 px-4">
      <button
        @click="toggleSidebar"
        class="p-1.5 rounded-md transition-colors"
        :class="sidebarOpen ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'"
        title="Toggle sidebar"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M9 3v18" stroke-linecap="round" />
        </svg>
      </button>
      <div class="h-3.5 w-px bg-zinc-800" />
      <p class="text-sm text-zinc-400">
        <span class="text-zinc-100 font-medium tabular-nums">{{ filteredItems.length }}</span> components
      </p>
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 scale-90"
        leave-active-class="transition-all duration-200"
        leave-to-class="opacity-0 scale-90"
      >
        <div v-if="activeId !== 'all' || search" class="flex items-center gap-1.5 ml-1">
          <span v-if="activeId !== 'all'" class="flex items-center gap-1 text-xs px-2 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded-full">
            {{ categories.find(c => c.id === activeId)?.name ?? allItems.find(i => i.id === activeId)?.name }}
            <NuxtLink to="/components" class="hover:text-accent/70 transition-colors">
              <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" /></svg>
            </NuxtLink>
          </span>
          <span v-if="search" class="flex items-center gap-1 text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full">
            "{{ search }}"
            <button @click="search = ''" class="hover:text-zinc-200 transition-colors">
              <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" /></svg>
            </button>
          </span>
        </div>
      </Transition>
    </div>

    <!-- Empty state -->
    <div v-if="!filteredItems.length" class="flex flex-col items-center justify-center h-64 gap-3 text-center px-6">
      <div class="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 grid place-items-center">
        <svg class="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-zinc-300">No components found</p>
        <p class="text-xs text-zinc-600 mt-0.5">Try a different search or category</p>
      </div>
      <NuxtLink to="/components" class="text-xs text-accent hover:text-accent/70 transition-colors">Clear filters</NuxtLink>
    </div>

    <!-- Grid -->
    <div
      v-else
      ref="gridEl"
      class="grid gap-3 sm:gap-4 p-3 sm:p-5"
      :class="sidebarOpen
        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'"
    >
      <NuxtLink
        v-for="item in filteredItems"
        :key="item.id"
        :to="`/components/${item.id}`"
        class="group bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-700/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 transition-all duration-200"
      >
        <div class="aspect-video relative overflow-hidden bg-zinc-900">
          <UiComponentPreview :id="item.id" />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
            <span class="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 text-xs font-medium px-3 py-1.5 bg-white text-zinc-900 rounded-lg">
              View component →
            </span>
          </div>
        </div>
        <div class="px-4 py-3 flex items-center justify-between border-t border-zinc-800/40">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-zinc-200">{{ item.name }}</span>
            <span v-if="item.isNew" class="text-[10px] px-1.5 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-semibold uppercase tracking-wide leading-none">New</span>
          </div>
          <span class="text-xs text-zinc-500">{{ item.categoryName }}</span>
        </div>
      </NuxtLink>
    </div>

  </main>
</template>
