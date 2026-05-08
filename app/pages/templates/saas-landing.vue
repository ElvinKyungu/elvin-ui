<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Nav state ─────────────────────────────────────────────────────────────────
const mobileMenuOpen = ref(false)
const showNotifs     = ref(false)
const notifRef       = useTemplateRef<HTMLElement>('notifRef')

// ─── Modal state ───────────────────────────────────────────────────────────────
const showOnboarding  = ref(false)
const onboardStep     = ref(1)
const showUpgrade     = ref(false)
const selectedPlan    = ref<'pro' | 'enterprise'>('pro')

// ─── Onboarding form ──────────────────────────────────────────────────────────
const onboardName     = ref('')
const onboardEmail    = ref('')
const onboardPassword = ref('')
const teamSize        = ref<string>('')
const buildGoals      = ref<string[]>([])

function openOnboarding() {
  showOnboarding.value = true
  onboardStep.value = 1
  mobileMenuOpen.value = false
}

function nextStep() {
  if (onboardStep.value < 3) onboardStep.value++
}

function prevStep() {
  if (onboardStep.value > 1) onboardStep.value--
}

function closeOnboarding() {
  showOnboarding.value = false
}

function toggleBuildGoal(g: string) {
  const idx = buildGoals.value.indexOf(g)
  if (idx === -1) buildGoals.value.push(g)
  else buildGoals.value.splice(idx, 1)
}

function openUpgrade(plan: 'pro' | 'enterprise') {
  selectedPlan.value = plan
  showUpgrade.value = true
}

// ─── Close notifs on outside click ────────────────────────────────────────────
function handleOutsideClick(e: MouseEvent) {
  if (notifRef.value && !notifRef.value.contains(e.target as Node)) {
    showNotifs.value = false
  }
}

// ─── Stats counters ────────────────────────────────────────────────────────────
const statsCounter = reactive({ components: 0, developers: 0, rating: 0 })

const stats = computed(() => [
  { label: 'Components', value: `${Math.round(statsCounter.components)}+`,  suffix: '' },
  { label: 'Developers', value: `${Math.round(statsCounter.developers)}k+`, suffix: '' },
  { label: 'Rating',     value: `${statsCounter.rating.toFixed(1)}★`,       suffix: '' },
  { label: 'Source',     value: 'Open',                                      suffix: '' },
])

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    title: 'Copy & Paste Ready',
    description: 'Every component ships with full source code. Zero config, zero setup—just paste and go.',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6',
  },
  {
    title: 'Dark Mode First',
    description: 'Every component is designed and tested in dark mode first. Light mode adapters included.',
    icon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  },
  {
    title: 'GSAP Micro-interactions',
    description: 'Premium hover, enter and exit animations baked into every component out of the box.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'TypeScript Strict',
    description: 'Full TypeScript support with strict mode enabled. Typed props, emits and composables.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Nuxt 4 Native',
    description: 'Built for Nuxt 4 from day one. Auto-imports, SSR-safe, and follows every convention.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    title: 'Production Ready',
    description: 'Battle-tested in real products. Accessible, responsive and performant by default.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Elvin UI cut our design-to-code time in half. The components are gorgeous and everything just works in Nuxt 4 without any tweaking.",
    name: 'Sofia Andersson',
    role: 'Senior Engineer',
    company: 'Stripe',
    grad: 'from-violet-500 to-indigo-600',
    initials: 'SA',
  },
  {
    quote: "I've tried every Tailwind component library. Elvin UI is the first one that actually feels premium—the GSAP animations are chef's kiss.",
    name: 'Marcus Chen',
    role: 'Staff Frontend Engineer',
    company: 'Linear',
    grad: 'from-emerald-500 to-teal-600',
    initials: 'MC',
  },
  {
    quote: "We shipped our SaaS landing page in two days using Elvin UI blocks. Would have taken two weeks otherwise. Absolute game changer.",
    name: 'Priya Nambiar',
    role: 'Founding Engineer',
    company: 'Resend',
    grad: 'from-rose-500 to-pink-600',
    initials: 'PN',
  },
]

// ─── Notifications ────────────────────────────────────────────────────────────
const notifications = [
  { icon: '🎉', title: 'New: TableAdvanced component released', time: '2 min ago',  unread: true  },
  { icon: '📦', title: 'v2.1.0 update — 12 new blocks added',  time: '1 hr ago',   unread: true  },
  { icon: '💬', title: 'Reply to your issue #241',              time: '3 hrs ago',  unread: false },
  { icon: '⭐', title: 'You reached 50 GitHub stars',           time: 'Yesterday',  unread: false },
]

// ─── Refs for GSAP ────────────────────────────────────────────────────────────
const heroCard = useTemplateRef<HTMLElement>('heroCard')

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  document.addEventListener('click', handleOutsideClick)

  // Hero badge
  gsap.from('.hero-badge', { y: -10, opacity: 0, duration: 0.5, ease: 'power2.out' })

  // Hero words stagger
  gsap.from('.hero-word', { y: 20, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', delay: 0.1 })

  // Hero sub + CTAs
  gsap.from('.hero-sub',  { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 })
  gsap.from('.hero-cta',  { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.65 })
  gsap.from('.hero-trust',{ y: 10, opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.8  })

  // Hero card entry + float loop
  if (heroCard.value) {
    gsap.from(heroCard.value, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4, onComplete: () => {
      gsap.to(heroCard.value!, { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }})
  }

  // Stats counters (triggered on scroll into view)
  ScrollTrigger.create({
    trigger: '.stats-bar',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(statsCounter, { components: 200, developers: 12, rating: 4.9, duration: 1.5, ease: 'power2.out', delay: 0.3 })
    },
  })

  // Features scroll
  gsap.from('.saas-feature-card', {
    y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.features-section', start: 'top 75%', once: true },
  })

  // Feature card hover
  document.querySelectorAll<HTMLElement>('.saas-feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -4, duration: 0.2, ease: 'power2.out' }))
    el.addEventListener('mouseleave', () => gsap.to(el, { y:  0, duration: 0.2, ease: 'power2.out' }))
  })

  // Bento grid scroll
  gsap.from('.bento-cell', {
    y: 40, opacity: 0, rotate: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.bento-section', start: 'top 75%', once: true },
  })

  // Testimonials scroll
  gsap.from('.testimonial-card', {
    y: 40, opacity: 0, duration: 0.6, stagger: 0.13, ease: 'power3.out',
    scrollTrigger: { trigger: '.testimonials-section', start: 'top 75%', once: true },
  })

  // Pricing scroll
  gsap.from('.pricing-card', {
    y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.pricing-section', start: 'top 75%', once: true },
  })

  // CTA banner
  gsap.from('.cta-banner-text', {
    y: 25, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%', once: true },
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  gsap.killTweensOf(['.hero-badge','.hero-word','.hero-sub','.hero-cta','.hero-trust','.saas-feature-card','.bento-cell','.testimonial-card','.pricing-card','.cta-banner-text', statsCounter])
  if (heroCard.value) gsap.killTweensOf(heroCard.value)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="min-h-screen text-white overflow-x-hidden" style="background:#080808;font-family:Inter,system-ui,sans-serif">

    <!-- ─── Nav ──────────────────────────────────────────────────────────────── -->
    <nav class="sticky top-0 z-30 h-16 flex items-center border-b border-zinc-800/60 backdrop-blur-xl" style="background:rgba(8,8,8,0.85)">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6">

        <!-- Logo -->
        <div class="flex items-center gap-2.5 shrink-0">
          <div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="text-base font-bold text-white tracking-tight">ElvinUI</span>
        </div>

        <!-- Desktop links -->
        <div class="hidden md:flex items-center gap-1 flex-1">
          <a v-for="link in ['Features','Pricing','Docs','Blog']" :key="link"
            href="#"
            class="px-3.5 py-1.5 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
          >{{ link }}</a>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-2 ml-auto">
          <!-- Bell + notif dropdown -->
          <div class="relative" ref="notifRef">
            <button
              class="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors relative"
              @click.stop="showNotifs = !showNotifs"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round"/>
              </svg>
              <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>

            <!-- Notif dropdown -->
            <Transition name="notif-drop">
              <div v-if="showNotifs" class="absolute top-12 right-0 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm font-bold text-white">Notifications</p>
                  <span class="text-xs text-emerald-400 font-semibold">2 unread</span>
                </div>
                <div class="flex flex-col gap-1">
                  <div v-for="(n, i) in notifications" :key="i"
                    class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-800/60 cursor-pointer transition-colors group"
                  >
                    <span class="text-base shrink-0 mt-0.5">{{ n.icon }}</span>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors leading-snug">{{ n.title }}</p>
                      <p class="text-[10px] text-zinc-600 mt-1">{{ n.time }}</p>
                    </div>
                    <span v-if="n.unread" class="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <button
            class="hidden sm:block border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-xl px-5 py-2 text-sm transition-colors"
          >Sign in</button>

          <button
            class="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-5 py-2 text-sm transition-colors"
            @click="openOnboarding"
          >Get started</button>

          <!-- Mobile hamburger -->
          <button
            class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <line x1="3" y1="6"  x2="21" y2="6"  stroke-linecap="round"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu slide-down -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="absolute top-16 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/60 px-4 py-4 flex flex-col gap-1 md:hidden shadow-2xl">
          <a v-for="link in ['Features','Pricing','Docs','Blog']" :key="link"
            href="#"
            class="px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-colors"
            @click="mobileMenuOpen = false"
          >{{ link }}</a>
          <div class="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800/60">
            <button class="flex-1 border border-zinc-700 text-zinc-300 rounded-xl px-5 py-2 text-sm transition-colors hover:border-zinc-500 hover:text-white">Sign in</button>
            <button class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-5 py-2 text-sm transition-colors" @click="openOnboarding">Get started</button>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
    <section class="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center gap-16">

        <!-- Left copy -->
        <div class="flex-1 flex flex-col items-start">
          <!-- Badge -->
          <div class="hero-badge inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New: 23 blocks & templates just dropped
          </div>

          <!-- H1 -->
          <h1 class="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span class="hero-word inline-block">Ship</span>&nbsp;
            <span class="hero-word inline-block">beautiful</span>
            <br/>
            <span class="hero-word inline-block">UI</span>&nbsp;
            <span class="hero-word inline-block text-emerald-400">—</span>&nbsp;
            <span class="hero-word inline-block">fast.</span>
          </h1>

          <!-- Subtext -->
          <p class="hero-sub text-zinc-400 text-lg max-w-lg leading-relaxed mb-8">
            200+ copy-paste Nuxt 4 components, blocks and templates. Production-ready, beautifully designed, GSAP animated.
          </p>

          <!-- CTAs -->
          <div class="hero-cta flex items-center gap-3 flex-wrap mb-8">
            <button
              class="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              @click="openOnboarding"
            >Start building free →</button>
            <button class="border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-xl px-6 py-3 text-sm transition-colors">
              View components
            </button>
          </div>

          <!-- Trust bar -->
          <div class="hero-trust flex items-center gap-3">
            <div class="flex -space-x-2">
              <div v-for="(grad, i) in ['from-emerald-500 to-teal-600','from-violet-500 to-indigo-600','from-rose-500 to-pink-600','from-amber-500 to-orange-600','from-blue-500 to-cyan-600']" :key="i"
                :class="`w-7 h-7 rounded-full bg-gradient-to-br ${grad} ring-2 ring-zinc-950 flex items-center justify-center text-[9px] font-bold text-white`"
              >{{ ['S','M','A','R','J'][i] }}</div>
            </div>
            <p class="text-sm text-zinc-400">
              Trusted by <span class="text-white font-semibold">12,000+</span> developers
            </p>
          </div>
        </div>

        <!-- Right: floating hero card -->
        <div class="flex-1 flex justify-center lg:justify-end w-full">
          <div ref="heroCard" class="relative w-full max-w-sm">
            <!-- Glow -->
            <div class="absolute -inset-6 bg-emerald-500/10 rounded-3xl blur-3xl pointer-events-none" />

            <!-- Card -->
            <div class="relative bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
              <!-- Card header -->
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="text-xs text-zinc-500">Monthly revenue</p>
                  <p class="text-2xl font-black text-white mt-0.5">$48,291</p>
                </div>
                <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">+18.2%</span>
              </div>

              <!-- Mini chart bars -->
              <div class="flex items-end gap-1.5 h-14 mb-4">
                <div v-for="(h, i) in [35,55,42,70,58,85,65,90,75,100,88,95]" :key="i"
                  class="flex-1 rounded-sm"
                  :style="`height:${h}%; background: ${i >= 10 ? '#42b883' : 'rgba(66,184,131,0.25)'}`"
                />
              </div>

              <!-- Stats row -->
              <div class="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/60">
                <div v-for="s in [{ label:'Users', val:'12.4k' },{ label:'Churn', val:'1.2%' },{ label:'MRR', val:'$48k' }]" :key="s.label">
                  <p class="text-[10px] text-zinc-600">{{ s.label }}</p>
                  <p class="text-sm font-bold text-white mt-0.5">{{ s.val }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── Stats bar ────────────────────────────────────────────────────────── -->
    <section class="stats-bar border-y border-zinc-800/50 py-10 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="s in stats" :key="s.label" class="flex flex-col items-center text-center">
          <p class="text-3xl md:text-4xl font-black text-white tabular-nums">{{ s.value }}</p>
          <p class="text-sm text-zinc-500 mt-1.5">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- ─── Features ─────────────────────────────────────────────────────────── -->
    <section class="features-section py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-14">
          <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Features</p>
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">Everything you need to build fast</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="f in features" :key="f.title"
            class="saas-feature-card group relative p-6 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl cursor-default overflow-hidden transition-colors hover:border-zinc-700/60"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 transition-all duration-300 rounded-2xl pointer-events-none" />
            <div class="relative">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="f.icon"/>
                </svg>
              </div>
              <h3 class="text-base font-bold text-white mb-2">{{ f.title }}</h3>
              <p class="text-sm text-zinc-400 leading-relaxed">{{ f.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── Bento grid ───────────────────────────────────────────────────────── -->
    <section class="bento-section py-24 px-4 sm:px-6" style="background:rgba(24,24,27,0.2)">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-14">
          <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Showcase</p>
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">See what's possible</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">

          <!-- Cell 1 — spans 2 cols -->
          <div class="bento-cell md:col-span-2 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5 overflow-hidden relative group">
            <p class="text-xs font-semibold text-zinc-500 mb-3">Component Library</p>
            <div class="flex flex-wrap gap-2">
              <div v-for="c in ['Button','Input','Badge','Card','Modal','Alert','Select','Table','Toast','Avatar','Tabs','Toggle','Dropdown','Tooltip','Progress']" :key="c"
                class="px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-xs text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors cursor-pointer"
              >{{ c }}</div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950/60 to-transparent pointer-events-none rounded-b-2xl" />
          </div>

          <!-- Cell 2 — 1 col tall -->
          <div class="bento-cell bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between">
            <p class="text-xs font-semibold text-zinc-500">TypeScript</p>
            <div class="font-mono text-xs space-y-1 text-zinc-400">
              <p><span class="text-violet-400">interface</span> <span class="text-blue-400">Props</span> <span class="text-zinc-500">&#123;</span></p>
              <p class="pl-4"><span class="text-emerald-400">variant</span><span class="text-zinc-500">?:</span> <span class="text-amber-400">'primary'</span></p>
              <p class="pl-4"><span class="text-emerald-400">size</span><span class="text-zinc-500">?:</span> <span class="text-amber-400">'md'</span></p>
              <p><span class="text-zinc-500">&#125;</span></p>
            </div>
          </div>

          <!-- Cell 3 — 1 col -->
          <div class="bento-cell bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between">
            <p class="text-xs font-semibold text-zinc-500">GSAP Animations</p>
            <div class="space-y-2">
              <div v-for="a in ['Hover lift','Stagger in','Float loop','Scroll reveal']" :key="a"
                class="flex items-center gap-2 text-xs text-zinc-400"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {{ a }}
              </div>
            </div>
          </div>

          <!-- Cell 4 — spans 2 cols -->
          <div class="bento-cell md:col-span-2 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5 relative overflow-hidden">
            <p class="text-xs font-semibold text-zinc-500 mb-3">Nuxt 4 ready</p>
            <div class="flex gap-3 flex-wrap">
              <div v-for="tag in ['SSR Safe','Auto-imports','Composables','definePageMeta','useTemplateRef','<script setup>']" :key="tag"
                class="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg"
              >{{ tag }}</div>
            </div>
            <div class="absolute right-5 bottom-5 w-24 h-24 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center">
              <svg class="w-10 h-10 text-emerald-500/40" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── Testimonials ─────────────────────────────────────────────────────── -->
    <section class="testimonials-section py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-14">
          <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Testimonials</p>
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">Loved by developers worldwide</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="t in testimonials" :key="t.name"
            class="testimonial-card relative p-6 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl flex flex-col gap-4"
          >
            <svg class="w-6 h-6 text-emerald-500/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p class="text-sm text-zinc-300 leading-relaxed flex-1">{{ t.quote }}</p>
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-xs font-bold text-white shrink-0`">
                {{ t.initials }}
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ t.name }}</p>
                <p class="text-xs text-zinc-500">{{ t.role }} at {{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── Pricing teaser ───────────────────────────────────────────────────── -->
    <section class="pricing-section py-24 px-4 sm:px-6" style="background:rgba(24,24,27,0.2)">
      <div class="max-w-5xl mx-auto">

        <div class="text-center mb-14">
          <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">Simple pricing</h2>
          <p class="text-zinc-400 mt-4 text-base">No hidden fees. Cancel anytime.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <!-- Free -->
          <div class="pricing-card p-6 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl flex flex-col gap-5">
            <div>
              <p class="text-sm font-bold text-white mb-1">Free</p>
              <p class="text-3xl font-black text-white">$0<span class="text-base text-zinc-500 font-normal">/mo</span></p>
            </div>
            <ul class="flex flex-col gap-2.5 flex-1">
              <li v-for="f in ['50 components','Community support','Basic templates','GitHub access']" :key="f"
                class="flex items-center gap-2 text-sm text-zinc-400"
              >
                <svg class="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ f }}
              </li>
            </ul>
            <button class="w-full border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-xl px-5 py-2.5 text-sm transition-colors" @click="openOnboarding">
              Get started
            </button>
          </div>

          <!-- Pro — highlighted -->
          <div class="pricing-card relative p-6 bg-zinc-900/50 border border-emerald-500/30 rounded-2xl flex flex-col gap-5 shadow-xl shadow-emerald-500/10">
            <!-- Glow bg -->
            <div class="absolute inset-0 rounded-2xl bg-emerald-500/5 pointer-events-none" />
            <!-- Badge -->
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <span class="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30">Most Popular</span>
            </div>
            <div class="relative">
              <p class="text-sm font-bold text-white mb-1">Pro</p>
              <p class="text-3xl font-black text-white">$29<span class="text-base text-zinc-500 font-normal">/mo</span></p>
            </div>
            <ul class="relative flex flex-col gap-2.5 flex-1">
              <li v-for="f in ['All 200+ components','Priority support','All templates','New blocks weekly','Commercial license','Figma kit']" :key="f"
                class="flex items-center gap-2 text-sm text-zinc-300"
              >
                <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ f }}
              </li>
            </ul>
            <button class="relative w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors shadow-lg shadow-emerald-500/20" @click="openUpgrade('pro')">
              Upgrade to Pro
            </button>
          </div>

          <!-- Enterprise -->
          <div class="pricing-card p-6 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl flex flex-col gap-5">
            <div>
              <p class="text-sm font-bold text-white mb-1">Enterprise</p>
              <p class="text-3xl font-black text-white">Custom</p>
            </div>
            <ul class="flex flex-col gap-2.5 flex-1">
              <li v-for="f in ['Everything in Pro','Custom licensing','Dedicated support','SLA guarantee','Team onboarding','Private Slack']" :key="f"
                class="flex items-center gap-2 text-sm text-zinc-400"
              >
                <svg class="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ f }}
              </li>
            </ul>
            <button class="w-full border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-xl px-5 py-2.5 text-sm transition-colors" @click="openUpgrade('enterprise')">
              Contact sales
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── CTA banner ───────────────────────────────────────────────────────── -->
    <section class="cta-section py-24 px-4 sm:px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="cta-banner-text text-3xl md:text-5xl font-black text-white leading-tight mb-5">
          Ready to build something beautiful?
        </h2>
        <p class="cta-banner-text text-zinc-400 text-lg mb-8">
          Join 12,000+ developers shipping faster with Elvin UI.
        </p>
        <div class="cta-banner-text flex items-center justify-center gap-3 flex-wrap">
          <button
            class="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-7 py-3 text-base transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            @click="openOnboarding"
          >Get started free</button>
          <button class="border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-xl px-7 py-3 text-base transition-colors">
            View docs
          </button>
        </div>
      </div>
    </section>

    <!-- ─── Footer ───────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/50 py-14 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          <!-- Brand col -->
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <span class="text-sm font-bold text-white">ElvinUI</span>
            </div>
            <p class="text-xs text-zinc-500 leading-relaxed">Copy-paste Nuxt 4 components built for speed and quality.</p>
          </div>

          <!-- Link columns -->
          <div v-for="col in [
            { heading:'Product',   links:['Components','Templates','Blocks','Changelog'] },
            { heading:'Resources', links:['Docs','GitHub','Figma Kit','Examples'] },
            { heading:'Company',   links:['About','Blog','Careers','Press'] },
            { heading:'Community', links:['Discord','X / Twitter','Newsletter','Support'] },
          ]" :key="col.heading">
            <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">{{ col.heading }}</p>
            <ul class="space-y-2.5">
              <li v-for="link in col.links" :key="link">
                <a href="#" class="text-sm text-zinc-500 hover:text-white transition-colors">{{ link }}</a>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="border-t border-zinc-800/50 pt-6 flex items-center justify-between flex-wrap gap-4">
          <p class="text-xs text-zinc-600">© 2025 ElvinUI. All rights reserved.</p>
          <div class="flex items-center gap-3">
            <!-- GitHub -->
            <a href="#" class="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <!-- X / Twitter -->
            <a href="#" class="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <!-- Discord -->
            <a href="#" class="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>

    <!-- ─── Modal: Onboarding ─────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showOnboarding" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeOnboarding" />

        <!-- Box -->
        <div class="modal-box relative w-full max-w-md bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl p-6 z-10">

          <!-- Close -->
          <button class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors" @click="closeOnboarding">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Progress dots -->
          <div class="flex items-center justify-center gap-2 mb-6">
            <div v-for="s in [1,2,3]" :key="s"
              :class="['w-2 h-2 rounded-full transition-all duration-300', onboardStep >= s ? 'bg-emerald-500 scale-110' : 'bg-zinc-700']"
            />
          </div>

          <!-- Step 1 -->
          <div v-if="onboardStep === 1">
            <h3 class="text-lg font-bold text-white mb-1">Create your account</h3>
            <p class="text-sm text-zinc-400 mb-5">Start building beautiful UIs today.</p>
            <div class="flex flex-col gap-3">
              <input v-model="onboardName" type="text" placeholder="Full name"
                class="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm w-full focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-zinc-500" />
              <input v-model="onboardEmail" type="email" placeholder="Email address"
                class="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm w-full focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-zinc-500" />
              <input v-model="onboardPassword" type="password" placeholder="Password"
                class="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm w-full focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-zinc-500" />
            </div>
          </div>

          <!-- Step 2 -->
          <div v-else-if="onboardStep === 2">
            <h3 class="text-lg font-bold text-white mb-1">How big is your team?</h3>
            <p class="text-sm text-zinc-400 mb-5">We'll tailor your experience accordingly.</p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="size in ['Solo','2–10','11–50','50+']" :key="size"
                :class="['border rounded-xl p-4 cursor-pointer transition-all',
                  teamSize === size
                    ? 'border-emerald-500 bg-emerald-500/5 text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-emerald-500/50 hover:text-zinc-200']"
                @click="teamSize = size"
              >
                <p class="text-sm font-semibold">{{ size }}</p>
                <p class="text-xs text-zinc-500 mt-0.5">{{ { 'Solo':'Just me', '2–10':'Small team', '11–50':'Mid-size', '50+':'Large team' }[size] }}</p>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div v-else>
            <h3 class="text-lg font-bold text-white mb-1">What will you build?</h3>
            <p class="text-sm text-zinc-400 mb-5">Select all that apply.</p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="goal in ['SaaS','Dashboard','E-commerce','Portfolio']" :key="goal"
                :class="['border rounded-xl p-4 cursor-pointer transition-all',
                  buildGoals.includes(goal)
                    ? 'border-emerald-500 bg-emerald-500/5 text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-emerald-500/50 hover:text-zinc-200']"
                @click="toggleBuildGoal(goal)"
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold">{{ goal }}</p>
                  <div :class="['w-4 h-4 rounded border-2 flex items-center justify-center transition-all',
                    buildGoals.includes(goal) ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600']">
                    <svg v-if="buildGoals.includes(goal)" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 mt-6">
            <button v-if="onboardStep > 1"
              class="border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-xl px-5 py-2.5 text-sm transition-colors"
              @click="prevStep"
            >Back</button>
            <button
              :class="['flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors',
                onboardStep < 3
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white']"
              @click="onboardStep < 3 ? nextStep() : closeOnboarding()"
            >{{ onboardStep < 3 ? 'Continue →' : 'Start building →' }}</button>
          </div>

        </div>
      </div>
    </Transition>

    <!-- ─── Modal: Upgrade ───────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showUpgrade" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showUpgrade = false" />
        <div class="modal-box relative w-full max-w-sm bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl p-6 z-10">

          <button class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors" @click="showUpgrade = false">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>

          <h3 class="text-lg font-bold text-white mb-1">
            Upgrade to {{ selectedPlan === 'pro' ? 'Pro' : 'Enterprise' }}
          </h3>
          <p class="text-sm text-zinc-400 mb-5">
            {{ selectedPlan === 'pro'
              ? 'Get access to all 200+ components, templates, and priority support.'
              : 'Custom licensing, dedicated support and SLA for your team.' }}
          </p>

          <div class="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 mb-5">
            <p class="text-xs text-zinc-500 mb-1">{{ selectedPlan === 'pro' ? 'Pro plan' : 'Enterprise plan' }}</p>
            <p class="text-2xl font-black text-white">{{ selectedPlan === 'pro' ? '$29/mo' : 'Custom' }}</p>
          </div>

          <div class="flex flex-col gap-2.5">
            <input type="email" placeholder="Work email"
              class="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm w-full focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-zinc-500" />
            <button class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors shadow-lg shadow-emerald-500/20" @click="showUpgrade = false">
              {{ selectedPlan === 'pro' ? 'Upgrade now →' : 'Talk to sales →' }}
            </button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* Modal */
.modal-enter-active,
.modal-leave-active  { transition: opacity 0.2s ease; }
.modal-enter-from,
.modal-leave-to      { opacity: 0; }

.modal-enter-active .modal-box { transition: transform 0.2s ease, opacity 0.2s ease; }
.modal-enter-from .modal-box,
.modal-leave-to .modal-box     { transform: scale(0.95) translateY(10px); opacity: 0; }

/* Notif dropdown */
.notif-drop-enter-active,
.notif-drop-leave-active  { transition: opacity 0.15s ease, transform 0.15s ease; }
.notif-drop-enter-from,
.notif-drop-leave-to      { opacity: 0; transform: translateY(-6px) scale(0.97); }

/* Mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active  { transition: opacity 0.2s ease, transform 0.2s ease; }
.mobile-menu-enter-from,
.mobile-menu-leave-to      { opacity: 0; transform: translateY(-8px); }
</style>
