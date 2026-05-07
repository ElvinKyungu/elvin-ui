<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    desc: 'Perfect to explore and get started.',
    features: [
      '20+ copy-paste components',
      'Nuxt 4 + TypeScript ready',
      'MIT License',
      'Community Discord',
    ],
    missing: ['All blocks', 'Lifetime updates', 'Priority support'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'one-time',
    desc: 'Everything you need to ship fast.',
    features: [
      '60+ components + all blocks',
      'GSAP micro-interactions',
      'Lifetime updates',
      'Discord priority access',
      'New components monthly',
    ],
    missing: [],
    cta: 'Get Pro →',
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Team',
    price: '$149',
    period: 'one-time',
    desc: 'For teams building at scale.',
    features: [
      'Everything in Pro',
      'Team license · 5 devs',
      'Custom component requests',
      'Priority email support',
      '1-on-1 setup call',
    ],
    missing: [],
    cta: 'Contact us',
    featured: false,
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
        <p class="text-xs text-emerald-400 font-medium tracking-widest uppercase mb-3">Pricing</p>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">
          Simple, transparent pricing.
        </h2>
        <p class="text-zinc-400 text-sm">Start free. Upgrade when you need more.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-4 items-start">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
        >
          <!-- Featured card has gradient border -->
          <div
            :class="plan.featured
              ? 'p-px rounded-2xl bg-gradient-to-b from-emerald-500/60 to-emerald-500/0'
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
              <!-- Badge -->
              <div v-if="plan.badge" class="inline-flex">
                <span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  {{ plan.badge }}
                </span>
              </div>

              <!-- Header -->
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

              <!-- CTA -->
              <UiButton
                :variant="plan.featured ? 'primary' : 'ghost'"
                class="w-full justify-center"
              >
                {{ plan.cta }}
              </UiButton>

              <!-- Features -->
              <ul class="space-y-2.5">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-center gap-2.5 text-sm text-zinc-300"
                >
                  <Icon name="lucide:check" class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
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
