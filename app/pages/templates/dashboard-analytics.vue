<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const kpis = [
  { label: 'Total Revenue', value: '$71,420', change: '+18.2%', up: true,  sparkline: '0,22 13,18 27,24 40,14 53,10 67,12 80,5' },
  { label: 'Active Users',  value: '12,847',  change: '+9.4%',  up: true,  sparkline: '0,24 13,20 27,22 40,16 53,12 67,10 80,6' },
  { label: 'Conv. Rate',    value: '4.2%',    change: '−0.8%',  up: false, sparkline: '0,7 13,9 27,8 40,12 53,14 67,18 80,22' },
  { label: 'Avg. Session',  value: '3m 42s',  change: '+12.1%', up: true,  sparkline: '0,20 13,16 27,18 40,12 53,9 67,8 80,4' },
]

const trafficSources = [
  { label: 'Organic Search', pct: 45, color: '#42b883' },
  { label: 'Direct',         pct: 28, color: '#34d399' },
  { label: 'Social Media',   pct: 18, color: '#059669' },
  { label: 'Email',          pct: 9,  color: '#047857' },
]

const recentTx = [
  { name: 'Gabriel Delattre', initials: 'GD', color: 'from-emerald-500 to-teal-600',   amount: '+$240', status: 'success', time: 'Today, 2:14 pm' },
  { name: 'Vander Otis',      initials: 'VO', color: 'from-blue-500 to-emerald-600',   amount: '+$89',  status: 'success', time: 'Today, 11:30 am' },
  { name: 'Kevin Maginot',    initials: 'KM', color: 'from-amber-500 to-orange-600',   amount: '+$450', status: 'pending', time: 'Yesterday, 4:45 pm' },
  { name: 'Eric Ampire',      initials: 'EA', color: 'from-rose-500 to-pink-600',      amount: '+$180', status: 'success', time: 'Yesterday, 9:12 am' },
  { name: 'Antfu',            initials: 'AF', color: 'from-zinc-500 to-zinc-600',      amount: '−$32',  status: 'failed',  time: 'Jun 12, 2:01 pm' },
]

// Donut — r=38, C=238.76
const C = 238.76
const donutSegments = computed(() => {
  let offset = 0
  return trafficSources.map(s => {
    const dash = (s.pct / 100) * C
    const seg = { ...s, dasharray: `${dash.toFixed(2)} ${(C - dash).toFixed(2)}`, dashoffset: `${(-offset).toFixed(2)}` }
    offset += dash
    return seg
  })
})

const activeNav   = ref('overview')
const sidebarOpen = ref(false)

onMounted(() => {
  gsap.from('.kpi-card',    { y: 16, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 })
  gsap.from('.chart-panel', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1,  ease: 'power3.out', delay: 0.3 })
  gsap.from('.tx-row',      { x: -10, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.5 })
  gsap.from('.bar-fill',    { scaleY: 0, transformOrigin: '50% 100%', duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.4 })
})

onUnmounted(() => {
  gsap.killTweensOf('.kpi-card, .chart-panel, .tx-row, .bar-fill')
})
</script>

<template>
  <div class="flex h-screen bg-zinc-950 text-white overflow-hidden" style="font-family: Inter, system-ui, sans-serif">

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-20 bg-black/60 lg:hidden" @click="sidebarOpen = false" />

    <!-- ─── Sidebar ─────────────────────────────────────────────────────── -->
    <aside :class="['fixed lg:static inset-y-0 left-0 z-30 w-60 flex flex-col border-r border-zinc-800/60 bg-zinc-900/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 flex-shrink-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full']">

      <!-- Logo -->
      <div class="flex items-center gap-2.5 px-5 h-14 border-b border-zinc-800/60 shrink-0">
        <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span class="font-semibold text-sm text-white">Elvin Dashboard</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        <p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-2 mt-1">Main</p>

        <button v-for="item in [
          { id: 'overview',   label: 'Overview',   path: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
          { id: 'analytics',  label: 'Analytics',  path: 'M18 20V10M12 20V4M6 20v-6' },
          { id: 'users',      label: 'Users',      path: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75' },
          { id: 'reports',    label: 'Reports',    path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
        ]" :key="item.id"
          @click="activeNav = item.id"
          :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left',
            activeNav === item.id
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent']"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.path" />
          </svg>
          {{ item.label }}
        </button>

        <p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-2 mt-4">Account</p>

        <button
          @click="activeNav = 'settings'"
          :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left',
            activeNav === 'settings'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent']"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Settings
        </button>
      </nav>

      <!-- User -->
      <div class="p-4 border-t border-zinc-800/60 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shrink-0">EC</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">Elvin Code</p>
            <p class="text-xs text-zinc-500 truncate">elvin@elvinui.dev</p>
          </div>
          <svg class="w-4 h-4 text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </div>
      </div>
    </aside>

    <!-- ─── Main ─────────────────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

      <!-- Topbar -->
      <header class="h-14 flex items-center gap-4 px-5 border-b border-zinc-800/60 shrink-0 bg-zinc-950/80 backdrop-blur-sm">
        <button class="lg:hidden text-zinc-400 hover:text-white" @click="sidebarOpen = true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <div>
          <h1 class="text-sm font-semibold text-white">Overview</h1>
          <p class="text-xs text-zinc-500 hidden sm:block">Welcome back, Elvin 👋</p>
        </div>

        <div class="flex-1 max-w-xs hidden md:block">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
            <input type="text" placeholder="Search..." class="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
          </div>
        </div>

        <div class="flex items-center gap-2 ml-auto">
          <span class="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Jun 1 – Jun 30
          </span>
          <button class="relative w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round"/></svg>
            <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </button>
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer">EC</div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-5 lg:p-6">
        <div class="max-w-7xl mx-auto flex flex-col gap-5">

          <!-- KPI Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(k, i) in kpis" :key="i" class="kpi-card p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors cursor-default">
              <div class="flex items-start justify-between mb-3">
                <p class="text-xs text-zinc-500 font-medium leading-tight">{{ k.label }}</p>
                <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1', k.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10']">{{ k.change }}</span>
              </div>
              <p class="text-xl font-bold text-white mb-3 leading-none">{{ k.value }}</p>
              <svg viewBox="0 0 80 28" class="w-full h-7" preserveAspectRatio="none">
                <polyline :points="k.sparkline" fill="none" :stroke="k.up ? '#42b883' : '#ef4444'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <!-- Area chart + Donut -->
          <div class="grid grid-cols-1 xl:grid-cols-[1fr_268px] gap-4">

            <!-- Area chart -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <div class="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div>
                  <p class="text-sm font-semibold text-white">Revenue</p>
                  <p class="text-xs text-zinc-500">Jan – Dec 2024</p>
                </div>
                <div class="flex gap-1">
                  <button class="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Monthly</button>
                  <button class="text-xs px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">Quarterly</button>
                </div>
              </div>
              <div class="flex gap-3">
                <!-- Y axis -->
                <div class="flex flex-col justify-between text-[10px] text-zinc-600 shrink-0 pb-5" style="width:28px">
                  <span>$70k</span><span>$50k</span><span>$30k</span>
                </div>
                <div class="flex-1 min-w-0">
                  <svg viewBox="0 0 480 100" class="w-full" style="height:130px" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#42b883" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#42b883" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="33" x2="480" y2="33" stroke="#27272a" stroke-width="1"/>
                    <line x1="0" y1="66" x2="480" y2="66" stroke="#27272a" stroke-width="1"/>
                    <path d="M0,88 L44,81 L87,90 L131,76 L175,63 L218,70 L262,57 L306,46 L349,52 L393,37 L436,26 L480,10 L480,100 L0,100 Z" fill="url(#rev-grad)"/>
                    <polyline points="0,88 44,81 87,90 131,76 175,63 218,70 262,57 306,46 349,52 393,37 436,26 480,10" fill="none" stroke="#42b883" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="480" cy="10" r="3.5" fill="#42b883"/>
                    <circle cx="480" cy="10" r="6" fill="#42b883" opacity="0.2"/>
                  </svg>
                  <div class="flex justify-between mt-1">
                    <span v-for="m in months" :key="m" class="text-[9px] text-zinc-600" style="flex:1;text-align:center">{{ m }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Donut -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <p class="text-sm font-semibold text-white mb-0.5">Traffic Sources</p>
              <p class="text-xs text-zinc-500 mb-4">June 2024</p>
              <div class="flex justify-center mb-4">
                <div class="relative w-28 h-28">
                  <svg viewBox="0 0 110 110" class="w-full h-full -rotate-90">
                    <circle cx="55" cy="55" r="38" fill="none" stroke="#27272a" stroke-width="11"/>
                    <circle v-for="s in donutSegments" :key="s.label"
                      cx="55" cy="55" r="38" fill="none"
                      :stroke="s.color" stroke-width="11"
                      :stroke-dasharray="s.dasharray"
                      :stroke-dashoffset="s.dashoffset"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <p class="text-base font-bold text-white">45%</p>
                    <p class="text-[10px] text-zinc-500">Organic</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2.5">
                <div v-for="s in trafficSources" :key="s.label" class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full shrink-0" :style="`background:${s.color}`"/>
                    <span class="text-xs text-zinc-400">{{ s.label }}</span>
                  </div>
                  <span class="text-xs font-semibold text-zinc-300">{{ s.pct }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bar chart + Transactions -->
          <div class="grid grid-cols-1 xl:grid-cols-[268px_1fr] gap-4">

            <!-- Bar chart -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <p class="text-sm font-semibold text-white mb-0.5">Weekly Sessions</p>
              <p class="text-xs text-zinc-500 mb-4">This week</p>
              <svg viewBox="0 0 280 80" class="w-full" style="height:100px" preserveAspectRatio="xMidYMid meet">
                <line x1="0" y1="40" x2="280" y2="40" stroke="#27272a" stroke-width="1"/>
                <line x1="0" y1="10" x2="280" y2="10" stroke="#27272a" stroke-width="1"/>
                <rect class="bar-fill" x="8"   y="46" width="24" height="34" rx="4" fill="#42b883" opacity="0.65"/>
                <rect class="bar-fill" x="48"  y="28" width="24" height="52" rx="4" fill="#42b883" opacity="0.75"/>
                <rect class="bar-fill" x="88"  y="41" width="24" height="39" rx="4" fill="#42b883" opacity="0.65"/>
                <rect class="bar-fill" x="128" y="15" width="24" height="65" rx="4" fill="#42b883" opacity="0.85"/>
                <rect class="bar-fill" x="168" y="0"  width="24" height="80" rx="4" fill="#42b883"/>
                <rect class="bar-fill" x="208" y="26" width="24" height="54" rx="4" fill="#42b883" opacity="0.75"/>
                <rect class="bar-fill" x="248" y="49" width="24" height="31" rx="4" fill="#42b883" opacity="0.55"/>
              </svg>
              <div class="flex justify-between mt-2 px-1">
                <span v-for="d in days" :key="d" class="text-[10px] text-zinc-600 flex-1 text-center">{{ d }}</span>
              </div>
              <div class="mt-4 pt-4 border-t border-zinc-800/60 grid grid-cols-2 gap-4">
                <div>
                  <p class="text-lg font-bold text-white leading-none">12.8k</p>
                  <p class="text-[10px] text-zinc-500 mt-0.5">Total sessions</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-emerald-400 leading-none">Friday</p>
                  <p class="text-[10px] text-zinc-500 mt-0.5">Peak day</p>
                </div>
              </div>
            </div>

            <!-- Transactions -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm font-semibold text-white">Recent Transactions</p>
                  <p class="text-xs text-zinc-500">5 latest payments</p>
                </div>
                <button class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">View all →</button>
              </div>
              <div class="flex flex-col divide-y divide-zinc-800/50">
                <div v-for="(tx, i) in recentTx" :key="i" class="tx-row flex items-center gap-3 py-3 hover:bg-zinc-800/20 -mx-2 px-2 rounded-xl transition-colors cursor-default">
                  <div :class="['w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0', tx.color]">{{ tx.initials }}</div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white truncate">{{ tx.name }}</p>
                    <p class="text-xs text-zinc-500 truncate">{{ tx.time }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p :class="['text-sm font-semibold', tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400']">{{ tx.amount }}</p>
                    <span :class="['text-[10px] font-medium px-1.5 py-0.5 rounded-md',
                      tx.status === 'success' ? 'text-emerald-400 bg-emerald-500/10' :
                      tx.status === 'pending' ? 'text-amber-400 bg-amber-500/10' :
                      'text-red-400 bg-red-500/10']">{{ tx.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>
