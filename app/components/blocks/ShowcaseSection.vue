<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section  = useTemplateRef('section')
const activeTab = ref<'buttons' | 'badges'>('buttons')

const tabs = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'badges',  label: 'Badges' },
] as const

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
      scrollTrigger: { trigger: section.value, start: 'top 80%', once: true },
    },
  )
})
</script>

<template>
  <section ref="section" class="py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-3">Live preview</p>
        <h2 class="text-3xl md:text-4xl font-bold text-white">See what's possible</h2>
      </div>

      <!-- Tabs -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Demo card -->
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-8">
        <!-- Buttons -->
        <template v-if="activeTab === 'buttons'">
          <div>
            <p class="text-xs text-zinc-600 mb-4 font-mono uppercase tracking-wider">Variants</p>
            <div class="flex flex-wrap gap-3">
              <UiButton variant="primary">Primary</UiButton>
              <UiButton variant="secondary">Secondary</UiButton>
              <UiButton variant="ghost">Ghost</UiButton>
              <UiButton variant="danger">Danger</UiButton>
            </div>
          </div>
          <div class="border-t border-zinc-800" />
          <div>
            <p class="text-xs text-zinc-600 mb-4 font-mono uppercase tracking-wider">Sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <UiButton size="sm">Small</UiButton>
              <UiButton size="md">Medium</UiButton>
              <UiButton size="lg">Large</UiButton>
            </div>
          </div>
          <div class="border-t border-zinc-800" />
          <div>
            <p class="text-xs text-zinc-600 mb-4 font-mono uppercase tracking-wider">States</p>
            <div class="flex flex-wrap gap-3">
              <UiButton disabled>Disabled</UiButton>
              <UiButton variant="ghost" disabled>Ghost disabled</UiButton>
            </div>
          </div>
        </template>

        <!-- Badges -->
        <template v-if="activeTab === 'badges'">
          <div>
            <p class="text-xs text-zinc-600 mb-4 font-mono uppercase tracking-wider">Variants</p>
            <div class="flex flex-wrap gap-2">
              <UiBadge>Default</UiBadge>
              <UiBadge variant="indigo">Indigo</UiBadge>
              <UiBadge variant="green">Green</UiBadge>
              <UiBadge variant="red">Red</UiBadge>
              <UiBadge variant="zinc">Zinc</UiBadge>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
