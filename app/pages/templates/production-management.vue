<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

// ─── Nav data ─────────────────────────────────────────────────────────────────
const navItems = [
  { id: 'productions', label: 'Productions', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4' },
  { id: 'budget',      label: 'Budget',      icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { id: 'payments',    label: 'Payments',    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z' },
  { id: 'transfers',   label: 'Transfers',   icon: 'M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4' },
]
const bottomNavItems = [
  { id: 'analytics', label: 'Analytics', icon: 'M18 20V10M12 20V4M6 20v-6' },
  { id: 'crew',      label: 'Crew',      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id: 'settings',  label: 'Settings',  icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const barData = [
  { month: 'Feb', value: 12400,  label: '25 Feb 2026' },
  { month: 'Mar', value: 18200,  label: '25 Mar 2026' },
  { month: 'Apr', value: 14800,  label: '25 Apr 2026' },
  { month: 'May', value: 21500,  label: '25 May 2026' },
  { month: 'Jun', value: 183920, label: '14 Jun 2026', active: true },
  { month: 'Jul', value: 28000,  label: '25 Jul 2026' },
  { month: 'Aug', value: 22000,  label: '25 Aug 2026' },
  { month: 'Sep', value: 16000,  label: '25 Sep 2026' },
  { month: 'Oct', value: 19000,  label: '25 Oct 2026' },
  { month: 'Nov', value: 24000,  label: '25 Nov 2026' },
  { month: 'Dec', value: 17000,  label: '25 Dec 2026' },
  { month: 'Jan', value: 13000,  label: '25 Jan 2027' },
]
const maxBarValue = computed(() => Math.max(...barData.map(b => b.value)))

const costCentres = [
  { name: 'Camera Department', count: 4, category: 'Equipment rental', value: 84520.40,  color: '#3b82f6', pct: 34.1 },
  { name: 'Production',        count: 7, category: 'Crew coast',       value: 127840.75, color: '#22c55e', pct: 31.2 },
  { name: 'Lighting & grip',   count: 5, category: 'Set and props',    value: 61790.60,  color: '#60a5fa', pct: 18.2 },
  { name: 'Art dept.',         count: 3, category: 'Equipment',        value: 117225.90, color: '#94a3b8', pct: 16.5 },
]

const upcomingPayments = [
  { name: 'Cast & Crew Payroll', sub: '64 people · Unit A',   amount: 128400, badge: 'DUE TODAY', badgeColor: 'orange', icon: 'crew' },
  { name: 'Panavision Asia',     sub: 'Camera & lenses',       amount: 42180,  badge: 'FRI',       badgeColor: 'blue',   icon: 'camera' },
  { name: 'Bali Location Fees',  sub: 'Location · Permits',    amount: 18500,  badge: 'MON',       badgeColor: 'orange', icon: 'location' },
  { name: 'Mse Kitchen',         sub: 'Craft & catering',      amount: 9240,   badge: 'FRI',       badgeColor: 'blue',   icon: 'food' },
]

// ─── State ────────────────────────────────────────────────────────────────────
const sidebarOpen   = ref(false)
const spendExpanded = ref(true)
const activeNav     = ref('productions')
const tooltipIdx    = ref<number | null>(null)
const expandedRows  = ref<Set<number>>(new Set())

// ─── Animated counters ────────────────────────────────────────────────────────
const c = reactive({
  crewPending: 0, crewPaid: 0, crewPendingAmt: 0, crewPaidAmt: 0,
  suppPending: 0, suppApproved: 0, suppPendingAmt: 0, suppApprovedAmt: 0,
  expSubmitted: 0, expApproved: 0, expSubmittedAmt: 0, expApprovedAmt: 0,
  totalSpend: 0, arcPct: 0,
})

// ─── Arc chart ────────────────────────────────────────────────────────────────
const ARC_R = 52
const ARC_C = 2 * Math.PI * ARC_R
const arcDash = computed(() => (c.arcPct / 100) * ARC_C)
const arcGap  = computed(() => ARC_C - arcDash.value)

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt    = (n: number) => Math.round(n).toLocaleString('en-US')
const fmtUSD = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

function toggleRow(i: number) {
  if (expandedRows.value.has(i)) expandedRows.value.delete(i)
  else expandedRows.value.add(i)
}

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.to(c, {
    crewPending: 12, crewPaid: 86, crewPendingAmt: 28450, crewPaidAmt: 412750,
    suppPending: 8, suppApproved: 47, suppPendingAmt: 62130, suppApprovedAmt: 286420,
    expSubmitted: 15, expApproved: 92, expSubmittedAmt: 7820, expApprovedAmt: 64210,
    totalSpend: 184250, arcPct: 26,
    duration: 1.6, ease: 'power2.out', delay: 0.15,
  })
  gsap.from('.stat-card',  { y: 14, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 })
  gsap.from('.main-panel', { y: 18, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
  gsap.from('.bar-fill',   { scaleY: 0, transformOrigin: '50% 100%', duration: 0.65, stagger: 0.04, ease: 'power3.out', delay: 0.5 })
  gsap.from('.pay-row',    { x: -8, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.7 })
})

onUnmounted(() => {
  gsap.killTweensOf([c, '.stat-card', '.main-panel', '.bar-fill', '.pay-row'])
})
</script>

<template>
  <div class="flex h-screen bg-white text-zinc-900 overflow-hidden" style="font-family:Inter,system-ui,sans-serif">

    <!-- Mobile overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="sidebarOpen" class="fixed inset-0 z-20 bg-black/40 lg:hidden" @click="sidebarOpen = false" />
    </Transition>

    <!-- ── Sidebar ──────────────────────────────────────────────────────────── -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-56 bg-white border-r border-zinc-200 shrink-0 transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/10' : '-translate-x-full',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center gap-2.5 h-12 px-4 border-b border-zinc-200 shrink-0">
        <div class="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="2" width="6" height="6" rx="1"/>
            <rect x="12" y="2" width="6" height="6" rx="1"/>
            <rect x="2" y="12" width="6" height="6" rx="1"/>
            <rect x="12" y="12" width="6" height="6" rx="1"/>
          </svg>
        </div>
        <span class="text-sm font-bold text-zinc-900 tracking-tight">Backlot</span>
        <button class="ml-auto text-zinc-400 hover:text-zinc-600 transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 3v18" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Search -->
      <div class="px-3 py-2.5 border-b border-zinc-100 shrink-0">
        <div class="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg cursor-text">
          <svg class="w-3 h-3 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/>
          </svg>
          <span class="text-xs text-zinc-400 flex-1">Search</span>
          <span class="text-[10px] text-zinc-400 bg-zinc-200 px-1 py-0.5 rounded font-mono">⌘/</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-2 py-2 flex flex-col gap-0.5 overflow-y-auto">

        <button
          v-for="item in navItems" :key="item.id"
          @click="activeNav = item.id; sidebarOpen = false"
          :class="[
            'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-all duration-150',
            activeNav === item.id
              ? 'bg-violet-50 text-violet-700 font-medium'
              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
          ]"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon"/>
          </svg>
          {{ item.label }}
        </button>

        <!-- Spend (expandable) -->
        <div>
          <button
            @click="spendExpanded = !spendExpanded"
            class="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-150"
          >
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z"/>
            </svg>
            Spend
            <svg
              class="w-3 h-3 ml-auto transition-transform duration-200"
              :class="spendExpanded ? 'rotate-180' : ''"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" stroke-linecap="round"/>
            </svg>
          </button>
          <Transition
            enter-active-class="transition-all duration-200"
            leave-active-class="transition-all duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="spendExpanded" class="ml-3.5 pl-3 border-l border-zinc-200 flex flex-col gap-0.5 mt-0.5">
              <button class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all text-left">Expenses</button>
              <button class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all text-left">Transactions</button>
            </div>
          </Transition>
        </div>

        <button
          v-for="item in bottomNavItems" :key="item.id"
          @click="activeNav = item.id; sidebarOpen = false"
          :class="[
            'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-all duration-150',
            activeNav === item.id
              ? 'bg-violet-50 text-violet-700 font-medium'
              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
          ]"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon"/>
          </svg>
          {{ item.label }}
        </button>

      </nav>

      <!-- Bottom: links + plan card -->
      <div class="border-t border-zinc-200 p-2.5 flex flex-col gap-0.5 shrink-0">
        <button class="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all text-left w-full">
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          Documentation
        </button>
        <button class="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all text-left w-full">
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
          </svg>
          Help &amp; Support
        </button>

        <!-- Plan card -->
        <div class="mt-1.5 p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
          <p class="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Your Starter Plan</p>
          <p class="text-xs font-bold text-zinc-800">Free Trial</p>
          <p class="text-[11px] text-zinc-500 mb-2">14 days remaining</p>
          <div class="h-1 bg-zinc-200 rounded-full mb-3 overflow-hidden">
            <div class="h-full bg-violet-500 rounded-full" style="width:67%" />
          </div>
          <button class="w-full py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="m13 2.05-9.95 11H10l-1 8.95 9.95-11H12l1-8.95z"/>
            </svg>
            Upgrade
          </button>
          <p class="text-[10px] text-zinc-400 text-center mt-2">Access on Mobile</p>
        </div>
      </div>
    </aside>

    <!-- ── Main ─────────────────────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col min-w-0 bg-zinc-50/60 overflow-hidden">

      <!-- Top bar -->
      <header class="h-12 bg-white border-b border-zinc-200 flex items-center px-4 sm:px-6 gap-3 shrink-0">
        <button
          class="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors"
          @click="sidebarOpen = true"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <nav class="flex items-center gap-1.5 text-sm">
          <button class="text-zinc-400 hover:text-zinc-700 transition-colors">Productions</button>
          <svg class="w-3 h-3 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6" stroke-linecap="round"/>
          </svg>
          <span class="text-zinc-800 font-medium">Overview</span>
        </nav>

        <div class="flex items-center gap-2 ml-auto">
          <button class="px-3 py-1.5 text-sm text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 hover:border-zinc-300 transition-all">Share</button>
          <button class="px-3 py-1.5 text-sm text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 hover:border-zinc-300 transition-all">Invite</button>
        </div>
      </header>

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 max-w-[1400px] mx-auto flex flex-col gap-4">

          <!-- Project header -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <div class="flex flex-col gap-1.5">
              <h1 class="text-xl font-bold text-zinc-900 tracking-tight">Nightjar S2</h1>
              <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span class="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md uppercase tracking-wide">In Production</span>
                <span class="text-[11px] text-zinc-400 font-medium">DAY 24 of 48</span>
                <span class="hidden sm:block w-px h-3 bg-zinc-200" />
                <span class="text-[11px] text-zinc-400 font-medium">DRAMA SERIES</span>
                <span class="hidden sm:block w-px h-3 bg-zinc-200" />
                <span class="text-[11px] text-zinc-400 font-medium">8 EPISODES</span>
              </div>
            </div>
            <div class="flex items-center gap-2 sm:ml-auto flex-wrap">
              <button class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                <svg class="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                Today
              </button>
              <button class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                18 February
                <svg class="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round"/></svg>
              </button>
              <button class="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shadow-violet-200">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                </svg>
                Export Data
              </button>
            </div>
          </div>

          <!-- Stat cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <!-- Crew Payments -->
            <div class="stat-card bg-white border border-zinc-200 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Crew Payments</p>
                <button class="ml-auto w-5 h-5 flex items-center justify-center text-zinc-300 hover:text-zinc-500 transition-colors">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-[11px] text-zinc-500 mb-1">Pending</p>
                  <p class="text-2xl font-bold text-zinc-900 tabular-nums leading-none">{{ fmt(c.crewPending) }}</p>
                  <p class="text-sm text-zinc-600 font-medium tabular-nums mt-0.5">{{ fmtUSD(c.crewPendingAmt) }}</p>
                  <p class="text-[11px] text-red-500 mt-1 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m18 15-6 6-6-6M12 3v18"/></svg>
                    vs. 10,820 last period
                  </p>
                </div>
                <div>
                  <p class="text-[11px] text-zinc-500 mb-1">Paid</p>
                  <p class="text-2xl font-bold text-zinc-900 tabular-nums leading-none">{{ fmt(c.crewPaid) }}</p>
                  <p class="text-sm text-zinc-600 font-medium tabular-nums mt-0.5">{{ fmtUSD(c.crewPaidAmt) }}</p>
                  <p class="text-[11px] text-emerald-600 mt-1 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m18 9-6-6-6 6M12 3v18"/></svg>
                    vs. 9,760 last period
                  </p>
                </div>
              </div>
            </div>

            <!-- Supplier Invoices -->
            <div class="stat-card bg-white border border-zinc-200 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                </svg>
                <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Supplier Invoices</p>
                <button class="ml-auto w-5 h-5 flex items-center justify-center text-zinc-300 hover:text-zinc-500 transition-colors">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-[11px] text-zinc-500 mb-1">Pending</p>
                  <p class="text-2xl font-bold text-zinc-900 tabular-nums leading-none">{{ fmt(c.suppPending) }}</p>
                  <p class="text-sm text-zinc-600 font-medium tabular-nums mt-0.5">{{ fmtUSD(c.suppPendingAmt) }}</p>
                  <p class="text-[11px] text-red-500 mt-1 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m18 15-6 6-6-6M12 3v18"/></svg>
                    vs. 10,820 last period
                  </p>
                </div>
                <div>
                  <p class="text-[11px] text-zinc-500 mb-1">Approved</p>
                  <p class="text-2xl font-bold text-zinc-900 tabular-nums leading-none">{{ fmt(c.suppApproved) }}</p>
                  <p class="text-sm text-zinc-600 font-medium tabular-nums mt-0.5">{{ fmtUSD(c.suppApprovedAmt) }}</p>
                  <p class="text-[11px] text-emerald-600 mt-1 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m18 9-6-6-6 6M12 3v18"/></svg>
                    vs. 8,420 last period
                  </p>
                </div>
              </div>
            </div>

            <!-- Expense Claims -->
            <div class="stat-card bg-white border border-zinc-200 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z"/>
                </svg>
                <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Expense Claims</p>
                <button class="ml-auto w-5 h-5 flex items-center justify-center text-zinc-300 hover:text-zinc-500 transition-colors">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-[11px] text-zinc-500 mb-1">Submitted</p>
                  <p class="text-2xl font-bold text-zinc-900 tabular-nums leading-none">{{ fmt(c.expSubmitted) }}</p>
                  <p class="text-sm text-zinc-600 font-medium tabular-nums mt-0.5">{{ fmtUSD(c.expSubmittedAmt) }}</p>
                  <p class="text-[11px] text-red-500 mt-1 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m18 15-6 6-6-6M12 3v18"/></svg>
                    vs. 13,900 last period
                  </p>
                </div>
                <div>
                  <p class="text-[11px] text-zinc-500 mb-1">Approved</p>
                  <p class="text-2xl font-bold text-zinc-900 tabular-nums leading-none">{{ fmt(c.expApproved) }}</p>
                  <p class="text-sm text-zinc-600 font-medium tabular-nums mt-0.5">{{ fmtUSD(c.expApprovedAmt) }}</p>
                  <p class="text-[11px] text-emerald-600 mt-1 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m18 9-6-6-6 6M12 3v18"/></svg>
                    vs. 38,250 last period
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- Two-column layout -->
          <div class="grid grid-cols-1 xl:grid-cols-[1fr_316px] gap-4 items-start">

            <!-- ── Left column ──────────────────────────────────────────────── -->
            <div class="flex flex-col gap-4">

              <!-- Cost report -->
              <div class="main-panel bg-white border border-zinc-200 rounded-xl p-5">
                <div class="flex items-start justify-between gap-3 mb-1 flex-wrap">
                  <div>
                    <h2 class="text-sm font-bold text-zinc-900">Cost report</h2>
                    <p class="text-xs text-zinc-400 mt-0.5">Track production spending against approved budgets.</p>
                  </div>
                  <select class="text-xs bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-zinc-600 focus:outline-none focus:border-violet-400 cursor-pointer">
                    <option>This year</option>
                    <option>Last year</option>
                    <option>Last 6 months</option>
                  </select>
                </div>

                <div class="flex items-baseline gap-2 mt-3 mb-5 flex-wrap">
                  <span class="text-2xl font-bold text-zinc-900 tabular-nums">{{ fmtUSD(c.totalSpend) }}</span>
                  <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">+$24,860 (+15.6%) vs last month</span>
                </div>

                <!-- Bar chart -->
                <div class="relative" @mouseleave="tooltipIdx = null">
                  <div class="flex items-end gap-1 sm:gap-1.5 h-28">
                    <div
                      v-for="(bar, i) in barData" :key="i"
                      class="flex-1 flex flex-col items-center relative group cursor-pointer"
                      @mouseenter="tooltipIdx = i"
                    >
                      <Transition
                        enter-active-class="transition-all duration-150"
                        leave-active-class="transition-all duration-100"
                        enter-from-class="opacity-0 scale-95 -translate-y-1"
                        leave-to-class="opacity-0 scale-95"
                      >
                        <div
                          v-if="tooltipIdx === i"
                          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 bg-zinc-900 text-white rounded-xl px-3 py-2.5 shadow-xl whitespace-nowrap text-xs pointer-events-none"
                        >
                          <p class="font-medium text-zinc-400 text-[11px]">{{ bar.label }}</p>
                          <p class="font-bold text-white">${{ bar.value.toLocaleString() }}</p>
                          <p class="text-zinc-400 text-[10px]">Production spend</p>
                          <div class="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-900" />
                        </div>
                      </Transition>
                      <div
                        class="bar-fill w-full rounded-t-md transition-colors duration-200"
                        :class="bar.active
                          ? 'bg-violet-500 group-hover:bg-violet-600'
                          : 'bg-zinc-200 group-hover:bg-zinc-300'"
                        :style="`height: ${(bar.value / maxBarValue) * 100}%`"
                      />
                    </div>
                  </div>
                  <div class="flex justify-between mt-2">
                    <span class="text-[10px] text-zinc-400">25 Feb 2026</span>
                    <span class="text-[10px] text-zinc-400">25 Mar 2027</span>
                  </div>
                </div>
              </div>

              <!-- Cost centres -->
              <div class="main-panel bg-white border border-zinc-200 rounded-xl p-5">
                <div class="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 class="text-sm font-bold text-zinc-900">Cost centres</h2>
                    <p class="text-xs text-zinc-400 mt-0.5">View budget allocation by cost centre.</p>
                  </div>
                  <button class="px-2.5 py-1.5 text-xs font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors shrink-0">Manage</button>
                </div>

                <!-- Stacked bar -->
                <div class="h-2 rounded-full overflow-hidden flex mb-3">
                  <div
                    v-for="cc in costCentres" :key="cc.name"
                    :style="`width:${cc.pct}%; background:${cc.color}`"
                    class="h-full first:rounded-l-full last:rounded-r-full"
                  />
                </div>

                <!-- Legend -->
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4">
                  <div v-for="cc in costCentres" :key="cc.name" class="flex items-center gap-1.5">
                    <div class="w-2 h-2 rounded-full shrink-0" :style="`background:${cc.color}`" />
                    <span class="text-xs text-zinc-600">{{ cc.name }}</span>
                    <span class="text-xs font-bold text-zinc-800">{{ cc.pct }}%</span>
                  </div>
                </div>

                <!-- Table -->
                <div class="border border-zinc-200 rounded-xl overflow-hidden">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-b border-zinc-200 bg-zinc-50/80">
                        <th class="text-left px-4 py-2.5 font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">Name</th>
                        <th class="text-left px-4 py-2.5 font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">Category</th>
                        <th class="text-right px-4 py-2.5 font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(cc, i) in costCentres" :key="cc.name"
                        class="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/80 cursor-pointer transition-colors group"
                        @click="toggleRow(i)"
                      >
                        <td class="px-4 py-3">
                          <div class="flex items-center gap-2">
                            <svg
                              class="w-3 h-3 text-zinc-400 transition-transform duration-200 shrink-0"
                              :class="expandedRows.has(i) ? 'rotate-90' : ''"
                              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            >
                              <path d="m9 18 6-6-6-6" stroke-linecap="round"/>
                            </svg>
                            <div class="w-2 h-2 rounded-full shrink-0" :style="`background:${cc.color}`" />
                            <span class="font-semibold text-zinc-800 group-hover:text-zinc-900">{{ cc.name }}</span>
                            <span class="text-zinc-400">{{ cc.count }}</span>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-zinc-500">{{ cc.category }}</td>
                        <td class="px-4 py-3 text-right font-semibold text-zinc-800 tabular-nums">
                          ${{ cc.value.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- ── Right column ─────────────────────────────────────────────── -->
            <div class="flex flex-col gap-4">

              <!-- Production health -->
              <div class="main-panel bg-white border border-zinc-200 rounded-xl p-5">
                <div class="flex items-start justify-between gap-2 mb-4 flex-wrap">
                  <div>
                    <h2 class="text-sm font-bold text-zinc-900">Production health</h2>
                    <p class="text-xs text-zinc-400 mt-0.5">Snapshot of your production's financial health.</p>
                  </div>
                  <button class="flex items-center gap-1 text-xs text-zinc-600 border border-zinc-200 rounded-lg px-2.5 py-1.5 hover:bg-zinc-50 transition-colors shrink-0">
                    Primary Wallet
                    <svg class="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round"/></svg>
                  </button>
                </div>

                <div class="flex items-end justify-between gap-3">
                  <div>
                    <p class="text-[11px] text-zinc-400 mb-0.5">Budget remaining</p>
                    <div class="flex items-center gap-1.5">
                      <p class="text-lg font-bold text-zinc-900 tabular-nums leading-snug">$184,250 USD</p>
                      <svg class="w-3.5 h-3.5 text-zinc-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                      </svg>
                    </div>
                    <p class="text-[11px] text-zinc-400 mt-0.5">1 USD = 17,865.00 IDR</p>
                  </div>
                  <!-- Sparkline -->
                  <svg viewBox="0 0 80 36" class="w-20 h-9 shrink-0" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="ph-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,30 L10,26 L20,28 L30,22 L42,16 L54,10 L66,6 L80,2 L80,36 L0,36 Z" fill="url(#ph-grad)"/>
                    <polyline points="0,30 10,26 20,28 30,22 42,16 54,10 66,6 80,2" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <!-- Action buttons -->
                <div class="grid grid-cols-2 gap-2 mt-4">
                  <button class="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors">
                    <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Allocate
                  </button>
                  <button class="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors">
                    <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/>
                    </svg>
                    Request
                  </button>
                  <button class="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors">
                    <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    </svg>
                    Pay supplier
                  </button>
                  <button class="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors">
                    <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                      <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                    </svg>
                    Export cost
                  </button>
                </div>
              </div>

              <!-- Budget burn -->
              <div class="main-panel bg-white border border-zinc-200 rounded-xl p-5">
                <h2 class="text-sm font-bold text-zinc-900">Budget burn</h2>
                <p class="text-xs text-zinc-400 mt-0.5 mb-4">How much of the budget has been spent.</p>

                <div class="flex items-center gap-5">
                  <!-- Arc -->
                  <div class="relative shrink-0 w-[96px] h-[96px]">
                    <svg viewBox="0 0 120 120" class="w-full h-full" style="transform:rotate(-90deg)">
                      <circle cx="60" cy="60" :r="ARC_R" fill="none" stroke="#f4f4f5" stroke-width="12"/>
                      <circle
                        cx="60" cy="60" :r="ARC_R" fill="none"
                        stroke="#7c3aed" stroke-width="12" stroke-linecap="round"
                        :stroke-dasharray="`${arcDash} ${arcGap}`"
                        class="transition-all duration-700"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <p class="text-xl font-bold text-zinc-900 tabular-nums leading-none">{{ Math.round(c.arcPct) }}%</p>
                      <p class="text-[11px] text-zinc-400 mt-0.5">Spent</p>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[11px] text-zinc-400 mb-0.5">Budget used</p>
                    <p class="text-base font-bold text-zinc-900 tabular-nums">$65,750</p>
                    <p class="text-xs text-zinc-400">of $250,000 USD</p>
                    <div class="mt-3 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-violet-500 rounded-full transition-all duration-700"
                        :style="`width:${Math.round(c.arcPct)}%`"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upcoming payments -->
              <div class="main-panel bg-white border border-zinc-200 rounded-xl p-5">
                <div class="flex items-start justify-between gap-2 mb-3 flex-wrap">
                  <div>
                    <h2 class="text-sm font-bold text-zinc-900">Upcoming payments</h2>
                    <p class="text-xs text-zinc-400 mt-0.5">Crew and vendor run for this week.</p>
                  </div>
                  <button class="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors shrink-0">
                    <svg class="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                    </svg>
                    Download report
                  </button>
                </div>

                <div class="mb-3 pb-3 border-b border-zinc-100">
                  <p class="text-[11px] text-zinc-400">Due this week</p>
                  <div class="flex items-baseline gap-2 mt-0.5">
                    <p class="text-xl font-bold text-zinc-900 tabular-nums">$205,120</p>
                    <button class="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">5 payees →</button>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <div
                    v-for="(pay, i) in upcomingPayments" :key="i"
                    class="pay-row flex items-center gap-3 p-2.5 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 cursor-pointer transition-all group"
                  >
                    <div
                      class="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                      :class="[
                        i === 0 ? 'bg-violet-100' :
                        i === 1 ? 'bg-sky-100' :
                        i === 2 ? 'bg-amber-100' : 'bg-zinc-100'
                      ]"
                    >
                      <!-- crew -->
                      <svg v-if="pay.icon === 'crew'" class="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <!-- camera -->
                      <svg v-else-if="pay.icon === 'camera'" class="w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                        <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                      </svg>
                      <!-- location -->
                      <svg v-else-if="pay.icon === 'location'" class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <!-- food -->
                      <svg v-else class="w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
                      </svg>
                    </div>

                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-semibold text-zinc-900 truncate group-hover:text-zinc-700 transition-colors">{{ pay.name }}</p>
                      <p class="text-[11px] text-zinc-400 truncate">{{ pay.sub }}</p>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                      <span
                        class="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        :class="pay.badgeColor === 'orange'
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-sky-100 text-sky-700 border border-sky-200'"
                      >{{ pay.badge }}</span>
                      <span class="text-xs font-bold text-zinc-800 tabular-nums">${{ pay.amount.toLocaleString() }}</span>
                    </div>
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
