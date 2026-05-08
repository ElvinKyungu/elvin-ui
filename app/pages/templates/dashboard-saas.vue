<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Period ──────────────────────────────────────────────────────────────────
const periods = ['7d', '30d', '90d', '1y'] as const
type Period = typeof periods[number]
const activePeriod = ref<Period>('30d')

// ─── MRR counter ─────────────────────────────────────────────────────────────
const counter = reactive({ mrr: 0 })

const mrrByPeriod: Record<Period, { value: number; changeLabel: string; prevLabel: string }> = {
  '7d':  { value: 24890, changeLabel: '+3.1%',  prevLabel: 'vs $24,139 prev 7 days' },
  '30d': { value: 24890, changeLabel: '+12.4%', prevLabel: 'vs $22,154 last month' },
  '90d': { value: 24890, changeLabel: '+28.7%', prevLabel: 'vs $19,340 last quarter' },
  '1y':  { value: 24890, changeLabel: '+87.2%', prevLabel: 'vs $13,295 last year' },
}

// ─── Growth chart data ────────────────────────────────────────────────────────
type GrowthPoint = { free: number; paid: number }
const growthByPeriod: Record<Period, { labels: string[]; data: GrowthPoint[] }> = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [
      { free: 620, paid: 180 }, { free: 645, paid: 188 }, { free: 661, paid: 192 },
      { free: 670, paid: 199 }, { free: 698, paid: 207 }, { free: 712, paid: 213 }, { free: 730, paid: 220 },
    ],
  },
  '30d': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [
      { free: 560, paid: 160 }, { free: 620, paid: 178 }, { free: 680, paid: 198 }, { free: 730, paid: 220 },
    ],
  },
  '90d': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [
      { free: 380, paid: 105 }, { free: 440, paid: 128 }, { free: 500, paid: 148 },
      { free: 570, paid: 168 }, { free: 650, paid: 195 }, { free: 730, paid: 220 },
    ],
  },
  '1y': {
    labels: ['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24'],
    data: [
      { free: 120, paid: 35 }, { free: 210, paid: 62 }, { free: 310, paid: 90 },
      { free: 420, paid: 125 }, { free: 560, paid: 165 }, { free: 730, paid: 220 },
    ],
  },
}

const chartDataset = computed(() => growthByPeriod[activePeriod.value])

// ─── SVG chart computation ────────────────────────────────────────────────────
const VW = 400, VH = 120, VP = 8

function calcPts(values: number[], allValues: number[]): [number, number][] {
  const n = values.length
  if (n < 2) return []
  const max = Math.max(...allValues), min = Math.min(...allValues)
  const range = max - min || 1
  return values.map((v, i) => [
    (i / (n - 1)) * VW,
    VP + (1 - (v - min) / range) * (VH - VP * 2),
  ])
}

function ptsStr(pts: [number, number][]): string {
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

function areaStr(pts: [number, number][]): string {
  if (!pts.length) return ''
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ')
  return `M${pts[0][0].toFixed(1)},${VH} L${line} L${pts[pts.length - 1][0].toFixed(1)},${VH} Z`
}

const allVals = computed(() => chartDataset.value.data.flatMap(d => [d.free, d.paid]))
const freePts = computed(() => calcPts(chartDataset.value.data.map(d => d.free), allVals.value))
const paidPts = computed(() => calcPts(chartDataset.value.data.map(d => d.paid), allVals.value))
const freePtsStr = computed(() => ptsStr(freePts.value))
const paidPtsStr = computed(() => ptsStr(paidPts.value))
const freeArea = computed(() => areaStr(freePts.value))
const paidArea = computed(() => areaStr(paidPts.value))

// ─── Chart hover ─────────────────────────────────────────────────────────────
const chartContainer = useTemplateRef<HTMLElement>('chartContainer')
const hoverIdx = ref<number | null>(null)
const showTip = ref(false)

function onChartMove(e: MouseEvent) {
  const el = chartContainer.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const n = chartDataset.value.data.length
  const idx = Math.round(((e.clientX - rect.left) / rect.width) * (n - 1))
  hoverIdx.value = Math.max(0, Math.min(n - 1, idx))
  showTip.value = true
}

function onChartLeave() {
  showTip.value = false
  hoverIdx.value = null
}

const hoverXSvg = computed(() =>
  hoverIdx.value !== null ? (hoverIdx.value / (chartDataset.value.data.length - 1)) * VW : 0,
)
const hoverFreeY = computed(() => hoverIdx.value !== null ? (freePts.value[hoverIdx.value]?.[1] ?? 0) : 0)
const hoverPaidY = computed(() => hoverIdx.value !== null ? (paidPts.value[hoverIdx.value]?.[1] ?? 0) : 0)
const hoverXPct = computed(() =>
  hoverIdx.value !== null ? (hoverIdx.value / (chartDataset.value.data.length - 1)) * 100 : 0,
)

// ─── Heatmap hover ────────────────────────────────────────────────────────────
const hoveredCell = ref<{ row: number; col: number } | null>(null)
const heatTipX = ref(0)
const heatTipY = ref(0)

function onCellEnter(e: MouseEvent, ri: number, ci: number) {
  const cell = e.currentTarget as HTMLElement
  const wrapper = cell.closest('.heatmap-wrapper') as HTMLElement | null
  if (!wrapper) return
  const wRect = wrapper.getBoundingClientRect()
  const cRect = cell.getBoundingClientRect()
  heatTipX.value = cRect.left - wRect.left + cRect.width / 2
  heatTipY.value = cRect.top - wRect.top - 6
  hoveredCell.value = { row: ri, col: ci }
}

function onCellLeave() {
  hoveredCell.value = null
}

// ─── Static data ──────────────────────────────────────────────────────────────
const metrics = [
  { label: 'New MRR',          value: '$3,240', change: '+8.2%',  up: true,  sparkline: '0,22 16,18 32,16 48,12 64,8 80,5' },
  { label: 'Churned MRR',      value: '$480',   change: '-2.1%',  up: false, sparkline: '0,6 16,8 32,7 48,10 64,12 80,15' },
  { label: 'Active Customers', value: '842',    change: '+14.3%', up: true,  sparkline: '0,24 16,20 32,18 48,13 64,9 80,4' },
  { label: 'NPS Score',        value: '67',     change: '+3 pts', up: true,  sparkline: '0,18 16,15 32,14 48,10 64,8 80,5' },
]

const features = [
  { label: 'Dashboard',  pct: 78 },
  { label: 'API Access', pct: 65 },
  { label: 'Reports',    pct: 52 },
  { label: 'Webhooks',   pct: 41 },
  { label: 'Exports',    pct: 38 },
]

const recentUsers = [
  { name: 'Gabriel Delattre', plan: 'Pro',     joined: '2 min ago',  initials: 'GD', color: 'from-emerald-500 to-teal-500' },
  { name: 'Vander Otis',      plan: 'Starter', joined: '18 min ago', initials: 'VO', color: 'from-blue-500 to-blue-600' },
  { name: 'Kevin Maginot',    plan: 'Pro',     joined: '1 hr ago',   initials: 'KM', color: 'from-amber-500 to-amber-600' },
  { name: 'Eric Ampire',      plan: 'Free',    joined: '3 hrs ago',  initials: 'EA', color: 'from-rose-500 to-rose-600' },
  { name: 'Antfu',            plan: 'Pro',     joined: 'Yesterday',  initials: 'AF', color: 'from-zinc-400 to-zinc-600' },
]

const heatmap = [
  [1,2,0,1,3,2,1,3,4,2,3,4],
  [2,3,1,0,2,4,3,2,3,4,3,2],
  [0,1,2,3,2,1,3,4,3,2,4,3],
  [1,2,3,4,3,2,1,2,4,3,2,3],
  [3,4,3,2,3,4,2,3,4,4,3,4],
  [1,0,1,1,0,1,2,0,1,2,1,0],
  [0,0,1,0,1,0,1,0,0,1,2,1],
]
const heatDays = ['M','T','W','T','F','S','S']
const heatColor = (v: number) => ['bg-zinc-800/30','bg-emerald-900/70','bg-emerald-700/70','bg-emerald-500/80','bg-emerald-400'][v]

const activeNav = ref('metrics')

// ─── Lifecycle ────────────────────────────────────────────────────────────────
watch(activePeriod, (p) => {
  gsap.to(counter, { mrr: mrrByPeriod[p].value, duration: 0.8, ease: 'power2.out' })
})

onMounted(() => {
  gsap.to(counter, { mrr: mrrByPeriod[activePeriod.value].value, duration: 1.1, ease: 'power2.out' })

  gsap.from('.mrr-hero',      { y: -10, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.05 })
  gsap.from('.metric-card',   { y: 14, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.2 })
  gsap.from('.saas-panel',    { y: 18, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.35 })
  gsap.from('.user-row',      { x: -10, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.55 })
  gsap.from('.feat-bar-fill', { scaleX: 0, transformOrigin: '0% 50%', duration: 0.75, stagger: 0.09, ease: 'power3.out', delay: 0.5 })

  document.querySelectorAll<HTMLElement>('.metric-card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -2, duration: 0.2, ease: 'power2.out' }))
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.2, ease: 'power2.out' }))
  })
})

onUnmounted(() => {
  gsap.killTweensOf('.metric-card,.saas-panel,.feat-bar-fill,.user-row,.mrr-hero')
})
</script>

<template>
  <div class="min-h-screen bg-[#080808] text-white" style="font-family: Inter, system-ui, sans-serif">

    <!-- ─── Top nav ──────────────────────────────────────────────────────────── -->
    <nav class="h-14 flex items-center px-5 lg:px-8 border-b border-zinc-800/60 bg-[#080808]/90 backdrop-blur-sm sticky top-0 z-20">
      <div class="flex items-center gap-2.5 mr-8 shrink-0">
        <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span class="font-bold text-white text-sm hidden sm:block">Elvin SaaS</span>
      </div>

      <div class="hidden md:flex items-center gap-0.5">
        <button v-for="item in ['Metrics', 'Customers', 'Revenue', 'Integrations']" :key="item"
          @click="activeNav = item.toLowerCase()"
          :class="['px-3.5 py-1.5 rounded-lg text-sm transition-colors', activeNav === item.toLowerCase() ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-zinc-200']">
          {{ item }}
        </button>
      </div>

      <div class="flex items-center gap-2 ml-auto">
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

    <!-- ─── Mobile period selector ───────────────────────────────────────────── -->
    <div class="sm:hidden flex items-center gap-0.5 bg-zinc-900/80 border-b border-zinc-800/60 px-5 py-2">
      <button v-for="p in periods" :key="p"
        @click="activePeriod = p"
        :class="['flex-1 py-1.5 rounded-md text-xs font-medium transition-colors text-center', activePeriod === p ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300']">
        {{ p }}
      </button>
    </div>

    <!-- ─── MRR Hero ─────────────────────────────────────────────────────────── -->
    <div class="mrr-hero border-b border-zinc-800/60 bg-zinc-900/20">
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div>
          <p class="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Monthly Recurring Revenue</p>
          <div class="flex items-end gap-3 flex-wrap">
            <p class="text-4xl font-black text-white tracking-tight">${{ Math.round(counter.mrr).toLocaleString() }}</p>
            <Transition mode="out-in">
              <span :key="activePeriod" class="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg mb-1">
                {{ mrrByPeriod[activePeriod].changeLabel }}
              </span>
            </Transition>
          </div>
          <Transition mode="out-in">
            <p :key="activePeriod" class="text-xs text-zinc-500 mt-1.5">{{ mrrByPeriod[activePeriod].prevLabel }}</p>
          </Transition>
        </div>

        <div class="sm:col-span-2">
          <svg viewBox="0 0 480 60" class="w-full" style="height:70px" preserveAspectRatio="none">
            <defs>
              <linearGradient id="saas-mrr-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#42b883" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#42b883" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,52 L80,48 L160,44 L240,36 L320,24 L400,15 L480,5 L480,60 L0,60 Z" fill="url(#saas-mrr-grad)"/>
            <polyline points="0,52 80,48 160,44 240,36 320,24 400,15 480,5" fill="none" stroke="#42b883" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="480" cy="5" r="4" fill="#42b883"/>
            <circle cx="480" cy="5" r="8" fill="#42b883" opacity="0.15"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- ─── Main ─────────────────────────────────────────────────────────────── -->
    <main class="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col gap-5">

      <!-- Metric cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(m, i) in metrics" :key="i"
          class="metric-card p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors cursor-default">
          <p class="text-xs text-zinc-500 font-medium mb-2 leading-tight">{{ m.label }}</p>
          <div class="flex items-end justify-between mb-2">
            <p class="text-xl font-bold text-white leading-none">{{ m.value }}</p>
            <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded-md', m.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10']">
              {{ m.change }}
            </span>
          </div>
          <svg viewBox="0 0 80 26" class="w-full h-6" preserveAspectRatio="none">
            <polyline :points="m.sparkline" fill="none" :stroke="m.up ? '#42b883' : '#ef4444'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Growth chart + Feature adoption -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <!-- Multi-line growth chart -->
        <div class="saas-panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <div class="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <p class="text-sm font-semibold text-white">User Growth</p>
              <Transition mode="out-in">
                <p :key="activePeriod" class="text-xs text-zinc-500">Free vs Paid — {{ activePeriod }}</p>
              </Transition>
            </div>
            <div class="flex items-center gap-3 text-xs">
              <span class="flex items-center gap-1.5 text-zinc-400">
                <span class="w-4 h-0.5 bg-emerald-400 inline-block rounded-full"/>Free
              </span>
              <span class="flex items-center gap-1.5 text-zinc-400">
                <span class="w-4 h-0.5 border-t-2 border-dashed border-emerald-700 inline-block" style="width:16px"/>Paid
              </span>
            </div>
          </div>

          <div class="flex gap-3">
            <!-- Y-axis -->
            <div class="flex flex-col justify-between text-[10px] text-zinc-600 shrink-0 pb-5" style="width:32px">
              <span>{{ Math.max(...allVals) }}</span>
              <span>{{ Math.round(Math.max(...allVals) / 2) }}</span>
              <span>0</span>
            </div>

            <!-- SVG + tooltip container -->
            <div class="flex-1 min-w-0 relative" ref="chartContainer"
              @mousemove="onChartMove" @mouseleave="onChartLeave">
              <svg :viewBox="`0 0 ${VW} ${VH}`" class="w-full select-none" style="height:130px" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="saas-free-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#42b883" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="#42b883" stop-opacity="0"/>
                  </linearGradient>
                  <linearGradient id="saas-paid-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#059669" stop-opacity="0.15"/>
                    <stop offset="100%" stop-color="#059669" stop-opacity="0"/>
                  </linearGradient>
                </defs>

                <!-- Grid -->
                <line :x1="0" :y1="VH / 3" :x2="VW" :y2="VH / 3" stroke="#27272a" stroke-width="1"/>
                <line :x1="0" :y1="(VH * 2) / 3" :x2="VW" :y2="(VH * 2) / 3" stroke="#27272a" stroke-width="1"/>

                <!-- Fill areas -->
                <path :d="freeArea" fill="url(#saas-free-grad)"/>
                <path :d="paidArea" fill="url(#saas-paid-grad)"/>

                <!-- Lines -->
                <polyline :points="freePtsStr" fill="none" stroke="#42b883" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline :points="paidPtsStr" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 3"/>

                <!-- Hover crosshair + dots -->
                <template v-if="showTip && hoverIdx !== null">
                  <line :x1="hoverXSvg" :y1="0" :x2="hoverXSvg" :y2="VH" stroke="#52525b" stroke-width="1" stroke-dasharray="3 2"/>
                  <circle :cx="hoverXSvg" :cy="hoverFreeY" r="4" fill="#42b883" stroke="#080808" stroke-width="2"/>
                  <circle :cx="hoverXSvg" :cy="hoverPaidY" r="4" fill="#059669" stroke="#080808" stroke-width="2"/>
                </template>

                <!-- End dots -->
                <circle v-if="freePts.length" :cx="freePts[freePts.length - 1][0]" :cy="freePts[freePts.length - 1][1]" r="3" fill="#42b883"/>
                <circle v-if="paidPts.length" :cx="paidPts[paidPts.length - 1][0]" :cy="paidPts[paidPts.length - 1][1]" r="3" fill="#059669"/>
              </svg>

              <!-- Tooltip -->
              <Transition name="fade">
                <div v-if="showTip && hoverIdx !== null"
                  class="absolute bottom-6 z-10 pointer-events-none"
                  :style="`left:${Math.min(Math.max(hoverXPct, 5), 85)}%;transform:translateX(-50%)`">
                  <div class="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs shadow-xl whitespace-nowrap">
                    <p class="text-zinc-400 font-medium mb-1.5">{{ chartDataset.labels[hoverIdx] }}</p>
                    <p class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"/>
                      <span class="text-zinc-400">Free</span>
                      <span class="text-white font-bold ml-auto pl-4">{{ chartDataset.data[hoverIdx].free }}</span>
                    </p>
                    <p class="flex items-center gap-2 mt-1">
                      <span class="w-2 h-2 rounded-full bg-emerald-700 shrink-0"/>
                      <span class="text-zinc-400">Paid</span>
                      <span class="text-white font-bold ml-auto pl-4">{{ chartDataset.data[hoverIdx].paid }}</span>
                    </p>
                  </div>
                </div>
              </Transition>

              <!-- X-axis labels -->
              <div class="flex justify-between mt-1">
                <span v-for="(label, i) in chartDataset.labels" :key="i"
                  class="text-[10px] text-zinc-600 flex-1 text-center first:text-left last:text-right">
                  {{ label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature adoption -->
        <div class="saas-panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <p class="text-sm font-semibold text-white mb-0.5">Feature Adoption</p>
          <p class="text-xs text-zinc-500 mb-5">% of active customers using each feature</p>
          <div class="flex flex-col gap-4">
            <div v-for="(f, i) in features" :key="i" class="group flex flex-col gap-1.5 cursor-default">
              <div class="flex justify-between items-center">
                <span class="text-xs text-zinc-300 font-medium group-hover:text-white transition-colors">{{ f.label }}</span>
                <span class="text-xs font-bold text-emerald-400">{{ f.pct }}%</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  class="feat-bar-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 group-hover:from-emerald-400 group-hover:to-teal-400 transition-colors"
                  :style="`width:${f.pct}%`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Heatmap + Recent signups -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <!-- Activity heatmap -->
        <div class="saas-panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <p class="text-sm font-semibold text-white mb-0.5">Activity Heatmap</p>
          <p class="text-xs text-zinc-500 mb-4">Logins per day — last 12 weeks</p>

          <div class="heatmap-wrapper relative flex gap-2">
            <!-- Day labels -->
            <div class="flex flex-col gap-1 shrink-0 justify-around">
              <span v-for="d in heatDays" :key="d" class="text-[10px] text-zinc-600 w-3 text-right leading-none" style="height:14px;line-height:14px">{{ d }}</span>
            </div>

            <!-- Grid -->
            <div class="flex-1 grid gap-1" style="grid-template-columns:repeat(12,1fr)">
              <template v-for="(row, ri) in heatmap" :key="ri">
                <div v-for="(val, ci) in row" :key="ci"
                  :class="['rounded-sm h-3.5 cursor-default transition-all hover:ring-1 hover:ring-emerald-400/50 hover:scale-110', heatColor(val)]"
                  @mouseenter="onCellEnter($event, ri, ci)"
                  @mouseleave="onCellLeave"
                />
              </template>
            </div>

            <!-- Heatmap tooltip -->
            <Transition name="fade">
              <div v-if="hoveredCell"
                class="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-full"
                :style="`left:${heatTipX}px;top:${heatTipY}px`">
                <div class="bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs shadow-xl whitespace-nowrap">
                  <p class="text-white font-semibold">{{ heatmap[hoveredCell.row][hoveredCell.col] * 12 }} logins</p>
                  <p class="text-zinc-500">{{ heatDays[hoveredCell.row] }} · Week {{ hoveredCell.col + 1 }}</p>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-1.5 mt-3 justify-end">
            <span class="text-[10px] text-zinc-600">Less</span>
            <div v-for="v in [0,1,2,3,4]" :key="v" :class="['w-3 h-3 rounded-sm', heatColor(v)]"/>
            <span class="text-[10px] text-zinc-600">More</span>
          </div>
        </div>

        <!-- Recent signups -->
        <div class="saas-panel p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-semibold text-white">Recent Signups</p>
              <p class="text-xs text-zinc-500">Latest 5 accounts</p>
            </div>
            <button class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">View all →</button>
          </div>

          <div class="flex flex-col divide-y divide-zinc-800/40">
            <div v-for="(u, i) in recentUsers" :key="i"
              class="user-row flex items-center gap-3 py-3 hover:bg-zinc-800/20 -mx-2 px-2 rounded-xl transition-colors cursor-default">
              <div :class="['w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0', u.color]">
                {{ u.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">{{ u.name }}</p>
                <p class="text-xs text-zinc-500">{{ u.joined }}</p>
              </div>
              <span :class="['text-[10px] font-bold px-2 py-1 rounded-lg border shrink-0',
                u.plan === 'Pro'     ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                u.plan === 'Starter' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                                      'text-zinc-400 bg-zinc-800 border-zinc-700']">
                {{ u.plan }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.v-enter-active, .v-leave-active { transition: opacity 0.12s ease; }
.v-enter-from, .v-leave-to { opacity: 0; }
</style>
