<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Product data ──────────────────────────────────────────────────────────────
const images = [
  'from-zinc-700 via-zinc-800 to-zinc-900',
  'from-zinc-600 via-zinc-800 to-zinc-900',
  'from-zinc-700 via-zinc-900 to-zinc-950',
  'from-emerald-900/40 via-zinc-800 to-zinc-900',
]

const colors = [
  { name: 'Space Gray', class: 'bg-zinc-600' },
  { name: 'Silver', class: 'bg-zinc-300' },
  { name: 'Sky Blue', class: 'bg-blue-400' },
]

const highlights = [
  { icon: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18', text: 'Apple H2 chip for next-generation performance' },
  { icon: 'M15.536 8.464a5 5 0 0 1 0 7.072m2.828-9.9a9 9 0 0 1 0 12.728M5.586 15.536a5 5 0 0 0 0-7.072m-2.828 9.9a9 9 0 0 0 0-12.728', text: 'Active Noise Cancellation and Transparency Mode' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', text: 'Up to 20 hours of battery life' },
  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text: 'Personalized Spatial Audio with dynamic head tracking' },
]

const relatedProducts = [
  { name: 'AirPods Pro 2nd Gen', price: 249, badge: 'Popular', gradient: 'from-zinc-700 to-zinc-900' },
  { name: 'Apple Watch Ultra 2', price: 799, badge: 'New', gradient: 'from-orange-900/40 to-zinc-900' },
  { name: 'MagSafe Charger', price: 39, badge: null, gradient: 'from-blue-900/30 to-zinc-900' },
  { name: 'iPhone 15 Pro Case', price: 59, badge: 'Sale', gradient: 'from-purple-900/30 to-zinc-900' },
]

const reviews = [
  {
    name: 'Gabriel D.',
    date: 'April 14, 2025',
    rating: 5,
    avatar: 'GD',
    grad: 'from-emerald-500 to-teal-500',
    text: 'These are hands-down the best headphones I\'ve ever owned. The noise cancellation is absolutely incredible — I tested them on a packed subway and couldn\'t hear a thing. The sound quality is pristine, and the spatial audio makes movies feel like a theater experience.',
  },
  {
    name: 'Vander O.',
    date: 'March 28, 2025',
    rating: 5,
    avatar: 'VO',
    grad: 'from-blue-500 to-blue-600',
    text: 'Worth every single penny. I was skeptical about the price but after using them for a week I completely get it. Battery lasts all day, the fit is comfortable even after hours, and they pair seamlessly with all my Apple devices.',
  },
  {
    name: 'Kevin M.',
    date: 'February 9, 2025',
    rating: 4,
    avatar: 'KM',
    grad: 'from-amber-500 to-amber-600',
    text: 'Fantastic headphones overall. The build quality feels premium and the sound profile is very balanced. Only minor gripe is they\'re a little bulky for commuting but that\'s a small trade-off for the audio quality you get.',
  },
]

const specRows = [
  { label: 'Connectivity', value: 'Bluetooth 5.3, Lightning' },
  { label: 'Driver Size', value: '40mm dynamic driver' },
  { label: 'Frequency Response', value: '20Hz – 20,000Hz' },
  { label: 'Battery Life', value: 'Up to 20 hours (ANC on)' },
  { label: 'Weight', value: '384.8g' },
  { label: 'Charging', value: 'Lightning, 3 hrs full charge' },
  { label: 'Available Colors', value: 'Space Gray, Silver, Sky Blue, Green, Pink' },
  { label: 'Warranty', value: '2-year limited warranty' },
]

// ─── State ──────────────────────────────────────────────────────────────────────
const activeImage  = ref(0)
const activeColor  = ref('Space Gray')
const quantity     = ref(1)
const addingToCart = ref(false)
const cartCount    = ref(2)
const activeTab    = ref<'description' | 'reviews' | 'specs'>('description')
const showLightbox = ref(false)
const lightboxIdx  = ref(0)
const showCart     = ref(false)
const showShare    = ref(false)
const linkCopied   = ref(false)
const isWishlisted = ref(false)

// ─── Cart drawer items ─────────────────────────────────────────────────────────
const cartItems = ref([
  { name: 'AirPods Pro Max', variant: 'Space Gray', qty: 1, price: 549, gradient: 'from-zinc-700 to-zinc-900' },
])

// ─── Refs ───────────────────────────────────────────────────────────────────────
const addCartBtn   = useTemplateRef<HTMLButtonElement>('addCartBtn')
const minusBtn     = useTemplateRef<HTMLButtonElement>('minusBtn')
const plusBtn      = useTemplateRef<HTMLButtonElement>('plusBtn')
const productLeft  = useTemplateRef<HTMLElement>('productLeft')
const productRight = useTemplateRef<HTMLElement>('productRight')
const tabContent   = useTemplateRef<HTMLElement>('tabContent')
const mainImage    = useTemplateRef<HTMLElement>('mainImage')

// ─── Actions ───────────────────────────────────────────────────────────────────
function changeImage(idx: number) {
  if (idx === activeImage.value) return
  if (mainImage.value) {
    gsap.to(mainImage.value, {
      opacity: 0, duration: 0.15, ease: 'power2.in',
      onComplete: () => {
        activeImage.value = idx
        gsap.to(mainImage.value, { opacity: 1, duration: 0.2, ease: 'power2.out' })
      },
    })
  } else {
    activeImage.value = idx
  }
}

function decrementQty() {
  if (quantity.value <= 1) return
  quantity.value--
  if (minusBtn.value) gsap.fromTo(minusBtn.value, { scale: 0.82 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' })
}

function incrementQty() {
  if (quantity.value >= 10) return
  quantity.value++
  if (plusBtn.value) gsap.fromTo(plusBtn.value, { scale: 0.82 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' })
}

function addToCart() {
  if (addingToCart.value) return
  addingToCart.value = true
  cartCount.value += quantity.value
  if (addCartBtn.value) {
    gsap.timeline()
      .to(addCartBtn.value, { scale: 0.94, duration: 0.1, ease: 'power2.in' })
      .to(addCartBtn.value, { scale: 1, duration: 0.35, ease: 'back.out(2.5)' })
  }
  setTimeout(() => { addingToCart.value = false }, 1800)
}

function switchTab(tab: 'description' | 'reviews' | 'specs') {
  if (tab === activeTab.value) return
  if (tabContent.value) {
    gsap.to(tabContent.value, {
      opacity: 0, y: 6, duration: 0.15,
      onComplete: () => {
        activeTab.value = tab
        nextTick(() => {
          gsap.fromTo(tabContent.value!, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' })
        })
      },
    })
  } else {
    activeTab.value = tab
  }
}

function openLightbox(idx: number) {
  lightboxIdx.value = idx
  showLightbox.value = true
}

function lightboxPrev() { lightboxIdx.value = (lightboxIdx.value - 1 + images.length) % images.length }
function lightboxNext() { lightboxIdx.value = (lightboxIdx.value + 1) % images.length }

function copyLink() {
  linkCopied.value = true
  setTimeout(() => { linkCopied.value = false }, 2000)
}

// ─── GSAP mount ───────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.from(productLeft.value, { x: -28, opacity: 0, duration: 0.65, ease: 'power3.out', delay: 0.1 })
  gsap.from(productRight.value, { x: 28, opacity: 0, duration: 0.65, ease: 'power3.out', delay: 0.18 })
  gsap.from('.related-card', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.4 })
  gsap.from('.tab-panel', { y: 12, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.35 })
})

onUnmounted(() => {
  gsap.killTweensOf([productLeft.value, productRight.value, '.related-card', '.tab-panel', mainImage.value])
})
</script>

<template>
  <div class="min-h-screen bg-[#080808] text-white" style="font-family:Inter,system-ui,sans-serif">

    <!-- ─── Header ───────────────────────────────────────────────────────────── -->
    <header class="sticky top-0 z-20 h-14 flex items-center px-4 sm:px-6 border-b border-zinc-800/60 bg-[#080808]/90 backdrop-blur-xl">
      <a href="/templates" class="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span class="hidden sm:inline">Back to store</span>
      </a>

      <div class="flex items-center gap-2 mx-auto">
        <UiLogo :size="24" color="white" />
        <span class="text-sm font-bold text-white tracking-tight">Elvin Store</span>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          @click="isWishlisted = !isWishlisted"
          :class="['w-8 h-8 rounded-xl flex items-center justify-center transition-colors border',
            isWishlisted ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-zinc-400 bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:text-white']"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button
          @click="showCart = true"
          class="relative w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center leading-none">{{ cartCount }}</span>
        </button>
      </div>
    </header>

    <!-- ─── Main content ──────────────────────────────────────────────────────── -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      <!-- Breadcrumb -->
      <nav class="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
        <span class="hover:text-zinc-300 cursor-pointer transition-colors">Electronics</span>
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span class="hover:text-zinc-300 cursor-pointer transition-colors">Headphones</span>
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span class="text-zinc-300">AirPods Pro Max</span>
      </nav>

      <!-- Product section -->
      <div class="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 mb-12">

        <!-- Left: Gallery -->
        <div ref="productLeft">
          <!-- Main image -->
          <div class="relative mb-3">
            <div
              ref="mainImage"
              :class="`h-64 sm:h-80 lg:h-[420px] rounded-2xl bg-gradient-to-br ${images[activeImage]} flex items-center justify-center relative overflow-hidden cursor-zoom-in`"
              @click="openLightbox(activeImage)"
            >
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
              <div class="text-center select-none pointer-events-none">
                <div class="w-24 h-24 mx-auto mb-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-12 h-12 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M15.536 8.464a5 5 0 0 1 0 7.072m2.828-9.9a9 9 0 0 1 0 12.728M5.586 15.536a5 5 0 0 0 0-7.072m-2.828 9.9a9 9 0 0 0 0-12.728"/>
                  </svg>
                </div>
                <p class="text-white/60 text-sm font-medium">AirPods Pro Max</p>
              </div>
            </div>
            <!-- Zoom button -->
            <button
              @click.stop="openLightbox(activeImage)"
              class="absolute top-3 right-3 w-8 h-8 rounded-xl bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </button>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-2.5">
            <button
              v-for="(img, i) in images" :key="i"
              @click="changeImage(i)"
              :class="[
                'flex-1 h-20 rounded-xl bg-gradient-to-br transition-all duration-200 relative overflow-hidden',
                img,
                activeImage === i ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#080808]' : 'opacity-50 hover:opacity-80 hover:ring-1 hover:ring-zinc-600',
              ]"
            >
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
            </button>
          </div>
        </div>

        <!-- Right: Details -->
        <div ref="productRight" class="flex flex-col gap-4">
          <!-- Brand + name -->
          <div>
            <span class="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-lg inline-block mb-3 font-medium">Apple</span>
            <h1 class="text-3xl font-black text-white leading-tight mb-2">AirPods Pro Max</h1>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-0.5">
                <svg v-for="i in 5" :key="i" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span class="text-sm font-bold text-emerald-400">4.9</span>
              <a href="#reviews" class="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">(2,847 reviews)</a>
            </div>
          </div>

          <!-- Price + description -->
          <div>
            <p class="text-4xl font-black text-white mb-3">$549</p>
            <p class="text-zinc-400 text-sm leading-relaxed">
              The ultimate listening experience with Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. Computational audio delivers the highest quality listening experience ever in AirPods.
            </p>
          </div>

          <div class="h-px bg-zinc-800/80" />

          <!-- Color picker -->
          <div>
            <p class="text-xs text-zinc-400 font-medium mb-2.5">
              Color: <span class="text-white font-semibold">{{ activeColor }}</span>
            </p>
            <div class="flex items-center gap-2.5">
              <button
                v-for="c in colors" :key="c.name"
                @click="activeColor = c.name"
                :title="c.name"
                :class="[
                  'w-8 h-8 rounded-full transition-all duration-200',
                  c.class,
                  activeColor === c.name ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#080808] scale-110' : 'hover:scale-105 opacity-70 hover:opacity-100',
                ]"
              />
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <p class="text-xs text-zinc-400 font-medium mb-2.5">Quantity</p>
            <div class="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit">
              <button
                ref="minusBtn"
                @click="decrementQty"
                :disabled="quantity <= 1"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="w-8 text-center text-sm font-bold text-white tabular-nums">{{ quantity }}</span>
              <button
                ref="plusBtn"
                @click="incrementQty"
                :disabled="quantity >= 10"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>

          <!-- Add to cart -->
          <button
            ref="addCartBtn"
            @click="addToCart"
            :disabled="addingToCart"
            :class="[
              'w-full h-12 rounded-xl flex items-center justify-center gap-2.5 text-sm font-bold transition-all duration-200',
              addingToCart
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600 shadow-lg shadow-emerald-500/20',
            ]"
          >
            <svg v-if="!addingToCart" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {{ addingToCart ? 'Added to cart!' : 'Add to cart' }}
          </button>

          <!-- Wishlist -->
          <button
            @click="isWishlisted = !isWishlisted"
            :class="[
              'w-full h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold border transition-all duration-200',
              isWishlisted
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/15'
                : 'border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-white',
            ]"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {{ isWishlisted ? 'Wishlisted' : 'Add to wishlist' }}
          </button>

          <!-- Trust row -->
          <div class="flex items-center gap-4 flex-wrap">
            <div v-for="trust in [
              { icon: 'M5 12h14M12 5l7 7-7 7', label: 'Free shipping' },
              { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: '2-year warranty' },
              { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 0-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m4 0h-4', label: 'Free returns' },
            ]" :key="trust.label" class="flex items-center gap-1.5 text-xs text-zinc-500">
              <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path :d="trust.icon"/></svg>
              {{ trust.label }}
            </div>
            <!-- Share -->
            <button @click="showShare = true" class="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-auto">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share
            </button>
          </div>

          <div class="h-px bg-zinc-800/80" />

          <!-- Highlights -->
          <div>
            <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Highlights</p>
            <ul class="flex flex-col gap-2.5">
              <li v-for="h in highlights" :key="h.text" class="flex items-start gap-2.5">
                <div class="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path :d="h.icon"/>
                  </svg>
                </div>
                <span class="text-sm text-zinc-300 leading-snug">{{ h.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ─── Tabs ──────────────────────────────────────────────────────────── -->
      <div class="tab-panel mb-16">
        <!-- Tab bar -->
        <div class="flex gap-1 border-b border-zinc-800/60 mb-6">
          <button
            v-for="tab in [
              { id: 'description', label: 'Description' },
              { id: 'reviews', label: 'Reviews (2,847)' },
              { id: 'specs', label: 'Specifications' },
            ]" :key="tab.id"
            @click="switchTab(tab.id as 'description' | 'reviews' | 'specs')"
            :class="[
              'px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px',
              activeTab === tab.id
                ? 'text-emerald-400 border-emerald-500'
                : 'text-zinc-500 border-transparent hover:text-zinc-300',
            ]"
          >{{ tab.label }}</button>
        </div>

        <!-- Tab content -->
        <div ref="tabContent">
          <!-- Description -->
          <div v-if="activeTab === 'description'" class="max-w-3xl flex flex-col gap-4 text-zinc-400 text-sm leading-relaxed">
            <p>
              AirPods Pro Max bring a revolutionary new design to over-ear headphones. The custom Apple H2 chip pushes the limits of what's possible with intelligent audio, powering industry-leading Active Noise Cancellation, Transparency Mode, and Personalized Spatial Audio with dynamic head tracking.
            </p>
            <p>
              Every element of AirPods Pro Max has been designed to create an extraordinary listening experience. The breathable knit mesh canopy and memory foam ear cushions work together to create an exceptionally comfortable fit. An innovative dynamic driver delivers powerful bass and incredibly natural sound. The digital crown gives you precise volume control, and a single press plays or pauses audio and answers or ends calls.
            </p>
            <p>
              Personalized Spatial Audio places sound all around you — even adapting to the shape of your ears — for truly immersive audio. By analyzing your unique ear geometry, AirPods Pro Max customize your listening experience like nothing before. And with up to 20 hours of listening, talk time, or movie watching with Active Noise Cancellation and Spatial Audio enabled, you can enjoy uninterrupted sound all day long.
            </p>
          </div>

          <!-- Reviews -->
          <div v-else-if="activeTab === 'reviews'" id="reviews">
            <!-- Rating summary -->
            <div class="flex flex-col sm:flex-row gap-8 mb-8 max-w-3xl">
              <div class="flex flex-col items-center justify-center bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6 shrink-0 w-36">
                <p class="text-5xl font-black text-white mb-1">4.9</p>
                <div class="flex gap-0.5 mb-1">
                  <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p class="text-xs text-zinc-500">2,847 reviews</p>
              </div>
              <div class="flex-1 flex flex-col gap-2">
                <div v-for="bar in [
                  { stars: 5, pct: 89 },
                  { stars: 4, pct: 8 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 0.5 },
                  { stars: 1, pct: 0.5 },
                ]" :key="bar.stars" class="flex items-center gap-3">
                  <span class="text-xs text-zinc-500 w-4 shrink-0">{{ bar.stars }}</span>
                  <svg class="w-3 h-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <div class="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full" :style="`width:${bar.pct}%`" />
                  </div>
                  <span class="text-xs text-zinc-500 w-8 text-right">{{ bar.pct }}%</span>
                </div>
              </div>
            </div>

            <!-- Review cards -->
            <div class="flex flex-col gap-4 max-w-3xl">
              <div v-for="r in reviews" :key="r.name" class="p-5 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl">
                <div class="flex items-center gap-3 mb-3">
                  <div :class="`w-9 h-9 rounded-full bg-gradient-to-br ${r.grad} flex items-center justify-center text-xs font-bold text-white shrink-0`">{{ r.avatar }}</div>
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-white">{{ r.name }}</p>
                    <p class="text-xs text-zinc-500">{{ r.date }}</p>
                  </div>
                  <div class="flex gap-0.5">
                    <svg v-for="i in r.rating" :key="i" class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-zinc-400 leading-relaxed">{{ r.text }}</p>
              </div>
            </div>

            <button class="mt-5 px-5 py-2.5 rounded-xl border border-zinc-800 text-sm font-semibold text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors">
              Load more reviews
            </button>
          </div>

          <!-- Specifications -->
          <div v-else class="max-w-2xl">
            <div class="rounded-2xl border border-zinc-800/60 overflow-hidden">
              <div
                v-for="(row, i) in specRows" :key="row.label"
                :class="['flex items-start gap-4 px-5 py-3.5 text-sm', i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900/20']"
              >
                <span class="text-zinc-500 w-44 shrink-0">{{ row.label }}</span>
                <span class="text-zinc-200">{{ row.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Related products ──────────────────────────────────────────────── -->
      <div class="py-8 border-t border-zinc-800/60">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-white">You might also like</h2>
          <a href="/templates" class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">View all →</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="p in relatedProducts" :key="p.name"
            class="related-card group p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl hover:border-zinc-700/60 transition-all duration-200 cursor-pointer"
          >
            <div :class="`h-32 rounded-xl bg-gradient-to-br ${p.gradient} mb-3 relative overflow-hidden flex items-center justify-center`">
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
              <svg class="w-10 h-10 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M15.536 8.464a5 5 0 0 1 0 7.072m2.828-9.9a9 9 0 0 1 0 12.728M5.586 15.536a5 5 0 0 0 0-7.072m-2.828 9.9a9 9 0 0 0 0-12.728"/>
              </svg>
              <span v-if="p.badge" :class="[
                'absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md',
                p.badge === 'New' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                p.badge === 'Sale' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' :
                'bg-zinc-700/80 text-zinc-300 border border-zinc-600/40',
              ]">{{ p.badge }}</span>
            </div>
            <p class="text-sm font-semibold text-white group-hover:text-emerald-50 transition-colors mb-0.5 truncate">{{ p.name }}</p>
            <p class="text-sm font-bold text-zinc-300">${{ p.price }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- ─── Modal: Lightbox ──────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showLightbox" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" @click.self="showLightbox = false">
        <div class="modal-box relative w-full max-w-2xl">
          <!-- Close -->
          <button @click="showLightbox = false" class="absolute top-3 right-3 w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors z-10">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <!-- Image -->
          <div :class="`h-[60vh] rounded-2xl bg-gradient-to-br ${images[lightboxIdx]} flex items-center justify-center relative overflow-hidden`">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
            <div class="text-center select-none">
              <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg class="w-16 h-16 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <path d="M15.536 8.464a5 5 0 0 1 0 7.072m2.828-9.9a9 9 0 0 1 0 12.728M5.586 15.536a5 5 0 0 0 0-7.072m-2.828 9.9a9 9 0 0 0 0-12.728"/>
                </svg>
              </div>
              <p class="text-white/50 font-medium">AirPods Pro Max</p>
              <p class="text-zinc-600 text-sm mt-1">Image {{ lightboxIdx + 1 }} / {{ images.length }}</p>
            </div>
          </div>
          <!-- Arrows -->
          <button @click="lightboxPrev" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button @click="lightboxNext" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <!-- Thumbnail strip -->
          <div class="flex justify-center gap-2 mt-3">
            <button v-for="(img, i) in images" :key="i" @click="lightboxIdx = i"
              :class="['w-2 h-2 rounded-full transition-all', lightboxIdx === i ? 'bg-emerald-500 w-6' : 'bg-zinc-700 hover:bg-zinc-600']"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Modal: Cart drawer ────────────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showCart" class="fixed inset-0 z-50 flex justify-end" @click.self="showCart = false">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCart = false" />
        <div class="relative w-full max-w-sm bg-zinc-950 border-l border-zinc-800/60 h-full flex flex-col shadow-2xl transition-transform duration-300"
          :class="showCart ? 'translate-x-0' : 'translate-x-full'"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-zinc-800/60">
            <h2 class="text-base font-bold text-white">Cart ({{ cartCount }} items)</h2>
            <button @click="showCart = false" class="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <!-- Items -->
          <div class="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            <div v-for="item in cartItems" :key="item.name" class="flex items-center gap-3 p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-xl">
              <div :class="`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} shrink-0`" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-white truncate">{{ item.name }}</p>
                <p class="text-xs text-zinc-500">{{ item.variant }}</p>
                <p class="text-xs text-zinc-400">Qty: {{ item.qty }}</p>
              </div>
              <p class="text-sm font-bold text-white shrink-0">${{ item.price }}</p>
            </div>
          </div>
          <!-- Footer -->
          <div class="p-5 border-t border-zinc-800/60">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-zinc-400">Subtotal</span>
              <span class="text-sm font-bold text-white">${{ cartItems.reduce((a, i) => a + i.price * i.qty, 0) }}</span>
            </div>
            <a href="/templates/ecommerce-checkout" class="block w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-white flex items-center justify-center transition-colors">
              Proceed to checkout
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Modal: Share ─────────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showShare" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showShare = false">
        <div class="modal-box w-full max-w-sm bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold text-white">Share this product</h2>
            <button @click="showShare = false" class="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Copy link -->
          <div class="flex gap-2 mb-4">
            <div class="flex-1 bg-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-300 truncate border border-zinc-700/60">
              elvinstore.com/products/airpods-pro-max
            </div>
            <button
              @click="copyLink"
              :class="['px-4 py-2 rounded-xl text-sm font-semibold transition-colors shrink-0',
                linkCopied ? 'bg-emerald-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white']"
            >
              {{ linkCopied ? 'Copied!' : 'Copy' }}
            </button>
          </div>

          <!-- Share buttons -->
          <p class="text-xs text-zinc-500 mb-3">Share via</p>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="s in [
              { label: 'Twitter / X', color: 'hover:bg-zinc-700/60' },
              { label: 'Facebook', color: 'hover:bg-blue-500/10 hover:border-blue-500/20' },
              { label: 'Pinterest', color: 'hover:bg-rose-500/10 hover:border-rose-500/20' },
              { label: 'Email', color: 'hover:bg-zinc-700/60' },
            ]" :key="s.label"
              :class="['px-3 py-2.5 rounded-xl border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white transition-all', s.color]"
            >{{ s.label }}</button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box { transition: transform 0.2s ease; }
.modal-enter-from .modal-box, .modal-leave-to .modal-box { transform: scale(0.95) translateY(8px); }
</style>
