<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')
const annual = ref(false)

const plans = [
  {
    name: 'Free',
    desc: 'Perfect for side projects',
    monthly: 0,
    annually: 0,
    cta: 'Get started',
    ctaVariant: 'ghost',
    features: ['10 components', 'Community blocks', 'MIT license', 'Discord access'],
    featured: false,
  },
  {
    name: 'Pro',
    desc: 'For teams shipping fast',
    monthly: 29,
    annually: 19,
    cta: 'Start free trial',
    ctaVariant: 'primary',
    features: ['Unlimited components', 'Premium blocks', 'Premium templates', 'Figma files', 'Priority support', 'Early access'],
    featured: true,
  },
  {
    name: 'Team',
    desc: 'Scale across your org',
    monthly: 79,
    annually: 59,
    cta: 'Contact sales',
    ctaVariant: 'ghost',
    features: ['Everything in Pro', 'Unlimited seats', 'Custom components', 'White-label', 'SLA guarantee', 'Dedicated support'],
    featured: false,
  },
]

const displayPrice = computed(() => (plan: typeof plans[0]) =>
  annual.value ? plan.annually : plan.monthly,
)

function togglePlan(value: boolean) {
  annual.value = value
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = section.value?.querySelectorAll<HTMLElement>('.price-card')
  if (cards?.length) {
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top bottom', once: true },
      },
    )
  }
})

watch(annual, () => {
  const prices = section.value?.querySelectorAll<HTMLElement>('.price-amount')
  if (prices?.length) {
    gsap.fromTo(prices, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' })
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-5xl 2xl:max-w-[80rem] mx-auto flex flex-col gap-12">

      <!-- Header -->
      <div class="flex flex-col gap-4 text-center">
        <div class="flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Pricing</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Simple, transparent pricing</h2>
        <p class="text-sm text-zinc-500 max-w-md mx-auto">Start for free. Upgrade when you need more. Cancel anytime.</p>

        <!-- Toggle -->
        <div class="flex items-center justify-center gap-3 mt-2">
          <button @click="togglePlan(false)" class="text-sm transition-colors" :class="!annual ? 'text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'">Monthly</button>
          <button
            @click="togglePlan(!annual)"
            class="relative w-10 h-5.5 rounded-full border transition-all duration-200 flex items-center"
            :class="annual ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-zinc-800 border-zinc-700'"
            style="height: 22px;"
          >
            <span
              class="absolute w-3.5 h-3.5 rounded-full transition-all duration-200 shadow-sm"
              :class="annual ? 'translate-x-5 bg-emerald-400' : 'translate-x-0.5 bg-zinc-400'"
            />
          </button>
          <button @click="togglePlan(true)" class="text-sm transition-colors flex items-center gap-2" :class="annual ? 'text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'">
            Annually
            <span class="text-[10px] px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold">-35%</span>
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="price-card relative flex flex-col gap-6 p-6 rounded-2xl border transition-all duration-300"
          :class="plan.featured
            ? 'bg-zinc-900/60 border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.1)]'
            : 'bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700/60'"
        >
          <!-- Featured badge -->
          <div v-if="plan.featured" class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-indigo-500 text-white rounded-full">Most popular</span>
          </div>

          <!-- Plan header -->
          <div class="flex flex-col gap-1">
            <p class="text-sm font-bold text-white">{{ plan.name }}</p>
            <p class="text-xs text-zinc-500">{{ plan.desc }}</p>
          </div>

          <!-- Price -->
          <div class="flex items-end gap-1">
            <span class="text-xs text-zinc-500 mb-1">$</span>
            <span class="price-amount text-4xl font-black text-white tabular-nums">{{ displayPrice(plan) }}</span>
            <span class="text-xs text-zinc-500 mb-1.5">/mo</span>
          </div>

          <!-- CTA -->
          <button
            class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
            :class="plan.featured
              ? 'bg-indigo-500 hover:bg-indigo-400 text-white'
              : 'border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white'"
          >{{ plan.cta }}</button>

          <!-- Features -->
          <div class="flex flex-col gap-2.5 pt-2 border-t border-zinc-800/60">
            <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-2.5">
              <svg class="w-3.5 h-3.5 flex-shrink-0" :class="plan.featured ? 'text-indigo-400' : 'text-zinc-600'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m20 6-11 11-5-5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="text-xs text-zinc-400">{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
