<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const featured = {
  quote: "Elvin UI cut our frontend setup time in half. The components are so well thought-out, we barely touch them after pasting.",
  author: "Sarah Chen",
  role: "CTO at Luminary",
  avatar: "SC",
}

const testimonials = [
  { quote: "Finally, a component library that doesn't fight Nuxt. Copy-paste, done.", author: "Marc Dubois", role: "Lead Developer", avatar: "MD", color: "bg-violet-500" },
  { quote: "The GSAP micro-interactions are exactly what I was spending days building manually.", author: "Aisha Patel", role: "Frontend Engineer", avatar: "AP", color: "bg-emerald-500" },
  { quote: "TypeScript strict mode, every prop typed, no any. Genuinely refreshing.", author: "Tom Eriksen", role: "Full-stack Dev", avatar: "TE", color: "bg-amber-500" },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = section.value?.querySelectorAll<HTMLElement>('.testi-card')
  if (cards?.length) {
    gsap.fromTo(cards,
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top 75%', once: true },
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
      <div class="testi-card relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 md:p-10 overflow-hidden">
        <div class="absolute -top-16 -left-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
        <div class="relative flex flex-col gap-6">
          <div class="flex gap-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <p class="text-lg md:text-xl text-zinc-200 leading-relaxed font-light italic">
            "{{ featured.quote }}"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {{ featured.avatar }}
            </div>
            <div>
              <p class="text-sm font-semibold text-white">{{ featured.author }}</p>
              <p class="text-xs text-zinc-500">{{ featured.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="t in testimonials"
          :key="t.author"
          class="testi-card flex flex-col gap-4 p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/60 hover:bg-zinc-900/50 transition-all duration-200"
        >
          <div class="flex gap-0.5">
            <svg v-for="i in 5" :key="i" class="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <p class="text-sm text-zinc-400 leading-relaxed flex-1 italic">"{{ t.quote }}"</p>
          <div class="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0', t.color]">
              {{ t.avatar }}
            </div>
            <div>
              <p class="text-xs font-semibold text-zinc-200">{{ t.author }}</p>
              <p class="text-[11px] text-zinc-600">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
