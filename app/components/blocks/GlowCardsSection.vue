<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const cards = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized for Core Web Vitals. Zero render-blocking resources, lazy-loaded assets, and hardware-accelerated animations.',
    glow: '#F59E0B',
    border: 'hover:border-amber-500/30',
  },
  {
    icon: '🎨',
    title: 'Pixel Perfect',
    description: 'Every component is designed with precision. Consistent spacing, thoughtful typography, and a cohesive design language throughout.',
    glow: '#8B5CF6',
    border: 'hover:border-emerald-500/30',
  },
  {
    icon: '🔒',
    title: 'Type Safe',
    description: 'Strict TypeScript throughout. Every prop, emit, and composable is fully typed — no escape hatches, no any.',
    glow: '#3B82F6',
    border: 'hover:border-blue-500/30',
  },
  {
    icon: '📦',
    title: 'Copy & Paste',
    description: 'No package to install, no config to write. Every component is a single file you can drop into any Nuxt 4 project.',
    glow: '#10B981',
    border: 'hover:border-emerald-500/30',
  },
  {
    icon: '🎯',
    title: 'Production Ready',
    description: 'Tested in real projects, on real traffic. Accessibility, responsiveness, and performance are never afterthoughts.',
    glow: '#F43F5E',
    border: 'hover:border-rose-500/30',
  },
  {
    icon: '✨',
    title: 'Animated',
    description: 'GSAP micro-interactions that feel alive. Scroll reveals, hover effects, and entrance animations — all performance-first.',
    glow: '#6366F1',
    border: 'hover:border-emerald-500/30',
  },
]

interface GlowState { x: number; y: number; opacity: number }
const cardRefs = ref<HTMLElement[]>([])
const glowStates = ref<GlowState[]>(cards.map(() => ({ x: 0, y: 0, opacity: 0 })))

function onMouseMove(e: MouseEvent, i: number) {
  const card = cardRefs.value[i]
  if (!card) return
  const rect = card.getBoundingClientRect()
  glowStates.value[i] = { x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 }
}

function onMouseLeave(i: number) {
  glowStates.value[i].opacity = 0
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const items = section.value?.querySelectorAll<HTMLElement>('.glow-card')
  if (items?.length) {
    gsap.fromTo(items,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top 75%', once: true },
      },
    )
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto flex flex-col gap-14">

      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <div class="flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Why Elvin UI</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Built different</h2>
        <p class="text-sm text-zinc-500 max-w-md mx-auto">Hover over the cards to see the glow effect.</p>
      </div>

      <!-- Glow cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(card, i) in cards"
          :key="card.title"
          :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
          class="glow-card relative rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-7 overflow-hidden group cursor-default transition-colors duration-300"
          :class="card.border"
          @mousemove="onMouseMove($event, i)"
          @mouseleave="onMouseLeave(i)"
        >
          <!-- Cursor spotlight -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            :style="{
              opacity: glowStates[i].opacity,
              background: `radial-gradient(220px circle at ${glowStates[i].x}px ${glowStates[i].y}px, ${card.glow}1a, transparent 70%)`,
            }"
          />

          <!-- Top edge highlight -->
          <div
            class="pointer-events-none absolute top-0 left-0 right-0 h-px transition-opacity duration-300 rounded-t-2xl"
            :style="{
              opacity: glowStates[i].opacity,
              background: `linear-gradient(to right, transparent, ${card.glow}60, transparent)`,
            }"
          />

          <div class="relative flex flex-col gap-4">
            <div class="text-2xl select-none">{{ card.icon }}</div>
            <div class="flex flex-col gap-1.5">
              <h3 class="text-base font-semibold text-white tracking-tight">{{ card.title }}</h3>
              <p class="text-sm text-zinc-500 leading-relaxed">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
