<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Countdown timer ──────────────────────────────────────────────────────────
const departureDate = new Date('2025-09-15T08:00:00')
const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownInterval: ReturnType<typeof setInterval> | null = null

function updateCountdown() {
  const now = new Date().getTime()
  const distance = departureDate.getTime() - now
  if (distance <= 0) {
    countdown.days = 0; countdown.hours = 0; countdown.minutes = 0; countdown.seconds = 0
    return
  }
  countdown.days    = Math.floor(distance / (1000 * 60 * 60 * 24))
  countdown.hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000)
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const mobileOpen = ref(false)

// ─── Activity tabs ────────────────────────────────────────────────────────────
type Activity = 'hiking' | 'surfing' | 'climbing' | 'diving' | 'skiing'
const activeActivity = ref<Activity>('hiking')

const activities: { id: Activity; icon: string; label: string }[] = [
  { id: 'hiking',   icon: '🏔',  label: 'Hiking'   },
  { id: 'surfing',  icon: '🏄',  label: 'Surfing'  },
  { id: 'climbing', icon: '🧗',  label: 'Climbing' },
  { id: 'diving',   icon: '🤿',  label: 'Diving'   },
  { id: 'skiing',   icon: '⛷',  label: 'Skiing'   },
]

type Difficulty = 'Beginner' | 'Moderate' | 'Hard' | 'Extreme'

interface Trip {
  name: string
  days: number
  price: number
  difficulty: Difficulty
  spots: number
  totalSpots: number
  image: string
}

const trips: Record<Activity, Trip[]> = {
  hiking: [
    { name: 'Patagonia W Trek',    days: 8,  price: 2400, difficulty: 'Extreme',  spots: 12, totalSpots: 16, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80' },
    { name: 'Iceland Highlands',   days: 6,  price: 1900, difficulty: 'Hard',     spots: 8,  totalSpots: 12, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80' },
    { name: 'Swiss Alps Traverse', days: 10, price: 3100, difficulty: 'Extreme',  spots: 6,  totalSpots: 10, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
  ],
  surfing: [
    { name: 'Bali Surf Camp',       days: 7, price: 1200, difficulty: 'Beginner',     spots: 16, totalSpots: 20, image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80' },
    { name: 'Maldives Surf Safari', days: 5, price: 2800, difficulty: 'Hard',         spots: 8,  totalSpots: 10, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Morocco Surf Tour',    days: 8, price: 1600, difficulty: 'Moderate',     spots: 12, totalSpots: 16, image: 'https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&w=600&q=80' },
  ],
  climbing: [
    { name: 'Dolomites Rock Climbing', days: 7, price: 2200, difficulty: 'Hard',     spots: 8,  totalSpots: 10, image: 'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Yosemite Big Wall',       days: 5, price: 1800, difficulty: 'Extreme',  spots: 6,  totalSpots: 8,  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
    { name: 'Cappadocia Climbing',     days: 4, price: 900,  difficulty: 'Moderate', spots: 10, totalSpots: 14, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
  ],
  diving: [
    { name: 'Great Barrier Reef',    days: 7, price: 2600, difficulty: 'Moderate', spots: 10, totalSpots: 14, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=600&q=80' },
    { name: 'Red Sea Liveaboard',    days: 8, price: 3200, difficulty: 'Hard',     spots: 8,  totalSpots: 12, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80' },
    { name: 'Komodo Dragon Dive',    days: 6, price: 2100, difficulty: 'Extreme',  spots: 6,  totalSpots: 8,  image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },
  ],
  skiing: [
    { name: 'Verbier Freeride Week',    days: 7, price: 3400, difficulty: 'Extreme',  spots: 8,  totalSpots: 12, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80' },
    { name: 'Hokkaido Powder Quest',    days: 6, price: 2900, difficulty: 'Hard',     spots: 10, totalSpots: 14, image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Andes Backcountry Tour',   days: 8, price: 2400, difficulty: 'Hard',     spots: 6,  totalSpots: 10, image: 'https://images.unsplash.com/photo-1531889289971-8f6e6b9c77bc?auto=format&fit=crop&w=600&q=80' },
  ],
}

const difficultyConfig: Record<Difficulty, { color: string; bg: string }> = {
  Beginner: { color: 'text-green-400',  bg: 'bg-green-500/20 border-green-500/40' },
  Moderate: { color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/40' },
  Hard:     { color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/40' },
  Extreme:  { color: 'text-red-400',    bg: 'bg-red-500/20 border-red-500/40' },
}

function spotsPercent(trip: Trip) {
  return Math.round((trip.spots / trip.totalSpots) * 100)
}

// ─── Builder ─────────────────────────────────────────────────────────────────
const currentStep       = ref(1)
const builderActivity   = ref<Activity | null>(null)
const selectedMonth     = ref<number | null>(null)
const groupSize         = ref(2)
const builderResult     = ref<number | null>(null)

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function selectBuilderActivity(a: Activity) {
  builderActivity.value = a
}
function nextStep() {
  if (currentStep.value < 3) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}
function findTrips() {
  const count = builderActivity.value ? Math.floor(Math.random() * 3) + 1 : 0
  builderResult.value = count
}
function incrementGroup() { if (groupSize.value < 12) groupSize.value++ }
function decrementGroup() { if (groupSize.value > 1)  groupSize.value-- }

// ─── Booking modal ────────────────────────────────────────────────────────────
const bookingModal   = ref(false)
const bookingTrip    = ref<Trip | null>(null)
const bookingName    = ref('')
const bookingEmail   = ref('')
const bookingSuccess = ref(false)

function openBooking(trip: Trip) {
  bookingTrip.value    = trip
  bookingModal.value   = true
  bookingSuccess.value = false
  bookingName.value    = ''
  bookingEmail.value   = ''
}
function submitBooking() {
  if (!bookingName.value || !bookingEmail.value) return
  bookingSuccess.value = true
}
function closeModal() {
  bookingModal.value = false
}

// ─── Guides ───────────────────────────────────────────────────────────────────
const guides = [
  {
    name: 'Marcus Keller',
    specialty: 'Alpine Mountaineering',
    years: 14,
    trips: 280,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    quote: "Every summit is earned in the valley. Preparation is everything.",
  },
  {
    name: 'Sofia Reyes',
    specialty: 'Surfing & Ocean Safety',
    years: 11,
    trips: 195,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    quote: "The ocean teaches you humility — and then it teaches you to fly.",
  },
  {
    name: 'Dani Okafor',
    specialty: 'Rock Climbing & Rappel',
    years: 9,
    trips: 140,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: "Fear is just adrenaline without direction. We give it direction.",
  },
  {
    name: 'Yuki Tanaka',
    specialty: 'Backcountry Skiing',
    years: 16,
    trips: 320,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: "Fresh powder and a clear line. That's where I live.",
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "I've traveled with 6 different companies. Summit is on another level. The Patagonia trek broke me open and put me back together stronger.",
    name: 'James Whitfield',
    trip: 'Patagonia W Trek',
    avatar: 'JW',
  },
  {
    quote: "I was scared going in. I'd never climbed anything above 3,000m. By day 4 in the Dolomites, I didn't recognize the person I was before.",
    name: 'Leila Nasser',
    trip: 'Dolomites Rock Climbing',
    avatar: 'LN',
  },
  {
    quote: "The guides aren't just instructors — they're storytellers, safety nets, and the reason you push past what you thought was your limit.",
    name: 'Tom Eriksson',
    trip: 'Iceland Highlands',
    avatar: 'TE',
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = reactive({ guides: 0, trips: 0, countries: 0 })

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Start countdown
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)

  // Hero headline word-by-word reveal
  gsap.fromTo('.hero-word',
    { opacity: 0, y: 80, rotateX: -45, filter: 'blur(8px)' },
    { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)', transformOrigin: 'bottom center', delay: 0.3 }
  )
  gsap.fromTo('.hero-sub-el', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' })
  gsap.fromTo('.hero-cta-el', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.1, ease: 'power3.out' })
  gsap.fromTo('.hero-countdown', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.7, delay: 1.0, ease: 'back.out(1.2)' })

  // Trip cards stagger scroll
  gsap.fromTo('.trip-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.trips-grid', start: 'top 80%', once: true },
    }
  )

  // Guide cards
  gsap.fromTo('.guide-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.guides-grid', start: 'top 78%', once: true },
    }
  )

  // Testimonial cards
  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.55, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%', once: true },
    }
  )

  // Section reveals
  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  })

  // Stats count-up
  const statsEl = document.querySelector('.stats-counter-row')
  if (statsEl) {
    ScrollTrigger.create({
      trigger: statsEl,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(stats, { guides: 24, duration: 1.4, ease: 'power2.out', onUpdate: () => { stats.guides = Math.round(stats.guides) } })
        gsap.to(stats, { trips: 180, duration: 1.8, ease: 'power2.out', onUpdate: () => { stats.trips = Math.round(stats.trips) } })
        gsap.to(stats, { countries: 38, duration: 1.6, ease: 'power2.out', onUpdate: () => { stats.countries = Math.round(stats.countries) } })
      },
    })
  }

  // Spots bars animate on scroll
  ScrollTrigger.create({
    trigger: '.trips-grid',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      document.querySelectorAll<HTMLElement>('.spots-bar-fill').forEach(bar => {
        const w = bar.dataset.width || '0'
        gsap.fromTo(bar, { width: '0%' }, { width: `${w}%`, duration: 1, ease: 'power2.out', delay: 0.3 })
      })
    },
  })
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
  ScrollTrigger.getAll().forEach(t => t.kill())
})

// ─── Tab switch with GSAP ─────────────────────────────────────────────────────
function switchTab(id: Activity) {
  gsap.to('.trips-grid', {
    opacity: 0, y: 10, duration: 0.18, ease: 'power2.in',
    onComplete: () => {
      activeActivity.value = id
      nextTick(() => {
        gsap.fromTo('.trips-grid', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' })
        // Re-animate spots bars for new tab
        document.querySelectorAll<HTMLElement>('.spots-bar-fill').forEach(bar => {
          const w = bar.dataset.width || '0'
          gsap.fromTo(bar, { width: '0%' }, { width: `${w}%`, duration: 0.9, ease: 'power2.out' })
        })
      })
    },
  })
}
</script>

<template>
  <div class="min-h-screen text-[#f1f5f0] overflow-x-hidden" style="background-color:#0a1a0e">

    <!-- ─── Navbar ──────────────────────────────────────────────────────────── -->
    <nav class="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-[#22c55e]/10" style="background-color:rgba(10,26,14,0.9)">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        <!-- Logo -->
        <div class="flex items-center gap-2.5 shrink-0">
          <svg class="w-7 h-7 text-[#ff5722]" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2L4 26h5l7-14 7 14h5L16 2z"/>
            <path d="M11 20l5-10 5 10H11z" fill="rgba(255,87,34,0.35)"/>
          </svg>
          <span class="text-xl font-black tracking-widest text-[#f1f5f0]">SUMMIT</span>
        </div>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-8 text-sm" style="color:#8aad8e">
          <a href="#activities" class="hover:text-[#f1f5f0] transition-colors">Adventures</a>
          <a href="#builder"    class="hover:text-[#f1f5f0] transition-colors">Calendar</a>
          <a href="#guides"     class="hover:text-[#f1f5f0] transition-colors">Guides</a>
          <a href="#community"  class="hover:text-[#f1f5f0] transition-colors">Community</a>
        </div>

        <!-- Right side -->
        <div class="hidden md:flex items-center gap-3 shrink-0">
          <!-- Countdown chip -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border" style="background-color:#111f14;border-color:rgba(34,197,94,0.25);color:#22c55e">
            <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Next departure: {{ countdown.days }}d {{ countdown.hours }}h
          </div>
          <button class="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95" style="background-color:#ff5722">
            Book Adventure
          </button>
        </div>

        <!-- Mobile toggle -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 transition-colors" style="color:#8aad8e">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition-all duration-150"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileOpen" class="md:hidden px-6 pb-5 pt-4 flex flex-col gap-4 text-sm border-t" style="border-color:rgba(34,197,94,0.1);color:#8aad8e">
          <a href="#activities" @click="mobileOpen=false" class="hover:text-[#f1f5f0] transition-colors py-1">Adventures</a>
          <a href="#builder"    @click="mobileOpen=false" class="hover:text-[#f1f5f0] transition-colors py-1">Calendar</a>
          <a href="#guides"     @click="mobileOpen=false" class="hover:text-[#f1f5f0] transition-colors py-1">Guides</a>
          <button class="mt-1 px-4 py-2.5 rounded-lg font-bold text-white text-left" style="background-color:#ff5722">Book Adventure</button>
        </div>
      </Transition>
    </nav>

    <!-- ─── Hero ────────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <!-- Background image with overlay -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
          alt="Patagonia mountains"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0" style="background:linear-gradient(to bottom, rgba(10,26,14,0.72) 0%, rgba(10,26,14,0.55) 40%, rgba(10,26,14,0.85) 100%)"/>
        <div class="absolute inset-0" style="background:linear-gradient(to right, rgba(10,26,14,0.6) 0%, transparent 60%)"/>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <!-- Live chip -->
        <div class="hero-sub-el mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold" style="background-color:rgba(255,87,34,0.12);border-color:rgba(255,87,34,0.4);color:#ff5722">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
          LIVE — 3 spots left for Patagonia Trek
        </div>

        <!-- Main heading -->
        <h1 class="font-black tracking-tighter uppercase leading-none mb-6" style="font-size:clamp(4rem,12vw,9rem);perspective:800px">
          <span class="hero-word block" style="color:#f1f5f0">WHERE LIMITS</span>
          <span class="hero-word block" style="color:#ff5722">DON'T EXIST</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-sub-el text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style="color:#8aad8e">
          Expert-led expeditions for serious adventurers. Patagonia to the Himalayas — we take you where few dare to go.
        </p>

        <!-- CTA buttons -->
        <div class="hero-cta-el flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a href="#activities"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style="background-color:#ff5722">
            Join the expedition
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#activities"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold border transition-all hover:bg-white/5"
            style="color:#f1f5f0;border-color:rgba(241,245,240,0.35)">
            View all trips
          </a>
        </div>

        <!-- Countdown timer -->
        <div class="hero-countdown">
          <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color:#8aad8e">
            Patagonia Trek — Next Departure
          </p>
          <div class="flex gap-4 justify-center">
            <div v-for="(unit, label) in { Days: countdown.days, Hours: countdown.hours, Minutes: countdown.minutes, Seconds: countdown.seconds }" :key="label"
              class="flex flex-col items-center px-5 py-4 rounded-xl border min-w-[80px]"
              style="background-color:rgba(17,31,20,0.85);border-color:rgba(34,197,94,0.2)">
              <span class="text-3xl md:text-4xl font-black tabular-nums" style="color:#ff5722">{{ String(unit).padStart(2,'0') }}</span>
              <span class="text-xs font-semibold uppercase tracking-widest mt-1" style="color:#8aad8e">{{ label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Activity Tabs ────────────────────────────────────────────────────── -->
    <section id="activities" class="py-24" style="background-color:#111f14">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="reveal mb-12">
          <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:#ff5722">Choose your challenge</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Active Expeditions</h2>
        </div>

        <!-- Tab row -->
        <div class="flex gap-1 mb-10 p-1 rounded-xl w-fit border" style="background-color:rgba(10,26,14,0.6);border-color:rgba(34,197,94,0.15)">
          <button
            v-for="act in activities"
            :key="act.id"
            @click="switchTab(act.id)"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
            :style="activeActivity === act.id
              ? 'background-color:#ff5722;color:#ffffff'
              : 'color:#8aad8e;background:transparent'"
          >
            <span>{{ act.icon }}</span>
            <span class="hidden sm:inline">{{ act.label }}</span>
          </button>
        </div>

        <!-- Trip cards grid -->
        <div class="trips-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="trip in trips[activeActivity]"
            :key="trip.name"
            class="trip-card group rounded-2xl overflow-hidden border hover:border-[#ff5722]/40 transition-all duration-300"
            style="background-color:#141f17;border-color:rgba(34,197,94,0.15)"
          >
            <!-- Image -->
            <div class="relative h-52 overflow-hidden">
              <img :src="trip.image" :alt="trip.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div class="absolute inset-0 bg-gradient-to-t from-[#141f17] via-transparent to-transparent"/>
              <!-- Difficulty badge -->
              <span
                class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold border"
                :class="[difficultyConfig[trip.difficulty].bg, difficultyConfig[trip.difficulty].color]"
              >{{ trip.difficulty }}</span>
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3 class="text-lg font-bold mb-1">{{ trip.name }}</h3>
              <div class="flex items-center gap-4 text-sm mb-4" style="color:#8aad8e">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/></svg>
                  {{ trip.days }} days
                </span>
                <span class="font-bold text-base text-[#f1f5f0]">${{ trip.price.toLocaleString() }}</span>
              </div>

              <!-- Spots remaining -->
              <div class="mb-4">
                <div class="flex justify-between text-xs mb-1.5" style="color:#8aad8e">
                  <span>Spots remaining</span>
                  <span class="font-bold" :class="trip.spots <= 4 ? 'text-red-400' : trip.spots <= 8 ? 'text-orange-400' : 'text-[#22c55e]'">
                    {{ trip.spots }} / {{ trip.totalSpots }}
                  </span>
                </div>
                <div class="h-1.5 w-full rounded-full overflow-hidden" style="background-color:rgba(34,197,94,0.12)">
                  <div
                    class="spots-bar-fill h-full rounded-full"
                    :data-width="spotsPercent(trip)"
                    :style="`width:0%;background-color:${trip.spots <= 4 ? '#ef4444' : trip.spots <= 8 ? '#f97316' : '#22c55e'}`"
                  />
                </div>
              </div>

              <!-- CTA -->
              <button
                @click="openBooking(trip)"
                class="w-full py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                style="background-color:#ff5722;color:#ffffff"
              >
                Reserve Spot
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Build Your Adventure ─────────────────────────────────────────────── -->
    <section id="builder" class="py-24" style="background-color:#0a1a0e">
      <div class="max-w-3xl mx-auto px-6">
        <div class="reveal text-center mb-12">
          <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:#ff5722">Your perfect trip</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Build Your Adventure</h2>
        </div>

        <!-- Step indicator -->
        <div class="flex items-center justify-center gap-3 mb-10">
          <div v-for="s in 3" :key="s" class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300"
              :style="currentStep >= s
                ? 'background-color:#ff5722;color:#ffffff'
                : 'background-color:#141f17;color:#8aad8e;border:1px solid rgba(34,197,94,0.2)'"
            >{{ s }}</div>
            <div v-if="s < 3" class="w-12 h-0.5 transition-colors duration-300" :style="currentStep > s ? 'background-color:#ff5722' : 'background-color:rgba(34,197,94,0.2)'" />
          </div>
        </div>

        <!-- Step content -->
        <div class="rounded-2xl border p-8" style="background-color:#141f17;border-color:rgba(34,197,94,0.15)">

          <!-- Step 1: Activity -->
          <div v-if="currentStep === 1">
            <h3 class="text-xl font-bold mb-2">Choose your activity</h3>
            <p class="text-sm mb-6" style="color:#8aad8e">What kind of adventure are you looking for?</p>
            <div class="grid grid-cols-5 gap-3">
              <button
                v-for="act in activities"
                :key="act.id"
                @click="selectBuilderActivity(act.id)"
                class="flex flex-col items-center gap-2 py-4 px-2 rounded-xl border text-sm font-semibold transition-all duration-200 hover:scale-105"
                :style="builderActivity === act.id
                  ? 'background-color:rgba(255,87,34,0.15);border-color:#ff5722;color:#ff5722'
                  : 'background-color:rgba(10,26,14,0.5);border-color:rgba(34,197,94,0.15);color:#8aad8e'"
              >
                <span class="text-2xl">{{ act.icon }}</span>
                <span class="text-xs hidden sm:block">{{ act.label }}</span>
              </button>
            </div>
          </div>

          <!-- Step 2: Month -->
          <div v-else-if="currentStep === 2">
            <h3 class="text-xl font-bold mb-2">When do you want to go?</h3>
            <p class="text-sm mb-6" style="color:#8aad8e">Select your preferred departure month.</p>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(month, i) in months"
                :key="month"
                @click="selectedMonth = i"
                class="py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 hover:scale-105"
                :style="selectedMonth === i
                  ? 'background-color:rgba(255,87,34,0.15);border-color:#ff5722;color:#ff5722'
                  : 'background-color:rgba(10,26,14,0.5);border-color:rgba(34,197,94,0.15);color:#8aad8e'"
              >{{ month }}</button>
            </div>
          </div>

          <!-- Step 3: Group size -->
          <div v-else-if="currentStep === 3">
            <h3 class="text-xl font-bold mb-2">How many adventurers?</h3>
            <p class="text-sm mb-8" style="color:#8aad8e">Group discounts available for 4+ people.</p>
            <div class="flex items-center justify-center gap-6">
              <button
                @click="decrementGroup"
                class="w-12 h-12 rounded-full border font-black text-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                :style="groupSize > 1
                  ? 'border-color:#ff5722;color:#ff5722;background-color:rgba(255,87,34,0.1)'
                  : 'border-color:rgba(34,197,94,0.15);color:#8aad8e;opacity:0.4'"
              >−</button>
              <div class="text-center">
                <span class="text-6xl font-black" style="color:#ff5722">{{ groupSize }}</span>
                <p class="text-sm mt-1" style="color:#8aad8e">{{ groupSize === 1 ? 'person' : 'people' }}</p>
              </div>
              <button
                @click="incrementGroup"
                class="w-12 h-12 rounded-full border font-black text-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                :style="groupSize < 12
                  ? 'border-color:#ff5722;color:#ff5722;background-color:rgba(255,87,34,0.1)'
                  : 'border-color:rgba(34,197,94,0.15);color:#8aad8e;opacity:0.4'"
              >+</button>
            </div>
            <div class="mt-6 text-center text-sm" style="color:#8aad8e">
              <span v-if="groupSize >= 4" class="text-[#22c55e] font-semibold">✓ Group discount applied — 10% off!</span>
              <span v-else>Add {{ 4 - groupSize }} more to unlock group discount</span>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between mt-8">
            <button
              @click="prevStep"
              class="px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-white/5"
              :class="currentStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'"
              style="border-color:rgba(34,197,94,0.2);color:#8aad8e"
            >← Back</button>

            <div v-if="currentStep < 3">
              <button
                @click="nextStep"
                class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                style="background-color:#ff5722;color:#ffffff"
              >Continue →</button>
            </div>
            <div v-else class="flex flex-col items-end gap-2">
              <button
                @click="findTrips"
                class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                style="background-color:#ff5722;color:#ffffff"
              >Find matching trips →</button>
              <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-y-2">
                <p v-if="builderResult !== null" class="text-sm font-semibold" style="color:#22c55e">
                  ✓ {{ builderResult }} {{ builderResult === 1 ? 'trip matches' : 'trips match' }} your selection
                </p>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Guides ───────────────────────────────────────────────────────────── -->
    <section id="guides" class="py-24" style="background-color:#111f14">
      <div class="max-w-7xl mx-auto px-6">
        <div class="reveal mb-12">
          <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:#ff5722">World-class professionals</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Meet the Team</h2>
        </div>

        <div class="guides-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="guide in guides"
            :key="guide.name"
            class="guide-card group rounded-2xl overflow-hidden border hover:border-[#ff5722]/40 transition-all duration-300"
            style="background-color:#141f17;border-color:rgba(34,197,94,0.15)"
          >
            <!-- Photo -->
            <div class="relative h-48 overflow-hidden">
              <img :src="guide.photo" :alt="guide.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div class="absolute inset-0 bg-gradient-to-t from-[#141f17] to-transparent"/>
            </div>
            <!-- Info -->
            <div class="p-5">
              <h3 class="font-bold text-base">{{ guide.name }}</h3>
              <p class="text-sm mb-3" style="color:#ff5722">{{ guide.specialty }}</p>
              <div class="flex gap-4 text-xs mb-4" style="color:#8aad8e">
                <div>
                  <div class="font-black text-lg text-[#f1f5f0]">{{ guide.years }}</div>
                  <div>yrs exp</div>
                </div>
                <div>
                  <div class="font-black text-lg text-[#f1f5f0]">{{ guide.trips }}+</div>
                  <div>trips led</div>
                </div>
              </div>
              <blockquote class="text-xs italic border-l-2 pl-3" style="color:#8aad8e;border-color:#ff5722">
                "{{ guide.quote }}"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Stats row ────────────────────────────────────────────────────────── -->
    <section class="py-16 border-y" style="background-color:#0a1a0e;border-color:rgba(34,197,94,0.1)">
      <div class="max-w-4xl mx-auto px-6">
        <div class="stats-counter-row grid grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-5xl font-black mb-1" style="color:#ff5722">{{ stats.guides }}+</div>
            <div class="text-sm font-semibold" style="color:#8aad8e">Expert Guides</div>
          </div>
          <div>
            <div class="text-5xl font-black mb-1" style="color:#ff5722">{{ stats.trips }}+</div>
            <div class="text-sm font-semibold" style="color:#8aad8e">Expeditions Run</div>
          </div>
          <div>
            <div class="text-5xl font-black mb-1" style="color:#ff5722">{{ stats.countries }}</div>
            <div class="text-sm font-semibold" style="color:#8aad8e">Countries Explored</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Safety & Gear ────────────────────────────────────────────────────── -->
    <section class="py-24" style="background-color:#111f14">
      <div class="max-w-6xl mx-auto px-6">
        <div class="reveal mb-12">
          <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:#ff5722">Zero compromise</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Safety & Gear</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- What's included -->
          <div class="rounded-2xl border p-8" style="background-color:#141f17;border-color:rgba(34,197,94,0.15)">
            <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
              <span class="text-[#22c55e]">✓</span> What's included
            </h3>
            <ul class="space-y-4">
              <li v-for="item in [
                { icon: '🎒', text: 'Professional-grade gear & equipment' },
                { icon: '🪖', text: 'Full safety kit — harnesses, helmets, ropes' },
                { icon: '🧭', text: 'IFMGA-certified expert guide' },
                { icon: '📋', text: 'All permits & park access fees' },
                { icon: '🍽', text: 'Meals for the entire expedition' },
                { icon: '🏕', text: 'Premium camp accommodations' },
                { icon: '🚁', text: 'Emergency evacuation insurance' },
              ]" :key="item.text" class="flex items-start gap-3">
                <span class="text-lg shrink-0">{{ item.icon }}</span>
                <span class="text-sm" style="color:#8aad8e">{{ item.text }}</span>
              </li>
            </ul>
          </div>

          <!-- Fitness requirements -->
          <div class="rounded-2xl border p-8" style="background-color:#141f17;border-color:rgba(34,197,94,0.15)">
            <h3 class="text-xl font-bold mb-6">Fitness Requirements</h3>
            <div class="space-y-5">
              <div v-for="level in [
                { label: 'Beginner', desc: 'Light hiking background, good base fitness', fill: 25, color: '#22c55e' },
                { label: 'Moderate', desc: 'Regular cardio, some trail experience', fill: 50, color: '#eab308' },
                { label: 'Hard', desc: 'Strong endurance, multi-day trek experience', fill: 75, color: '#f97316' },
                { label: 'Extreme', desc: 'Elite fitness, prior mountaineering required', fill: 100, color: '#ef4444' },
              ]" :key="level.label">
                <div class="flex justify-between text-sm mb-1.5">
                  <span class="font-semibold">{{ level.label }}</span>
                  <span class="text-xs" style="color:#8aad8e">{{ level.desc }}</span>
                </div>
                <div class="h-2 w-full rounded-full overflow-hidden" style="background-color:rgba(34,197,94,0.1)">
                  <div class="h-full rounded-full" :style="`width:${level.fill}%;background-color:${level.color}`"/>
                </div>
              </div>
            </div>
            <div class="mt-6 p-4 rounded-xl border text-sm" style="background-color:rgba(255,87,34,0.08);border-color:rgba(255,87,34,0.25);color:#8aad8e">
              <p class="font-semibold text-[#ff5722] mb-1">Not sure which level fits?</p>
              Our guides will assess your fitness profile during onboarding and recommend the perfect expedition.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Testimonials ─────────────────────────────────────────────────────── -->
    <section id="community" class="py-24" style="background-color:#0a1a0e">
      <div class="max-w-7xl mx-auto px-6">
        <div class="reveal mb-12 text-center">
          <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:#ff5722">From the field</p>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">Adventurers speak</h2>
        </div>

        <div class="testimonials-grid grid gap-6 md:grid-cols-3">
          <div
            v-for="t in testimonials"
            :key="t.name"
            class="testimonial-card p-7 rounded-2xl border hover:border-[#ff5722]/30 transition-all duration-300"
            style="background-color:#141f17;border-color:rgba(34,197,94,0.15)"
          >
            <!-- Stars -->
            <div class="flex gap-0.5 mb-4">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" viewBox="0 0 24 24" fill="#ff5722"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <blockquote class="text-sm leading-relaxed mb-6" style="color:#8aad8e">
              "{{ t.quote }}"
            </blockquote>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0" style="background-color:#ff5722;color:#ffffff">
                {{ t.avatar }}
              </div>
              <div>
                <div class="text-sm font-bold">{{ t.name }}</div>
                <div class="text-xs" style="color:#8aad8e">{{ t.trip }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Final CTA ─────────────────────────────────────────────────────────── -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80"
          alt="Surfer at sunset"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0" style="background:linear-gradient(to bottom, rgba(10,26,14,0.75), rgba(10,26,14,0.88))"/>
      </div>
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color:#ff5722">Don't wait for a sign</p>
        <h2 class="text-5xl md:text-7xl font-black tracking-tighter mb-6" style="color:#f1f5f0">
          Your next expedition<br/>awaits.
        </h2>
        <p class="text-lg mb-10" style="color:#8aad8e">
          Limited spots. Extreme destinations. No excuses.
        </p>
        <button
          class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-lg text-white transition-all hover:opacity-90 active:scale-95 shadow-2xl"
          style="background-color:#ff5722;box-shadow:0 0 40px rgba(255,87,34,0.35)"
        >
          Browse All Expeditions
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </section>

    <!-- ─── Footer ────────────────────────────────────────────────────────────── -->
    <footer class="border-t py-12" style="border-color:rgba(34,197,94,0.1);background-color:#0a1a0e">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <!-- Logo -->
          <div class="flex items-center gap-2.5">
            <svg class="w-6 h-6 text-[#ff5722]" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2L4 26h5l7-14 7 14h5L16 2z"/>
            </svg>
            <span class="text-lg font-black tracking-widest">SUMMIT</span>
          </div>

          <!-- Links -->
          <div class="grid grid-cols-2 md:flex gap-6 md:gap-10 text-sm" style="color:#8aad8e">
            <div>
              <p class="font-bold text-[#f1f5f0] mb-2 text-xs uppercase tracking-wider">Adventures</p>
              <div class="space-y-1.5">
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Hiking</a>
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Surfing</a>
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Climbing</a>
              </div>
            </div>
            <div>
              <p class="font-bold text-[#f1f5f0] mb-2 text-xs uppercase tracking-wider">Company</p>
              <div class="space-y-1.5">
                <a href="#" class="block hover:text-[#ff5722] transition-colors">About</a>
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Guides</a>
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Safety</a>
              </div>
            </div>
            <div>
              <p class="font-bold text-[#f1f5f0] mb-2 text-xs uppercase tracking-wider">Support</p>
              <div class="space-y-1.5">
                <a href="#" class="block hover:text-[#ff5722] transition-colors">FAQ</a>
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Insurance</a>
                <a href="#" class="block hover:text-[#ff5722] transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style="border-color:rgba(34,197,94,0.08);color:#8aad8e">
          <p>© 2025 Summit Expeditions. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-[#ff5722] transition-colors">Privacy</a>
            <a href="#" class="hover:text-[#ff5722] transition-colors">Terms</a>
            <a href="#" class="hover:text-[#ff5722] transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- ─── Booking Modal ─────────────────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-all duration-150"
      leave-to-class="opacity-0"
    >
      <div v-if="bookingModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="background-color:rgba(10,26,14,0.85);backdrop-filter:blur(6px)">
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95 translate-y-4"
        >
          <div v-if="bookingModal" class="w-full max-w-md rounded-2xl border p-7 shadow-2xl" style="background-color:#141f17;border-color:rgba(34,197,94,0.2)">
            <!-- Close -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold">Reserve Your Spot</h3>
                <p class="text-sm mt-0.5" style="color:#8aad8e">{{ bookingTrip?.name }}</p>
              </div>
              <button @click="closeModal" class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style="color:#8aad8e">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/></svg>
              </button>
            </div>

            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 scale-95"
            >
              <div v-if="bookingSuccess" class="text-center py-8">
                <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl" style="background-color:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3)">✓</div>
                <h4 class="text-lg font-bold mb-2">You're on the list!</h4>
                <p class="text-sm" style="color:#8aad8e">We'll send your confirmation and next steps within 24 hours.</p>
                <button @click="closeModal" class="mt-6 px-5 py-2.5 rounded-lg text-sm font-bold text-white" style="background-color:#ff5722">Close</button>
              </div>
              <form v-else @submit.prevent="submitBooking" class="flex flex-col gap-4">
                <div>
                  <label class="block text-xs font-semibold mb-1.5" style="color:#8aad8e">Full name</label>
                  <input
                    v-model="bookingName"
                    type="text"
                    placeholder="Your name"
                    required
                    class="w-full px-4 py-3 rounded-lg border text-sm text-[#f1f5f0] placeholder-[#8aad8e]/40 outline-none transition-colors focus:border-[#ff5722]"
                    style="background-color:rgba(10,26,14,0.7);border-color:rgba(34,197,94,0.2)"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold mb-1.5" style="color:#8aad8e">Email address</label>
                  <input
                    v-model="bookingEmail"
                    type="email"
                    placeholder="you@email.com"
                    required
                    class="w-full px-4 py-3 rounded-lg border text-sm text-[#f1f5f0] placeholder-[#8aad8e]/40 outline-none transition-colors focus:border-[#ff5722]"
                    style="background-color:rgba(10,26,14,0.7);border-color:rgba(34,197,94,0.2)"
                  />
                </div>
                <div class="flex items-center justify-between p-4 rounded-xl border" style="background-color:rgba(255,87,34,0.08);border-color:rgba(255,87,34,0.2)">
                  <div>
                    <p class="text-sm font-bold">{{ bookingTrip?.name }}</p>
                    <p class="text-xs" style="color:#8aad8e">{{ bookingTrip?.days }} days · {{ bookingTrip?.difficulty }}</p>
                  </div>
                  <span class="text-lg font-black" style="color:#ff5722">${{ bookingTrip?.price.toLocaleString() }}</span>
                </div>
                <button type="submit" class="w-full py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 active:scale-95" style="background-color:#ff5722">
                  Confirm Reservation →
                </button>
                <p class="text-center text-xs" style="color:#8aad8e">No payment required now. We'll contact you to confirm.</p>
              </form>
            </Transition>
          </div>
        </Transition>
      </div>
    </Transition>

  </div>
</template>
