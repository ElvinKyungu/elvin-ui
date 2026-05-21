<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Data ─────────────────────────────────────────────────────────────────────
const revenueByPeriod = {
  monthly:   { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], values: [28000,32000,27000,35000,42000,38000,45000,51000,48000,56000,62000,71000] },
  quarterly: { labels: ['Q1','Q2','Q3','Q4'], values: [87000,115000,144000,189000] },
}
const sessionsByPeriod = {
  monthly:   { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], values: [4200,5100,3800,6200,7400,5900,8100,9200,7800,10200,11400,12800] },
  quarterly: { labels: ['Q1','Q2','Q3','Q4'], values: [13100,19500,25100,34400] },
}
const barData = [
  { day:'Mon', value:1240, h:43 }, { day:'Tue', value:1890, h:65 },
  { day:'Wed', value:1420, h:49 }, { day:'Thu', value:2340, h:81 },
  { day:'Fri', value:2890, h:100 }, { day:'Sat', value:1960, h:68 },
  { day:'Sun', value:1120, h:39 },
]
const trafficSources = [
  { label:'Organic Search', pct:45, color:'#42b883' },
  { label:'Direct',         pct:28, color:'#34d399' },
  { label:'Social Media',   pct:18, color:'#059669' },
  { label:'Email',          pct:9,  color:'#047857' },
]
const recentTx = [
  { name:'Gabriel Delattre', initials:'GD', grad:'from-emerald-500 to-teal-600',  amount:'+$240', status:'success', time:'Today, 2:14 pm' },
  { name:'Vander Otis',      initials:'VO', grad:'from-blue-500 to-cyan-600',     amount:'+$89',  status:'success', time:'Today, 11:30 am' },
  { name:'Kevin Maginot',    initials:'KM', grad:'from-amber-500 to-orange-600',  amount:'+$450', status:'pending', time:'Yesterday, 4:45 pm' },
  { name:'Eric Ampire',      initials:'EA', grad:'from-rose-500 to-pink-600',     amount:'+$180', status:'success', time:'Yesterday, 9:12 am' },
  { name:'Antfu',            initials:'AF', grad:'from-zinc-500 to-zinc-600',     amount:'−$32',  status:'failed',  time:'Jun 12, 2:01 pm' },
]

// ─── State ────────────────────────────────────────────────────────────────────
const chartMetric = ref<'revenue'|'sessions'>('revenue')
const chartPeriod = ref<'monthly'|'quarterly'>('monthly')
const activeNav   = ref('overview')
const sidebarOpen = ref(false)
const hoveredBar  = ref<number|null>(null)
const hoveredDonut = ref<number|null>(null)

// ─── Counters (GSAP animates these) ──────────────────────────────────────────
const counter = reactive({ revenue: 0, users: 0, rate: 0 })
const kpis = computed(() => [
  { label:'Total Revenue', value:`$${Math.round(counter.revenue).toLocaleString()}`, change:'+18.2%', up:true,  spark:'0,22 13,18 27,24 40,14 53,10 67,12 80,5' },
  { label:'Active Users',  value:Math.round(counter.users).toLocaleString(),         change:'+9.4%',  up:true,  spark:'0,24 13,20 27,22 40,16 53,12 67,10 80,6' },
  { label:'Conv. Rate',    value:`${counter.rate.toFixed(1)}%`,                      change:'−0.8%',  up:false, spark:'0,7 13,9 27,8 40,12 53,14 67,18 80,22' },
  { label:'Avg. Session',  value:'3m 42s',                                           change:'+12.1%', up:true,  spark:'0,20 13,16 27,18 40,12 53,9 67,8 80,4' },
])

// ─── Chart computation ────────────────────────────────────────────────────────
const dataset = computed(() =>
  chartMetric.value === 'revenue' ? revenueByPeriod[chartPeriod.value] : sessionsByPeriod[chartPeriod.value]
)

function pts(values: number[], w=480, h=100, p=12): string {
  const mn = Math.min(...values), mx = Math.max(...values), rng = mx - mn || 1
  return values.map((v,i) => {
    const x = values.length < 2 ? w/2 : (i/(values.length-1))*w
    const y = h - p - ((v-mn)/rng)*(h-p*2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}
function area(values: number[], w=480, h=100, p=12): string {
  return `M${pts(values,w,h,p).split(' ').join(' L')} L${w},${h} L0,${h} Z`
}

const chartPts  = computed(() => pts(dataset.value.values))
const chartArea = computed(() => area(dataset.value.values))

// ─── Chart hover tooltip ──────────────────────────────────────────────────────
const chartWrap = useTemplateRef<HTMLElement>('chartWrap')
const hoverIdx  = ref<number|null>(null)

function onChartMove(e: MouseEvent) {
  if (!chartWrap.value) return
  const r   = chartWrap.value.getBoundingClientRect()
  const rx  = Math.max(0, Math.min(e.clientX - r.left, r.width))
  const n   = dataset.value.values.length
  hoverIdx.value = Math.round((rx / r.width) * (n - 1))
}

const hoverXPct = computed(() => {
  if (hoverIdx.value === null) return 0
  return (hoverIdx.value / (dataset.value.values.length - 1)) * 100
})
const hoverYPct = computed(() => {
  if (hoverIdx.value === null) return 0
  const vals = dataset.value.values
  const mn = Math.min(...vals), mx = Math.max(...vals), rng = mx - mn || 1
  const v  = vals[hoverIdx.value]
  return (12 + (1 - (v - mn) / rng) * 76)
})
function fmtChart(v: number): string {
  return chartMetric.value === 'revenue' ? `$${(v/1000).toFixed(0)}k` : `${(v/1000).toFixed(1)}k`
}

// ─── Donut ────────────────────────────────────────────────────────────────────
const C = 238.76
const donutSegs = computed(() => {
  let off = 0
  return trafficSources.map(s => {
    const dash = (s.pct/100)*C
    const seg  = { ...s, da:`${dash.toFixed(2)} ${(C-dash).toFixed(2)}`, do:`${(-off).toFixed(2)}` }
    off += dash
    return seg
  })
})

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { id:'overview',   label:'Overview',   icon:'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-7z' },
  { id:'analytics',  label:'Analytics',  icon:'M18 20V10M12 20V4M6 20v-6' },
  { id:'users',      label:'Users',      icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { id:'reports',    label:'Reports',    icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8M16 17H8M10 9H8' },
  { id:'settings',   label:'Settings',   icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
]

// ─── GSAP ──────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.to(counter, { revenue:71420, users:12847, rate:4.2, duration:1.6, ease:'power2.out', delay:0.2 })
  gsap.from('.kpi-card',    { y:16, opacity:0, duration:0.5, stagger:0.07, ease:'power3.out', delay:0.15 })
  gsap.from('.chart-panel', { y:20, opacity:0, duration:0.6, stagger:0.1,  ease:'power3.out', delay:0.35 })
  gsap.from('.tx-row',      { x:-10, opacity:0, duration:0.4, stagger:0.05, ease:'power2.out', delay:0.6 })
  gsap.from('.bar-el',      { scaleY:0, transformOrigin:'50% 100%', duration:0.7, stagger:0.06, ease:'power3.out', delay:0.45 })

  document.querySelectorAll<HTMLElement>('.kpi-card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y:-2, duration:0.2, ease:'power2.out' }))
    el.addEventListener('mouseleave', () => gsap.to(el, { y:0,  duration:0.2, ease:'power2.out' }))
  })
})

watch(dataset, () => {
  nextTick(() => gsap.from('.bar-el', { scaleY:0, transformOrigin:'50% 100%', duration:0.5, stagger:0.04, ease:'power3.out' }))
})

onUnmounted(() => {
  gsap.killTweensOf(['.kpi-card','.chart-panel','.tx-row','.bar-el', counter])
})
</script>

<template>
  <div class="flex h-screen bg-zinc-950 text-white overflow-hidden" style="font-family:Inter,system-ui,sans-serif">

    <!-- Overlay mobile -->
    <Transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="sidebarOpen" class="fixed inset-0 z-20 bg-black/70 lg:hidden" @click="sidebarOpen=false" />
    </Transition>

    <!-- ─── Sidebar ──────────────────────────────────────────────────────────── -->
    <aside :class="['fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-60 border-r border-zinc-800/60 bg-zinc-900/90 backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0 shrink-0', sidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/60' : '-translate-x-full']">

      <div class="flex items-center gap-2.5 h-14 px-5 border-b border-zinc-800/60 shrink-0">
        <UiLogo :size="24" color="white" />
        <span class="text-sm font-bold text-white tracking-tight">Elvin Dashboard</span>
      </div>

      <nav class="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-2">Main</p>
        <button v-for="item in navItems.slice(0,4)" :key="item.id"
          @click="activeNav=item.id; sidebarOpen=false"
          :class="['group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left border',
            activeNav===item.id
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border-transparent']"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon"/>
          </svg>
          {{ item.label }}
          <span v-if="item.id==='overview'" class="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </button>

        <p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-2 mt-5">Account</p>
        <button @click="activeNav='settings'; sidebarOpen=false"
          :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left border',
            activeNav==='settings' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border-transparent']"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path :d="navItems[4].icon"/></svg>
          Settings
        </button>
      </nav>

      <div class="p-4 border-t border-zinc-800/60 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-emerald-500/20">EC</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white truncate">Elvin Code</p>
            <p class="text-xs text-zinc-500 truncate">elvin@elvinui.dev</p>
          </div>
          <button class="w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- ─── Main ─────────────────────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

      <!-- Topbar -->
      <header class="h-14 flex items-center gap-3 px-4 sm:px-5 border-b border-zinc-800/60 shrink-0 bg-zinc-950/80 backdrop-blur-sm">
        <button class="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" @click="sidebarOpen=true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <div class="hidden sm:block">
          <h1 class="text-sm font-bold text-white">Overview</h1>
          <p class="text-xs text-zinc-500">Welcome back, Elvin 👋</p>
        </div>

        <div class="flex-1 hidden md:flex max-w-[240px]">
          <label class="relative w-full">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
            <input type="text" placeholder="Search..." class="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
          </label>
        </div>

        <div class="flex items-center gap-2 ml-auto">
          <button class="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-700 hover:text-zinc-300 transition-colors">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Jun 1 – Jun 30
          </button>
          <button class="relative w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors group">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round"/></svg>
            <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </button>
          <button class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-zinc-800 hover:ring-emerald-500/30 transition-all">EC</button>
        </div>
      </header>

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto scrollbar-thin">
        <div class="p-4 sm:p-5 lg:p-6 max-w-[1400px] mx-auto flex flex-col gap-5">

          <!-- KPI Cards -->
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            <div v-for="(k,i) in kpis" :key="i" class="kpi-card group relative p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700/60 cursor-default overflow-hidden transition-colors">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 transition-all duration-300 rounded-2xl" />
              <div class="relative">
                <div class="flex items-start justify-between mb-3">
                  <p class="text-xs text-zinc-500 font-medium leading-tight pr-1">{{ k.label }}</p>
                  <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0', k.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10']">{{ k.change }}</span>
                </div>
                <p class="text-xl font-bold text-white mb-3 leading-none tabular-nums">{{ k.value }}</p>
                <svg viewBox="0 0 80 28" class="w-full h-6" preserveAspectRatio="none">
                  <polyline :points="k.spark" fill="none" :stroke="k.up ? '#42b883' : '#ef4444'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Area chart + Donut -->
          <div class="grid grid-cols-1 xl:grid-cols-[1fr_276px] gap-4">

            <!-- Area chart -->
            <div class="chart-panel rounded-2xl bg-zinc-900/60 border border-zinc-800/60 overflow-hidden">
              <!-- Header -->
              <div class="flex items-center justify-between px-5 pt-5 pb-4 flex-wrap gap-3">
                <div>
                  <p class="text-sm font-bold text-white">{{ chartMetric === 'revenue' ? 'Revenue' : 'Sessions' }}</p>
                  <p class="text-xs text-zinc-500 mt-0.5">{{ chartPeriod === 'monthly' ? 'Jan – Dec 2024' : 'Q1 – Q4 2024' }}</p>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                  <!-- Metric toggle -->
                  <div class="flex bg-zinc-800/80 rounded-lg p-0.5 gap-0.5">
                    <button v-for="m in ['revenue','sessions']" :key="m"
                      @click="chartMetric = m as 'revenue'|'sessions'"
                      :class="['px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                        chartMetric===m ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300']">
                      {{ m.charAt(0).toUpperCase() + m.slice(1) }}
                    </button>
                  </div>
                  <!-- Period toggle -->
                  <div class="flex bg-zinc-800/80 rounded-lg p-0.5 gap-0.5">
                    <button v-for="p in ['monthly','quarterly']" :key="p"
                      @click="chartPeriod = p as 'monthly'|'quarterly'"
                      :class="['px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                        chartPeriod===p ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300']">
                      {{ p === 'monthly' ? 'Monthly' : 'Quarterly' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Chart -->
              <div class="px-5 pb-5">
                <div class="flex gap-2">
                  <div class="flex flex-col justify-between text-[10px] text-zinc-600 shrink-0 pb-5" style="width:30px">
                    <span>{{ chartMetric==='revenue' ? '$70k' : '13k' }}</span>
                    <span>{{ chartMetric==='revenue' ? '$40k' : '8k' }}</span>
                    <span>{{ chartMetric==='revenue' ? '$10k' : '3k' }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div ref="chartWrap" class="relative cursor-crosshair select-none"
                      @mousemove="onChartMove" @mouseleave="hoverIdx=null">
                      <svg viewBox="0 0 480 100" class="w-full" style="height:140px" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#42b883" stop-opacity="0.3"/>
                            <stop offset="100%" stop-color="#42b883" stop-opacity="0"/>
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="33" x2="480" y2="33" stroke="#27272a" stroke-width="0.8"/>
                        <line x1="0" y1="66" x2="480" y2="66" stroke="#27272a" stroke-width="0.8"/>
                        <path :d="chartArea" fill="url(#ag1)" class="transition-all duration-500"/>
                        <polyline :points="chartPts" fill="none" stroke="#42b883" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-all duration-500"/>

                        <!-- Hover indicator -->
                        <template v-if="hoverIdx !== null">
                          <line
                            :x1="(hoverIdx/(dataset.values.length-1))*480"
                            y1="0"
                            :x2="(hoverIdx/(dataset.values.length-1))*480"
                            y2="100"
                            stroke="#42b883" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"
                          />
                          <circle
                            :cx="(hoverIdx/(dataset.values.length-1))*480"
                            :cy="100-12-((dataset.values[hoverIdx]-Math.min(...dataset.values))/(Math.max(...dataset.values)-Math.min(...dataset.values)||1))*76"
                            r="4" fill="#42b883" stroke="#09090b" stroke-width="2"
                          />
                        </template>
                      </svg>

                      <!-- Tooltip -->
                      <Transition enter-active-class="transition-all duration-150" leave-active-class="transition-all duration-100" enter-from-class="opacity-0 scale-95" leave-to-class="opacity-0 scale-95">
                        <div v-if="hoverIdx !== null"
                          class="absolute pointer-events-none z-10 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 shadow-xl -translate-x-1/2 -translate-y-full"
                          :style="`left:${hoverXPct}%;top:${hoverYPct - 8}%;`"
                        >
                          <p class="text-sm font-bold text-white tabular-nums">{{ fmtChart(dataset.values[hoverIdx]) }}</p>
                          <p class="text-xs text-zinc-400">{{ dataset.labels[hoverIdx] }}</p>
                        </div>
                      </Transition>
                    </div>
                    <!-- X labels -->
                    <div class="flex justify-between mt-1.5">
                      <span v-for="l in dataset.labels" :key="l" class="text-[9px] text-zinc-600 flex-1 text-center">{{ l }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Donut chart -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <p class="text-sm font-bold text-white mb-0.5">Traffic Sources</p>
              <p class="text-xs text-zinc-500 mb-4">June 2024</p>
              <div class="flex justify-center mb-4">
                <div class="relative w-32 h-32">
                  <svg viewBox="0 0 110 110" class="w-full h-full -rotate-90">
                    <circle cx="55" cy="55" r="38" fill="none" stroke="#27272a" stroke-width="12"/>
                    <circle v-for="(s,i) in donutSegs" :key="i"
                      cx="55" cy="55" r="38" fill="none"
                      :stroke="s.color"
                      :stroke-width="hoveredDonut===i ? 16 : 12"
                      :stroke-dasharray="s.da"
                      :stroke-dashoffset="s.do"
                      class="transition-all duration-200 cursor-pointer"
                      @mouseenter="hoveredDonut=i"
                      @mouseleave="hoveredDonut=null"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <Transition enter-active-class="transition-all duration-150" leave-active-class="transition-all duration-150" enter-from-class="opacity-0 scale-90" leave-to-class="opacity-0 scale-90" mode="out-in">
                      <div :key="hoveredDonut ?? 'default'" class="text-center">
                        <p class="text-lg font-bold text-white leading-none">
                          {{ hoveredDonut !== null ? trafficSources[hoveredDonut].pct + '%' : '45%' }}
                        </p>
                        <p class="text-[10px] text-zinc-500 mt-0.5">
                          {{ hoveredDonut !== null ? trafficSources[hoveredDonut].label : 'Organic' }}
                        </p>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2.5">
                <div v-for="(s,i) in trafficSources" :key="i"
                  class="flex items-center justify-between cursor-pointer group"
                  @mouseenter="hoveredDonut=i" @mouseleave="hoveredDonut=null">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125" :style="`background:${s.color}`"/>
                    <span :class="['text-xs transition-colors', hoveredDonut===i ? 'text-white' : 'text-zinc-400']">{{ s.label }}</span>
                  </div>
                  <span :class="['text-xs font-bold transition-colors', hoveredDonut===i ? 'text-white' : 'text-zinc-300']">{{ s.pct }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bar chart + Transactions -->
          <div class="grid grid-cols-1 xl:grid-cols-[276px_1fr] gap-4">

            <!-- Bar chart (HTML divs for better GSAP animation) -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <p class="text-sm font-bold text-white mb-0.5">Weekly Sessions</p>
              <p class="text-xs text-zinc-500 mb-5">This week</p>
              <div class="flex items-end gap-2 h-24 mb-2">
                <div v-for="(b,i) in barData" :key="i"
                  class="bar-el flex-1 rounded-t-lg cursor-pointer relative group transition-colors"
                  :class="hoveredBar===i ? 'bg-emerald-400' : 'bg-emerald-500'"
                  :style="`height:${b.h}%; opacity:${hoveredBar===i ? 1 : 0.55 + b.h/200}`"
                  @mouseenter="hoveredBar=i"
                  @mouseleave="hoveredBar=null"
                >
                  <Transition enter-active-class="transition-all duration-150" leave-active-class="transition-all duration-100" enter-from-class="opacity-0 -translate-y-1" leave-to-class="opacity-0">
                    <div v-if="hoveredBar===i" class="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-xs text-white px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
                      {{ b.value.toLocaleString() }}
                    </div>
                  </Transition>
                </div>
              </div>
              <div class="flex gap-2">
                <span v-for="b in barData" :key="b.day"
                  :class="['flex-1 text-[10px] text-center transition-colors', hoveredBar===barData.indexOf(b) ? 'text-emerald-400 font-semibold' : 'text-zinc-600']">
                  {{ b.day.slice(0,2) }}
                </span>
              </div>
              <div class="mt-4 pt-4 border-t border-zinc-800/60 flex justify-between">
                <div><p class="text-lg font-bold text-white tabular-nums">12,800</p><p class="text-[10px] text-zinc-500 mt-0.5">Total sessions</p></div>
                <div class="text-right"><p class="text-sm font-bold text-emerald-400">Friday</p><p class="text-[10px] text-zinc-500 mt-0.5">Peak day</p></div>
              </div>
            </div>

            <!-- Transactions -->
            <div class="chart-panel p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="text-sm font-bold text-white">Recent Transactions</p>
                  <p class="text-xs text-zinc-500 mt-0.5">Last 5 payments</p>
                </div>
                <button class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-emerald-500/10">View all →</button>
              </div>
              <div class="flex flex-col">
                <div v-for="(tx,i) in recentTx" :key="i"
                  :class="['tx-row group flex items-center gap-3 py-3 px-2 -mx-2 rounded-xl cursor-pointer transition-colors hover:bg-zinc-800/40', i < recentTx.length-1 ? 'border-b border-zinc-800/40' : '']">
                  <div :class="['w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-md', tx.grad]">{{ tx.initials }}</div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-white truncate group-hover:text-emerald-50 transition-colors">{{ tx.name }}</p>
                    <p class="text-xs text-zinc-500 truncate">{{ tx.time }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p :class="['text-sm font-bold tabular-nums', tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400']">{{ tx.amount }}</p>
                    <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-0.5 inline-block',
                      tx.status==='success' ? 'text-emerald-400 bg-emerald-500/10' :
                      tx.status==='pending' ? 'text-amber-400 bg-amber-500/10' :
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
