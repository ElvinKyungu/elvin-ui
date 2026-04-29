<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const features = [
  {
    icon: 'lucide:clipboard-copy',
    title: 'Copy & paste ready',
    desc: 'No npm install. No config. Grab the component source, paste it, and it works — immediately.',
  },
  {
    icon: 'lucide:zap',
    title: 'GSAP micro-interactions',
    desc: 'Subtle hover effects and smooth transitions built in. Every component feels premium without being heavy.',
  },
  {
    icon: 'lucide:layers',
    title: 'Nuxt 4 · TypeScript',
    desc: 'script setup, strict TypeScript, SSR-safe by default. Built specifically for the modern Vue stack.',
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = section.value?.querySelectorAll<HTMLElement>('.feature-card')
  if (!cards?.length) return

  gsap.fromTo(
    cards,
    { y: 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section.value,
        start: 'top 80%',
        once: true,
      },
    },
  )
})
</script>

<template>
  <section ref="section" class="py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-3">Why Elvin UI</p>
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Everything you need.<br>
          <span class="text-zinc-500">Nothing you don't.</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card group p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all duration-300"
        >
          <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:bg-indigo-500/20 transition-colors duration-300">
            <Icon :name="feature.icon" class="w-5 h-5 text-indigo-400" />
          </div>
          <h3 class="text-base font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-zinc-500 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
