<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  title: string
  open: Ref<boolean>
  items: string[]
}

// ─── Nav sections ─────────────────────────────────────────────────────────────
const navSections: NavItem[] = [
  { title: 'Getting Started', open: ref(true), items: ['Introduction', 'Installation', 'Configuration', 'Theming'] },
  { title: 'Components', open: ref(false), items: ['Button', 'Input', 'Modal', 'Badge', 'Avatar', 'Card', 'Table', 'Toast'] },
  { title: 'Blocks', open: ref(false), items: ['Hero', 'Navbar', 'Pricing', 'Footer', 'Feature Grid', 'Testimonials'] },
  { title: 'Templates', open: ref(false), items: ['SaaS Landing', 'Analytics Dashboard', 'Online Store', 'Documentation'] },
  { title: 'API Reference', open: ref(false), items: ['Props API', 'Events', 'Slots', 'Composables'] },
]

// ─── Table of contents ────────────────────────────────────────────────────────
const tocItems = [
  { label: 'Introduction', level: 2, active: ref(true) },
  { label: 'What is ElvinUI?', level: 2, active: ref(false) },
  { label: 'Key Features', level: 2, active: ref(false) },
  { label: 'Quick Start', level: 2, active: ref(false) },
  { label: 'Directory Structure', level: 2, active: ref(false) },
  { label: 'Component Anatomy', level: 2, active: ref(false) },
]

// ─── State ────────────────────────────────────────────────────────────────────
const activeDoc = ref('Introduction')
const showSearch = ref(false)
const feedbackGiven = ref<'yes' | 'no' | null>(null)
const copiedBlock = ref<number | null>(null)

// ─── Recent searches ──────────────────────────────────────────────────────────
const recentSearches = ['Introduction', 'Button component', 'GSAP animations']

const searchResults = [
  {
    group: 'Components',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    items: [
      { title: 'Button', section: 'Components' },
      { title: 'Input', section: 'Components' },
      { title: 'Modal', section: 'Components' },
      { title: 'Badge', section: 'Components' },
    ],
  },
  {
    group: 'Templates',
    icon: 'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-7z',
    items: [
      { title: 'SaaS Landing', section: 'Templates' },
      { title: 'Analytics Dashboard', section: 'Templates' },
    ],
  },
]

// ─── Code blocks ──────────────────────────────────────────────────────────────
const codeInstall = `# Using npm
npm install

# Or with pnpm
pnpm install

# nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/main.css'],
})`

const codeStructure = `app/
  components/
    ui/           # atomic components
      UiButton.vue
      UiInput.vue
      UiBadge.vue
    blocks/       # composed sections
      HeroSection.vue
      NavBar.vue
  pages/
  layouts/
  composables/
  assets/
    main.css`

const codeAnatomy = `<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})
<\/script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-lg',
      variant === 'primary' ? 'bg-zinc-900 text-white' : '',
      size === 'md' ? 'px-4 py-2 text-sm' : '',
    ]"
  >
    <slot />
  </button>
</template>`

// ─── Helpers ──────────────────────────────────────────────────────────────────
function setActiveDoc(item: string) {
  activeDoc.value = item
  feedbackGiven.value = null
  gsap.from('.doc-content', { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' })
}

function toggleSection(section: NavItem) {
  section.open.value = !section.open.value
}

async function copyCode(code: string, idx: number) {
  await navigator.clipboard.writeText(code)
  copiedBlock.value = idx
  setTimeout(() => { copiedBlock.value = null }, 2000)
}

function setActiveToc(i: number) {
  tocItems.forEach((t, ti) => { t.active.value = ti === i })
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    showSearch.value = true
  }
  if (e.key === 'Escape') {
    showSearch.value = false
  }
}

// ─── GSAP ─────────────────────────────────────────────────────────────────────
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)

  gsap.from('.sidebar-section', {
    x: -10,
    opacity: 0,
    stagger: 0.06,
    duration: 0.45,
    ease: 'power2.out',
    delay: 0.1,
  })
  gsap.from('.doc-content', {
    y: 12,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.2,
  })
  gsap.from('.toc-item', {
    x: 8,
    opacity: 0,
    stagger: 0.05,
    duration: 0.4,
    ease: 'power2.out',
    delay: 0.3,
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  gsap.killTweensOf('.sidebar-section, .doc-content, .toc-item')
})

watch(showSearch, (val) => {
  if (val) {
    nextTick(() => {
      searchInput.value?.focus()
      gsap.from('.search-result-item', {
        y: 6,
        opacity: 0,
        stagger: 0.04,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.1,
      })
    })
  }
})
</script>

<template>
  <div class="h-screen flex flex-col bg-[#080808] text-white overflow-hidden" style="font-family:Inter,system-ui,sans-serif">

    <!-- ─── Top Nav ──────────────────────────────────────────────────────────── -->
    <header class="h-14 flex items-center shrink-0 border-b border-zinc-800/60 bg-[#080808]/90 backdrop-blur-xl px-5 z-40">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 mr-8 shrink-0">
        <div class="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center shadow shadow-emerald-500/30">
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span class="text-sm font-bold tracking-tight">ElvinUI <span class="text-zinc-500 font-normal">Docs</span></span>
      </a>

      <!-- Search trigger -->
      <button
        @click="showSearch = true"
        class="flex items-center gap-3 flex-1 max-w-sm bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-all group"
      >
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
        <span class="flex-1 text-left text-xs">Search docs...</span>
        <span class="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-zinc-600 bg-zinc-800 border border-zinc-700 rounded-md px-1.5 py-0.5 group-hover:text-zinc-500 transition-colors">⌘K</span>
      </button>

      <!-- Right actions -->
      <div class="flex items-center gap-2 ml-auto">
        <!-- GitHub -->
        <a href="#" class="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
        </a>
        <!-- Version badge -->
        <span class="hidden sm:inline-flex items-center text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2 py-1">v2.1.0</span>
        <!-- Theme icon -->
        <button class="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
      </div>
    </header>

    <!-- ─── 3-Panel layout ───────────────────────────────────────────────────── -->
    <div class="flex flex-1 min-h-0">

      <!-- ── Left Sidebar ────────────────────────────────────────────────────── -->
      <aside class="hidden lg:flex flex-col w-64 shrink-0 border-r border-zinc-800/60 bg-zinc-900/30 overflow-y-auto">
        <nav class="px-3 py-5 flex flex-col gap-0.5">
          <div
            v-for="(section, si) in navSections"
            :key="si"
            class="sidebar-section mb-1"
          >
            <!-- Section header -->
            <button
              @click="toggleSection(section)"
              class="w-full flex items-center justify-between px-3 py-1.5 text-left mb-1 group"
            >
              <span class="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">{{ section.title }}</span>
              <svg
                :class="['w-3.5 h-3.5 text-zinc-600 transition-transform duration-200', section.open.value ? 'rotate-180' : '']"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              ><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            <!-- Section items -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              leave-active-class="transition-all duration-150 ease-in"
              enter-from-class="opacity-0 -translate-y-1"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div v-if="section.open.value" class="flex flex-col gap-0.5 pl-0.5">
                <button
                  v-for="item in section.items"
                  :key="item"
                  @click="setActiveDoc(item)"
                  :class="[
                    'w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all',
                    activeDoc === item
                      ? 'text-emerald-400 bg-emerald-500/10 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50',
                  ]"
                >{{ item }}</button>
              </div>
            </Transition>
          </div>
        </nav>
      </aside>

      <!-- ── Main Content ────────────────────────────────────────────────────── -->
      <main class="flex-1 overflow-y-auto min-w-0">
        <div class="max-w-3xl mx-auto px-8 py-8 pb-20">

          <!-- Breadcrumb -->
          <nav class="flex items-center gap-1.5 text-xs text-zinc-500 mb-8">
            <span class="hover:text-zinc-300 cursor-pointer transition-colors">Getting Started</span>
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span class="text-zinc-300">{{ activeDoc }}</span>
          </nav>

          <!-- Article content -->
          <article class="doc-content">

            <!-- H1 -->
            <h1 class="text-4xl font-black text-white mb-4 leading-tight tracking-tight">Introduction</h1>

            <p class="text-zinc-400 text-base leading-relaxed mb-8 border-l-2 border-emerald-500/40 pl-4">
              ElvinUI is a free, open-source component library built specifically for <strong class="text-white">Nuxt 4</strong>. Copy components directly into your project — no package to install, no abstraction layers, full ownership of your code.
            </p>

            <!-- Divider -->
            <hr class="border-zinc-800/60 mb-8" />

            <!-- What is ElvinUI -->
            <h2 class="text-2xl font-black text-white mb-4 flex items-center gap-3">
              <span class="w-1.5 h-6 rounded-full bg-emerald-500 inline-block" />
              What is ElvinUI?
            </h2>
            <p class="text-zinc-400 leading-relaxed mb-4">
              ElvinUI is a collection of beautifully designed, production-ready UI components and blocks built on top of Nuxt 4, Vue 3, TailwindCSS, and GSAP. Unlike traditional component libraries, ElvinUI uses a copy-paste approach — every component is designed to be copied directly into your codebase.
            </p>
            <p class="text-zinc-400 leading-relaxed mb-8">
              This means you get full control. You can customize, extend, or strip down any component to fit exactly what your project needs. There are no black-box abstractions, no runtime dependencies, and no breaking updates to worry about.
            </p>

            <!-- Key Features -->
            <h2 class="text-2xl font-black text-white mb-5 flex items-center gap-3">
              <span class="w-1.5 h-6 rounded-full bg-emerald-500 inline-block" />
              Key Features
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div
                v-for="feat in [
                  { icon: 'M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z', label: 'Copy-paste ready', sub: 'No npm install required' },
                  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'GSAP animations', sub: 'Micro-interactions built in' },
                  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'TypeScript strict', sub: 'Fully typed components' },
                ]"
                :key="feat.label"
                class="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-4"
              >
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                  <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path :d="feat.icon"/></svg>
                </div>
                <p class="text-sm font-semibold text-white mb-0.5">{{ feat.label }}</p>
                <p class="text-xs text-zinc-500">{{ feat.sub }}</p>
              </div>
            </div>

            <!-- Quick Start -->
            <h2 class="text-2xl font-black text-white mb-5 flex items-center gap-3">
              <span class="w-1.5 h-6 rounded-full bg-emerald-500 inline-block" />
              Quick Start
            </h2>

            <div class="relative group mb-8">
              <div class="bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-zinc-300 leading-relaxed">{{ codeInstall }}</pre>
              </div>
              <button
                @click="copyCode(codeInstall, 0)"
                class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <svg v-if="copiedBlock !== 0" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <svg v-else class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ copiedBlock === 0 ? 'Copied!' : 'Copy' }}
              </button>
            </div>

            <!-- Directory Structure -->
            <h2 class="text-2xl font-black text-white mb-5 flex items-center gap-3">
              <span class="w-1.5 h-6 rounded-full bg-emerald-500 inline-block" />
              Directory Structure
            </h2>

            <div class="relative group mb-8">
              <div class="bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-zinc-300 leading-relaxed">{{ codeStructure }}</pre>
              </div>
              <button
                @click="copyCode(codeStructure, 1)"
                class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <svg v-if="copiedBlock !== 1" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <svg v-else class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ copiedBlock === 1 ? 'Copied!' : 'Copy' }}
              </button>
            </div>

            <!-- Component Anatomy -->
            <h2 class="text-2xl font-black text-white mb-4 flex items-center gap-3">
              <span class="w-1.5 h-6 rounded-full bg-emerald-500 inline-block" />
              Component Anatomy
            </h2>
            <p class="text-zinc-400 leading-relaxed mb-5">
              Every ElvinUI component follows the same structure. Props are defined with TypeScript interfaces, logic uses the Composition API, and animations are powered by GSAP — only when needed.
            </p>

            <div class="relative group mb-12">
              <div class="bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-zinc-300 leading-relaxed">{{ codeAnatomy }}</pre>
              </div>
              <button
                @click="copyCode(codeAnatomy, 2)"
                class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <svg v-if="copiedBlock !== 2" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <svg v-else class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ copiedBlock === 2 ? 'Copied!' : 'Copy' }}
              </button>
            </div>

            <!-- Feedback -->
            <div class="border-t border-zinc-800/60 pt-8">
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 y-2"
                leave-to-class="opacity-0"
                mode="out-in"
              >
                <div v-if="feedbackGiven" key="thanks" class="flex items-center gap-2 text-sm text-zinc-400">
                  <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Thanks for your feedback!
                </div>
                <div v-else key="ask" class="flex items-center gap-4">
                  <p class="text-sm text-zinc-400">Was this page helpful?</p>
                  <div class="flex items-center gap-2">
                    <button
                      @click="feedbackGiven = 'yes'"
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                    >
                      <span>👍</span> Yes
                    </button>
                    <button
                      @click="feedbackGiven = 'no'"
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                    >
                      <span>👎</span> No
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Prev/Next navigation -->
            <div class="flex items-center justify-between mt-10 pt-6 border-t border-zinc-800/60">
              <button
                @click="setActiveDoc('Installation')"
                class="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                <span>
                  <span class="block text-[10px] text-zinc-600 mb-0.5 uppercase tracking-widest">Previous</span>
                  Installation
                </span>
              </button>
              <button
                @click="setActiveDoc('Configuration')"
                class="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors text-right"
              >
                <span>
                  <span class="block text-[10px] text-zinc-600 mb-0.5 uppercase tracking-widest text-right">Next</span>
                  Configuration
                </span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

          </article>
        </div>
      </main>

      <!-- ── Right TOC ───────────────────────────────────────────────────────── -->
      <aside class="hidden xl:block w-56 shrink-0 py-8 px-5 overflow-y-auto">
        <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">On this page</p>
        <nav class="flex flex-col gap-0.5">
          <a
            v-for="(item, i) in tocItems"
            :key="i"
            href="#"
            @click.prevent="setActiveToc(i)"
            :class="[
              'toc-item block text-xs py-1 px-2 rounded-lg transition-all',
              item.level === 3 ? 'pl-4' : '',
              item.active.value
                ? 'text-emerald-400 bg-emerald-500/8 font-medium'
                : 'text-zinc-500 hover:text-zinc-300',
            ]"
          >{{ item.label }}</a>
        </nav>

        <!-- Edit on GitHub -->
        <div class="mt-8 pt-6 border-t border-zinc-800/60">
          <a href="#" class="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit this page
          </a>
        </div>
      </aside>

    </div>

    <!-- ─── Modal: Search ─────────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showSearch" class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm" @click.self="showSearch = false">
        <div class="modal-box w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          <!-- Search input -->
          <div class="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/60">
            <svg class="w-4 h-4 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
            <input
              ref="searchInput"
              type="text"
              placeholder="Search documentation..."
              class="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
            />
            <kbd class="text-[10px] font-mono text-zinc-600 bg-zinc-800 border border-zinc-700 rounded-md px-1.5 py-0.5">Esc</kbd>
          </div>

          <!-- Body -->
          <div class="max-h-[420px] overflow-y-auto">
            <!-- Recent searches -->
            <div class="px-4 pt-4 pb-2">
              <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Recent</p>
              <div class="flex flex-col gap-0.5">
                <button
                  v-for="recent in recentSearches"
                  :key="recent"
                  @click="setActiveDoc(recent); showSearch = false"
                  class="search-result-item flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all text-left"
                >
                  <svg class="w-3.5 h-3.5 text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="12 8 12 12 14 14"/><circle cx="12" cy="12" r="9"/></svg>
                  {{ recent }}
                </button>
              </div>
            </div>

            <div class="px-4 pb-4 flex flex-col gap-4">
              <!-- Search result groups -->
              <div v-for="group in searchResults" :key="group.group">
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 mt-2">{{ group.group }}</p>
                <div class="flex flex-col gap-0.5">
                  <button
                    v-for="result in group.items"
                    :key="result.title"
                    @click="setActiveDoc(result.title); showSearch = false"
                    class="search-result-item flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left hover:bg-zinc-800/60 transition-all group/item"
                  >
                    <div class="w-8 h-8 rounded-lg bg-zinc-800 group-hover/item:bg-zinc-700 flex items-center justify-center shrink-0 transition-colors">
                      <svg class="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path :d="group.icon"/></svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-zinc-200 font-medium group-hover/item:text-white transition-colors">{{ result.title }}</p>
                    </div>
                    <span class="text-[10px] text-zinc-600 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md font-medium shrink-0">{{ result.section }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer hint -->
          <div class="flex items-center justify-between px-4 py-2.5 border-t border-zinc-800/60 bg-zinc-950/40">
            <div class="flex items-center gap-3 text-[10px] text-zinc-600">
              <span class="flex items-center gap-1"><kbd class="font-mono bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5">↑</kbd><kbd class="font-mono bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5">↓</kbd> navigate</span>
              <span class="flex items-center gap-1"><kbd class="font-mono bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5">↵</kbd> open</span>
            </div>
            <span class="text-[10px] text-zinc-600">Press <kbd class="font-mono bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box { transition: transform 0.2s ease; }
.modal-enter-from .modal-box,
.modal-leave-to .modal-box { transform: scale(0.95) translateY(8px); }
</style>
