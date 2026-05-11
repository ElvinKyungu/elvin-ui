<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── State ────────────────────────────────────────────────────────────────────
const mobileOpen   = ref(false)
const heroEmail    = ref('')
const heroSuccess  = ref(false)
const ctaEmail     = ref('')
const ctaSuccess   = ref(false)

function submitHero() {
  if (!heroEmail.value) return
  heroSuccess.value = true
  heroEmail.value = ''
}

function submitCta() {
  if (!ctaEmail.value) return
  ctaSuccess.value = true
  ctaEmail.value = ''
}

// ─── Magnetic CTA ─────────────────────────────────────────────────────────────
const ctaBtn = useTemplateRef<HTMLElement>('ctaBtn')

function onCtaMouseMove(e: MouseEvent) {
  if (!ctaBtn.value) return
  const rect = ctaBtn.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top  + rect.height / 2
  const dx = (e.clientX - cx) * 0.3
  const dy = (e.clientY - cy) * 0.3
  gsap.to(ctaBtn.value, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
}

function onCtaMouseLeave() {
  if (!ctaBtn.value) return
  gsap.to(ctaBtn.value, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    title: 'Real-time collaboration',
    desc: 'Work together without stepping on each other. Changes sync instantly across your entire team, with live cursors and presence indicators.',
    bullets: ['Live presence indicators', 'Conflict-free editing', 'Comment threads & reactions'],
    visual: 'collab',
  },
  {
    title: 'One-click deploy',
    desc: 'From commit to production in seconds. Connect your repo, push your code, and NOVA handles the rest. Zero config, zero downtime.',
    bullets: ['Atomic deployments', 'Instant rollbacks', 'Preview environments per branch'],
    visual: 'deploy',
  },
  {
    title: 'Built-in analytics',
    desc: 'Understand your users without third-party scripts. Track what matters, set goals, and watch your metrics grow — all from one dashboard.',
    bullets: ['Session replay & heatmaps', 'Custom event tracking', 'Funnel & retention analysis'],
    visual: 'analytics',
  },
]

const testimonials = [
  {
    quote: 'NOVA cut our deployment time from 45 minutes to under 60 seconds. The team was shocked. We\'ve never looked back.',
    name: 'Elara Voss',
    role: 'CTO',
    company: 'Luminary',
    initials: 'EV',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    quote: 'The real-time collaboration alone is worth it. Our design and engineering teams finally work in the same world.',
    name: 'Marcus Chen',
    role: 'Head of Product',
    company: 'Orbit',
    initials: 'MC',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote: 'We migrated 3 products to NOVA in a single weekend. The DX is genuinely unlike anything else on the market.',
    name: 'Sofia Laurent',
    role: 'Lead Engineer',
    company: 'Apex',
    initials: 'SL',
    gradient: 'from-emerald-500 to-teal-500',
  },
]

const pricingFree = ['Up to 3 projects', '1 team member', 'Community support', '5GB storage', '100 deploys/month']
const pricingPro  = ['Unlimited projects', 'Up to 20 members', 'Priority support', '100GB storage', 'Unlimited deploys', 'Advanced analytics', 'Custom domains', 'SSO & audit logs']

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Hero stagger
  const heroItems = document.querySelectorAll('.hero-item')
  gsap.fromTo(heroItems,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
  )

  // Floating mockup
  const mockup = document.querySelector('.hero-mockup') as HTMLElement
  if (mockup) {
    gsap.fromTo(mockup, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.5, ease: 'power3.out' })
    gsap.to(mockup, { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }

  // Section reveals
  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
    )
  })
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

    <!-- ─── Navbar ─────────────────────────────────────────────────────────── -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-1.5">
          <div class="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-zinc-900" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span class="text-base font-black tracking-tight">NOVA</span>
        </div>

        <div class="hidden md:flex items-center gap-7 text-sm text-zinc-400">
          <a href="#features"     class="hover:text-white transition-colors">Features</a>
          <a href="#pricing"      class="hover:text-white transition-colors">Pricing</a>
          <a href="#"             class="hover:text-white transition-colors">Docs</a>
          <a href="#"             class="hover:text-white transition-colors">Blog</a>
        </div>

        <button class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 rounded-full hover:opacity-90 transition-opacity">
          Sign up free
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150" leave-to-class="opacity-0">
        <div v-if="mobileOpen" class="md:hidden border-t border-zinc-800/60 px-6 py-4 flex flex-col gap-3 text-sm text-zinc-400">
          <a href="#features" @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Features</a>
          <a href="#pricing"  @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Pricing</a>
          <a href="#"         @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Docs</a>
          <a href="#"         @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Blog</a>
          <button class="mt-1 w-fit px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 rounded-full">Sign up free</button>
        </div>
      </Transition>
    </nav>

    <!-- ─── Hero ───────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_0.5px,transparent_0.5px),linear-gradient(to_bottom,#ffffff06_0.5px,transparent_0.5px)] bg-[size:60px_60px]" />
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left -->
        <div>
          <div class="hero-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now in public beta
          </div>
          <h1 class="hero-item text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Ship faster<br>
            <span class="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">than ever.</span>
          </h1>
          <p class="hero-item text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
            NOVA gives your team the tools to build, deploy, and iterate at the speed of thought.
            No config. No ops. Just ship.
          </p>

          <div class="hero-item">
            <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 scale-95">
              <div v-if="heroSuccess" class="flex items-center gap-2 text-emerald-400 font-medium py-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                You're on the list — we'll be in touch!
              </div>
              <form v-else @submit.prevent="submitHero" class="flex gap-2 max-w-sm">
                <input
                  v-model="heroEmail"
                  type="email"
                  placeholder="Enter your email"
                  required
                  class="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button type="submit" class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity flex-shrink-0">
                  Get started
                </button>
              </form>
            </Transition>
            <p class="text-xs text-zinc-600 mt-2">Free forever. No credit card required.</p>
          </div>
        </div>

        <!-- Right — floating mockup -->
        <div class="hero-mockup hidden lg:block">
          <div class="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-2xl">
            <!-- Mockup top bar -->
            <div class="flex items-center gap-1.5 mb-4">
              <div class="w-3 h-3 rounded-full bg-red-500/60" />
              <div class="w-3 h-3 rounded-full bg-amber-500/60" />
              <div class="w-3 h-3 rounded-full bg-emerald-500/60" />
              <div class="ml-3 flex-1 bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-500">app.nova.dev/dashboard</div>
            </div>
            <!-- Chart area -->
            <div class="bg-zinc-950 rounded-xl p-4 mb-3">
              <div class="flex items-end justify-between mb-2">
                <span class="text-xs font-semibold text-zinc-300">Active users</span>
                <span class="text-xs text-emerald-400 font-semibold">+24% ↑</span>
              </div>
              <!-- Sparkline bars -->
              <div class="flex items-end gap-1 h-16">
                <div v-for="(h, i) in [40,55,38,65,72,58,80,90,70,95,88,100]" :key="i"
                  class="flex-1 rounded-sm bg-gradient-to-t from-emerald-600/60 to-emerald-400/40"
                  :style="`height: ${h}%`" />
              </div>
            </div>
            <!-- Activity feed -->
            <div class="space-y-2">
              <div v-for="item in ['New deploy: production ✓','3 users joined today','Feature flag enabled']" :key="item"
                class="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 rounded-lg">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span class="text-xs text-zinc-400">{{ item }}</span>
              </div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -top-4 -right-4 px-3 py-1.5 bg-emerald-500 text-zinc-900 text-xs font-bold rounded-full shadow-lg">
              0.8s deploy ⚡
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Features ──────────────────────────────────────────────────────── -->
    <section id="features" class="py-28">
      <div class="max-w-6xl mx-auto px-6 space-y-24">
        <div v-for="(feature, i) in features" :key="feature.title" class="reveal grid lg:grid-cols-2 gap-14 items-center" :class="i % 2 === 1 ? 'lg:[direction:rtl]' : ''">
          <!-- Text -->
          <div :class="i % 2 === 1 ? '[direction:ltr]' : ''">
            <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">0{{ i + 1 }}</p>
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">{{ feature.title }}</h2>
            <p class="text-zinc-400 leading-relaxed mb-6">{{ feature.desc }}</p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in feature.bullets" :key="b" class="flex items-center gap-2.5 text-sm text-zinc-300">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ b }}
              </li>
            </ul>
            <a href="#" class="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Learn more
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <!-- Visual -->
          <div :class="i % 2 === 1 ? '[direction:ltr]' : ''" class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[240px] flex items-center justify-center">
            <!-- Collab visual -->
            <div v-if="feature.visual === 'collab'" class="w-full space-y-3">
              <div class="flex items-center gap-3 p-3 bg-zinc-800/60 rounded-xl">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">E</div>
                <div class="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden"><div class="w-4/5 h-full bg-violet-500/60 rounded-full" /></div>
                <span class="text-[10px] text-zinc-500">editing...</span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-zinc-800/60 rounded-xl">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold">M</div>
                <div class="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden"><div class="w-2/3 h-full bg-emerald-500/60 rounded-full" /></div>
                <span class="text-[10px] text-zinc-500">viewing</span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-zinc-800/60 rounded-xl">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold">S</div>
                <div class="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden"><div class="w-1/2 h-full bg-blue-500/60 rounded-full" /></div>
                <span class="text-[10px] text-emerald-400">live</span>
              </div>
            </div>
            <!-- Deploy visual -->
            <div v-else-if="feature.visual === 'deploy'" class="w-full">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span class="text-xs font-semibold text-zinc-300">Last deploy — 0.8s</span>
              </div>
              <div class="space-y-2">
                <div v-for="step in ['Build', 'Test', 'Deploy', 'Live']" :key="step" class="flex items-center gap-3 text-xs text-zinc-400">
                  <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  {{ step }}
                </div>
              </div>
              <div class="mt-4 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400 font-mono">
                ✓ Deployed to production
              </div>
            </div>
            <!-- Analytics visual -->
            <div v-else class="w-full space-y-3">
              <div class="grid grid-cols-3 gap-2">
                <div v-for="[label, val, color] in [['Users','4.2k','text-emerald-400'],['Sessions','12.8k','text-blue-400'],['Conversion','3.4%','text-violet-400']]"
                  :key="label"
                  class="bg-zinc-800/60 rounded-xl p-3 text-center">
                  <div :class="`text-base font-bold ${color}`">{{ val }}</div>
                  <div class="text-[10px] text-zinc-500 mt-0.5">{{ label }}</div>
                </div>
              </div>
              <div class="flex items-end gap-1 h-12 bg-zinc-800/40 rounded-xl p-2">
                <div v-for="(h, i) in [30,55,40,70,65,80,90]" :key="i"
                  class="flex-1 rounded-sm bg-gradient-to-t from-cyan-600/50 to-cyan-400/30"
                  :style="`height:${h}%`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Testimonials ──────────────────────────────────────────────────── -->
    <section class="py-24 bg-zinc-900/30">
      <div class="max-w-6xl mx-auto px-6">
        <div class="reveal text-center mb-14">
          <h2 class="text-4xl font-bold tracking-tight">Loved by builders</h2>
          <p class="text-zinc-400 mt-3">Don't take our word for it.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.name" class="reveal p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
            <p class="text-sm text-zinc-300 leading-relaxed mb-6">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div :class="`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold`">{{ t.initials }}</div>
              <div>
                <div class="text-sm font-semibold">{{ t.name }}</div>
                <div class="text-xs text-zinc-500">{{ t.role }}, {{ t.company }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Pricing teaser ────────────────────────────────────────────────── -->
    <section id="pricing" class="py-24">
      <div class="max-w-3xl mx-auto px-6">
        <div class="reveal text-center mb-14">
          <h2 class="text-4xl font-bold tracking-tight">Simple pricing</h2>
          <p class="text-zinc-400 mt-3">Start free. Scale when you're ready.</p>
        </div>
        <div class="reveal grid sm:grid-cols-2 gap-5">
          <!-- Free -->
          <div class="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col">
            <div class="mb-4">
              <h3 class="text-lg font-bold mb-1">Free</h3>
              <div class="text-3xl font-black">$0<span class="text-sm font-normal text-zinc-500">/mo</span></div>
            </div>
            <ul class="space-y-2.5 mb-8 flex-1">
              <li v-for="f in pricingFree" :key="f" class="flex items-center gap-2 text-sm text-zinc-400">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ f }}
              </li>
            </ul>
            <button class="w-full py-2.5 border border-zinc-700 rounded-xl text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
              Get started free
            </button>
          </div>
          <!-- Pro -->
          <div class="p-6 bg-gradient-to-b from-emerald-950/60 to-zinc-900 border border-emerald-500/30 rounded-2xl flex flex-col relative overflow-hidden">
            <div class="absolute top-3 right-3 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">Popular</div>
            <div class="mb-4">
              <h3 class="text-lg font-bold mb-1">Pro</h3>
              <div class="text-3xl font-black">$29<span class="text-sm font-normal text-zinc-500">/mo</span></div>
            </div>
            <ul class="space-y-2.5 mb-8 flex-1">
              <li v-for="f in pricingPro" :key="f" class="flex items-center gap-2 text-sm text-zinc-300">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ f }}
              </li>
            </ul>
            <button class="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Magnetic CTA ──────────────────────────────────────────────────── -->
    <section class="py-24">
      <div class="max-w-3xl mx-auto px-6">
        <div class="reveal relative p-10 md:p-14 rounded-3xl bg-zinc-900 text-center overflow-hidden" style="background: linear-gradient(135deg, #09090b, #0d1f18);">
          <div class="absolute inset-0 rounded-3xl border border-emerald-500/20 pointer-events-none" />
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />
          <h2 class="text-4xl md:text-5xl font-black tracking-tight mb-4 relative">Ready to ship?</h2>
          <p class="text-zinc-400 mb-8 relative">Join thousands of teams already building with NOVA.</p>

          <div class="relative flex justify-center">
            <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 scale-95">
              <p v-if="ctaSuccess" class="text-emerald-400 font-semibold py-3">
                Amazing! You're on the list 🚀
              </p>
              <form v-else @submit.prevent="submitCta" class="flex gap-2 w-full max-w-sm">
                <input
                  v-model="ctaEmail"
                  type="email"
                  placeholder="your@email.com"
                  required
                  class="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  ref="ctaBtn"
                  type="submit"
                  @mousemove="onCtaMouseMove"
                  @mouseleave="onCtaMouseLeave"
                  class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 font-bold text-sm rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  Start free
                </button>
              </form>
            </Transition>
          </div>
          <p class="text-xs text-zinc-600 mt-4 relative">No credit card required · Cancel anytime</p>
        </div>
      </div>
    </section>

    <!-- ─── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/60 py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid sm:grid-cols-4 gap-8 mb-10">
          <div>
            <div class="flex items-center gap-1.5 mb-3">
              <div class="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                <svg class="w-3 h-3 text-zinc-900" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <span class="font-black text-sm">NOVA</span>
            </div>
            <p class="text-xs text-zinc-600">Ship faster than ever.</p>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Product</h4>
            <div class="space-y-2 text-xs text-zinc-600">
              <div><a href="#" class="hover:text-white transition-colors">Features</a></div>
              <div><a href="#" class="hover:text-white transition-colors">Pricing</a></div>
              <div><a href="#" class="hover:text-white transition-colors">Changelog</a></div>
            </div>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Company</h4>
            <div class="space-y-2 text-xs text-zinc-600">
              <div><a href="#" class="hover:text-white transition-colors">About</a></div>
              <div><a href="#" class="hover:text-white transition-colors">Blog</a></div>
              <div><a href="#" class="hover:text-white transition-colors">Careers</a></div>
            </div>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Legal</h4>
            <div class="space-y-2 text-xs text-zinc-600">
              <div><a href="#" class="hover:text-white transition-colors">Privacy</a></div>
              <div><a href="#" class="hover:text-white transition-colors">Terms</a></div>
            </div>
          </div>
        </div>
        <div class="border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-zinc-600">© 2025 Nova Inc. All rights reserved.</p>
          <div class="flex items-center gap-3 text-zinc-600">
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>
