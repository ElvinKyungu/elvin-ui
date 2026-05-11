<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tier {
  name: string
  price: { monthly: number; yearly: number }
  description: string
  cta: string
  ctaAction: 'free' | 'upgrade' | 'sales'
  badge?: string
  features: string[]
  highlight: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const tiers: Tier[] = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for side projects and learning',
    cta: 'Start free',
    ctaAction: 'free',
    features: ['50 components', 'Basic blocks', 'Community support', 'MIT license', '—', '—'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 23 },
    description: 'For teams shipping production apps',
    cta: 'Get Pro',
    ctaAction: 'upgrade',
    badge: 'Most Popular',
    features: ['200+ components', 'All blocks & templates', 'Priority support', 'MIT license', 'New releases first', 'Private Discord'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 99, yearly: 79 },
    description: 'Unlimited seats, custom licensing',
    cta: 'Contact sales',
    ctaAction: 'sales',
    features: ['Everything in Pro', 'Unlimited seats', 'Custom license', 'SLA guarantee', 'Dedicated support', 'Custom components'],
    highlight: false,
  },
]

const comparisonRows = [
  { feature: 'Components', starter: '50', pro: '200+', enterprise: 'Unlimited' },
  { feature: 'UI Blocks', starter: 'Basic', pro: 'All', enterprise: 'All + Custom' },
  { feature: 'Templates', starter: false, pro: true, enterprise: true },
  { feature: 'Priority Support', starter: false, pro: true, enterprise: true },
  { feature: 'New Releases First', starter: false, pro: true, enterprise: true },
  { feature: 'Private Discord', starter: false, pro: true, enterprise: true },
  { feature: 'SLA Guarantee', starter: false, pro: false, enterprise: true },
  { feature: 'Custom Components', starter: false, pro: false, enterprise: true },
  { feature: 'Unlimited Seats', starter: false, pro: false, enterprise: true },
]

const faqs = [
  {
    q: 'Can I use Elvin UI in commercial projects?',
    a: 'Yes, absolutely. All tiers include the MIT license which allows you to use components in any project, commercial or personal, with no attribution required.',
  },
  {
    q: "What's included in the free tier?",
    a: "The free tier gives you access to 50 carefully crafted components, all basic UI blocks, and community support via GitHub. It's a great starting point for side projects.",
  },
  {
    q: 'Do you offer refunds?',
    a: "We offer a 14-day full refund guarantee, no questions asked. If you're not happy with your purchase, just reach out to our team and we'll process it immediately.",
  },
  {
    q: 'How do I get access to new components?',
    a: 'Pro and Enterprise users receive instant access to new components as soon as they are released. Free tier users receive them on a rolling basis, typically 30 days after release.',
  },
  {
    q: 'Is there a student discount?',
    a: "Yes! Students with a valid .edu email address receive 50% off the Pro plan. Send us an email at hello@elvinui.dev with proof of enrollment and we'll hook you up.",
  },
]

// ─── State ────────────────────────────────────────────────────────────────────
const billing = ref<'monthly' | 'yearly'>('monthly')
const showTable = ref(true)
const openFaq = ref<number | null>(null)
const showUpgrade = ref(false)
const showSales = ref(false)

// Upgrade form
const upgradeEmail = ref('')
const upgradeCard = ref('')
const upgradeExpiry = ref('')
const upgradeCvv = ref('')

// Sales form
const salesName = ref('')
const salesCompany = ref('')
const salesEmail = ref('')
const salesMessage = ref('')

// ─── Computed ─────────────────────────────────────────────────────────────────
const currentPrice = (tier: Tier) =>
  billing.value === 'monthly' ? tier.price.monthly : tier.price.yearly

// ─── GSAP refs ────────────────────────────────────────────────────────────────
const tableWrap = useTemplateRef<HTMLElement>('tableWrap')

// ─── Helpers ──────────────────────────────────────────────────────────────────
function handleCta(tier: Tier) {
  if (tier.ctaAction === 'free') return
  if (tier.ctaAction === 'upgrade') { showUpgrade.value = true; return }
  if (tier.ctaAction === 'sales') { showSales.value = true }
}

function isBoolFeature(val: string | boolean): val is boolean {
  return typeof val === 'boolean'
}

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Hero text
  gsap.from('.pricing-hero-title span', {
    y: 24,
    opacity: 0,
    stagger: 0.04,
    duration: 0.65,
    ease: 'power3.out',
    delay: 0.1,
  })
  gsap.from('.pricing-hero-sub', {
    y: 12,
    opacity: 0,
    duration: 0.55,
    ease: 'power2.out',
    delay: 0.4,
  })
  gsap.from('.billing-toggle', {
    y: 10,
    opacity: 0,
    duration: 0.45,
    ease: 'power2.out',
    delay: 0.55,
  })

  // Cards scroll
  gsap.from('.pricing-card', {
    y: 32,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.pricing-cards', start: 'top 80%' },
  })

  // Card hover
  document.querySelectorAll<HTMLElement>('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, { y: -4, scale: 1.01, duration: 0.25, ease: 'power2.out' })
    )
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' })
    )
  })

  // FAQ
  gsap.from('.faq-item', {
    y: 16,
    opacity: 0,
    stagger: 0.07,
    duration: 0.5,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
  })
})

onUnmounted(() => {
  gsap.killTweensOf('.pricing-hero-title span, .pricing-hero-sub, .billing-toggle, .pricing-card, .faq-item')
  ScrollTrigger.getAll().forEach(t => t.kill())
})

// ─── Billing toggle animation ─────────────────────────────────────────────────
function switchBilling(val: 'monthly' | 'yearly') {
  if (val === billing.value) return
  const nums = document.querySelectorAll<HTMLElement>('.price-num')
  gsap.to(nums, {
    y: -8,
    opacity: 0,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      billing.value = val
      nextTick(() => {
        gsap.from('.price-num', { y: 8, opacity: 0, duration: 0.2, ease: 'power2.out' })
      })
    },
  })
}

// ─── FAQ toggle ───────────────────────────────────────────────────────────────
function toggleFaq(i: number) {
  const isOpen = openFaq.value === i
  const chevrons = document.querySelectorAll<HTMLElement>('.faq-chevron')
  if (chevrons[i]) {
    gsap.to(chevrons[i], { rotation: isOpen ? 0 : 180, duration: 0.25, ease: 'power2.out' })
  }

  if (!isOpen && openFaq.value !== null && chevrons[openFaq.value]) {
    gsap.to(chevrons[openFaq.value], { rotation: 0, duration: 0.25, ease: 'power2.out' })
  }
  openFaq.value = isOpen ? null : i
}

// ─── Table toggle ─────────────────────────────────────────────────────────────
function toggleTable() {
  if (!tableWrap.value) { showTable.value = !showTable.value; return }
  if (showTable.value) {
    gsap.to(tableWrap.value, {
      height: 0,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => { showTable.value = false },
    })
  } else {
    showTable.value = true
    nextTick(() => {
      if (!tableWrap.value) return
      const h = tableWrap.value.scrollHeight
      gsap.fromTo(tableWrap.value, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'power2.out', onComplete: () => { if (tableWrap.value) tableWrap.value.style.height = 'auto' } })
    })
  }
}

// ─── Keyboard close ───────────────────────────────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    showUpgrade.value = false
    showSales.value = false
  }
}
onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <div class="min-h-screen bg-[#080808] text-white" style="font-family:Inter,system-ui,sans-serif">

    <!-- ─── Nav ─────────────────────────────────────────────────────────────── -->
    <header class="sticky top-0 z-40 h-14 flex items-center border-b border-zinc-800/60 bg-[#080808]/90 backdrop-blur-xl px-6">
      <div class="max-w-6xl mx-auto w-full flex items-center gap-8">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 shrink-0">
          <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="text-sm font-bold tracking-tight">ElvinUI</span>
        </a>

        <!-- Nav links -->
        <nav class="hidden md:flex items-center gap-6 flex-1">
          <a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
          <a href="#" class="text-sm text-emerald-400 font-medium">Pricing</a>
          <a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">Docs</a>
          <a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a>
        </nav>

        <!-- Right CTA -->
        <div class="flex items-center gap-2 ml-auto">
          <button class="hidden sm:inline-flex px-4 py-1.5 text-sm text-zinc-300 hover:text-white border border-zinc-700/60 rounded-lg hover:border-zinc-600 transition-all">Sign in</button>
          <button @click="showUpgrade = true" class="inline-flex px-4 py-1.5 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-all shadow-lg shadow-emerald-500/20">Get started</button>
        </div>
      </div>
    </header>

    <!-- ─── Hero ─────────────────────────────────────────────────────────────── -->
    <section class="pricing-hero py-20 text-center px-6">
      <div class="max-w-2xl mx-auto">
        <!-- Overline badge -->
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Pricing
        </span>

        <!-- H1 with per-word span for stagger -->
        <h1 class="pricing-hero-title text-5xl font-black leading-tight tracking-tight mb-4">
          <span class="inline-block">Simple,</span>
          <span class="inline-block">&nbsp;</span>
          <span class="inline-block">transparent</span>
          <span class="inline-block">&nbsp;</span>
          <span class="inline-block text-emerald-400">pricing</span>
        </h1>

        <p class="pricing-hero-sub text-zinc-400 text-lg leading-relaxed mb-10">
          Start free. Upgrade when you're ready.<br class="hidden sm:block" /> No hidden fees.
        </p>

        <!-- Billing toggle -->
        <div class="billing-toggle inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          <button
            @click="switchBilling('monthly')"
            :class="['px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200', billing === 'monthly' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300']"
          >Monthly</button>
          <button
            @click="switchBilling('yearly')"
            :class="['flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200', billing === 'yearly' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300']"
          >
            Yearly
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Save 20%</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ─── Pricing Cards ─────────────────────────────────────────────────────── -->
    <section class="pricing-cards px-6 pb-16">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          :class="[
            'pricing-card relative flex flex-col cursor-default',
            tier.highlight
              ? 'bg-zinc-900 border-2 border-emerald-500/50 rounded-2xl p-8 shadow-2xl shadow-emerald-500/5'
              : 'bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-8',
          ]"
        >
          <!-- Popular badge -->
          <span
            v-if="tier.badge"
            class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-emerald-500/30 whitespace-nowrap"
          >{{ tier.badge }}</span>

          <!-- Tier name & description -->
          <p class="text-base font-bold text-white mb-1">{{ tier.name }}</p>
          <p class="text-sm text-zinc-400 mb-6 leading-relaxed">{{ tier.description }}</p>

          <!-- Price -->
          <div class="flex items-end gap-1.5 mb-1">
            <span class="text-zinc-400 text-xl font-medium self-start mt-2">$</span>
            <span class="price-num text-5xl font-black text-white tabular-nums leading-none">{{ currentPrice(tier) }}</span>
            <span v-if="currentPrice(tier) > 0" class="text-zinc-400 text-base mb-1">/mo</span>
          </div>
          <p v-if="billing === 'yearly' && tier.price.yearly > 0" class="text-xs text-zinc-500 mb-6">
            Billed ${{ tier.price.yearly * 12 }}/year
          </p>
          <p v-else-if="tier.price.monthly === 0" class="text-xs text-zinc-500 mb-6">Free forever</p>
          <div v-else class="mb-6" />

          <!-- CTA button -->
          <button
            @click="handleCta(tier)"
            :class="[
              'w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-8',
              tier.highlight
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60',
            ]"
          >{{ tier.cta }}</button>

          <!-- Feature list -->
          <ul class="flex flex-col gap-3 mt-auto">
            <li
              v-for="(feat, fi) in tier.features"
              :key="fi"
              :class="['flex items-center gap-2.5 text-sm', feat === '—' ? 'text-zinc-600' : 'text-zinc-300']"
            >
              <span v-if="feat !== '—'" class="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span v-else class="w-4 h-4 flex items-center justify-center shrink-0 text-zinc-600">—</span>
              {{ feat === '—' ? 'Not included' : feat }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ─── Feature Comparison Table ─────────────────────────────────────────── -->
    <section class="px-6 pb-16">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-center mb-6">
          <button
            @click="toggleTable"
            class="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Compare all features
            <svg :class="['w-4 h-4 transition-transform', showTable ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>

        <div ref="tableWrap" :class="['overflow-hidden', !showTable ? 'hidden' : '']">
          <div class="overflow-x-auto rounded-2xl">
          <div class="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl overflow-hidden min-w-[560px]">
            <!-- Table header -->
            <div class="grid grid-cols-4 bg-zinc-900/80 border-b border-zinc-800/60">
              <div class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Feature</div>
              <div v-for="tier in tiers" :key="tier.name" class="px-6 py-4 text-sm font-bold text-center" :class="tier.highlight ? 'text-emerald-400' : 'text-white'">{{ tier.name }}</div>
            </div>
            <!-- Rows -->
            <div
              v-for="(row, ri) in comparisonRows"
              :key="ri"
              :class="['grid grid-cols-4 border-b border-zinc-800/40 last:border-0 hover:bg-zinc-800/20 transition-colors']"
            >
              <div class="px-6 py-4 text-sm text-zinc-300">{{ row.feature }}</div>
              <div
                v-for="(col, ci) in [row.starter, row.pro, row.enterprise]"
                :key="ci"
                class="px-6 py-4 flex items-center justify-center"
              >
                <template v-if="isBoolFeature(col)">
                  <span v-if="col" class="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <svg v-else class="w-4 h-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </template>
                <span v-else class="text-sm text-zinc-300 font-medium">{{ col }}</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FAQ ───────────────────────────────────────────────────────────────── -->
    <section class="py-20 px-6">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black mb-3">Frequently asked questions</h2>
          <p class="text-zinc-400">Everything you need to know about Elvin UI.</p>
        </div>

        <div class="faq-list flex flex-col gap-2">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq-item bg-zinc-900/50 border border-zinc-800/60 rounded-2xl overflow-hidden"
          >
            <button
              @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-zinc-800/20 transition-colors"
            >
              <span class="text-sm font-semibold text-white">{{ faq.q }}</span>
              <svg class="faq-chevron w-4 h-4 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === i" class="px-6 pb-5">
                <p class="text-sm text-zinc-400 leading-relaxed">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Bottom CTA ────────────────────────────────────────────────────────── -->
    <section class="py-16 px-6">
      <div class="max-w-2xl mx-auto text-center bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-12">
        <h2 class="text-2xl font-black mb-3">Have more questions?</h2>
        <p class="text-zinc-400 mb-8">Talk to our team — we're happy to help.</p>
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <button @click="showSales = true" class="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/60 text-sm font-semibold text-zinc-200 rounded-xl transition-all">Contact sales</button>
          <a href="#" class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-white rounded-xl transition-all shadow-lg shadow-emerald-500/20">View docs</a>
        </div>
      </div>
    </section>

    <!-- ─── Footer ────────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/60 px-6 py-10">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="text-sm font-bold text-white">ElvinUI</span>
          <span class="text-xs text-zinc-600 ml-1">© 2025</span>
        </div>
        <div class="flex items-center gap-6">
          <a href="#" class="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Privacy</a>
          <a href="#" class="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Terms</a>
          <a href="#" class="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Status</a>
          <a href="#" class="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>

    <!-- ─── Modal: Upgrade ────────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showUpgrade" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" @click.self="showUpgrade = false">
        <div class="modal-box bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-xl font-black text-white">Upgrade to Pro</h3>
              <p class="text-sm text-zinc-400 mt-1">You'll be billed ${{ billing === 'yearly' ? '23' : '29' }}/month. Cancel anytime.</p>
            </div>
            <button @click="showUpgrade = false" class="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors ml-4 shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Form -->
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Email address</label>
              <input v-model="upgradeEmail" type="email" placeholder="you@company.com" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Card number</label>
              <div class="relative">
                <input v-model="upgradeCard" type="text" placeholder="1234 5678 9012 3456" maxlength="19" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all pr-12" />
                <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Expiry</label>
                <input v-model="upgradeExpiry" type="text" placeholder="MM / YY" maxlength="7" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-zinc-400 mb-1.5">CVV</label>
                <input v-model="upgradeCvv" type="text" placeholder="123" maxlength="4" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>

            <button class="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 text-sm mt-1">Complete upgrade</button>

            <!-- Trust row -->
            <div class="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <svg class="w-3.5 h-3.5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Modal: Contact Sales ──────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showSales" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" @click.self="showSales = false">
        <div class="modal-box bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-xl font-black text-white">Talk to our team</h3>
              <p class="text-sm text-zinc-400 mt-1">We reply within 24 hours.</p>
            </div>
            <button @click="showSales = false" class="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors ml-4 shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Your name</label>
                <input v-model="salesName" type="text" placeholder="Alex Doe" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Company</label>
                <input v-model="salesCompany" type="text" placeholder="Acme Corp" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Email</label>
              <input v-model="salesEmail" type="email" placeholder="alex@acme.com" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Message</label>
              <textarea v-model="salesMessage" rows="4" placeholder="Tell us about your project and team size..." class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none" />
            </div>
            <button class="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 text-sm">Send message</button>
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
