<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Reading progress ─────────────────────────────────────────────────────────
const readingProgress = ref(0)
const activeTocId     = ref('intro')

function updateProgress() {
  const scrolled = window.scrollY
  const total    = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = total > 0 ? Math.round((scrolled / total) * 100) : 0
}

// ─── TOC ─────────────────────────────────────────────────────────────────────
const tocItems = [
  { id: 'intro',       label: 'Introduction' },
  { id: 'what-is-dx',  label: 'What is DX?' },
  { id: 'why-it-matters', label: 'Why it matters' },
  { id: 'patterns',    label: 'Common patterns' },
  { id: 'case-study',  label: 'Case study: Stripe' },
  { id: 'how-to',      label: 'How to improve DX' },
  { id: 'conclusion',  label: 'Conclusion' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── Reactions ────────────────────────────────────────────────────────────────
const reactions = reactive([
  { emoji: '👍', label: 'Like',      count: 184, active: false },
  { emoji: '❤️', label: 'Love',      count: 97,  active: false },
  { emoji: '🔥', label: 'Fire',      count: 62,  active: false },
  { emoji: '💡', label: 'Insightful', count: 45, active: false },
])

function toggleReaction(r: typeof reactions[0]) {
  r.active = !r.active
  r.count += r.active ? 1 : -1
}

// ─── Comment form ─────────────────────────────────────────────────────────────
const commentText = ref('')
const commentSent = ref(false)

function submitComment() {
  if (!commentText.value.trim()) return
  commentSent.value = true
  commentText.value = ''
}

const comments = [
  { name: 'Elara Voss', initials: 'EV', gradient: 'from-violet-500 to-fuchsia-500', time: '2h ago', text: 'This is exactly what I\'ve been thinking about for months. The Stripe example is spot on — their SDK documentation sets the bar for the whole industry.', likes: 24 },
  { name: 'Kevin Maginot', initials: 'KM', gradient: 'from-emerald-500 to-teal-500', time: '5h ago', text: 'Great article! I\'d add that internal DX matters just as much as external. The teams that invest in internal tooling ship 2-3x faster.', likes: 18 },
  { name: 'Alex Rivera', initials: 'AR', gradient: 'from-amber-500 to-orange-500', time: '1d ago', text: 'The point about onboarding time as a DX metric is underrated. Most companies only look at API uptime and ignore how long it takes new devs to ship their first feature.', likes: 31 },
]

const likedComments = reactive(new Set<number>())
function likeComment(i: number) {
  if (likedComments.has(i)) {
    likedComments.delete(i)
    comments[i].likes--
  } else {
    likedComments.add(i)
    comments[i].likes++
  }
}

// ─── Related posts ────────────────────────────────────────────────────────────
const related = [
  { title: 'Building Scalable APIs with Nuxt 4', category: 'Engineering', readTime: '10 min', gradient: 'from-emerald-600 to-teal-600' },
  { title: 'The Future of Design Systems in 2025', category: 'Design', readTime: '6 min', gradient: 'from-rose-600 to-pink-600' },
  { title: 'How We Grew to 100k Users', category: 'Product', readTime: '7 min', gradient: 'from-violet-600 to-fuchsia-600' },
]

// ─── IntersectionObserver for TOC ─────────────────────────────────────────────
let observer: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })

  // GSAP entrance
  gsap.fromTo('.post-hero', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })

  // TOC active tracking
  const sections = tocItems.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[]
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activeTocId.value = entry.target.id
    })
  }, { rootMargin: '-20% 0px -70% 0px' })
  sections.forEach(s => observer!.observe(s))
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  observer?.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <!-- ─── Reading progress ──────────────────────────────────────────────── -->
    <div class="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-zinc-800">
      <div
        class="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-100"
        :style="`width: ${readingProgress}%`"
      />
    </div>

    <!-- ─── Navbar ─────────────────────────────────────────────────────────── -->
    <nav class="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <a href="/templates/blog-home" class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          All articles
        </a>

        <span class="text-base font-black tracking-tight">SIGNAL<span class="text-indigo-400">.</span></span>

        <div class="flex items-center gap-2">
          <!-- Share icons -->
          <button class="p-2 text-zinc-500 hover:text-white transition-colors" title="Share on Twitter">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </button>
          <button class="p-2 text-zinc-500 hover:text-white transition-colors" title="Copy link">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="text-xs text-zinc-600 pl-1">{{ readingProgress }}%</div>
        </div>
      </div>
    </nav>

    <!-- ─── Article header ───────────────────────────────────────────────── -->
    <div class="post-hero max-w-3xl mx-auto px-6 pt-14 pb-10">
      <div class="flex items-center gap-2 mb-4 text-xs">
        <span class="px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 font-semibold">Product</span>
        <span class="text-zinc-600">·</span>
        <span class="text-zinc-500">May 8, 2025</span>
        <span class="text-zinc-600">·</span>
        <span class="text-zinc-500">8 min read</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
        Why Developer Experience Is the New Competitive Advantage
      </h1>
      <p class="text-lg text-zinc-400 leading-relaxed mb-8">
        The companies winning in 2025 aren't just building better products — they're building better tooling for the people who build those products.
      </p>
      <div class="flex items-center gap-3 pb-8 border-b border-zinc-800/60">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm">MC</div>
        <div>
          <div class="text-sm font-semibold">Marcus Chen</div>
          <div class="text-xs text-zinc-500">Head of Product at Orbit · 48 articles</div>
        </div>
      </div>
    </div>

    <!-- ─── Hero cover ───────────────────────────────────────────────────── -->
    <div class="max-w-3xl mx-auto px-6 mb-12">
      <div class="bg-gradient-to-br from-indigo-700 to-violet-700 rounded-2xl h-56 md:h-72 relative overflow-hidden">
        <div class="absolute top-6 right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div class="absolute bottom-4 left-8 w-20 h-20 rounded-full bg-white/10 blur-xl" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_0.5px,transparent_0.5px),linear-gradient(to_bottom,#ffffff08_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
      </div>
    </div>

    <!-- ─── Content + TOC ────────────────────────────────────────────────── -->
    <div class="max-w-6xl mx-auto px-6 pb-20">
      <div class="flex gap-12 items-start">

        <!-- Article body -->
        <article class="flex-1 min-w-0 max-w-2xl">

          <section id="intro" class="mb-10">
            <p class="text-zinc-300 leading-8 mb-4">
              There's a quiet revolution happening in the developer tooling space, and it's not about new frameworks or better performance benchmarks. It's about something more fundamental: how it <em>feels</em> to build software.
            </p>
            <p class="text-zinc-300 leading-8">
              The companies that are winning the hearts — and wallets — of developers aren't necessarily the ones with the most features. They're the ones that have made every interaction with their product feel effortless, logical, and even pleasurable.
            </p>
          </section>

          <section id="what-is-dx" class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-white">What is Developer Experience, exactly?</h2>
            <p class="text-zinc-300 leading-8 mb-4">
              Developer Experience (DX) is the sum of all interactions a developer has with a product — from first reading the docs, to writing the first line of code, to debugging at 2am, to onboarding a new teammate six months later.
            </p>
            <blockquote class="border-l-2 border-indigo-500 pl-5 py-2 my-6 bg-indigo-500/5 rounded-r-lg">
              <p class="text-zinc-300 italic leading-relaxed">"Good DX is when a developer can figure out what to do without asking anyone. Great DX is when they can figure out what to do <em>and</em> feel good about it."</p>
            </blockquote>
            <p class="text-zinc-300 leading-8">
              It encompasses documentation quality, SDK ergonomics, error messages, onboarding flows, CLI design, and even the emotional tone of your changelog.
            </p>
          </section>

          <section id="why-it-matters" class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-white">Why it matters more than ever</h2>
            <p class="text-zinc-300 leading-8 mb-4">
              In 2025, developers have more choices than ever. The switching cost for most infrastructure tools is lower than it's ever been. If your product is frustrating to use, your users will simply find one that isn't.
            </p>
            <!-- Callout box -->
            <div class="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4 flex gap-3">
              <svg class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <p class="text-sm text-amber-300 leading-relaxed">
                A study by DX Research found that <strong>68% of developers have abandoned a product</strong> in the first hour due to poor documentation or confusing setup flow.
              </p>
            </div>
            <p class="text-zinc-300 leading-8">
              Poor DX has a compounding cost: frustrated developers churn, write negative reviews, and warn their networks. Great DX creates the opposite flywheel — happy developers become advocates.
            </p>
          </section>

          <section id="patterns" class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-white">Common patterns in great DX</h2>
            <p class="text-zinc-300 leading-8 mb-5">The best developer-focused products share a set of recognizable patterns:</p>

            <!-- Code block -->
            <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6">
              <div class="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/80">
                <span class="text-xs text-zinc-500 font-mono">example.ts</span>
                <button class="text-xs text-zinc-600 hover:text-white transition-colors">Copy</button>
              </div>
              <pre class="p-4 text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed"><code><span class="text-violet-400">import</span> { <span class="text-cyan-400">Nova</span> } <span class="text-violet-400">from</span> <span class="text-emerald-400">'@nova/sdk'</span>

<span class="text-violet-400">const</span> <span class="text-cyan-400">client</span> = <span class="text-violet-400">new</span> <span class="text-cyan-400">Nova</span>({ <span class="text-amber-400">apiKey</span>: process.<span class="text-cyan-400">env</span>.<span class="text-zinc-300">NOVA_KEY</span> })

<span class="text-zinc-500">// One line to deploy. That's it.</span>
<span class="text-violet-400">await</span> client.<span class="text-cyan-400">deploy</span>({ <span class="text-amber-400">project</span>: <span class="text-emerald-400">'my-app'</span> })
</code></pre>
            </div>

            <p class="text-zinc-300 leading-8">
              Notice what makes this example work: it's <strong class="text-white">minimal</strong>, it's <strong class="text-white">self-documenting</strong>, and the happy path requires almost no decisions from the developer.
            </p>
          </section>

          <section id="case-study" class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-white">Case study: How Stripe set the standard</h2>
            <p class="text-zinc-300 leading-8 mb-4">
              No article about DX would be complete without mentioning Stripe. For nearly a decade, Stripe has been cited as the gold standard for developer experience in the payments space — and for good reason.
            </p>
            <p class="text-zinc-300 leading-8 mb-4">
              Their documentation is famously comprehensive yet approachable. Their error messages tell you not just what went wrong, but how to fix it. Their dashboard makes complex operations feel simple. And critically, they made it possible to get a working payment integration in under 10 minutes.
            </p>
            <!-- Image placeholder -->
            <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl h-40 flex items-center justify-center mb-4">
              <span class="text-zinc-600 text-sm">Stripe Dashboard Screenshot</span>
            </div>
            <p class="text-zinc-300 leading-8">
              The result? Stripe grew primarily through developer word-of-mouth. They didn't need a massive sales force — developers recommended them to their managers, who signed the contracts.
            </p>
          </section>

          <section id="how-to" class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-white">How to improve your DX</h2>
            <p class="text-zinc-300 leading-8 mb-5">Here are the highest-leverage interventions, roughly ordered by impact:</p>
            <ol class="space-y-4 mb-6">
              <li v-for="(item, i) in ['Write error messages that explain the fix, not just the problem','Build a working getting-started example that takes under 5 minutes','Instrument your docs — track where developers drop off','Invest in SDK ergonomics before adding features','Create a developer feedback loop (Discord, GitHub Discussions, etc.)']" :key="i" class="flex gap-3">
                <span class="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{{ i + 1 }}</span>
                <span class="text-zinc-300 leading-relaxed text-sm">{{ item }}</span>
              </li>
            </ol>
          </section>

          <section id="conclusion" class="mb-14">
            <h2 class="text-2xl font-bold mb-4 text-white">Conclusion</h2>
            <p class="text-zinc-300 leading-8 mb-4">
              Developer Experience is no longer a nice-to-have — it's a competitive moat. The companies that invest in it compound their advantages over time, while those that ignore it face increasingly frustrated users and accelerating churn.
            </p>
            <p class="text-zinc-300 leading-8">
              The bar is rising. Developers today expect the same level of polish from their tools that users expect from consumer apps. Meeting that bar is hard work — but the teams that do it consistently are the ones that win.
            </p>
          </section>

          <!-- Reactions -->
          <div class="border-t border-zinc-800/60 pt-8 mb-10">
            <p class="text-sm text-zinc-400 mb-4">Did you find this helpful?</p>
            <div class="flex items-center gap-3 flex-wrap">
              <button
                v-for="r in reactions"
                :key="r.label"
                @click="toggleReaction(r)"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all duration-200',
                  r.active
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                ]"
              >
                <span>{{ r.emoji }}</span>
                <span class="font-medium tabular-nums">{{ r.count }}</span>
              </button>
            </div>
          </div>

          <!-- Author card -->
          <div class="border border-zinc-800 rounded-2xl p-6 mb-10 flex gap-5">
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg font-bold flex-shrink-0">MC</div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold">Marcus Chen</span>
                <span class="text-xs text-zinc-600">48 articles</span>
              </div>
              <p class="text-sm text-zinc-400 leading-relaxed mb-3">
                Head of Product at Orbit. I write about developer tools, product strategy, and the intersection of design and engineering. Previously at Stripe and Vercel.
              </p>
              <a href="#" class="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Follow @marcuschen
              </a>
            </div>
          </div>

          <!-- Comments -->
          <div class="border-t border-zinc-800/60 pt-8">
            <h3 class="font-bold text-lg mb-6">{{ comments.length }} comments</h3>
            <div class="space-y-6 mb-8">
              <div v-for="(c, i) in comments" :key="i" class="flex gap-4">
                <div :class="`w-8 h-8 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`">{{ c.initials }}</div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm font-semibold">{{ c.name }}</span>
                    <span class="text-xs text-zinc-600">{{ c.time }}</span>
                  </div>
                  <p class="text-sm text-zinc-300 leading-relaxed mb-2">{{ c.text }}</p>
                  <div class="flex items-center gap-3 text-xs text-zinc-600">
                    <button @click="likeComment(i)" :class="['flex items-center gap-1 transition-colors', likedComments.has(i) ? 'text-indigo-400' : 'hover:text-white']">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                      {{ c.likes }}
                    </button>
                    <button class="hover:text-white transition-colors">Reply</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add comment -->
            <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 scale-95">
              <div v-if="commentSent" class="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-400 text-center">
                Comment submitted — thanks for the feedback!
              </div>
              <form v-else @submit.prevent="submitComment" class="space-y-3">
                <textarea
                  v-model="commentText"
                  rows="3"
                  placeholder="Share your thoughts..."
                  required
                  class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
                <button type="submit" class="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-xl transition-colors">
                  Post comment
                </button>
              </form>
            </Transition>
          </div>
        </article>

        <!-- TOC sidebar -->
        <aside class="hidden lg:block w-56 flex-shrink-0 sticky top-20">
          <div class="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Contents</p>
            <nav class="space-y-1">
              <button
                v-for="item in tocItems"
                :key="item.id"
                @click="scrollToSection(item.id)"
                :class="[
                  'w-full text-left text-xs px-2 py-1.5 rounded-md transition-all duration-150',
                  activeTocId === item.id
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                ]"
              >
                {{ item.label }}
              </button>
            </nav>
            <!-- Mini progress -->
            <div class="mt-4 pt-4 border-t border-zinc-800">
              <div class="flex items-center justify-between text-xs text-zinc-600 mb-1.5">
                <span>Progress</span>
                <span>{{ readingProgress }}%</span>
              </div>
              <div class="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-500 rounded-full transition-[width] duration-200" :style="`width: ${readingProgress}%`" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Related posts -->
      <div class="max-w-2xl mt-16 pt-12 border-t border-zinc-800/60">
        <h3 class="font-bold text-xl mb-6">More articles</h3>
        <div class="grid sm:grid-cols-3 gap-4">
          <div v-for="post in related" :key="post.title" class="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div :class="`bg-gradient-to-br ${post.gradient} h-24`" />
            <div class="p-4">
              <span class="text-xs text-zinc-600 mb-1.5 block">{{ post.category }} · {{ post.readTime }}</span>
              <p class="text-xs font-semibold leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">{{ post.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/60 py-8">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span class="text-sm font-black tracking-tight">SIGNAL<span class="text-indigo-400">.</span></span>
        <p class="text-xs text-zinc-600">© 2025 Signal. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
