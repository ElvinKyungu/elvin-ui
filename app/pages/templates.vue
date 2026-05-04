<script setup lang="ts">
import { gsap } from 'gsap'

useHead({ title: 'Templates — Elvin UI' })

interface Template {
  id: string
  name: string
  category: string
  isNew?: boolean
  isPro?: boolean
}

const templates: Template[] = [
  { id: 'saas-landing',         name: 'SaaS Landing',       category: 'SaaS',        isNew: true },
  { id: 'saas-pricing',         name: 'Pricing Page',        category: 'SaaS' },
  { id: 'saas-docs',            name: 'Documentation',       category: 'SaaS' },
  { id: 'dashboard-analytics',  name: 'Analytics Dashboard', category: 'Dashboard',   isNew: true },
  { id: 'dashboard-crm',        name: 'CRM Dashboard',       category: 'Dashboard' },
  { id: 'ecommerce-store',      name: 'Online Store',        category: 'E-commerce',  isNew: true },
  { id: 'ecommerce-product',    name: 'Product Page',        category: 'E-commerce' },
  { id: 'ecommerce-checkout',   name: 'Checkout',            category: 'E-commerce' },
  { id: 'marketing-agency',     name: 'Agency Landing',      category: 'Marketing' },
  { id: 'marketing-startup',    name: 'Startup Landing',     category: 'Marketing' },
  { id: 'blog-home',            name: 'Blog Home',           category: 'Blog' },
  { id: 'blog-post',            name: 'Blog Post',           category: 'Blog' },
  { id: 'portfolio',            name: 'Portfolio',           category: 'Portfolio' },
]

const sidebarOpen = ref(false)
const search = ref('')
const activeCategory = ref('All')
const isMobile = ref(false)

const allCategories = computed(() => {
  const cats = [...new Set(templates.map(t => t.category))]
  return [
    { name: 'All', count: templates.length },
    ...cats.map(name => ({ name, count: templates.filter(t => t.category === name).length })),
  ]
})

const filteredTemplates = computed(() =>
  templates.filter(t => {
    const q = search.value.toLowerCase()
    return (!q || t.name.toLowerCase().includes(q)) &&
      (activeCategory.value === 'All' || t.category === activeCategory.value)
  })
)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

const gridEl = useTemplateRef<HTMLElement>('gridEl')

function animateGrid() {
  if (!gridEl.value) return
  const items = Array.from(gridEl.value.children)
  gsap.killTweensOf(items)
  gsap.fromTo(items,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' },
  )
}

watch(filteredTemplates, () => nextTick(animateGrid))

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

  nextTick(animateGrid)
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

    <!-- BODY -->
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
          : { width: sidebarOpen ? '224px' : '0px', height: 'calc(100vh - 56px)' }"
      >
        <div class="h-full overflow-y-auto" :style="{ width: isMobile ? '264px' : '224px' }">
          <div class="p-5 flex flex-col gap-6">

            <!-- Sidebar header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-[3px] h-5 bg-accent rounded-full" />
                <span class="text-sm font-semibold text-white tracking-tight">Browse</span>
              </div>
              <span class="text-[11px] font-semibold tabular-nums px-2 py-1 bg-zinc-900 border border-zinc-800/80 rounded-lg text-zinc-400">
                {{ filteredTemplates.length }}
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
                placeholder="Search templates..."
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

            <!-- Categories -->
            <div class="flex flex-col gap-0.5">
              <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-1">Categories</p>
              <button
                v-for="cat in allCategories"
                :key="cat.name"
                @click="activeCategory = cat.name"
                :class="[
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group text-left',
                  activeCategory === cat.name
                    ? 'bg-zinc-800/80 text-white'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70',
                ]"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                  :class="activeCategory === cat.name
                    ? 'bg-accent shadow-[0_0_6px_rgba(99,102,241,0.6)]'
                    : 'bg-zinc-700 group-hover:bg-zinc-500'"
                />
                <span class="flex-1">{{ cat.name }}</span>
                <span
                  class="text-[11px] font-medium tabular-nums px-1.5 py-0.5 rounded-md transition-all"
                  :class="activeCategory === cat.name
                    ? 'bg-zinc-700 text-zinc-300'
                    : 'text-zinc-500 group-hover:text-zinc-400'"
                >{{ cat.count }}</span>
              </button>
            </div>

          </div>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="flex-1 min-w-0">

        <!-- Toolbar -->
        <div class="sticky top-14 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 h-11 flex items-center gap-3 px-4">
          <button
            @click="toggleSidebar"
            class="p-1.5 rounded-md transition-colors"
            :class="sidebarOpen ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'"
            :title="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <rect x="3" y="3" width="18" height="18" rx="2.5" />
              <path d="M9 3v18" stroke-linecap="round" />
            </svg>
          </button>

          <div class="h-3.5 w-px bg-zinc-800" />

          <p class="text-sm text-zinc-400">
            <span class="text-zinc-100 font-medium tabular-nums">{{ filteredTemplates.length }}</span> templates
          </p>

          <!-- Active filter badge -->
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 scale-90"
            leave-active-class="transition-all duration-200"
            leave-to-class="opacity-0 scale-90"
          >
            <div
              v-if="activeCategory !== 'All' || search"
              class="flex items-center gap-1.5 ml-1"
            >
              <span v-if="activeCategory !== 'All'" class="flex items-center gap-1 text-xs px-2 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded-full">
                {{ activeCategory }}
                <button @click="activeCategory = 'All'" class="hover:text-accent/70 transition-colors">
                  <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" /></svg>
                </button>
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
        <div v-if="!filteredTemplates.length" class="flex flex-col items-center justify-center h-64 gap-3 text-center px-6">
          <div class="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 grid place-items-center">
            <svg class="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-zinc-300">No templates found</p>
            <p class="text-xs text-zinc-600 mt-0.5">Try a different search or category</p>
          </div>
          <button @click="search = ''; activeCategory = 'All'" class="text-xs text-accent hover:text-accent/70 transition-colors">
            Clear filters
          </button>
        </div>

        <!-- Grid -->
        <div
          v-else
          ref="gridEl"
          class="grid gap-4 sm:gap-5 p-4 sm:p-6"
          :class="sidebarOpen
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'"
        >
          <div
            v-for="template in filteredTemplates"
            :key="template.id"
            class="group bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-700/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 transition-all duration-200 cursor-pointer"
          >
            <!-- Preview thumbnail — taller for page screenshots -->
            <div class="aspect-[4/3] relative overflow-hidden bg-zinc-900">
              <UiTemplatePreview :id="template.id" />
              <!-- Hover overlay with CTA -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                <span class="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 text-xs font-medium px-3 py-1.5 bg-white text-zinc-900 rounded-lg">
                  Preview
                </span>
              </div>
            </div>

            <div class="px-4 py-3 flex items-center justify-between border-t border-zinc-800/40">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-zinc-200">{{ template.name }}</span>
                <span
                  v-if="template.isNew"
                  class="text-[10px] px-1.5 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-semibold uppercase tracking-wide leading-none"
                >
                  New
                </span>
              </div>
              <span class="text-xs text-zinc-500">{{ template.category }}</span>
            </div>
          </div>
        </div>
      </main>

      </div><!-- end flex row (sidebar + main) -->

    </div><!-- end bordered max-w container -->
    </div><!-- end pt-14 outer wrapper -->

    <div class="border-t border-zinc-800/60">
      <BlocksFooterSection />
    </div>
  </div>
</template>
