<script setup lang="ts">
import { categories, allItems } from '~/data/ui-components'

useHead({ title: 'Components — Elvin UI' })

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)
const isMobile = ref(false)
const expandedCategories = ref<Set<string>>(new Set(categories.map(c => c.id)))
const search = ref('')

const activeId = computed(() => {
  if (route.params.id) return route.params.id as string
  if (route.query.cat) return route.query.cat as string
  return 'all'
})

provide('comp-search', search)
provide('comp-sidebar-open', sidebarOpen)
provide('comp-toggle-sidebar', () => { sidebarOpen.value = !sidebarOpen.value })

function toggleCategory(id: string) {
  const next = new Set(expandedCategories.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedCategories.value = next
}

function closeSidebarOnMobile() {
  if (isMobile.value) sidebarOpen.value = false
}

function selectAll() {
  router.push('/components')
  closeSidebarOnMobile()
}

function selectCategory(id: string) {
  expandedCategories.value = new Set([...expandedCategories.value, id])
  router.push({ path: '/components', query: { cat: id } })
  closeSidebarOnMobile()
}

function selectItem(id: string, categoryId: string) {
  expandedCategories.value = new Set([...expandedCategories.value, categoryId])
  router.push(`/components/${id}`)
  closeSidebarOnMobile()
}

onMounted(() => {
  const mql = window.matchMedia('(min-width: 768px)')
  isMobile.value = !mql.matches
  sidebarOpen.value = mql.matches
  const handler = (e: MediaQueryListEvent) => {
    isMobile.value = !e.matches
    sidebarOpen.value = e.matches
  }
  mql.addEventListener('change', handler)
  onUnmounted(() => mql.removeEventListener('change', handler))
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <!-- Grid background -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff12_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
    </div>

    <BlocksNavBar />

    <div class="pt-14 flex justify-center relative z-10">
      <div class="flex flex-col w-full max-w-5xl 2xl:max-w-[80rem] mx-auto border-x border-zinc-800/60">

        <!-- Mobile backdrop -->
        <Transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-300"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isMobile && sidebarOpen"
            class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm"
            @click="sidebarOpen = false"
          />
        </Transition>

        <div class="flex flex-1">

          <!-- SIDEBAR -->
          <aside
            class="flex-shrink-0 border-r border-zinc-800/60 overflow-x-hidden bg-zinc-950"
            :class="isMobile
              ? 'fixed left-0 z-30 transition-transform duration-300 ease-in-out'
              : 'sticky top-14 self-start transition-[width] duration-300 ease-in-out'"
            :style="isMobile
              ? { top: '56px', bottom: 0, width: '264px', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-110%)' }
              : { width: sidebarOpen ? '240px' : '0px', height: 'calc(100vh - 56px)' }"
          >
            <div class="h-full overflow-y-auto" :style="{ width: isMobile ? '264px' : '240px' }">
              <div class="p-4 flex flex-col gap-4">

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-[3px] h-5 bg-accent rounded-full" />
                    <span class="text-sm font-semibold text-white tracking-tight">Components</span>
                  </div>
                  <span class="text-[11px] font-semibold tabular-nums px-2 py-1 bg-zinc-900 border border-zinc-800/80 rounded-lg text-zinc-400">
                    {{ allItems.length }}
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
                    placeholder="Search components..."
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
                  @click="selectAll"
                  :class="[
                    'w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 text-left',
                    activeId === 'all'
                      ? 'bg-zinc-800/80 text-white'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70',
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200" :class="activeId === 'all' ? 'bg-accent shadow-[0_0_6px_rgba(99,102,241,0.6)]' : 'bg-zinc-700'" />
                  <span class="flex-1 font-medium">All</span>
                  <span class="text-[11px] tabular-nums px-1.5 py-0.5 rounded-md" :class="activeId === 'all' ? 'bg-zinc-700 text-zinc-300' : 'text-zinc-500'">{{ allItems.length }}</span>
                </button>

                <!-- Categories -->
                <div class="flex flex-col gap-0.5">
                  <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1 px-1">Categories</p>

                  <div v-for="cat in categories" :key="cat.id" class="flex flex-col">
                    <div class="flex items-center">
                      <button
                        @click="selectCategory(cat.id)"
                        :class="[
                          'flex-1 flex items-center gap-2 px-2.5 py-2 rounded-l-lg text-sm transition-all duration-150 text-left',
                          activeId === cat.id
                            ? 'bg-zinc-800/80 text-white'
                            : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70',
                        ]"
                      >
                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200" :class="activeId === cat.id ? 'bg-accent shadow-[0_0_6px_rgba(99,102,241,0.6)]' : 'bg-zinc-700'" />
                        <span class="flex-1">{{ cat.name }}</span>
                        <span class="text-[11px] tabular-nums px-1.5 py-0.5 rounded-md" :class="activeId === cat.id ? 'bg-zinc-700 text-zinc-300' : 'text-zinc-500'">{{ cat.items.length }}</span>
                      </button>
                      <button
                        @click="toggleCategory(cat.id)"
                        class="w-7 h-8 flex items-center justify-center rounded-r-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/70 transition-all duration-150 shrink-0"
                      >
                        <svg class="w-3 h-3 transition-transform duration-200" :class="expandedCategories.has(cat.id) ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <Transition
                      enter-active-class="transition-all duration-200 overflow-hidden"
                      enter-from-class="opacity-0 max-h-0"
                      enter-to-class="opacity-100 max-h-96"
                      leave-active-class="transition-all duration-150 overflow-hidden"
                      leave-from-class="opacity-100 max-h-96"
                      leave-to-class="opacity-0 max-h-0"
                    >
                      <div v-if="expandedCategories.has(cat.id)" class="flex flex-col gap-0.5 ml-4 pl-2 border-l border-zinc-800/60 my-0.5">
                        <button
                          v-for="item in cat.items"
                          :key="item.id"
                          @click="selectItem(item.id, cat.id)"
                          :class="[
                            'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all duration-150 text-left',
                            activeId === item.id
                              ? 'bg-zinc-800/60 text-white'
                              : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60',
                          ]"
                        >
                          <span class="w-1 h-1 rounded-full flex-shrink-0 transition-colors" :class="activeId === item.id ? 'bg-accent' : 'bg-zinc-700'" />
                          <span class="flex-1">{{ item.name }}</span>
                          <span v-if="item.isNew" class="text-[9px] px-1 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-semibold uppercase tracking-wide leading-none">New</span>
                        </button>
                      </div>
                    </Transition>
                  </div>
                </div>

              </div>
            </div>
          </aside>

          <!-- CHILD PAGE -->
          <div class="flex-1 min-w-0">
            <NuxtPage />
          </div>

        </div>
      </div>
    </div>

    <div class="border-t border-zinc-800/60">
      <BlocksFooterSection />
    </div>
  </div>
</template>
