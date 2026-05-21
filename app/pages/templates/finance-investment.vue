<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({ layout: false })

gsap.registerPlugin(ScrollTrigger)

const period = ref('1Y')
const showRebalance = ref(false)
const sortKey = ref<'value' | 'change' | 'weight'>('value')
const sortDir = ref<'asc' | 'desc'>('desc')

const portfolioValue = ref(0)
const targetValue = 248_350.80

const holdings = reactive([
  { ticker: 'NVDA', name: 'NVIDIA Corp',     weight: 18, value: 44703.14, change:  42.8, shares: 38,   color: '#22c55e', sector: 'Tech'      },
  { ticker: 'AAPL', name: 'Apple Inc',       weight: 16, value: 39736.13, change:   8.2, shares: 220,  color: '#3b82f6', sector: 'Tech'      },
  { ticker: 'MSFT', name: 'Microsoft Corp',  weight: 14, value: 34769.11, change:  12.5, shares: 84,   color: '#6366f1', sector: 'Tech'      },
  { ticker: 'AMZN', name: 'Amazon.com',      weight: 12, value: 29802.10, change:   6.3, shares: 165,  color: '#f59e0b', sector: 'Consumer'  },
  { ticker: 'GOOGL',name: 'Alphabet Inc',    weight: 10, value: 24835.08, change:   4.1, shares: 145,  color: '#ec4899', sector: 'Tech'      },
  { ticker: 'BRK',  name: 'Berkshire H.',    weight:  8, value: 19868.06, change:   2.8, shares: 50,   color: '#14b8a6', sector: 'Finance'   },
  { ticker: 'JNJ',  name: 'Johnson & J.',    weight:  7, value: 17384.56, change:  -1.2, shares: 112,  color: '#8b5cf6', sector: 'Health'    },
  { ticker: 'SPY',  name: 'S&P 500 ETF',     weight: 15, value: 37252.58, change:   9.4, shares: 94,   color: '#64748b', sector: 'ETF'       },
])

const sortedHoldings = computed(() => {
  const arr = [...holdings]
  arr.sort((a, b) => {
    const va = a[sortKey.value], vb = b[sortKey.value]
    return sortDir.value === 'desc' ? (vb as number) - (va as number) : (va as number) - (vb as number)
  })
  return arr
})

function toggleSort(key: typeof sortKey.value) {
  if (sortKey.value === key) sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
  else { sortKey.value = key; sortDir.value = 'desc' }
}

const chartData = {
  '1M': [215, 218, 213, 222, 228, 224, 230, 235, 232, 240, 244, 248],
  '3M': [195, 200, 198, 210, 205, 215, 220, 218, 225, 235, 241, 248],
  '6M': [180, 185, 190, 195, 200, 205, 210, 218, 225, 232, 240, 248],
  '1Y': [140, 152, 148, 162, 175, 180, 190, 200, 215, 225, 240, 248],
  'All': [80, 95, 110, 130, 145, 155, 170, 188, 200, 220, 235, 248],
}

const chartPath = computed(() => {
  const pts = chartData[period.value as keyof typeof chartData]
  const w = 400, h = 80
  const min = Math.min(...pts), max = Math.max(...pts)
  const step = w / (pts.length - 1)
  return pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - ((v - min) / (max - min)) * h).toFixed(1)}`).join(' ')
})

const areaPath = computed(() => `${chartPath.value} L400,80 L0,80 Z`)

const chartEl = useTemplateRef<SVGPathElement>('chartEl')

function redrawChart() {
  nextTick(() => {
    if (!chartEl.value) return
    const len = chartEl.value.getTotalLength()
    gsap.set(chartEl.value, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(chartEl.value, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' })
  })
}

const donutC = 2 * Math.PI * 40
function donutProps(pct: number, cum: number) {
  return {
    strokeDasharray: `${(pct / 100) * donutC} ${donutC}`,
    strokeDashoffset: -((cum / 100) * donutC),
  }
}

onMounted(() => {
  // Portfolio counter
  const obj = { v: 0 }
  gsap.to(obj, { v: targetValue, duration: 1.8, ease: 'power2.out', onUpdate() { portfolioValue.value = Math.round(obj.v * 100) / 100 } })

  // Chart draw
  redrawChart()

  // Holdings rows
  gsap.from('.holding-row', { x: -20, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.4 })

  // Stat boxes
  gsap.from('.perf-stat', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.2 })

  // Scroll reveals
  ScrollTrigger.batch('.reveal-row', {
    onEnter: els => gsap.from(els, { y: 16, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out' }),
  })
})

watch(period, redrawChart)

onUnmounted(() => ScrollTrigger.getAll().forEach(t => t.kill()))
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white font-sans">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-zinc-950/90 sticky top-0 z-40 backdrop-blur-sm">
      <div class="flex items-center gap-2.5">
        <UiLogo :size="24" color="white" />
        <span class="font-bold text-sm tracking-wide">WealthOS</span>
      </div>
      <div class="hidden sm:flex gap-6 text-sm text-zinc-400">
        <button class="text-white font-medium">Portfolio</button>
        <button class="hover:text-white transition-colors">Watchlist</button>
        <button class="hover:text-white transition-colors">Research</button>
      </div>
      <div class="flex items-center gap-3">
        <button @click="showRebalance = true" class="hidden sm:flex px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold rounded-lg transition-colors">Rebalance</button>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold">EK</div>
      </div>
    </nav>

    <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">

      <!-- Header stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="perf-stat col-span-2 sm:col-span-1 bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <p class="text-xs text-zinc-500 mb-1">Total Value</p>
          <p class="text-3xl font-black tabular-nums">${{ Math.floor(portfolioValue / 1000) }}<span class="text-zinc-500 text-xl">k</span></p>
          <p class="text-xs text-emerald-400 mt-1">▲ +18.4% YTD</p>
        </div>
        <div class="perf-stat bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <p class="text-xs text-zinc-500 mb-1">Day Change</p>
          <p class="text-2xl font-black text-emerald-400">+$842</p>
          <p class="text-xs text-emerald-400 mt-1">+0.34%</p>
        </div>
        <div class="perf-stat bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <p class="text-xs text-zinc-500 mb-1">Unrealized P&amp;L</p>
          <p class="text-2xl font-black text-emerald-400">+$38.4k</p>
          <p class="text-xs text-zinc-500 mt-1">Since inception</p>
        </div>
        <div class="perf-stat bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <p class="text-xs text-zinc-500 mb-1">Dividend Yield</p>
          <p class="text-2xl font-black">1.82%</p>
          <p class="text-xs text-zinc-500 mt-1">$4,520 / yr</p>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="font-bold text-lg">Portfolio Performance</h2>
            <p class="text-sm text-zinc-500">vs S&amp;P 500 benchmark</p>
          </div>
          <div class="flex gap-1 bg-zinc-800 rounded-lg p-1">
            <button v-for="p in ['1M','3M','6M','1Y','All']" :key="p" @click="period = p"
              :class="['px-3 py-1 text-xs font-medium rounded-md transition-colors', period === p ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white']">
              {{ p }}
            </button>
          </div>
        </div>
        <div class="relative h-40">
          <svg viewBox="0 0 400 80" preserveAspectRatio="none" class="w-full h-full">
            <defs>
              <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#22c55e" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path :d="areaPath" fill="url(#ig)" />
            <path ref="chartEl" :d="chartPath" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Holdings + Allocation -->
      <div class="grid grid-cols-12 gap-5">
        <!-- Holdings table -->
        <div class="col-span-12 lg:col-span-8 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div class="p-5 pb-0">
            <h3 class="font-semibold mb-4">Holdings</h3>
            <div class="grid grid-cols-12 gap-3 text-xs text-zinc-500 pb-2 border-b border-zinc-800">
              <span class="col-span-4">Asset</span>
              <button class="col-span-2 text-right hover:text-white transition-colors" @click="toggleSort('value')">
                Value {{ sortKey === 'value' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
              </button>
              <button class="col-span-2 text-right hover:text-white transition-colors" @click="toggleSort('change')">
                Return {{ sortKey === 'change' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
              </button>
              <button class="col-span-2 text-right hover:text-white transition-colors" @click="toggleSort('weight')">
                Weight {{ sortKey === 'weight' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
              </button>
              <span class="col-span-2 text-right">Shares</span>
            </div>
          </div>
          <div class="divide-y divide-zinc-800/50">
            <div v-for="h in sortedHoldings" :key="h.ticker"
              class="holding-row grid grid-cols-12 gap-3 items-center px-5 py-3.5 hover:bg-zinc-800/50 transition-colors cursor-pointer">
              <div class="col-span-4 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" :style="`background:${h.color}22;color:${h.color}`">
                  {{ h.ticker.slice(0, 2) }}
                </div>
                <div>
                  <p class="text-sm font-semibold">{{ h.ticker }}</p>
                  <p class="text-xs text-zinc-500 hidden sm:block">{{ h.name }}</p>
                </div>
              </div>
              <div class="col-span-2 text-right text-sm font-medium">${{ (h.value / 1000).toFixed(1) }}k</div>
              <div class="col-span-2 text-right">
                <span :class="['text-sm font-semibold', h.change > 0 ? 'text-emerald-400' : 'text-red-400']">
                  {{ h.change > 0 ? '+' : '' }}{{ h.change }}%
                </span>
              </div>
              <div class="col-span-2 text-right">
                <span class="text-sm text-zinc-300">{{ h.weight }}%</span>
                <div class="h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                  <div class="h-full rounded-full" :style="`width:${h.weight * 5}%;background:${h.color}`" />
                </div>
              </div>
              <div class="col-span-2 text-right text-sm text-zinc-400">{{ h.shares }}</div>
            </div>
          </div>
        </div>

        <!-- Allocation donut -->
        <div class="col-span-12 lg:col-span-4 bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <h3 class="font-semibold mb-5">Allocation</h3>
          <div class="flex justify-center mb-5">
            <div class="relative w-36 h-36">
              <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#18181b" stroke-width="16" />
                <circle v-for="(h, i) in holdings" :key="h.ticker"
                  cx="50" cy="50" r="40" fill="none"
                  :stroke="h.color" stroke-width="16"
                  v-bind="donutProps(h.weight, holdings.slice(0, i).reduce((a, x) => a + x.weight, 0))"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-xs text-zinc-500">8 assets</span>
                <span class="text-sm font-bold">$248k</span>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <div v-for="h in holdings.slice(0, 6)" :key="h.ticker" class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" :style="`background:${h.color}`" />
                <span class="text-zinc-400">{{ h.ticker }}</span>
              </div>
              <span class="font-medium">{{ h.weight }}%</span>
            </div>
            <div class="flex items-center justify-between text-xs text-zinc-500">
              <span>+ 2 more</span>
              <span>{{ holdings.slice(6).reduce((a, h) => a + h.weight, 0) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rebalance Modal -->
    <Teleport to="body">
      <div v-if="showRebalance" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showRebalance = false">
        <div class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-bold text-lg">Rebalance Portfolio</h3>
            <button @click="showRebalance = false" class="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors">✕</button>
          </div>
          <p class="text-sm text-zinc-400 mb-4">Your portfolio has drifted from target. Suggested trades:</p>
          <div class="space-y-2.5 mb-5">
            <div v-for="(rec, i) in [
              { action: 'Sell', ticker: 'NVDA', amount: '$4,200', reason: 'Overweight by 3%' },
              { action: 'Buy',  ticker: 'JNJ',  amount: '$2,100', reason: 'Underweight by 2%' },
              { action: 'Buy',  ticker: 'BRK',  amount: '$2,100', reason: 'Underweight by 1%' },
            ]" :key="i"
              class="flex items-center justify-between bg-zinc-800 rounded-xl p-3.5 text-sm">
              <div class="flex items-center gap-2.5">
                <span :class="['px-2 py-0.5 rounded text-xs font-bold', rec.action === 'Sell' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400']">{{ rec.action }}</span>
                <span class="font-semibold">{{ rec.ticker }}</span>
              </div>
              <div class="text-right">
                <div class="font-semibold">{{ rec.amount }}</div>
                <div class="text-xs text-zinc-500">{{ rec.reason }}</div>
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="showRebalance = false" class="flex-1 py-2.5 border border-zinc-700 rounded-xl text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
            <button @click="showRebalance = false" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold transition-colors">Execute All</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
