<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  author: string
  authorInitials: string
  authorGradient: string
  date: string
  readTime: string
  gradient: string
  featured?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const articles: Article[] = [
  {
    id: 1,
    title: 'Why Developer Experience Is the New Competitive Advantage',
    excerpt: 'The companies winning in 2025 aren\'t just building better products — they\'re building better tooling for the people who build those products.',
    category: 'Product',
    author: 'Gabriel Delattre',
    authorInitials: 'GD',
    authorGradient: 'from-emerald-500 to-teal-500',
    date: 'May 8, 2025',
    readTime: '8 min read',
    gradient: 'from-indigo-600 to-purple-600',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Design Systems in 2025',
    excerpt: 'Design systems are evolving beyond component libraries. Here\'s where the smartest teams are taking them next.',
    category: 'Design',
    author: 'Sara López',
    authorInitials: 'SL',
    authorGradient: 'from-pink-500 to-rose-500',
    date: 'May 6, 2025',
    readTime: '6 min read',
    gradient: 'from-rose-600 to-pink-600',
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Nuxt 4',
    excerpt: 'A practical walkthrough of the new server utilities in Nuxt 4 and how to structure an API that scales with your team.',
    category: 'Engineering',
    author: 'Kevin Maginot',
    authorInitials: 'KM',
    authorGradient: 'from-emerald-500 to-teal-500',
    date: 'May 4, 2025',
    readTime: '10 min read',
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    id: 4,
    title: 'How We Grew to 100k Users Without a Marketing Budget',
    excerpt: 'The full story of how a side project turned into a product people genuinely love — told by the founder who lived it.',
    category: 'Product',
    author: 'Vander Otis',
    authorInitials: 'VO',
    authorGradient: 'from-blue-500 to-cyan-500',
    date: 'May 2, 2025',
    readTime: '7 min read',
    gradient: 'from-violet-600 to-fuchsia-600',
  },
  {
    id: 5,
    title: 'AI-Powered Copywriting Workflows That Actually Work',
    excerpt: 'After testing every major AI writing tool, here\'s what actually speeds up content production without killing your voice.',
    category: 'AI',
    author: 'Elvin Kyungu',
    authorInitials: 'EK',
    authorGradient: 'from-emerald-500 to-teal-600',
    date: 'Apr 30, 2025',
    readTime: '5 min read',
    gradient: 'from-amber-600 to-orange-600',
  },
  {
    id: 6,
    title: 'The Psychology of Color in UI Design',
    excerpt: 'Color isn\'t decoration — it\'s communication. A deep dive into how color choices shape user behavior and brand perception.',
    category: 'Design',
    author: 'Sara López',
    authorInitials: 'SL',
    authorGradient: 'from-pink-500 to-rose-500',
    date: 'Apr 28, 2025',
    readTime: '9 min read',
    gradient: 'from-sky-600 to-blue-600',
  },
  {
    id: 7,
    title: 'From Zero to Production in 24 Hours with Nuxt 4',
    excerpt: 'A speed run of building and shipping a complete web app. Every decision, every shortcut, fully documented.',
    category: 'Engineering',
    author: 'Kevin Maginot',
    authorInitials: 'KM',
    authorGradient: 'from-emerald-500 to-teal-500',
    date: 'Apr 25, 2025',
    readTime: '12 min read',
    gradient: 'from-lime-600 to-emerald-600',
  },
]

const categories = ['All', 'Design', 'Engineering', 'Product', 'AI']

// ─── State ────────────────────────────────────────────────────────────────────
const activeCategory = ref('All')
const email          = ref('')
const subscribed     = ref(false)
const mobileOpen     = ref(false)
// Scroll-aware navbar: becomes true after 20 px to trigger stronger glass effect
const scrolled       = ref(false)

const featuredArticle = computed(() => articles.find(a => a.featured)!)
const regularArticles = computed(() => {
  const base = articles.filter(a => !a.featured)
  if (activeCategory.value === 'All') return base
  return base.filter(a => a.category === activeCategory.value)
})

// ─── Grid ref ─────────────────────────────────────────────────────────────────
const gridEl = useTemplateRef<HTMLElement>('gridEl')

// Clip-path wipe-up reveal: each card uncovers from top edge — more dramatic than a plain fade
function animateGrid() {
  if (!gridEl.value) return
  const cards = Array.from(gridEl.value.children) as HTMLElement[]
  gsap.killTweensOf(cards)
  gsap.fromTo(cards,
    { clipPath: 'inset(0 0 100% 0)', opacity: 1, y: 0 },
    { clipPath: 'inset(0 0 0% 0)', duration: 0.55, stagger: 0.08, ease: 'power3.out', clearProps: 'clipPath' },
  )
}

// Spring-bounce the newly active filter pill, then re-reveal the grid with clip-path
watch(activeCategory, () => {
  nextTick(() => {
    const activeBtn = document.querySelector('.filter-active') as HTMLElement
    if (activeBtn) gsap.fromTo(activeBtn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
    animateGrid()
  })
})

// ─── Newsletter ───────────────────────────────────────────────────────────────
// On subscribe: fire 12 colored dots from screen center as a burst of confetti
function subscribe() {
  if (!email.value) return
  subscribed.value = true
  email.value = ''
  nextTick(() => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div')
      dot.style.cssText = `position:fixed;width:8px;height:8px;border-radius:50%;background:${colors[i % 6]};top:50%;left:50%;pointer-events:none;z-index:9999;`
      document.body.appendChild(dot)
      gsap.fromTo(dot,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: 0,
          duration: 0.8 + Math.random() * 0.5,
          ease: 'power2.out',
          onComplete: () => dot.remove(),
        },
      )
    }
  })
}

// ─── GSAP entrance ────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Scroll-aware navbar: passive listener updates scrolled ref for CSS class swap
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 }, { passive: true })

  // Featured card mount entrance: fade + lift in from below
  gsap.fromTo('.featured-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })

  // Featured cover parallax: background moves at 0.5x scroll speed for depth
  const featured = document.querySelector('.featured-cover') as HTMLElement
  if (featured) {
    gsap.to(featured, {
      y: 60,
      ease: 'none',
      scrollTrigger: { trigger: '.featured-card', start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  }

  // 3D tilt on article cards: rotates toward cursor position on mousemove
  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = (card as HTMLElement).getBoundingClientRect()
      const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5
      const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, duration: 0.3, ease: 'power2.out', transformPerspective: 800 })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    })
  })

  nextTick(animateGrid)
})

onUnmounted(() => {
  gsap.killTweensOf('.featured-card')
  gsap.killTweensOf('.featured-cover')
  gsap.killTweensOf('.article-card')
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <!-- ─── Navbar ─────────────────────────────────────────────────────────── -->
    <!-- Scroll-aware navbar: stronger glass + shadow after 20 px scroll -->
    <nav :class="[
      'sticky top-0 z-40 backdrop-blur-md border-b border-zinc-800/60 transition-all duration-300',
      scrolled ? 'bg-zinc-950/95 shadow-lg shadow-black/20' : 'bg-zinc-950/60'
    ]">
      <div class="max-w-6xl mx-auto px-6 h-15 flex items-center justify-between gap-4" style="height:56px">
        <span class="text-lg font-black tracking-tight">SIGNAL<span class="text-indigo-400">.</span></span>

        <div class="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#" class="hover:text-white transition-colors">Articles</a>
          <a href="#" class="hover:text-white transition-colors">Topics</a>
          <a href="#" class="hover:text-white transition-colors">Authors</a>
          <a href="#newsletter" class="hover:text-white transition-colors">Newsletter</a>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <button class="p-2 text-zinc-500 hover:text-white transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
          </button>
          <button class="px-4 py-1.5 text-sm font-medium border border-zinc-700 rounded-full hover:border-zinc-500 hover:text-white text-zinc-300 transition-colors">
            Write
          </button>
        </div>

        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150" leave-to-class="opacity-0 -translate-y-1">
        <div v-if="mobileOpen" class="md:hidden border-t border-zinc-800/60 px-6 py-4 flex flex-col gap-3 text-sm text-zinc-400">
          <a href="#" @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Articles</a>
          <a href="#" @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Topics</a>
          <a href="#" @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Authors</a>
          <a href="#newsletter" @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Newsletter</a>
        </div>
      </Transition>
    </nav>

    <div class="max-w-6xl mx-auto px-6 py-12">

      <!-- ─── Featured post ────────────────────────────────────────────────── -->
      <div class="featured-card group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 mb-14 cursor-pointer">
        <div :class="`featured-cover bg-gradient-to-br ${featuredArticle.gradient} h-56 md:h-72 w-full relative overflow-hidden`">
          <!-- Abstract pattern -->
          <div class="absolute top-6 right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div class="absolute bottom-4 left-8 w-24 h-24 rounded-full bg-white/10 blur-xl" />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          <div class="absolute top-4 left-4">
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur border border-white/20">
              {{ featuredArticle.category }}
            </span>
          </div>
        </div>
        <div class="p-6 md:p-8 bg-zinc-900">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Featured</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-indigo-300 transition-colors">
            {{ featuredArticle.title }}
          </h2>
          <p class="text-zinc-400 text-sm leading-relaxed mb-5 max-w-2xl">{{ featuredArticle.excerpt }}</p>
          <div class="flex items-center gap-3">
            <div :class="`w-7 h-7 rounded-full bg-gradient-to-br ${featuredArticle.authorGradient} flex items-center justify-center text-xs font-bold`">
              {{ featuredArticle.authorInitials }}
            </div>
            <span class="text-sm font-medium text-zinc-300">{{ featuredArticle.author }}</span>
            <span class="text-zinc-700">·</span>
            <span class="text-xs text-zinc-500">{{ featuredArticle.date }}</span>
            <span class="text-zinc-700">·</span>
            <span class="text-xs text-zinc-500">{{ featuredArticle.readTime }}</span>
          </div>
        </div>
      </div>

      <!-- ─── Category filter ──────────────────────────────────────────────── -->
      <div class="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
            activeCategory === cat
              ? 'bg-indigo-500 text-white filter-active'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- ─── Articles grid ────────────────────────────────────────────────── -->
      <div v-if="regularArticles.length === 0" class="text-center py-16 text-zinc-500">
        No articles in this category yet.
      </div>

      <div v-else ref="gridEl" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="article in regularArticles"
          :key="article.id"
          class="article-card group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 cursor-pointer flex flex-col"
        >
          <!-- Cover -->
          <div :class="`bg-gradient-to-br ${article.gradient} h-36 relative overflow-hidden flex-shrink-0`">
            <div class="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/10 blur-xl" />
            <div class="absolute bottom-2 left-3 w-10 h-10 rounded-full bg-white/10 blur-lg" />
            <div class="absolute top-3 left-3">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/30 text-white backdrop-blur border border-white/10">
                {{ article.category }}
              </span>
            </div>
          </div>
          <!-- Content -->
          <div class="p-5 flex flex-col flex-1">
            <h3 class="font-bold text-sm leading-snug mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
              {{ article.title }}
            </h3>
            <p class="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-4 flex-1">{{ article.excerpt }}</p>
            <div class="flex items-center gap-2 pt-3 border-t border-zinc-800">
              <div :class="`w-6 h-6 rounded-full bg-gradient-to-br ${article.authorGradient} flex items-center justify-center text-[10px] font-bold flex-shrink-0`">
                {{ article.authorInitials }}
              </div>
              <span class="text-xs text-zinc-400 font-medium truncate">{{ article.author }}</span>
              <span class="text-zinc-700 ml-auto flex-shrink-0">·</span>
              <span class="text-xs text-zinc-600 flex-shrink-0">{{ article.readTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── Newsletter ─────────────────────────────────────────────────────── -->
    <section id="newsletter" class="py-20 mt-8">
      <div class="max-w-xl mx-auto px-6 text-center">
        <div class="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h2 class="text-2xl font-bold mb-2">Never miss an article</h2>
          <p class="text-zinc-400 text-sm mb-6">Get the best of SIGNAL delivered to your inbox, every week.</p>

          <Transition
            enter-active-class="transition-all duration-400"
            enter-from-class="opacity-0 scale-95"
          >
            <div v-if="subscribed" class="py-4">
              <p class="text-indigo-400 font-semibold">You're in! 🎉</p>
              <p class="text-zinc-500 text-sm mt-1">Check your inbox for a confirmation email.</p>
            </div>
            <form v-else @submit.prevent="subscribe" class="flex gap-2">
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
                class="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button type="submit" class="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0">
                Subscribe
              </button>
            </form>
          </Transition>

          <p class="text-xs text-zinc-600 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>

    <!-- ─── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/60 py-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-lg font-black tracking-tight">SIGNAL<span class="text-indigo-400">.</span></span>
        <div class="flex flex-wrap justify-center gap-5 text-xs text-zinc-500">
          <a href="#" class="hover:text-white transition-colors">Design</a>
          <a href="#" class="hover:text-white transition-colors">Engineering</a>
          <a href="#" class="hover:text-white transition-colors">Product</a>
          <a href="#" class="hover:text-white transition-colors">AI</a>
        </div>
        <div class="flex items-center gap-3 text-zinc-600">
          <a href="#" class="hover:text-white transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="hover:text-white transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>
