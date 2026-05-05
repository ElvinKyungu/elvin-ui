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

// Component module — direct glob import, not resolveComponent (more reliable)
const componentModules = import.meta.glob('~/components/blocks/*.vue', { eager: true }) as Record<string, { default: any }>
const blockComponent = shallowRef<any>(null)

const activeTab = ref<'preview' | 'source'>('preview')

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const key = Object.keys(componentModules).find(k => k.endsWith(`/${block.filename}.vue`))
  if (key) blockComponent.value = componentModules[key].default

  nextTick(() => setTimeout(() => ScrollTrigger.refresh(true), 100))
})

watch(activeTab, (tab) => {
  if (tab === 'preview') nextTick(() => setTimeout(() => ScrollTrigger.refresh(true), 100))
})
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
          v-for="tab in ['preview', 'source'] as const"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 capitalize',
            activeTab === tab
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300',
          ]"
        >{{ tab }}</button>
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

        <!-- Source -->
        <div v-else key="source">
          <UiCodeBlock :code="blockSource" lang="vue" />
        </div>

      </Transition>
    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>
  </div>
</template>
