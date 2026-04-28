<script setup lang="ts">
import { gsap } from 'gsap'

const navRef = useTemplateRef('navRef')

const links = [
  { label: 'Components', href: '/components' },
  { label: 'Blocks', href: '/blocks' },
  { label: 'Docs', href: '/docs' },
]

onMounted(() => {
  gsap.from(navRef.value, {
    y: -20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  })
})
</script>

<template>
  <header
    ref="navRef"
    class="fixed top-0 inset-x-0 z-50 h-14 border-b border-zinc-800/60 backdrop-blur-md bg-zinc-950/80"
  >
    <div class="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white text-[10px] font-bold leading-none">E</span>
        </span>
        <span class="text-sm font-semibold text-white tracking-tight">elvin ui</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="px-3 py-1.5 text-sm text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/50 transition-all duration-200"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <UiButton size="sm" variant="primary">
        Browse →
      </UiButton>
    </div>
  </header>
</template>
