<script setup lang="ts">
import { gsap } from 'gsap'
import { templateDocs } from '~/data/templates'

const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Templates — Elvin UI',
  description: 'Full-page Nuxt 4 templates — landing pages, dashboards, and SaaS starters built with Elvin UI components.',
  ogTitle: 'Templates — Elvin UI',
  ogDescription: 'Full-page Nuxt 4 templates — landing pages, dashboards, and SaaS starters.',
  ogImage: `${siteUrl}/og.png`,
  ogUrl: `${siteUrl}/templates`,
  ogType: 'website',
  ogSiteName: 'Elvin UI',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Templates — Elvin UI',
  twitterDescription: 'Full-page Nuxt 4 templates — landing pages, dashboards, and SaaS starters.',
  twitterImage: `${siteUrl}/og.png`,
})

const templates = Object.values(templateDocs)

const sidebarOpen = ref(false)
const search = ref('')
const activeCategory = ref('All')

const sidebarCategories = computed(() => {
  const cats = [...new Set(templates.map(t => t.category))]
  return cats.map(name => ({
    name,
    items: templates
      .filter(t => t.category === name)
      .map(t => ({ id: t.id, name: t.name, isNew: t.isNew, href: `/templates/${t.id}` })),
  }))
})

const filteredTemplates = computed(() =>
  templates.filter(t => {
    const q = search.value.toLowerCase()
    return (!q || t.name.toLowerCase().includes(q)) &&
      (activeCategory.value === 'All' || t.category === activeCategory.value)
  }),
)

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
onMounted(() => nextTick(animateGrid))
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff12_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
    </div>

    <BlocksNavBar />

    <div class="pt-14 flex justify-center relative z-10">
      <div class="flex flex-col w-full max-w-5xl 2xl:max-w-[80rem] mx-auto border-x border-zinc-800/60">
        <div class="flex flex-1">

          <UiPageSidebar
            label="Templates"
            :total-count="templates.length"
            :categories="sidebarCategories"
            v-model:open="sidebarOpen"
            v-model:search="search"
            v-model:active-category="activeCategory"
          />

          <main class="flex-1 min-w-0">

            <!-- Toolbar -->
            <div class="sticky top-14 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 h-11 flex items-center gap-3 px-4">
              <button
                @click="sidebarOpen = !sidebarOpen"
                class="p-1.5 rounded-md transition-colors"
                :class="sidebarOpen ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'"
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

              <Transition
                enter-active-class="transition-all duration-200"
                enter-from-class="opacity-0 scale-90"
                leave-active-class="transition-all duration-200"
                leave-to-class="opacity-0 scale-90"
              >
                <div v-if="activeCategory !== 'All' || search" class="flex items-center gap-1.5 ml-1">
                  <span v-if="activeCategory !== 'All'" class="flex items-center gap-1 text-xs px-2 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded-full">
                    {{ activeCategory }}
                    <button @click="activeCategory = 'All'">
                      <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" /></svg>
                    </button>
                  </span>
                  <span v-if="search" class="flex items-center gap-1 text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full">
                    "{{ search }}"
                    <button @click="search = ''">
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
              <NuxtLink
                v-for="template in filteredTemplates"
                :key="template.id"
                :to="`/templates/${template.id}`"
                class="group bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-700/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 transition-all duration-200"
              >
                <div class="aspect-[4/3] relative overflow-hidden bg-zinc-900">
                  <UiTemplatePreview :id="template.id" />
                  <div
                    v-if="template.comingSoon"
                    class="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900/90 border border-zinc-700/60 text-[10px] text-zinc-500 font-semibold uppercase tracking-wide backdrop-blur-sm"
                  >
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round" />
                    </svg>
                    Soon
                  </div>
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                    <span class="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 text-xs font-medium px-3 py-1.5 bg-white text-zinc-900 rounded-lg">
                      View template →
                    </span>
                  </div>
                </div>
                <div class="px-4 py-3 flex items-center justify-between border-t border-zinc-800/40">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-zinc-200">{{ template.name }}</span>
                    <span v-if="template.isNew" class="text-[10px] px-1.5 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-semibold uppercase tracking-wide leading-none">New</span>
                  </div>
                  <span class="text-xs text-zinc-500">{{ template.category }}</span>
                </div>
              </NuxtLink>
            </div>

          </main>
        </div>
      </div>
    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>
  </div>
</template>
