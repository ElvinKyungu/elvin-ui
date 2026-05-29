<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blockDocs } from '~/data/blocks'

const route = useRoute()
const id = route.params.id as string
const block = blockDocs[id]

if (!block) throw createError({ statusCode: 404, statusMessage: 'Block not found' })

const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: `${block.name} — Elvin UI`,
  description: block.description,
  ogTitle: `${block.name} — Elvin UI`,
  ogDescription: block.description,
  ogImage: `${siteUrl}/og.png`,
  ogUrl: `${siteUrl}/blocks/${block.id}`,
  ogType: 'website',
  ogSiteName: 'Elvin UI',
  twitterCard: 'summary_large_image',
  twitterTitle: `${block.name} — Elvin UI`,
  twitterDescription: block.description,
  twitterImage: `${siteUrl}/og.png`,
})

// Source code (raw string)
const rawSources = import.meta.glob('~/components/blocks/*.vue', { query: '?raw', import: 'default', eager: true })
const blockSource = computed(() => {
  const key = Object.keys(rawSources).find(k => k.endsWith(`/${block.filename}.vue`))
  return key ? (rawSources[key] as string) : '<!-- source not available -->'
})

// Component module
const componentModules = import.meta.glob('~/components/blocks/*.vue', { eager: true }) as Record<string, { default: any }>
const blockComponent = shallowRef<any>(null)

const activeTab = ref<'preview' | 'source'>('preview')

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const key = Object.keys(componentModules).find(k => k.endsWith(`/${block.filename}.vue`))
  if (key) blockComponent.value = componentModules[key].default

  nextTick(() => setTimeout(() => ScrollTrigger.refresh(true), 100))

  // Auto-open license key entry if redirected from Chariow payment
  if (route.query['enter-key']) {
    modalOpen.value = true
  }
})

watch(activeTab, (tab) => {
  if (tab === 'preview') nextTick(() => setTimeout(() => ScrollTrigger.refresh(true), 100))
})

// Pro access — 'elvin-ui' is the Chariow slug for the Blocks Pack
const BLOCKS_PACK_PRODUCT_ID = 'elvin-ui'
const { hasBlocksAccess } = useAuth()
const blocksUnlocked = computed(() => import.meta.dev || hasBlocksAccess.value)
const modalOpen = ref(false)

function handleSourceClick() {
  if (blocksUnlocked.value) {
    activeTab.value = 'source'
  }
  else {
    modalOpen.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff12_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
    </div>

    <BlocksNavBar />

    <div class="pt-20 pb-24 px-6 relative z-10 max-w-5xl 2xl:max-w-[80rem] mx-auto">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <NuxtLink to="/blocks" class="hover:text-zinc-300 transition-colors">Blocks</NuxtLink>
        <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-zinc-300 truncate">{{ block.name }}</span>
      </div>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2.5 flex-wrap">
            <h1 class="text-2xl font-bold text-white tracking-tight">{{ block.name }}</h1>
            <span
              v-if="block.isNew"
              class="text-[10px] px-2 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-bold uppercase tracking-wide leading-none"
            >New</span>
            <span class="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/60">{{ block.category }}</span>
            <span
              v-if="BLOCKS_PACK_PRODUCT_ID && !blocksUnlocked"
              class="text-[10px] px-2 py-0.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded font-bold uppercase tracking-widest"
            >Pro</span>
            <span
              v-if="BLOCKS_PACK_PRODUCT_ID && blocksUnlocked"
              class="text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded font-bold uppercase tracking-wide"
            >Unlocked</span>
          </div>
          <p class="text-sm text-zinc-400 max-w-xl leading-relaxed">{{ block.description }}</p>
        </div>
        <code class="text-xs text-zinc-600 font-mono flex-shrink-0 pt-1">
          components/blocks/{{ block.filename }}.vue
        </code>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800 w-fit mb-6">
        <button
          @click="activeTab = 'preview'"
          :class="[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
            activeTab === 'preview'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300',
          ]"
        >Preview</button>

        <button
          @click="handleSourceClick"
          :class="[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5',
            activeTab === 'source'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300',
          ]"
        >
          Source
          <span
            v-if="BLOCKS_PACK_PRODUCT_ID && !blocksUnlocked"
            class="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-400 border border-amber-400/20"
          >Pro</span>
        </button>
      </div>

      <!-- Preview -->
      <Transition mode="out-in" enter-active-class="transition-opacity duration-150" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-100" leave-to-class="opacity-0">

        <div v-if="activeTab === 'preview'" key="preview">
          <div
            class="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950"
            style="transform: translate3d(0,0,0)"
          >
            <component v-if="blockComponent" :is="blockComponent" />
            <div v-else class="flex items-center justify-center py-20">
              <div class="w-5 h-5 rounded-full border-2 border-zinc-700 border-t-accent animate-spin" />
            </div>
          </div>
        </div>

        <!-- Source (locked) -->
        <div v-else key="source">
          <div v-if="BLOCKS_PACK_PRODUCT_ID && !blocksUnlocked" class="relative rounded-2xl overflow-hidden border border-zinc-800/80">
            <!-- Blurred code preview -->
            <div class="select-none pointer-events-none blur-sm opacity-40">
              <UiCodeBlock :code="blockSource" lang="vue" />
            </div>
            <!-- Lock overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-950/60 backdrop-blur-[2px]">
              <div class="w-12 h-12 rounded-2xl bg-zinc-900 border border-amber-400/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-sm font-semibold text-white">Source code locked</p>
                <p class="text-xs text-zinc-500 mt-1">Unlock all 32 blocks with the All Blocks Pack</p>
              </div>
              <button
                @click="modalOpen = true"
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-zinc-900 text-sm font-bold hover:bg-amber-300 transition-colors"
              >
                Unlock all blocks — $39
              </button>
            </div>
          </div>
          <UiCodeBlock v-else :code="blockSource" lang="vue" />
        </div>

      </Transition>
    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>

    <!-- Pro modal -->
    <UiProModal
      v-model="modalOpen"
      :product-id="BLOCKS_PACK_PRODUCT_ID"
      name="All Blocks Pack"
      :price="39"
      @unlocked="modalOpen = false; activeTab = 'source'"
    />
  </div>
</template>
