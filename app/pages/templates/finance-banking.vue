<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

const cardFlipped = ref(false)
const showTransfer = ref(false)
const transferTo = ref('')
const transferAmount = ref('')
const activeCategory = ref('All')
const displayBalance = ref(0)

const balance = 12847.63
const cardNumber = '4532 •••• •••• 8821'
const cardHolder = 'Elvin Kyungu'
const cardExpiry = '09/28'

const categories = ['All', 'Food', 'Shopping', 'Transport', 'Bills', 'Health']

const transactions = [
  { id: 1, name: 'Netflix', category: 'Bills',     amount: -15.99,  date: 'Today, 2:30 PM',   icon: '🎬', color: 'from-red-600 to-red-800' },
  { id: 2, name: 'Salary',  category: 'Income',    amount: 4200.00, date: 'Today, 9:00 AM',   icon: '💼', color: 'from-green-600 to-emerald-800' },
  { id: 3, name: 'Uber',    category: 'Transport', amount: -12.40,  date: 'Yesterday',        icon: '🚗', color: 'from-zinc-600 to-zinc-800' },
  { id: 4, name: 'Amazon',  category: 'Shopping',  amount: -89.99,  date: 'May 10',           icon: '📦', color: 'from-amber-600 to-orange-800' },
  { id: 5, name: 'Spotify', category: 'Bills',     amount: -9.99,   date: 'May 10',           icon: '🎵', color: 'from-green-500 to-green-800' },
  { id: 6, name: 'Whole Foods', category: 'Food',  amount: -67.32,  date: 'May 9',            icon: '🛒', color: 'from-emerald-600 to-teal-800' },
  { id: 7, name: 'Physio', category: 'Health',     amount: -120.00, date: 'May 8',            icon: '🏥', color: 'from-blue-600 to-blue-800' },
  { id: 8, name: 'Sushi Palace', category: 'Food', amount: -43.50,  date: 'May 7',            icon: '🍣', color: 'from-rose-600 to-pink-800' },
]

const filteredTransactions = computed(() =>
  activeCategory.value === 'All' ? transactions : transactions.filter(t => t.category === activeCategory.value)
)

const spending = [
  { label: 'Shopping', pct: 72, color: 'bg-violet-500', amount: '$258' },
  { label: 'Food',     pct: 55, color: 'bg-amber-500',  amount: '$198' },
  { label: 'Bills',    pct: 40, color: 'bg-blue-500',   amount: '$144' },
  { label: 'Transport',pct: 20, color: 'bg-green-500',  amount: '$72'  },
]

const quickContacts = [
  { name: 'Gabriel D.', initials: 'GD', color: 'from-violet-500 to-purple-600' },
  { name: 'Sara L.',    initials: 'SL', color: 'from-pink-500 to-rose-600' },
  { name: 'Vander O.', initials: 'VO', color: 'from-amber-500 to-orange-600' },
  { name: 'Kevin M.',  initials: 'KM', color: 'from-green-500 to-emerald-600' },
]

function flipCard() {
  const card = document.querySelector('.bank-card')
  if (!card) return
  cardFlipped.value = !cardFlipped.value
  gsap.to(card, { rotateY: cardFlipped.value ? 180 : 0, duration: 0.6, ease: 'power3.inOut' })
}

function openTransfer() {
  showTransfer.value = true
  transferTo.value = ''
  transferAmount.value = ''
  nextTick(() => gsap.from('.transfer-modal', { y: 50, opacity: 0, duration: 0.35, ease: 'back.out(1.5)' }))
}

function closeTransfer() {
  gsap.to('.transfer-modal', { y: 50, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => { showTransfer.value = false } })
}

function confirmTransfer() {
  gsap.to('.confirm-btn', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => closeTransfer() })
}

onMounted(() => {
  // Balance count-up
  const obj = { v: 0 }
  gsap.to(obj, { v: balance, duration: 1.8, ease: 'power2.out', onUpdate() { displayBalance.value = Math.round(obj.v * 100) / 100 } })

  // Card entrance
  gsap.from('.bank-card', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })

  // Transaction rows
  gsap.from('.txn-row', { x: -20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.4 })

  // Spending bars
  gsap.from('.spend-bar-inner', { scaleX: 0, transformOrigin: 'left', stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.6 })

  // Stats
  gsap.from('.stat-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.2 })
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white font-sans">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-zinc-950/90 sticky top-0 z-40 backdrop-blur-sm">
      <div class="flex items-center gap-2.5">
        <UiLogo :size="24" color="white" />
        <span class="font-bold text-sm tracking-wide">NeoBank</span>
      </div>
      <div class="flex items-center gap-3">
        <button class="relative p-2 rounded-lg hover:bg-zinc-800 transition-colors">
          <svg class="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">EK</div>
      </div>
    </nav>

    <div class="max-w-5xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">

      <!-- Left column -->
      <div class="col-span-12 lg:col-span-7 space-y-6">

        <!-- Balance + Card -->
        <div class="space-y-4">
          <div>
            <p class="text-xs text-zinc-500 uppercase tracking-widest mb-1">Total Balance</p>
            <p class="text-5xl font-black tabular-nums tracking-tight">
              ${{ Math.floor(displayBalance).toLocaleString() }}<span class="text-zinc-500 text-2xl">.{{ String(Math.round((displayBalance % 1) * 100)).padStart(2, '0') }}</span>
            </p>
            <p class="text-xs text-green-400 mt-1.5">▲ $142.30 this month</p>
          </div>

          <!-- Credit card -->
          <div class="relative h-48" style="perspective:900px">
            <div class="bank-card w-full h-full rounded-2xl cursor-pointer" style="transform-style:preserve-3d" @click="flipCard">
              <!-- Front -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 flex flex-col justify-between" style="backface-visibility:hidden">
                <div class="flex justify-between items-start">
                  <span class="font-bold tracking-widest text-sm">NeoBank</span>
                  <div class="flex gap-1">
                    <div class="w-7 h-7 rounded-full bg-white/20" />
                    <div class="w-7 h-7 rounded-full bg-white/20 -ml-3" />
                  </div>
                </div>
                <div>
                  <p class="text-sm font-mono tracking-widest mb-3">{{ cardNumber }}</p>
                  <div class="flex justify-between items-end">
                    <div>
                      <p class="text-[10px] text-blue-200 uppercase tracking-wider mb-0.5">Card Holder</p>
                      <p class="text-sm font-semibold">{{ cardHolder }}</p>
                    </div>
                    <div>
                      <p class="text-[10px] text-blue-200 uppercase tracking-wider mb-0.5">Expires</p>
                      <p class="text-sm font-semibold">{{ cardExpiry }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Back -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-700 flex flex-col justify-center" style="backface-visibility:hidden;transform:rotateY(180deg)">
                <div class="bg-zinc-900 h-10 w-full mb-4" />
                <div class="px-6">
                  <div class="bg-white/10 rounded px-4 py-2 flex justify-end">
                    <span class="font-mono text-sm tracking-widest">*** ***</span>
                  </div>
                  <p class="text-[10px] text-zinc-400 mt-2 text-right">CVV</p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-xs text-center text-zinc-600">Click card to flip</p>
        </div>

        <!-- Quick actions -->
        <div class="grid grid-cols-4 gap-3">
          <button @click="openTransfer" v-for="(action, i) in [{ label: 'Send', icon: '↑' }, { label: 'Receive', icon: '↓' }, { label: 'Top Up', icon: '+' }, { label: 'More', icon: '⋯' }]" :key="i"
            class="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 flex flex-col items-center gap-2 hover:bg-zinc-800 hover:border-zinc-700 transition-colors group">
            <div class="w-10 h-10 rounded-full bg-zinc-800 group-hover:bg-blue-600 flex items-center justify-center text-lg font-bold transition-colors">{{ action.icon }}</div>
            <span class="text-xs text-zinc-400">{{ action.label }}</span>
          </button>
        </div>

        <!-- Transactions -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold">Transactions</h3>
            <button class="text-xs text-blue-400 hover:text-blue-300 transition-colors">See all</button>
          </div>
          <!-- Category filter -->
          <div class="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
            <button v-for="cat in categories" :key="cat" @click="activeCategory = cat"
              :class="['px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors', activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white']">
              {{ cat }}
            </button>
          </div>
          <div class="space-y-1">
            <div v-for="txn in filteredTransactions" :key="txn.id"
              class="txn-row flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer">
              <div class="flex items-center gap-3">
                <div :class="`w-10 h-10 rounded-xl bg-gradient-to-br ${txn.color} flex items-center justify-center text-lg`">{{ txn.icon }}</div>
                <div>
                  <p class="text-sm font-medium">{{ txn.name }}</p>
                  <p class="text-xs text-zinc-500">{{ txn.date }}</p>
                </div>
              </div>
              <span :class="['text-sm font-semibold tabular-nums', txn.amount > 0 ? 'text-green-400' : 'text-white']">
                {{ txn.amount > 0 ? '+' : '' }}${{ Math.abs(txn.amount).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="col-span-12 lg:col-span-5 space-y-6">
        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="stat-card bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p class="text-xs text-zinc-500 mb-1">Income</p>
            <p class="text-xl font-black text-green-400">$6,800</p>
            <p class="text-xs text-zinc-500 mt-0.5">This month</p>
          </div>
          <div class="stat-card bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p class="text-xs text-zinc-500 mb-1">Expenses</p>
            <p class="text-xl font-black text-red-400">$3,248</p>
            <p class="text-xs text-zinc-500 mt-0.5">This month</p>
          </div>
        </div>

        <!-- Spending by category -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <h3 class="text-sm font-semibold mb-4">Spending</h3>
          <div class="space-y-3.5">
            <div v-for="s in spending" :key="s.label">
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-zinc-400">{{ s.label }}</span>
                <span class="font-medium">{{ s.amount }}</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div class="spend-bar-inner h-full rounded-full" :class="s.color" :style="`width:${s.pct}%`" />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick contacts -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold">Quick Send</h3>
            <button class="text-xs text-blue-400">+ Add</button>
          </div>
          <div class="flex justify-between">
            <button v-for="c in quickContacts" :key="c.name" @click="openTransfer" class="flex flex-col items-center gap-2 group">
              <div :class="`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-blue-500 transition-all`">{{ c.initials }}</div>
              <span class="text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors">{{ c.name.split(' ')[0] }}</span>
            </button>
          </div>
        </div>

        <!-- Budget ring -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <h3 class="text-sm font-semibold mb-4">Monthly Budget</h3>
          <div class="flex items-center gap-5">
            <div class="relative w-24 h-24 shrink-0">
              <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#27272a" stroke-width="10" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" stroke-width="10"
                  stroke-dasharray="239" stroke-dashoffset="72" stroke-linecap="round" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-lg font-black">70%</span>
                <span class="text-[10px] text-zinc-500">used</span>
              </div>
            </div>
            <div>
              <p class="text-sm font-semibold">$3,248 <span class="text-zinc-500 font-normal">/ $4,600</span></p>
              <p class="text-xs text-zinc-500 mt-1">$1,352 remaining</p>
              <div class="mt-2.5 flex flex-wrap gap-1.5">
                <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">On track</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transfer Modal -->
    <Teleport to="body">
      <div v-if="showTransfer" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4" @click.self="closeTransfer">
        <div class="transfer-modal bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-lg">Send Money</h3>
            <button @click="closeTransfer" class="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors">✕</button>
          </div>
          <div class="mb-4">
            <label class="text-xs text-zinc-500 block mb-1.5">To</label>
            <input v-model="transferTo" placeholder="Name or account number"
              class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div class="mb-5">
            <label class="text-xs text-zinc-500 block mb-1.5">Amount</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
              <input v-model="transferAmount" type="number" placeholder="0.00"
                class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pl-8 text-xl font-bold focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div class="bg-zinc-800 rounded-xl p-3 mb-5 text-xs flex justify-between text-zinc-400">
            <span>Available balance</span>
            <span class="text-white font-semibold">$12,847.63</span>
          </div>
          <button @click="confirmTransfer" class="confirm-btn w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95">
            Send {{ transferAmount ? `$${transferAmount}` : 'Money' }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
