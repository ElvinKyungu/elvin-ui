<script setup lang="ts">
const { public: { siteUrl, chariowShopUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Pricing — Elvin UI',
  description: 'One-time purchase. Lifetime access to all Elvin UI blocks and templates.',
  ogTitle: 'Pricing — Elvin UI',
  ogImage: `${siteUrl}/og.png`,
})

const BLOCKS_URL = `${chariowShopUrl}/elvin-ui`
const FULL_URL = `${chariowShopUrl}/elvin-ui-full-access`

const blocksFeatures = [
  'All 20+ blocks source code',
  'GSAP micro-interactions',
  'TailwindCSS only — no custom CSS',
  'Nuxt 4 copy-paste ready',
  'New blocks added regularly',
  'Lifetime access',
]

const fullFeatures = [
  'Everything in Blocks Pack',
  'All premium page templates',
  'SaaS, Dashboard, E-commerce',
  'Marketing, Finance, Social',
  'All future templates included',
  'Lifetime access',
]

const faq = [
  {
    q: 'What is a "one-time purchase"?',
    a: 'You pay once and get lifetime access to everything included in your plan — no subscriptions, no recurring fees.',
  },
  {
    q: 'What does "copy-paste ready" mean?',
    a: 'Every component and template is a standalone .vue file. Copy it into any Nuxt 4 project, install TailwindCSS and GSAP, and it works immediately.',
  },
  {
    q: 'How do I access my purchase after buying?',
    a: 'Chariow will send a license key to your email. Use that key at elvin-ui.com/login to unlock your access.',
  },
  {
    q: 'Do future blocks/templates cost extra?',
    a: 'No. New content added to your plan is included at no extra charge.',
  },
  {
    q: 'What if I need both blocks and templates?',
    a: 'Full Access includes everything — blocks source code and all premium templates.',
  },
]

const openFaq = ref<number | null>(null)
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff08_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-5%,rgba(66,184,131,0.07),transparent)]" />
    </div>

    <BlocksNavBar />

    <div class="pt-24 pb-32 px-6 relative z-10">

      <!-- Hero -->
      <div class="max-w-2xl mx-auto text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wide uppercase mb-6">
          One-time purchase
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Unlock Elvin UI
        </h1>
        <p class="text-base text-zinc-400 leading-relaxed max-w-lg mx-auto">
          Premium Nuxt 4 components and templates. Pay once, use forever.
        </p>
      </div>

      <!-- Pricing cards -->
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">

        <!-- Blocks Pack -->
        <div class="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-1">
              <svg class="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-white">Blocks Pack</h2>
            <p class="text-sm text-zinc-500">Source code for all UI blocks</p>
          </div>

          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-bold text-white">$39</span>
            <span class="text-sm text-zinc-500">one-time</span>
          </div>

          <ul class="flex flex-col gap-2.5 flex-1">
            <li
              v-for="feature in blocksFeatures"
              :key="feature"
              class="flex items-center gap-2.5 text-sm text-zinc-400"
            >
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ feature }}
            </li>
          </ul>

          <a
            :href="BLOCKS_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-700 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
          >
            Get Blocks Pack
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="15 3 21 3 21 9" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="10" y1="14" x2="21" y2="3" stroke-linecap="round" />
            </svg>
          </a>
        </div>

        <!-- Full Access (featured) -->
        <div class="relative bg-zinc-900 border border-accent/30 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(66,184,131,0.07)]">
          <div class="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/20">
            Most popular
          </div>
          <div class="flex flex-col gap-2">
            <div class="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-1">
              <svg class="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-white">Full Access</h2>
            <p class="text-sm text-zinc-500">Blocks + all premium templates</p>
          </div>

          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-bold text-white">$99</span>
            <span class="text-sm text-zinc-500">one-time</span>
          </div>

          <ul class="flex flex-col gap-2.5 flex-1">
            <li
              v-for="feature in fullFeatures"
              :key="feature"
              class="flex items-center gap-2.5 text-sm text-zinc-400"
            >
              <svg class="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ feature }}
            </li>
          </ul>

          <a
            :href="FULL_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-colors"
          >
            Get Full Access
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="15 3 21 3 21 9" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="10" y1="14" x2="21" y2="3" stroke-linecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Already purchased -->
      <div class="max-w-4xl mx-auto text-center mb-20">
        <p class="text-sm text-zinc-500">
          Already purchased?
          <NuxtLink to="/login" class="text-zinc-300 hover:text-white transition-colors underline underline-offset-2 ml-1">
            Enter your license key →
          </NuxtLink>
        </p>
      </div>

      <!-- FAQ -->
      <div class="max-w-2xl mx-auto">
        <h2 class="text-xl font-bold text-white text-center mb-8">Frequently asked questions</h2>
        <div class="flex flex-col divide-y divide-zinc-800/60">
          <div
            v-for="(item, i) in faq"
            :key="i"
            class="py-4"
          >
            <button
              @click="openFaq = openFaq === i ? null : i"
              class="w-full flex items-center justify-between gap-4 text-left"
            >
              <span class="text-sm font-medium text-zinc-200">{{ item.q }}</span>
              <svg
                :class="['w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200', openFaq === i ? 'rotate-180' : '']"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              >
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              leave-active-class="transition-all duration-150 ease-in"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <p v-if="openFaq === i" class="text-sm text-zinc-500 leading-relaxed mt-3">
                {{ item.a }}
              </p>
            </Transition>
          </div>
        </div>
      </div>

    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>
  </div>
</template>
