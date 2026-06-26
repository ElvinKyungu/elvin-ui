<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

// ─── Navigation ───────────────────────────────────────────────────────────────
const navMain = [
  { id: 'productions', label: 'Productions', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4' },
  { id: 'budget',      label: 'Budget',      icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { id: 'payments',    label: 'Payments',    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z' },
  { id: 'transfers',   label: 'Transfers',   icon: 'M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4' },
]
const navBottom = [
  { id: 'analytics', label: 'Analytics', icon: 'M18 20V10M12 20V4M6 20v-6' },
  { id: 'crew',      label: 'Crew',      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id: 'settings',  label: 'Settings',  icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
]

// ─── Bar chart data ───────────────────────────────────────────────────────────
const barData = [
  { label: '25 Feb 2026', value: 11200,  delta: '+$1,840',  pct: '+19.6%' },
  { label: '25 Mar 2026', value: 16800,  delta: '+$5,600',  pct: '+50.0%' },
  { label: '25 Apr 2026', value: 9400,   delta: '-$7,400',  pct: '-44.0%' },
  { label: '25 May 2026', value: 21500,  delta: '+$12,100', pct: '+128.7%' },
  { label: '14 Jun 2026', value: 183920, delta: '+$4,230',  pct: '+2.4%',   active: true },
  { label: '25 Jul 2026', value: 29000,  delta: '+$7,500',  pct: '+25.9%' },
  { label: '25 Aug 2026', value: 23400,  delta: '-$5,600',  pct: '-19.3%' },
  { label: '25 Sep 2026', value: 17600,  delta: '-$5,800',  pct: '-24.8%' },
  { label: '25 Oct 2026', value: 21000,  delta: '+$3,400',  pct: '+19.3%' },
  { label: '25 Nov 2026', value: 27200,  delta: '+$6,200',  pct: '+29.5%' },
  { label: '25 Dec 2026', value: 18900,  delta: '-$8,300',  pct: '-30.5%' },
  { label: '25 Jan 2027', value: 13600,  delta: '-$5,300',  pct: '-28.0%' },
]
const maxBar = computed(() => Math.max(...barData.map(b => b.value)))

// ─── Cost centres ─────────────────────────────────────────────────────────────
const centres = [
  { name: 'Camera Department', count: 4, category: 'Equipment rental', value: 84520.40,  color: '#6366f1', pct: 34.1 },
  { name: 'Production',        count: 7, category: 'Crew coast',       value: 127840.75, color: '#22c55e', pct: 31.2 },
  { name: 'Lighting & grip',   count: 5, category: 'Set and props',    value: 61790.60,  color: '#60a5fa', pct: 18.2 },
  { name: 'Art dept.',         count: 3, category: 'Equipment',        value: 117225.90, color: '#94a3b8', pct: 16.5 },
]

// ─── Upcoming payments ────────────────────────────────────────────────────────
const payments = [
  { name: 'Cast & Crew Payroll', sub: '64 people · Unit A', amount: 128400, badge: 'DUE TODAY', urgent: true,  icon: 'crew'     },
  { name: 'Panavision Asia',     sub: 'Camera & lenses',    amount: 42180,  badge: 'FRI',       urgent: false, icon: 'camera'   },
  { name: 'Bali Location Fees',  sub: 'Location · Permits', amount: 18500,  badge: 'MON',       urgent: true,  icon: 'location' },
  { name: 'Mse Kitchen',         sub: 'Craft & catering',   amount: 9240,   badge: 'FRI',       urgent: false, icon: 'food'     },
]

// ─── UI state ─────────────────────────────────────────────────────────────────
const activeNav    = ref('productions')
const sidebarOpen  = ref(false)
const spendOpen    = ref(true)
const tooltipIdx   = ref<number | null>(null)
const expandedRows = ref(new Set<number>())
const periodLabel  = ref('This year')
const showPeriod   = ref(false)
const toast        = ref('')

// ─── Animated counters ────────────────────────────────────────────────────────
const ctr = reactive({
  cpPending: 0, cpPendingAmt: 0, cpPaid: 0, cpPaidAmt: 0,
  siPending: 0, siPendingAmt: 0, siApproved: 0, siApprovedAmt: 0,
  ecSubmit: 0,  ecSubmitAmt: 0,  ecApproved: 0, ecApprovedAmt: 0,
  totalSpend: 0, burnPct: 0,
})

// ─── Budget burn arc (SVG) ────────────────────────────────────────────────────
const ARC_R = 46
const ARC_C = 2 * Math.PI * ARC_R
const arcDash = computed(() => `${(ctr.burnPct / 100) * ARC_C} ${ARC_C}`)

// ─── Helpers ──────────────────────────────────────────────────────────────────
const n   = (v: number) => Math.round(v).toLocaleString('en-US')
const usd = (v: number) => '$' + Math.round(v).toLocaleString('en-US')

function toggleRow(i: number) {
  expandedRows.value.has(i) ? expandedRows.value.delete(i) : expandedRows.value.add(i)
}

function selectPeriod(p: string) {
  periodLabel.value = p
  showPeriod.value = false
}

function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 2400)
}

// ─── GSAP ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.to(ctr, {
    cpPending: 12, cpPendingAmt: 28450, cpPaid: 86, cpPaidAmt: 412750,
    siPending: 8,  siPendingAmt: 62130, siApproved: 47, siApprovedAmt: 286420,
    ecSubmit: 15,  ecSubmitAmt: 7820,   ecApproved: 92, ecApprovedAmt: 64210,
    totalSpend: 184250, burnPct: 26,
    duration: 1.6, ease: 'power2.out', delay: 0.1,
  })
  gsap.from('.kpi',   { y: 14, opacity: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out', delay: 0.05 })
  gsap.from('.panel', { y: 18, opacity: 0, duration: 0.5,  stagger: 0.08, ease: 'power3.out', delay: 0.3  })
  gsap.from('.bar',   { scaleY: 0, transformOrigin: '50% 100%', duration: 0.65, stagger: 0.04, ease: 'power3.out', delay: 0.5 })
  gsap.from('.prow',  { x: -12, opacity: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', delay: 0.7 })
})
onUnmounted(() => gsap.killTweensOf([ctr, '.kpi', '.panel', '.bar', '.prow']))
</script>

<template>
  <div
    class="flex h-screen overflow-hidden text-zinc-900 select-none"
    style="font-family:Inter,system-ui,sans-serif;background:#f4f4f6"
    @click="showPeriod = false"
  >

    <!-- ── Toast ─────────────────────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-2"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="toast" class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-xl shadow-xl">
        <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        {{ toast }}
      </div>
    </Transition>

    <!-- ── Mobile overlay ────────────────────────────────────────────────── -->
    <Transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="sidebarOpen" class="fixed inset-0 z-20 bg-black/30 lg:hidden" @click="sidebarOpen = false" />
    </Transition>

    <!-- ══════════════════════════════════════════════════════════════════════
         SIDEBAR
    ════════════════════════════════════════════════════════════════════════ -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-30 flex flex-col shrink-0 transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      style="width:210px;background:#fff;border-right:1px solid #e5e7eb"
    >
      <!-- Logo row -->
      <div class="flex items-center gap-2.5 px-4 shrink-0" style="height:44px;border-bottom:1px solid #e5e7eb">
        <div class="flex items-center justify-center rounded-lg shrink-0" style="width:28px;height:28px;background:#7c3aed">
          <svg viewBox="0 0 16 16" fill="#fff" style="width:14px;height:14px">
            <rect x="1" y="1" width="5.5" height="5.5" rx="1"/>
            <rect x="9.5" y="1" width="5.5" height="5.5" rx="1"/>
            <rect x="1" y="9.5" width="5.5" height="5.5" rx="1"/>
            <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1"/>
          </svg>
        </div>
        <span style="font-size:14px;font-weight:700;color:#111827;letter-spacing:-0.3px">Backlot</span>
        <button class="ml-auto text-zinc-400 hover:text-zinc-600 transition-colors" @click="sidebarOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="width:15px;height:15px">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Search -->
      <div class="px-3 py-2 shrink-0" style="border-bottom:1px solid #f3f4f6">
        <div class="flex items-center gap-2 px-2.5 rounded-md cursor-text" style="height:30px;background:#f9fafb;border:1px solid #e5e7eb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;color:#9ca3af;flex-shrink:0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/>
          </svg>
          <span style="font-size:12px;color:#9ca3af;flex:1">Search</span>
          <span style="font-size:10px;color:#9ca3af;background:#e5e7eb;padding:1px 4px;border-radius:4px;font-family:monospace">⌘/</span>
        </div>
      </div>

      <!-- Nav items -->
      <nav class="flex-1 overflow-y-auto px-2 py-2">
        <!-- Main nav -->
        <button
          v-for="item in navMain" :key="item.id"
          @click="activeNav = item.id; sidebarOpen = false"
          class="flex items-center gap-2.5 w-full rounded-lg transition-all duration-150 text-left"
          style="padding:7px 10px;margin-bottom:2px;font-size:13px"
          :style="activeNav === item.id
            ? 'background:#f5f3ff;color:#6d28d9;font-weight:500'
            : 'color:#4b5563;font-weight:400'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0">
            <path :d="item.icon"/>
          </svg>
          {{ item.label }}
        </button>

        <!-- Spend (expandable) -->
        <button
          @click="spendOpen = !spendOpen"
          class="flex items-center gap-2.5 w-full rounded-lg transition-all duration-150 text-left"
          style="padding:7px 10px;margin-bottom:2px;font-size:13px;color:#4b5563"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:15px;height:15px;flex-shrink:0">
            <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z"/>
          </svg>
          Spend
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;margin-left:auto;transition:transform .2s" :style="spendOpen ? 'transform:rotate(180deg)' : ''">
            <path d="m6 9 6 6 6-6" stroke-linecap="round"/>
          </svg>
        </button>
        <Transition
          enter-active-class="transition-all duration-200 overflow-hidden"
          leave-active-class="transition-all duration-200 overflow-hidden"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div v-if="spendOpen" class="mb-1" style="padding-left:14px;border-left:2px solid #e5e7eb;margin-left:17px">
            <button class="flex items-center w-full rounded-md transition-colors" style="padding:5px 8px;font-size:12px;color:#6b7280" @click="activeNav='expenses'">Expenses</button>
            <button class="flex items-center w-full rounded-md transition-colors" style="padding:5px 8px;font-size:12px;color:#6b7280" @click="activeNav='transactions'">Transactions</button>
          </div>
        </Transition>

        <!-- Bottom nav -->
        <div style="margin-top:4px">
          <button
            v-for="item in navBottom" :key="item.id"
            @click="activeNav = item.id; sidebarOpen = false"
            class="flex items-center gap-2.5 w-full rounded-lg transition-all duration-150 text-left"
            style="padding:7px 10px;margin-bottom:2px;font-size:13px"
            :style="activeNav === item.id
              ? 'background:#f5f3ff;color:#6d28d9;font-weight:500'
              : 'color:#4b5563'"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0">
              <path :d="item.icon"/>
            </svg>
            {{ item.label }}
          </button>
        </div>
      </nav>

      <!-- Bottom: docs, support, plan card -->
      <div class="shrink-0 px-2 py-2" style="border-top:1px solid #e5e7eb">
        <button class="flex items-center gap-2.5 w-full rounded-lg transition-colors" style="padding:7px 10px;font-size:12px;color:#6b7280;margin-bottom:1px">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:14px;height:14px;flex-shrink:0">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          Documentation
        </button>
        <button class="flex items-center gap-2.5 w-full rounded-lg transition-colors" style="padding:7px 10px;font-size:12px;color:#6b7280;margin-bottom:6px">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:14px;height:14px;flex-shrink:0">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
          </svg>
          Help &amp; Support
        </button>

        <!-- Plan card -->
        <div class="rounded-xl p-3" style="background:#f9fafb;border:1px solid #ede9fe">
          <p style="font-size:9px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Your Starter Plan</p>
          <p style="font-size:12px;font-weight:600;color:#374151">Free Trial</p>
          <p style="font-size:11px;color:#9ca3af;margin-bottom:6px">14 days remaining</p>
          <div class="rounded-full overflow-hidden" style="height:5px;background:#e5e7eb;margin-bottom:8px">
            <div class="h-full rounded-full" style="width:67%;background:linear-gradient(to right,#8b5cf6,#7c3aed)"/>
          </div>
          <button
            @click="showToast('Opening upgrade page…')"
            class="w-full flex items-center justify-center gap-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
            style="padding:6px;background:#7c3aed;color:#fff;font-size:12px;font-weight:600"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:12px;height:12px">
              <path d="m13 2.05-9.95 11H10l-1 8.95 9.95-11H12l1-8.95z"/>
            </svg>
            Upgrade
          </button>
          <p style="font-size:10px;color:#9ca3af;text-align:center;margin-top:6px">Access on Mobile</p>
        </div>
      </div>
    </aside>

    <!-- ══════════════════════════════════════════════════════════════════════
         MAIN CONTENT
    ════════════════════════════════════════════════════════════════════════ -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden" style="background:#f4f4f6">

      <!-- Top bar -->
      <header class="flex items-center gap-3 px-5 shrink-0" style="height:44px;background:#fff;border-bottom:1px solid #e5e7eb">
        <button class="lg:hidden flex items-center justify-center rounded-lg transition-colors hover:bg-zinc-100" style="width:32px;height:32px" @click="sidebarOpen = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="width:16px;height:16px"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5" style="font-size:13px">
          <button class="transition-colors hover:text-zinc-600" style="color:#9ca3af">Productions</button>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;color:#d1d5db"><path d="m9 18 6-6-6-6" stroke-linecap="round"/></svg>
          <span style="color:#111827;font-weight:500">Overview</span>
        </div>
        <div class="flex items-center gap-2 ml-auto">
          <button
            @click.stop="showToast('Share link copied!')"
            class="rounded-lg transition-all hover:bg-zinc-50"
            style="padding:5px 12px;font-size:13px;color:#374151;border:1px solid #e5e7eb"
          >Share</button>
          <button
            @click.stop="showToast('Invite sent!')"
            class="rounded-lg transition-all hover:bg-zinc-50"
            style="padding:5px 12px;font-size:13px;color:#374151;border:1px solid #e5e7eb"
          >Invite</button>
        </div>
      </header>

      <!-- Scrollable -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden">
        <div class="p-5 flex flex-col gap-4" style="max-width:1400px;margin:0 auto">

          <!-- Project header -->
          <div class="flex flex-wrap items-start gap-3">
            <div>
              <h1 style="font-size:18px;font-weight:700;color:#111827;letter-spacing:-.3px;line-height:1.2">Nightjar S2</h1>
              <div class="flex flex-wrap items-center gap-2 mt-1.5">
                <span class="rounded-md" style="font-size:10px;font-weight:700;color:#059669;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 7px;letter-spacing:.05em">IN PRODUCTION</span>
                <span style="font-size:11px;color:#6b7280;font-weight:500">DAY 24 of 48</span>
                <span style="color:#d1d5db;font-size:11px">·</span>
                <span style="font-size:11px;color:#6b7280;font-weight:500">DRAMA SERIES</span>
                <span style="color:#d1d5db;font-size:11px">·</span>
                <span style="font-size:11px;color:#6b7280;font-weight:500">8 EPISODES</span>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-auto flex-wrap">
              <button class="flex items-center gap-1.5 rounded-lg transition-all hover:bg-zinc-50" style="padding:5px 10px;font-size:12px;color:#374151;border:1px solid #e5e7eb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;color:#9ca3af"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Today
              </button>
              <button class="flex items-center gap-1 rounded-lg transition-all hover:bg-zinc-50" style="padding:5px 10px;font-size:12px;color:#374151;border:1px solid #e5e7eb">
                18 February
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px;color:#9ca3af"><path d="m6 9 6 6 6-6" stroke-linecap="round"/></svg>
              </button>
              <button
                @click.stop="showToast('Exporting data…')"
                class="flex items-center gap-1.5 rounded-lg transition-all active:scale-95 hover:opacity-90"
                style="padding:5px 12px;font-size:12px;font-weight:600;color:#fff;background:#7c3aed;box-shadow:0 1px 4px rgba(124,58,237,.3)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:13px;height:13px">
                  <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                </svg>
                Export Data
              </button>
            </div>
          </div>

          <!-- KPI cards -->
          <div class="grid gap-3" style="grid-template-columns:repeat(3,1fr)">

            <!-- Crew Payments -->
            <div class="kpi rounded-xl p-4" style="background:#fff;border:1px solid #e5e7eb">
              <div class="flex items-center gap-2 mb-3" style="border-bottom:1px solid #f3f4f6;padding-bottom:10px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:14px;height:14px;color:#9ca3af;flex-shrink:0">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.08em">Crew Payments</span>
                <button @click.stop="showToast('New crew payment added')" class="ml-auto flex items-center justify-center rounded-md transition-all hover:bg-zinc-100 active:scale-90" style="width:20px;height:20px;border:1px solid #e5e7eb">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:10px;height:10px;color:#9ca3af"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                </button>
              </div>
              <div class="grid gap-4" style="grid-template-columns:1fr 1fr">
                <div>
                  <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Pending</p>
                  <p class="tabular-nums" style="font-size:22px;font-weight:700;color:#111827;line-height:1">{{ n(ctr.cpPending) }}</p>
                  <p class="tabular-nums" style="font-size:12px;color:#374151;font-weight:500;margin-top:2px">{{ usd(ctr.cpPendingAmt) }}</p>
                  <p class="flex items-center gap-0.5" style="font-size:10.5px;color:#ef4444;margin-top:4px">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0"><path d="m18 15-6 6-6-6M12 3v18"/></svg>
                    vs. 10,820 last period
                  </p>
                </div>
                <div>
                  <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Paid</p>
                  <p class="tabular-nums" style="font-size:22px;font-weight:700;color:#111827;line-height:1">{{ n(ctr.cpPaid) }}</p>
                  <p class="tabular-nums" style="font-size:12px;color:#374151;font-weight:500;margin-top:2px">{{ usd(ctr.cpPaidAmt) }}</p>
                  <p class="flex items-center gap-0.5" style="font-size:10.5px;color:#059669;margin-top:4px">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0"><path d="m18 9-6-6-6 6M12 3v18"/></svg>
                    vs. 9,760 last period
                  </p>
                </div>
              </div>
            </div>

            <!-- Supplier Invoices -->
            <div class="kpi rounded-xl p-4" style="background:#fff;border:1px solid #e5e7eb">
              <div class="flex items-center gap-2 mb-3" style="border-bottom:1px solid #f3f4f6;padding-bottom:10px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:14px;height:14px;color:#9ca3af;flex-shrink:0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                </svg>
                <span style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.08em">Supplier Invoices</span>
                <button @click.stop="showToast('New invoice added')" class="ml-auto flex items-center justify-center rounded-md transition-all hover:bg-zinc-100 active:scale-90" style="width:20px;height:20px;border:1px solid #e5e7eb">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:10px;height:10px;color:#9ca3af"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                </button>
              </div>
              <div class="grid gap-4" style="grid-template-columns:1fr 1fr">
                <div>
                  <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Pending</p>
                  <p class="tabular-nums" style="font-size:22px;font-weight:700;color:#111827;line-height:1">{{ n(ctr.siPending) }}</p>
                  <p class="tabular-nums" style="font-size:12px;color:#374151;font-weight:500;margin-top:2px">{{ usd(ctr.siPendingAmt) }}</p>
                  <p class="flex items-center gap-0.5" style="font-size:10.5px;color:#ef4444;margin-top:4px">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0"><path d="m18 15-6 6-6-6M12 3v18"/></svg>
                    vs. 10,820 last period
                  </p>
                </div>
                <div>
                  <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Approved</p>
                  <p class="tabular-nums" style="font-size:22px;font-weight:700;color:#111827;line-height:1">{{ n(ctr.siApproved) }}</p>
                  <p class="tabular-nums" style="font-size:12px;color:#374151;font-weight:500;margin-top:2px">{{ usd(ctr.siApprovedAmt) }}</p>
                  <p class="flex items-center gap-0.5" style="font-size:10.5px;color:#059669;margin-top:4px">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0"><path d="m18 9-6-6-6 6M12 3v18"/></svg>
                    vs. 8,420 last period
                  </p>
                </div>
              </div>
            </div>

            <!-- Expense Claims -->
            <div class="kpi rounded-xl p-4" style="background:#fff;border:1px solid #e5e7eb">
              <div class="flex items-center gap-2 mb-3" style="border-bottom:1px solid #f3f4f6;padding-bottom:10px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:14px;height:14px;color:#9ca3af;flex-shrink:0">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z"/>
                </svg>
                <span style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.08em">Expense Claims</span>
                <button @click.stop="showToast('New expense added')" class="ml-auto flex items-center justify-center rounded-md transition-all hover:bg-zinc-100 active:scale-90" style="width:20px;height:20px;border:1px solid #e5e7eb">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:10px;height:10px;color:#9ca3af"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                </button>
              </div>
              <div class="grid gap-4" style="grid-template-columns:1fr 1fr">
                <div>
                  <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Submitted</p>
                  <p class="tabular-nums" style="font-size:22px;font-weight:700;color:#111827;line-height:1">{{ n(ctr.ecSubmit) }}</p>
                  <p class="tabular-nums" style="font-size:12px;color:#374151;font-weight:500;margin-top:2px">{{ usd(ctr.ecSubmitAmt) }}</p>
                  <p class="flex items-center gap-0.5" style="font-size:10.5px;color:#ef4444;margin-top:4px">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0"><path d="m18 15-6 6-6-6M12 3v18"/></svg>
                    vs. 13,900 last period
                  </p>
                </div>
                <div>
                  <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Approved</p>
                  <p class="tabular-nums" style="font-size:22px;font-weight:700;color:#111827;line-height:1">{{ n(ctr.ecApproved) }}</p>
                  <p class="tabular-nums" style="font-size:12px;color:#374151;font-weight:500;margin-top:2px">{{ usd(ctr.ecApprovedAmt) }}</p>
                  <p class="flex items-center gap-0.5" style="font-size:10.5px;color:#059669;margin-top:4px">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:10px;height:10px;flex-shrink:0"><path d="m18 9-6-6-6 6M12 3v18"/></svg>
                    vs. 38,250 last period
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- Two-column layout -->
          <div class="grid gap-4 items-start" style="grid-template-columns:1fr 300px">

            <!-- ── LEFT COLUMN ─────────────────────────────────────────────── -->
            <div class="flex flex-col gap-4">

              <!-- Cost report -->
              <div class="panel rounded-xl p-5" style="background:#fff;border:1px solid #e5e7eb">
                <div class="flex items-start justify-between gap-3 mb-1 flex-wrap">
                  <div>
                    <h2 style="font-size:13px;font-weight:700;color:#111827">Cost report</h2>
                    <p style="font-size:11.5px;color:#9ca3af;margin-top:2px">Track production spending against approved budgets.</p>
                  </div>
                  <!-- Period dropdown -->
                  <div class="relative" @click.stop>
                    <button
                      @click="showPeriod = !showPeriod"
                      class="flex items-center gap-1 rounded-lg transition-all hover:bg-zinc-50"
                      style="padding:5px 10px;font-size:12px;color:#374151;border:1px solid #e5e7eb"
                    >
                      {{ periodLabel }}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px;color:#9ca3af"><path d="m6 9 6 6 6-6" stroke-linecap="round"/></svg>
                    </button>
                    <Transition enter-active-class="transition-all duration-150" leave-active-class="transition-all duration-150" enter-from-class="opacity-0 scale-95 -translate-y-1" leave-to-class="opacity-0 scale-95 -translate-y-1">
                      <div v-if="showPeriod" class="absolute right-0 top-full mt-1 z-10 rounded-xl overflow-hidden shadow-xl" style="background:#fff;border:1px solid #e5e7eb;min-width:140px">
                        <button v-for="p in ['This year','Last year','Last 6 months','Last quarter']" :key="p"
                          @click="selectPeriod(p)"
                          class="flex items-center gap-2 w-full transition-colors hover:bg-zinc-50"
                          style="padding:8px 12px;font-size:12px;color:#374151;text-align:left"
                        >
                          <svg v-if="periodLabel === p" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:11px;height:11px;color:#7c3aed"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          <span v-else style="width:11px;display:inline-block"/>
                          {{ p }}
                        </button>
                      </div>
                    </Transition>
                  </div>
                </div>

                <!-- Total + badge -->
                <div class="flex items-center gap-2 mt-3 mb-5 flex-wrap">
                  <span class="tabular-nums" style="font-size:26px;font-weight:700;color:#111827;letter-spacing:-.5px">{{ usd(ctr.totalSpend) }}</span>
                  <span class="rounded-md" style="font-size:11px;font-weight:600;color:#059669;background:#ecfdf5;border:1px solid #d1fae5;padding:2px 7px">
                    +$24,860 (+15.6%) vs last month
                  </span>
                </div>

                <!-- Bar chart -->
                <div class="relative" @mouseleave="tooltipIdx = null">
                  <div class="flex items-end gap-1.5" style="height:110px">
                    <div
                      v-for="(bar, i) in barData" :key="i"
                      class="flex-1 relative cursor-pointer group"
                      style="height:100%;display:flex;flex-direction:column;justify-content:flex-end"
                      @mouseenter="tooltipIdx = i"
                    >
                      <!-- Tooltip -->
                      <Transition enter-active-class="transition-all duration-150" leave-active-class="transition-all duration-100" enter-from-class="opacity-0 scale-95" leave-to-class="opacity-0 scale-95">
                        <div
                          v-if="tooltipIdx === i"
                          class="absolute z-20 rounded-xl shadow-2xl pointer-events-none"
                          style="bottom:calc(100% + 10px);left:50%;transform:translateX(-50%);background:#1a1a2e;border:1px solid rgba(255,255,255,.08);padding:9px 11px;white-space:nowrap;min-width:140px"
                        >
                          <p style="font-size:10px;color:#9ca3af;margin-bottom:3px">{{ bar.label }}</p>
                          <div class="flex items-center gap-2">
                            <p class="tabular-nums" style="font-size:14px;font-weight:700;color:#fff">${{ bar.value.toLocaleString() }}</p>
                            <span :style="`font-size:10px;font-weight:600;color:${bar.delta.startsWith('+') ? '#34d399' : '#f87171'}`">
                              {{ bar.delta }} ({{ bar.pct }})
                            </span>
                          </div>
                          <p style="font-size:10px;color:#6b7280;margin-top:2px">Production spend</p>
                          <!-- Arrow -->
                          <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #1a1a2e"/>
                        </div>
                      </Transition>

                      <!-- Bar fill -->
                      <div
                        class="bar w-full rounded-t-md transition-colors duration-150"
                        :style="`height:${Math.max(3, (bar.value / maxBar) * 100)}%;background:${bar.active ? '#7c3aed' : tooltipIdx === i ? '#d1d5db' : '#e5e7eb'}`"
                      />
                    </div>
                  </div>
                  <div class="flex justify-between mt-2">
                    <span style="font-size:10px;color:#9ca3af">25 Feb 2026</span>
                    <span style="font-size:10px;color:#9ca3af">25 Mar 2027</span>
                  </div>
                </div>
              </div>

              <!-- Cost centres -->
              <div class="panel rounded-xl p-5" style="background:#fff;border:1px solid #e5e7eb">
                <div class="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 style="font-size:13px;font-weight:700;color:#111827">Cost centres</h2>
                    <p style="font-size:11.5px;color:#9ca3af;margin-top:2px">View budget allocation by cost centre.</p>
                  </div>
                  <button @click.stop="showToast('Opening cost centre manager…')" class="rounded-lg transition-all hover:bg-zinc-50" style="padding:5px 10px;font-size:12px;color:#374151;border:1px solid #e5e7eb;flex-shrink:0">Manage</button>
                </div>

                <!-- Stacked bar -->
                <div class="rounded-full overflow-hidden flex mb-3" style="height:8px">
                  <div v-for="cc in centres" :key="cc.name" :style="`width:${cc.pct}%;background:${cc.color}`" class="h-full transition-all duration-500" />
                </div>

                <!-- Legend -->
                <div class="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                  <div v-for="cc in centres" :key="cc.name" class="flex items-center gap-1.5">
                    <div class="rounded-full shrink-0" :style="`width:8px;height:8px;background:${cc.color}`"/>
                    <span style="font-size:11.5px;color:#6b7280">{{ cc.name }}</span>
                    <span style="font-size:11.5px;font-weight:700;color:#111827">{{ cc.pct }}%</span>
                  </div>
                </div>

                <!-- Table -->
                <div class="rounded-xl overflow-hidden" style="border:1px solid #e5e7eb">
                  <table class="w-full" style="border-collapse:collapse">
                    <thead>
                      <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb">
                        <th style="text-align:left;padding:8px 14px;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em">Name</th>
                        <th style="text-align:left;padding:8px 14px;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em">Category</th>
                        <th style="text-align:right;padding:8px 14px;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(cc, i) in centres" :key="cc.name"
                        @click="toggleRow(i)"
                        class="cursor-pointer transition-colors hover:bg-zinc-50/80"
                        :style="i < centres.length - 1 ? 'border-bottom:1px solid #f3f4f6' : ''"
                      >
                        <td style="padding:10px 14px">
                          <div class="flex items-center gap-2">
                            <svg
                              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                              style="width:11px;height:11px;color:#9ca3af;flex-shrink:0;transition:transform .2s"
                              :style="expandedRows.has(i) ? 'transform:rotate(90deg)' : ''"
                            ><path d="m9 18 6-6-6-6" stroke-linecap="round"/></svg>
                            <div class="rounded-full shrink-0" :style="`width:7px;height:7px;background:${cc.color}`"/>
                            <span style="font-size:12.5px;font-weight:600;color:#111827">{{ cc.name }}</span>
                            <span style="font-size:11.5px;color:#9ca3af">{{ cc.count }}</span>
                          </div>
                          <!-- Expanded sub-row -->
                          <Transition enter-active-class="transition-all duration-200" leave-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-1" leave-to-class="opacity-0 -translate-y-1">
                            <div v-if="expandedRows.has(i)" class="mt-2 ml-5 pl-3 flex flex-col gap-1.5" style="border-left:2px solid #e5e7eb">
                              <div class="flex justify-between">
                                <span style="font-size:11px;color:#9ca3af">Budget allocated</span>
                                <span style="font-size:11px;font-weight:600;color:#374151">${{ (cc.value * 1.18).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
                              </div>
                              <div class="flex justify-between">
                                <span style="font-size:11px;color:#9ca3af">Spent to date</span>
                                <span style="font-size:11px;font-weight:600;color:#374151">${{ cc.value.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
                              </div>
                              <div class="rounded-full overflow-hidden" style="height:4px;background:#f3f4f6;margin-top:2px">
                                <div class="h-full rounded-full" :style="`width:${Math.round(100/1.18)}%;background:${cc.color}`"/>
                              </div>
                            </div>
                          </Transition>
                        </td>
                        <td style="padding:10px 14px;font-size:12px;color:#6b7280">{{ cc.category }}</td>
                        <td style="padding:10px 14px;font-size:12.5px;font-weight:600;color:#111827;text-align:right;font-variant-numeric:tabular-nums">
                          ${{ cc.value.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- ── RIGHT COLUMN ────────────────────────────────────────────── -->
            <div class="flex flex-col gap-4">

              <!-- Production health -->
              <div class="panel rounded-xl p-4" style="background:#fff;border:1px solid #e5e7eb">
                <div class="flex items-start justify-between gap-2 mb-3 flex-wrap">
                  <div>
                    <h2 style="font-size:13px;font-weight:700;color:#111827">Production health</h2>
                    <p style="font-size:11px;color:#9ca3af;margin-top:2px">Snapshot of your production's financial health.</p>
                  </div>
                  <button class="flex items-center gap-1 rounded-lg transition-all hover:bg-zinc-50 shrink-0" style="padding:4px 9px;font-size:11.5px;color:#374151;border:1px solid #e5e7eb">
                    Primary Wallet
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px;color:#9ca3af"><path d="m6 9 6 6 6-6" stroke-linecap="round"/></svg>
                  </button>
                </div>

                <!-- Amount + sparkline row -->
                <div class="flex items-end justify-between gap-3 mb-4">
                  <div>
                    <p style="font-size:10.5px;color:#9ca3af;margin-bottom:3px">Budget remaining</p>
                    <div class="flex items-center gap-1.5">
                      <span class="tabular-nums" style="font-size:17px;font-weight:700;color:#111827;letter-spacing:-.3px">$184,250 USD</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:13px;height:13px;color:#d1d5db;flex-shrink:0">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                      </svg>
                    </div>
                    <p style="font-size:10.5px;color:#9ca3af;margin-top:2px">1 USD = 17,865.00 IDR</p>
                  </div>
                  <!-- Sparkline -->
                  <svg viewBox="0 0 90 40" style="width:72px;height:32px;flex-shrink:0" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="spark1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#22c55e" stop-opacity=".25"/>
                        <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,32 L12,28 L24,30 L36,24 L48,18 L60,12 L72,7 L90,3 L90,40 L0,40 Z" fill="url(#spark1)"/>
                    <polyline points="0,32 12,28 24,30 36,24 48,18 60,12 72,7 90,3" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <!-- Action buttons 2x2 -->
                <div class="grid gap-2" style="grid-template-columns:1fr 1fr">
                  <button v-for="btn in [
                    { label: 'Allocate',     icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
                    { label: 'Request',      icon: 'M9 12h6M12 9v6M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z' },
                    { label: 'Pay supplier', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
                    { label: 'Export cost',  icon: 'M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17' },
                  ]" :key="btn.label"
                    @click.stop="showToast(`${btn.label}…`)"
                    class="flex items-center justify-center gap-1.5 rounded-lg transition-all hover:bg-zinc-100 active:scale-95"
                    style="padding:7px 6px;font-size:11.5px;font-weight:500;color:#374151;background:#f9fafb;border:1px solid #e5e7eb"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;color:#9ca3af;flex-shrink:0">
                      <path :d="btn.icon"/>
                    </svg>
                    {{ btn.label }}
                  </button>
                </div>
              </div>

              <!-- Budget burn -->
              <div class="panel rounded-xl p-4" style="background:#fff;border:1px solid #e5e7eb">
                <h2 style="font-size:13px;font-weight:700;color:#111827">Budget burn</h2>
                <p style="font-size:11px;color:#9ca3af;margin-top:2px;margin-bottom:14px">How much of the budget has been spent.</p>

                <div class="flex items-center gap-4">
                  <!-- Arc SVG -->
                  <div class="relative shrink-0" style="width:100px;height:100px">
                    <svg viewBox="0 0 110 110" style="width:100px;height:100px;transform:rotate(-90deg)">
                      <circle cx="55" cy="55" :r="ARC_R" fill="none" stroke="#f3f4f6" stroke-width="11"/>
                      <circle
                        cx="55" cy="55" :r="ARC_R" fill="none"
                        stroke="#7c3aed" stroke-width="11" stroke-linecap="round"
                        :stroke-dasharray="arcDash"
                        style="transition:stroke-dasharray .7s ease"
                      />
                    </svg>
                    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
                      <span class="tabular-nums" style="font-size:20px;font-weight:700;color:#111827;line-height:1">{{ Math.round(ctr.burnPct) }}%</span>
                      <span style="font-size:10.5px;color:#9ca3af;margin-top:2px">Spent</span>
                    </div>
                  </div>
                  <!-- Text -->
                  <div>
                    <p style="font-size:11px;color:#9ca3af;margin-bottom:2px">Budget used</p>
                    <p class="tabular-nums" style="font-size:15px;font-weight:700;color:#111827">$65,750</p>
                    <p style="font-size:11px;color:#9ca3af;margin-top:1px">of $250,000 USD</p>
                    <div class="rounded-full overflow-hidden mt-3" style="height:5px;background:#f3f4f6;width:100px">
                      <div class="h-full rounded-full" style="transition:width .7s ease;background:linear-gradient(to right,#8b5cf6,#7c3aed)" :style="`width:${Math.round(ctr.burnPct)}%`"/>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upcoming payments -->
              <div class="panel rounded-xl p-4" style="background:#fff;border:1px solid #e5e7eb">
                <div class="flex items-start justify-between gap-2 mb-3 flex-wrap">
                  <div>
                    <h2 style="font-size:13px;font-weight:700;color:#111827">Upcoming payments</h2>
                    <p style="font-size:11px;color:#9ca3af;margin-top:2px">Crew and vendor run for this week.</p>
                  </div>
                  <button @click.stop="showToast('Downloading report…')" class="flex items-center gap-1.5 rounded-lg transition-all hover:bg-zinc-50 shrink-0" style="padding:4px 9px;font-size:11.5px;color:#374151;border:1px solid #e5e7eb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;color:#9ca3af">
                      <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                    </svg>
                    Download report
                  </button>
                </div>

                <!-- Due this week -->
                <div class="pb-3 mb-3" style="border-bottom:1px solid #f3f4f6">
                  <p style="font-size:11px;color:#9ca3af">Due this week</p>
                  <div class="flex items-baseline gap-2 mt-0.5">
                    <span class="tabular-nums" style="font-size:20px;font-weight:700;color:#111827;letter-spacing:-.3px">$205,120</span>
                    <button class="transition-colors hover:text-violet-700" style="font-size:11.5px;font-weight:600;color:#7c3aed">5 payees →</button>
                  </div>
                </div>

                <!-- Payment rows -->
                <div class="flex flex-col gap-1.5">
                  <div
                    v-for="(pay, i) in payments" :key="i"
                    class="prow flex items-center gap-3 rounded-xl cursor-pointer transition-all hover:shadow-sm"
                    style="padding:8px 10px;border:1px solid #f3f4f6"
                    :style="{ borderColor: '#f3f4f6' }"
                    @mouseenter="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'"
                    @mouseleave="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.borderColor = '#f3f4f6'"
                  >
                    <!-- Icon -->
                    <div
                      class="flex items-center justify-center rounded-lg shrink-0"
                      style="width:32px;height:32px"
                      :style="{ background: i===0?'#f5f3ff':i===1?'#eff6ff':i===2?'#fffbeb':'#f9fafb' }"
                    >
                      <!-- crew -->
                      <svg v-if="pay.icon==='crew'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:15px;height:15px;color:#7c3aed">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <!-- camera -->
                      <svg v-else-if="pay.icon==='camera'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:15px;height:15px;color:#3b82f6">
                        <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                      </svg>
                      <!-- location -->
                      <svg v-else-if="pay.icon==='location'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:15px;height:15px;color:#d97706">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <!-- food -->
                      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" style="width:15px;height:15px;color:#6b7280">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
                      </svg>
                    </div>

                    <!-- Name + sub -->
                    <div class="flex-1 min-w-0">
                      <p style="font-size:12px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ pay.name }}</p>
                      <p style="font-size:10.5px;color:#9ca3af;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ pay.sub }}</p>
                    </div>

                    <!-- Badge + amount -->
                    <div class="flex items-center gap-2 shrink-0">
                      <span
                        class="rounded-md"
                        style="font-size:10px;font-weight:700;padding:2px 6px"
                        :style="pay.urgent
                          ? 'background:#fff7ed;color:#c2410c;border:1px solid #fed7aa'
                          : 'background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe'"
                      >{{ pay.badge }}</span>
                      <span class="tabular-nums" style="font-size:12px;font-weight:700;color:#111827">${{ pay.amount.toLocaleString() }}</span>
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
