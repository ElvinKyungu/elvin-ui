<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const featured = {
  quote: "We shipped our entire dashboard UI in 3 days. Elvin UI components are production-grade out of the box — we didn't rewrite a single line.",
  highlight: "shipped in 3 days",
  author: "Vander Otis",
  role: "CTO",
  company: "Luminary Labs",
  avatar: "VO",
  metric: { value: "3×", label: "faster delivery" },
  team: "Team of 14 engineers",
}

const testimonials = [
  {
    quote: "Finally a component library that doesn't fight Nuxt. Copy-paste, done. I was productive in under an hour.",
    author: "Gabriel Delattre",
    role: "Lead Developer",
    company: "Vercel",
    avatar: "GD",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote: "The GSAP micro-interactions are exactly what I was spending days building from scratch. It's insane value.",
    author: "Antfu",
    role: "Open Source",
    company: "NuxtLabs",
    avatar: "AF",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote: "TypeScript strict mode, every prop typed, zero any. I've reviewed the source — the quality is genuinely rare.",
    author: "Kevin Maginot",
    role: "Full-stack Engineer",
    company: "Stripe",
    avatar: "KM",
    color: "from-amber-500 to-orange-600",
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = section.value?.querySelectorAll<HTMLElement>('.testi-card')
  if (cards?.length) {
    gsap.fromTo(cards,
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top bottom', once: true },
      },
    )
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto flex flex-col gap-12">

      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <div class="flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span class="text-xs font-semibold text-amber-400 uppercase tracking-widest">Testimonials</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Loved by developers</h2>
        <p class="text-sm text-zinc-500 max-w-md mx-auto">Don't take our word for it — here's what teams shipping with Elvin UI say.</p>
      </div>

      <!-- Featured quote -->
      <div class="testi-card relative rounded-2xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
        <!-- Ambient glows -->
        <div class="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/12 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <!-- Top border highlight -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div class="relative grid grid-cols-1 lg:grid-cols-5 gap-0">

          <!-- Quote side -->
          <div class="lg:col-span-3 p-8 md:p-10 flex flex-col gap-8">
            <!-- Stars + verified -->
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span class="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="m20 6-11 11-5-5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Verified customer
              </span>
            </div>

            <!-- Big decorative quote mark -->
            <svg class="w-10 h-10 text-indigo-500/30 -mb-4" viewBox="0 0 48 48" fill="currentColor">
              <path d="M0 24C0 10.745 10.745 0 24 0v8C15.163 8 8 15.163 8 24v4h10v20H0V24zm28 0C28 10.745 38.745 0 52 0v8C43.163 8 36 15.163 36 24v4h10v20H28V24z" transform="scale(0.9)" />
            </svg>

            <!-- Quote text -->
            <blockquote class="text-xl md:text-2xl text-white font-semibold leading-snug tracking-tight">
              {{ featured.quote }}
            </blockquote>

            <!-- Author -->
            <div class="flex items-center gap-4 pt-2">
              <div class="relative flex-shrink-0">
                <div class="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 blur-[2px] scale-110 opacity-60" />
                <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-black">
                  {{ featured.avatar }}
                </div>
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ featured.author }}</p>
                <p class="text-xs text-zinc-400">{{ featured.role }}, <span class="text-zinc-300">{{ featured.company }}</span></p>
                <p class="text-[11px] text-zinc-600 mt-0.5">{{ featured.team }}</p>
              </div>
            </div>
          </div>

          <!-- Stat side -->
          <div class="lg:col-span-2 flex items-center justify-center p-8 md:p-10 lg:border-l border-t lg:border-t-0 border-zinc-800/60">
            <div class="flex flex-col items-center gap-6 text-center">
              <!-- Big stat -->
              <div class="flex flex-col items-center gap-2">
                <div class="relative">
                  <div class="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150" />
                  <p class="relative text-7xl font-black text-white tracking-tighter tabular-nums">{{ featured.metric.value }}</p>
                </div>
                <p class="text-sm font-semibold text-zinc-400 uppercase tracking-widest">{{ featured.metric.label }}</p>
              </div>

              <div class="w-16 h-px bg-zinc-800" />

              <!-- Mini stats -->
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span class="text-xs text-zinc-500">Time to ship</span>
                  <span class="text-xs font-bold text-white">3 days</span>
                </div>
                <div class="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span class="text-xs text-zinc-500">Components used</span>
                  <span class="text-xs font-bold text-white">23 blocks</span>
                </div>
                <div class="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span class="text-xs text-zinc-500">Custom code written</span>
                  <span class="text-xs font-bold text-emerald-400">~0 lines</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="t in testimonials"
          :key="t.author"
          class="testi-card group flex flex-col gap-5 p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700/50 hover:bg-zinc-900/40 transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div class="flex gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-3 h-3 fill-amber-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span class="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">{{ t.company }}</span>
          </div>

          <p class="text-sm text-zinc-300 leading-relaxed flex-1">"{{ t.quote }}"</p>

          <div class="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
            <div class="relative flex-shrink-0">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[11px] font-black" :class="t.color">
                {{ t.avatar }}
              </div>
            </div>
            <div>
              <p class="text-xs font-bold text-zinc-200">{{ t.author }}</p>
              <p class="text-[11px] text-zinc-500 mt-0.5">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
