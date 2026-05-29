<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Experience {
  title: string
  location: string
  nights: number
  price: number
  badge: 'Bestseller' | 'New' | 'Exclusive'
  image: string
  liked: boolean
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const mobileOpen = ref(false)
const navScrolled = ref(false)

// ─── Booking form ─────────────────────────────────────────────────────────────
const fromCity    = ref('New York, JFK')
const toCity      = ref('')
const checkIn     = ref('')
const checkOut    = ref('')
const travelClass = ref<'Economy' | 'Business' | 'First'>('Business')
const showDestDropdown   = ref(false)
const showTravelersMenu  = ref(false)
const showClassMenu      = ref(false)
const selectedTravelers  = ref('2 Adults')

const travelersOptions = ['1 Adult', '2 Adults', '3 Adults', 'Family (2+2)', 'Group (5+)']
const classOptions     = ['Economy', 'Business', 'First'] as const

const suggestedDestinations = [
  { city: 'Santorini', country: 'Greece', emoji: '🇬🇷' },
  { city: 'Kyoto', country: 'Japan', emoji: '🇯🇵' },
  { city: 'Amalfi Coast', country: 'Italy', emoji: '🇮🇹' },
  { city: 'Maldives', country: 'Maldives', emoji: '🇲🇻' },
  { city: 'Bali', country: 'Indonesia', emoji: '🇮🇩' },
]

function selectDestination(dest: { city: string; country: string }) {
  toCity.value = `${dest.city}, ${dest.country}`
  showDestDropdown.value = false
}

function selectTravelers(option: string) {
  selectedTravelers.value = option
  showTravelersMenu.value = false
}

function selectClass(option: 'Economy' | 'Business' | 'First') {
  travelClass.value = option
  showClassMenu.value = false
}

// ─── Experiences ──────────────────────────────────────────────────────────────
const experiences = reactive<Experience[]>([
  {
    title: 'Santorini Sunset Retreat',
    location: 'Santorini, Greece',
    nights: 7,
    price: 4200,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    liked: false,
  },
  {
    title: 'Kyoto Cherry Blossom',
    location: 'Kyoto, Japan',
    nights: 5,
    price: 3800,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    liked: false,
  },
  {
    title: 'Amalfi Private Villa',
    location: 'Amalfi Coast, Italy',
    nights: 10,
    price: 7500,
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80',
    liked: true,
  },
  {
    title: 'Swiss Alpine Escape',
    location: 'Zermatt, Switzerland',
    nights: 6,
    price: 5100,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    liked: false,
  },
  {
    title: 'Bali Wellness Retreat',
    location: 'Ubud, Bali',
    nights: 8,
    price: 2900,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    liked: false,
  },
])

function toggleLike(index: number) {
  experiences[index].liked = !experiences[index].liked
}

// ─── Drag-to-scroll ───────────────────────────────────────────────────────────
const cardsTrack = useTemplateRef<HTMLElement>('cardsTrack')
let isDragging  = false
let startX      = 0
let scrollLeft  = 0

function onDragStart(e: MouseEvent) {
  if (!cardsTrack.value) return
  isDragging = true
  startX     = e.pageX - cardsTrack.value.offsetLeft
  scrollLeft = cardsTrack.value.scrollLeft
  cardsTrack.value.style.cursor = 'grabbing'
}

function onDragMove(e: MouseEvent) {
  if (!isDragging || !cardsTrack.value) return
  e.preventDefault()
  const x    = e.pageX - cardsTrack.value.offsetLeft
  const walk = (x - startX) * 1.5
  cardsTrack.value.scrollLeft = scrollLeft - walk
}

function onDragEnd() {
  isDragging = false
  if (cardsTrack.value) cardsTrack.value.style.cursor = 'grab'
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
const newsletterEmail   = ref('')
const newsletterSuccess = ref(false)

function submitNewsletter() {
  if (!newsletterEmail.value) return
  newsletterSuccess.value = true
  newsletterEmail.value = ''
}

// ─── Why Horizon counters ─────────────────────────────────────────────────────
const counters = reactive({ destinations: 0, concierge: 0, savings: 0, travelers: 0 })

// ─── Template refs for GSAP ────────────────────────────────────────────────────
const heroImg    = useTemplateRef<HTMLElement>('heroImg')
const heroText   = useTemplateRef<HTMLElement>('heroText')
const heroForm   = useTemplateRef<HTMLElement>('heroForm')
const ctaSection = useTemplateRef<HTMLElement>('ctaSection')

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Nav scroll watcher
  window.addEventListener('scroll', () => {
    navScrolled.value = window.scrollY > 60
  })

  // Hero image subtle parallax
  if (heroImg.value) {
    gsap.to(heroImg.value, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImg.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // Hero text: elegant fade from blur
  if (heroText.value) {
    gsap.fromTo(
      heroText.value.querySelectorAll('.hero-line'),
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3,
      }
    )
  }

  // Booking form slides in from right
  if (heroForm.value) {
    gsap.fromTo(
      heroForm.value,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
    )
  }

  // Trust bar fade in
  gsap.fromTo(
    '.trust-item',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.trust-bar', start: 'top 85%' },
    }
  )

  // Experience cards stagger reveal
  gsap.fromTo(
    '.exp-card',
    { opacity: 0, y: 50, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.exp-section', start: 'top 80%' },
    }
  )

  // CTA text reveal
  if (ctaSection.value) {
    gsap.fromTo(
      ctaSection.value.querySelectorAll('.cta-line'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaSection.value, start: 'top 70%' },
      }
    )
  }

  // Why Horizon feature cards
  gsap.fromTo(
    '.why-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.why-section', start: 'top 80%' },
    }
  )

  // Counter animations
  ScrollTrigger.create({
    trigger: '.why-section',
    start: 'top 75%',
    once: true,
    onEnter() {
      gsap.to(counters, {
        destinations: 180,
        concierge: 24,
        savings: 15,
        travelers: 40000,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {},
      })
    },
  })

  // Testimonial cards
  gsap.fromTo(
    '.testimonial-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%' },
    }
  )

  // Newsletter section
  gsap.fromTo(
    '.newsletter-section',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.newsletter-section', start: 'top 85%' },
    }
  )
})
</script>

<template>
  <div class="min-h-screen" style="background: #faf9f6; color: #1a1a1a; font-family: system-ui, sans-serif;">

    <!-- ─── NAVBAR ──────────────────────────────────────────────────────────── -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="navScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between" style="height:72px">
        <!-- Logo -->
        <a href="#" class="font-serif text-2xl tracking-widest font-semibold" style="color:#1a1a1a; letter-spacing:0.25em;">
          HORIZON
        </a>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-10">
          <a v-for="link in ['Experiences','Destinations','About','Contact']" :key="link"
            href="#"
            class="text-sm tracking-wide transition-colors duration-200 hover:opacity-60"
            style="color:#1a1a1a;"
          >
            {{ link }}
          </a>
        </div>

        <!-- Right side -->
        <div class="hidden lg:flex items-center gap-5">
          <!-- Language -->
          <button class="flex items-center gap-1.5 text-sm" style="color:#6b6b6b;">
            <span class="text-base leading-none">🇬🇧</span>
            <span class="tracking-wide">EN</span>
            <svg class="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- My Bookings -->
          <button
            class="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide border transition-all duration-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
            style="border-color:#1a1a1a; color:#1a1a1a;"
          >
            My bookings
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button class="lg:hidden flex flex-col gap-1.5 p-2" @click="mobileOpen = !mobileOpen">
          <span class="block h-0.5 w-6 transition-all duration-300" style="background:#1a1a1a;"
            :class="mobileOpen ? 'rotate-45 translate-y-2' : ''" />
          <span class="block h-0.5 w-6 transition-all duration-300" style="background:#1a1a1a;"
            :class="mobileOpen ? 'opacity-0' : ''" />
          <span class="block h-0.5 w-6 transition-all duration-300" style="background:#1a1a1a;"
            :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''" />
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileOpen" class="lg:hidden border-t px-6 py-6 space-y-5 bg-white" style="border-color:#e8e6e1;">
          <a v-for="link in ['Experiences','Destinations','About','Contact']" :key="link"
            href="#" class="block text-base tracking-wide" style="color:#1a1a1a;"
          >
            {{ link }}
          </a>
          <button class="w-full py-3 rounded-full border text-sm font-medium" style="border-color:#1a1a1a; color:#1a1a1a;">
            My bookings
          </button>
        </div>
      </Transition>
    </nav>

    <!-- ─── HERO ──────────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">

      <!-- Left: full-bleed image (60%) -->
      <div class="relative lg:w-[60%] h-72 lg:h-screen overflow-hidden">
        <div ref="heroImg" class="absolute inset-0" style="top:-10%; height:120%">
          <img
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80"
            alt="Maldives overwater bungalow"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
          <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 lg:bg-none" />
        </div>

        <!-- Floating badge -->
        <div class="absolute bottom-8 left-8 hidden lg:flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3.5 shadow-xl">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:#c9a96e;">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-xs font-medium tracking-wide" style="color:#6b6b6b;">RATED #1 LUXURY TRAVEL</p>
            <p class="text-sm font-semibold" style="color:#1a1a1a;">4.9 ★ from 12,400 reviews</p>
          </div>
        </div>
      </div>

      <!-- Right: white panel (40%) -->
      <div class="lg:w-[40%] bg-white flex items-center min-h-screen pt-24 lg:pt-0">
        <div class="w-full px-8 lg:px-12 xl:px-16 py-12">

          <!-- Text -->
          <div ref="heroText" class="mb-10">
            <p class="hero-line text-xs tracking-[0.3em] font-medium mb-4" style="color:#c9a96e;">
              LUXURY TRAVEL, REIMAGINED
            </p>
            <h1 class="hero-line font-serif text-4xl xl:text-5xl leading-tight mb-5" style="color:#1a1a1a;">
              Your next chapter<br />begins here
            </h1>
            <p class="hero-line text-base leading-relaxed" style="color:#6b6b6b; max-width:380px;">
              Handcrafted journeys to the world's most extraordinary places. Every detail, perfectly curated.
            </p>
          </div>

          <!-- Booking form card -->
          <div ref="heroForm" class="rounded-2xl shadow-2xl p-6 mb-6" style="background:#fff; box-shadow:0 20px 60px rgba(0,0,0,0.1);">
            <p class="text-xs tracking-[0.2em] font-semibold mb-5" style="color:#c9a96e;">PLAN YOUR JOURNEY</p>

            <!-- From -->
            <div class="mb-3">
              <label class="block text-xs tracking-wide font-medium mb-1.5" style="color:#6b6b6b;">FROM</label>
              <div class="relative">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                <input
                  v-model="fromCity"
                  type="text"
                  placeholder="Departure city or airport"
                  class="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                  style="background:#faf9f6; border:1.5px solid #e8e6e1; color:#1a1a1a; --tw-ring-color:#c9a96e40;"
                />
              </div>
            </div>

            <!-- To -->
            <div class="mb-3 relative">
              <label class="block text-xs tracking-wide font-medium mb-1.5" style="color:#6b6b6b;">TO</label>
              <div class="relative">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                </svg>
                <input
                  v-model="toCity"
                  type="text"
                  placeholder="Where do you dream of going?"
                  class="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style="background:#faf9f6; border:1.5px solid #e8e6e1; color:#1a1a1a;"
                  @focus="showDestDropdown = true"
                  @blur="setTimeout(() => { showDestDropdown = false }, 180)"
                />
              </div>

              <!-- Destination dropdown -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
              >
                <div
                  v-if="showDestDropdown"
                  class="absolute left-0 right-0 top-full mt-1.5 rounded-xl shadow-2xl z-20 overflow-hidden"
                  style="background:#fff; border:1px solid #e8e6e1;"
                >
                  <div class="px-3 py-2 border-b text-xs tracking-wider font-semibold" style="border-color:#e8e6e1; color:#6b6b6b;">
                    POPULAR DESTINATIONS
                  </div>
                  <button
                    v-for="dest in suggestedDestinations"
                    :key="dest.city"
                    class="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 hover:bg-zinc-50"
                    style="color:#1a1a1a;"
                    @mousedown.prevent="selectDestination(dest)"
                  >
                    <span class="text-xl leading-none">{{ dest.emoji }}</span>
                    <div>
                      <span class="font-medium">{{ dest.city }}</span>
                      <span class="ml-1.5" style="color:#6b6b6b;">{{ dest.country }}</span>
                    </div>
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Check-in / Check-out -->
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label class="block text-xs tracking-wide font-medium mb-1.5" style="color:#6b6b6b;">CHECK-IN</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                  </svg>
                  <input
                    v-model="checkIn"
                    type="date"
                    class="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none"
                    style="background:#faf9f6; border:1.5px solid #e8e6e1; color:#1a1a1a;"
                  />
                </div>
              </div>
              <div>
                <label class="block text-xs tracking-wide font-medium mb-1.5" style="color:#6b6b6b;">CHECK-OUT</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                  </svg>
                  <input
                    v-model="checkOut"
                    type="date"
                    class="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none"
                    style="background:#faf9f6; border:1.5px solid #e8e6e1; color:#1a1a1a;"
                  />
                </div>
              </div>
            </div>

            <!-- Travelers + Class -->
            <div class="grid grid-cols-2 gap-3 mb-5">
              <!-- Travelers dropdown -->
              <div class="relative">
                <label class="block text-xs tracking-wide font-medium mb-1.5" style="color:#6b6b6b;">TRAVELERS</label>
                <button
                  class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all duration-200"
                  style="background:#faf9f6; border:1.5px solid #e8e6e1; color:#1a1a1a;"
                  @click="showTravelersMenu = !showTravelersMenu; showClassMenu = false"
                >
                  <span>{{ selectedTravelers }}</span>
                  <svg class="w-4 h-4 opacity-50 transition-transform duration-200" :class="showTravelersMenu ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-150"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <div
                    v-if="showTravelersMenu"
                    class="absolute left-0 right-0 top-full mt-1 rounded-xl shadow-2xl z-20 overflow-hidden"
                    style="background:#fff; border:1px solid #e8e6e1;"
                  >
                    <button
                      v-for="opt in travelersOptions"
                      :key="opt"
                      class="w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-zinc-50"
                      :class="selectedTravelers === opt ? 'font-semibold' : ''"
                      :style="selectedTravelers === opt ? 'color:#c9a96e' : 'color:#1a1a1a'"
                      @click="selectTravelers(opt)"
                    >
                      {{ opt }}
                    </button>
                  </div>
                </Transition>
              </div>

              <!-- Class dropdown -->
              <div class="relative">
                <label class="block text-xs tracking-wide font-medium mb-1.5" style="color:#6b6b6b;">CLASS</label>
                <button
                  class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all duration-200"
                  style="background:#faf9f6; border:1.5px solid #e8e6e1; color:#1a1a1a;"
                  @click="showClassMenu = !showClassMenu; showTravelersMenu = false"
                >
                  <span>{{ travelClass }}</span>
                  <svg class="w-4 h-4 opacity-50 transition-transform duration-200" :class="showClassMenu ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-150"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <div
                    v-if="showClassMenu"
                    class="absolute left-0 right-0 top-full mt-1 rounded-xl shadow-2xl z-20 overflow-hidden"
                    style="background:#fff; border:1px solid #e8e6e1;"
                  >
                    <button
                      v-for="opt in classOptions"
                      :key="opt"
                      class="w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-zinc-50"
                      :class="travelClass === opt ? 'font-semibold' : ''"
                      :style="travelClass === opt ? 'color:#c9a96e' : 'color:#1a1a1a'"
                      @click="selectClass(opt)"
                    >
                      {{ opt }}
                    </button>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Search CTA -->
            <button
              class="w-full py-4 rounded-xl text-sm font-semibold tracking-widest text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
              style="background:#1a1a1a; letter-spacing:0.15em;"
            >
              SEARCH EXPERIENCES
            </button>
          </div>

          <!-- Browse link -->
          <p class="text-sm text-center" style="color:#6b6b6b;">
            Or
            <a href="#experiences" class="font-medium ml-1 transition-colors duration-200 hover:opacity-60" style="color:#1a1a1a;">
              browse our curated experiences →
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- ─── TRUST BAR ──────────────────────────────────────────────────────────── -->
    <section class="trust-bar border-y py-10 px-6" style="border-color:#e8e6e1;">
      <div class="max-w-5xl mx-auto">
        <p class="text-center text-xs tracking-[0.3em] font-medium mb-8" style="color:#6b6b6b;">AS FEATURED IN</p>
        <div class="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          <span v-for="pub in ['Forbes', 'Condé Nast Traveler', 'Travel+Leisure', 'Vogue', 'The Times']" :key="pub"
            class="trust-item font-serif text-lg font-semibold tracking-wide transition-opacity duration-200 hover:opacity-40 cursor-default select-none"
            style="color:#c9a96e; opacity:0.65;"
          >
            {{ pub }}
          </span>
        </div>
      </div>
    </section>

    <!-- ─── CURATED EXPERIENCES ────────────────────────────────────────────────── -->
    <section id="experiences" class="exp-section py-24 px-6 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-xs tracking-[0.3em] font-medium mb-3" style="color:#c9a96e;">CURATED FOR YOU</p>
            <h2 class="font-serif text-4xl lg:text-5xl" style="color:#1a1a1a;">Handpicked<br />experiences</h2>
          </div>
          <a href="#" class="hidden lg:flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-60" style="color:#1a1a1a;">
            View all
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>

        <!-- Cards track (drag-to-scroll) -->
        <div
          ref="cardsTrack"
          class="flex gap-6 overflow-x-auto pb-4 select-none"
          style="cursor:grab; scrollbar-width:none; -ms-overflow-style:none;"
          @mousedown="onDragStart"
          @mousemove="onDragMove"
          @mouseup="onDragEnd"
          @mouseleave="onDragEnd"
        >
          <div
            v-for="(exp, i) in experiences"
            :key="exp.title"
            class="exp-card flex-none w-72 lg:w-80 rounded-2xl overflow-hidden group"
            style="background:#fff; box-shadow:0 4px 24px rgba(0,0,0,0.07);"
          >
            <!-- Image -->
            <div class="relative h-52 overflow-hidden">
              <img
                :src="exp.image"
                :alt="exp.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <!-- Badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  :style="exp.badge === 'Bestseller' ? 'background:#c9a96e; color:#fff;'
                        : exp.badge === 'Exclusive' ? 'background:#1a1a1a; color:#fff;'
                        : 'background:#fff; color:#1a1a1a;'"
                >
                  {{ exp.badge }}
                </span>
              </div>

              <!-- Heart -->
              <button
                class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style="background:rgba(255,255,255,0.9);"
                @click.stop="toggleLike(i)"
              >
                <svg class="w-4 h-4 transition-colors duration-200" :fill="exp.liked ? '#ef4444' : 'none'" viewBox="0 0 24 24" :stroke="exp.liked ? '#ef4444' : '#1a1a1a'" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-5">
              <p class="text-xs tracking-wider font-medium mb-1.5" style="color:#6b6b6b;">{{ exp.location }}</p>
              <h3 class="font-serif text-lg font-medium mb-3 leading-snug" style="color:#1a1a1a;">{{ exp.title }}</h3>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs" style="color:#6b6b6b;">{{ exp.nights }} nights</p>
                  <p class="text-base font-semibold mt-0.5" style="color:#1a1a1a;">
                    from <span style="color:#c9a96e;">${{ exp.price.toLocaleString() }}</span>
                    <span class="text-xs font-normal" style="color:#6b6b6b;">/person</span>
                  </p>
                </div>
                <button
                  class="px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:shadow-md"
                  style="background:#1a1a1a; color:#fff;"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll hint -->
        <p class="text-center text-xs mt-6 tracking-wide" style="color:#6b6b6b;">
          ← Drag to explore more →
        </p>
      </div>
    </section>

    <!-- ─── IMMERSIVE CTA ─────────────────────────────────────────────────────── -->
    <section
      ref="ctaSection"
      class="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image:url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80');"
      />
      <div class="absolute inset-0" style="background:#0f1117; opacity:0.62;" />

      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="cta-line text-xs tracking-[0.4em] font-medium mb-6" style="color:#c9a96e;">HORIZON ORIGINALS</p>
        <h2 class="cta-line font-serif text-5xl lg:text-7xl text-white leading-tight mb-6">
          Ready for<br />extraordinary?
        </h2>
        <p class="cta-line text-lg lg:text-xl leading-relaxed mb-10" style="color:rgba(255,255,255,0.72);">
          Every journey we craft is a story<br />waiting to be told.
        </p>
        <a
          href="#"
          class="cta-line inline-flex items-center gap-3 px-10 py-4 rounded-full font-medium text-sm tracking-widest transition-all duration-300 hover:gap-5 hover:shadow-2xl hover:shadow-black/30"
          style="background:#c9a96e; color:#fff; letter-spacing:0.15em;"
        >
          START PLANNING
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- ─── WHY HORIZON ────────────────────────────────────────────────────────── -->
    <section class="why-section py-28 px-6" style="background:#faf9f6;">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <p class="text-xs tracking-[0.3em] font-medium mb-4" style="color:#c9a96e;">THE HORIZON DIFFERENCE</p>
          <h2 class="font-serif text-4xl lg:text-5xl" style="color:#1a1a1a;">Why discerning<br />travelers choose us</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Curated Only -->
          <div class="why-card text-center px-6 py-8 rounded-2xl bg-white" style="box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style="background:#faf9f6;">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#c9a96e" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl mb-3" style="color:#1a1a1a;">Curated Only</h3>
            <p class="text-sm leading-relaxed" style="color:#6b6b6b;">
              Every property, guide, and experience is personally vetted by our travel editors.
            </p>
            <p class="mt-5 text-3xl font-serif font-semibold" style="color:#c9a96e;">{{ Math.round(counters.destinations) }}+</p>
            <p class="text-xs tracking-wide" style="color:#6b6b6b;">destinations</p>
          </div>

          <!-- Concierge 24/7 -->
          <div class="why-card text-center px-6 py-8 rounded-2xl bg-white" style="box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style="background:#faf9f6;">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#c9a96e" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl mb-3" style="color:#1a1a1a;">Concierge 24/7</h3>
            <p class="text-sm leading-relaxed" style="color:#6b6b6b;">
              A dedicated travel specialist is always one call or message away, wherever you are.
            </p>
            <p class="mt-5 text-3xl font-serif font-semibold" style="color:#c9a96e;">{{ Math.round(counters.concierge) }}/7</p>
            <p class="text-xs tracking-wide" style="color:#6b6b6b;">always available</p>
          </div>

          <!-- Best Price Guarantee -->
          <div class="why-card text-center px-6 py-8 rounded-2xl bg-white" style="box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style="background:#faf9f6;">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#c9a96e" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl mb-3" style="color:#1a1a1a;">Best Price Guarantee</h3>
            <p class="text-sm leading-relaxed" style="color:#6b6b6b;">
              Find a lower price within 24 hours and we'll match it — no questions asked.
            </p>
            <p class="mt-5 text-3xl font-serif font-semibold" style="color:#c9a96e;">{{ Math.round(counters.savings) }}%</p>
            <p class="text-xs tracking-wide" style="color:#6b6b6b;">avg. savings</p>
          </div>

          <!-- Sustainable Travel -->
          <div class="why-card text-center px-6 py-8 rounded-2xl bg-white" style="box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style="background:#faf9f6;">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#c9a96e" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.5 15.28v-.251c0-.463-.286-.834-.652-.894a2.25 2.25 0 01-1.727-2.38l.123-.74c.09-.55-.232-1.082-.74-1.261l-1.994-.705a1.125 1.125 0 01-.748-.988V7.5"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl mb-3" style="color:#1a1a1a;">Sustainable Travel</h3>
            <p class="text-sm leading-relaxed" style="color:#6b6b6b;">
              Carbon-offset journeys and local community partnerships on every booking.
            </p>
            <p class="mt-5 text-3xl font-serif font-semibold" style="color:#c9a96e;">{{ Math.round(counters.travelers / 1000).toLocaleString() }}k+</p>
            <p class="text-xs tracking-wide" style="color:#6b6b6b;">happy travelers</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── TESTIMONIALS ──────────────────────────────────────────────────────── -->
    <section class="testimonials-section py-28 px-6" style="background:#fff;">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-xs tracking-[0.3em] font-medium mb-4" style="color:#c9a96e;">STORIES FROM THE ROAD</p>
          <h2 class="font-serif text-4xl lg:text-5xl" style="color:#1a1a1a;">What our travelers say</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="testimonial-card rounded-2xl p-8" style="background:#faf9f6;">
            <div class="flex mb-5">
              <span v-for="i in 5" :key="i" class="text-base" style="color:#c9a96e;">★</span>
            </div>
            <blockquote class="font-serif text-lg leading-relaxed mb-6" style="color:#1a1a1a;">
              "Horizon turned our anniversary trip into something we'll speak about forever. Every single detail was immaculate. Our villa in Santorini felt like it was designed just for us."
            </blockquote>
            <div class="flex items-center gap-4 pt-5 border-t" style="border-color:#e8e6e1;">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"
                alt="Claire Whitmore"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p class="font-semibold text-sm" style="color:#1a1a1a;">Claire Whitmore</p>
                <p class="text-xs" style="color:#6b6b6b;">Santorini Retreat · 2025</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="testimonial-card rounded-2xl p-8" style="background:#faf9f6;">
            <div class="flex mb-5">
              <span v-for="i in 5" :key="i" class="text-base" style="color:#c9a96e;">★</span>
            </div>
            <blockquote class="font-serif text-lg leading-relaxed mb-6" style="color:#1a1a1a;">
              "From the first email to the final transfer home, everything was flawless. The Kyoto itinerary — the hidden temples, the tea ceremony — none of it would have been possible without them."
            </blockquote>
            <div class="flex items-center gap-4 pt-5 border-t" style="border-color:#e8e6e1;">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                alt="Marcus Chen"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p class="font-semibold text-sm" style="color:#1a1a1a;">Marcus Chen</p>
                <p class="text-xs" style="color:#6b6b6b;">Kyoto Cherry Blossom · 2025</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="testimonial-card rounded-2xl p-8" style="background:#faf9f6;">
            <div class="flex mb-5">
              <span v-for="i in 5" :key="i" class="text-base" style="color:#c9a96e;">★</span>
            </div>
            <blockquote class="font-serif text-lg leading-relaxed mb-6" style="color:#1a1a1a;">
              "The Swiss Alps itinerary was beyond anything I imagined. Private mountain hut dinners, a helicopter sunrise tour, and a guide who felt like a lifelong friend. Absolutely extraordinary."
            </blockquote>
            <div class="flex items-center gap-4 pt-5 border-t" style="border-color:#e8e6e1;">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                alt="Isabelle Fontaine"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p class="font-semibold text-sm" style="color:#1a1a1a;">Isabelle Fontaine</p>
                <p class="text-xs" style="color:#6b6b6b;">Swiss Alpine Escape · 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── NEWSLETTER ─────────────────────────────────────────────────────────── -->
    <section class="newsletter-section py-24 px-6" style="background:#faf9f6;">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-xs tracking-[0.3em] font-medium mb-4" style="color:#c9a96e;">THE HORIZON EDIT</p>
        <h2 class="font-serif text-4xl lg:text-5xl mb-4" style="color:#1a1a1a;">Stay inspired.</h2>
        <p class="text-base mb-10 leading-relaxed" style="color:#6b6b6b;">
          Join 40,000 travelers who receive our weekly edit — destination guides, insider tips, and exclusive early-access offers.
        </p>

        <Transition
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div v-if="!newsletterSuccess">
            <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" @submit.prevent="submitNewsletter">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="your@email.com"
                required
                class="flex-1 px-5 py-3.5 rounded-full text-sm outline-none"
                style="background:#fff; border:1.5px solid #e8e6e1; color:#1a1a1a;"
              />
              <button
                type="submit"
                class="px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest text-white transition-all duration-200 hover:opacity-80 whitespace-nowrap"
                style="background:#1a1a1a; letter-spacing:0.1em;"
              >
                SUBSCRIBE
              </button>
            </form>
            <p class="text-xs mt-4" style="color:#6b6b6b;">No spam. Unsubscribe anytime. We promise.</p>
          </div>
          <div v-else class="py-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style="background:#c9a96e20;">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#c9a96e" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <p class="font-serif text-xl mb-1" style="color:#1a1a1a;">Welcome to the Horizon community.</p>
            <p class="text-sm" style="color:#6b6b6b;">Your first edit arrives this Friday.</p>
          </div>
        </Transition>
      </div>
    </section>

    <!-- ─── FOOTER ────────────────────────────────────────────────────────────── -->
    <footer class="pt-20 pb-10 px-6" style="background:#0f1117; color:#fff;">
      <div class="max-w-7xl mx-auto">
        <!-- Top grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16 pb-16 border-b" style="border-color:rgba(255,255,255,0.1);">
          <!-- Brand -->
          <div class="col-span-2 lg:col-span-1">
            <p class="font-serif text-2xl tracking-[0.25em] font-semibold mb-4" style="color:#fff;">HORIZON</p>
            <p class="text-sm leading-relaxed mb-6" style="color:rgba(255,255,255,0.5);">
              Ultra-luxury travel experiences, handcrafted by the world's finest travel curators.
            </p>
            <div class="flex gap-4">
              <a v-for="social in ['Instagram', 'Twitter', 'LinkedIn']" :key="social"
                href="#"
                class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-zinc-900 text-xs font-semibold"
                style="border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.6);"
              >
                {{ social[0] }}
              </a>
            </div>
          </div>

          <!-- Explore -->
          <div>
            <p class="text-xs tracking-[0.25em] font-semibold mb-5" style="color:#c9a96e;">EXPLORE</p>
            <ul class="space-y-3">
              <li v-for="link in ['Destinations', 'Experiences', 'Private Travel', 'Honeymoons', 'Adventure']" :key="link">
                <a href="#" class="text-sm transition-colors duration-200 hover:text-white" style="color:rgba(255,255,255,0.5);">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <p class="text-xs tracking-[0.25em] font-semibold mb-5" style="color:#c9a96e;">COMPANY</p>
            <ul class="space-y-3">
              <li v-for="link in ['About Horizon', 'Our Story', 'Careers', 'Press', 'Partners']" :key="link">
                <a href="#" class="text-sm transition-colors duration-200 hover:text-white" style="color:rgba(255,255,255,0.5);">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <p class="text-xs tracking-[0.25em] font-semibold mb-5" style="color:#c9a96e;">SUPPORT</p>
            <ul class="space-y-3">
              <li v-for="link in ['Help Centre', 'Cancellation Policy', 'Travel Insurance', 'Contact Us', 'Accessibility']" :key="link">
                <a href="#" class="text-sm transition-colors duration-200 hover:text-white" style="color:rgba(255,255,255,0.5);">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p class="text-xs" style="color:rgba(255,255,255,0.35);">
            © 2025 Horizon Travel Ltd. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a v-for="link in ['Privacy Policy', 'Terms of Service', 'Cookie Settings']" :key="link"
              href="#"
              class="text-xs transition-colors duration-200 hover:text-white"
              style="color:rgba(255,255,255,0.35);"
            >
              {{ link }}
            </a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>
