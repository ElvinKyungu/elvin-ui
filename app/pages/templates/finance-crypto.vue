<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

const selectedSymbol = ref('BTC')
const period = ref('1D')
const showModal = ref(false)
const tradeType = ref<'buy' | 'sell'>('buy')
const tradeAmount = ref('')

interface Coin {
  symbol: string; name: string; price: number; change: number
  color: string; bg: string; volume: string
}

const coins = reactive<Coin[]>([
  { symbol: 'BTC', name: 'Bitcoin',  price: 67432.50, change:  2.34, color: '#f59e0b', bg: 'from-amber-500 to-orange-600',  volume: '$32.4B' },
  { symbol: 'ETH', name: 'Ethereum', price:  3821.20, change: -1.12, color: '#6366f1', bg: 'from-indigo-500 to-violet-600', volume: '$18.2B' },
  { symbol: 'SOL', name: 'Solana',   price:   182.40, change:  5.67, color: '#22c55e', bg: 'from-green-500 to-emerald-600', volume: '$4.1B'  },
  { symbol: 'BNB', name: 'BNB',      price:   421.80, change:  0.89, color: '#eab308', bg: 'from-yellow-500 to-amber-600',  volume: '$2.8B'  },
  { symbol: 'DOGE',name: 'Dogecoin', price:     0.183, change: -3.21, color: '#fbbf24', bg: 'from-yellow-400 to-yellow-600', volume: '$1.2B'  },
])

const chartPoints = {
  '1D': [80,70,85,60,65,40,55,30,45,20,35,15,25,10,5],
  '1W': [90,80,60,70,50,40,60,35,25,40,20,15,8,5,2],
  '1M': [95,90,75,80,65,55,45,30,40,25,15,20,10,5,2],
  '1Y': [100,95,90,85,75,65,55,45,35,30,20,15,8,5,2],
}

const svgLine = computed(() => {
  const pts = chartPoints[period.value as keyof typeof chartPoints]
  const step = 360 / (pts.length - 1)
  return pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${v}`).join(' ')
})
const svgArea = computed(() => `${svgLine.value} L360,100 L0,100 Z`)

const portfolio = [
  { symbol: 'BTC', amount: '0.45', value: 30344.63, change:  2.34, color: '#f59e0b', pct: 48 },
  { symbol: 'ETH', amount: '8.20', value: 31333.84, change: -1.12, color: '#6366f1', pct: 32 },
  { symbol: 'SOL', amount: '85.0', value: 15504.00, change:  5.67, color: '#22c55e', pct: 15 },
  { symbol: 'BNB', amount: '12.0', value:  5061.60, change:  0.89, color: '#eab308', pct:  5 },
]

const tickerItems = [...coins, ...coins, ...coins]
const displayPrice = ref(67432.50)
const currentCoin = computed(() => coins.find(c => c.symbol === selectedSymbol.value) || coins[0])

const tickerTrack = useTemplateRef<HTMLElement>('tickerTrack')
const chartPath = useTemplateRef<SVGPathElement>('chartPath')
const priceEl = useTemplateRef<HTMLElement>('priceEl')
let priceTimer: ReturnType<typeof setInterval>
let tickerTween: gsap.core.Tween

function animateChart() {
  if (!chartPath.value) return
  const len = chartPath.value.getTotalLength()
  gsap.set(chartPath.value, { strokeDasharray: len, strokeDashoffset: len })
  gsap.to(chartPath.value, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' })
}

function openTrade(type: 'buy' | 'sell') {
  tradeType.value = type
  tradeAmount.value = ''
  showModal.value = true
  nextTick(() => gsap.from('.trade-modal', { y: 40, opacity: 0, duration: 0.35, ease: 'power3.out' }))
}

function closeModal() {
  gsap.to('.trade-modal', {
    y: 40, opacity: 0, duration: 0.25, ease: 'power2.in',
    onComplete: () => { showModal.value = false },
  })
}

function executeTrade() {
  gsap.to('.trade-btn', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => closeModal() })
}

const donutC = 2 * Math.PI * 40

function donutProps(pct: number, cumPct: number) {
  return {
    strokeDasharray: `${(pct / 100) * donutC} ${donutC}`,
    strokeDashoffset: -((cumPct / 100) * donutC),
  }
}

onMounted(() => {
  if (tickerTrack.value) {
    tickerTween = gsap.to(tickerTrack.value, { x: '-33.33%', duration: 18, ease: 'none', repeat: -1 })
  }
  animateChart()
  gsap.from('.coin-row', { x: 24, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.3 })
  const obj = { v: 60000 }
  gsap.to(obj, { v: 67432.50, duration: 1.5, ease: 'power2.out', onUpdate() { displayPrice.value = Math.round(obj.v * 100) / 100 } })
  gsap.from('.donut-seg', { strokeDashoffset: donutC, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.6 })

  priceTimer = setInterval(() => {
    const d = (Math.random() - 0.48) * 90
    displayPrice.value = parseFloat((displayPrice.value + d).toFixed(2))
    if (priceEl.value) gsap.fromTo(priceEl.value, { color: d > 0 ? '#22c55e' : '#ef4444' }, { color: '#ffffff', duration: 0.9 })
  }, 2500)
})

watch(period, () => nextTick(animateChart))
watch(selectedSymbol, (sym) => {
  const c = coins.find(x => x.symbol === sym)
  if (c) {
    const obj = { v: displayPrice.value }
    gsap.to(obj, { v: c.price, duration: 0.8, ease: 'power2.out', onUpdate() { displayPrice.value = Math.round(obj.v * 100) / 100 } })
  }
})

onUnmounted(() => {
  clearInterval(priceTimer)
  tickerTween?.kill()
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white font-sans">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 backdrop-blur-sm bg-zinc-950/90 sticky top-0 z-40">
      <div class="flex items-center gap-2.5">
        <UiLogo :size="24" color="white" />
        <span class="font-bold tracking-wide text-sm">CRYPTEX</span>
      </div>
      <div class="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Live Markets
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <div class="text-[10px] text-zinc-500 uppercase tracking-wider">Portfolio</div>
          <div class="text-sm font-bold">$82,244.07</div>
        </div>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">EK</div>
      </div>
    </nav>

    <!-- Ticker tape -->
    <div class="h-9 bg-zinc-900/70 border-b border-zinc-800/60 overflow-hidden flex items-center">
      <div ref="tickerTrack" class="flex items-center gap-8 whitespace-nowrap" style="will-change:transform">
        <div v-for="(c, i) in tickerItems" :key="i" class="flex items-center gap-2 text-xs shrink-0">
          <span class="font-semibold text-zinc-200">{{ c.symbol }}</span>
          <span class="text-zinc-400">${{ c.price >= 1 ? c.price.toLocaleString() : c.price.toFixed(4) }}</span>
          <span :class="c.change > 0 ? 'text-green-400' : 'text-red-400'">{{ c.change > 0 ? '+' : '' }}{{ c.change }}%</span>
          <span class="text-zinc-700 ml-2">·</span>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-5">

      <!-- Chart + Portfolio (left 8 cols) -->
      <div class="col-span-12 lg:col-span-8 space-y-5">

        <!-- Price chart card -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div class="flex items-center gap-2.5 mb-2">
                <div :class="`w-9 h-9 rounded-xl bg-gradient-to-br ${currentCoin.bg} flex items-center justify-center font-black text-sm`">
                  {{ currentCoin.symbol[0] }}
                </div>
                <div>
                  <span class="font-semibold">{{ currentCoin.name }}</span>
                  <span class="text-xs text-zinc-500 ml-2">{{ currentCoin.symbol }}/USDT</span>
                </div>
              </div>
              <div ref="priceEl" class="text-4xl font-black tabular-nums tracking-tight">
                ${{ displayPrice >= 1 ? displayPrice.toLocaleString() : displayPrice.toFixed(4) }}
              </div>
              <div class="flex items-center gap-3 mt-1.5">
                <span :class="currentCoin.change > 0 ? 'text-green-400' : 'text-red-400'" class="text-sm font-semibold">
                  {{ currentCoin.change > 0 ? '▲' : '▼' }} {{ Math.abs(currentCoin.change) }}%
                </span>
                <span class="text-xs text-zinc-500">Vol {{ currentCoin.volume }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-3">
              <!-- Period buttons -->
              <div class="flex gap-1 bg-zinc-800 rounded-lg p-1">
                <button v-for="p in ['1D','1W','1M','1Y']" :key="p" @click="period = p"
                  :class="['px-3 py-1 text-xs font-medium rounded-md transition-colors', period === p ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white']">
                  {{ p }}
                </button>
              </div>
              <div class="flex gap-2">
                <button @click="openTrade('buy')" class="px-5 py-1.5 bg-green-600 hover:bg-green-500 text-xs font-bold rounded-lg transition-all hover:scale-105">Buy</button>
                <button @click="openTrade('sell')" class="px-5 py-1.5 bg-red-600 hover:bg-red-500 text-xs font-bold rounded-lg transition-all hover:scale-105">Sell</button>
              </div>
            </div>
          </div>

          <!-- SVG area chart -->
          <div class="relative h-40">
            <svg viewBox="0 0 360 100" preserveAspectRatio="none" class="w-full h-full">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path :d="svgArea" fill="url(#cg)" />
              <path ref="chartPath" :d="svgLine" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <!-- y-axis lines -->
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
              <div v-for="n in 5" :key="n" class="border-t border-zinc-800/40 first:border-0" />
            </div>
          </div>
        </div>

        <!-- Portfolio allocation -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <h3 class="text-sm font-semibold text-zinc-300 mb-5">Portfolio Allocation</h3>
          <div class="flex flex-col sm:flex-row items-center gap-8">
            <!-- Donut -->
            <div class="relative w-32 h-32 shrink-0">
              <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#18181b" stroke-width="18" />
                <circle v-for="(p, i) in portfolio" :key="p.symbol"
                  class="donut-seg transition-all"
                  cx="50" cy="50" r="40" fill="none"
                  :stroke="p.color" stroke-width="18"
                  v-bind="donutProps(p.pct, portfolio.slice(0, i).reduce((a, x) => a + x.pct, 0))"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[10px] text-zinc-500">Total</span>
                <span class="text-base font-bold">$82k</span>
              </div>
            </div>
            <!-- Table -->
            <div class="flex-1 w-full space-y-2.5">
              <div v-for="p in portfolio" :key="p.symbol" class="flex items-center justify-between group">
                <div class="flex items-center gap-2.5">
                  <div class="w-2.5 h-2.5 rounded-full shrink-0" :style="`background:${p.color}`" />
                  <span class="text-sm font-medium">{{ p.symbol }}</span>
                  <span class="text-xs text-zinc-500">{{ p.amount }}</span>
                </div>
                <div class="text-right">
                  <div class="text-sm font-semibold">${{ p.value.toLocaleString() }}</div>
                  <div :class="p.change > 0 ? 'text-green-400' : 'text-red-400'" class="text-xs">{{ p.change > 0 ? '+' : '' }}{{ p.change }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coin list (right 4 cols) -->
      <div class="col-span-12 lg:col-span-4 flex flex-col gap-5">
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 flex-1">
          <h3 class="text-sm font-semibold text-zinc-300 mb-4 px-1">Markets</h3>
          <div class="space-y-1">
            <button v-for="c in coins" :key="c.symbol" @click="selectedSymbol = c.symbol"
              class="coin-row w-full flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-zinc-800"
              :class="selectedSymbol === c.symbol ? 'bg-zinc-800 ring-1 ring-zinc-700' : ''">
              <div class="flex items-center gap-3">
                <div :class="`w-9 h-9 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center font-black text-sm`">{{ c.symbol[0] }}</div>
                <div class="text-left">
                  <div class="text-sm font-semibold">{{ c.symbol }}</div>
                  <div class="text-xs text-zinc-500">{{ c.name }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium tabular-nums">${{ c.price >= 1 ? c.price.toLocaleString() : c.price.toFixed(4) }}</div>
                <div :class="c.change > 0 ? 'text-green-400' : 'text-red-400'" class="text-xs font-semibold">{{ c.change > 0 ? '+' : '' }}{{ c.change }}%</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Market stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
            <div class="text-xs text-zinc-500 mb-1.5">Fear &amp; Greed</div>
            <div class="text-3xl font-black text-green-400">72</div>
            <div class="text-xs text-green-400 mt-0.5">Greed</div>
          </div>
          <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
            <div class="text-xs text-zinc-500 mb-1.5">BTC Dom.</div>
            <div class="text-3xl font-black text-amber-400">54%</div>
            <div class="text-xs text-zinc-400 mt-0.5">Dominance</div>
          </div>
          <div class="col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
            <div class="text-xs text-zinc-500 mb-1.5">Market Cap</div>
            <div class="text-2xl font-black">$2.41T</div>
            <div class="text-xs text-green-400 mt-0.5">▲ 1.8% (24h)</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trade Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4" @click.self="closeModal">
        <div class="trade-modal bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <div :class="`w-7 h-7 rounded-lg bg-gradient-to-br ${currentCoin.bg} flex items-center justify-center font-black text-xs`">{{ currentCoin.symbol[0] }}</div>
              <h3 class="font-bold text-lg">{{ tradeType === 'buy' ? 'Buy' : 'Sell' }} {{ currentCoin.symbol }}</h3>
            </div>
            <button @click="closeModal" class="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white text-xs transition-colors">✕</button>
          </div>
          <div class="mb-4">
            <label class="text-xs text-zinc-500 block mb-1.5">Amount (USDT)</label>
            <input v-model="tradeAmount" type="number" placeholder="0.00"
              class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-xl font-bold focus:outline-none focus:border-violet-500 transition-colors" />
          </div>
          <div class="flex gap-2 mb-5">
            <button v-for="amt in ['100', '500', '1000', 'Max']" :key="amt"
              @click="tradeAmount = amt === 'Max' ? '5000' : amt"
              class="flex-1 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-400 hover:text-white font-medium">
              {{ amt }}
            </button>
          </div>
          <div class="bg-zinc-800 rounded-xl p-3.5 mb-5 space-y-2 text-xs text-zinc-400">
            <div class="flex justify-between"><span>Price</span><span class="text-white font-medium">${{ currentCoin.price >= 1 ? currentCoin.price.toLocaleString() : currentCoin.price.toFixed(4) }}</span></div>
            <div class="flex justify-between"><span>Fee (0.1%)</span><span class="text-white">${{ tradeAmount ? (parseFloat(tradeAmount) * 0.001).toFixed(2) : '0.00' }}</span></div>
            <div class="flex justify-between border-t border-zinc-700 pt-2 font-semibold text-white"><span>Total</span><span>${{ tradeAmount ? (parseFloat(tradeAmount) * 1.001).toFixed(2) : '0.00' }}</span></div>
          </div>
          <button @click="executeTrade"
            :class="['trade-btn w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95', tradeType === 'buy' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500']">
            {{ tradeType === 'buy' ? '↑ Buy' : '↓ Sell' }} {{ currentCoin.symbol }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
