<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <!-- NAVBAR -->
  <template v-if="id === 'navbar'">
    <div class="absolute inset-0 bg-zinc-950">
      <div class="absolute top-0 left-0 right-0 h-10 border-b border-zinc-800 flex items-center px-4 gap-3">
        <div class="w-3 h-3 bg-white rounded-[3px]" />
        <div class="flex gap-2">
          <div class="h-1.5 w-7 bg-zinc-700 rounded-full" />
          <div class="h-1.5 w-5 bg-zinc-700 rounded-full" />
          <div class="h-1.5 w-7 bg-zinc-700 rounded-full" />
        </div>
        <div class="ml-auto h-5 w-14 bg-white/90 rounded-md" />
      </div>
      <div class="absolute top-12 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-1.5 px-8">
        <div class="h-1.5 w-3/4 bg-zinc-800 rounded-full" />
        <div class="h-1.5 w-1/2 bg-zinc-800/60 rounded-full" />
      </div>
    </div>
  </template>

  <!-- HERO -->
  <template v-else-if="id === 'hero'">
    <div class="absolute inset-0 bg-zinc-950">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgb(var(--color-accent)/0.18),transparent_65%)]" />
      <div class="absolute inset-0 flex flex-col justify-center items-center gap-2 px-6">
        <div class="h-2.5 w-40 bg-zinc-200 rounded-full" />
        <div class="h-1.5 w-32 bg-zinc-600 rounded-full" />
        <div class="h-1.5 w-24 bg-zinc-700/60 rounded-full" />
        <div class="flex gap-2 mt-2">
          <div class="h-6 w-16 bg-white rounded-lg" />
          <div class="h-6 w-16 border border-zinc-700 rounded-lg" />
        </div>
      </div>
    </div>
  </template>

  <!-- MARQUEE -->
  <template v-else-if="id === 'marquee'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-center gap-2.5">
      <div class="flex gap-2 px-3">
        <div v-for="i in 7" :key="i" class="h-6 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 flex items-center gap-1.5 flex-shrink-0">
          <div class="w-1.5 h-1.5 rounded-full bg-accent/70" />
          <div class="h-1 w-8 bg-zinc-700 rounded-full" />
        </div>
      </div>
      <div class="flex gap-2 px-8 opacity-40">
        <div v-for="i in 6" :key="i" class="h-6 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 flex items-center gap-1.5 flex-shrink-0">
          <div class="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <div class="h-1 w-7 bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- SPLIT FEATURE -->
  <template v-else-if="id === 'split-feature'">
    <div class="absolute inset-0 bg-zinc-950 flex">
      <div class="flex-1 flex flex-col justify-center gap-2 px-4">
        <div class="h-1.5 w-6 bg-accent/70 rounded-full" />
        <div class="h-2 w-24 bg-zinc-200 rounded-full" />
        <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
        <div class="h-1.5 w-16 bg-zinc-700/50 rounded-full" />
        <div class="h-6 w-16 bg-accent rounded-lg mt-1" />
      </div>
      <div class="flex-1 p-3">
        <div class="w-full h-full bg-zinc-800/60 rounded-lg border border-zinc-700/40" />
      </div>
    </div>
  </template>

  <!-- BENTO -->
  <template v-else-if="id === 'bento'">
    <div class="absolute inset-0 bg-zinc-950 p-3 grid grid-cols-3 grid-rows-2 gap-2">
      <div class="col-span-2 row-span-1 bg-zinc-900 rounded-lg border border-zinc-800 p-2">
        <div class="h-1.5 w-16 bg-zinc-300 rounded-full mb-1" />
        <div class="h-1 w-12 bg-zinc-600 rounded-full" />
      </div>
      <div class="col-span-1 row-span-2 bg-accent/10 rounded-lg border border-accent/20 p-2">
        <div class="w-4 h-4 bg-accent/30 rounded-md mb-2" />
        <div class="h-1 w-full bg-zinc-700 rounded-full mb-1" />
        <div class="h-1 w-3/4 bg-zinc-700/50 rounded-full" />
      </div>
      <div class="col-span-1 row-span-1 bg-zinc-900 rounded-lg border border-zinc-800" />
      <div class="col-span-1 row-span-1 bg-zinc-800/50 rounded-lg border border-zinc-700/40" />
    </div>
  </template>

  <!-- FEATURES GRID -->
  <template v-else-if="id === 'features'">
    <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
      <div class="h-2 w-24 bg-zinc-300 rounded-full mx-auto" />
      <div class="grid grid-cols-3 gap-2 flex-1">
        <div v-for="i in 6" :key="i" class="bg-zinc-900 rounded-lg border border-zinc-800 p-1.5">
          <div class="w-3 h-3 bg-accent/40 rounded-sm mb-1" />
          <div class="h-1 w-full bg-zinc-700 rounded-full" />
          <div class="h-1 w-3/4 bg-zinc-800 rounded-full mt-0.5" />
        </div>
      </div>
    </div>
  </template>

  <!-- SCROLL REVEAL -->
  <template v-else-if="id === 'scroll-reveal'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-center gap-3 px-6">
      <div class="h-3 w-full bg-zinc-200 rounded-full" />
      <div class="h-3 w-5/6 bg-zinc-400 rounded-full" />
      <div class="h-3 w-full bg-zinc-600 rounded-full" />
      <div class="h-3 w-4/5 bg-zinc-700/50 rounded-full" />
      <div class="h-3 w-3/4 bg-zinc-800/40 rounded-full" />
    </div>
  </template>

  <!-- PRICING -->
  <template v-else-if="id === 'pricing'">
    <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
      <div class="h-2 w-20 bg-zinc-300 rounded-full mx-auto" />
      <div class="flex gap-2 flex-1">
        <div
          v-for="i in [0, 1, 2]"
          :key="i"
          class="flex-1 rounded-lg border p-2 flex flex-col gap-1"
          :class="i === 1 ? 'bg-accent/10 border-accent/30' : 'bg-zinc-900 border-zinc-800'"
        >
          <div class="h-1.5 w-10 rounded-full" :class="i === 1 ? 'bg-accent/60' : 'bg-zinc-600'" />
          <div class="h-3 w-14 rounded-md" :class="i === 1 ? 'bg-accent' : 'bg-zinc-400'" />
          <div class="mt-auto space-y-1">
            <div v-for="j in 3" :key="j" class="h-1 w-full rounded-full" :class="i === 1 ? 'bg-accent/20' : 'bg-zinc-800'" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- MAGNETIC CTA -->
  <template v-else-if="id === 'magnetic-cta'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--color-accent)/0.2),transparent_70%)]" />
      <div class="relative flex flex-col items-center gap-2">
        <div class="h-2 w-32 bg-zinc-200 rounded-full" />
        <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
        <div class="h-7 w-24 bg-accent rounded-full mt-2 flex items-center justify-center">
          <div class="h-1 w-12 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- CTA SECTION -->
  <template v-else-if="id === 'cta'">
    <div class="absolute inset-0 bg-gradient-to-br from-accent/10 to-zinc-950 flex items-center justify-center">
      <div class="flex flex-col items-center gap-2">
        <div class="h-2 w-28 bg-zinc-200 rounded-full" />
        <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
        <div class="flex gap-2 mt-2">
          <div class="h-6 w-16 bg-white rounded-lg" />
          <div class="h-6 w-16 border border-zinc-700 rounded-lg" />
        </div>
      </div>
    </div>
  </template>

  <!-- FOOTER -->
  <template v-else-if="id === 'footer'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-end p-3 gap-2">
      <div class="flex gap-3">
        <div v-for="col in 4" :key="col" class="flex-1 space-y-1">
          <div class="h-1.5 w-8 bg-zinc-400 rounded-full" />
          <div v-for="r in 3" :key="r" class="h-1 bg-zinc-700/70 rounded-full" :style="{ width: `${50 + r * 12}%` }" />
        </div>
      </div>
      <div class="border-t border-zinc-800 pt-2 flex items-center justify-between">
        <div class="h-1 w-20 bg-zinc-700 rounded-full" />
        <div class="flex gap-1.5">
          <div v-for="s in 3" :key="s" class="w-3 h-3 bg-zinc-700 rounded-sm" />
        </div>
      </div>
    </div>
  </template>

  <!-- FLOATING STACK -->
  <template v-else-if="id === 'floating-stack'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="relative w-28 h-20">
        <div
          v-for="i in [0, 1, 2]"
          :key="i"
          class="absolute rounded-xl border border-zinc-700"
          :class="i === 0 ? 'bg-zinc-900' : i === 1 ? 'bg-zinc-800/80' : 'bg-zinc-800/50'"
          :style="{ inset: 0, transform: `translate(${i * 7}px, ${-i * 7}px)`, zIndex: 3 - i }"
        />
      </div>
    </div>
  </template>

  <!-- STATS -->
  <template v-else-if="id === 'stats'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-4">
      <div class="grid grid-cols-4 gap-4 w-full">
        <div v-for="i in 4" :key="i" class="flex flex-col items-center gap-1.5">
          <div class="h-5 w-14 bg-zinc-200 rounded-md" />
          <div class="h-1.5 w-10 bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- TESTIMONIALS -->
  <template v-else-if="id === 'testimonials'">
    <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
      <div class="h-1.5 w-20 bg-zinc-300 rounded-full mx-auto" />
      <div class="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 flex flex-col gap-1.5">
        <div class="flex gap-0.5">
          <div v-for="s in 5" :key="s" class="w-2 h-2 bg-amber-400/70 rounded-sm" />
        </div>
        <div class="h-1.5 w-full bg-zinc-700 rounded-full" />
        <div class="h-1.5 w-5/6 bg-zinc-700/60 rounded-full" />
        <div class="flex items-center gap-1.5 mt-1">
          <div class="w-4 h-4 rounded-full bg-indigo-500/60" />
          <div class="h-1 w-12 bg-zinc-600 rounded-full" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-1.5 flex-1">
        <div v-for="(c, i) in ['bg-violet-500/30', 'bg-emerald-500/30', 'bg-amber-500/30']" :key="i" class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-1.5 flex flex-col gap-1">
          <div class="flex gap-0.5">
            <div v-for="s in 5" :key="s" class="w-1 h-1 bg-amber-400/60 rounded-sm" />
          </div>
          <div class="h-1 w-full bg-zinc-700 rounded-full" />
          <div class="flex items-center gap-1 mt-auto">
            <div class="w-3 h-3 rounded-full" :class="c" />
            <div class="h-1 w-8 bg-zinc-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- FAQ -->
  <template v-else-if="id === 'faq'">
    <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
      <div class="h-1.5 w-20 bg-zinc-300 rounded-full mx-auto mb-1" />
      <div
        v-for="(active, i) in [true, false, false, false, false]"
        :key="i"
        class="rounded-lg border px-3 py-2 flex items-center justify-between"
        :class="active ? 'border-zinc-700 bg-zinc-900/60' : 'border-zinc-800/60 bg-zinc-900/20'"
      >
        <div class="h-1.5 rounded-full" :class="active ? 'w-28 bg-zinc-300' : 'w-20 bg-zinc-700'" />
        <div class="w-3 h-3 rounded-full border flex items-center justify-center" :class="active ? 'border-indigo-500 bg-indigo-500' : 'border-zinc-700'">
          <div class="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- LOGO CLOUD -->
  <template v-else-if="id === 'logo-cloud'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col justify-center gap-3 px-4">
      <div class="h-1.5 w-24 bg-zinc-300 rounded-full mx-auto" />
      <div class="flex flex-wrap gap-1.5 justify-center">
        <div
          v-for="(c, i) in ['#41B883', '#00DC82', '#3178C6', '#38BDF8', '#88CE02', '#BD34FE', '#F38020', '#E0E0E0']"
          :key="i"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/50"
        >
          <div class="w-3 h-3 rounded-sm" :style="{ backgroundColor: c + '40' }" />
          <div class="h-1 w-8 bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- NEWSLETTER -->
  <template v-else-if="id === 'newsletter'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 px-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(99,102,241,0.08),transparent_70%)]" />
      <div class="relative flex flex-col items-center gap-2 w-full max-w-[180px]">
        <div class="h-4 px-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 flex items-center gap-1">
          <div class="w-1 h-1 rounded-full bg-indigo-400" />
          <div class="h-1 w-10 bg-indigo-400/40 rounded-full" />
        </div>
        <div class="h-2 w-28 bg-zinc-200 rounded-full" />
        <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
        <div class="flex gap-1 w-full mt-1">
          <div class="flex-1 h-7 bg-zinc-900 border border-zinc-800 rounded-lg" />
          <div class="h-7 w-16 bg-indigo-500 rounded-lg" />
        </div>
      </div>
    </div>
  </template>

  <!-- GLOW CARDS -->
  <template v-else-if="id === 'glow-cards'">
    <div class="absolute inset-0 bg-zinc-950 p-3 flex flex-col gap-2">
      <div class="h-1.5 w-16 bg-zinc-300 rounded-full mx-auto mb-1" />
      <div class="grid grid-cols-3 gap-1.5 flex-1">
        <div
          v-for="(c, i) in ['#F59E0B', '#8B5CF6', '#3B82F6', '#10B981', '#F43F5E', '#6366F1']"
          :key="i"
          class="rounded-lg border border-zinc-800/60 bg-zinc-900/20 p-1.5 flex flex-col gap-1"
          :style="{ boxShadow: `inset 0 0 12px ${c}10` }"
        >
          <div class="text-[10px]">{{ ['⚡','🎨','🔒','📦','🎯','✨'][i] }}</div>
          <div class="h-1 w-full bg-zinc-700 rounded-full" />
          <div class="h-1 w-3/4 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  </template>
</template>

<!--
USAGE:
<div class="aspect-video relative overflow-hidden bg-zinc-900">
  <UiBlockPreview id="hero" />
</div>
-->
