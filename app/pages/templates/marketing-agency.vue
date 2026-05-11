<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Nav ──────────────────────────────────────────────────────────────────────
const mobileOpen = ref(false)

// ─── Template refs ────────────────────────────────────────────────────────────
const blob1       = useTemplateRef<HTMLElement>('blob1')
const blob2       = useTemplateRef<HTMLElement>('blob2')
const magneticBtn = useTemplateRef<HTMLElement>('magneticBtn')
const magneticInner = useTemplateRef<HTMLElement>('magneticInner')

// ─── Animated stats counters ─────────────────────────────────────────────────
const statsCounters = reactive({ projects: 0, years: 0, satisfaction: 0 })

// ─── Contact form ─────────────────────────────────────────────────────────────
const contactName    = ref('')
const contactEmail   = ref('')
const contactMessage = ref('')
const formSent       = ref(false)

function submitContact() {
  if (!contactName.value || !contactEmail.value || !contactMessage.value) return
  formSent.value = true
  contactName.value = ''
  contactEmail.value = ''
  contactMessage.value = ''
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const works = [
  { client: 'Luminary', type: 'Brand Identity + Web', year: '2025', gradient: 'from-violet-600 to-fuchsia-600', tag: 'Branding' },
  { client: 'Orbit SaaS', type: 'Product Design + Dev', year: '2025', gradient: 'from-blue-600 to-cyan-500', tag: 'Product' },
  { client: 'Apex Finance', type: 'Web Design', year: '2024', gradient: 'from-emerald-600 to-teal-500', tag: 'Web' },
]

const services = [
  {
    title: 'Brand Identity',
    desc: 'We craft distinctive visual languages that make your brand impossible to forget.',
    icon: 'M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42',
  },
  {
    title: 'Web Development',
    desc: 'Performance-first websites and web apps built with modern tech stacks.',
    icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  },
  {
    title: 'Motion Design',
    desc: 'Animations and interactions that bring your product to life with intention.',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
  {
    title: 'Strategy',
    desc: 'Research-backed positioning, messaging, and go-to-market frameworks.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
  },
]

const team = [
  { name: 'Vander Otis',    role: 'Creative Director',   initials: 'VO', gradient: 'from-violet-500 to-fuchsia-500' },
  { name: 'Gabriel Delattre', role: 'Lead Developer',    initials: 'GD', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Sara López',     role: 'Brand Strategist',    initials: 'SL', gradient: 'from-rose-500 to-pink-500' },
]

const stats = [
  { value: '120+', label: 'Projects shipped' },
  { value: '8yrs',  label: 'In the industry' },
  { value: '98%',  label: 'Client satisfaction' },
]

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Hero letter-by-letter reveal — each .hero-letter span springs up from below with rotateX
  gsap.fromTo('.hero-letter',
    { opacity: 0, y: 60, rotateX: -90 },
    { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.7)', transformOrigin: 'bottom center' }
  )

  // Hero supporting elements entrance — staggered after letters
  gsap.fromTo('.hero-sub',  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' })
  gsap.fromTo('.hero-ctas', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' })

  // Blob parallax — blobs drift at different speeds as the page scrolls for depth
  if (blob1.value) {
    gsap.to(blob1.value, {
      y: -80, ease: 'none',
      scrollTrigger: { scrub: 1.5, start: 'top top', end: 'bottom top' },
    })
  }
  if (blob2.value) {
    gsap.to(blob2.value, {
      y: 60, ease: 'none',
      scrollTrigger: { scrub: 2, start: 'top top', end: 'bottom top' },
    })
  }

  // Clip-path section reveals — text content sweeps in from the right edge
  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    )
  })

  // Work cards stagger scroll reveal
  gsap.fromTo('.work-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.work-grid', start: 'top 75%', once: true },
    }
  )

  // Work card 3D tilt on mousemove — perspective tilt follows cursor position within card
  document.querySelectorAll<HTMLElement>('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, duration: 0.3, ease: 'power2.out', transformPerspective: 600 })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    })
  })

  // Service cards stagger
  gsap.fromTo('.service-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 75%', once: true },
    }
  )

  // Service card glow border — fade in the glow overlay on hover, reverse on leave
  document.querySelectorAll<HTMLElement>('.service-card').forEach(card => {
    const glow = card.querySelector<HTMLElement>('.glow-border')
    if (!glow) return
    card.addEventListener('mouseenter', () => {
      gsap.to(glow, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(glow, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    })
  })

  // Team cards spring scale on scroll into view
  gsap.fromTo('.team-card',
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.team-grid', start: 'top 75%', once: true },
    }
  )

  // Stats counter animation — numbers count up when stats row scrolls into view
  const statsEl = document.querySelector('.stats-row')
  if (statsEl) {
    ScrollTrigger.create({
      trigger: statsEl,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(statsCounters, { projects: 120, duration: 1.6, ease: 'power2.out', onUpdate: () => { statsCounters.projects = Math.round(statsCounters.projects) } })
        gsap.to(statsCounters, { years: 8, duration: 1.4, ease: 'power2.out', onUpdate: () => { statsCounters.years = Math.round(statsCounters.years) } })
        gsap.to(statsCounters, { satisfaction: 98, duration: 1.8, ease: 'power2.out', onUpdate: () => { statsCounters.satisfaction = Math.round(statsCounters.satisfaction) } })
      },
    })
  }

  // Magnetic CTA button — button inner drifts toward cursor and snaps back elastically
  if (magneticBtn.value && magneticInner.value) {
    const btn = magneticInner.value
    magneticBtn.value.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (magneticBtn.value as HTMLElement).getBoundingClientRect()
      const dx = e.clientX - rect.left - rect.width / 2
      const dy = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: dx * 0.3, y: dy * 0.3, duration: 0.25, ease: 'power2.out' })
    })
    magneticBtn.value.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    })
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  document.querySelectorAll<HTMLElement>('.work-card').forEach(card => {
    gsap.killTweensOf(card)
  })
  document.querySelectorAll<HTMLElement>('.service-card').forEach(card => {
    gsap.killTweensOf(card)
  })
  if (blob1.value)        gsap.killTweensOf(blob1.value)
  if (blob2.value)        gsap.killTweensOf(blob2.value)
  if (magneticInner.value) gsap.killTweensOf(magneticInner.value)
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

    <!-- ─── Navbar ─────────────────────────────────────────────────────────── -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span class="text-xl font-black tracking-tight text-white">FORGE<span class="text-violet-500">.</span></span>

        <div class="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#work"     class="hover:text-white transition-colors">Work</a>
          <a href="#services" class="hover:text-white transition-colors">Services</a>
          <a href="#team"     class="hover:text-white transition-colors">About</a>
          <a href="#contact"  class="hover:text-white transition-colors">Contact</a>
        </div>

        <a href="#contact" class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-white text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors">
          Start a project
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>

        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-2" leave-active-class="transition-all duration-150" leave-to-class="opacity-0 -translate-y-2">
        <div v-if="mobileOpen" class="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm text-zinc-400 border-t border-zinc-800/60 pt-4">
          <a href="#work"     @click="mobileOpen=false" class="hover:text-white transition-colors py-1">Work</a>
          <a href="#services" @click="mobileOpen=false" class="hover:text-white transition-colors py-1">Services</a>
          <a href="#team"     @click="mobileOpen=false" class="hover:text-white transition-colors py-1">About</a>
          <a href="#contact"  @click="mobileOpen=false" class="hover:text-white transition-colors py-1">Contact</a>
          <a href="#contact"  @click="mobileOpen=false" class="mt-1 inline-flex w-fit items-center gap-1.5 px-4 py-2 font-medium bg-white text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors">Start a project</a>
        </div>
      </Transition>
    </nav>

    <!-- ─── Hero ───────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div ref="blob1" class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div ref="blob2" class="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_0.5px,transparent_0.5px),linear-gradient(to_bottom,#ffffff08_0.5px,transparent_0.5px)] bg-[size:80px_80px]" />
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-24">
        <div class="max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-8 hero-sub">
            <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Available for new projects
          </div>
          <h1 class="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight mb-8" style="perspective: 600px">
            We Build<br>
            <span class="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent inline-flex flex-wrap">
              <template v-for="(letter, i) in 'Digital'" :key="'d'+i">
                <span class="hero-letter inline-block" style="display:inline-block">{{ letter }}</span>
              </template>
            </span><br>
            <span class="inline-flex flex-wrap">
              <template v-for="(letter, i) in 'Experiences'" :key="'e'+i">
                <span class="hero-letter inline-block" style="display:inline-block">{{ letter === ' ' ? ' ' : letter }}</span>
              </template>
            </span>
          </h1>
          <p class="hero-sub text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
            A boutique creative studio crafting brands, products, and digital experiences
            that move people — and move markets.
          </p>
          <div class="hero-ctas flex flex-col sm:flex-row gap-4">
            <a href="#work" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-zinc-900 font-semibold rounded-full hover:bg-zinc-100 transition-colors">
              See our work
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <!-- Magnetic wrapper — tracks cursor and pulls button inner toward pointer -->
            <div ref="magneticBtn" class="relative inline-flex">
              <a ref="magneticInner" href="#contact" class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-full hover:border-zinc-500 hover:text-white transition-colors">
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <!-- Stats row — numbers count up on scroll into view -->
        <div class="stats-row mt-20 flex flex-wrap gap-12">
          <div class="hero-sub">
            <div class="text-3xl font-black text-white">{{ statsCounters.projects }}+</div>
            <div class="text-sm text-zinc-500 mt-0.5">Projects shipped</div>
          </div>
          <div class="hero-sub">
            <div class="text-3xl font-black text-white">{{ statsCounters.years }}yrs</div>
            <div class="text-sm text-zinc-500 mt-0.5">In the industry</div>
          </div>
          <div class="hero-sub">
            <div class="text-3xl font-black text-white">{{ statsCounters.satisfaction }}%</div>
            <div class="text-sm text-zinc-500 mt-0.5">Client satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Work ───────────────────────────────────────────────────────────── -->
    <section id="work" class="py-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-end justify-between mb-14">
          <div class="reveal">
            <p class="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">Selected Work</p>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight">What we've built</h2>
          </div>
          <a href="#contact" class="hidden sm:inline-flex reveal text-sm text-zinc-400 hover:text-white transition-colors gap-1 items-center">
            See all projects
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <div class="work-grid grid gap-6 md:grid-cols-3">
          <div
            v-for="(work, i) in works"
            :key="work.client"
            class="work-card group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 cursor-pointer"
            style="transform-style: preserve-3d"
          >
            <!-- Cover -->
            <div :class="`bg-gradient-to-br ${work.gradient} h-52 w-full relative overflow-hidden`">
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <!-- Abstract pattern -->
              <div class="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
              <div class="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10 blur-lg" />
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <span class="text-sm font-semibold px-4 py-2 bg-white text-zinc-900 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  View case study →
                </span>
              </div>
            </div>
            <!-- Info -->
            <div class="p-5">
              <div class="flex items-center justify-between mb-1">
                <span class="text-lg font-bold">{{ work.client }}</span>
                <span class="text-xs text-zinc-500">{{ work.year }}</span>
              </div>
              <p class="text-sm text-zinc-400">{{ work.type }}</p>
              <span class="inline-block mt-3 text-xs px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">{{ work.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Services ──────────────────────────────────────────────────────── -->
    <section id="services" class="py-24 bg-zinc-900/30">
      <div class="max-w-6xl mx-auto px-6">
        <div class="reveal mb-14">
          <p class="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">What we do</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Our services</h2>
        </div>

        <div class="services-grid grid gap-5 sm:grid-cols-2">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="service-card group relative p-7 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/40 hover:bg-zinc-900/80 transition-all duration-300 overflow-hidden"
          >
            <!-- Glow border sweep — animated on hover via GSAP -->
            <div class="glow-border absolute inset-0 rounded-2xl pointer-events-none opacity-0" style="background: linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(217,70,239,0.12) 100%); box-shadow: inset 0 0 0 1.5px rgba(139,92,246,0.45)" />
            <div class="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:bg-violet-500/20 transition-colors">
              <svg class="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path :d="svc.icon" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2 group-hover:text-violet-300 transition-colors">{{ svc.title }}</h3>
            <p class="text-sm text-zinc-400 leading-relaxed">{{ svc.desc }}</p>
            <div class="mt-5 flex items-center gap-1 text-xs text-zinc-600 group-hover:text-violet-400 transition-colors font-medium">
              Learn more
              <svg class="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Team ───────────────────────────────────────────────────────────── -->
    <section id="team" class="py-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="reveal mb-14">
          <p class="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">The people</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Our team</h2>
        </div>

        <div class="team-grid grid gap-6 sm:grid-cols-3">
          <div
            v-for="member in team"
            :key="member.name"
            class="team-card group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col items-center text-center"
          >
            <!-- Avatar -->
            <div :class="`w-16 h-16 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-lg font-black text-white mb-4 shadow-lg`">
              {{ member.initials }}
            </div>
            <h3 class="font-bold text-base">{{ member.name }}</h3>
            <p class="text-sm text-zinc-500 mt-0.5 mb-4">{{ member.role }}</p>
            <!-- Social links -->
            <div class="flex items-center gap-3 text-zinc-600">
              <a href="#" class="hover:text-white transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" class="hover:text-white transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Contact ────────────────────────────────────────────────────────── -->
    <section id="contact" class="py-24 bg-zinc-900/30">
      <div class="max-w-2xl mx-auto px-6">
        <div class="reveal text-center mb-12">
          <p class="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">Get in touch</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight mb-4">Start a project</h2>
          <p class="text-zinc-400">Tell us about your vision. We'll get back to you within 24 hours.</p>
        </div>

        <div class="reveal">
          <Transition
            enter-active-class="transition-all duration-500"
            enter-from-class="opacity-0 scale-95"
          >
            <div v-if="formSent" class="text-center py-16">
              <div class="w-14 h-14 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Message received!</h3>
              <p class="text-zinc-400 text-sm">We'll be in touch shortly.</p>
              <button @click="formSent = false" class="mt-6 text-sm text-zinc-500 hover:text-white transition-colors">Send another message</button>
            </div>
            <form v-else @submit.prevent="submitContact" class="flex flex-col gap-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-zinc-400 mb-1.5">Name</label>
                  <input v-model="contactName" type="text" placeholder="Your name" required
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                  <input v-model="contactEmail" type="email" placeholder="you@company.com" required
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">Message</label>
                <textarea v-model="contactMessage" rows="5" placeholder="Tell us about your project..." required
                  class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors resize-none" />
              </div>
              <button type="submit"
                class="w-full py-3.5 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
                Send message
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ─── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/60 py-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-lg font-black tracking-tight">FORGE<span class="text-violet-500">.</span></span>
        <div class="flex items-center gap-6 text-sm text-zinc-500">
          <a href="#work"     class="hover:text-white transition-colors">Work</a>
          <a href="#services" class="hover:text-white transition-colors">Services</a>
          <a href="#contact"  class="hover:text-white transition-colors">Contact</a>
        </div>
        <p class="text-xs text-zinc-600">© 2025 Forge Studio. All rights reserved.</p>
      </div>
    </footer>

  </div>
</template>
