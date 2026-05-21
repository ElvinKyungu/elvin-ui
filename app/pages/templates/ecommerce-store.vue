<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: string
  gradient: string
  category: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const products: Product[] = [
  { id:1,  name:'AirPods Pro Max',    brand:'Apple',   price:549,  rating:4.9, reviews:2847, badge:'Best Seller', gradient:'from-zinc-700 to-zinc-900',          category:'Electronics' },
  { id:2,  name:'Sony WH-1000XM5',   brand:'Sony',    price:349,  originalPrice:399, rating:4.8, reviews:1203, badge:'Sale', gradient:'from-zinc-800 to-zinc-950', category:'Electronics' },
  { id:3,  name:'Nike Air Max 270',  brand:'Nike',    price:150,  rating:4.7, reviews:892,  gradient:'from-emerald-900/50 to-zinc-900',   category:'Clothing' },
  { id:4,  name:'MacBook Air M3',    brand:'Apple',   price:1299, rating:4.9, reviews:456,  badge:'New',  gradient:'from-zinc-700 to-zinc-900',          category:'Electronics' },
  { id:5,  name:'Galaxy Watch 6',    brand:'Samsung', price:299,  originalPrice:349, rating:4.6, reviews:678, badge:'Sale', gradient:'from-blue-900/40 to-zinc-900', category:'Electronics' },
  { id:6,  name:'Adidas Ultraboost', brand:'Adidas',  price:190,  rating:4.7, reviews:1120, gradient:'from-zinc-800 to-zinc-950',          category:'Clothing' },
  { id:7,  name:'Kindle Paperwhite', brand:'Amazon',  price:139,  rating:4.8, reviews:3401, gradient:'from-amber-900/30 to-zinc-900',      category:'Books' },
  { id:8,  name:'Dyson V15 Detect',  brand:'Dyson',   price:749,  rating:4.9, reviews:234,  badge:'New',  gradient:'from-purple-900/30 to-zinc-900',     category:'Home & Garden' },
  { id:9,  name:'iPad Pro 13"',      brand:'Apple',   price:1099, rating:4.9, reviews:567,  gradient:'from-zinc-700 to-zinc-800',          category:'Electronics' },
  { id:10, name:'Yoga Mat Pro',      brand:'Nike',    price:89,   rating:4.5, reviews:445,  gradient:'from-emerald-900/30 to-zinc-900',    category:'Sports' },
  { id:11, name:'PS5 Controller',    brand:'Sony',    price:69,   rating:4.8, reviews:2100, gradient:'from-blue-900/30 to-zinc-900',       category:'Electronics' },
  { id:12, name:'AirTag 4-Pack',     brand:'Apple',   price:99,   rating:4.7, reviews:890,  badge:'Bundle', gradient:'from-zinc-700 to-zinc-900',         category:'Electronics' },
]

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports']

const brands = [
  { name:'Apple', count:245 },
  { name:'Nike', count:182 },
  { name:'Samsung', count:134 },
  { name:'Sony', count:98 },
  { name:'Adidas', count:76 },
]

const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating']

// ─── State ────────────────────────────────────────────────────────────────────
const activeCategory   = ref('All')
const minPrice         = ref(0)
const maxPrice         = ref(500)
const selectedBrands   = ref<string[]>([])
const minRating        = ref(0)
const sortBy           = ref('Relevance')
const hoveredProduct   = ref<number | null>(null)
const showCartDrawer   = ref(false)
const showQuickView    = ref(false)
const showFilterDrawer = ref(false)
const quickViewProduct = ref<Product | null>(null)
const quickViewQty     = ref(1)
const wishlist         = ref<Set<number>>(new Set())

// Cart
const cart = ref<{ id: number; qty: number }[]>([])

const addToCart = (product: Product) => {
  const ex = cart.value.find(i => i.id === product.id)
  if (ex) ex.qty++
  else cart.value.push({ id: product.id, qty: 1 })
  showCartDrawer.value = true
  animateCartBadge()
}

const removeFromCart = (id: number) => {
  cart.value = cart.value.filter(i => i.id !== id)
}

const updateQty = (id: number, delta: number) => {
  const item = cart.value.find(i => i.id === id)
  if (!item) return
  item.qty = Math.max(1, item.qty + delta)
}

const cartCount = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))
const cartTotal = computed(() => cart.value.reduce((s, i) => {
  const p = products.find(p => p.id === i.id)
  return s + (p?.price ?? 0) * i.qty
}, 0))

const toggleWishlist = (id: number) => {
  const next = new Set(wishlist.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  wishlist.value = next
}

function openQuickView(product: Product) {
  quickViewProduct.value = product
  quickViewQty.value = 1
  showQuickView.value = true
}

// ─── Filters ─────────────────────────────────────────────────────────────────
const filteredProducts = computed(() => {
  let list = products

  if (activeCategory.value !== 'All') {
    list = list.filter(p => p.category === activeCategory.value)
  }
  list = list.filter(p => p.price >= minPrice.value && p.price <= maxPrice.value)
  if (selectedBrands.value.length) {
    list = list.filter(p => selectedBrands.value.includes(p.brand))
  }
  if (minRating.value > 0) {
    list = list.filter(p => p.rating >= minRating.value)
  }

  if (sortBy.value === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'Rating') list = [...list].sort((a, b) => b.rating - a.rating)

  return list
})

function resetFilters() {
  activeCategory.value = 'All'
  minPrice.value = 0
  maxPrice.value = 500
  selectedBrands.value = []
  minRating.value = 0
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function badgeClass(badge?: string) {
  if (!badge) return ''
  const map: Record<string, string> = {
    'Best Seller': 'bg-amber-500/90 text-white',
    'Sale':        'bg-rose-500/90 text-white',
    'New':         'bg-emerald-500/90 text-white',
    'Bundle':      'bg-blue-500/90 text-white',
  }
  return map[badge] ?? 'bg-zinc-700 text-zinc-300'
}

function productName(id: number) {
  return products.find(p => p.id === id)?.name ?? ''
}
function productPrice(id: number) {
  return products.find(p => p.id === id)?.price ?? 0
}

// ─── GSAP ──────────────────────────────────────────────────────────────────────
const cartBadgeRef = useTemplateRef<HTMLElement>('cartBadge')

function animateCartBadge() {
  if (cartBadgeRef.value) {
    gsap.fromTo(cartBadgeRef.value, { scale: 1.6 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' })
  }
}

onMounted(() => {
  gsap.from('.product-card', {
    scale: 0.95, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'power3.out', delay: 0.1,
  })

  document.querySelectorAll<HTMLElement>('.product-card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -4, scale: 1.01, duration: 0.22, ease: 'power2.out' }))
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, scale: 1, duration: 0.22, ease: 'power2.out' }))
  })
})

watch(filteredProducts, () => {
  nextTick(() => {
    gsap.from('.product-card', {
      scale: 0.95, opacity: 0, duration: 0.38, stagger: 0.03, ease: 'power2.out',
    })
  })
})

onUnmounted(() => {
  gsap.killTweensOf('.product-card')
})
</script>

<template>
  <div class="min-h-screen text-white" style="background:#080808;font-family:Inter,system-ui,sans-serif">

    <!-- ─── Header ────────────────────────────────────────────────────────────── -->
    <header class="h-16 flex items-center gap-4 px-5 border-b border-zinc-800/60 sticky top-0 z-20 backdrop-blur-md" style="background:rgba(8,8,8,0.92)">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 shrink-0">
        <UiLogo :size="28" color="white" />
        <span class="text-sm font-bold text-white tracking-tight">Elvin Store</span>
      </div>

      <!-- Search (centered) -->
      <div class="flex-1 hidden md:flex justify-center px-4">
        <label class="relative w-full max-w-sm">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
        </label>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-1.5 ml-auto">
        <!-- Mobile search -->
        <button class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>

        <!-- Wishlist -->
        <button class="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors relative">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span v-if="wishlist.size > 0" class="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center leading-none">{{ wishlist.size }}</span>
        </button>

        <!-- Cart -->
        <button @click="showCartDrawer = true" class="relative w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <Transition enter-active-class="transition-all duration-150" leave-active-class="transition-all duration-150" enter-from-class="scale-0 opacity-0" leave-to-class="scale-0 opacity-0">
            <span v-if="cartCount > 0" ref="cartBadge" class="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center leading-none shadow-lg shadow-emerald-500/40">{{ cartCount }}</span>
          </Transition>
        </button>

        <!-- Avatar -->
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20">EC</div>
      </div>
    </header>

    <!-- ─── Body ──────────────────────────────────────────────────────────────── -->
    <div class="flex">

      <!-- ─── Desktop Filter Sidebar ──────────────────────────────────────────── -->
      <aside class="hidden lg:flex w-60 shrink-0 flex-col gap-6 p-5 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-zinc-800/60">

        <!-- Category -->
        <div>
          <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Category</p>
          <div class="flex flex-col gap-0.5">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              :class="[
                'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all text-left',
                activeCategory === cat
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              ]"
            >
              {{ cat }}
              <span v-if="activeCategory === cat" class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </button>
          </div>
        </div>

        <!-- Price Range -->
        <div>
          <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Price Range</p>
          <div class="flex items-center gap-2">
            <input v-model.number="minPrice" type="number" min="0" max="5000" placeholder="0" class="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-all text-center tabular-nums" />
            <span class="text-zinc-600 shrink-0">–</span>
            <input v-model.number="maxPrice" type="number" min="0" max="5000" placeholder="500" class="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-all text-center tabular-nums" />
          </div>
        </div>

        <!-- Brand -->
        <div>
          <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Brand</p>
          <div class="flex flex-col gap-2">
            <label v-for="brand in brands" :key="brand.name" class="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" :value="brand.name" v-model="selectedBrands" class="w-4 h-4 rounded accent-emerald-500 cursor-pointer" />
              <span :class="['text-sm flex-1 transition-colors', selectedBrands.includes(brand.name) ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200']">{{ brand.name }}</span>
              <span class="text-[10px] text-zinc-600">{{ brand.count }}</span>
            </label>
          </div>
        </div>

        <!-- Rating -->
        <div>
          <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Rating</p>
          <div class="flex flex-col gap-1.5">
            <button
              v-for="r in [5, 4, 3]"
              :key="r"
              @click="minRating = minRating === r ? 0 : r"
              :class="[
                'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all text-left',
                minRating === r ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              ]"
            >
              <span>{{ '★'.repeat(r) }}{{ r < 5 ? '☆'.repeat(5-r) : '' }}</span>
              <span v-if="r < 5" class="text-zinc-500">{{ r }}★ and above</span>
              <span v-else class="text-zinc-500">5 stars</span>
            </button>
          </div>
        </div>

        <!-- Reset -->
        <button @click="resetFilters" class="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors border border-zinc-800 hover:border-zinc-700">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
          Reset filters
        </button>
      </aside>

      <!-- ─── Product Grid ─────────────────────────────────────────────────────── -->
      <main class="flex-1 p-5 lg:p-6 min-w-0">

        <!-- Sort bar -->
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <!-- Mobile filter toggle -->
            <button @click="showFilterDrawer = true" class="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Filters
            </button>
            <p class="text-sm text-zinc-500">Showing <span class="text-white font-semibold">{{ filteredProducts.length }}</span> products</p>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs text-zinc-500 shrink-0">Sort:</label>
            <select v-model="sortBy" class="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 px-2.5 py-1.5 focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer appearance-none pr-6 relative">
              <option v-for="opt in sortOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card group bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden cursor-pointer relative"
            @mouseenter="hoveredProduct = product.id"
            @mouseleave="hoveredProduct = null"
          >
            <!-- Product image placeholder -->
            <div :class="['h-52 bg-gradient-to-br relative overflow-hidden', product.gradient]">
              <!-- Badge -->
              <span v-if="product.badge" :class="['absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-lg z-10', badgeClass(product.badge)]">
                {{ product.badge }}
              </span>

              <!-- Wishlist -->
              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all z-10"
              >
                <svg
                  class="w-4 h-4 transition-colors"
                  :class="wishlist.has(product.id) ? 'text-rose-500 fill-rose-500' : 'text-white'"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              <!-- Product name overlay hint -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-base font-bold text-white/20 text-center px-4 leading-tight select-none">{{ product.name }}</span>
              </div>

              <!-- Quick view overlay -->
              <div :class="['absolute inset-x-0 bottom-0 flex justify-center pb-3 transition-all duration-200', hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2']">
                <button
                  @click.stop="openQuickView(product)"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-semibold hover:bg-black/80 transition-colors border border-white/10"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Quick view
                </button>
              </div>
            </div>

            <!-- Product info -->
            <div class="p-4">
              <p class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">{{ product.brand }}</p>
              <p class="text-sm font-semibold text-white leading-snug mb-2 line-clamp-2">{{ product.name }}</p>

              <!-- Rating -->
              <div class="flex items-center gap-1.5 mb-3">
                <div class="flex items-center gap-0.5">
                  <svg v-for="s in 5" :key="s" class="w-3 h-3" :class="s <= Math.round(product.rating) ? 'text-amber-400' : 'text-zinc-700'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="text-xs font-semibold text-amber-400">{{ product.rating }}</span>
                <span class="text-[10px] text-zinc-600">({{ product.reviews.toLocaleString() }})</span>
              </div>

              <!-- Price + Cart -->
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-baseline gap-1.5">
                  <span class="text-lg font-bold text-white tabular-nums">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-xs text-zinc-500 line-through tabular-nums">${{ product.originalPrice }}</span>
                </div>
                <button
                  @click.stop="addToCart(product)"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 shrink-0"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="filteredProducts.length === 0" class="col-span-full flex flex-col items-center justify-center py-24 gap-4">
            <svg class="w-12 h-12 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p class="text-zinc-500 text-sm">No products match your filters.</p>
            <button @click="resetFilters" class="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors">Reset filters</button>
          </div>
        </div>
      </main>
    </div>

    <!-- ─── Product Quick View Modal ──────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showQuickView" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[2px]" @click.self="showQuickView = false">
        <div class="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden flex flex-col sm:flex-row max-h-[90vh]">

          <!-- Image side -->
          <div v-if="quickViewProduct" :class="['sm:w-64 shrink-0 bg-gradient-to-br relative min-h-[220px] sm:min-h-0', quickViewProduct.gradient]">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-bold text-white/20 text-center px-6 leading-tight select-none">{{ quickViewProduct.name }}</span>
            </div>
            <span v-if="quickViewProduct.badge" :class="['absolute top-4 left-4 text-[10px] font-bold px-2 py-0.5 rounded-lg', badgeClass(quickViewProduct.badge)]">{{ quickViewProduct.badge }}</span>
          </div>

          <!-- Info side -->
          <div v-if="quickViewProduct" class="flex-1 flex flex-col p-6 overflow-y-auto">
            <!-- Close -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">{{ quickViewProduct.brand }}</p>
                <h2 class="text-xl font-bold text-white leading-tight">{{ quickViewProduct.name }}</h2>
              </div>
              <button @click="showQuickView = false" class="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-1.5 mb-4">
              <div class="flex gap-0.5">
                <svg v-for="s in 5" :key="s" class="w-4 h-4" :class="s <= Math.round(quickViewProduct.rating) ? 'text-amber-400' : 'text-zinc-700'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <span class="text-sm font-semibold text-amber-400">{{ quickViewProduct.rating }}</span>
              <span class="text-xs text-zinc-600">({{ quickViewProduct.reviews.toLocaleString() }} reviews)</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-2xl font-bold text-white">${{ quickViewProduct.price }}</span>
              <span v-if="quickViewProduct.originalPrice" class="text-sm text-zinc-500 line-through">${{ quickViewProduct.originalPrice }}</span>
              <span v-if="quickViewProduct.originalPrice" class="text-xs font-bold text-rose-400">Save ${{ quickViewProduct.originalPrice - quickViewProduct.price }}</span>
            </div>

            <!-- Description -->
            <p class="text-sm text-zinc-400 leading-relaxed mb-5">Premium quality product designed for everyday use. Industry-leading performance meets refined aesthetics. Built to last, backed by a 2-year warranty.</p>

            <!-- Qty -->
            <div class="flex items-center gap-3 mb-5">
              <span class="text-xs font-medium text-zinc-500">Quantity</span>
              <div class="flex items-center gap-1 bg-zinc-800 rounded-xl p-1">
                <button @click="quickViewQty = Math.max(1, quickViewQty - 1)" class="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
                </button>
                <span class="w-8 text-center text-sm font-semibold text-white tabular-nums">{{ quickViewQty }}</span>
                <button @click="quickViewQty++" class="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
            </div>

            <!-- CTA -->
            <div class="flex flex-col gap-2 mt-auto">
              <button
                @click="addToCart(quickViewProduct); showQuickView = false"
                class="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/20"
              >
                Add to Cart — ${{ quickViewProduct.price * quickViewQty }}
              </button>
              <button @click="showQuickView = false" class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors text-center py-1">View full details →</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Cart Drawer (right slide) ─────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-250 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showCartDrawer" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" @click="showCartDrawer = false" />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-250 ease-in"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div v-if="showCartDrawer" class="fixed right-0 inset-y-0 z-50 w-96 flex flex-col bg-zinc-950 border-l border-zinc-800/60 shadow-2xl shadow-black/60">

        <!-- Cart header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60 shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p class="text-base font-bold text-white">Your Cart <span class="text-sm font-normal text-zinc-500">({{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }})</span></p>
          </div>
          <button @click="showCartDrawer = false" class="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Cart items -->
        <div class="flex-1 overflow-y-auto px-5 py-4">

          <!-- Empty state -->
          <div v-if="cart.length === 0" class="h-full flex flex-col items-center justify-center gap-4 pb-10">
            <div class="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <svg class="w-8 h-8 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div class="text-center">
              <p class="text-white font-semibold mb-1">Your cart is empty</p>
              <p class="text-sm text-zinc-500">Add products to get started</p>
            </div>
            <button @click="showCartDrawer = false" class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/20">Start shopping</button>
          </div>

          <!-- Items list -->
          <div v-else class="flex flex-col gap-3">
            <div v-for="item in cart" :key="item.id" class="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60 group">
              <!-- Mini image placeholder -->
              <div :class="['w-14 h-14 rounded-xl bg-gradient-to-br shrink-0 relative overflow-hidden', products.find(p => p.id === item.id)?.gradient ?? 'from-zinc-800 to-zinc-900']">
                <span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/20 text-center px-1 leading-tight">{{ productName(item.id) }}</span>
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-white truncate">{{ productName(item.id) }}</p>
                <p class="text-xs text-zinc-500 mt-0.5 tabular-nums">${{ productPrice(item.id) }} each</p>
                <!-- Qty controls -->
                <div class="flex items-center gap-1 mt-2">
                  <button @click="updateQty(item.id, -1)" class="w-6 h-6 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
                  </button>
                  <span class="w-7 text-center text-xs font-semibold text-white tabular-nums">{{ item.qty }}</span>
                  <button @click="updateQty(item.id, 1)" class="w-6 h-6 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>

              <div class="flex flex-col items-end gap-2 shrink-0">
                <p class="text-sm font-bold text-white tabular-nums">${{ productPrice(item.id) * item.qty }}</p>
                <button @click="removeFromCart(item.id)" class="text-zinc-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart footer -->
        <div v-if="cart.length > 0" class="border-t border-zinc-800/60 p-5 flex flex-col gap-3 shrink-0">
          <div class="flex items-center justify-between">
            <span class="text-sm text-zinc-400">Subtotal</span>
            <span class="text-base font-bold text-white tabular-nums">${{ cartTotal.toLocaleString() }}</span>
          </div>
          <div class="flex items-center justify-between text-xs text-zinc-600">
            <span>Shipping</span><span>Calculated at checkout</span>
          </div>
          <button class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors shadow-xl shadow-emerald-500/20 mt-1">
            Checkout — ${{ cartTotal.toLocaleString() }} →
          </button>
          <button @click="showCartDrawer = false" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center py-1">Continue shopping</button>
        </div>
      </div>
    </Transition>

    <!-- ─── Mobile Filter Drawer (left slide) ─────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-250 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showFilterDrawer" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden" @click="showFilterDrawer = false" />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-250 ease-in"
      enter-from-class="-translate-x-full"
      leave-to-class="-translate-x-full"
    >
      <div v-if="showFilterDrawer" class="fixed left-0 inset-y-0 z-50 w-72 flex flex-col bg-zinc-950 border-r border-zinc-800/60 shadow-2xl shadow-black/60 overflow-y-auto lg:hidden">

        <!-- Drawer header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60 shrink-0">
          <p class="text-base font-bold text-white">Filters</p>
          <button @click="showFilterDrawer = false" class="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="flex flex-col gap-6 p-5">
          <!-- Category -->
          <div>
            <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Category</p>
            <div class="flex flex-col gap-0.5">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="activeCategory = cat"
                :class="[
                  'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all text-left',
                  activeCategory === cat
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                ]"
              >{{ cat }}</button>
            </div>
          </div>

          <!-- Price Range -->
          <div>
            <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Price Range</p>
            <div class="flex items-center gap-2">
              <input v-model.number="minPrice" type="number" placeholder="0" class="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-all text-center tabular-nums" />
              <span class="text-zinc-600 shrink-0">–</span>
              <input v-model.number="maxPrice" type="number" placeholder="500" class="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-all text-center tabular-nums" />
            </div>
          </div>

          <!-- Brand -->
          <div>
            <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Brand</p>
            <div class="flex flex-col gap-2">
              <label v-for="brand in brands" :key="brand.name" class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" :value="brand.name" v-model="selectedBrands" class="w-4 h-4 rounded accent-emerald-500 cursor-pointer" />
                <span class="text-sm text-zinc-400">{{ brand.name }}</span>
                <span class="text-[10px] text-zinc-600 ml-auto">{{ brand.count }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Apply + Reset -->
        <div class="mt-auto p-5 border-t border-zinc-800/60 flex flex-col gap-2.5">
          <button @click="showFilterDrawer = false" class="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/20">Apply Filters</button>
          <button @click="resetFilters; showFilterDrawer = false" class="w-full py-2 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors">Reset all</button>
        </div>
      </div>
    </Transition>

  </div>
</template>
