<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>

  <!-- BUTTON -->
  <template v-if="id === 'button'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3">
      <div class="flex items-center gap-2.5">
        <div class="h-7 px-4 bg-white rounded-lg flex items-center">
          <div class="h-1.5 w-10 bg-zinc-800 rounded-full" />
        </div>
        <div class="h-7 px-4 border border-zinc-700 rounded-lg flex items-center">
          <div class="h-1.5 w-10 bg-zinc-500 rounded-full" />
        </div>
        <div class="h-7 px-4 bg-accent rounded-lg flex items-center">
          <div class="h-1.5 w-10 bg-white/70 rounded-full" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="h-6 px-3 bg-zinc-900 border border-zinc-800 rounded-md flex items-center">
          <div class="h-1 w-7 bg-zinc-600 rounded-full" />
        </div>
        <div class="h-6 px-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center">
          <div class="h-1 w-7 bg-red-400/60 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- ICON BUTTON -->
  <template v-else-if="id === 'icon-button'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center gap-3">
      <div class="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-zinc-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
      </div>
      <div class="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 12 6 6L21 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="w-9 h-9 border border-zinc-700 rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </template>

  <!-- BUTTON GROUP -->
  <template v-else-if="id === 'button-group'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div class="flex">
        <div class="h-7 px-3 bg-zinc-900 border border-zinc-700 rounded-l-lg border-r-0 flex items-center">
          <div class="h-1.5 w-6 bg-zinc-500 rounded-full" />
        </div>
        <div class="h-7 px-3 bg-white border border-zinc-700 border-r-0 flex items-center">
          <div class="h-1.5 w-6 bg-zinc-800 rounded-full" />
        </div>
        <div class="h-7 px-3 bg-zinc-900 border border-zinc-700 rounded-r-lg flex items-center">
          <div class="h-1.5 w-6 bg-zinc-500 rounded-full" />
        </div>
      </div>
      <div class="flex p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg gap-0.5">
        <div class="h-6 px-3 bg-zinc-800 rounded-md flex items-center">
          <div class="h-1 w-5 bg-zinc-300 rounded-full" />
        </div>
        <div class="h-6 px-3 flex items-center">
          <div class="h-1 w-5 bg-zinc-600 rounded-full" />
        </div>
        <div class="h-6 px-3 flex items-center">
          <div class="h-1 w-5 bg-zinc-600 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- INPUT -->
  <template v-else-if="id === 'input'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 px-8">
      <div class="w-full flex flex-col gap-1">
        <div class="h-1.5 w-10 bg-zinc-400 rounded-full" />
        <div class="h-8 w-full bg-zinc-900 border border-zinc-700 rounded-lg flex items-center px-3 gap-2">
          <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
          <div class="h-4 w-px bg-accent ml-auto opacity-80" />
        </div>
      </div>
      <div class="w-full flex flex-col gap-1">
        <div class="h-1.5 w-12 bg-zinc-400 rounded-full" />
        <div class="h-8 w-full bg-zinc-900 border border-red-500/40 rounded-lg flex items-center px-3">
          <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
        </div>
        <div class="h-1 w-24 bg-red-400/50 rounded-full" />
      </div>
    </div>
  </template>

  <!-- TEXTAREA -->
  <template v-else-if="id === 'textarea'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-8">
      <div class="w-full flex flex-col gap-1.5">
        <div class="h-1.5 w-14 bg-zinc-400 rounded-full" />
        <div class="w-full h-16 bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 flex flex-col gap-1.5">
          <div class="h-1 w-full bg-zinc-700 rounded-full" />
          <div class="h-1 w-5/6 bg-zinc-700 rounded-full" />
          <div class="h-1 w-3/4 bg-zinc-700 rounded-full" />
          <div class="h-3 w-px bg-accent ml-[72%] mt-auto opacity-80" />
        </div>
        <div class="h-1 w-20 bg-zinc-600 rounded-full" />
      </div>
    </div>
  </template>

  <!-- SELECT -->
  <template v-else-if="id === 'select'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 px-8">
      <div class="w-full flex flex-col gap-1">
        <div class="h-1.5 w-10 bg-zinc-400 rounded-full" />
        <div class="h-8 w-full bg-zinc-900 border border-zinc-700 rounded-lg flex items-center px-3">
          <div class="h-1.5 w-20 bg-zinc-400 rounded-full" />
          <svg class="w-3.5 h-3.5 text-zinc-500 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
      <!-- Open dropdown state -->
      <div class="w-full bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-xl">
        <div v-for="(active, i) in [false, true, false, false]" :key="i"
          class="flex items-center gap-2 px-3 py-1.5"
          :class="active ? 'bg-accent/20' : 'hover:bg-zinc-800'"
        >
          <div class="w-1.5 h-1.5 rounded-full" :class="active ? 'bg-accent' : 'bg-transparent'" />
          <div class="h-1 rounded-full" :class="[active ? 'bg-accent/70 w-14' : 'bg-zinc-600 w-12']" />
        </div>
      </div>
    </div>
  </template>

  <!-- CHECKBOX -->
  <template v-else-if="id === 'checkbox'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="flex flex-col gap-3">
        <div v-for="(checked, i) in [true, true, false, false]" :key="i" class="flex items-center gap-2.5">
          <div
            class="w-4 h-4 rounded flex items-center justify-center border"
            :class="checked ? 'bg-accent border-accent' : 'bg-zinc-900 border-zinc-700'"
          >
            <svg v-if="checked" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="h-1.5 rounded-full" :class="checked ? 'w-16 bg-zinc-300' : 'w-14 bg-zinc-600'" />
        </div>
      </div>
    </div>
  </template>

  <!-- SWITCH -->
  <template v-else-if="id === 'switch'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="flex flex-col gap-4">
        <div v-for="(on, i) in [true, false, true]" :key="i" class="flex items-center gap-3">
          <div
            class="w-9 h-5 rounded-full flex items-center px-0.5 transition-colors"
            :class="on ? 'bg-accent' : 'bg-zinc-700'"
          >
            <div
              class="w-4 h-4 bg-white rounded-full shadow-sm transition-transform"
              :style="{ transform: on ? 'translateX(16px)' : 'translateX(0)' }"
            />
          </div>
          <div class="h-1.5 w-14 rounded-full" :class="on ? 'bg-zinc-300' : 'bg-zinc-600'" />
        </div>
      </div>
    </div>
  </template>

  <!-- TABS -->
  <template v-else-if="id === 'tabs'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col px-6 py-5 gap-3">
      <div class="flex border-b border-zinc-800 gap-0">
        <div v-for="(active, i) in [true, false, false]" :key="i"
          class="px-3 pb-2 text-xs flex flex-col items-center gap-1.5 relative"
        >
          <div class="h-1.5 w-10 rounded-full" :class="active ? 'bg-white' : 'bg-zinc-600'" />
          <div v-if="active" class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-2">
        <div class="h-1.5 w-3/4 bg-zinc-300 rounded-full" />
        <div class="h-1 w-full bg-zinc-700 rounded-full" />
        <div class="h-1 w-5/6 bg-zinc-700 rounded-full" />
        <div class="h-1 w-2/3 bg-zinc-800 rounded-full" />
      </div>
    </div>
  </template>

  <!-- BREADCRUMB -->
  <template v-else-if="id === 'breadcrumb'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-6">
      <div class="flex flex-col gap-3 w-full">
        <div class="flex items-center gap-1.5">
          <div v-for="(active, i) in [false, false, true]" :key="i" class="flex items-center gap-1.5">
            <div class="h-1.5 w-8 rounded-full" :class="active ? 'bg-zinc-200' : 'bg-zinc-600'" />
            <div v-if="i < 2" class="h-1 w-1 bg-zinc-700 rounded-full" />
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded bg-zinc-800 border border-zinc-700" />
          <div class="w-1 h-1 bg-zinc-700 rotate-45" />
          <div class="h-1.5 w-10 bg-zinc-600 rounded-full" />
          <div class="w-1 h-1 bg-zinc-700 rotate-45" />
          <div class="h-1.5 w-14 bg-zinc-400 rounded-full" />
          <div class="w-1 h-1 bg-zinc-700 rotate-45" />
          <div class="h-1.5 w-8 bg-zinc-200 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- PAGINATION -->
  <template v-else-if="id === 'pagination'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="flex items-center gap-1">
        <div class="w-7 h-7 rounded-lg border border-zinc-700 bg-zinc-900 flex items-center justify-center">
          <svg class="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div v-for="(active, i) in [false, true, false, false, false]" :key="i"
          class="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-medium"
          :class="active ? 'bg-accent text-white' : 'border border-zinc-800 text-zinc-500'"
        >
          {{ i + 1 }}
        </div>
        <div class="w-7 h-7 rounded-lg border border-zinc-700 bg-zinc-900 flex items-center justify-center">
          <svg class="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>
  </template>

  <!-- BADGE -->
  <template v-else-if="id === 'badge'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3">
      <div class="flex items-center gap-2 flex-wrap justify-center">
        <div class="h-5 px-2.5 bg-accent/15 border border-accent/30 rounded-full flex items-center">
          <div class="h-1 w-8 bg-accent/70 rounded-full" />
        </div>
        <div class="h-5 px-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center">
          <div class="h-1 w-6 bg-emerald-400/70 rounded-full" />
        </div>
        <div class="h-5 px-2.5 bg-amber-500/15 border border-amber-500/30 rounded-full flex items-center">
          <div class="h-1 w-8 bg-amber-400/70 rounded-full" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="h-5 px-2.5 bg-red-500/15 border border-red-500/30 rounded-full flex items-center gap-1">
          <div class="w-1.5 h-1.5 rounded-full bg-red-400" />
          <div class="h-1 w-6 bg-red-400/60 rounded-full" />
        </div>
        <div class="h-5 px-2.5 bg-zinc-800 border border-zinc-700 rounded-full flex items-center">
          <div class="h-1 w-8 bg-zinc-500 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- ALERT -->
  <template v-else-if="id === 'alert'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-2.5 px-6">
      <div class="w-full p-3 bg-accent/10 border border-accent/25 rounded-xl flex gap-2.5">
        <div class="w-4 h-4 rounded-full bg-accent/30 shrink-0 flex items-center justify-center mt-0.5">
          <div class="w-1 h-1 bg-accent rounded-full" />
        </div>
        <div class="flex flex-col gap-1">
          <div class="h-1.5 w-16 bg-accent/60 rounded-full" />
          <div class="h-1 w-24 bg-zinc-600 rounded-full" />
        </div>
      </div>
      <div class="w-full p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex gap-2.5">
        <div class="w-4 h-4 rounded-full bg-emerald-500/30 shrink-0 flex items-center justify-center mt-0.5">
          <svg class="w-2 h-2 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="flex flex-col gap-1">
          <div class="h-1.5 w-12 bg-emerald-400/60 rounded-full" />
          <div class="h-1 w-20 bg-zinc-600 rounded-full" />
        </div>
      </div>
      <div class="w-full p-3 bg-red-500/10 border border-red-500/25 rounded-xl flex gap-2.5">
        <div class="w-4 h-4 rounded-full bg-red-500/30 shrink-0 flex items-center justify-center mt-0.5">
          <div class="w-1.5 h-px bg-red-400 rounded-full" />
        </div>
        <div class="flex flex-col gap-1">
          <div class="h-1.5 w-10 bg-red-400/60 rounded-full" />
          <div class="h-1 w-28 bg-zinc-600 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- TOAST -->
  <template v-else-if="id === 'toast'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-end justify-end gap-2 p-4">
      <div class="w-48 p-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex gap-2.5">
        <div class="w-4 h-4 rounded-full bg-emerald-500/30 shrink-0 flex items-center justify-center mt-0.5">
          <svg class="w-2 h-2 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="h-1.5 w-16 bg-zinc-300 rounded-full" />
          <div class="h-1 w-24 bg-zinc-600 rounded-full" />
        </div>
        <svg class="w-3 h-3 text-zinc-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>
      </div>
      <div class="w-48 p-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex gap-2.5 opacity-70">
        <div class="w-4 h-4 rounded-full bg-red-500/30 shrink-0 flex items-center justify-center mt-0.5">
          <div class="w-1.5 h-px bg-red-400 rounded-full" />
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="h-1.5 w-12 bg-zinc-400 rounded-full" />
          <div class="h-1 w-20 bg-zinc-600 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- SPINNER -->
  <template v-else-if="id === 'spinner'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center gap-5">
      <div class="flex flex-col items-center gap-2">
        <div class="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-accent" />
        <div class="h-1 w-8 bg-zinc-700 rounded-full" />
      </div>
      <div class="flex flex-col items-center gap-2">
        <div class="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-white" />
        <div class="h-1 w-6 bg-zinc-700 rounded-full" />
      </div>
      <div class="flex flex-col items-center gap-2">
        <div class="w-5 h-5 rounded-full border-[3px] border-zinc-800 border-t-emerald-400" />
        <div class="h-1 w-5 bg-zinc-700 rounded-full" />
      </div>
    </div>
  </template>

  <!-- PROGRESS -->
  <template v-else-if="id === 'progress'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4 px-8">
      <div class="w-full flex flex-col gap-1.5">
        <div class="flex justify-between">
          <div class="h-1.5 w-12 bg-zinc-400 rounded-full" />
          <div class="h-1.5 w-6 bg-zinc-500 rounded-full" />
        </div>
        <div class="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full w-3/4 bg-accent rounded-full" />
        </div>
      </div>
      <div class="w-full flex flex-col gap-1.5">
        <div class="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full w-2/5 bg-emerald-500 rounded-full" />
        </div>
      </div>
      <div class="w-full flex flex-col gap-1.5">
        <div class="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full w-[85%] bg-gradient-to-r from-accent to-violet-500 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- MODAL -->
  <template v-else-if="id === 'modal'">
    <div class="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div class="w-full max-w-[180px] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        <div class="p-3 border-b border-zinc-800 flex items-center justify-between">
          <div class="h-2 w-16 bg-zinc-200 rounded-full" />
          <div class="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <svg class="w-2 h-2 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="p-3 flex flex-col gap-1.5">
          <div class="h-1 w-full bg-zinc-700 rounded-full" />
          <div class="h-1 w-5/6 bg-zinc-700 rounded-full" />
          <div class="h-1 w-3/4 bg-zinc-800 rounded-full" />
        </div>
        <div class="p-3 pt-1 flex gap-2">
          <div class="flex-1 h-6 bg-zinc-800 border border-zinc-700 rounded-lg" />
          <div class="flex-1 h-6 bg-accent rounded-lg" />
        </div>
      </div>
    </div>
  </template>

  <!-- TOOLTIP -->
  <template v-else-if="id === 'tooltip'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="flex flex-col items-center gap-1.5">
        <div class="px-3 py-1.5 bg-zinc-700 rounded-lg shadow-lg flex items-center gap-1.5">
          <div class="h-1 w-16 bg-zinc-300 rounded-full" />
        </div>
        <div class="w-1.5 h-1.5 bg-zinc-700 rotate-45 -mt-0.5" />
        <div class="h-8 px-4 bg-white rounded-lg flex items-center">
          <div class="h-1.5 w-12 bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- DROPDOWN -->
  <template v-else-if="id === 'dropdown'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-8">
      <div class="w-full flex flex-col gap-1.5">
        <div class="h-8 w-full bg-zinc-900 border border-zinc-700 rounded-lg flex items-center px-3 gap-2">
          <div class="h-1.5 w-16 bg-zinc-400 rounded-full" />
          <svg class="w-3.5 h-3.5 text-zinc-500 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="w-full bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          <div class="px-2 py-1">
            <div v-for="(active, i) in [false, true, false, false]" :key="i"
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg"
              :class="active ? 'bg-accent/20' : ''"
            >
              <div class="w-3 h-3 rounded bg-zinc-800 border border-zinc-700 shrink-0" />
              <div class="h-1 rounded-full" :class="[active ? 'bg-accent/70 w-14' : 'bg-zinc-600 w-12']" />
            </div>
          </div>
          <div class="border-t border-zinc-800 px-2 py-1">
            <div class="flex items-center gap-2 px-2 py-1.5 rounded-lg">
              <div class="w-3 h-3 rounded bg-red-500/20 border border-red-500/30 shrink-0" />
              <div class="h-1 w-10 bg-red-400/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- CARD -->
  <template v-else-if="id === 'card'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center p-4 gap-3">
      <div class="flex-1 h-full max-h-28 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
        <div class="h-12 bg-zinc-800" />
        <div class="p-2.5 flex flex-col gap-1.5 flex-1">
          <div class="h-1.5 w-full bg-zinc-300 rounded-full" />
          <div class="h-1 w-3/4 bg-zinc-600 rounded-full" />
          <div class="mt-auto h-5 bg-accent rounded-md" />
        </div>
      </div>
      <div class="flex-1 h-full max-h-28 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
        <div class="h-12 bg-gradient-to-br from-accent/20 to-violet-500/20" />
        <div class="p-2.5 flex flex-col gap-1.5 flex-1">
          <div class="h-1.5 w-full bg-zinc-300 rounded-full" />
          <div class="h-1 w-2/3 bg-zinc-600 rounded-full" />
          <div class="mt-auto h-5 border border-zinc-700 rounded-md" />
        </div>
      </div>
    </div>
  </template>

  <!-- AVATAR -->
  <template v-else-if="id === 'avatar'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div class="flex items-center -space-x-2">
        <div v-for="(color, i) in ['bg-accent', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500', 'bg-zinc-700']" :key="i"
          class="w-8 h-8 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[9px] font-bold text-white"
          :class="color"
        >{{ ['A','B','C','D','+3'][i] }}</div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-[10px] font-semibold text-accent">EK</div>
        <div class="flex flex-col gap-1">
          <div class="h-1.5 w-16 bg-zinc-300 rounded-full" />
          <div class="h-1 w-12 bg-zinc-600 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- TABLE -->
  <template v-else-if="id === 'table'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col p-3 gap-2">
      <div class="flex items-center gap-2">
        <div class="h-1.5 w-16 bg-zinc-300 rounded-full" />
        <div class="ml-auto h-5 w-14 bg-accent rounded-md" />
      </div>
      <div class="flex-1 border border-zinc-800 rounded-xl overflow-hidden">
        <div class="flex gap-2 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
          <div v-for="w in ['w-8','w-14','w-10','w-8']" :key="w" class="h-1 rounded-full bg-zinc-500 flex-1" />
        </div>
        <div v-for="row in 3" :key="row" class="flex gap-2 px-3 py-2 border-b border-zinc-800/60 last:border-0 items-center">
          <div class="w-3 h-3 rounded-full bg-zinc-700 shrink-0" />
          <div class="h-1 flex-1 bg-zinc-700 rounded-full" />
          <div class="h-1 flex-1 bg-zinc-700 rounded-full" />
          <div class="h-4 w-10 rounded-full flex-shrink-0"
            :class="row === 1 ? 'bg-emerald-500/20 border border-emerald-500/30' : row === 2 ? 'bg-accent/20 border border-accent/30' : 'bg-zinc-800'"
          />
        </div>
      </div>
    </div>
  </template>

  <!-- TAG -->
  <template v-else-if="id === 'tag'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-2.5 px-6">
      <div class="flex flex-wrap gap-1.5 justify-center">
        <div v-for="(cfg, i) in [
          { w: 'w-12', bg: 'bg-accent/10 border-accent/25 text-accent/70' },
          { w: 'w-10', bg: 'bg-zinc-800 border-zinc-700' },
          { w: 'w-14', bg: 'bg-emerald-500/10 border-emerald-500/25' },
          { w: 'w-8',  bg: 'bg-zinc-800 border-zinc-700' },
          { w: 'w-12', bg: 'bg-amber-500/10 border-amber-500/25' },
          { w: 'w-16', bg: 'bg-zinc-800 border-zinc-700' },
        ]" :key="i"
          class="h-5 px-2 border rounded-full flex items-center gap-1"
          :class="cfg.bg"
        >
          <div class="h-1 flex-1 bg-current opacity-40 rounded-full" />
          <svg class="w-2 h-2 opacity-40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>
        </div>
      </div>
    </div>
  </template>

</template>
