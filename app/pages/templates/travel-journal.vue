<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Story {
  id: number
  title: string
  location: string
  region: string
  country: string
  readTime: number
  image: string
  saved: boolean
}

interface RegionCard {
  id: number
  title: string
  location: string
  region: string
  country: string
  readTime: number
  image: string
}

// ─── Typewriter cycling ───────────────────────────────────────────────────────
const cities = ['Kyoto', 'Marrakech', 'Lisbon', 'Patagonia', 'Oslo']
const cityIndex = ref(0)
const currentCity = ref(cities[0])
const cityVisible = ref(true)
let cityInterval: ReturnType<typeof setInterval> | null = null

function cycleCity() {
  cityVisible.value = false
  setTimeout(() => {
    cityIndex.value = (cityIndex.value + 1) % cities.length
    currentCity.value = cities[cityIndex.value]
    cityVisible.value = true
  }, 350)
}

// ─── Reading progress bar ─────────────────────────────────────────────────────
const readingProgress = ref(0)

function updateProgress() {
  const el = document.documentElement
  const scrolled = el.scrollTop
  const total = el.scrollHeight - el.clientHeight
  readingProgress.value = total > 0 ? (scrolled / total) * 100 : 0
}

// ─── Stories data ─────────────────────────────────────────────────────────────
const stories = reactive<Story[]>([
  {
    id: 1,
    title: 'Chasing Sunsets on the Caldera Edge',
    location: 'Santorini',
    region: 'Europe',
    country: 'Greece',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    saved: false,
  },
  {
    id: 2,
    title: 'Lost in the Medina: 48 Hours in Marrakech',
    location: 'Morocco',
    region: 'Africa',
    country: 'Morocco',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&w=600&q=80',
    saved: false,
  },
  {
    id: 3,
    title: 'The Northern Lights: A Photographer\'s Quest',
    location: 'Iceland',
    region: 'Europe',
    country: 'Iceland',
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80',
    saved: false,
  },
  {
    id: 4,
    title: 'Rice Terraces and Inner Peace',
    location: 'Bali',
    region: 'Asia',
    country: 'Indonesia',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    saved: false,
  },
  {
    id: 5,
    title: 'Driving the Most Beautiful Road in Italy',
    location: 'Amalfi',
    region: 'Europe',
    country: 'Italy',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80',
    saved: false,
  },
  {
    id: 6,
    title: 'Dawn Balloon Flight Over Fairy Chimneys',
    location: 'Cappadocia',
    region: 'Asia',
    country: 'Turkey',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
    saved: false,
  },
])

function toggleSave(story: Story) {
  story.saved = !story.saved
}

// ─── Region filter ────────────────────────────────────────────────────────────
const regions = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania']
const activeRegion = ref('Europe')

const regionCards = computed<RegionCard[]>(() => {
  const map: Record<string, RegionCard[]> = {
    Europe: [
      { id: 1, title: 'Hidden Villages of the Dolomites', location: 'Cortina d\'Ampezzo', region: 'Europe', country: 'Italy', readTime: 9, image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80' },
      { id: 2, title: 'The Wild Atlantic Way', location: 'County Clare', region: 'Europe', country: 'Ireland', readTime: 11, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80' },
      { id: 3, title: 'Midnight Sun in the Arctic Circle', location: 'Tromsø', region: 'Europe', country: 'Norway', readTime: 8, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
    ],
    Asia: [
      { id: 4, title: 'Tea Ceremony Masters of Uji', location: 'Uji', region: 'Asia', country: 'Japan', readTime: 7, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
      { id: 5, title: 'Floating Markets at Dawn', location: 'Bangkok', region: 'Asia', country: 'Thailand', readTime: 6, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
      { id: 6, title: 'The Valley of Fairy Chimneys', location: 'Göreme', region: 'Asia', country: 'Turkey', readTime: 9, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
    ],
    Americas: [
      { id: 7, title: 'Torres del Paine: End of the Earth', location: 'Patagonia', region: 'Americas', country: 'Chile', readTime: 14, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80' },
      { id: 8, title: 'Havana Nights: Dancing Through Time', location: 'Havana', region: 'Americas', country: 'Cuba', readTime: 10, image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80' },
      { id: 9, title: 'Sacred Valley of the Incas', location: 'Cusco', region: 'Americas', country: 'Peru', readTime: 12, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
    ],
    Africa: [
      { id: 10, title: 'Serengeti: The Great Migration', location: 'Serengeti', region: 'Africa', country: 'Tanzania', readTime: 13, image: 'https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&w=600&q=80' },
      { id: 11, title: 'Atlas Mountains on Horseback', location: 'Ourika Valley', region: 'Africa', country: 'Morocco', readTime: 9, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
      { id: 12, title: 'The Pink Lakes of Senegal', location: 'Lac Rose', region: 'Africa', country: 'Senegal', readTime: 7, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
    ],
    Oceania: [
      { id: 13, title: 'Whitsundays: Sailing the Coral Sea', location: 'Airlie Beach', region: 'Oceania', country: 'Australia', readTime: 11, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
      { id: 14, title: 'Fiordland: New Zealand\'s Wild South', location: 'Milford Sound', region: 'Oceania', country: 'New Zealand', readTime: 10, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80' },
      { id: 15, title: 'Vanuatu: Volcano at the Edge', location: 'Tanna Island', region: 'Oceania', country: 'Vanuatu', readTime: 8, image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80' },
    ],
  }
  return map[activeRegion.value] || []
})

// ─── Photo strip drag scroll ──────────────────────────────────────────────────
const photoStrip = useTemplateRef<HTMLElement>('photoStrip')
let isDragging = false
let dragStartX = 0
let scrollStartX = 0

const stripPhotos = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
]

function onStripMouseDown(e: MouseEvent) {
  if (!photoStrip.value) return
  isDragging = true
  dragStartX = e.clientX
  scrollStartX = photoStrip.value.scrollLeft
  photoStrip.value.style.cursor = 'grabbing'
}

function onStripMouseMove(e: MouseEvent) {
  if (!isDragging || !photoStrip.value) return
  const dx = e.clientX - dragStartX
  photoStrip.value.scrollLeft = scrollStartX - dx
}

function onStripMouseUp() {
  isDragging = false
  if (photoStrip.value) photoStrip.value.style.cursor = 'grab'
}

// ─── Newsletter ────────────────────────────────────────────────────────────────
const newsletterEmail = ref('')
const newsletterSent = ref(false)

function subscribeNewsletter() {
  if (!newsletterEmail.value) return
  newsletterSent.value = true
  newsletterEmail.value = ''
}

// ─── Mobile nav ───────────────────────────────────────────────────────────────
const mobileOpen = ref(false)

// ─── Hovered card ─────────────────────────────────────────────────────────────
const hoveredCard = ref<number | null>(null)

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Reading progress listener
  window.addEventListener('scroll', updateProgress, { passive: true })

  // Start city cycling
  cityInterval = setInterval(cycleCity, 2600)

  // Hero headline entrance
  gsap.fromTo('.hero-headline',
    { opacity: 0, y: 48 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
  )

  // Stats bar fade in
  gsap.fromTo('.stats-bar',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
  )

  // Featured story image scale-in reveal
  gsap.fromTo('.featured-image',
    { scale: 1.1, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.3 }
  )

  // Featured story overlay content
  gsap.fromTo('.featured-overlay-content',
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.7 }
  )

  // Story cards stagger reveal on scroll
  gsap.fromTo('.story-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.stories-grid', start: 'top 82%' }
    }
  )

  // Quote section: text slides in from left
  gsap.fromTo('.quote-text',
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.quote-section', start: 'top 75%' }
    }
  )

  // Quote decorative rule grows in
  gsap.fromTo('.quote-rule',
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1, duration: 0.6, ease: 'power2.out', delay: 0.3,
      scrollTrigger: { trigger: '.quote-section', start: 'top 75%' }
    }
  )

  // Region cards fade in on switch
  gsap.fromTo('.region-card',
    { opacity: 0, y: 28 },
    {
      opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.region-section', start: 'top 82%' }
    }
  )

  // Photo strip caption reveal
  gsap.fromTo('.strip-caption',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.photo-strip-section', start: 'top 85%' }
    }
  )

  // Author section reveal
  gsap.fromTo('.author-section-inner',
    { opacity: 0, y: 36 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.author-section', start: 'top 82%' }
    }
  )

  // Newsletter card
  gsap.fromTo('.newsletter-card',
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.newsletter-section', start: 'top 85%' }
    }
  )

  // Photo strip drag setup
  if (photoStrip.value) {
    photoStrip.value.style.cursor = 'grab'
    window.addEventListener('mousemove', onStripMouseMove)
    window.addEventListener('mouseup', onStripMouseUp)
  }
})

onUnmounted(() => {
  if (cityInterval) clearInterval(cityInterval)
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('mousemove', onStripMouseMove)
  window.removeEventListener('mouseup', onStripMouseUp)
  ScrollTrigger.getAll().forEach(t => t.kill())
})

// Re-animate region cards when region changes
watch(activeRegion, () => {
  nextTick(() => {
    gsap.fromTo('.region-card',
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.09, ease: 'power2.out', clearProps: 'transform,opacity' }
    )
  })
})
</script>

<template>
  <div class="min-h-screen" style="background-color: #f8f5f0; color: #1c1917; font-family: ui-sans-serif, system-ui, sans-serif;">

    <!-- Reading Progress Bar -->
    <div
      class="fixed top-0 left-0 z-[9999] h-[3px] transition-none"
      style="background-color: #dc6b19; transform-origin: left center;"
      :style="{ width: readingProgress + '%' }"
    />

    <!-- ─── Navbar ──────────────────────────────────────────────────────────── -->
    <nav class="sticky top-0 z-50 border-b border-stone-200/80 backdrop-blur-md" style="background-color: rgba(248, 245, 240, 0.92);">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">

          <!-- Logo -->
          <a href="#" class="flex items-center gap-2">
            <span
              class="text-lg tracking-[0.25em] uppercase"
              style="font-family: ui-serif, Georgia, serif; font-weight: 600; color: #1c1917; letter-spacing: 0.22em;"
            >Wanderlust</span>
          </a>

          <!-- Desktop nav -->
          <div class="hidden items-center gap-8 md:flex">
            <a v-for="link in ['Stories', 'Places', 'About', 'Instagram']" :key="link"
              href="#"
              class="text-sm font-medium transition-colors hover:text-stone-600"
              style="color: #78716c; letter-spacing: 0.02em;"
            >{{ link }}</a>
            <a
              href="#"
              class="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
              style="background-color: #dc6b19;"
            >Subscribe</a>
          </div>

          <!-- Mobile toggle -->
          <button
            class="flex flex-col gap-1.5 md:hidden"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle menu"
          >
            <span class="block h-0.5 w-6 transition-all" style="background-color: #1c1917;" :class="{ 'translate-y-2 rotate-45': mobileOpen }" />
            <span class="block h-0.5 w-6 transition-all" style="background-color: #1c1917;" :class="{ 'opacity-0': mobileOpen }" />
            <span class="block h-0.5 w-6 transition-all" style="background-color: #1c1917;" :class="{ '-translate-y-2 -rotate-45': mobileOpen }" />
          </button>
        </div>

        <!-- Mobile dropdown -->
        <div v-show="mobileOpen" class="border-t border-stone-200 py-4 md:hidden">
          <div class="flex flex-col gap-4">
            <a v-for="link in ['Stories', 'Places', 'About', 'Instagram']" :key="link"
              href="#"
              class="text-sm font-medium"
              style="color: #78716c;"
            >{{ link }}</a>
            <a
              href="#"
              class="inline-block w-fit rounded-full px-5 py-2 text-sm font-semibold text-white"
              style="background-color: #dc6b19;"
            >Subscribe</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- ─── Hero ────────────────────────────────────────────────────────────── -->
    <section class="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-8">

      <!-- Top editorial headline -->
      <div class="hero-headline mb-8 text-center">
        <p class="mb-3 text-sm font-medium uppercase tracking-widest" style="color: #dc6b19;">Vol. 47 · Spring 2025</p>
        <h1
          class="leading-tight"
          style="font-family: ui-serif, Georgia, serif; font-size: clamp(2.4rem, 6vw, 5rem); font-weight: 700; color: #1c1917;"
        >
          Currently in
          <span class="relative inline-block">
            <Transition name="city-fade" mode="out-in">
              <span
                :key="currentCity"
                class="inline-block"
                style="color: #dc6b19;"
              >{{ currentCity }}</span>
            </Transition>
            <span
              class="absolute bottom-1 left-0 right-0 h-[3px] rounded-full"
              style="background-color: #dc6b19; opacity: 0.25;"
            />
          </span>
          ...
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed" style="color: #78716c;">
          An editorial travel journal for the curious, the unhurried, and the perpetually elsewhere.
        </p>
      </div>

      <!-- Stats bar -->
      <div class="stats-bar mb-14 flex flex-wrap items-center justify-center gap-6 text-sm" style="color: #78716c;">
        <span class="flex items-center gap-2">
          <span class="h-1 w-1 rounded-full" style="background-color: #dc6b19;" />
          47 countries explored
        </span>
        <span class="flex items-center gap-2">
          <span class="h-1 w-1 rounded-full" style="background-color: #dc6b19;" />
          312 stories published
        </span>
        <span class="flex items-center gap-2">
          <span class="h-1 w-1 rounded-full" style="background-color: #dc6b19;" />
          Est. 2019
        </span>
      </div>

      <!-- Featured story -->
      <div class="relative h-[70vh] min-h-[480px] overflow-hidden rounded-2xl shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80"
          alt="Kyoto temples"
          class="featured-image absolute inset-0 h-full w-full object-cover"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <!-- Top-left category pill -->
        <div class="absolute left-6 top-6">
          <span
            class="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white"
            style="background-color: rgba(220, 107, 25, 0.9); backdrop-filter: blur(4px);"
          >Asia · Japan</span>
        </div>
        <!-- Bottom overlay content -->
        <div class="featured-overlay-content absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <h2
            class="mb-4 max-w-2xl leading-tight text-white"
            style="font-family: ui-serif, Georgia, serif; font-size: clamp(1.6rem, 3.5vw, 2.75rem); font-weight: 700;"
          >
            The Ancient Soul of Kyoto: A Week Among Temples and Cherry Blossoms
          </h2>
          <div class="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Elena Marchetti"
              class="h-10 w-10 rounded-full border-2 border-white/60 object-cover"
            />
            <div>
              <p class="text-sm font-semibold text-white">Elena Marchetti</p>
              <p class="text-xs" style="color: rgba(255,255,255,0.65);">March 2025 · 12 min read</p>
            </div>
            <a
              href="#"
              class="ml-auto flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
              style="border: 1px solid rgba(255,255,255,0.4);"
            >
              Read story
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Latest Dispatches Grid ─────────────────────────────────────────── -->
    <section class="stories-grid mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="mb-10 flex items-end justify-between">
        <div>
          <p class="mb-1 text-xs font-semibold uppercase tracking-widest" style="color: #dc6b19;">Fresh off the press</p>
          <h2
            class="text-4xl font-bold"
            style="font-family: ui-serif, Georgia, serif; color: #1c1917;"
          >Latest Dispatches</h2>
        </div>
        <a href="#" class="hidden text-sm font-medium underline-offset-4 hover:underline md:block" style="color: #78716c;">View all stories →</a>
      </div>

      <!-- Grid: 2-col asymmetric layout -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <!-- Cards 1 & 2 span tall left column on lg -->
        <div class="flex flex-col gap-6 lg:col-span-1">
          <div
            v-for="story in stories.slice(0, 2)" :key="story.id"
            class="story-card group relative overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl"
            style="background: white;"
            @mouseenter="hoveredCard = story.id"
            @mouseleave="hoveredCard = null"
          >
            <div class="relative h-56 overflow-hidden">
              <img
                :src="story.image"
                :alt="story.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <!-- Save button -->
              <button
                class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all hover:scale-110"
                :style="story.saved ? 'background: #dc6b19;' : 'background: rgba(255,255,255,0.85);'"
                @click.stop="toggleSave(story)"
                :aria-label="story.saved ? 'Unsave story' : 'Save story'"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  :style="story.saved ? 'stroke: white; fill: white;' : 'stroke: #1c1917;'"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
              <!-- Region pill -->
              <span
                class="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style="background-color: rgba(0,0,0,0.55); backdrop-filter: blur(4px);"
              >{{ story.region }} · {{ story.country }}</span>
            </div>
            <div class="p-5">
              <h3
                class="mb-2 leading-snug transition-colors group-hover:text-stone-600"
                style="font-family: ui-serif, Georgia, serif; font-size: 1.1rem; font-weight: 600; color: #1c1917;"
              >{{ story.title }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-xs" style="color: #78716c;">{{ story.readTime }} min read</span>
                <Transition name="fade-slide">
                  <span
                    v-if="hoveredCard === story.id"
                    class="text-xs font-medium"
                    style="color: #dc6b19;"
                  >Read →</span>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Cards 3-6 in 2-col right area (or stack naturally) -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
          <div
            v-for="story in stories.slice(2)" :key="story.id"
            class="story-card group relative overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl"
            style="background: white;"
            @mouseenter="hoveredCard = story.id"
            @mouseleave="hoveredCard = null"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="story.image"
                :alt="story.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <!-- Save button -->
              <button
                class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all hover:scale-110"
                :style="story.saved ? 'background: #dc6b19;' : 'background: rgba(255,255,255,0.85);'"
                @click.stop="toggleSave(story)"
                :aria-label="story.saved ? 'Unsave story' : 'Save story'"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  :style="story.saved ? 'stroke: white; fill: white;' : 'stroke: #1c1917;'"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
              <span
                class="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style="background-color: rgba(0,0,0,0.55); backdrop-filter: blur(4px);"
              >{{ story.region }} · {{ story.country }}</span>
            </div>
            <div class="p-4">
              <h3
                class="mb-2 text-sm leading-snug"
                style="font-family: ui-serif, Georgia, serif; font-weight: 600; color: #1c1917;"
              >{{ story.title }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-xs" style="color: #78716c;">{{ story.readTime }} min read</span>
                <Transition name="fade-slide">
                  <span
                    v-if="hoveredCard === story.id"
                    class="text-xs font-medium"
                    style="color: #dc6b19;"
                  >Read →</span>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center md:hidden">
        <a href="#" class="text-sm font-medium underline-offset-4 hover:underline" style="color: #78716c;">View all stories →</a>
      </div>
    </section>

    <!-- ─── Quote Pullout ──────────────────────────────────────────────────── -->
    <section class="quote-section py-24" style="background-color: #1c1917;">
      <div class="mx-auto max-w-4xl px-6 lg:px-8">
        <div class="quote-rule mb-10 h-px" style="background-color: #dc6b19;" />
        <blockquote class="quote-text">
          <p
            class="mb-8 leading-relaxed"
            style="font-family: ui-serif, Georgia, serif; font-size: clamp(1.6rem, 3.5vw, 3rem); font-style: italic; font-weight: 400; color: #f8f5f0; line-height: 1.4;"
          >
            "Travel is the only thing you buy that makes you richer."
          </p>
          <footer class="flex items-center gap-4">
            <span class="h-px w-10 flex-shrink-0" style="background-color: #dc6b19;" />
            <cite class="text-sm font-medium not-italic" style="color: #78716c;">Anonymous</cite>
          </footer>
        </blockquote>
        <div class="quote-rule mt-10 h-px" style="background-color: #dc6b19;" />
      </div>
    </section>

    <!-- ─── Explore by Region ──────────────────────────────────────────────── -->
    <section class="region-section mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="mb-8 text-center">
        <p class="mb-1 text-xs font-semibold uppercase tracking-widest" style="color: #dc6b19;">Explore the world</p>
        <h2
          class="text-3xl font-bold"
          style="font-family: ui-serif, Georgia, serif; color: #1c1917;"
        >Browse by Region</h2>
      </div>

      <!-- Region pills -->
      <div class="mb-10 flex flex-wrap items-center justify-center gap-3">
        <button
          v-for="region in regions" :key="region"
          class="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:shadow-md"
          :style="activeRegion === region
            ? 'background-color: #dc6b19; color: white; box-shadow: 0 2px 12px rgba(220,107,25,0.3);'
            : 'background-color: white; color: #78716c; border: 1px solid #e7e5e4;'"
          @click="activeRegion = region"
        >
          {{ region }}
        </button>
      </div>

      <!-- Region cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="card in regionCards" :key="card.id"
          class="region-card group overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
          style="background: white;"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="card.image"
              :alt="card.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span
              class="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
              style="background-color: rgba(0,0,0,0.55); backdrop-filter: blur(4px);"
            >{{ card.country }}</span>
          </div>
          <div class="p-5">
            <h3
              class="mb-1 leading-snug"
              style="font-family: ui-serif, Georgia, serif; font-size: 1rem; font-weight: 600; color: #1c1917;"
            >{{ card.title }}</h3>
            <p class="text-xs" style="color: #78716c;">{{ card.location }} · {{ card.readTime }} min read</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Photo Journal Strip ────────────────────────────────────────────── -->
    <section class="photo-strip-section py-16" style="border-top: 1px solid #e7e5e4; border-bottom: 1px solid #e7e5e4;">
      <div class="mx-auto mb-6 max-w-7xl px-6 lg:px-8">
        <p class="strip-caption text-xs font-semibold uppercase tracking-widest" style="color: #78716c;">
          From the field — unfiltered moments
        </p>
      </div>
      <div
        ref="photoStrip"
        class="flex gap-3 overflow-x-auto px-6 select-none"
        style="scrollbar-width: none; -ms-overflow-style: none; padding-left: max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem));"
        @mousedown="onStripMouseDown"
      >
        <div
          v-for="(photo, i) in stripPhotos" :key="i"
          class="flex-shrink-0 overflow-hidden rounded-lg"
          style="width: 220px; height: 220px;"
        >
          <img
            :src="photo"
            :alt="`Field photo ${i + 1}`"
            class="h-full w-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none"
            draggable="false"
          />
        </div>
        <!-- Trailing spacer -->
        <div class="w-6 flex-shrink-0" />
      </div>
    </section>

    <!-- ─── About the Author ───────────────────────────────────────────────── -->
    <section class="author-section mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div class="author-section-inner grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <!-- Author photo -->
        <div class="relative">
          <div
            class="absolute -left-4 -top-4 h-full w-full rounded-2xl"
            style="border: 2px solid #dc6b19; opacity: 0.25; transform: translate(8px, 8px);"
          />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
            alt="Elena Marchetti"
            class="relative z-10 w-full rounded-2xl object-cover shadow-xl"
            style="aspect-ratio: 4/5; max-height: 520px;"
          />
        </div>

        <!-- Bio -->
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest" style="color: #dc6b19;">The voice behind the stories</p>
          <h2
            class="mb-6 text-4xl font-bold leading-tight"
            style="font-family: ui-serif, Georgia, serif; color: #1c1917;"
          >Elena Marchetti</h2>
          <div class="mb-2 flex items-center gap-2 text-sm" style="color: #78716c;">
            <svg class="h-4 w-4 flex-shrink-0" style="color: #dc6b19;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            Currently in Oaxaca, Mexico
          </div>
          <p class="mb-4 leading-relaxed" style="color: #78716c; line-height: 1.8;">
            I'm a travel writer and photographer from Florence, Italy, who has been documenting the world's most extraordinary places since 2019. My work sits at the intersection of editorial storytelling and intimate travel memoir — finding the humanity in remote landscapes and the poetry in everyday moments abroad.
          </p>
          <p class="mb-8 leading-relaxed" style="color: #78716c; line-height: 1.8;">
            47 countries in, and the world still manages to surprise me every single time. I believe slow travel is the only kind that changes you.
          </p>

          <!-- Social links -->
          <div class="flex flex-wrap items-center gap-4">
            <a
              v-for="social in [
                { label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'Newsletter', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              ]"
              :key="social.label"
              href="#"
              class="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all hover:shadow-md"
              style="background: white; color: #78716c; border: 1px solid #e7e5e4;"
            >
              <svg class="h-4 w-4" :fill="social.label === 'Newsletter' ? 'none' : 'currentColor'" :stroke="social.label === 'Newsletter' ? 'currentColor' : 'none'" viewBox="0 0 24 24">
                <path :d="social.icon" :stroke-linecap="social.label === 'Newsletter' ? 'round' : undefined" :stroke-linejoin="social.label === 'Newsletter' ? 'round' : undefined" :stroke-width="social.label === 'Newsletter' ? '2' : undefined"/>
              </svg>
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Newsletter ──────────────────────────────────────────────────────── -->
    <section class="newsletter-section mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div
        class="newsletter-card rounded-2xl p-10 lg:p-16"
        style="background: white; border-left: 4px solid #dc6b19; box-shadow: 0 4px 32px rgba(28,25,23,0.08);"
      >
        <div class="mx-auto max-w-xl text-center">
          <p class="mb-2 text-xs font-semibold uppercase tracking-widest" style="color: #dc6b19;">The Wanderlust Letter</p>
          <h2
            class="mb-3 text-3xl font-bold"
            style="font-family: ui-serif, Georgia, serif; color: #1c1917;"
          >Join 28,000 wanderers.</h2>
          <p class="mb-8 text-base" style="color: #78716c;">
            One letter, once a month. Stories from the road, hidden places, and honest travel advice. No fluff. No spam.
          </p>

          <Transition name="fade" mode="out-in">
            <div v-if="!newsletterSent" key="form" class="flex flex-col gap-3 sm:flex-row">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="your@email.com"
                class="flex-1 rounded-lg px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                style="background: #f8f5f0; border: 1px solid #e7e5e4; color: #1c1917; focus:ring-color: #dc6b19;"
                @keydown.enter="subscribeNewsletter"
              />
              <button
                class="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                style="background-color: #dc6b19; white-space: nowrap;"
                @click="subscribeNewsletter"
              >
                Subscribe free
              </button>
            </div>
            <div v-else key="success" class="flex flex-col items-center gap-2">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full"
                style="background-color: rgba(220,107,25,0.12);"
              >
                <svg class="h-6 w-6" style="color: #dc6b19;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <p class="font-semibold" style="color: #1c1917;">Welcome to the journey!</p>
              <p class="text-sm" style="color: #78716c;">You'll receive your first letter next month.</p>
            </div>
          </Transition>

          <p class="mt-4 text-xs" style="color: #a8a29e;">No spam ever. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.</p>
        </div>
      </div>
    </section>

    <!-- ─── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t" style="border-color: #e7e5e4; background-color: #1c1917;">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <!-- Brand -->
          <div class="lg:col-span-2">
            <span
              class="mb-4 block text-xl uppercase tracking-[0.22em]"
              style="font-family: ui-serif, Georgia, serif; font-weight: 600; color: #f8f5f0;"
            >Wanderlust</span>
            <p class="mb-6 max-w-xs text-sm leading-relaxed" style="color: #78716c;">
              An editorial travel journal for the curious, the unhurried, and the perpetually elsewhere. Est. 2019.
            </p>
            <div class="flex items-center gap-4">
              <a v-for="s in ['Instagram', 'Twitter', 'Pinterest']" :key="s"
                href="#"
                class="text-xs font-medium transition-colors hover:text-white"
                style="color: #78716c;"
              >{{ s }}</a>
            </div>
          </div>

          <!-- Nav links -->
          <div>
            <p class="mb-5 text-xs font-semibold uppercase tracking-widest" style="color: #dc6b19;">Explore</p>
            <ul class="flex flex-col gap-3">
              <li v-for="l in ['All Stories', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania']" :key="l">
                <a href="#" class="text-sm transition-colors hover:text-white" style="color: #78716c;">{{ l }}</a>
              </li>
            </ul>
          </div>

          <div>
            <p class="mb-5 text-xs font-semibold uppercase tracking-widest" style="color: #dc6b19;">About</p>
            <ul class="flex flex-col gap-3">
              <li v-for="l in ['About Elena', 'Press Kit', 'Work with us', 'Privacy Policy', 'Newsletter']" :key="l">
                <a href="#" class="text-sm transition-colors hover:text-white" style="color: #78716c;">{{ l }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row" style="border-color: #292524; color: #57534e;">
          <p>© 2025 Wanderlust Journal. All rights reserved.</p>
          <p>Made with love, coffee, and too many passport stamps.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* City typewriter transition */
.city-fade-enter-active,
.city-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.city-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.city-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

/* Fade-slide for read indicator */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}

/* Generic fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar on photo strip */
:deep(.photo-strip-section) [ref="photoStrip"]::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling behavior */
html {
  scroll-behavior: smooth;
}
</style>
