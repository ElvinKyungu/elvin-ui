<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo(
    section.value,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: section.value, start: 'top 85%', once: true },
    },
  )
})
</script>

<template>
  <section ref="section" class="py-16 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Gradient border card -->
      <div class="p-px rounded-3xl bg-gradient-to-b from-zinc-700 to-zinc-900">
        <div class="rounded-3xl bg-zinc-950 px-8 py-16 text-center relative overflow-hidden">
          <!-- Inner glow -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div class="relative z-10">
            <p class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-4">Get started</p>
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Start building<br>in minutes.
            </h2>
            <p class="text-zinc-400 mb-8 max-w-sm mx-auto">
              Browse the components, copy the code, paste it in your Nuxt project. That's it.
            </p>
            <div class="flex items-center justify-center gap-3 flex-wrap">
              <UiButton size="lg">Browse components</UiButton>
              <UiButton size="lg" variant="ghost">Read the docs →</UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
