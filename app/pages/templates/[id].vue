<script setup lang="ts">
import { templateDocs } from '~/data/templates'

const route = useRoute()
const id = route.params.id as string
const template = templateDocs[id]

if (!template) throw createError({ statusCode: 404, statusMessage: 'Template not found' })

const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: `${template.name} — Elvin UI Templates`,
  description: template.description,
  ogTitle: `${template.name} — Elvin UI Templates`,
  ogDescription: template.description,
  ogImage: `${siteUrl}/og.png`,
  ogUrl: `${siteUrl}/templates/${template.id}`,
  ogType: 'website',
  ogSiteName: 'Elvin UI',
  twitterCard: 'summary_large_image',
  twitterTitle: `${template.name} — Elvin UI Templates`,
  twitterDescription: template.description,
  twitterImage: `${siteUrl}/og.png`,
})

const includedItems = [
  'Full Nuxt 4 page component (.vue)',
  'Responsive — mobile, tablet, desktop',
  'TypeScript strict mode',
  'TailwindCSS — no custom CSS',
  'GSAP micro-interactions',
  'Copy-paste ready',
]

// Pro access
const { isUnlocked } = useProAccess()
const unlocked = computed(() => !template.chariowProductId || isUnlocked(template.chariowProductId))

const modalOpen = ref(false)

// Auto-open license key entry if redirected from Chariow payment
onMounted(() => {
  if (route.query['enter-key']) {
    modalOpen.value = true
  }
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
        <NuxtLink to="/templates" class="hover:text-zinc-300 transition-colors">Templates</NuxtLink>
        <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-zinc-300 truncate">{{ template.name }}</span>
      </div>

      <!-- Main layout: preview left, info right -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

        <!-- Preview -->
        <div class="flex flex-col gap-3">
          <div class="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-2xl shadow-black/50">
            <UiTemplatePreview :id="template.id" />
            <!-- Coming soon overlay -->
            <div v-if="template.comingSoon" class="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                <svg class="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-sm font-semibold text-white">Coming soon</p>
                <p class="text-xs text-zinc-500 mt-0.5">Preview available shortly</p>
              </div>
            </div>
          </div>
          <p class="text-xs text-zinc-600 text-center">Wireframe preview — full template in progress</p>
        </div>

        <!-- Info panel -->
        <div class="flex flex-col gap-6 lg:sticky lg:top-24">

          <!-- Header -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/60">{{ template.category }}</span>
              <span v-if="template.isNew" class="text-[10px] px-2 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-bold uppercase tracking-wide">New</span>
              <span v-if="template.comingSoon" class="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-500 border border-zinc-700/60 rounded font-bold uppercase tracking-wide">Soon</span>
              <span
                v-if="template.chariowProductId && !unlocked"
                class="text-[10px] px-2 py-0.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded font-bold uppercase tracking-widest"
              >Pro</span>
              <span
                v-if="template.chariowProductId && unlocked"
                class="text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded font-bold uppercase tracking-wide"
              >Unlocked</span>
            </div>
            <h1 class="text-2xl font-bold text-white tracking-tight">{{ template.name }}</h1>
            <p class="text-sm text-zinc-400 leading-relaxed">{{ template.description }}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in template.tags"
              :key="tag"
              class="text-xs px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-lg"
            >{{ tag }}</span>
          </div>

          <!-- What's included -->
          <div class="flex flex-col gap-3">
            <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">What's included</p>
            <ul class="flex flex-col gap-2">
              <li
                v-for="item in includedItems"
                :key="item"
                class="flex items-center gap-2.5 text-sm text-zinc-400"
              >
                <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- CTA -->
          <div class="flex flex-col gap-3 pt-2 border-t border-zinc-800/60">
            <template v-if="template.comingSoon">
              <div class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-sm font-medium cursor-not-allowed select-none">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round" />
                </svg>
                Coming soon
              </div>
              <a
                :href="`mailto:elvinkyungu.75@gmail.com?subject=Notify me: ${template.name} template`"
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition-colors"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round" />
                </svg>
                Notify me when ready
              </a>
            </template>

            <!-- Pro template: unlocked -->
            <template v-else-if="template.chariowProductId && unlocked">
              <div class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                You have access — copy the code below
              </div>
            </template>

            <!-- Pro template: locked -->
            <template v-else-if="template.chariowProductId && !unlocked">
              <button
                @click="modalOpen = true"
                class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-400 text-zinc-900 text-sm font-bold hover:bg-amber-300 transition-colors"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round" />
                </svg>
                Unlock template — $14
              </button>
              <button
                @click="modalOpen = true; "
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 text-sm font-medium hover:border-zinc-500 hover:text-white transition-colors"
              >
                I already have a license key
              </button>
            </template>

            <!-- Free template -->
            <template v-else>
              <div class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Free — copy the code below
              </div>
            </template>
          </div>

        </div>
      </div>
    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>

    <!-- Pro modal -->
    <UiProModal
      v-if="template.chariowProductId"
      v-model="modalOpen"
      :product-id="template.chariowProductId"
      :name="template.name"
      :price="14"
      :redirect-path="`/templates/${template.id}`"
      @unlocked="modalOpen = false"
    />
  </div>
</template>
