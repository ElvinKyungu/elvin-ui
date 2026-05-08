<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>

  <!-- SaaS Landing -->
  <template v-if="id === 'saas-landing'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-3">
          <div class="w-2 h-2 bg-white rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /></div>
          <div class="h-3 w-8 bg-accent rounded-md ml-1" />
        </div>
        <div class="flex-1 flex flex-col items-center justify-center gap-1.5 px-4 relative">
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgb(var(--color-accent)/0.15),transparent_65%)]" />
          <div class="h-1.5 w-8 bg-accent/50 rounded-full" />
          <div class="h-2 w-28 bg-zinc-200 rounded-full" />
          <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
          <div class="h-1 w-16 bg-zinc-700/60 rounded-full" />
          <div class="flex gap-1.5 mt-1"><div class="h-4 w-12 bg-accent rounded-md" /><div class="h-4 w-12 border border-zinc-700 rounded-md" /></div>
        </div>
        <div class="h-8 border-t border-zinc-800/60 flex items-center justify-center gap-3 px-3">
          <div v-for="i in 5" :key="i" class="h-1 w-6 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- SaaS Pricing -->
  <template v-else-if="id === 'saas-pricing'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col p-3 gap-2">
        <div class="flex flex-col items-center gap-1">
          <div class="h-2 w-16 bg-zinc-300 rounded-full" />
          <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
          <div class="flex gap-1 mt-0.5 p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div class="h-3 w-10 bg-zinc-700 rounded-md" />
            <div class="h-3 w-10 bg-transparent rounded-md" />
          </div>
        </div>
        <div class="flex gap-1.5 flex-1">
          <div v-for="i in [0,1,2]" :key="i"
            class="flex-1 rounded-lg border p-1.5 flex flex-col gap-1"
            :class="i === 1 ? 'bg-accent/10 border-accent/30' : 'bg-zinc-900 border-zinc-800'"
          >
            <div class="h-1 w-8 rounded-full" :class="i === 1 ? 'bg-accent/60' : 'bg-zinc-600'" />
            <div class="h-2.5 w-10 rounded-md" :class="i === 1 ? 'bg-accent' : 'bg-zinc-400'" />
            <div class="mt-1 space-y-0.5 flex-1">
              <div v-for="j in 4" :key="j" class="flex items-center gap-1">
                <div class="w-1.5 h-1.5 rounded-full" :class="i === 1 ? 'bg-accent/50' : 'bg-zinc-700'" />
                <div class="h-1 rounded-full flex-1" :class="i === 1 ? 'bg-accent/20' : 'bg-zinc-800'" />
              </div>
            </div>
            <div class="h-3 rounded-md mt-auto" :class="i === 1 ? 'bg-accent' : 'bg-zinc-800'" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- SaaS Docs -->
  <template v-else-if="id === 'saas-docs'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="w-16 border-r border-zinc-800/60 p-2 flex flex-col gap-1.5">
          <div class="h-1.5 w-10 bg-accent/50 rounded-full" />
          <div v-for="i in 5" :key="i" class="h-1 rounded-full" :class="i === 1 ? 'w-8 bg-zinc-400' : 'w-full bg-zinc-800'" />
          <div class="mt-1 h-1 w-full bg-zinc-800 rounded-full" />
          <div v-for="i in 3" :key="i" class="h-1 w-3/4 bg-zinc-800 rounded-full ml-1.5" />
        </div>
        <div class="flex-1 p-3 flex flex-col gap-1.5">
          <div class="h-1.5 w-6 bg-accent/60 rounded-full" />
          <div class="h-2 w-24 bg-zinc-200 rounded-full" />
          <div class="h-1 w-full bg-zinc-700/50 rounded-full" />
          <div class="h-1 w-5/6 bg-zinc-700/50 rounded-full" />
          <div class="mt-1 p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div class="h-1 w-3/4 bg-zinc-600 rounded-full" />
            <div class="h-1 w-1/2 bg-zinc-700 rounded-full mt-0.5" />
          </div>
          <div class="h-1 w-full bg-zinc-700/40 rounded-full" />
          <div class="h-1 w-4/5 bg-zinc-700/40 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- Analytics Dashboard -->
  <template v-else-if="id === 'dashboard-analytics'">
    <div class="absolute inset-0 bg-zinc-950 flex overflow-hidden">
      <!-- Sidebar -->
      <div class="w-10 border-r border-zinc-800/60 bg-zinc-900/80 flex flex-col items-center gap-1.5 py-2 shrink-0">
        <div class="w-4 h-4 rounded-md bg-accent mb-1" />
        <div class="w-5 h-1 bg-accent/40 rounded-full" />
        <div v-for="i in 3" :key="i" class="w-5 h-1 bg-zinc-700 rounded-full" />
        <div class="mt-auto w-5 h-1 bg-zinc-700 rounded-full" />
        <div class="w-4 h-4 rounded-full bg-gradient-to-br from-accent to-teal-600" />
      </div>
      <!-- Main -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Topbar -->
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-2 gap-2 shrink-0">
          <div class="h-1 w-10 bg-zinc-300 rounded-full" />
          <div class="flex-1 h-1.5 bg-zinc-800 rounded-full mx-2 max-w-[40px]" />
          <div class="ml-auto flex gap-1.5"><div class="w-3 h-3 rounded-md bg-zinc-800" /><div class="w-3 h-3 rounded-full bg-gradient-to-br from-accent to-teal-600" /></div>
        </div>
        <!-- Content -->
        <div class="flex-1 p-1.5 flex flex-col gap-1.5 overflow-hidden">
          <!-- KPI row -->
          <div class="grid grid-cols-4 gap-1">
            <div v-for="i in 4" :key="i" class="bg-zinc-900 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col gap-0.5">
              <div class="h-0.5 w-5 bg-zinc-600 rounded-full" />
              <div class="h-2 w-7" :class="i === 1 ? 'bg-zinc-200' : 'bg-zinc-400'" style="border-radius:2px" />
              <svg viewBox="0 0 40 12" class="w-full h-2.5" preserveAspectRatio="none">
                <polyline :points="i===3 ? '0,4 8,6 16,4 24,8 32,10 40,12' : '0,12 8,9 16,12 24,7 32,5 40,2'" fill="none" :stroke="i===3 ? '#ef4444' : '#42b883'" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <!-- Charts row -->
          <div class="flex gap-1.5 flex-1 min-h-0">
            <!-- Area chart -->
            <div class="flex-1 bg-zinc-900 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col gap-1 min-w-0">
              <div class="flex justify-between"><div class="h-1 w-8 bg-zinc-300 rounded-full" /><div class="h-1 w-6 bg-accent/40 rounded-full" /></div>
              <svg viewBox="0 0 100 30" class="w-full flex-1" preserveAspectRatio="none">
                <defs><linearGradient id="th-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#42b883" stop-opacity="0.35"/><stop offset="100%" stop-color="#42b883" stop-opacity="0"/></linearGradient></defs>
                <path d="M0,22 L9,20 L18,24 L27,19 L36,15 L45,18 L54,13 L63,11 L72,13 L81,8 L90,5 L100,2 L100,30 L0,30 Z" fill="url(#th-a)"/>
                <polyline points="0,22 9,20 18,24 27,19 36,15 45,18 54,13 63,11 72,13 81,8 90,5 100,2" fill="none" stroke="#42b883" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
            <!-- Donut -->
            <div class="w-16 bg-zinc-900 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col items-center gap-1 shrink-0">
              <div class="h-1 w-8 bg-zinc-300 rounded-full self-start" />
              <svg viewBox="0 0 44 44" class="w-10 h-10">
                <circle cx="22" cy="22" r="14" fill="none" stroke="#27272a" stroke-width="5"/>
                <circle cx="22" cy="22" r="14" fill="none" stroke="#42b883" stroke-width="5" stroke-dasharray="39.6 88" stroke-dashoffset="0" transform="rotate(-90 22 22)"/>
                <circle cx="22" cy="22" r="14" fill="none" stroke="#34d399" stroke-width="5" stroke-dasharray="24.6 88" stroke-dashoffset="-39.6" transform="rotate(-90 22 22)"/>
                <circle cx="22" cy="22" r="14" fill="none" stroke="#059669" stroke-width="5" stroke-dasharray="15.8 88" stroke-dashoffset="-64.2" transform="rotate(-90 22 22)"/>
              </svg>
              <div v-for="(c,i) in ['bg-accent','bg-emerald-400','bg-emerald-600']" :key="i" class="flex items-center gap-0.5 self-start">
                <div class="w-1 h-1 rounded-full" :class="c"/><div class="h-0.5 w-4 bg-zinc-700 rounded-full"/>
              </div>
            </div>
          </div>
          <!-- Bottom row -->
          <div class="flex gap-1.5" style="height:36px">
            <!-- Bar chart -->
            <div class="w-20 bg-zinc-900 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col gap-1 shrink-0">
              <div class="h-0.5 w-8 bg-zinc-300 rounded-full"/>
              <div class="flex items-end gap-0.5 flex-1">
                <div v-for="(h,i) in [43,65,49,81,100,68,39]" :key="i" class="flex-1 bg-accent rounded-[1px]" :style="`height:${h}%;opacity:${0.5 + h/200}`"/>
              </div>
            </div>
            <!-- Transactions -->
            <div class="flex-1 bg-zinc-900 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col gap-0.5 min-w-0">
              <div class="h-0.5 w-10 bg-zinc-300 rounded-full mb-0.5"/>
              <div v-for="i in 3" :key="i" class="flex items-center gap-1">
                <div class="w-2.5 h-2.5 rounded-md bg-gradient-to-br shrink-0" :class="['from-accent to-teal-600','from-blue-500 to-accent','from-amber-500 to-orange-600'][i-1]"/>
                <div class="h-0.5 flex-1 bg-zinc-700 rounded-full"/>
                <div class="h-1 w-4 rounded-full shrink-0" :class="i===2 ? 'bg-amber-500/60' : 'bg-accent/60'"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- SaaS Metrics Dashboard -->
  <template v-else-if="id === 'dashboard-saas'">
    <div class="absolute inset-0 bg-[#080808] flex flex-col overflow-hidden">
      <!-- Top nav -->
      <div class="h-5 border-b border-zinc-800/60 flex items-center px-2 gap-2 shrink-0">
        <div class="w-3 h-3 rounded-md bg-accent" />
        <div class="flex gap-2"><div class="h-1 w-5 bg-zinc-600 rounded-full"/><div class="h-1 w-5 bg-accent/30 rounded-full"/><div class="h-1 w-5 bg-zinc-600 rounded-full"/></div>
        <div class="ml-auto flex gap-1"><div class="flex gap-0.5 bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5"><div class="h-1 w-2 bg-zinc-700 rounded-full"/><div class="h-1 w-2 bg-accent/40 rounded-full"/></div><div class="w-3 h-3 rounded-full bg-gradient-to-br from-accent to-teal-600"/></div>
      </div>
      <!-- MRR hero -->
      <div class="border-b border-zinc-800/60 bg-zinc-900/20 px-2 py-1.5 flex items-center gap-3">
        <div>
          <div class="h-0.5 w-8 bg-zinc-600 rounded-full mb-0.5"/>
          <div class="h-2.5 w-12 bg-zinc-100 rounded" />
          <div class="h-0.5 w-6 bg-zinc-700 rounded-full mt-0.5"/>
        </div>
        <svg viewBox="0 0 100 20" class="flex-1" style="height:20px" preserveAspectRatio="none">
          <defs><linearGradient id="th-mrr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#42b883" stop-opacity="0.3"/><stop offset="100%" stop-color="#42b883" stop-opacity="0"/></linearGradient></defs>
          <path d="M0,18 L20,15 L40,14 L60,10 L80,6 L100,2 L100,20 L0,20 Z" fill="url(#th-mrr)"/>
          <polyline points="0,18 20,15 40,14 60,10 80,6 100,2" fill="none" stroke="#42b883" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <!-- Content -->
      <div class="flex-1 p-1.5 flex flex-col gap-1.5 overflow-hidden">
        <!-- Metric cards -->
        <div class="grid grid-cols-4 gap-1">
          <div v-for="(up,i) in [true,false,true,true]" :key="i" class="bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-1 flex flex-col gap-0.5">
            <div class="h-0.5 w-5 bg-zinc-600 rounded-full"/>
            <div class="h-2 w-6 bg-zinc-300 rounded" style="border-radius:2px"/>
            <svg viewBox="0 0 40 10" class="w-full h-2" preserveAspectRatio="none">
              <polyline :points="up ? '0,10 10,7 20,6 30,4 40,1' : '0,2 10,4 20,3 30,6 40,9'" fill="none" :stroke="up ? '#42b883' : '#ef4444'" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <!-- Charts -->
        <div class="flex gap-1.5 flex-1 min-h-0">
          <!-- Multi-line chart -->
          <div class="flex-1 bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col gap-1 min-w-0">
            <div class="flex justify-between items-center"><div class="h-1 w-8 bg-zinc-300 rounded-full"/><div class="flex gap-1"><div class="h-0.5 w-3 bg-accent rounded-full"/><div class="h-0.5 w-3 bg-emerald-700 rounded-full"/></div></div>
            <svg viewBox="0 0 100 30" class="w-full flex-1" preserveAspectRatio="none">
              <defs>
                <linearGradient id="th-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#42b883" stop-opacity="0.2"/><stop offset="100%" stop-color="#42b883" stop-opacity="0"/></linearGradient>
              </defs>
              <path d="M0,22 L20,17 L40,19 L60,12 L80,7 L100,3 L100,30 L0,30 Z" fill="url(#th-f)"/>
              <polyline points="0,22 20,17 40,19 60,12 80,7 100,3" fill="none" stroke="#42b883" stroke-width="1.2" stroke-linecap="round"/>
              <polyline points="0,27 20,26 40,25 60,23 80,21 100,19" fill="none" stroke="#059669" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="3 2"/>
            </svg>
          </div>
          <!-- Feature adoption -->
          <div class="w-20 bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-1.5 flex flex-col gap-1 shrink-0">
            <div class="h-1 w-8 bg-zinc-300 rounded-full"/>
            <div v-for="(w,i) in [78,65,52,41,38]" :key="i" class="flex items-center gap-0.5">
              <div class="h-0.5 w-4 bg-zinc-600 rounded-full shrink-0"/>
              <div class="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-accent rounded-full" :style="`width:${w}%`"/>
              </div>
            </div>
          </div>
        </div>
        <!-- Bottom row -->
        <div class="flex gap-1.5" style="height:34px">
          <!-- Heatmap -->
          <div class="flex-1 bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-1.5 min-w-0">
            <div class="h-0.5 w-8 bg-zinc-300 rounded-full mb-1"/>
            <div class="grid gap-0.5" style="grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(5,1fr);height:20px">
              <div v-for="i in 60" :key="i" class="rounded-[1px]" :class="[0,1,2,3,4,2,1,3,2,4,1,2,0,2,3,1,4,2,3,1,2,3,4,1,2,0,1,3,2,4,3,2,1,4,3,2,1,0,2,3,1,2,4,3,2,1,3,2,4,3,2,1,3,4,2,3,1,2,4,3][i] > 2 ? 'bg-accent/80' : [0,1,2,3,4,2,1,3,2,4,1,2,0,2,3,1,4,2,3,1,2,3,4,1,2,0,1,3,2,4,3,2,1,4,3,2,1,0,2,3,1,2,4,3,2,1,3,2,4,3,2,1,3,4,2,3,1,2,4,3][i] > 0 ? 'bg-accent/30' : 'bg-zinc-800/40'"/>
            </div>
          </div>
          <!-- Recent users -->
          <div class="flex-1 bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-1.5 min-w-0">
            <div class="h-0.5 w-8 bg-zinc-300 rounded-full mb-1"/>
            <div v-for="i in 3" :key="i" class="flex items-center gap-1 mb-0.5">
              <div class="w-2 h-2 rounded-md shrink-0 bg-gradient-to-br" :class="['from-accent to-teal-600','from-blue-500 to-blue-600','from-amber-500 to-amber-600'][i-1]"/>
              <div class="h-0.5 flex-1 bg-zinc-700 rounded-full"/>
              <div class="h-1.5 w-4 rounded-sm shrink-0" :class="i===2 ? 'bg-blue-500/40' : 'bg-accent/40'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- CRM Dashboard -->
  <template v-else-if="id === 'dashboard-crm'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="w-12 border-r border-zinc-800/60 p-2 flex flex-col items-center gap-2">
          <div class="w-4 h-4 bg-zinc-800 rounded-md" />
          <div v-for="i in 4" :key="i" class="w-4 h-4 rounded-md" :class="i === 2 ? 'bg-accent/30' : 'bg-zinc-900'" />
        </div>
        <div class="flex-1 p-2 flex flex-col gap-1.5">
          <div class="flex gap-1 items-center">
            <div class="h-1.5 w-14 bg-zinc-300 rounded-full" />
            <div class="ml-auto h-3 w-8 bg-accent rounded-md" />
          </div>
          <div class="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div class="flex gap-2 px-2 py-1 border-b border-zinc-800">
              <div v-for="col in ['Name','Status','Deal','Date']" :key="col" class="h-1 flex-1 bg-zinc-700 rounded-full" />
            </div>
            <div v-for="row in 4" :key="row" class="flex gap-2 px-2 py-1.5 border-b border-zinc-800/40">
              <div class="flex items-center gap-1 flex-1">
                <div class="w-2 h-2 rounded-full bg-zinc-600" />
                <div class="h-1 w-10 bg-zinc-600 rounded-full" />
              </div>
              <div class="flex-1 flex items-center">
                <div class="h-2 w-8 rounded-full" :class="row % 2 === 0 ? 'bg-emerald-500/30' : 'bg-accent/20'" />
              </div>
              <div class="h-1 flex-1 bg-zinc-700 rounded-full" />
              <div class="h-1 flex-1 bg-zinc-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- E-commerce Store -->
  <template v-else-if="id === 'ecommerce-store'">
    <div class="absolute inset-0 bg-[#080808] flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-2">
          <div class="w-2 h-2 bg-zinc-100 rounded-[2px]" />
          <div class="flex-1 h-2 bg-zinc-800/80 rounded-full mx-2 max-w-[50px]" />
          <div class="flex gap-1.5 ml-auto">
            <div class="w-3 h-3 rounded-md bg-zinc-800 border border-zinc-700" />
            <div class="w-3 h-3 rounded-md bg-zinc-800 border border-zinc-700" />
            <div class="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600" />
          </div>
        </div>
        <div class="flex flex-1 gap-0 overflow-hidden">
          <div class="w-12 border-r border-zinc-800/60 p-1.5 flex flex-col gap-1 shrink-0">
            <div class="h-1 w-8 bg-zinc-600 rounded-full" />
            <div v-for="i in 4" :key="i" class="flex items-center gap-0.5">
              <div class="w-1 h-1 rounded-full" :class="i === 1 ? 'bg-accent' : 'bg-zinc-700'" />
              <div class="h-0.5 flex-1 rounded-full" :class="i === 1 ? 'bg-accent/40' : 'bg-zinc-800'" />
            </div>
          </div>
          <div class="flex-1 p-1.5 flex flex-col gap-1.5">
            <div class="flex gap-1 items-center">
              <div class="h-1 w-10 bg-zinc-500 rounded-full" />
              <div class="ml-auto h-2 w-10 bg-zinc-800 border border-zinc-700 rounded-md" />
            </div>
            <div class="grid grid-cols-3 gap-1 flex-1">
              <div v-for="i in 6" :key="i" class="bg-zinc-900 border border-zinc-800/60 rounded-lg overflow-hidden flex flex-col">
                <div class="flex-1 bg-gradient-to-br" :class="[['from-zinc-700 to-zinc-900','from-blue-900/40 to-zinc-900','from-emerald-900/30 to-zinc-900','from-zinc-700 to-zinc-800','from-amber-900/30 to-zinc-900','from-purple-900/30 to-zinc-900'][i-1]]" />
                <div class="p-1">
                  <div class="h-0.5 w-full bg-zinc-600 rounded-full mb-0.5" />
                  <div class="flex justify-between items-center">
                    <div class="h-1 w-5 bg-zinc-400 rounded-full" />
                    <div class="h-1 w-3 bg-accent/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Product Page -->
  <template v-else-if="id === 'ecommerce-product'">
    <div class="absolute inset-0 bg-[#080808] flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="h-3.5 border-b border-zinc-800/60 flex items-center px-3 gap-1">
        <div class="h-0.5 w-4 bg-zinc-700 rounded-full" />
        <div class="h-0.5 w-1 bg-zinc-700 rounded-full" />
        <div class="h-0.5 w-4 bg-zinc-700 rounded-full" />
        <div class="h-0.5 w-1 bg-zinc-700 rounded-full" />
        <div class="h-0.5 w-8 bg-zinc-500 rounded-full" />
      </div>
      <div class="flex-1 flex gap-2 p-2">
        <div class="flex-1 flex flex-col gap-1">
          <div class="flex-1 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl border border-zinc-800/60" />
          <div class="flex gap-1">
            <div v-for="i in 4" :key="i" class="h-5 flex-1 bg-gradient-to-br rounded-md border border-zinc-800" :class="[['from-zinc-700 to-zinc-900','from-zinc-600 to-zinc-800','from-zinc-700 to-zinc-950','from-emerald-900/30 to-zinc-900'][i-1], i === 1 ? 'ring-1 ring-accent' : '']" />
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-1.5 py-0.5">
          <div class="h-1 w-8 bg-zinc-800 border border-zinc-700 rounded-md px-1" />
          <div class="h-2 w-full bg-zinc-200 rounded-full" />
          <div class="h-1 w-10 bg-zinc-600 rounded-full" />
          <div class="flex gap-1 mt-0.5">
            <div v-for="c in ['bg-zinc-400','bg-zinc-600','bg-blue-400']" :key="c" class="w-2.5 h-2.5 rounded-full border border-zinc-700" :class="c" />
          </div>
          <div class="flex items-center gap-1 mt-0.5">
            <div class="w-5 h-5 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center">
              <div class="w-1.5 h-0.5 bg-zinc-500 rounded-full" />
            </div>
            <div class="h-2 w-5 bg-zinc-800 border border-zinc-700 rounded text-[4px] text-zinc-400 flex items-center justify-center">1</div>
            <div class="w-5 h-5 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center">
              <div class="w-1.5 h-0.5 bg-accent rounded-full" />
            </div>
          </div>
          <div class="mt-auto flex flex-col gap-1">
            <div class="h-4 w-full bg-accent rounded-lg" />
            <div class="h-3 w-full border border-zinc-700 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Checkout -->
  <template v-else-if="id === 'ecommerce-checkout'">
    <div class="absolute inset-0 bg-[#080808] flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="h-5 border-b border-zinc-800/60 flex items-center justify-center gap-2 px-3 shrink-0">
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-full bg-accent flex items-center justify-center"><div class="w-1 h-1 bg-white rounded-full" /></div>
          <div class="h-0.5 w-5 bg-accent/50 rounded-full" />
          <div class="w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
          <div class="h-0.5 w-5 bg-zinc-800 rounded-full" />
          <div class="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
        </div>
      </div>
      <div class="flex-1 flex gap-2 p-2">
        <div class="flex-[1.4] flex flex-col gap-1.5">
          <div class="h-1.5 w-14 bg-zinc-300 rounded-full" />
          <div class="space-y-1">
            <div v-for="i in 3" :key="i" class="h-4 bg-zinc-900 border border-zinc-700 rounded-lg" />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <div class="h-4 bg-zinc-900 border border-zinc-700 rounded-lg" />
            <div class="h-4 bg-zinc-900 border border-zinc-700 rounded-lg" />
          </div>
          <div class="mt-auto h-4 bg-accent rounded-lg" />
        </div>
        <div class="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-1.5 flex flex-col gap-1">
          <div class="h-1 w-10 bg-zinc-400 rounded-full" />
          <div v-for="i in 2" :key="i" class="flex gap-1 items-center">
            <div class="w-4 h-4 rounded-md bg-gradient-to-br flex-shrink-0" :class="i === 1 ? 'from-zinc-700 to-zinc-900' : 'from-blue-900/40 to-zinc-900'" />
            <div class="flex-1 space-y-0.5">
              <div class="h-0.5 w-full bg-zinc-600 rounded-full" />
              <div class="h-0.5 w-8 bg-zinc-700 rounded-full" />
            </div>
            <div class="h-1 w-4 bg-zinc-400 rounded-full shrink-0" />
          </div>
          <div class="border-t border-zinc-800 pt-1 mt-auto space-y-0.5">
            <div v-for="i in 2" :key="i" class="flex justify-between">
              <div class="h-0.5 w-6 bg-zinc-700 rounded-full" />
              <div class="h-0.5 w-4 bg-zinc-600 rounded-full" />
            </div>
            <div class="flex justify-between mt-0.5">
              <div class="h-1 w-6 bg-zinc-300 rounded-full" />
              <div class="h-1 w-5 bg-zinc-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Agency Landing -->
  <template v-else-if="id === 'marketing-agency'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-3">
          <div class="w-2 h-2 bg-white rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /></div>
        </div>
        <div class="flex-1 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-pink-500/10" />
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4">
            <div class="h-1 w-8 bg-emerald-400/60 rounded-full" />
            <div class="h-3 w-32 bg-zinc-100 rounded-full" />
            <div class="h-1.5 w-24 bg-zinc-500 rounded-full" />
            <div class="flex gap-1.5 mt-1"><div class="h-4 w-12 bg-emerald-500 rounded-md" /><div class="h-4 w-12 border border-zinc-700 rounded-md" /></div>
          </div>
        </div>
        <div class="h-8 border-t border-zinc-800/60 flex items-center justify-center gap-2">
          <div v-for="i in 4" :key="i" class="h-4 flex-1 mx-1 bg-zinc-900 border border-zinc-800 rounded-md" />
        </div>
      </div>
    </div>
  </template>

  <!-- Startup Landing -->
  <template v-else-if="id === 'marketing-startup'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-4 gap-2">
          <div class="h-2 w-2 bg-white rounded-sm" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-4 bg-zinc-700 rounded-full" /><div class="h-1 w-4 bg-zinc-700 rounded-full" /></div>
          <div class="h-3 w-7 bg-accent rounded-md" />
        </div>
        <div class="flex flex-1">
          <div class="flex-1 flex flex-col justify-center gap-1.5 px-3">
            <div class="h-3 w-20 bg-zinc-100 rounded-full" />
            <div class="h-3 w-16 bg-zinc-300 rounded-full" />
            <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
            <div class="h-4 w-14 bg-accent rounded-md mt-1" />
          </div>
          <div class="flex-1 p-2">
            <div class="w-full h-full bg-zinc-800/40 rounded-xl border border-zinc-700/40 p-1.5 flex flex-col gap-1">
              <div class="h-full bg-zinc-800/60 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Blog Home -->
  <template v-else-if="id === 'blog-home'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-200 flex items-center px-3 gap-2">
          <div class="w-2 h-2 bg-zinc-800 rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-300 rounded-full" /><div class="h-1 w-5 bg-zinc-300 rounded-full" /></div>
        </div>
        <div class="flex-1 p-2 flex flex-col gap-1.5">
          <div class="h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
            <div class="h-2 w-20 bg-zinc-700 rounded-full" />
          </div>
          <div class="grid grid-cols-2 gap-1.5 flex-1">
            <div class="col-span-2 bg-zinc-100 rounded-lg overflow-hidden flex gap-2 p-1.5">
              <div class="w-16 bg-zinc-200 rounded-md" />
              <div class="flex-1 flex flex-col justify-center gap-0.5">
                <div class="h-1 w-8 bg-zinc-400 rounded-full" />
                <div class="h-1.5 w-full bg-zinc-700 rounded-full" />
                <div class="h-1 w-3/4 bg-zinc-400 rounded-full" />
              </div>
            </div>
            <div v-for="i in 2" :key="i" class="bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden">
              <div class="h-8 bg-zinc-200" />
              <div class="p-1.5 space-y-0.5">
                <div class="h-1 w-6 bg-zinc-400 rounded-full" />
                <div class="h-1.5 w-full bg-zinc-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Blog Post -->
  <template v-else-if="id === 'blog-post'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="flex-1 px-4 py-2 flex flex-col gap-1.5 max-w-[60%] mx-auto">
          <div class="h-1 w-8 bg-zinc-400 rounded-full" />
          <div class="h-2 w-full bg-zinc-700 rounded-full" />
          <div class="h-2 w-4/5 bg-zinc-700 rounded-full" />
          <div class="flex items-center gap-1.5 py-0.5">
            <div class="w-3 h-3 bg-zinc-300 rounded-full" />
            <div class="h-1 w-12 bg-zinc-400 rounded-full" />
            <div class="h-1 w-8 bg-zinc-300 rounded-full" />
          </div>
          <div class="h-10 bg-zinc-200 rounded-lg" />
          <div class="space-y-0.5">
            <div v-for="i in 4" :key="i" class="h-1 rounded-full" :class="i % 3 === 0 ? 'w-3/4 bg-zinc-300' : 'w-full bg-zinc-300'" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Portfolio -->
  <template v-else-if="id === 'portfolio'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-2">
          <div class="h-1 w-6 bg-zinc-400 rounded-full" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-4 bg-zinc-700 rounded-full" /><div class="h-1 w-4 bg-zinc-700 rounded-full" /><div class="h-1 w-4 bg-zinc-700 rounded-full" /></div>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center gap-1.5 px-4 relative">
          <div class="w-6 h-6 rounded-full bg-zinc-700 mb-0.5" />
          <div class="h-2.5 w-20 bg-zinc-200 rounded-full" />
          <div class="h-1.5 w-28 bg-zinc-600 rounded-full" />
          <div class="flex gap-1.5 mt-1">
            <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-1 p-2">
          <div v-for="i in 3" :key="i" class="h-8 bg-zinc-900 border border-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  </template>

</template>
