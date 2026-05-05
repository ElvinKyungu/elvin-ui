<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const logos = [
  { name: 'Vue.js', abbr: 'VU', color: '#41B883' },
  { name: 'Nuxt', abbr: 'NX', color: '#00DC82' },
  { name: 'TypeScript', abbr: 'TS', color: '#3178C6' },
  { name: 'Tailwind CSS', abbr: 'TW', color: '#38BDF8' },
  { name: 'GSAP', abbr: 'GS', color: '#88CE02' },
  { name: 'Vite', abbr: 'VI', color: '#BD34FE' },
  { name: 'Cloudflare', abbr: 'CF', color: '#F38020' },
  { name: 'GitHub', abbr: 'GH', color: '#E0E0E0' },
  { name: 'Vercel', abbr: 'VC', color: '#FFFFFF' },
  { name: 'Pinia', abbr: 'PI', color: '#FFD859' },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const items = section.value?.querySelectorAll<HTMLElement>('.logo-item')
  if (items?.length) {
    gsap.fromTo(items,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: section.value, start: 'top 75%', once: true },
      },
    )
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-5xl 2xl:max-w-[95rem] mx-auto flex flex-col gap-12">

      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <p class="text-xs font-semibold text-zinc-500 uppercase tracking-widest">The modern stack</p>
        <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Built with the best tools</h2>
        <p class="text-sm text-zinc-500 max-w-sm mx-auto">Every component is crafted on a foundation of best-in-class open-source technology.</p>
      </div>

      <!-- Logo grid -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <div
          v-for="logo in logos"
          :key="logo.name"
          class="logo-item group relative flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 hover:bg-zinc-900/80 transition-all duration-200 cursor-default"
        >
          <div
            class="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            :style="{ backgroundColor: logo.color + '20', color: logo.color }"
          >{{ logo.abbr }}</div>
          <span class="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 whitespace-nowrap">{{ logo.name }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="flex items-center gap-6">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <span class="text-xs text-zinc-700 font-medium tracking-wide">and many more</span>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-800 to-transparent" />
      </div>

    </div>
  </section>
</template>
