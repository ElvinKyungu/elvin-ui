<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

const periods = ['7d', '30d', '90d', '1y']
const activePeriod = ref('30d')

const mrr = { value: '$24,890', change: '+12.4%', sub: 'Monthly Recurring Revenue' }

const metrics = [
  { label: 'New MRR',         value: '$3,240', change: '+8.2%',  up: true,  sparkline: '0,22 16,18 32,16 48,12 64,8 80,5' },
  { label: 'Churned MRR',     value: '$480',   change: '-2.1%',  up: false, sparkline: '0,6 16,8 32,7 48,10 64,12 80,15' },
  { label: 'Active Customers',value: '842',    change: '+14.3%', up: true,  sparkline: '0,24 16,20 32,18 48,13 64,9 80,4' },
  { label: 'NPS Score',       value: '67',     change: '+3 pts', up: true,  sparkline: '0,18 16,15 32,14 48,10 64,8 80,5' },
]

// Free vs Paid growth — viewBox="0 0 400 120"
const growthMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const features = [
  { label: 'Dashboard',   pct: 78 },
  { label: 'API Access',  pct: 65 },
  { label: 'Reports',     pct: 52 },
  { label: 'Webhooks',    pct: 41 },
  { label: 'Exports',     pct: 38 },
]

const recentUsers = [
  { name: 'Gabriel Delattre', plan: 'Pro',     joined: '2 min ago',    initials: 'GD', color: 'from-emerald-500 to-teal-500' },
  { name: 'Vander Otis',      plan: 'Starter', joined: '18 min ago',   initials: 'VO', color: 'from-blue-500 to-blue-600' },
  { name: 'Kevin Maginot',    plan: 'Pro',     joined: '1 hr ago',     initials: 'KM', color: 'from-amber-500 to-amber-600' },
  { name: 'Eric Ampire',      plan: 'Free',    joined: '3 hrs ago',    initials: 'EA', color: 'from-rose-500 to-rose-600' },
  { name: 'Antfu',            plan: 'Pro',     joined: 'Yesterday',    initials: 'AF', color: 'from-zinc-400 to-zinc-600' },
]

// Heatmap 7 rows (Mon–Sun) × 12 cols (12 weeks), values 0–4
const heatmap = [
  [1,2,0,1,3,2,1,3,4,2,3,4],
  [2,3,1,0,2,4,3,2,3,4,3,2],
  [0,1,2,3,2,1,3,4,3,2,4,3],
  [1,2,3,4,3,2,1,2,4,3,2,3],
  [3,4,3,2,3,4,2,3,4,4,3,4],
  [1,0,1,1,0,1,2,0,1,2,1,0],
  [0,0,1,0,1,0,1,0,0,1,2,1],
]
const heatmapDays = ['M','T','W','T','F','S','S']
const heatColor = (v: number) => [
  'bg-zinc-800/30',
  'bg-emerald-900/70',
  'bg-emerald-700/70',
  'bg-emerald-500/80',
  'bg-emerald-400',
][v]

const activeNav = ref('metrics')
const mobileMenuOpen = ref(false)

onMounted(() => {
  gsap.from('.metric-card', { y: 14, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.15 })
  gsap.from('.panel',       { y: 18, opacity: 0, duration: 0.6, stagger: 0.1,  ease: 'power3.out', delay: 0.3 })
  gsap.from('.feat-bar',    { scaleX: 0, transformOrigin: '0% 50%', duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.5 })
  gsap.from('.user-row',    { x: -10, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.55 })
  gsap.from('.mrr-hero',    { y: -10, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.05 })
})

onUnmounted(() => {
  gsap.killTweensOf('.metric-card, .panel, .feat-bar, .user-row, .mrr-hero')
})
</script>

<template>
  <div class="min-h-screen bg-[#080808] text-white" style="font-family: Inter, system-ui, sans-serif">

    <!-- ─── Top nav ──────────────────────────────────────────────────────── -->
    <nav class="h-14 flex items-center px-5 lg:px-8 border-b border-zinc-800/60 bg-[#080808]/90 backdrop-blur-sm sticky top-0 z-10">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 mr-8">
        <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span class="font-bold text-white text-sm hidden sm:block">Elvin SaaS</span>
      </div>

      <!-- Desktop nav links -->
      <div class="hidden md:flex items-center gap-0.5">
        <button v-for="item in ['Metrics', 'Customers', 'Revenue', 'Integrations']" :key="item"
          @click="activeNav = item.toLowerCase()"
          :class="['px-3.5 py-1.5 rounded-lg text-sm transition-colors', activeNav === item.toLowerCase() ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-zinc-200']">
          {{ item }}
        </button>
      </div>

      <div class="flex items-center gap-2 ml-auto">
        <!-- Period selector -->
        <div class="hidden sm:flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
          <button v-for="p in periods" :key="p"
            @click="activePeriod = p"
            :class="['px-2.5 py-1 rounded-md text-xs font-medium transition-colors', activePeriod === p ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300']">
            {{ p }}
          </button>
        </div>

        <button class="relative w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round"/></svg>
          <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </button>

        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer">EC</div>
      </div>
    </nav>

    <!-- ─── MRR Hero ─────────────────────────────────────────────────────── -->
    <div class="mrr-hero border-b border-zinc-800/60 bg-zinc-900/20">
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div>
          <p class="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">{{ mrr.sub }}</p>
          <div class="flex items-end gap-3">
            <p class="text-4xl font-black text-white tracking-tight">{{ mrr.value }}</p>
            <span class="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg mb-1">{{ mrr.change }}</span>
          </div>
          <p class="text-xs text-zinc-500 mt-1.5">vs $22,154 last month</p>
        </div>

        <div class="sm:col-span-2">
          <svg viewBox="0 0 480 60" class="w-full" style="height:70px" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mrr-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#42b883" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#42b883" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,52 L80,48 L160,44 L240,36 L320,24 L400,15 L480,5 L480,60 L0,60 Z" fill="url(#mrr-grad)"/>
            <polyline points="0,52 80,48 160,44 240,36 320,24 400,15 480,5" fill="none" stroke="#42b883" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="480" cy="5" r="4" fill="#42b883"/>
            <circle cx="480" cy="5" r="8" fill="#42b883" opacity="0.15"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- ─── Main content ─────────────────────────────────────────────────── -->
    <main class="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col gap-5">

      <!-- Metric cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(m, i) in metrics" :key="i" class="metric-card p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors cursor-default">
          <p class="text-xs text-zinc-500 font-medium mb-2 leading-tight">{{ m.label }}</p>
          <div class="flex items-end justify-between mb-2">
            <p class="text-xl font-bold text-white leading-none">{{ m.value }}</p>
            <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded-md', m.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10']">{{ m.change }}</span>
          </div>
          <svg viewBox="0 0 80 26" class="w-full h-6" preserveAspectRatio="none">
            <polyline :points="m.sparkline" fill="none" :stroke="m.up ? '#42b883' : '#ef4444'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Growth chart + Feature adoption -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <!-- Multi-line growth chart -->
        <div class="panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <div class="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <p class="text-sm font-semibold text-white">User Growth</p>
              <p class="text-xs text-zinc-500">Free vs Paid — last 6 months</p>
            </div>
            <div class="flex items-center gap-3 text-xs">
              <span class="flex items-center gap-1.5 text-zinc-400"><span class="w-4 h-0.5 bg-emerald-400 inline-block rounded-full"/>Free</span>
              <span class="flex items-center gap-1.5 text-zinc-400"><span class="w-4 h-0.5 bg-emerald-600 inline-block rounded-full"/>Paid</span>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex flex-col justify-between text-[10px] text-zinc-600 shrink-0 pb-5" style="width:30px">
              <span>1k</span><span>500</span><span>0</span>
            </div>
            <div class="flex-1 min-w-0">
              <svg viewBox="0 0 400 120" class="w-full" style="height:130px" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="free-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#42b883" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="#42b883" stop-opacity="0"/>
                  </linearGradient>
                  <linearGradient id="paid-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#059669" stop-opacity="0.15"/>
                    <stop offset="100%" stop-color="#059669" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="40" x2="400" y2="40" stroke="#27272a" stroke-width="1"/>
                <line x1="0" y1="80" x2="400" y2="80" stroke="#27272a" stroke-width="1"/>
                <!-- Free area -->
                <path d="M0,77 L80,60 L160,64 L240,41 L320,24 L400,10 L400,120 L0,120 Z" fill="url(#free-grad)"/>
                <!-- Paid area -->
                <path d="M0,99 L80,93 L160,90 L240,82 L320,74 L400,66 L400,120 L0,120 Z" fill="url(#paid-grad)"/>
                <!-- Free line -->
                <polyline points="0,77 80,60 160,64 240,41 320,24 400,10" fill="none" stroke="#42b883" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Paid line -->
                <polyline points="0,99 80,93 160,90 240,82 320,74 400,66" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 3"/>
                <!-- End dots -->
                <circle cx="400" cy="10" r="3" fill="#42b883"/>
                <circle cx="400" cy="66" r="3" fill="#059669"/>
              </svg>
              <div class="flex justify-between mt-1">
                <span v-for="m in growthMonths" :key="m" class="text-[10px] text-zinc-600 flex-1 text-center">{{ m }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature adoption -->
        <div class="panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <p class="text-sm font-semibold text-white mb-0.5">Feature Adoption</p>
          <p class="text-xs text-zinc-500 mb-5">% of active customers using each feature</p>
          <div class="flex flex-col gap-4">
            <div v-for="(f, i) in features" :key="i" class="flex flex-col gap-1.5">
              <div class="flex justify-between items-center">
                <span class="text-xs text-zinc-300 font-medium">{{ f.label }}</span>
                <span class="text-xs font-bold text-emerald-400">{{ f.pct }}%</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div class="feat-bar h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" :style="`width:${f.pct}%`"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Heatmap + Recent signups -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <!-- Activity heatmap -->
        <div class="panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <p class="text-sm font-semibold text-white mb-0.5">Activity Heatmap</p>
          <p class="text-xs text-zinc-500 mb-4">Logins per day — last 12 weeks</p>
          <div class="flex gap-2">
            <!-- Day labels -->
            <div class="flex flex-col gap-1 shrink-0 justify-around">
              <span v-for="d in heatmapDays" :key="d" class="text-[10px] text-zinc-600 w-3 text-right leading-none" style="height:14px;line-height:14px">{{ d }}</span>
            </div>
            <!-- Grid -->
            <div class="flex-1 grid gap-1" style="grid-template-columns: repeat(12, 1fr)">
              <template v-for="(row, ri) in heatmap" :key="ri">
                <div v-for="(val, ci) in row" :key="ci"
                  :class="['rounded-sm h-3.5 transition-colors cursor-default', heatColor(val)]"
                  :title="`Week ${ci+1}, ${heatmapDays[ri]}: ${val * 12} logins`"
                />
              </template>
            </div>
          </div>
          <!-- Legend -->
          <div class="flex items-center gap-1.5 mt-3 justify-end">
            <span class="text-[10px] text-zinc-600">Less</span>
            <div v-for="v in [0,1,2,3,4]" :key="v" :class="['w-3 h-3 rounded-sm', heatColor(v)]"/>
            <span class="text-[10px] text-zinc-600">More</span>
          </div>
        </div>

        <!-- Recent signups -->
        <div class="panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-semibold text-white">Recent Signups</p>
              <p class="text-xs text-zinc-500">Latest 5 accounts</p>
            </div>
            <button class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">View all →</button>
          </div>
          <div class="flex flex-col divide-y divide-zinc-800/40">
            <div v-for="(u, i) in recentUsers" :key="i" class="user-row flex items-center gap-3 py-3 hover:bg-zinc-800/20 -mx-2 px-2 rounded-xl transition-colors cursor-default">
              <div :class="['w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0', u.color]">{{ u.initials }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">{{ u.name }}</p>
                <p class="text-xs text-zinc-500">{{ u.joined }}</p>
              </div>
              <span :class="['text-[10px] font-bold px-2 py-1 rounded-lg border shrink-0',
                u.plan === 'Pro'     ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                u.plan === 'Starter' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                'text-zinc-400 bg-zinc-800 border-zinc-700']">{{ u.plan }}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
