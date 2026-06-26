<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({ layout: false })

// ─── Types ────────────────────────────────────────────────────────────────────
interface Destination {
  id: number
  name: string
  country: string
  flag: string
  price: string
  rating: number
  category: string
  image: string
  tall?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const destinations: Destination[] = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    flag: '🇬🇷',
    price: 'From $1,240',
    rating: 4.9,
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    tall: true,
  },
  {
    id: 2,
    name: 'Bali',
    country: 'Indonesia',
    flag: '🇮🇩',
    price: 'From $890',
    rating: 4.8,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Kyoto',
    country: 'Japan',
    flag: '🇯🇵',
    price: 'From $1,580',
    rating: 4.9,
    category: 'Cities',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Cappadocia',
    country: 'Turkey',
    flag: '🇹🇷',
    price: 'From $760',
    rating: 4.7,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    tall: true,
  },
  {
    id: 5,
    name: 'Maldives',
    country: 'Maldives',
    flag: '🇲🇻',
    price: 'From $3,200',
    rating: 5.0,
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Amalfi Coast',
    country: 'Italy',
    flag: '🇮🇹',
    price: 'From $1,100',
    rating: 4.8,
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    name: 'Swiss Alps',
    country: 'Switzerland',
    flag: '🇨🇭',
    price: 'From $2,100',
    rating: 4.9,
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tall: true,
  },
  {
    id: 8,
    name: 'Morocco',
    country: 'Morocco',
    flag: '🇲🇦',
    price: 'From $650',
    rating: 4.6,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    name: 'Norwegian Fjords',
    country: 'Norway',
    flag: '🇳🇴',
    price: 'From $1,890',
    rating: 4.9,
    category: 'Wilderness',
    image: 'https://images.unsplash.com/photo-1601439678777-b2b03e917e5f?auto=format&fit=crop&w=800&q=80',
  },
]

const categories = ['All', 'Beaches', 'Mountains', 'Cities', 'Cultural', 'Wilderness', 'Arctic']

const stats = [
  { value: 198, label: 'Countries', suffix: '' },
  { value: 12400, label: 'Travelers', suffix: '+' },
  { value: 4.9, label: 'Avg Rating', suffix: '', decimal: true },
  { value: 8, label: 'Years', suffix: '' },
]

const placeholders = [
  'Santorini, Greece...',
  'Bali, Indonesia...',
  'Kyoto, Japan...',
  'Cappadocia, Turkey...',
  'Maldives...',
]

// ─── State ────────────────────────────────────────────────────────────────────
const activeCategory = ref('All')
const favorites = ref<Set<number>>(new Set())
const searchPlaceholder = ref(placeholders[0])
const mobileMenuOpen = ref(false)
const hoveredCard = ref<number | null>(null)
const displayStats = ref([0, 0, 0, 0])

const filteredDestinations = computed(() =>
  activeCategory.value === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory.value)
)

function toggleFavorite(id: number) {
  const next = new Set(favorites.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  favorites.value = next
}

function setCategory(cat: string) {
  activeCategory.value = cat
  nextTick(() => {
    gsap.from('.dest-card', {
      y: 30,
      opacity: 0,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power3.out',
    })
  })
}

// ─── Refs ─────────────────────────────────────────────────────────────────────
const heroRef = useTemplateRef<HTMLElement>('heroSection')
const headlineRef = useTemplateRef<HTMLElement>('headline')
const searchBarRef = useTemplateRef<HTMLElement>('searchBar')
const pillsRef = useTemplateRef<HTMLElement>('pills')
const gridRef = useTemplateRef<HTMLElement>('gridSection')
const featuredRef = useTemplateRef<HTMLElement>('featuredSection')
const statsRef = useTemplateRef<HTMLElement>('statsSection')

// ─── GSAP ──────────────────────────────────────────────────────────────────────
let placeholderInterval: ReturnType<typeof setInterval> | null = null
let ctx: gsap.Context | null = null

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Hero headline: word-by-word reveal
    if (headlineRef.value) {
      const words = headlineRef.value.querySelectorAll<HTMLElement>('.word')
      gsap.from(words, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }

    // Subtitle + CTA buttons
    gsap.from('.hero-subtitle', {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.75,
    })

    // Search bar slides up
    if (searchBarRef.value) {
      gsap.from(searchBarRef.value, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.95,
      })
    }

    // Hero CTAs
    gsap.from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 1.15,
    })

    // Category pills stagger from left
    if (pillsRef.value) {
      const pills = pillsRef.value.querySelectorAll<HTMLElement>('.cat-pill')
      gsap.from(pills, {
        x: -20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pillsRef.value,
          start: 'top 88%',
        },
      })
    }

    // Destination cards scroll-triggered reveal
    if (gridRef.value) {
      gsap.from('.dest-card', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 80%',
        },
      })
    }

    // Featured section
    if (featuredRef.value) {
      gsap.from(featuredRef.value, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuredRef.value,
          start: 'top 82%',
        },
      })
    }

    // Stats counter animation
    if (statsRef.value) {
      ScrollTrigger.create({
        trigger: statsRef.value,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          stats.forEach((stat, i) => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: stat.value,
              duration: 1.8,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate() {
                displayStats.value[i] = stat.decimal
                  ? Math.round(obj.val * 10) / 10
                  : Math.round(obj.val)
              },
            })
          })
        },
      })
    }
  })

  // Cycling search placeholder
  let idx = 0
  placeholderInterval = setInterval(() => {
    idx = (idx + 1) % placeholders.length
    searchPlaceholder.value = placeholders[idx]
  }, 2600)
})

onUnmounted(() => {
  ctx?.revert()
  if (placeholderInterval) clearInterval(placeholderInterval)
  ScrollTrigger.getAll().forEach(t => t.kill())
})

// Card image hover
function onCardEnter(el: HTMLElement | null) {
  if (!el) return
  const img = el.querySelector<HTMLElement>('.card-img')
  if (img) gsap.to(img, { scale: 1.07, duration: 0.5, ease: 'power2.out' })
}

function onCardLeave(el: HTMLElement | null) {
  if (!el) return
  const img = el.querySelector<HTMLElement>('.card-img')
  if (img) gsap.to(img, { scale: 1, duration: 0.45, ease: 'power2.out' })
}
</script>

<template>
  <div class="min-h-screen text-white" style="background:#08090e;font-family:'Inter',system-ui,-apple-system,sans-serif">

    <!-- ─── Navbar ──────────────────────────────────────────────────────────────── -->
    <header
      class="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-10 h-16 border-b border-white/5 backdrop-blur-md"
      style="background:rgba(8,9,14,0.85)"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5">
          <div class="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
            </svg>
          </div>
          <span class="text-sm font-bold tracking-widest text-white uppercase">Discover</span>
        </div>
      </div>

      <!-- Desktop nav links -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in ['Explore', 'Destinations', 'Experiences', 'About']"
          :key="link"
          href="#"
          class="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide"
        >
          {{ link }}
        </a>
      </nav>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center gap-3">
        <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-2">Sign in</a>
        <a
          href="#"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]"
          style="background:linear-gradient(135deg,#6366f1,#4f46e5)"
        >
          Get started
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
      >
        <svg v-if="!mobileMenuOpen" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
        </svg>
        <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </header>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-x-0 top-16 z-40 md:hidden border-b border-white/5 p-5 flex flex-col gap-1"
        style="background:rgba(8,9,14,0.97);backdrop-filter:blur(20px)"
      >
        <a
          v-for="link in ['Explore', 'Destinations', 'Experiences', 'About']"
          :key="link"
          href="#"
          class="px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
          @click="mobileMenuOpen = false"
        >
          {{ link }}
        </a>
        <div class="border-t border-white/5 mt-2 pt-3 flex flex-col gap-2">
          <a href="#" class="px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">Sign in</a>
          <a href="#" class="px-4 py-3 rounded-xl text-sm font-semibold text-white text-center" style="background:linear-gradient(135deg,#6366f1,#4f46e5)">Get started</a>
        </div>
      </div>
    </Transition>

    <!-- ─── Hero ────────────────────────────────────────────────────────────────── -->
    <section
      ref="heroSection"
      class="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 min-h-screen overflow-hidden"
    >
      <!-- Background gradient orbs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-3xl"
          style="background:radial-gradient(ellipse,#6366f1 0%,transparent 70%)"
        />
        <div
          class="absolute top-1/3 left-[20%] w-72 h-72 rounded-full opacity-10 blur-3xl"
          style="background:#a5b4fc"
        />
        <div
          class="absolute bottom-1/4 right-[15%] w-64 h-64 rounded-full opacity-8 blur-3xl"
          style="background:#818cf8"
        />
      </div>

      <!-- Badge -->
      <div class="hero-subtitle inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span class="text-xs font-semibold text-indigo-300 tracking-widest uppercase">New destinations available</span>
      </div>

      <!-- Headline: word-by-word -->
      <h1
        ref="headline"
        class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 relative z-10"
        style="letter-spacing:-0.04em"
      >
        <span class="word inline-block text-white mr-3">The</span>
        <span class="word inline-block text-white mr-3">world</span>
        <span class="word inline-block mr-3" style="background:linear-gradient(135deg,#a5b4fc,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">is</span>
        <span class="word inline-block text-white">waiting.</span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle text-lg text-zinc-400 max-w-lg leading-relaxed mb-10 relative z-10">
        Discover breathtaking destinations curated by travel experts. Your next adventure starts with a single search.
      </p>

      <!-- Animated search bar -->
      <div ref="searchBar" class="relative w-full max-w-2xl mb-10 z-10">
        <div class="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/40">
          <svg class="w-5 h-5 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            :placeholder="searchPlaceholder"
            class="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none transition-all"
            style="min-width:0"
          />
          <div class="hidden sm:flex items-center gap-2 shrink-0">
            <span class="text-xs text-zinc-600 border border-zinc-700 rounded-md px-1.5 py-0.5">⌘</span>
            <span class="text-xs text-zinc-600 border border-zinc-700 rounded-md px-1.5 py-0.5">K</span>
          </div>
          <button
            class="shrink-0 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style="background:linear-gradient(135deg,#6366f1,#4f46e5)"
          >
            Search
          </button>
        </div>
        <!-- Quick suggestions -->
        <div class="flex flex-wrap items-center gap-2 mt-3 justify-center">
          <span class="text-xs text-zinc-600">Popular:</span>
          <button
            v-for="sug in ['🏝️ Maldives', '🏔️ Swiss Alps', '🏯 Kyoto', '🌅 Santorini']"
            :key="sug"
            class="text-xs text-zinc-400 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/8 transition-all"
          >
            {{ sug }}
          </button>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 z-10">
        <button
          class="hero-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.03]"
          style="background:linear-gradient(135deg,#6366f1,#4f46e5)"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
          </svg>
          Explore now
        </button>
        <button
          class="hero-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-zinc-300 border border-white/15 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all"
        >
          <svg class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Watch film
        </button>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span class="text-[10px] text-zinc-500 tracking-widest uppercase">Scroll</span>
        <svg class="w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>

    <!-- ─── Category Filter Pills ──────────────────────────────────────────────── -->
    <section class="sticky top-16 z-30 px-6 py-4 border-b border-white/5" style="background:rgba(8,9,14,0.92);backdrop-filter:blur(16px)">
      <div ref="pills" class="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
        <button
          v-for="cat in categories"
          :key="cat"
          class="cat-pill shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
          :class="activeCategory === cat
            ? 'text-white shadow-lg shadow-indigo-500/25'
            : 'text-zinc-400 border border-white/10 bg-white/3 hover:text-white hover:border-white/20 hover:bg-white/6'"
          :style="activeCategory === cat ? 'background:linear-gradient(135deg,#6366f1,#4f46e5)' : ''"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- ─── Destination Grid ────────────────────────────────────────────────────── -->
    <section ref="gridSection" class="px-6 py-16 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
            {{ activeCategory === 'All' ? 'All Destinations' : activeCategory }}
          </p>
          <h2 class="text-3xl font-bold text-white tracking-tight">{{ filteredDestinations.length }} places to explore</h2>
        </div>
        <div class="hidden sm:flex items-center gap-2">
          <button class="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px]">
        <div
          v-for="dest in filteredDestinations"
          :key="dest.id"
          class="dest-card group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5"
          :class="dest.tall ? 'sm:row-span-2' : ''"
          @mouseenter="hoveredCard = dest.id; onCardEnter(($el as HTMLElement))"
          @mouseleave="hoveredCard = null; onCardLeave(($el as HTMLElement))"
        >
          <!-- Image -->
          <div class="absolute inset-0 overflow-hidden">
            <img
              :src="dest.image"
              :alt="`${dest.name}, ${dest.country}`"
              class="card-img w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Gradient overlay -->
          <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(8,9,14,0.95) 0%,rgba(8,9,14,0.4) 50%,rgba(8,9,14,0.1) 100%)" />

          <!-- Top controls -->
          <div class="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
            <!-- Category badge -->
            <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-white/80" style="background:rgba(8,9,14,0.6);backdrop-filter:blur(8px)">
              {{ dest.category }}
            </span>

            <!-- Favorite button -->
            <button
              @click.stop="toggleFavorite(dest.id)"
              class="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 transition-all hover:scale-110"
              :class="favorites.has(dest.id) ? 'bg-rose-500 border-rose-500/50' : 'border-white/15 hover:border-white/30'"
              style="background-color: inherit; backdrop-filter:blur(8px)"
              :style="!favorites.has(dest.id) ? 'background:rgba(8,9,14,0.6)' : ''"
            >
              <svg
                class="w-4 h-4 transition-colors"
                :class="favorites.has(dest.id) ? 'text-white fill-white' : 'text-white/70'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <!-- Bottom info -->
          <div class="absolute bottom-0 inset-x-0 p-5 z-10">
            <!-- Flag + Location -->
            <div class="flex items-center gap-2 mb-2">
              <span class="text-base">{{ dest.flag }}</span>
              <p class="text-xs text-zinc-400 font-medium">{{ dest.country }}</p>
            </div>

            <div class="flex items-end justify-between gap-3">
              <div>
                <h3 class="text-xl font-bold text-white tracking-tight leading-tight mb-1.5">{{ dest.name }}</h3>

                <!-- Rating -->
                <div class="flex items-center gap-1.5">
                  <div class="flex items-center gap-0.5">
                    <svg v-for="s in 5" :key="s" class="w-3 h-3" :class="s <= Math.round(dest.rating) ? 'text-amber-400' : 'text-white/20'" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span class="text-xs font-semibold text-amber-400">{{ dest.rating }}</span>
                </div>
              </div>

              <div class="text-right shrink-0">
                <p class="text-xs text-zinc-500 mb-0.5">Starting</p>
                <p class="text-base font-bold text-white">{{ dest.price }}</p>
              </div>
            </div>

            <!-- Hover reveal button -->
            <div
              class="overflow-hidden transition-all duration-300"
              :style="hoveredCard === dest.id ? 'max-height:48px;opacity:1;margin-top:12px' : 'max-height:0px;opacity:0;margin-top:0'"
            >
              <button
                class="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all text-center"
                style="background:linear-gradient(135deg,rgba(99,102,241,0.9),rgba(79,70,229,0.9));backdrop-filter:blur(8px)"
              >
                Explore {{ dest.name }} →
              </button>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredDestinations.length === 0" class="col-span-full flex flex-col items-center justify-center py-24 gap-5">
          <div class="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
            </svg>
          </div>
          <div class="text-center">
            <p class="text-white font-semibold mb-1">No destinations found</p>
            <p class="text-sm text-zinc-500">Try a different category</p>
          </div>
          <button @click="setCategory('All')" class="px-5 py-2.5 rounded-full text-sm font-medium text-white border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
            Show all destinations
          </button>
        </div>
      </div>
    </section>

    <!-- ─── Featured "Editor's Pick" ─────────────────────────────────────────── -->
    <section ref="featuredSection" class="px-6 py-8 max-w-7xl mx-auto">
      <div class="relative rounded-3xl overflow-hidden h-[480px] border border-white/8 group">
        <!-- Background image -->
        <img
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80"
          alt="Maldives — Editor's Pick"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <!-- Overlay -->
        <div class="absolute inset-0" style="background:linear-gradient(105deg,rgba(8,9,14,0.95) 0%,rgba(8,9,14,0.6) 45%,rgba(8,9,14,0.15) 100%)" />

        <!-- Content -->
        <div class="relative h-full flex flex-col justify-end p-10 lg:p-14 z-10 max-w-xl">
          <!-- Editor badge -->
          <div class="flex items-center gap-2 mb-6">
            <div class="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-amber-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Editor's Pick This Week</span>
          </div>

          <h2 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4" style="letter-spacing:-0.03em">
            The Maldives.<br/>Pure paradise.
          </h2>

          <p class="text-sm text-zinc-300 leading-relaxed mb-8 max-w-md">
            Crystal-clear lagoons, overwater bungalows, and sunsets that defy imagination. The Maldives isn't just a destination — it's the ultimate escape from everything ordinary.
          </p>

          <!-- Stats row -->
          <div class="flex items-center gap-6 mb-8">
            <div>
              <p class="text-xs text-zinc-500 mb-0.5">From</p>
              <p class="text-2xl font-bold text-white">$3,200</p>
            </div>
            <div class="w-px h-8 bg-white/10" />
            <div>
              <p class="text-xs text-zinc-500 mb-0.5">Rating</p>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span class="text-sm font-bold text-white">5.0</span>
              </div>
            </div>
            <div class="w-px h-8 bg-white/10" />
            <div>
              <p class="text-xs text-zinc-500 mb-0.5">Duration</p>
              <p class="text-sm font-semibold text-white">7 – 14 nights</p>
            </div>
          </div>

          <!-- CTA -->
          <div class="flex items-center gap-3">
            <button
              class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]"
              style="background:linear-gradient(135deg,#6366f1,#4f46e5)"
            >
              Book this experience
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button class="text-sm text-zinc-400 hover:text-white transition-colors px-2">
              Learn more →
            </button>
          </div>
        </div>

        <!-- Floating card (desktop) -->
        <div class="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-56 rounded-2xl border border-white/10 p-5" style="background:rgba(8,9,14,0.7);backdrop-filter:blur(20px)">
          <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Trip Details</p>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div>
                <p class="text-[10px] text-zinc-600">Experience type</p>
                <p class="text-xs font-semibold text-white">Luxury beach resort</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </div>
              <div>
                <p class="text-[10px] text-zinc-600">Best season</p>
                <p class="text-xs font-semibold text-white">Nov – Apr</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p class="text-[10px] text-zinc-600">Concierge</p>
                <p class="text-xs font-semibold text-white">24 / 7 support</p>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-white/8">
            <div class="flex -space-x-2 mb-2">
              <div v-for="(c, i) in ['from-indigo-500 to-purple-600','from-amber-500 to-orange-600','from-emerald-500 to-teal-600']" :key="i" class="w-7 h-7 rounded-full border-2 border-zinc-900 bg-gradient-to-br text-[9px] font-bold text-white flex items-center justify-center" :class="c">
                {{ ['AK','BL','MT'][i] }}
              </div>
            </div>
            <p class="text-[10px] text-zinc-500">2,847 travelers booked this month</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Stats Bar ──────────────────────────────────────────────────────────── -->
    <section ref="statsSection" class="px-6 py-16 max-w-7xl mx-auto">
      <div class="rounded-3xl border border-white/8 p-10 lg:p-14" style="background:rgba(99,102,241,0.05)">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="flex flex-col items-center text-center lg:px-8"
          >
            <p class="text-4xl lg:text-5xl font-black text-white mb-2 tabular-nums tracking-tight" style="letter-spacing:-0.03em">
              <template v-if="stat.decimal">{{ displayStats[i].toFixed(1) }}</template>
              <template v-else>{{ displayStats[i].toLocaleString() }}</template>{{ stat.suffix }}
            </p>
            <p class="text-sm text-zinc-500 font-medium">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Trust indicators -->
        <div class="mt-10 pt-10 border-t border-white/8 flex flex-wrap items-center justify-center gap-6">
          <div class="flex items-center gap-2 text-xs text-zinc-500">
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Best Price Guarantee</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-zinc-500">
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Free cancellation on most trips</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-zinc-500">
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Handpicked by travel experts</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-zinc-500">
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>24/7 traveler support</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Newsletter CTA ──────────────────────────────────────────────────────── -->
    <section class="px-6 py-16 max-w-3xl mx-auto text-center">
      <div class="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
        <svg class="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white tracking-tight mb-3" style="letter-spacing:-0.02em">Get inspired every week</h2>
      <p class="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
        Join 12,000+ wanderers receiving curated destination picks, exclusive deals, and insider travel tips.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          class="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
        <button
          class="px-7 py-3 rounded-full text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] whitespace-nowrap"
          style="background:linear-gradient(135deg,#6366f1,#4f46e5)"
        >
          Subscribe
        </button>
      </div>
      <p class="text-[11px] text-zinc-600 mt-3">No spam. Unsubscribe any time.</p>
    </section>

    <!-- ─── Footer ──────────────────────────────────────────────────────────────── -->
    <footer class="border-t border-white/5 px-6 py-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-start justify-between gap-10">

          <!-- Brand -->
          <div class="max-w-xs">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
              </div>
              <span class="text-sm font-bold tracking-widest text-white uppercase">Discover</span>
            </div>
            <p class="text-sm text-zinc-500 leading-relaxed mb-5">
              Your gateway to extraordinary travel experiences. Explore, dream, and discover the world with confidence.
            </p>
            <div class="flex items-center gap-3">
              <a v-for="soc in ['twitter','instagram','facebook']" :key="soc" href="#"
                class="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-zinc-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                <svg v-if="soc === 'twitter'" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.849L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <svg v-else-if="soc === 'instagram'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Explore</p>
              <div class="flex flex-col gap-2.5">
                <a v-for="l in ['Destinations', 'Experiences', 'Collections', 'Travel Guides']" :key="l" href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">{{ l }}</a>
              </div>
            </div>
            <div>
              <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Company</p>
              <div class="flex flex-col gap-2.5">
                <a v-for="l in ['About us', 'Blog', 'Careers', 'Press']" :key="l" href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">{{ l }}</a>
              </div>
            </div>
            <div>
              <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Support</p>
              <div class="flex flex-col gap-2.5">
                <a v-for="l in ['Help Center', 'Contact us', 'Privacy', 'Terms']" :key="l" href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">{{ l }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 mt-10 border-t border-white/5">
          <p class="text-xs text-zinc-600">© 2026 Discover. All rights reserved. Built with Elvin UI.</p>
          <div class="flex items-center gap-4">
            <span class="text-xs text-zinc-600">🌍 English (US)</span>
            <span class="text-xs text-zinc-600">💰 USD</span>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>
