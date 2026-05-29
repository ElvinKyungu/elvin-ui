<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const { public: { chariowShopUrl } } = useRuntimeConfig()
const BLOCKS_URL = `${chariowShopUrl}/elvin-ui`
const FULL_URL = `${chariowShopUrl}/elvin-ui-full-access`

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'All components, open source, no strings attached.',
    features: [
      '20+ UI components',
      'Nuxt 4 + TypeScript',
      'Full source code',
      'MIT License',
    ],
    missing: ['Blocks source code', 'Premium templates'],
    cta: 'Browse components',
    href: '/components',
    external: false,
    featured: false,
  },
  {
    name: 'Blocks Pack',
    price: '$39',
    period: 'one-time',
    desc: 'Source code for every UI block, GSAP included.',
    features: [
      'All 20+ blocks source code',
      'GSAP micro-interactions',
      'TailwindCSS — copy-paste',
      'Nuxt 4 ready',
      'Lifetime access',
    ],
    missing: ['Premium templates'],
    cta: 'Get Blocks Pack →',
    href: BLOCKS_URL,
    external: true,
    featured: false,
  },
  {
    name: 'Full Access',
    price: '$99',
    period: 'one-time',
    desc: 'Blocks + every premium template. Everything, forever.',
    features: [
      'All blocks source code',
      'All premium templates',
      'SaaS, Dashboard, E-commerce',
      'Marketing, Finance, Social',
      'Lifetime access + future content',
    ],
    missing: [],
    cta: 'Get Full Access →',
    href: FULL_URL,
    external: true,
    featured: true,
    badge: 'Most popular',
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = section.value?.querySelectorAll<HTMLElement>('.pricing-card')
  if (!cards?.length) return

  gsap.fromTo(
    cards,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: section.value, start: 'top 78%', once: true },
    },
  )
})
</script>

<template>
  <section ref="section" class="py-20 px-6">
    <div class="max-w-5xl mx-auto">

      <div class="text-center mb-14">
        <p class="text-xs text-accent font-medium tracking-widest uppercase mb-3">Pricing</p>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">
          Simple, transparent pricing.
        </h2>
        <p class="text-zinc-400 text-sm">One-time purchase. No subscriptions. Lifetime access.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-4 items-start">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
        >
          <div
            :class="plan.featured
              ? 'p-px rounded-2xl bg-gradient-to-b from-accent/60 to-accent/0'
              : ''
            "
          >
            <div
              :class="[
                'rounded-2xl p-6 flex flex-col gap-5',
                plan.featured
                  ? 'bg-zinc-900'
                  : 'border border-zinc-800 bg-zinc-900/40',
              ]"
            >
              <div v-if="plan.badge" class="inline-flex">
                <span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                  {{ plan.badge }}
                </span>
              </div>

              <div>
                <p class="text-sm font-medium text-zinc-400 mb-1">{{ plan.name }}</p>
                <div class="flex items-end gap-1.5 mb-2">
                  <span :class="['font-bold tracking-tight', plan.featured ? 'text-4xl text-white' : 'text-3xl text-white']">
                    {{ plan.price }}
                  </span>
                  <span v-if="plan.period" class="text-xs text-zinc-500 mb-1.5">{{ plan.period }}</span>
                </div>
                <p class="text-sm text-zinc-500">{{ plan.desc }}</p>
              </div>

              <a
                v-if="plan.external"
                :href="plan.href"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                  plan.featured
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'border border-zinc-700 text-white hover:bg-zinc-800',
                ]"
              >
                {{ plan.cta }}
              </a>
              <NuxtLink
                v-else
                :to="plan.href"
                :class="[
                  'w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                  'border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800',
                ]"
              >
                {{ plan.cta }}
              </NuxtLink>

              <ul class="space-y-2.5">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-center gap-2.5 text-sm text-zinc-300"
                >
                  <Icon name="lucide:check" class="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  {{ feature }}
                </li>
                <li
                  v-for="item in plan.missing"
                  :key="item"
                  class="flex items-center gap-2.5 text-sm text-zinc-600"
                >
                  <Icon name="lucide:minus" class="w-3.5 h-3.5 flex-shrink-0" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
