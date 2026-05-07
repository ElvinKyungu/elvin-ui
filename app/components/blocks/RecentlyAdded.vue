<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { allItems } from '~/data/ui-components'

const section = useTemplateRef('section')

const newItems = computed(() =>
  allItems.filter(i => i.isNew).slice(0, 6)
)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.create({
    trigger: section.value,
    start: 'top 80%',
    once: true,
    onEnter() {
      const cards = section.value?.querySelectorAll<HTMLElement>('.new-card')
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        )
      }
    },
  })
})
</script>

<template>
  <section ref="section" class="py-20 px-6">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto flex flex-col gap-10">

      <!-- Header -->
      <div class="flex items-end justify-between">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">What's new</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Recently added</h2>
        </div>
        <NuxtLink
          to="/components"
          class="hidden sm:flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          View all
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="item in newItems"
          :key="item.id"
          :to="`/components/${item.id}`"
          class="new-card group flex items-center gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-200"
        >
          <div class="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Icon name="lucide:box" class="w-4 h-4 text-emerald-400" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                {{ item.name }}
              </span>
              <span class="text-[9px] px-1.5 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-bold uppercase tracking-wide leading-none shrink-0">New</span>
            </div>
            <span class="text-xs text-zinc-500">{{ item.categoryName }}</span>
          </div>
          <svg class="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Mobile "View all" -->
      <NuxtLink
        to="/components"
        class="sm:hidden self-start flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
      >
        View all components
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </NuxtLink>

    </div>
  </section>
</template>
