<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useSeoMeta({
  title: 'Nomad Co. — Handcrafted Adventure Travel',
  description: 'Bold, modern travel agency template. Brutalist typography meets luxury brand. GSAP-heavy animations, trip filters, 3D card tilt, stats counters, and video modal.',
})

// ─── Nav ─────────────────────────────────────────────────────────────────────
const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}

// ─── Destination cycling ─────────────────────────────────────────────────────
const destinations = ['FURTHER', 'DEEPER', 'HIGHER', 'WILDER']
const destIndex = ref(0)
const destEl = useTemplateRef<HTMLElement>('destEl')
let destTimeline: gsap.core.Timeline | null = null

// ─── Trip filter ─────────────────────────────────────────────────────────────
type Difficulty = 'All' | 'Easy' | 'Moderate' | 'Hard'
const activeFilter = ref<Difficulty>('All')

interface Trip {
  name: string
  days: number
  price: string
  difficulty: Exclude<Difficulty, 'All'>
  image: string
}

const trips: Trip[] = [
  {
    name: 'Patagonia Trek',
    days: 14,
    price: '$4,200',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Iceland Ring Road',
    days: 10,
    price: '$3,100',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Japan Deepdive',
    days: 12,
    price: '$3,800',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Morocco Overland',
    days: 8,
    price: '$2,200',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&w=800&q=80',
  },
]

const filteredTrips = computed(() =>
  activeFilter.value === 'All' ? trips : trips.filter(t => t.difficulty === activeFilter.value)
)

// ─── Difficulty badge colors ─────────────────────────────────────────────────
const difficultyColor: Record<Exclude<Difficulty, 'All'>, string> = {
  Easy:     'text-[#00e87c] border-[#00e87c]/40 bg-[#00e87c]/10',
  Moderate: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  Hard:     'text-red-400 border-red-400/40 bg-red-400/10',
}

// ─── Stats counters ───────────────────────────────────────────────────────────
const counters = reactive({ adventurers: 0, countries: 0, years: 0, happy: 0 })

// ─── Video modal ─────────────────────────────────────────────────────────────
const videoOpen = ref(false)

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: 'Nomad Co. didn\'t just plan a trip — they handed me a life-changing chapter. Patagonia still lives in my chest.',
    name: 'Mia Hartmann',
    trip: 'Patagonia Trek',
    rating: 5,
  },
  {
    quote: 'Our Iceland guide knew every hidden waterfall by name. Zero logistics stress. Pure adventure from day one.',
    name: 'James Okafor',
    trip: 'Iceland Ring Road',
    rating: 5,
  },
  {
    quote: 'The Morocco overland blew every expectation out of the water. Small group, big souls, unforgettable roads.',
    name: 'Sofia Reyes',
    trip: 'Morocco Overland',
    rating: 5,
  },
]

// ─── Newsletter ─────────────────────────────────────────────────────────────
const email = ref('')
const newsletterSent = ref(false)
function submitNewsletter() {
  if (!email.value) return
  newsletterSent.value = true
  email.value = ''
}

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Hero — split headline into chars and animate in
  const line1El = document.querySelector<HTMLElement>('.hero-line1')
  const line2El = document.querySelector<HTMLElement>('.hero-line2-static')
  if (line1El) {
    const text = line1El.textContent || ''
    line1El.innerHTML = text.split('').map(ch => `<span class="hero-char" style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('')
    gsap.fromTo(line1El.querySelectorAll('.hero-char'),
      { opacity: 0, y: 80, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.04, ease: 'back.out(2)', transformOrigin: 'bottom center', delay: 0.1 }
    )
  }
  gsap.fromTo('.hero-sub-els',   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.8, ease: 'power3.out' })
  gsap.fromTo('.hero-ctas',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: 'power3.out' })
  gsap.fromTo('.scroll-indicator', { opacity: 0 },      { opacity: 1, duration: 0.8, delay: 1.4 })

  // Destination cycle via GSAP timeline
  function cycleDest() {
    if (!destEl.value) return
    gsap.to(destEl.value, {
      y: -30, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        destIndex.value = (destIndex.value + 1) % destinations.length
        if (destEl.value) {
          gsap.fromTo(destEl.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
        }
      },
    })
  }
  destTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
  destTimeline.call(cycleDest, [], '+=2')
  destTimeline.repeat(-1)

  // Mobile menu GSAP slide
  // (handled via Vue Transition)

  // Section heading slide-in
  document.querySelectorAll<HTMLElement>('.heading-reveal').forEach(el => {
    gsap.fromTo(el,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    )
  })

  // Trip cards stagger reveal
  gsap.fromTo('.trip-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.trips-grid', start: 'top 80%', once: true },
    }
  )

  // Trip cards 3D tilt on mousemove
  document.querySelectorAll<HTMLElement>('.trip-card').forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.25, ease: 'power2.out', transformPerspective: 800 })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    })
  })

  // Stats counters on ScrollTrigger
  const statsSection = document.querySelector('.stats-section')
  if (statsSection) {
    ScrollTrigger.create({
      trigger: statsSection,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counters, { adventurers: 2400, duration: 2.0, ease: 'power2.out', onUpdate: () => { counters.adventurers = Math.round(counters.adventurers) } })
        gsap.to(counters, { countries: 68,   duration: 1.6, ease: 'power2.out', onUpdate: () => { counters.countries  = Math.round(counters.countries) } })
        gsap.to(counters, { years: 12,       duration: 1.4, ease: 'power2.out', onUpdate: () => { counters.years      = Math.round(counters.years) } })
        gsap.to(counters, { happy: 98,       duration: 1.8, ease: 'power2.out', onUpdate: () => { counters.happy      = Math.round(counters.happy) } })
      },
    })
  }

  // Feature + testimonial cards fade-in
  gsap.fromTo('.feature-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.features-row', start: 'top 80%', once: true },
    }
  )
  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 50, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.testimonials-row', start: 'top 80%', once: true },
    }
  )

  // CTA block reveal
  gsap.fromTo('.cta-heading',
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-block', start: 'top 75%', once: true },
    }
  )

  // Scroll indicator bounce
  gsap.to('.bounce-arrow', {
    y: 8, duration: 0.8, ease: 'power1.inOut', yoyo: true, repeat: -1,
  })
})

onUnmounted(() => {
  destTimeline?.kill()
  ScrollTrigger.getAll().forEach(t => t.kill())
  gsap.killTweensOf('.bounce-arrow')
  document.querySelectorAll<HTMLElement>('.trip-card').forEach(c => gsap.killTweensOf(c))
})
</script>

<template>
  <div class="min-h-screen text-white overflow-x-hidden" style="background:#050505">

    <!-- ─── Navbar ──────────────────────────────────────────────────────────── -->
    <nav class="fixed top-0 inset-x-0 z-50 border-b border-[#1a1a1a]" style="background:rgba(5,5,5,0.92);backdrop-filter:blur(16px)">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">

        <!-- Logo -->
        <a href="#" class="text-2xl font-black tracking-tighter text-white shrink-0">
          NOM<span style="color:#00e87c">AD</span>
        </a>

        <!-- Center nav -->
        <div class="hidden md:flex items-center gap-8 flex-1 justify-center text-sm font-medium tracking-wide text-zinc-400">
          <a href="#trips"        class="hover:text-white transition-colors uppercase text-xs tracking-widest">Trips</a>
          <a href="#destinations" class="hover:text-white transition-colors uppercase text-xs tracking-widest">Destinations</a>
          <a href="#about"        class="hover:text-white transition-colors uppercase text-xs tracking-widest">About</a>
          <a href="#blog"         class="hover:text-white transition-colors uppercase text-xs tracking-widest">Blog</a>
        </div>

        <!-- Right: phone + CTA -->
        <div class="hidden md:flex items-center gap-4 shrink-0">
          <span class="text-xs text-zinc-500 tracking-wide font-mono">+1 (800) NOMAD-CO</span>
          <a href="#trips" class="px-5 py-2 text-xs font-black uppercase tracking-widest rounded-sm transition-all duration-200 hover:opacity-90"
            style="background:#00e87c;color:#050505">
            Book Now
          </a>
        </div>

        <!-- Hamburger -->
        <button @click="mobileOpen = !mobileOpen"
          class="md:hidden ml-auto p-2 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            <path v-else             d="M6 18L18 6M6 6l12 12"     stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-[0.98]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 scale-[0.98]"
    >
      <div v-if="mobileOpen"
        class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
        style="background:#050505">
        <button @click="closeMobile" class="absolute top-5 right-6 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
        <a @click="closeMobile" href="#trips"        class="text-4xl font-black uppercase tracking-widest hover:text-[#00e87c] transition-colors">Trips</a>
        <a @click="closeMobile" href="#destinations" class="text-4xl font-black uppercase tracking-widest hover:text-[#00e87c] transition-colors">Destinations</a>
        <a @click="closeMobile" href="#about"        class="text-4xl font-black uppercase tracking-widest hover:text-[#00e87c] transition-colors">About</a>
        <a @click="closeMobile" href="#blog"         class="text-4xl font-black uppercase tracking-widest hover:text-[#00e87c] transition-colors">Blog</a>
        <a @click="closeMobile" href="#trips"
          class="mt-4 px-10 py-4 text-sm font-black uppercase tracking-widest rounded-sm"
          style="background:#00e87c;color:#050505">
          Book Now
        </a>
        <p class="text-zinc-600 text-sm font-mono tracking-wide">+1 (800) NOMAD-CO</p>
      </div>
    </Transition>

    <!-- ─── Hero ──────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">

      <!-- Background image with dark overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
          alt="Patagonia mountains"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0" style="background:rgba(5,5,5,0.62)" />
        <div class="absolute inset-0" style="background:linear-gradient(to top, #050505 0%, transparent 60%)" />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto">

        <!-- Eyebrow badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-sm border text-xs font-bold uppercase tracking-widest hero-sub-els"
          style="border-color:#00e87c33;color:#00e87c;background:rgba(0,232,124,0.08)">
          <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#00e87c" />
          Now booking 2026 expeditions
        </div>

        <!-- Headline line 1 -->
        <h1 class="hero-line1 text-white font-black uppercase leading-none mb-0 select-none"
          style="font-size:clamp(3.5rem,12vw,10rem);letter-spacing:-0.03em">
          WE TAKE YOU
        </h1>

        <!-- Cycling destination word -->
        <div class="overflow-hidden" style="height:clamp(3rem,10vw,8.5rem)">
          <span ref="destEl"
            class="block font-black uppercase leading-none select-none"
            style="font-size:clamp(3rem,10vw,8.5rem);letter-spacing:-0.03em;color:#00e87c">
            {{ destinations[destIndex] }}
          </span>
        </div>

        <!-- Subtitle -->
        <p class="mt-6 text-zinc-300 max-w-xl text-lg leading-relaxed hero-sub-els">
          Handcrafted adventures for those who dare to go beyond.
        </p>

        <!-- CTAs -->
        <div class="hero-ctas flex flex-col sm:flex-row items-center gap-4 mt-10">
          <a href="#trips"
            class="px-8 py-4 text-sm font-black uppercase tracking-widest rounded-sm transition-all duration-200 hover:opacity-90"
            style="background:#00e87c;color:#050505">
            Explore Trips
          </a>
          <button @click="videoOpen = true"
            class="flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-sm border border-white/30 text-white hover:border-white transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Watch Reel
          </button>
        </div>

        <!-- Scroll indicator -->
        <div class="scroll-indicator flex flex-col items-center gap-2 mt-16 text-zinc-500 text-xs uppercase tracking-widest">
          <span>Scroll to explore</span>
          <svg class="bounce-arrow w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- ─── Marquee ─────────────────────────────────────────────────────────── -->
    <div class="py-4 overflow-hidden" style="background:#00e87c">
      <div class="marquee-track flex whitespace-nowrap gap-0">
        <span
          v-for="n in 2"
          :key="n"
          class="marquee-content flex items-center gap-6 text-sm font-black uppercase tracking-widest shrink-0 pr-6"
          style="color:#050505"
        >
          <template v-for="word in ['ADVENTURE','DISCOVERY','EXPLORATION','WANDERLUST','ADVENTURE','DISCOVERY','EXPLORATION','WANDERLUST']" :key="word">
            <span>{{ word }}</span>
            <span class="text-[#050505]/40">·</span>
          </template>
        </span>
      </div>
    </div>

    <!-- ─── Featured Trips ─────────────────────────────────────────────────── -->
    <section id="trips" class="py-28 max-w-7xl mx-auto px-6">

      <!-- Heading + filters -->
      <div class="flex flex-col sm:flex-row sm:items-end gap-8 mb-14">
        <div class="flex-1">
          <p class="heading-reveal text-xs uppercase tracking-[0.4em] mb-3" style="color:#00e87c">Curated Expeditions</p>
          <h2 class="heading-reveal text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">OUR TRIPS</h2>
        </div>

        <!-- Difficulty filter -->
        <div class="flex items-center gap-2 flex-wrap">
          <button
            v-for="f in (['All','Easy','Moderate','Hard'] as Difficulty[])"
            :key="f"
            @click="activeFilter = f"
            :class="[
              'px-4 py-2 text-xs font-black uppercase tracking-widest rounded-sm border transition-all duration-200',
              activeFilter === f
                ? 'border-[#00e87c] text-[#050505]'
                : 'border-[#1a1a1a] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300',
            ]"
            :style="activeFilter === f ? 'background:#00e87c' : 'background:#0f0f0f'"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <!-- Trip cards grid -->
      <div class="trips-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <TransitionGroup name="trip-filter">
          <div
            v-for="trip in filteredTrips"
            :key="trip.name"
            class="trip-card group relative rounded-sm overflow-hidden cursor-pointer"
            style="background:#0f0f0f;border:1px solid #1a1a1a;transform-style:preserve-3d"
          >
            <!-- Image — grayscale by default, color on hover -->
            <div class="relative overflow-hidden h-56">
              <img
                :src="trip.image"
                :alt="trip.name"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                style="filter:grayscale(100%)"
                @mouseenter="($event.target as HTMLImageElement).style.filter='grayscale(0%)'"
                @mouseleave="($event.target as HTMLImageElement).style.filter='grayscale(100%)'"
                loading="lazy"
              />
              <!-- Difficulty badge -->
              <span
                class="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm border"
                :class="difficultyColor[trip.difficulty]"
              >
                {{ trip.difficulty }}
              </span>
            </div>

            <!-- Info -->
            <div class="p-5">
              <h3 class="text-lg font-black uppercase tracking-tight mb-1">{{ trip.name }}</h3>
              <div class="flex items-center gap-3 text-xs text-zinc-500 mb-3 font-mono">
                <span>{{ trip.days }} days</span>
                <span class="w-1 h-1 rounded-full bg-zinc-700" />
                <span class="font-black" style="color:#00e87c">{{ trip.price }}/person</span>
              </div>
              <a href="#" class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-[#00e87c] transition-colors">
                View trip
                <svg class="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- ─── Stats ───────────────────────────────────────────────────────────── -->
    <section class="stats-section py-24 border-y" style="background:#050505;border-color:#1a1a1a">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">

        <div class="flex flex-col items-center text-center">
          <div class="text-5xl md:text-6xl font-black tabular-nums" style="color:#00e87c">
            {{ counters.adventurers.toLocaleString() }}+
          </div>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Adventurers</div>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="text-5xl md:text-6xl font-black tabular-nums text-white">
            {{ counters.countries }}
          </div>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Countries</div>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="text-5xl md:text-6xl font-black tabular-nums text-white">
            {{ counters.years }}
          </div>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Years</div>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="text-5xl md:text-6xl font-black tabular-nums" style="color:#00e87c">
            {{ counters.happy }}%
          </div>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Happy Clients</div>
        </div>
      </div>
    </section>

    <!-- ─── Why Nomad ─────────────────────────────────────────────────────── -->
    <section id="about" class="py-28 max-w-7xl mx-auto px-6">
      <p class="heading-reveal text-xs uppercase tracking-[0.4em] mb-3" style="color:#00e87c">Our Philosophy</p>
      <h2 class="heading-reveal text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-16">WHY NOMAD</h2>

      <div class="features-row grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in [
            { icon: '⬡', title: 'Small Groups', desc: 'Max 12 travelers per expedition. Real connection, real experience — never a tourist crowd.' },
            { icon: '⬡', title: 'Expert Local Guides', desc: 'Born and raised in the destination. They know the unmarked paths, the hidden huts, the stories.' },
            { icon: '⬡', title: 'Carbon Neutral', desc: 'Every trip is fully offset. We work with verified reforestation partners on every continent.' },
          ]"
          :key="feature.title"
          class="feature-card p-8 rounded-sm border group hover:border-[#00e87c]/40 transition-all duration-300"
          style="background:#0f0f0f;border-color:#1a1a1a"
        >
          <div class="text-3xl mb-6 group-hover:text-[#00e87c] transition-colors text-zinc-600">{{ feature.icon }}</div>
          <h3 class="text-xl font-black uppercase tracking-tight mb-3">{{ feature.title }}</h3>
          <p class="text-sm text-zinc-500 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ─── Testimonials ─────────────────────────────────────────────────── -->
    <section class="py-28 border-t" style="border-color:#1a1a1a">
      <div class="max-w-7xl mx-auto px-6">
        <p class="heading-reveal text-xs uppercase tracking-[0.4em] mb-3" style="color:#00e87c">From the Field</p>
        <h2 class="heading-reveal text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-16">WHAT THEY SAY</h2>

        <div class="testimonials-row grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="t in testimonials"
            :key="t.name"
            class="testimonial-card p-8 rounded-sm border flex flex-col gap-5"
            style="background:#0f0f0f;border-color:#1a1a1a"
          >
            <!-- Stars -->
            <div class="flex gap-1">
              <svg v-for="i in t.rating" :key="i" class="w-4 h-4" viewBox="0 0 24 24" fill="#00e87c">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="text-zinc-300 text-base leading-relaxed flex-1">"{{ t.quote }}"</p>
            <div>
              <div class="font-black text-sm uppercase tracking-widest">{{ t.name }}</div>
              <div class="text-xs text-zinc-600 mt-0.5 uppercase tracking-wide">{{ t.trip }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA Block ─────────────────────────────────────────────────────── -->
    <section class="cta-block relative py-40 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80"
          alt="Cappadocia hot air balloons"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0" style="background:rgba(5,5,5,0.72)" />
      </div>
      <!-- Content -->
      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h2 class="cta-heading text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-none tracking-tight text-white mb-10">
          READY FOR YOUR<br/>NEXT ADVENTURE?
        </h2>
        <a href="#trips"
          class="inline-flex items-center gap-3 px-10 py-5 text-sm font-black uppercase tracking-widest rounded-sm transition-all duration-200 hover:opacity-90"
          style="background:#00e87c;color:#050505">
          Start Planning
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </section>

    <!-- ─── Footer ──────────────────────────────────────────────────────────── -->
    <footer class="border-t py-16" style="border-color:#1a1a1a;background:#050505">
      <div class="max-w-7xl mx-auto px-6">

        <!-- Top: logo + newsletter + socials -->
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between mb-14">

          <!-- Brand -->
          <div class="max-w-xs">
            <div class="text-3xl font-black tracking-tighter mb-4">
              NOM<span style="color:#00e87c">AD</span>
            </div>
            <p class="text-sm text-zinc-500 leading-relaxed">
              Handcrafted adventures since 2013. We go where others don't — and we bring you along.
            </p>
          </div>

          <!-- Newsletter -->
          <div class="max-w-sm w-full">
            <p class="text-xs uppercase tracking-[0.3em] mb-4 text-zinc-400 font-bold">Get the next expedition alert</p>
            <Transition enter-active-class="transition-all duration-400" enter-from-class="opacity-0 scale-95">
              <div v-if="newsletterSent" class="text-sm font-bold" style="color:#00e87c">
                You're in. Watch your inbox.
              </div>
              <form v-else @submit.prevent="submitNewsletter" class="flex gap-2">
                <input
                  v-model="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  class="flex-1 px-4 py-3 text-sm rounded-sm border focus:outline-none focus:border-[#00e87c] transition-colors placeholder-zinc-600 text-white"
                  style="background:#0f0f0f;border-color:#1a1a1a"
                />
                <button type="submit"
                  class="px-5 py-3 text-xs font-black uppercase tracking-widest rounded-sm transition-all hover:opacity-90"
                  style="background:#00e87c;color:#050505">
                  Join
                </button>
              </form>
            </Transition>
          </div>

          <!-- Social links -->
          <div class="flex flex-col gap-4">
            <p class="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">Follow</p>
            <div class="flex gap-4">
              <a v-for="social in [
                { label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
                { label: 'X / Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ]" :key="social.label"
                href="#"
                class="text-zinc-600 hover:text-white transition-colors"
                :aria-label="social.label">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="social.icon"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Nav links grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-t border-b" style="border-color:#1a1a1a">
          <div v-for="col in [
            { heading: 'Expeditions', links: ['Patagonia Trek','Iceland Ring Road','Japan Deepdive','Morocco Overland'] },
            { heading: 'Company',     links: ['About','Our Guides','Sustainability','Press'] },
            { heading: 'Resources',   links: ['Blog','Packing Lists','Visa Guide','FAQ'] },
            { heading: 'Legal',       links: ['Privacy Policy','Terms','Cookies','Refund Policy'] },
          ]" :key="col.heading">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] font-black mb-4 text-white">{{ col.heading }}</p>
              <ul class="flex flex-col gap-2">
                <li v-for="link in col.links" :key="link">
                  <a href="#" class="text-sm text-zinc-500 hover:text-white transition-colors">{{ link }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-600">
          <span>© 2025 Nomad Co. All rights reserved.</span>
          <span class="font-mono tracking-wide">+1 (800) NOMAD-CO · hello@nomadco.com</span>
        </div>
      </div>
    </footer>

    <!-- ─── Video Modal ────────────────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="videoOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center"
        style="background:rgba(5,5,5,0.95)"
        @click.self="videoOpen = false">
        <div class="relative w-full max-w-3xl mx-6">
          <!-- Close -->
          <button @click="videoOpen = false"
            class="absolute -top-10 right-0 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2">
            Close
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>
          <!-- Fake player -->
          <div class="aspect-video rounded-sm flex items-center justify-center border" style="background:#0f0f0f;border-color:#1a1a1a">
            <div class="flex flex-col items-center gap-5 text-center">
              <div class="w-20 h-20 rounded-full flex items-center justify-center border-2 cursor-pointer group transition-all hover:border-[#00e87c]"
                style="border-color:#1a1a1a">
                <svg class="w-8 h-8 text-zinc-500 group-hover:text-[#00e87c] transition-colors ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p class="text-zinc-600 text-sm uppercase tracking-widest">Nomad Co. Expedition Reel 2025</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* Infinite marquee */
.marquee-track {
  animation: marquee-scroll 22s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
.marquee-content {
  min-width: 100%;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Trip filter transition */
.trip-filter-enter-active,
.trip-filter-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.trip-filter-enter-from,
.trip-filter-leave-to {
  opacity: 0;
  transform: scale(0.97) translateY(8px);
}
</style>
