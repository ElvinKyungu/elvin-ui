<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const team = [
  { name: 'Elvin Kyungu', role: 'Founder & Designer', bio: 'Building beautiful UI systems for the modern web. Obsessed with developer experience and micro-interactions.', avatar: 'EK', color: 'from-indigo-500 to-violet-500', social: { twitter: '#', github: '#', linkedin: '#' } },
  { name: 'Sarah Chen', role: 'Lead Engineer', bio: 'Vue 3 core contributor. Makes sure every component is type-safe, accessible, and performs at 60fps.', avatar: 'SC', color: 'from-emerald-500 to-teal-500', social: { twitter: '#', github: '#', linkedin: '#' } },
  { name: 'Marc Dubois', role: 'Design Systems', bio: 'Former Figma designer turned engineer. Bridges the gap between design tokens and production code.', avatar: 'MD', color: 'from-amber-500 to-orange-500', social: { twitter: '#', github: '#', linkedin: '#' } },
  { name: 'Aisha Patel', role: 'DX Engineer', bio: 'Writes docs, builds tooling, and makes sure every copy-paste just works. Champion of zero-config setups.', avatar: 'AP', color: 'from-rose-500 to-pink-500', social: { twitter: '#', github: '#', linkedin: '#' } },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = section.value?.querySelectorAll<HTMLElement>('.team-card')
  if (cards?.length) {
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top bottom', once: true },
      },
    )
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-5xl 2xl:max-w-[80rem] mx-auto flex flex-col gap-14">

      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <div class="flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span class="text-xs font-semibold text-rose-400 uppercase tracking-widest">Team</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">The people behind it</h2>
        <p class="text-sm text-zinc-500 max-w-md mx-auto">A small team obsessed with developer experience and building the best UI system for Nuxt 4.</p>
      </div>

      <!-- Team grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="member in team"
          :key="member.name"
          class="team-card group flex flex-col gap-5 p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700/60 hover:bg-zinc-900/40 transition-all duration-300"
        >
          <!-- Avatar -->
          <div class="relative w-fit">
            <div
              class="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg"
              :class="member.color"
            >{{ member.avatar }}</div>
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-1 flex-1">
            <p class="text-sm font-bold text-white">{{ member.name }}</p>
            <p class="text-xs font-semibold text-zinc-500">{{ member.role }}</p>
            <p class="text-xs text-zinc-600 leading-relaxed mt-2">{{ member.bio }}</p>
          </div>

          <!-- Social -->
          <div class="flex items-center gap-2 pt-4 border-t border-zinc-800/60">
            <a :href="member.social.twitter" class="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 transition-all duration-150">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a :href="member.social.github" class="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 transition-all duration-150">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a :href="member.social.linkedin" class="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 transition-all duration-150">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
