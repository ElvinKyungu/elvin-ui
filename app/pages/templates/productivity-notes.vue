<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

interface Page {
  id: number; emoji: string; title: string; content: string; tags: string[]
  wordCount: number; lastEdited: string; children?: Page[]
}

const pages = reactive<Page[]>([
  {
    id: 1, emoji: '⚡', title: 'Elvin UI — Master Plan',
    content: `# Elvin UI — Master Plan\n\nA **copy-paste** component library for Nuxt 4 developers who want beautiful, production-ready UI without the bloat.\n\n## Core principles\n\n- **Copy over install** — no npm install, just paste\n- **Composition API only** — Vue 3 as it was meant to be\n- **GSAP micro-interactions** — every component feels alive\n- **Zero breaking changes** — if it works today, it works tomorrow\n\n## Q2 goals\n\n1. Launch v1.0 with 50 components\n2. Full documentation site\n3. Storybook integration\n4. 1,000 GitHub stars\n\n## Notes from the trenches\n\nThe hardest part isn't writing the components — it's making each one feel _just right_. The hover states, the timing, the spacing. That's where the magic is.`,
    tags: ['planning', 'vision'], wordCount: 142, lastEdited: 'Just now',
    children: [
      { id: 11, emoji: '🗺', title: 'Roadmap', content: '# Roadmap\n\nQ2 → Q4 2026 milestones', tags: ['planning'], wordCount: 12, lastEdited: '1h ago' },
      { id: 12, emoji: '🎯', title: 'OKRs', content: '# OKRs\n\nObjectives and key results', tags: ['planning'], wordCount: 8, lastEdited: '2h ago' },
    ],
  },
  {
    id: 2, emoji: '🎨', title: 'Design System Notes',
    content: `# Design System Notes\n\n## Color tokens\n\nAll colors derived from Zinc scale for consistency with TailwindCSS.\n\n\`\`\`css\n--color-bg: theme('colors.zinc.950');\n--color-surface: theme('colors.zinc.900');\n--color-border: theme('colors.zinc.800');\n--color-text: theme('colors.zinc.100');\n\`\`\`\n\n## Typography scale\n\nUsing system font stack for performance. No custom font loading.\n\n## Spacing\n\nAll spacing via Tailwind's default scale. No custom values.`,
    tags: ['design', 'css'], wordCount: 78, lastEdited: '30m ago',
  },
  {
    id: 3, emoji: '💡', title: 'Animation Ideas',
    content: `# Animation Ideas\n\nCollection of animation concepts to implement.\n\n## Micro-interactions\n\n- **Button press**: subtle scale(0.96) on active\n- **Card hover**: translateY(-2px) + shadow amplify  \n- **Input focus**: border color transition + label float\n- **Toggle**: spring physics on thumb slide\n\n## Page transitions\n\n- Clip-path reveal (left → right)\n- Blur + fade with slight y offset\n- Scale from center with elastic ease\n\n## Loading states\n\n- Shimmer skeleton (gradient sweep)\n- Dot pulse (staggered opacity)\n- Progress bar with spring overshoot`,
    tags: ['gsap', 'animation'], wordCount: 98, lastEdited: '1h ago',
  },
  {
    id: 4, emoji: '📚', title: 'Reading List',
    content: `# Reading List\n\n## Books\n\n- [ ] Refactoring UI — Adam Wathan & Steve Schoger\n- [x] The Design of Everyday Things — Don Norman\n- [ ] Clean Code — Robert C. Martin\n\n## Articles\n\n- [ ] "GSAP ScrollTrigger deep dive" — GreenSock blog\n- [x] "The future of CSS" — Lea Verou\n- [ ] "Component API design" — Ryan Carniato\n\n## Videos\n\n- [x] Vue.js Nation 2026 keynote\n- [ ] "Building Radix UI" — Pedro Duarte`,
    tags: ['reading', 'learning'], wordCount: 87, lastEdited: '2d ago',
  },
  {
    id: 5, emoji: '🚀', title: 'Launch Checklist',
    content: `# Launch Checklist v1.0\n\n## Pre-launch\n\n- [x] All 50 components documented\n- [x] Dark mode working everywhere\n- [ ] Performance audit (LCP < 2.5s)\n- [ ] A11y audit pass\n- [ ] SEO meta tags\n\n## Launch day\n\n- [ ] Post on X / Twitter\n- [ ] Submit to Hacker News\n- [ ] ProductHunt launch\n- [ ] Newsletter announcement\n\n## Post-launch\n\n- [ ] Monitor GitHub issues\n- [ ] Respond to community\n- [ ] Plan v1.1 based on feedback`,
    tags: ['launch', 'checklist'], wordCount: 82, lastEdited: '3d ago',
  },
])

const activePage = ref(pages[0])
const showEmojiPicker = ref(false)
const isEditing = ref(false)
const editableTitle = ref('')
const sidebarCollapsed = ref(false)
const expandedPages = reactive(new Set([1]))

const emojis = ['⚡', '🎨', '💡', '📚', '🚀', '🔥', '✨', '🎯', '💼', '🌿', '🔮', '🏆', '🎵', '🌊', '🦋', '🧪']

const wordCount = computed(() => {
  if (!activePage.value) return 0
  return activePage.value.content.split(/\s+/).filter(Boolean).length
})

const readingTime = computed(() => Math.max(1, Math.ceil(wordCount.value / 200)))

function selectPage(page: Page) {
  activePage.value = page
  isEditing.value = false
  gsap.from('.page-content', { y: 16, opacity: 0, duration: 0.4, ease: 'power3.out' })
}

function toggleExpand(pageId: number) {
  if (expandedPages.has(pageId)) expandedPages.delete(pageId)
  else expandedPages.add(pageId)
}

function changeEmoji(emoji: string) {
  if (activePage.value) activePage.value.emoji = emoji
  showEmoji.value = false
  gsap.from('.page-emoji', { scale: 0, rotate: -20, duration: 0.5, ease: 'back.out(2.5)' })
}

function startEdit() {
  editableTitle.value = activePage.value?.title || ''
  isEditing.value = true
  nextTick(() => {
    const input = document.querySelector('.title-input') as HTMLInputElement
    input?.focus()
    input?.select()
  })
}

function saveTitle() {
  if (activePage.value && editableTitle.value.trim()) activePage.value.title = editableTitle.value
  isEditing.value = false
}

function addPage() {
  const newPage: Page = {
    id: Date.now(), emoji: '📄', title: 'Untitled',
    content: '# Untitled\n\nStart writing...', tags: [], wordCount: 0, lastEdited: 'Just now',
  }
  pages.push(newPage)
  selectPage(newPage)
  nextTick(() => {
    gsap.from('.page-item:last-child', { x: -12, opacity: 0, duration: 0.3, ease: 'back.out(2)' })
    startEdit()
  })
}

const showEmoji = ref(false)

onMounted(() => {
  gsap.from('.page-item', { x: -16, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out' })
  gsap.from('.page-content', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 })
  gsap.from('.page-meta-item', { y: 12, opacity: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.4 })
})
</script>

<template>
  <div class="h-screen bg-zinc-950 text-white font-sans flex flex-col overflow-hidden">
    <!-- Nav -->
    <nav class="h-12 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-zinc-950/90 z-40 backdrop-blur-sm shrink-0">
      <div class="flex items-center gap-2">
        <button @click="sidebarCollapsed = !sidebarCollapsed" class="p-1.5 rounded hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <UiLogo :size="24" color="white" />
        <span class="text-sm font-bold">NovaNote</span>
      </div>
      <div class="flex items-center gap-2">
        <button class="hidden sm:flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Search
        </button>
        <button class="flex items-center gap-1 px-3 py-1 text-xs bg-amber-600 hover:bg-amber-500 rounded-lg font-semibold transition-colors" @click="addPage">+ New page</button>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Transition name="sidebar">
        <div v-if="!sidebarCollapsed" class="w-56 border-r border-zinc-800/60 bg-zinc-900/30 flex flex-col shrink-0 overflow-hidden">
          <div class="p-3 flex-1 overflow-y-auto">
            <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2 mb-2">Pages</p>
            <div class="space-y-0.5">
              <template v-for="page in pages" :key="page.id">
                <div class="page-item">
                  <button @click="selectPage(page)"
                    :class="['w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors group', activePage?.id === page.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60']">
                    <span class="shrink-0">{{ page.emoji }}</span>
                    <span class="flex-1 text-left truncate text-sm">{{ page.title }}</span>
                    <button v-if="page.children?.length" @click.stop="toggleExpand(page.id)"
                      class="opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all text-xs text-zinc-500">
                      {{ expandedPages.has(page.id) ? '▾' : '▸' }}
                    </button>
                  </button>
                  <!-- Children -->
                  <div v-if="page.children && expandedPages.has(page.id)" class="ml-4 mt-0.5 space-y-0.5">
                    <button v-for="child in page.children" :key="child.id" @click="selectPage(child)"
                      :class="['w-full flex items-center gap-2 px-2 py-1 rounded-lg text-xs transition-colors', activePage?.id === child.id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/40']">
                      <span>{{ child.emoji }}</span>
                      <span class="truncate">{{ child.title }}</span>
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!-- Sidebar footer -->
          <div class="p-3 border-t border-zinc-800 shrink-0">
            <div class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors group">
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-[10px] font-bold">EK</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium truncate">Elvin Kyungu</p>
                <p class="text-[10px] text-zinc-500">Free plan</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Main editor -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div v-if="activePage" class="flex-1 overflow-y-auto">
          <!-- Cover area -->
          <div class="h-32 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 relative overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div v-for="n in 6" :key="n" class="absolute rounded-full bg-amber-500/30 blur-2xl"
                :style="`width:${80+n*40}px;height:${60+n*30}px;top:${n*15}%;left:${n*16}%`" />
            </div>
            <button class="absolute top-3 right-3 px-2.5 py-1 text-[10px] bg-zinc-800/80 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors">
              Change cover
            </button>
          </div>

          <div class="max-w-3xl mx-auto px-8 py-8">
            <!-- Emoji + Title -->
            <div class="mb-6">
              <div class="relative inline-block mb-4">
                <button class="page-emoji text-5xl hover:opacity-80 transition-opacity" @click="showEmoji = !showEmoji">{{ activePage.emoji }}</button>
                <!-- Emoji picker -->
                <div v-if="showEmoji" class="absolute top-full left-0 mt-2 p-3 bg-zinc-800 border border-zinc-700 rounded-xl flex flex-wrap gap-2 w-52 z-10 shadow-xl">
                  <button v-for="e in emojis" :key="e" @click="changeEmoji(e)" class="text-xl hover:scale-125 transition-transform">{{ e }}</button>
                </div>
              </div>
              <!-- Editable title -->
              <div v-if="isEditing">
                <input v-model="editableTitle" @blur="saveTitle" @keydown.enter="saveTitle"
                  class="title-input w-full text-4xl font-black bg-transparent focus:outline-none placeholder-zinc-700"
                  placeholder="Untitled" />
              </div>
              <h1 v-else class="text-4xl font-black cursor-text hover:opacity-80 transition-opacity" @click="startEdit">{{ activePage.title }}</h1>
            </div>

            <!-- Meta -->
            <div class="flex flex-wrap gap-5 mb-8 pb-6 border-b border-zinc-800">
              <div class="page-meta-item">
                <p class="text-xs text-zinc-600 mb-0.5">Last edited</p>
                <p class="text-xs text-zinc-400">{{ activePage.lastEdited }}</p>
              </div>
              <div class="page-meta-item">
                <p class="text-xs text-zinc-600 mb-0.5">Words</p>
                <p class="text-xs text-zinc-400">{{ wordCount }}</p>
              </div>
              <div class="page-meta-item">
                <p class="text-xs text-zinc-600 mb-0.5">Read time</p>
                <p class="text-xs text-zinc-400">{{ readingTime }} min</p>
              </div>
              <div class="page-meta-item flex items-end gap-1.5">
                <span v-for="tag in activePage.tags" :key="tag"
                  class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="page-content prose prose-invert max-w-none">
              <template v-for="(line, i) in activePage.content.split('\n')" :key="i">
                <!-- Heading 1 -->
                <h1 v-if="line.startsWith('# ')" class="text-3xl font-black mb-4 text-white">{{ line.slice(2) }}</h1>
                <!-- Heading 2 -->
                <h2 v-else-if="line.startsWith('## ')" class="text-xl font-bold mb-3 mt-6 text-white">{{ line.slice(3) }}</h2>
                <!-- Code block start/end -->
                <div v-else-if="line.startsWith('```')" class="bg-zinc-900 rounded-lg p-4 my-3 border border-zinc-800 font-mono text-xs text-green-400 overflow-x-auto" />
                <!-- Checklist item -->
                <div v-else-if="line.startsWith('- [x]')" class="flex items-start gap-2 mb-1">
                  <span class="mt-0.5 text-emerald-400 shrink-0">☑</span>
                  <span class="text-sm text-zinc-400 line-through">{{ line.slice(6) }}</span>
                </div>
                <div v-else-if="line.startsWith('- [ ]')" class="flex items-start gap-2 mb-1">
                  <span class="mt-0.5 text-zinc-600 shrink-0">☐</span>
                  <span class="text-sm text-zinc-300">{{ line.slice(6) }}</span>
                </div>
                <!-- Bullet -->
                <div v-else-if="line.startsWith('- ')" class="flex items-start gap-2 mb-1">
                  <span class="mt-2 w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                  <span class="text-sm text-zinc-300" v-html="line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/_(.*?)_/g, '<em>$1</em>')" />
                </div>
                <!-- Numbered -->
                <div v-else-if="/^\d+\./.test(line)" class="flex items-start gap-2 mb-1">
                  <span class="text-xs text-zinc-500 shrink-0 mt-0.5">{{ line.match(/^\d+/)?.[0] }}.</span>
                  <span class="text-sm text-zinc-300" v-html="line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')" />
                </div>
                <!-- Code inline -->
                <p v-else-if="line.includes('`')" class="text-sm text-zinc-300 mb-2 leading-relaxed"
                  v-html="line.replace(/`([^`]+)`/g, '<code class=\'bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded text-xs font-mono\'>$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')" />
                <!-- Empty line -->
                <div v-else-if="line === ''" class="h-3" />
                <!-- Regular paragraph -->
                <p v-else class="text-sm text-zinc-300 mb-2 leading-relaxed"
                  v-html="line.replace(/\*\*(.*?)\*\*/g, '<strong class=\'text-white\'>$1</strong>').replace(/_(.*?)_/g, '<em>$1</em>')" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Right outline (desktop) -->
      <div class="hidden xl:flex w-48 border-l border-zinc-800/60 bg-zinc-900/20 flex-col p-4">
        <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">On this page</p>
        <div class="space-y-1">
          <button v-for="(line, i) in activePage?.content.split('\n').filter(l => l.startsWith('## '))" :key="i"
            class="w-full text-left text-xs text-zinc-500 hover:text-zinc-300 py-1 px-2 rounded hover:bg-zinc-800 transition-colors truncate">
            {{ line.slice(3) }}
          </button>
        </div>
        <div class="mt-auto pt-4 border-t border-zinc-800 space-y-2">
          <div class="text-xs text-zinc-600">{{ wordCount }} words · {{ readingTime }}m read</div>
          <button class="w-full text-xs text-zinc-500 hover:text-white py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">Share page</button>
          <button class="w-full text-xs text-zinc-500 hover:text-white py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">Export as PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-enter-active, .sidebar-leave-active { transition: all 0.25s ease; overflow: hidden; }
.sidebar-enter-from, .sidebar-leave-to { width: 0; opacity: 0; }
</style>
