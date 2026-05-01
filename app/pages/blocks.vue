<script setup lang="ts">
import { gsap } from 'gsap'

useHead({ title: 'Blocks — Elvin UI' })

interface Block {
  id: string
  name: string
  category: string
  isNew?: boolean
}

const blocks: Block[] = [
  { id: 'navbar',         name: 'Navigation Bar',   category: 'Navigation' },
  { id: 'hero',           name: 'Hero Section',      category: 'Hero',      isNew: true },
  { id: 'marquee',        name: 'Marquee Strip',     category: 'Marquee' },
  { id: 'split-feature',  name: 'Split Feature',     category: 'Features' },
  { id: 'bento',          name: 'Bento Grid',        category: 'Bento',     isNew: true },
  { id: 'features',       name: 'Features Grid',     category: 'Features' },
  { id: 'scroll-reveal',  name: 'Scroll Reveal',     category: 'Content' },
  { id: 'pricing',        name: 'Pricing Section',   category: 'Pricing' },
  { id: 'magnetic-cta',   name: 'Magnetic CTA',      category: 'CTA',       isNew: true },
  { id: 'cta',            name: 'CTA Section',       category: 'CTA' },
  { id: 'footer',         name: 'Footer',            category: 'Footer' },
  { id: 'floating-stack', name: 'Floating Stack',    category: 'Showcase' },
  { id: 'stats',          name: 'Stats Counter',     category: 'Stats' },
]

const sidebarOpen = ref(true)
const search = ref('')
const activeCategory = ref('All')

const allCategories = computed(() => {
  const cats = [...new Set(blocks.map(b => b.category))]
  return [
    { name: 'All', count: blocks.length },
    ...cats.map(name => ({ name, count: blocks.filter(b => b.category === name).length })),
  ]
})

const filteredBlocks = computed(() =>
  blocks.filter(b => {
    const q = search.value.toLowerCase()
    return (!q || b.name.toLowerCase().includes(q)) &&
      (activeCategory.value === 'All' || b.category === activeCategory.value)
  })
)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

const gridEl = useTemplateRef<HTMLElement>('gridEl')

onMounted(() => {
  if (!gridEl.value) return
  gsap.from(Array.from(gridEl.value.children), {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.04,
    ease: 'power2.out',
  })
})
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden bg-zinc-950 text-white max-w-6xl 2xl:max-w-[80rem] mx-auto">

    <!-- Grid background (same as index) -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff12_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
    </div>

    <!-- Shared navbar (fixed, h-14) -->
    <BlocksNavBar />

    <!-- Spacer for fixed navbar -->
    <div class="h-14 flex-shrink-0" />

    <!-- BODY -->
    <div class="flex flex-1 overflow-hidden relative z-10">

      <!-- SIDEBAR -->
      <aside
        class="flex-shrink-0 border-r border-zinc-800/60 overflow-hidden transition-[width] duration-300 ease-in-out"
        :style="{ width: sidebarOpen ? '220px' : '0px' }"
      >
        <div class="w-[220px] h-full overflow-y-auto">
          <div class="p-4 space-y-5">

            <div class="flex items-center gap-2 pt-0.5">
              <svg class="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M4 6h16M7 12h10M10 18h4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="text-sm font-medium">Filters</span>
              <span class="ml-auto text-xs px-1.5 py-0.5 bg-zinc-800 text-zinc-500 rounded-md tabular-nums font-medium">
                {{ filteredBlocks.length }}
              </span>
            </div>

            <div class="relative">
              <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />
              </svg>
              <input
                v-model="search"
                type="text"
                placeholder="Search blocks..."
                class="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>

            <div>
              <p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2 px-1">Categories</p>
              <div class="space-y-0.5">
                <button
                  v-for="cat in allCategories"
                  :key="cat.name"
                  @click="activeCategory = cat.name"
                  :class="[
                    'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors text-left',
                    activeCategory === cat.name
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900',
                  ]"
                >
                  <span>{{ cat.name }}</span>
                  <span class="text-xs tabular-nums" :class="activeCategory === cat.name ? 'text-zinc-400' : 'text-zinc-700'">
                    {{ cat.count }}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="flex-1 overflow-y-auto min-w-0">

        <!-- Toolbar -->
        <div class="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 h-11 flex items-center gap-3 px-5">
          <button
            @click="toggleSidebar"
            class="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
            :title="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <rect x="3" y="3" width="18" height="18" rx="2.5" />
              <path d="M9 3v18" stroke-linecap="round" />
            </svg>
          </button>

          <div class="h-3.5 w-px bg-zinc-800" />

          <p class="text-sm text-zinc-500">
            <span class="text-zinc-200 font-medium tabular-nums">{{ filteredBlocks.length }}</span> blocks
          </p>
        </div>

        <!-- Grid -->
        <div
          ref="gridEl"
          class="grid gap-4 p-5"
          :class="sidebarOpen ? 'grid-cols-3' : 'grid-cols-2'"
        >
          <div
            v-for="block in filteredBlocks"
            :key="block.id"
            class="group bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-700/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 transition-all duration-200 cursor-pointer"
          >
            <!-- Mini preview -->
            <div class="aspect-video relative overflow-hidden bg-zinc-900">

              <!-- NAVBAR -->
              <template v-if="block.id === 'navbar'">
                <div class="absolute inset-0 bg-zinc-950">
                  <div class="absolute top-0 left-0 right-0 h-10 border-b border-zinc-800 flex items-center px-4 gap-3">
                    <div class="w-3 h-3 bg-white rounded-[3px]" />
                    <div class="flex gap-2">
                      <div class="h-1.5 w-7 bg-zinc-700 rounded-full" />
                      <div class="h-1.5 w-5 bg-zinc-700 rounded-full" />
                      <div class="h-1.5 w-7 bg-zinc-700 rounded-full" />
                    </div>
                    <div class="ml-auto h-5 w-14 bg-white/90 rounded-md" />
                  </div>
                  <div class="absolute top-12 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-1.5 px-8">
                    <div class="h-1.5 w-3/4 bg-zinc-800 rounded-full" />
                    <div class="h-1.5 w-1/2 bg-zinc-800/60 rounded-full" />
                  </div>
                </div>
              </template>

              <!-- HERO -->
              <template v-else-if="block.id === 'hero'">
                <div class="absolute inset-0 bg-zinc-950">
                  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(99,102,241,0.18),transparent_65%)]" />
                  <div class="absolute inset-0 flex flex-col justify-center items-center gap-2 px-6">
                    <div class="h-2.5 w-40 bg-zinc-200 rounded-full" />
                    <div class="h-1.5 w-32 bg-zinc-600 rounded-full" />
                    <div class="h-1.5 w-24 bg-zinc-700/60 rounded-full" />
                    <div class="flex gap-2 mt-2">
                      <div class="h-6 w-16 bg-white rounded-lg" />
                      <div class="h-6 w-16 border border-zinc-700 rounded-lg" />
                    </div>
                  </div>
                </div>
              </template>

              <!-- MARQUEE -->
              <template v-else-if="block.id === 'marquee'">
                <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-center gap-2.5">
                  <div class="flex gap-2 px-3">
                    <div v-for="i in 7" :key="i" class="h-6 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 flex items-center gap-1.5 flex-shrink-0">
                      <div class="w-1.5 h-1.5 rounded-full bg-indigo-400/70" />
                      <div class="h-1 w-8 bg-zinc-700 rounded-full" />
                    </div>
                  </div>
                  <div class="flex gap-2 px-8 opacity-40">
                    <div v-for="i in 6" :key="i" class="h-6 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 flex items-center gap-1.5 flex-shrink-0">
                      <div class="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      <div class="h-1 w-7 bg-zinc-700 rounded-full" />
                    </div>
                  </div>
                </div>
              </template>

              <!-- SPLIT FEATURE -->
              <template v-else-if="block.id === 'split-feature'">
                <div class="absolute inset-0 bg-zinc-950 flex">
                  <div class="flex-1 flex flex-col justify-center gap-2 px-4">
                    <div class="h-1.5 w-6 bg-indigo-500/70 rounded-full" />
                    <div class="h-2 w-24 bg-zinc-200 rounded-full" />
                    <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
                    <div class="h-1.5 w-16 bg-zinc-700/50 rounded-full" />
                    <div class="h-6 w-16 bg-indigo-600 rounded-lg mt-1" />
                  </div>
                  <div class="flex-1 p-3">
                    <div class="w-full h-full bg-zinc-800/60 rounded-lg border border-zinc-700/40" />
                  </div>
                </div>
              </template>

              <!-- BENTO -->
              <template v-else-if="block.id === 'bento'">
                <div class="absolute inset-0 bg-zinc-950 p-3 grid grid-cols-3 grid-rows-2 gap-2">
                  <div class="col-span-2 row-span-1 bg-zinc-900 rounded-lg border border-zinc-800 p-2">
                    <div class="h-1.5 w-16 bg-zinc-300 rounded-full mb-1" />
                    <div class="h-1 w-12 bg-zinc-600 rounded-full" />
                  </div>
                  <div class="col-span-1 row-span-2 bg-indigo-950/50 rounded-lg border border-indigo-900/40 p-2">
                    <div class="w-4 h-4 bg-indigo-500/30 rounded-md mb-2" />
                    <div class="h-1 w-full bg-zinc-700 rounded-full mb-1" />
                    <div class="h-1 w-3/4 bg-zinc-700/50 rounded-full" />
                  </div>
                  <div class="col-span-1 row-span-1 bg-zinc-900 rounded-lg border border-zinc-800" />
                  <div class="col-span-1 row-span-1 bg-zinc-800/50 rounded-lg border border-zinc-700/40" />
                </div>
              </template>

              <!-- FEATURES GRID -->
              <template v-else-if="block.id === 'features'">
                <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
                  <div class="h-2 w-24 bg-zinc-300 rounded-full mx-auto" />
                  <div class="grid grid-cols-3 gap-2 flex-1">
                    <div v-for="i in 6" :key="i" class="bg-zinc-900 rounded-lg border border-zinc-800 p-1.5">
                      <div class="w-3 h-3 bg-indigo-500/40 rounded-sm mb-1" />
                      <div class="h-1 w-full bg-zinc-700 rounded-full" />
                      <div class="h-1 w-3/4 bg-zinc-800 rounded-full mt-0.5" />
                    </div>
                  </div>
                </div>
              </template>

              <!-- SCROLL REVEAL -->
              <template v-else-if="block.id === 'scroll-reveal'">
                <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-center gap-3 px-6">
                  <div class="h-3 w-full bg-zinc-200 rounded-full" />
                  <div class="h-3 w-5/6 bg-zinc-400 rounded-full" />
                  <div class="h-3 w-full bg-zinc-600 rounded-full" />
                  <div class="h-3 w-4/5 bg-zinc-700/50 rounded-full" />
                  <div class="h-3 w-3/4 bg-zinc-800/40 rounded-full" />
                </div>
              </template>

              <!-- PRICING -->
              <template v-else-if="block.id === 'pricing'">
                <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
                  <div class="h-2 w-20 bg-zinc-300 rounded-full mx-auto" />
                  <div class="flex gap-2 flex-1">
                    <div v-for="(_, i) in 3" :key="i"
                      class="flex-1 rounded-lg border p-2 flex flex-col gap-1"
                      :class="i === 1 ? 'bg-indigo-950/50 border-indigo-800/60' : 'bg-zinc-900 border-zinc-800'"
                    >
                      <div class="h-1.5 w-10 rounded-full" :class="i === 1 ? 'bg-indigo-500/60' : 'bg-zinc-600'" />
                      <div class="h-3 w-14 rounded-md" :class="i === 1 ? 'bg-indigo-400' : 'bg-zinc-400'" />
                      <div class="mt-auto space-y-1">
                        <div v-for="j in 3" :key="j" class="h-1 w-full rounded-full" :class="i === 1 ? 'bg-indigo-900/50' : 'bg-zinc-800'" />
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <!-- MAGNETIC CTA -->
              <template v-else-if="block.id === 'magnetic-cta'">
                <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2),transparent_70%)]" />
                  <div class="relative flex flex-col items-center gap-2">
                    <div class="h-2 w-32 bg-zinc-200 rounded-full" />
                    <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
                    <div class="h-7 w-24 bg-indigo-600 rounded-full mt-2 flex items-center justify-center">
                      <div class="h-1 w-12 bg-white/60 rounded-full" />
                    </div>
                  </div>
                </div>
              </template>

              <!-- CTA SECTION -->
              <template v-else-if="block.id === 'cta'">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-950/40 to-zinc-950 flex items-center justify-center">
                  <div class="flex flex-col items-center gap-2">
                    <div class="h-2 w-28 bg-zinc-200 rounded-full" />
                    <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
                    <div class="flex gap-2 mt-2">
                      <div class="h-6 w-16 bg-white rounded-lg" />
                      <div class="h-6 w-16 border border-zinc-700 rounded-lg" />
                    </div>
                  </div>
                </div>
              </template>

              <!-- FOOTER -->
              <template v-else-if="block.id === 'footer'">
                <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-end p-3 gap-2">
                  <div class="flex gap-3">
                    <div v-for="col in 4" :key="col" class="flex-1 space-y-1">
                      <div class="h-1.5 w-8 bg-zinc-400 rounded-full" />
                      <div v-for="r in 3" :key="r" class="h-1 bg-zinc-700/70 rounded-full" :style="{ width: `${50 + r * 12}%` }" />
                    </div>
                  </div>
                  <div class="border-t border-zinc-800 pt-2 flex items-center justify-between">
                    <div class="h-1 w-20 bg-zinc-700 rounded-full" />
                    <div class="flex gap-1.5">
                      <div v-for="s in 3" :key="s" class="w-3 h-3 bg-zinc-700 rounded-sm" />
                    </div>
                  </div>
                </div>
              </template>

              <!-- FLOATING STACK -->
              <template v-else-if="block.id === 'floating-stack'">
                <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                  <div class="relative w-28 h-20">
                    <div
                      v-for="(_, i) in 3"
                      :key="i"
                      class="absolute rounded-xl border border-zinc-700"
                      :class="i === 0 ? 'bg-zinc-900' : i === 1 ? 'bg-zinc-800/80' : 'bg-zinc-800/50'"
                      :style="{
                        inset: 0,
                        transform: `translate(${i * 7}px, ${-i * 7}px)`,
                        zIndex: 3 - i,
                      }"
                    />
                  </div>
                </div>
              </template>

              <!-- STATS -->
              <template v-else-if="block.id === 'stats'">
                <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-4">
                  <div class="grid grid-cols-4 gap-4 w-full">
                    <div v-for="i in 4" :key="i" class="flex flex-col items-center gap-1.5">
                      <div class="h-5 w-14 bg-zinc-200 rounded-md" />
                      <div class="h-1.5 w-10 bg-zinc-700 rounded-full" />
                    </div>
                  </div>
                </div>
              </template>

            </div>

            <!-- Card info -->
            <div class="px-4 py-3 flex items-center justify-between border-t border-zinc-800/40">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-zinc-200">{{ block.name }}</span>
                <span
                  v-if="block.isNew"
                  class="text-[10px] px-1.5 py-0.5 bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 rounded font-semibold uppercase tracking-wide leading-none"
                >
                  New
                </span>
              </div>
              <span class="text-xs text-zinc-600">{{ block.category }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
